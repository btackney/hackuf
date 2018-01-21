const models = require('../models');

exports.getBoxes = (req, res) => {
    models.box.findAll().then(Box => {
        if(Box){
            return res.json({success: true, message: Box})
        } else {
            res.status(500);
            return res.json({success: false, message: "Bad Request"})
        }
    })
};

exports.createBox = (req, res) => {
    console.log("create box");
    console.log(req);
    // models.box.sync({force: true}).then(() => {
        console.log(JSON.stringify(req.body));
        // Table created
        models.box.create({
            name: req.body.name,
            image: req.body.image,
            description: req.body.description,
            price: req.body.price,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            available: 1
        }).then(Box => {
            console.log(Box);
            return res.json(Box);
        });
    // });
};

