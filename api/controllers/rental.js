const models = require('../models');

const helpers = {
    updateBoxAvailability: (req, status) => {
        models.box.findById(req.query.boxId).then(Box => {
            if(Box){
                Box.updateAttributes({
                    available: status
                }).then(() => {
                    let messageText = "";
                    status === 0 ? messageText = "Successfully picked up rental" : messageText = "Successfully picked up rental";
                    return res.json({success: true, message: messageText});
                });
            } else{
                res.status(500);
                return res.json({success: false, message: "An error occured, please try again."});
            }

        });
    }
};

exports.createRental = (req, res) => {
    models.rental.create({
        boxId: req.query.boxId,
        userId: req.query.boxId,
        pickup: req.query.pickup,
        dropoff: req.query.dropoff,
        pin: req.query.pin,
        //TODO chargeamount calc by pickup - dropoff hours
        complete: 0
    }).then(Rental => {
        if (Rental) {
            return res.json({success: true, message: Rental})
        } else {
            res.status(500);
            return res.json({success: false, message: "Bad Request"})
        }
    });
};

exports.pickup = (req, res) => {
    models.rental.findOne({
        where: {boxId: req.query.boxId, complete: 0, pin: req.query.pin}
    }).then(Rental => {
        console.log("rental " + Rental);
        if(Rental){
            let now = new Date();
            if(now < Rental.dropoff){
                // models.box.findById(req.query.boxId).then(Box => {
                //     if(Box){
                //         Box.updateAttributes({
                //             available: 0
                //         }).then(() => {
                //             return res.json({success: true, message: "Successfully dropped off rental, rental complete, thank you."});
                //         });
                //     } else{
                //         res.status(500);
                //         return res.json({success: true, message: "Successfully dropped off rental, rental complete, thank you."});
                //     }
                //
                // });
                helpers.updateBoxAvailability(req, 0)
            } else {
                res.status(500);
                return res.json({success: false, message: "Bad Timing."});
            }
        } else {
            res.status(500);
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
            // models.box.findById(req.query.boxId).then(Box => {
            //     if(Box){
            //         Box.updateAttributes({
            //             available: 0
            //         }).then(() => {
            //             return res.json({success: true, message: "Successfully dropped off rental, rental complete, thank you."});
            //         });
            //     } else{
            //         res.status(500);
            //         return res.json({success: true, message: "Successfully dropped off rental, rental complete, thank you."});
            //     }
            //
            // });
            helpers.updateBoxAvailability(req, 1);
        } else{
            res.status(500);
            return res.json({success: false, message: "Bad Request"})
        }
    });
};