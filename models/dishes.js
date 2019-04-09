const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose); //to use the mongoose currency to declare the type of currency
const Currency = mongoose.Types.Currency;// currency type is added in the mongoose

var commentSchema = new Schema({
    rating:  {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment:  {
        type: String,
        required: true
    },
    author:  {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

var dishSchema = new Schema({
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
    category: {
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
    },
    featured: {
        type: Boolean,
        default:false      
    },
    comments:[commentSchema] // this is the sub-document
}, {
    timestamps: true //this will automatically add the created at and updated at, two timestamps into each document that is stored in our application and it'll automatically update these values.
});

var Dishes = mongoose.model('Dish', dishSchema);

module.exports = Dishes;