const salt = "brendanisgreat";
const models = require('../models');
const AWS = require('aws-sdk');
AWS.config.region = 'us-east-1';
const rekognition = new AWS.Rekognition();
const fs        = require('fs');
const formidable = require('formidable');
const crypto = require('crypto');

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

exports.downloadImage = (req, res, next) => {

};

exports.uploadForm = (req, res, next) => {
    console.log("upload form");
    console.log(req);
    let form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        res.writeHead(200, {'content-type': 'text/plain'});
        res.write('received upload:\n\n');
        res.end(util.inspect({fields: fields, files: files}));
        console.log("Form stuff:" + fields + files);
        return next();
    });
};

exports.uploadFace = (req, res, next) => {
    console.log("upload face");
    let s3 = new AWS.S3();
    let uploadParams = { Bucket: 'hackuf', Body: '', Key: 'brendanisgreatggfdg' , ACL: "public-read"};
    let file = req.body.image;

    // let fileStream = fs.createReadStream(file);
    // fileStream.on('error', function(err) {
    //     console.log('File Error', err);
    // });
    // uploadParams.Body = fileStream;
    uploadParams.Body = file;
    console.log("uploadParams: " + uploadParams);
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
        return next();
    });
};