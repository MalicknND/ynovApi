const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const {
  checkEmail,
  checkIdentity,
  checkPassword,
  validation,
} = require('../middlewares/validators');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post(
  '/register',
  checkEmail,
  checkPassword,
  checkIdentity,
  validation,
  authController.register
);
router.post(
  '/login',
  checkEmail,
  checkPassword,
  validation,
  authController.login
);

module.exports = router;
