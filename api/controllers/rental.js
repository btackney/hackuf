const models = require('../models');

exports.createRental = (req, res) => {
    models.rental.create({
        boxId: req.query.boxId,
        pickup: req.query.pickup,
        dropoff: req.query.dropoff,
        pin: req.query.pin,
        complete: 0
    }).then(Rental => {
        if(Rental){
            res.json({success: true, message: Rental})
        } else{
            res.json({success: false, message: "Bad Request"})
        }
    });
};

exports.pickup = (req, res) => {
    models.rental.findOne({
        where: {boxId: req.query.boxId, complete: 0, pin: req.query.pin}
    }).then(Rental => {
        console.log("rental " + Rental);
        if(Rental){
            res.json({success: true, message: "Success Grab Your Rental"});
        } else {
            res.json({success: false, message: "Bad Request"})
        }
    });
};

exports.dropoff = (req, res) => {
    models.rental.findOne({
      where: {boxId: req.query.boxId, complete: 0, pin: req.query.pin}
    }).then(Rental => {
        console.log("rental " + Rental);
        if(Rental){
            Rental.updateAttributes({
                complete: 1
            }).then(() => {
                res.json({success: true, message: "Successfully dropped off rental, rental complete, thank you."});
            });
        } else{
            res.json({success: false, message: "Bad Request"})
        }
    });
};