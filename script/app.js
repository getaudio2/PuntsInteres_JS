// HTML ELEMENTS
const dropZone = document.querySelector(".drop-zone");
const llistaLlocsDiv = document.querySelector(".llista-llocs");
const tipusFilterObj = document.querySelector(".filtre-tipus");
const ordreFilterObj = document.querySelector(".filtre-ordre");
const nameFilterObj = document.querySelector(".filtre-nom");
const infoCountryDiv = document.querySelector(".info-country");

// VARIABLES
let puntInteres = [];
let puntInteresCurrent = [];
let tipusSelected = new Set([]);
let numId = 0;

// Nova instància de mapa
const mapa = new Mapa();

// Prevenir comportament per defecte (obrir l'arxiu en una nova pestanya)
["dragenter", "dragover", "dragleave", "drop"].forEach(eventName => {
    dropZone.addEventListener(eventName, function(event) {event.preventDefault();});
});

// Controlar el fitxer CSV arrossegat
dropZone.addEventListener("drop", async function(event) {
    // Agafar el fitxer CSV arrossegat
    const files = event.dataTransfer.files;
    //loadFile(files);
    if (files && files.length > 0) {
        const file = files[0];
        // Agafem l'extensió del nom de l'arxiu
        // Exemple: nom_arxiu.csv -> {0: nom_arxiu, 1: csv} (Separem pel ".")
        const extension = file.name.split(".")[1];
        if(extension.toLowerCase() === FILE_EXTENSION) { // Comprovem que l'usuari puja un csv
            console.log("El fitxer té un format adequat.");
            // Llegim el fitxer csv
            const csvReader = new CSVReader();
            try {
                // Llegim les rows del fitxer csv i l'info del païs amb restcountries
                const fitxer = await csvReader.readCsv(file);
                const countryInfo = await csvReader.getInfoCountry();

                // Actualiztem la posició del mapa al païs segons la lat i lng de restcountries
                mapa.actualitzarPosInitMapa(countryInfo.lat, countryInfo.lng);
                
                // Mostrem la bandera del païs i nom de la ciutat
                displayCountryInfo(countryInfo);

                // Carreguem la info de l'arxiu csv com a llista de divs
                loadData(fitxer);
            } catch (error) {
                console.error(error);
                alert("Error al carregar el fitxer. Torna a intentar-ho.");
            }
        } else {
            alert("El fitxer no és format csv.");
        }
    }
});
/*
const loadFile = function(files) {
    // Comprovem que l'arxiu existeix
    if(files && files.length > 0) {
        const file = files[0];
        // Agafem l'extensió del nom de l'arxiu
        // Exemple: nom_arxiu.csv -> {0: nom_arxiu, 1: csv} (Separem pel ".")
        const extension = file.name.split(".")[1];
        if(extension.toLowerCase() === FILE_EXTENSION) { // Comprovem que l'usuari puja un csv
            console.log("El fitxer té un format adequat.");
            readCsv(file); // Llegim el fitxer csv
        } else {
            alert("El fitxer no és format csv.");
        }
    }
}

const readCsv = function (file) {
    // Llegir el fitxer
    const reader = new FileReader();
    // Carreguem l'arxiu (asíncron)
    reader.onload = () => {
        fitxer = reader.result.trim().split("\n").slice(1);
        loadData(fitxer);
        //getInfoCountry();
    };
    // Missatge d'error si el FileReader no aconsegueix carregar el fitxer csv
    reader.onerror = () => {
        showMessage("Error al carregar el fitxer. Torna a intentar-ho", "error");
    };
    console.log("El fitxer s'està carregant");
    reader.readAsText(file, "UTF-8");
}
*/
const loadData = function (fitxer) {
    fitxer.forEach((liniaCSV) => {
        numId++;
        const dades = liniaCSV.split(CHAR_CSV);
        switch(dades[TIPUS].toLowerCase()){
            case "espai":
                const espaiObj = new PuntInteres(numId, dades[PAIS],dades[CIUTAT],dades[NOM],dades[DIRECCIO],dades[LAT],dades[LON],dades[PUNTUACIO],dades[TIPUS]);
                puntInteres.push(espaiObj);
                puntInteresCurrent.push(espaiObj);
                break;
            case "museu":
                const museuObj = new Museu(numId, dades[PAIS],dades[CIUTAT],dades[NOM],dades[DIRECCIO],dades[LAT],dades[LON],dades[PUNTUACIO],dades[TIPUS],dades[HORARI],dades[PREU],dades[MONEDA],dades[DESCRIPCIO]);
                puntInteres.push(museuObj);
                puntInteresCurrent.push(museuObj);
                break;
            case "atraccio":
                const atraccioObj = new Atraccio(numId, dades[PAIS],dades[CIUTAT],dades[NOM],dades[DIRECCIO],dades[LAT],dades[LON],dades[PUNTUACIO],dades[TIPUS],dades[HORARI],dades[PREU],dades[MONEDA]);
                puntInteres.push(atraccioObj);
                puntInteresCurrent.push(atraccioObj);
                break
            default:
                throw new Error(() => {
                    alert("No s'ha pogut carregar el tipus de punt d'interés")
                });
        }
        tipusSelected.add(dades[TIPUS]); // Guardem els tipus de punts d'interés dins del Set
    });

    carregarTipusSelected(); // Cridem a la funció per ficar els tipus al selected
    renderitzarLlista(puntInteres); // Mostrem la llista de punts d'interés en forma de divs
    mostrarPuntsAlMapa(puntInteres); // Mostrem els punts d'interés al mapa amb markers
}

