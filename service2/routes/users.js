const controller = require("../controller/users");
const router = require("express").Router();

router.post("/update/:id", controller.updateUser);
router.post("/delete/:id", controller.deleteUser);

module.exports = router;
