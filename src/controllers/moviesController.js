const peliculaService = require('../model/services/peliculaService');

module.exports = {
    list: function(req, res) { 
        peliculaService.getAll()
        .then((peliculas)=>{
            res.render('moviesList', {movies: peliculas})
        })
        .catch((error)=>{
            res.render('moviesList', {movies: error})
        })       
    },
    edit: async function(req, res) {
        try {
            let pelicula = await peliculaService.getBy(req.params.id); 
            res.render('editMovie', {pelicula: pelicula});  
        } catch (error) {
            res.send("Ha ocurrido un error inesperado").status(500);
        }     
    },
    getOne: async function(req, res) {
        try {
            let pelicula = await peliculaService.getBy(req.params.id); 
            res.render('moviesDetail', {movie: pelicula});  
        } catch (error) {
            res.send("Ha ocurrido un error inesperado").status(500);
        }     
    },
    update: async function(req, res) {
        try {
            await peliculaService.updateBy(req.body, req.params.id);
            res.redirect(`/movies/${req.params.id}`);
        } catch (error) {
            res.send("No se pudo editar!!");
        }
    }
}