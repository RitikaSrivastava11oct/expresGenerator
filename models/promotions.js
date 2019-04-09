const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose); 
const Currency = mongoose.Types.Currency;

var promotionSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    }, 
    image: {
        type: String,
        required: true
    },
   
    label: {
        type: String,
        default: ''
    },
    price: {
        type: Currency,
        required: true,
        min: 0
    }
 
}, {
    timestamps: true //this will automatically add the created at and updated at, two timestamps into each document that is stored in our application and it'll automatically update these values.
});

var Promotions = mongoose.model('Promotion', promotionSchema);

module.exports = Promotions;
