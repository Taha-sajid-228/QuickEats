const router = require("express").Router();
const c = require("../controllers/ordersController");
router.get("/", c.list);
router.get("/:id", c.byId);
module.exports = router;
