const models = require('../models');
const AWS = require('aws-sdk');
AWS.config.region = 'us-east-1';
const rekognition = new AWS.Rekognition();



exports.checkPin = (req, res, next) => {
    console.log(req.body);
    models.user.findOne({ where: {pin: req.body.pin} })
        .then(function(User)  {
            console.log("check pin");
            if(!User){
                console.log("no user found");
                res.status(400);
                return res.json({success: false, message: "Bad Pin"});
            } else {
                console.log("has user");
                req.User = User;
                return next();
            }
    });

};


exports.checkFace = (req, res, next) => {
    models.rental.findOne({ where: {boxId: req.body.boxId}}).then(Rental => {
        models.user.findOne({where: {userId: Rental.userId}}).then(User => {
            let params = {
                SimilarityThreshold: 90,
                SourceImage: {
                    S3Object: {
                        Bucket: "hackuf",
                        Name: User.faceImage
                    }
                },
                TargetImage: {
                    Bytes: req.body.image
                }
            };
            rekognition.compareFaces(params, function(err, data) {
                if (err){
                    console.log(err, err.stack); // an error occurred
                }
                else {
                    req.User = User;
                    return next();
                }
            });
        });
    });
};