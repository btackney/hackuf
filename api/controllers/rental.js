const models = require('../models');


exports.createRental = (req, res) => {

    models.rental.create({
        boxId: req.body.boxId,
        userId: req.body.userId,
        pickup: new Date(),
        //TODO pin or face
        //TODO chargeamount calc by pickup - dropoff hours
        complete: 0
    }).then(Rental => {
        if (Rental) {
            console.log("rental made");
            models.box.findById(req.body.boxId).then(Box => {
                if (Box) {
                    Box.available = 0;
                    Box.save().then(() => {
                        return res.json({
                            success: true,
                            message: "Successfully created rental, thank you."
                        });
                    });
                } else {
                    res.status(500);
                    return res.json({
                        success: false,
                        message: "Failed to create Rental."
                    });
                }
            });
        } else {
            res.status(500);
            return res.json({success: false, message: "Failed to create rental."});
        }
    });
};

exports.pickup = (req, res) => {
    models.rental.findOne({
        where: {boxId: req.body.boxId, complete: 0, userId: req.User.userId}
    }).then(Rental => {
        console.log("rental " + Rental);
        if(Rental){
            models.box.findById(req.body.boxId).then(Box => {
                if(Box){
                    Box.available = 0;
                    Box.save().then(() => {
                        return res.json({success: true, message: "Thanks for picking up your rental, have fun!"});
                    });
                } else {
                    res.status(500);
                    return res.json({success: false, message: "Something went wrong, please try again."});
                }
            });
        } else {
            res.status(500);
            return res.json({success: false, message: "Could Not Find Rental Request"})
        }
    });
};

exports.dropoff = (req, res) => {
    models.rental.findOne({
      where: {boxId: req.body.boxId, complete: 0, userId: req.User.userId}
    }).then(Rental => {
        console.log("rental " + Rental);
        if(Rental){
            Rental.complete = 1;
            Rental.save().then(() => {
                return res.json({success: true, message: "Thanks for bringing your rental back, we hope to see you again soon!"});
            });

            models.box.findById(req.body.boxId).then(Box => {
                if(Box){
                    Box.available = 0;
                    Box.save().then(() => {
                        console.log(Box.name + " available again");
                    });
                } else{
                    throw error("Internal error hasnt updated box to be available, must fix manually.");
                }
            });
        } else {
            res.status(500);
            return res.json({success: false, message: "Failed to return item, please try again."})
        }
    });
};