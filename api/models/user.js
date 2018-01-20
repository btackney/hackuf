module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        userId: DataTypes.STRING,
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        pictureId: DataTypes.STRING
    });
    return User;
};