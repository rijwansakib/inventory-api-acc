const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema.Types;
const validator = require('validator')
//schema Desgin 

const stockSchema = mongoose.Schema({
    productId:{
        type: ObjectId,
        require: true,
        ref:'Product'
    },
    name: {
        type: String,
        trim: true,
        unique: true,
        required: [true, "name required."],
        maxlength:100,
        lowercase: true,
    },
    description: {
        type: String,
        require: true

    },
    unit: {
        type: String,
        required: true,
        enum: {
            values: ['kg', 'liter', 'pcs', 'bag'],
            message: "unit cont't be {value} must be kg/liter/pcs/bag"
        }
    },
    imageURLs: [{
        type: String,
        require: true,
        validate: {
            validator: (value) => {
                if (Array.isArray(value)) {
                    return false
                }

                let isvalide = true;
                value.forEach(url => {
                    if (validator.isURL(url)) {
                        isvalide = false
                    }

                });
                return isvalide;
            },
            message: 'please provide valid image url'
        }
    }],
    price:{
        type:Number,
        require: true,
        min:[0,'product price can not nagative']
    },
    quantity:{
        type:Number,
        require: true,
        min:[0,'product quantity can not nagative']
    },
    catagorires: {
        type: String,
        required: true,
    },
    brand: {
        name: {
            type: String,
            require: true
        },
        id: {
            type: ObjectId,
            ref: 'Brand',
            require: true
        }
    },
    status:{
        type:String,
        require:true,
        enam:{
            values:['in-stock','out-of-stock','discountinued'],
            message:"STATUS CAN NOT BE {VALUE}"
        }
    },
    store: {
        name: {
            type: String,
            trim: true,
            require: [true, 'please provide a store name'],
            lowercase: true,
            enum: {
                values: ['dhaka', 'chattrogram', 'rajshahi', 'khulna', 'rangpur', 'mymenshing', 'baridhal', 'sylhet'],
                message: '{VALUE} is not valid name'
            }
        },
        id:{
            type: ObjectId,
            require: true,
            ref:'store'
        }
    },

    suppliedBy:{
        name:{
            type:String,
            trim: true,
            require:[true,'please provide a supplier name']
        },
        id:{
            type: ObjectId,
            ref:'supplire'
        }

    }

}, {
    timestamps: true
})

//model


const Stock = mongoose.model('Stock', stockSchema)


module.exports = Stock;