const router = require('express').Router();

const { Register, Login } = require('../controllers/AuthController');

router.get("/", Login);
router.post("/", Register);



module.exports = router;