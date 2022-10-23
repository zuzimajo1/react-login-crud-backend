const router = require('express').Router();

const { Register, Login } = require('../controllers/AuthController');

router.route("/").post(Register).get(Login)


module.exports = router;