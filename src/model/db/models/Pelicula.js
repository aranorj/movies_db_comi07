module.exports = (sequelize, DataTypes)=>{
    
    let alias = 'Peliculas';
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        title:{
            type: DataTypes.STRING(500),
            allowNull: false
        },
        rating: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        awards: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        release_date:{
            type: DataTypes.DATE,
            allowNull: false
        },
        length: DataTypes.INTEGER
    };

    let config = {
        tableName: 'movies',
        timestamps: false
    }

    let Pelicula = sequelize.define(alias, cols, config);
    
    Pelicula.associate = (models) => {
        Pelicula.hasMany(models.Actores, {as: "actoresConPeliculaComoFavorita", foreignKey: "favorite_movie_id"})
        Pelicula.belongsToMany(models.Actores, {
            as: 'actores',
            through: 'actor_movie',
            timestamps: false, 
            foreignKey: 'movie_id',
            otherKey: 'actor_id'
        })
    }

    return Pelicula;

}