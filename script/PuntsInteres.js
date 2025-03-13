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
        PuntInteres.totalElements++;
    }

    get id(){
        return this.#id;
    }
    
    set id(nouId){
        this.#id = nouId;
    }

    get esManual(){
        return this.#esManual;
    }

    set esManual(resultat){
        this.#esManual = resultat;
    }

    static obtenirTotalElements(){
        return PuntInteres.totalElements;
    }
}

class Atraccio extends PuntInteres{
    horaris;
    preu;
    moneda;

    constructor(id, pais, ciutat, nom, direccio, latitud, longitud, puntuacio, tipus, horaris, preu, moneda){
        super(id, pais, ciutat, nom, direccio, latitud, longitud, puntuacio, tipus);
        this.horaris = horaris;
        this.preu = preu;
        this.moneda = moneda;
    }
}

class Museu extends PuntInteres{
    horaris;
    preu;
    moneda;
    descripcio;

    constructor(id, pais, ciutat, nom, direccio, latitud, longitud, puntuacio, tipus, horaris, preu, moneda, descripcio){
        super(id, pais, ciutat, nom, direccio, latitud, longitud, puntuacio, tipus);
        this.horaris = horaris;
        this.preu = preu;
        this.moneda = moneda;
        this.descripcio = descripcio;
    }
}