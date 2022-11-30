const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const verifyToken = require('../middlewares/verifyToken');

//methode get
router.get('/:id', verifyToken, userController.getUser);
//methode put
router.put('/:id', userController.updateUser);
//methode delete
router.delete('/:id', userController.deleteUser);
//methode get
router.get('/', userController.getUsers);

module.exports = router;
