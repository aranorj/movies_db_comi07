module.exports = (sequelize, DataTypes) => {
let alias = 'Actores'; 
let cols = {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    first_name:{
        type: DataTypes.STRING(500),
        allowNull: false
    },
    last_name:{
        type: DataTypes.STRING(500),
        allowNull: false
    },
    rating: DataTypes.DECIMAL,
    favorite_movie_id: DataTypes.INTEGER
}
let config = {
    tableName: 'actors',
    timestamps: false
}

let Actor = sequelize.define(alias, cols, config);

Actor.associate = (models) => {
    Actor.belongsTo(models.Peliculas, {
        as: "peliculaFavorita",
        foreignKey: "favorite_movie_id"
    }),

    Actor.belongsToMany(models.Peliculas, {
        as: 'peliculas',
        through: 'actor_movie',
        timestamps: false, 
        foreignKey: 'actor_id',
        otherKey: 'movie_id'
    }),

    Actor.hasMany(models.ActorPelicula, {
        as: 'actorActorPelicula',
        foreignKey: 'actor_id'
    } )
}


return Actor;
}