const models = require('../models');

exports.createUser = (req, res) => {
    models.user.sync({force: true}).then(() => {
        // Table created
        models.user.create({
            userId: req.query.userId,
            name: req.query.name,
            email: req.query.email,
            // picture: req.query.picture,
        });
    });
};

exports.updateUser = (req, res) => {
    models.user.findOne({
        where: { userId: req.query.userId}
    }).then(User => {
        if(User){
            User.updateAttributes({
                name: req.query.name,
                email: req.query.email,
                picture: req.query.picture
            }).then(() => {
                return res.json({success: true, message: "Successfully updated user."});
            });
        } else{
            res.status(500);
            return res.json({success: false, message: "Bad userId"})
        }
    })
};