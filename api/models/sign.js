module.exports = (sequelize, DataTypes) => {
    let Sign = sequelize.define('sign', {
        name: DataTypes.STRING,
        description: DataTypes.STRING,
    });
    return Sign;
};