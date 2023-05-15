const mongoose = require('mongoose');

const Schema = mongoose.Schema

const orderSchema = new Schema({
    orderDate:{
        type:  Date,
        required: true
    },
    orderName:{
        type:  String,
        required: true
    },
    orderItems: [{
        itemName:{
            type: String
        },
        itemQuantity:{
            type: Number
        },
        itemID:{
            type: Schema.Types.ObjectId
        }    
    }],
    isFulfilled:{
        type: Boolean,
        required: true
    }
},
{timestamps: true})

module.exports = mongoose.model('order', orderSchema)