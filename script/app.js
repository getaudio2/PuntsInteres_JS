// HTML ELEMENTS
const dropZone = document.querySelector(".drop-zone");

// VARIABLES
let puntInteres = [];

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
    reader.onload = () => {
        fitxer = reader.result.trim().split("\n").slice(1);
        loadData(fitxer);
        getInfoCountry();
    };
    reader.onerror = () => {
        showMessage("Error al carregar el fitxer");
    };
    console.log("El fitxer s'està carregant");
    reader.readAsText(file, "UTF-8");
}

const loadData = function (fitxer) {
    let codiCountry;
    console.log(fitxer);
    fitxer.forEach((liniaCSV) => {
        const dades = liniaCSV.split(CHAR_CSV);
        console.log(dades[TIPUS]);
        switch(dades[TIPUS].toLowerCase()){
            case "espai":
                const espaiObj = new PuntInteres(dades[PAIS],dades[CODI]);
                puntInteres.push(espaiObj);
                break;
            case "museu":
                const museuObj = new Museu();
                puntInteres.push(museuObj);
                break;
            case "atraccio":
                const atraccioObj = new Atraccio();
                puntInteres.push(atraccioObj);
                break
            default:
                throw new Error(() => {
                    alert("")
                });
        }
    });
}

const getInfoCountry = async function(){
    const resposta = await fetch();
    const dada = await resposta.json();
    console.log(dada);
}

const pintarEspai = function(obj) {
    const espaiElement = document.createElement("div");
    espaiElement.textContent = "" + obj;
}

const pintarMuseu = function(obj) {
    
}

const pintarAtraccio = function(obj) {
    
}

const renderitzarLlista = function (llista) {
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