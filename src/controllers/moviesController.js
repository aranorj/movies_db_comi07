let db = require('../model/db/models')

module.exports = {
    list: function(req, res) { 
        db.Peliculas.findAll()
        .then((peliculas)=>{
            res.render('moviesList', {movies: peliculas})
        })
        .catch((error)=>{ 
            console.log(error);
            res.send("Ha opcurrido un erro al recuperar los datos, por favor reintente mas tarde")})
    }
}