const router = require("express").Router();
const c = require("../controllers/promotionsController");
router.get("/", c.list);
router.get("/:id", c.byId);
module.exports = router;
