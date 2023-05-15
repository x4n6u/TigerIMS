const express = require('express')
const {
    getItem,
    getItems,
    createItem,
    deleteItem,
    updateItem,
    getItemByName

} = require('../controllers/itemController')

//create an instance of the router
const router = express.Router()

//get all items
router.get('/', getItems)

//get single item
router.get('/:id', getItem)

//post new item
router.post('/', createItem)

//delete an item
router.delete('/:id', deleteItem)

//update an item
router.patch('/:id', updateItem)

//get Item by name
router.get('/name/:name', getItemByName)

module.exports = router