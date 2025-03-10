class PuntInteres{
    static totalElements = 0;
    #id;
    #esManual;

    constructor(id, pais, ciutat, nom, direccio, latitud, longitud, puntuacio, tipus){
        this.#id = id;
        this.#esManual;
        this.ciutat = ciutat;
        this.pais = pais;
        this.nom = nom;
        this.direccio = direccio;
        this.latitud = latitud;
        this.longitud = longitud;
        this.puntuacio = puntuacio;
        this.tipus = tipus;
    }

}

class Atraccio extends PuntInteres{
    horaris;
    preu;
    moneda;
}