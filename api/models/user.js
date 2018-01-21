module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        userId: DataTypes.STRING,
        faceImage: DataTypes.STRING,
        pin: DataTypes.STRING
    });
    return User;
};