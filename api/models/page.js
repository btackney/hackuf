module.exports = (sequelize, DataTypes) => {
    let Page = sequelize.define('page', {
        name: DataTypes.STRING,
        coverURI: DataTypes.STRING,
        contentURI: DataTypes.STRING
    });
    return Page;
};