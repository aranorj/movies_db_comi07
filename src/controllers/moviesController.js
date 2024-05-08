const peliculaService = require('../model/services/peliculaService');
const { StoreResponse } = require('../model/services/utils/responses');

module.exports = {
    list: function (req, res) {
        peliculaService.getAll()
            .then((peliculas) => {
                //res.set('Content-type', 'application/json')
                //res.render('moviesList', {movies: peliculas})
                res.json({ movies: peliculas }).status(200)
            })
            .catch((error) => {
                res.render('moviesList', { movies: error })
            })
    },


    recomended: async function (req, res) {
        try {
            let pelicula = await peliculaService.getAll();
            res.render('recommendedMovies', { movies: pelicula })
        } catch (error) {
            res.send("Ha ocurrido un error inesperado").status(500);
        }
    },

    new: async function (req, res) {
        try {
            let pelicula = await peliculaService.getAll({
                attributes: ['title', 'release_date'],
                order: [['release_date', 'DESC']],
                limit: 5

            });
            res.render('newestMovies', { movies: pelicula })
        } catch (error) {
            res.send("Ha ocurrido un error inesperado").status(500);
        }
    },

    create: async function (req, res) {
        try {
            res.render('createMovie')
        } catch (error) {
            res.send("Ha ocurrido un error inesperado").status(500);
        }
    },
    store: async function (req, res) {
        try {
            let pelicula = await peliculaService.save(req.body)// Espera hasta que save(req.body) resuelva, es decir guarde la pelicula
            let url = `${req.protocol}://${req.get('host')}${req.originalUrl}/${pelicula.id}`
            res.json(new StoreResponse(pelicula.id, url)).status(200);
        } catch (error) {
            res.send("Ha ocurrido un error inesperado al guardar la pelicula").status(500);
        }
    },
    edit: async function (req, res) {
        try {
            let pelicula = await peliculaService.getBy(req.params.id);
            res.render('editMovie', { pelicula: pelicula });
        } catch (error) {
            res.send("Ha ocurrido un error inesperado").status(500);
        }
    },
    getOne: async function (req, res) {
        try {
            let pelicula = await peliculaService.getBy(req.params.id);
            //res.render('moviesDetail', {movie: pelicula}); 
            res.send({ movie: pelicula });
        } catch (error) {
            res.send("Ha ocurrido un error inesperado al recuperar la pelicula ").status(500);
        }
    },
    update: async function (req, res) {
        try {
            await peliculaService.updateBy(req.body, req.params.id);
            res.redirect(`/movies/${req.params.id}`);
        } catch (error) {
            res.send("No se pudo editar!!");
        }
    },
    getTrends: async function (req, res) {
        const url = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US';
        const options = {
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMWI2NGQ4NjVhNmQ2OWE0NGJjMWM5OTA2ODlmNWYxOCIsInN1YiI6IjY2M2FhNWFhYzk1NDk4NzFiZjNlZDI2OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.B6ceOKbO8wc3UDYIllcgiTVcmOsSR-4cNqTgsCbO5uA'
            }
        };

        // fetch(url, options)
        //     .then(apiResponse => apiResponse.json())
        //     .then(trendsJson => res.json(trendsJson).status(200))
        //     .catch(err => res.send('error:' + err).status(502));

        try {
            let apiResponse = await fetch(url, options);        
            let trendsJson = await apiResponse.json();
            res.json(trendsJson).status(200);
        } catch (err) {
            console.log(err);
            res.send('error:' + err).status(502);
        }


    
    }
}