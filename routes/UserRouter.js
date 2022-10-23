const router = require('express').Router();

const {
  GetAllUser,
  UpdateUser,
  DeleteUser,
} = require("../controllers/UserController");

router.route("/").get(GetAllUser);
router.route("/:id").patch(UpdateUser).delete(DeleteUser);


module.exports = router;