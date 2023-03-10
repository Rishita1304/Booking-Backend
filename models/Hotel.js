import mongoose from 'mongoose'

const HotelSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    photos:{
        type: String
    },
    desc:{
        type: String,
        required: true
    },
    rating:{
        type: Number,
        min: 0,
        max: 10
    },
    rooms:{
        type: [String]
    },
    price:{
        type: Number,
        required: true
    },
    featured:{
        type: Boolean,
        default: false
    },
});

const Hotel = mongoose.model("Hotel", HotelSchema);
export default Hotel;