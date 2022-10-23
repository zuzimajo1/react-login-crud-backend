const router = require('express').Router();

const {
  GetAllUser,
  UpdateUser,
  DeleteUser,
} = require("../controllers/UserController");
const { verifyToken } = require('../middleware/jwt');

router.get("/", verifyToken, GetAllUser);
router.patch("/:id", verifyToken, UpdateUser);
router.delete("/:id", verifyToken, DeleteUser);



module.exports = router;