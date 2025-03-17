// HTML ELEMENTS
const dropZone = document.querySelector(".drop-zone");
const llistaLlocsDiv = document.querySelector(".llista-llocs");
const tipusSelectedObj = document.querySelector(".filtre-tipus");

// VARIABLES
let puntInteres = [];
let tipusSelected = new Set([]);
let numId = 0;

// Nova instància de mapa
const mapa = new Mapa();

// Prevenir comportament per defecte (obrir l'arxiu en una nova pestanya)
["dragenter", "dragover", "dragleave", "drop"].forEach(eventName => {
    dropZone.addEventListener(eventName, function(event) {event.preventDefault();});
});

// Controlar el fitxer CSV arrossegat
dropZone.addEventListener("drop", function(event) {
    // Agafar el fitxer CSV arrossegat
    const files = event.dataTransfer.files;
    loadFile(files);
});

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
            alert("El fitxer no té un format adequat.");
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

const loadData = function (fitxer) {
    let codiCountry;
    fitxer.forEach((liniaCSV) => {
        numId++;
        const dades = liniaCSV.split(CHAR_CSV);
        switch(dades[TIPUS].toLowerCase()){
            case "espai":
                const espaiObj = new PuntInteres(numId, dades[PAIS],dades[CIUTAT],dades[NOM],dades[DIRECCIO],dades[LAT],dades[LON],dades[PUNTUACIO],dades[TIPUS]);
                puntInteres.push(espaiObj);
                break;
            case "museu":
                const museuObj = new Museu(numId, dades[PAIS],dades[CIUTAT],dades[NOM],dades[DIRECCIO],dades[LAT],dades[LON],dades[PUNTUACIO],dades[TIPUS],dades[HORARI],dades[PREU],dades[MONEDA],dades[DESCRIPCIO]);
                puntInteres.push(museuObj);
                break;
            case "atraccio":
                const atraccioObj = new Atraccio(numId, dades[PAIS],dades[CIUTAT],dades[NOM],dades[DIRECCIO],dades[LAT],dades[LON],dades[PUNTUACIO],dades[TIPUS],dades[HORARI],dades[PREU],dades[MONEDA]);
                puntInteres.push(atraccioObj);
                break
            default:
                throw new Error(() => {
                    alert("No s'ha pogut carregar el tipus de punt d'interés")
                });
        }
        tipusSelected.add(dades[TIPUS]);
    });
    carregarTipusSelected();
    renderitzarLlista(puntInteres);
}

const carregarTipusSelected = function() {
    const option = document.createElement("option");
    option.value = "Tots";
    option.text = "Tots";
    tipusSelectedObj.appendChild(option);
    tipusSelected.forEach(tipus => {
        const option = document.createElement("option");
        option.value = tipus;
        option.text = tipus;
        tipusSelectedObj.appendChild(option);
    });
}

const getInfoCountry = async function(){
    const resposta = await fetch();
    const dada = await resposta.json();
    console.log(dada);
}

const pintarEspai = function(obj) {
    const espaiElement = document.createElement("div");
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delBtn");
    deleteBtn.textContent = "delete";
    espaiElement.classList.add("espai");
    espaiElement.textContent = "" + obj.nom;
    espaiElement.appendChild(deleteBtn);
    llistaLlocsDiv.appendChild(espaiElement);
}

const pintarMuseu = function(obj) {
    const museuElement = document.createElement("div");
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delBtn");
    deleteBtn.textContent = "delete";
    museuElement.classList.add("museu");
    museuElement.textContent = "" + obj.nom;
    museuElement.appendChild(deleteBtn);
    llistaLlocsDiv.appendChild(museuElement);
}

const pintarAtraccio = function(obj) {
    const atraccioElement = document.createElement("div");
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delBtn");
    deleteBtn.textContent = "delete";
    atraccioElement.classList.add("atraccio");
    atraccioElement.textContent = "" + obj.nom;
    atraccioElement.appendChild(deleteBtn);
    llistaLlocsDiv.appendChild(atraccioElement);
}

const renderitzarLlista = function (llista) {
    llistaLlocsDiv.textContent = "";
    llista.forEach((obj) => {
        switch(obj.tipus.toLowerCase()){
            case "espai":
                pintarEspai(obj);
                break;
            case "museu":
                pintarMuseu(obj);
                break;
            case "atraccio":
                pintarAtraccio(obj);
                break;
        }
    });
}