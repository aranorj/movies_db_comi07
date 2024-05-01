let db = require('../db/models');

module.exports = {
    getAll: function() {
        return new Promise((resolve, reject) => {
            db.Peliculas.findAll()
            .then(peliculas => {
                //hacer cosas con mis peliculas 
                resolve(peliculas)
            })
            .catch(err =>{
                console.log(err);
                reject([])
            });
        })         
    },
    getBy: async function(id) {
        try {
            return await db.Peliculas.findByPk(id);
        } catch (error) {
            console.log(error);
            return {
                id: 0,
                title: "No encontrado",
                rating: 0,
                awards: 0,
                length: 0,
                release_date: ""
            }
        } 
    },

    save: async function(nuevaPelicula){
        let pelicula = new Pelicula(nuevaPelicula);
        let peliculaCreada= await db.Peliculas.create(pelicula)
        return peliculaCreada.dataValues

        /*try {
            let pelicula = new Pelicula(nuevaPelicula);
            let peliculaCreada= await db.Peliculas.create(pelicula)
            return peliculaCreada.dataValues
            //console.log(peliculaCreada.dataValues);
        } catch (error) {
            console.log(error);
        }*/
    },

    updateBy: async function (body, id){
        try {
            let pelicula = new Pelicula(body);
            await db.Peliculas.update(pelicula, {where: {id: id}});
        } catch (error) {
            //mala paractia de manejo de error agarrar y soltar uno nuevo 
            //log y throw
            //Si voy a hacer esto es preferible que no ponga el try catch y deje que el error suba solo 
            console.log(error);
            throw new Error("Un error");
        }
    }
}

function Pelicula({title, rating, awards, release_date, length}){
    this.title = title;
    this.rating = rating;
    this.awards = awards;
    this.release_date = release_date;
    this.length = length;
}