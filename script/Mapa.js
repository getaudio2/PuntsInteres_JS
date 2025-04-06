class Mapa {
    #map;
    #currentLat = 1;
    #currentLng = 1;
    #markers = [];

    constructor(){
        this.#init();
    }

    async #init() {
        await this.#getPosicioActual();

        const mapCenter = [this.#currentLat, this.#currentLng];
        const zoomLevel = 13;

        this.#map = L.map('map').setView(mapCenter, zoomLevel);

        let tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        });
        tileLayer.addTo(this.#map);

        L.marker(mapCenter).addTo(this.#map).bindPopup("Estàs aquí").openPopup();
    }

    mostrarPuntInicial(){

    }

    actualitzarPosInitMapa(lat, lon){
        this.#map.setView([lat, lon], 6);
    }

    mostrarPunt(lat, long, desc){
        const marker = L.marker([lat, long]).addTo(this.#map).bindPopup(desc);
        this.#markers.push(marker);
    }

    borrarPunt() {
        this.#markers.forEach(marker => this.#map.removeLayer(marker));
        this.#markers = [];
    }

    async #getPosicioActual(){
        return new Promise((resolve) => {
            if (!navigator.geolocation) {
                console.error("La geolocalització no està disponible.");
                return resolve();
            }

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    this.#currentLat = position.coords.latitude;
                    this.#currentLng = position.coords.longitude;
                    resolve();
                },
                (error) => {
                    console.error("Error en la geolocalització:", error);
                    resolve();
                }
            );
        });
    }
}