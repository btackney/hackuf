const models = require('../models');
const request = require('request');
const fs        = require('fs');
const AWS = require('aws-sdk');
AWS.config.region = 'us-east-1';


exports.preUser = (req, res, next) => {
    console.log("preuser");
    let download = function(uri, filename, callback){
        request.head(uri, function(err, res, body){
            console.log('content-type:', res.headers['content-type']);
            console.log('content-length:', res.headers['content-length']);
            request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
        });
    };
    download(req.body.faceImage, req.body.UserId + ":ProfilePic", function(){
        console.log('done');
        console.log("upload face");
        let s3 = new AWS.S3();
        let uploadParams = { Bucket: 'hackuf', Body: '', Key: req.body.UserId + ":ProfilePic" , ACL: "public-read"};
        let fileName = req.body.UserId + ":ProfilePic";
        let fileStream = fs.createReadStream(fileName);
        fileStream.on('error', function(err) {
            console.log('File Error', err);
        });
        uploadParams.Body = fileStream;
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
                fs.unlink(req.body.UserId + ":ProfilePic", (err) => {
                    if (err) throw err;
                    console.log('successfully uploaded picture to s3 & deleted file');
                    req.s3Name = req.body.UserId + ":ProfilePic";
                    return next();
                });
            }
        });
    });
};


exports.createUser = (req, res) => {
    // models.user.sync({force: true}).then(() => {
        // Table created
        // console.log(req);
        // console.log(req.body.faceImage);
        models.user.create({
            userId: req.body.userId,
            faceImage: req.s3Name,
            pin: req.body.pin
        }).then(User => {
            return res.json(User);
        });
    // });
};

// exports.updateUser = (req, res) => {
//     console.log(req);
//     models.user.findOrCreate({
//         where: { userId: req.body.userId}
//     })
//         .spread((user, created) => {
//             user.get({
//                 plain: true,
//
//             });
//             console.log(created);
//             User.userId = req.body.userId;
//             User.faceImage = req.body.faceImage;
//             User.pin = req.body.pin;
//             User.save().then(() => {
//                 return res.json({success: true, message: "Successfully created user."});
//             });
//         });
// };