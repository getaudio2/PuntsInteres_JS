// HTML ELEMENTS
const dropZone = document.querySelector(".drop-zone");

// VARIABLES
let puntInteres = [];

// Nova instància de mapa
const mapa = new Mapa();

// Prevenir comportament per defecte (obrir l'arxiu en una nova pestanya)
["dragenter", "dragover", "dragleave", "drop"].forEach(eventName => {
    dropZone.addEventListener(eventName, function(event) {event.preventDefault()});
});

// Controlar el fitxer CSV arrossegat
dropZone.addEventListener("drop", (event) => {
    // Agafar el fitxer CSV arrossegat
    const files = event.dataTransfer.files;
    console.log(files);
    loadFile(files);

    if(files && files.length > 0) {
        const file = files[0];
        const extension = file.name.split(".")[-1]
        console.log(extension);

    }
});

const loadFile = function(files) {

}

const readCsv = function (file) {
    // Llegir el fitxer
    const reader = new FileReader();
    reader.onload = () => {
        fitxer = reader.result.trim().split("\n").slice(1);
        loadData(fitxer);
        getInfoCountry();
    }
    reader.onerror = (error) => {
        
    }
    reader.readAsText(file, "UTF-8");
    console.log("");
}

const loadData = function (fitxer) {

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