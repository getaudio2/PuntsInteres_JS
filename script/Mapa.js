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
        let lat = CURRENT_LAT;
        let lng = CURRENT_LNG;

        // Verifica si la geolocalización está disponible en el navegador
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                lat = position.coords.latitude;
                lng = position.coords.longitude;

                // Coloca un marcador en la ubicación actual del usuario
                L.marker([lat, lng]).addTo(mapa)
                    .bindPopup("Estàs aquí").openPopup();

                // Centra el mapa en la ubicación actual
                mapa.setView([lat, lng], 13);
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