const models = require('../models');

exports.getBoxes = (req, res) => {
    models.box.findAll().then(Box => {
        if(Box){
            return res.json({success: true, message: Box})
        } else {
            return res.json({success: false, message: "Bad Request"})
        }
    })
};

exports.createBox = (req, res) => {
    console.log("create box");
    console.log(req);
    // models.box.sync({force: true}).then(() => {
        console.log(JSON.stringify(req.query));
        // Table created
        models.box.create({
            name: req.query.name,
            image: req.query.image,
            description: req.query.description,
            price: req.query.price,
            latitude: req.query.latitude,
            longitude: req.query.longitude
        }).then(Box => {
            console.log(Box.get);
            return res.json(Box.get);
        });
    // });
};

