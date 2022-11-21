const Router = require("express");
const router = new Router();
const userController = require("../controllers/userController");

router.post("/", userController.create);
router.get("/", userController.getAll);
router.get("/:id", userController.getById);

router.put("/:id", userController.edite);
router.delete("/:id", userController.deleteUser);

module.exports = router;
