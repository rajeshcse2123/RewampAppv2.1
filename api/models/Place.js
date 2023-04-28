const mongoose=require('mongoose');
const placeSchema=new mongoose.Schema({
    owner:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    title:String,
    address:String,
    Photos:[String],
    description:String,
    perks:[String],
    extrainfo:String,
    checkin:Number,
    checkout:Number,
    maxGuest:Number,
});

const PlaceModel=mongoose.model('Place',placeSchema);
module.exports=PlaceModel;
