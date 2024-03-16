const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    industry: {
        type: String,
        required: true
    },
    orders: [
        {
            description: String,
            amountInCents: Number
        }
    ]

});
//this maps the objext to the database

module.exports = mongoose.model('Customer', customerSchema);
//module.ecports=mongooose.model("customer",customerSchema)
