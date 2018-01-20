module.exports = (sequelize, DataTypes) => {
    const Rental = sequelize.define('rental', {
        boxId: DataTypes.STRING,
        userId: DataTypes.STRING,
        pickup: DataTypes.DATE,
        dropoff: DataTypes.DATE,
        chargeAmount: DataTypes.INTEGER,
        pin: DataTypes.INTEGER,
        complete: DataTypes.BOOLEAN
    });
    return Rental;
};