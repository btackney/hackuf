module.exports = (sequelize, DataTypes) => {
    let User = sequelize.define('user', {
        name: DataTypes.STRING,
        phone: DataTypes.STRING,
        email: DataTypes.STRING
    });
    return User;
};