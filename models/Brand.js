var mongoose = require('mongoose');
const validator=require('validator')
const {ObjectId}=mongoose.Schema.Types;
const brandSchema= new mongoose.Schema({

    name:{
        type:String,
        trim:true,
        require:[true,'please provide a brand name'],
        maxLength:100,
        unique:true,
        lowercase:true
    },
    description:String,
    email:{
        type:String,
        validate:[validator.isEmail,'please provide valid email'],
        lowerCase: true,
    },
    website:{
        type:String,
        validate:[validator.isURL,"please provide a valid url"]
    },
    location:String,
    products:[{
        type:ObjectId,  
        ref:"Product"
    }],
    suppliers:[{
        name:String,
        ContactNumber:String,
        id:{
            type:ObjectId,
            ref:"Supplire"
        }
    }],
    status:{
        type:String,
        enum:['active','inactive'],
        default:'active'
    }

},{
    timestamps:true, 
});

const Brand = mongoose.model('Brand', brandSchema)

module.exports= Brand;