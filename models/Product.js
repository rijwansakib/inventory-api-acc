const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema.Types;
const {validator }= require('validator')
//schema Desgin 

const productSchema = mongoose.Schema({
    name: {
        type: String,
        trim:true,
        unique: true,
        required: [true, "name required."],
        lowercase:true,
    },
    description: {
        type: String,
        require: true

    },
    unit: {
        type: String,
        required: true,
        enum: {
            values: ['kg', 'liter', 'pcs','bag'],
            message: "unit cont't be {value} must be kg/liter/pcs/bag"
        }
    },
    imageURLs:[{
        type:String,
        require:true,
       //validate: [validator.imageURLs,"plase provide valid url(s)"]
    }],
    category: {
        type: String,
        required: true,
    },
    brand:{
        name:{
            type:String,
            require:true
        },
        id:{
            type: ObjectId,
            ref:'Brand',
            require:'true'
        }
    },
    
}, {
    timestamps: true
})

//model


const Product = mongoose.model('Product', productSchema)


module.exports = Product;