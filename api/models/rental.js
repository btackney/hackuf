module.exports = (sequelize, DataTypes) => {
    const Rental = sequelize.define('rental', {
        boxId: DataTypes.STRING,
        pickup: DataTypes.DATE,
        dropoff: DataTypes.DATE,
        pin: DataTypes.INTEGER,
        complete: DataTypes.BOOLEAN
    });
    return Rental;
};