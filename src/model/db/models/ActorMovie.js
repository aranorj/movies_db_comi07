module.exports = (sequelize, DataTypes) => {
    let alias = 'ActorPelicula'; 
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        movie_id: DataTypes.INTEGER,
        actor_id: DataTypes.INTEGER
    }

    let config = {
        tableName: 'actor_movie',
        timestamps: false
    }
        
    let ActorPelicula = sequelize.define(alias, cols, config);
    
    ActorPelicula.associate = (models) => { 
        ActorPelicula.belongsTo(models.Actores, {
            as: 'actorPeliculaActor',
            foreignKey: 'actor_id'
        })
    }
    
    return ActorPelicula;
}