const router = require('express').Router();
const authController = require('../controllers/auth');


// POST create new user
router.post('/signup', authController.postSignup);

// POST create new user
router.post('/login', authController.postLoginUser);




module.exports = router;