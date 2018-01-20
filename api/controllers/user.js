const models = require('../models');

exports.createUser = () => {
    models.user.sync({force: true}).then(() => {
        // Table created
        return models.user.create({
            name: 'sheldon',
            email: 'lalalla',
            phone: '8675309'
        });
    });
};