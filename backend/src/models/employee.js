const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    encyptedPassword: {
        type: String,
        required: true
    }

});
//this maps the objext to the database

module.exports = mongoose.model('Employees', employeeSchema);
//module.ecports=mongooose.model("customer",customerSchema)
