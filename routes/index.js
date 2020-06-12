const router = require('express').Router();
const isAuth = require('../middlewares/isAuth');
const indexController = require('../controllers/index');


// GET current user
router.get('/', isAuth, indexController.getUser);





module.exports = router;