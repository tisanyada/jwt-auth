const router = require('express').Router();
const isAuth = require('../middlewares/isAuth');
const profileController = require('../controllers/profile');


// GET user profile
router.get('/', isAuth, profileController.getProfile);

// POST create profile
router.post('/', isAuth, profileController.postCreateProfile);

// POST update profile
router.post('/update', isAuth, profileController.postUpdateProfile);




module.exports = router;