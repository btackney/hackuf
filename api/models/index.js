let fs        = require('fs');
let path      = require('path');
let Sequelize = require('sequelize');
let basename  = path.basename(__filename);
let db        = {};
let sequelize = new Sequelize('mysql://hackuf:hackufbox@hackuf.cul7mcskonmm.us-east-1.rds.amazonaws.com:3306/hackuf');

fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        let model = sequelize['import'](path.join(__dirname, file));
        db[model.name] = model;
    });

// db.box.hasMany(db.rental, {as: 'rental'});
// db.rental.hasOne(db.box, {as: 'box'});

// Object.keys(db).forEach(modelName => {
//     if (db[modelName].associate) {
//         db[modelName].associate(db);
//     }
// });

db.sequelize = sequelize;
db.Sequelize = Sequelize;



module.exports = db;