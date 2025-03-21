class Mapa {
    #map;
    #currentLat;
    #currentLng;

    constructor(){
        this.#getPosicioActual();
        const mapCenter = [this.#currentLat, this.#currentLng];
        const zoomLevel = 13;

        this.#map = L.map('map').setView(mapCenter, zoomLevel);      
        let tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        })
        tileLayer.addTo(this.#map);

        L.marker(mapCenter).addTo(this.#map).bindPopup("Estàs aquí").openPopup();
    }

    mostrarPuntInicial(){

    }

    actualitzarPosInitMapa(lat, lon){

    }

    mostrarPunt(lat, long, desc){

    }

    borrarPunt() {

    }

    #getPosicioActual(){
        let lat = 1;
        let lng = 1;

        // Verifica si la geolocalización está disponible en el navegador
        if (!this.#currentLat && !this.#currentLng) {
            navigator.geolocation.getCurrentPosition(function (position) {
                lat = position.coords.latitude;
                lng = position.coords.longitude;
            }, function (error) {
                console.error("Error en la geolocalización:", error);
            });
        } else {
            console.error("La geolocalización no está disponible en este navegador.");
        }

        this.#currentLat = lat;
        this.#currentLng = lng;
    }
}