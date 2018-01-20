module.exports = (sequelize, DataTypes) => {
    const Box = sequelize.define('box', {
        name: DataTypes.STRING,
        image: DataTypes.STRING,
        description: DataTypes.STRING,
        price: DataTypes.STRING,
        latitude: DataTypes.STRING,
        longitude: DataTypes.STRING
    });
    return Box;
};