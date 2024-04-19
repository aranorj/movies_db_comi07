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

    return sequelize.define(alias, cols, config);
}