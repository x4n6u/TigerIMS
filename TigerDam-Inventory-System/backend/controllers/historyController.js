const mongoose = require('mongoose')
const History = require('../models/historyModel')

//get all orders
const getHistory = async (req, res) => {
    const history = await History.find({}).sort({createdAt: -1})

    res.status(200).json(history)
}

//get one order
const getHistorys = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such history'})
    }

    const history = await History.findById(id)

    if (!history){
        return res.status(404).json({error: 'No such history'})
    }

    res.status(200).json(history)
}

module.exports = {
    getHistory
    ,getHistorys
}