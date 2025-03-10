// HTML ELEMENTS
const dropZone = document.querySelector(".drop-zone");

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

    if(files && files.length > 0) {
        const file = files[0];
        const extension = file.name.split(".")[-1]
        console.log(extension);

    }

    // LLegir el fitxer CSV arrossegat
    /*if (file && file.type === "text/csv") {
        const reader = new FileReader();
        reader.onload = (e) => {
            console.log("CSV content:", e.target.result);
        };
        reader.readAsText(file);
    } else {
        alert("El fitxer no és csv.");
    }*/
});
