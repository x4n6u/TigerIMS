const express = require('express')
const {
    getHistory,
    getHistorys
} = require('../controllers/historyController')

//create an instance of the router
const router = express.Router()

//get all Orders
router.get('/', getHistory)

//get single Order
router.get('/:id', getHistorys)

module.exports = router