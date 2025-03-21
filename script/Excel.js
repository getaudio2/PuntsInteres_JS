class CSVReader {
    #rows;

    constructor(rows){
        this.#rows = rows;
        this.readCsv();
        this.getInfoCountry();
    }

    async readCsv() {
        return new Promise((resolve, reject)=>{
            const reader = new FileReader();
            reader.onload = () => {
                //Tindre la informació del csv
                fitxer = reader.result.trim().split("\n").slice(1);
                resolve(fitxer);
            };
            reader.onerror = () => {
                showMessage("Error reading the file. Please try again.", "error");
                reject("Error reading the file. Please try again.");
            };
       
            console.log("El fitxer ha començat a carregar-se");
            reader.readAsText(file,"UTF-8");
        });
    
    }

    async getInfoCountry(){
        if(!this.#rows){
            return {status: "false", msg: "No has carregat el fitxer"}
        } else {
            const codi = this.#rows[0].split(";")[1];
            const city = this.#rows[0].split(";")[2];
            const url = `https://restcountries.com/v3.1/alpha/${codi}`;

            const result = await fetch(url);

            if (!result.ok){
                throw new Error("Error al consultar el flag");
            }
            const data = await result.json();
            const flag = data[0].flag;
            const [lat,lng] = data[0].capitalInfo.latlng;

            return {city: city, flag: flag, lat: lat, lng: lng}
        }
    }
}