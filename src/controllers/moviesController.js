const peliculaService = require('../model/services/peliculaService');

module.exports = {
    list: function(req, res) { 
        peliculaService.getAll()
        .then((peliculas)=>{
            //res.render('moviesList', {movies: peliculas})
            res.send({movies: peliculas})
        })
        .catch((error)=>{
            res.render('moviesList', {movies: error})
        })       
    },

   
    recomended: async function(req,res){
        try {
            let pelicula = await peliculaService.getAll();
            res.render('recommendedMovies', {movies : pelicula})
        } catch (error) {
            res.send("Ha ocurrido un error inesperado").status(500);
        }
    },

    new: async function(req,res){
        try {
            let pelicula = await peliculaService.getAll({ 
                attributes: ['title', 'release_date'],
                order: [['release_date', 'DESC']],
                limit: 5 
                 
            });
            res.render('newestMovies', {movies: pelicula})
        } catch (error) {
            res.send("Ha ocurrido un error inesperado").status(500);
        }
    },

    create: async function(req,res){
        try {
            res.render('createMovie')
        } catch (error) {
            res.send("Ha ocurrido un error inesperado").status(500);
        }
    },

    store: async function(req,res){
        try {
            let pelicula= await peliculaService.save(req.body)// Espera hasta que save(req.body) resuelva, es decir guarde la pelicula
            //let peliculas = await peliculaService.getAll(); // Espera hasta que getAll() obtenga todas las peliculas
            res.redirect(`/movies/`);
            //res.render('moviesList', {movies: peliculas})// renderiza
        } catch (error) {
            res.send("Ha ocurrido un error inesperado al guardar la pelicula").status(500);
        }
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
            //res.render('moviesDetail', {movie: pelicula}); 
            res.send({movie: pelicula});  
        } catch (error) {
            res.send("Ha ocurrido un error inesperado al recuperar la pelicula ").status(500);
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