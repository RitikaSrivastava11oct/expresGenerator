const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose); 
const Currency = mongoose.Types.Currency;

var leaderSchema = new Schema({
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
    designation: {
        type: String,
        required: true
    },
   	abbr: {
        type: String,
        required: true
    }
    
}, {
    timestamps: true //this will automatically add the created at and updated at, two timestamps into each document that is stored in our application and it'll automatically update these values.
});

var Leaders = mongoose.model('Leader', leaderSchema);

module.exports = Leaders;