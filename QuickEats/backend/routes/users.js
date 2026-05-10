const router = require("express").Router();
const c = require("../controllers/usersController");
router.get("/", c.list);
router.get("/:id", c.byId);
module.exports = router;
