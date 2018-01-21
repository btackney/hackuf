const salt = "brendanisgreat";
const models = require('../models');
const AWS = require('aws-sdk');
AWS.config.region = 'us-east-1';
const rekognition = new AWS.Rekognition();
const fs        = require('fs');

exports.checkPin = (req, res, next) => {
    let apiKey =  crypto.createHash('sha256').update(salt + req.query.pin).digest('hex');
    console.log("a new api key: " + apiKey);
    models.user.findOne({ where: {pin: apiKey} }).then(User => {
        if(User){
            req.User = User;
            return next();
        }
        else{
            res.status(400);
            res.json({success: false, message: "Bad Pin"});
        }
    });
};

exports.uploadFace = (req, res, next) => {
    let s3 = new AWS.S3();
    let uploadParams = { Bucket: 'hackuf', Body: '', Key: 'brendanisgreatggfdg' , ACL: "public-read"};
    let file = 'halloween2017.jpg';
    let fileStream = fs.createReadStream(file);
    fileStream.on('error', function(err) {
        console.log('File Error', err);
    });
    uploadParams.Body = fileStream;

    s3.upload (uploadParams, function (err, data) {
        if (err) {
            console.log("Error", err);
            res.status(500);
            return res.json({success: false, message: "Failed to upload image to s3" + err});
        }
        if (data) {
            console.log(data);
            req.s3Info = data;
            return next();
        }
    });

};

exports.checkFace = (req, res, next) => {
    let params = {
        SimilarityThreshold: 90,
        SourceImage: {
            S3Object: {
                Bucket: "hackuf",
                Name: "me.png"
            }
        },
        TargetImage: {
            S3Object: {
                Bucket: "hackuf",
                Name: "megustastu.png"
            }
        }
    };
    rekognition.compareFaces(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else console.log(data);
        return res.send(data);
    });
};