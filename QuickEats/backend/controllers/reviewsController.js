const data = require("../data/reviews.json");
exports.list = (req, res) => res.json(data);
exports.byId = (req, res) => {
  const item = data.find(d => d.id === req.params.id || d.code === req.params.id);
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
};