// Popular el select amb els tipus de punt d'interès
const carregarTipusSelected = function() {
    const option = document.createElement("option"); // Crear element option
    option.value = ""; // Option per defecte
    option.text = "Tots";
    tipusFilterObj.appendChild(option); // Afegir el option al select
    tipusSelected.forEach(tipus => {
        const option = document.createElement("option"); // Crear element option
        option.value = tipus; // Option amb el tipus d'interés
        option.text = tipus;
        tipusFilterObj.appendChild(option); // Afegir el option al select
    });
}

const pintarPuntInteres = function(nomTipus, nomPuntInteres) {
    const puntElement = document.createElement("div");
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delBtn");
    deleteBtn.textContent = "delete";
    puntElement.classList.add(nomTipus);
    puntElement.textContent = "" + nomPuntInteres;
    puntElement.appendChild(deleteBtn);
    llistaLlocsDiv.appendChild(puntElement);
    return puntElement;
}

const pintarEspai = function(obj) {
    const nomTipus = obj.tipus.toLowerCase();
    const nomEspai = obj.nom;
    return pintarPuntInteres(nomTipus, nomEspai);
}

const pintarMuseu = function(obj) {
    const nomTipus = obj.tipus.toLowerCase();
    const nomMuseu = obj.nom;
    return pintarPuntInteres(nomTipus, nomMuseu);
}

const pintarAtraccio = function(obj) {
    const nomTipus = obj.tipus.toLowerCase();
    const nomAtraccio = obj.nom;
    return pintarPuntInteres(nomTipus, nomAtraccio);
}

const renderitzarLlista = function (llista) {
    llistaLlocsDiv.textContent = "";
    llista.forEach((obj) => {
        let div;
        switch(obj.tipus.toLowerCase()){
            case "espai":
                div = pintarEspai(obj);
                break;
            case "museu":
                div = pintarMuseu(obj);
                break;
            case "atraccio":
                div = pintarAtraccio(obj);
                break;
            default:
                throw new Error(() => {
                    alert("Has ficat un objecte incorrecte");
                });
        }

        const delBtn = div.querySelector(".delBtn");
        if (delBtn) {
            delBtn.addEventListener("click", () => {
                const confirmDelete = confirm("Segur que vols eliminar aquest punt?");
                if (confirmDelete) {
                    puntInteresCurrent = puntInteresCurrent.filter(p => p.id !== obj.id);
                    renderitzarLlista(puntInteresCurrent);
                    mapa.borrarPunt();
                    mostrarPuntsAlMapa(puntInteresCurrent);
                }
            });
        }
    });
}

tipusFilterObj.addEventListener("change", function(event) {
    const selectedType = event.target.value;

    const llistaFiltrada = selectedType
        ? puntInteresCurrent.filter(item => item.tipus === selectedType)
        : puntInteresCurrent;
    renderitzarLlista(llistaFiltrada);
    mostrarPuntsAlMapa(llistaFiltrada);
});

const filtrarPerNom = function (text) {
    const llistaFiltrada = puntInteresCurrent.filter((item) => {
        return item.nom.toLowerCase().includes(text.toLowerCase());
    });
    renderitzarLlista(llistaFiltrada);
    mostrarPuntsAlMapa(llistaFiltrada);
}

nameFilterObj.addEventListener("input", function(event) {
    text = event.target.value;
    if(text.length > 3){
        filtrarPerNom(text);
    } else {
        renderitzarLlista(puntInteresCurrent);
        mostrarPuntsAlMapa(llistaFiltrada);
    }
});

ordreFilterObj.addEventListener("change", function(event) {
    const ordre = event.target.value;
    ordenarPerNom(ordre);
});

const ordenarPerNom = function(ordre) {
    const llistaOrdenada = [...puntInteresCurrent].sort((a, b) => {
        if (ordre === "asc") {
            return a.nom.localeCompare(b.nom);
        } else if (ordre === "desc") {
            return b.nom.localeCompare(a.nom);
        } else {
            return 0;
        }
    });
    renderitzarLlista(llistaOrdenada);
    mostrarPuntsAlMapa(llistaFiltrada);
};

// Mostrar punts d'interés al mapa amb markers
const mostrarPuntsAlMapa = function (llista) {
    mapa.borrarPunt();
    llista.forEach(item => {
        mapa.mostrarPunt(parseFloat(item.latitud), parseFloat(item.longitud), item.nom);
    });
}

function displayCountryInfo(countryInfo) {
    const flagObj = document.createElement("p");
    const cityObj = document.createElement("p");
    flagObj.textContent = "País(" + countryInfo.flag + ")";
    cityObj.textContent = countryInfo.city;
    infoCountryDiv.appendChild(flagObj);
    infoCountryDiv.appendChild(cityObj);
}
