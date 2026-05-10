const router = require("express").Router();
const c = require("../controllers/restaurantsController");
router.get("/", c.list);
router.get("/:id", c.byId);
module.exports = router;
