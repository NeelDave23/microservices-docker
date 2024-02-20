const controller = require("../controller/users");
const router = require("express").Router();

router.get("/", controller.getUsers);
router.get("/:id", controller.getUserById);
router.post("/", controller.createUser);

module.exports = router;
