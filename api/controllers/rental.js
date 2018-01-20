const models = require('../models');

exports.createRental = (req, res) => {
    // models.rental.sync({force: true}).then(() => {
        models.rental.create({
            boxId: req.query.boxId,
            pickup: req.query.pickup,
            dropoff: req.query.dropoff,
            pin: req.query.pin,
            //TODO chargeamount calc by pickup - dropoff hours
            complete: 0
        }).then(Rental => {
            if (Rental) {
                return res.json({success: true, message: Rental})
            } else {
                return res.json({success: false, message: "Bad Request"})
            }
        });
    // });
};

exports.pickup = (req, res) => {
    models.rental.findOne({
        where: {boxId: req.query.boxId, complete: 0, pin: req.query.pin}
    }).then(Rental => {
        console.log("rental " + Rental);
        if(Rental){
            let now = new Date();
            if(now < Rental.dropoff){
                return res.json({success: true, message: "Success Grab Your Rental"});
            } else {
                return res.json({success: false, message: "Bad Timing."});
            }
        } else {
            return res.json({success: false, message: "Bad Request"})
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
                return res.json({success: true, message: "Successfully dropped off rental, rental complete, thank you."});
            });
        } else{
            return res.json({success: false, message: "Bad Request"})
        }
    });
};