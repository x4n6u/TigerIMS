const express = require('express')
const {
    getUsers,
    getUserId,
    getUserUsername,
    createUser,
    deleteUser,
    updateUser
} = require('../controllers/userController')

//create an instance of the router
const router = express.Router()

//get all items
router.get('/', getUsers)

//get single item
router.get('/:id', getUserId)
//get single user by username
router.get('/username/:username', getUserUsername)
//post new item
router.post('/', createUser)

//delete an item
router.delete('/:id', deleteUser)

//update an item
router.patch('/:id', updateUser)

module.exports = router