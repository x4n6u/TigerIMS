const mongoose = require('mongoose')

const Schema = mongoose.Schema

const historySchema = new Schema({
    itemId: {
        type: Schema.Types.ObjectId, ref:'Item',
        required: true
    },
    action: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    FromOrderId: {
        type: Schema.Types.ObjectId, ref:'order',
        required: true
    },
    itemGroupId: {
        type: Number,
        required: true
    }
    
}, {timestamps: true})

module.exports = mongoose.model('History', historySchema)