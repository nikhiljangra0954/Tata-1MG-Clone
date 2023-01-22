// here we create models and schema for the posts

const mongoose = require('mongoose');

const dataSchema = mongoose.Schema({
    title:String,
    img:String,
    price:Number,
    rating:Number
},{
    versionKey:false
})

const Datamodel = mongoose.model('data', dataSchema);

module.exports ={
    Datamodel
}