const router = require('express').Router();
const passport = require('passport');
const isAuth = require('../middlewares/isAuth');
const authController = require('../controllers/auth');


// POST create new user
router.post('/signup', authController.postSignup);

// POST create new user
router.post('/login', authController.postLoginUser);

// GET current user
router.get('/', isAuth, authController.getUser);



module.exports = router;