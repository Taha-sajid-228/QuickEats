/**
 * QuickEats — Express server
 * Serves the static frontend and exposes dummy JSON APIs.
 */
const express = require("express");
const cors = require("cors");
const path = require("path");

const restaurantsRouter = require("./routes/restaurants");
const foodsRouter = require("./routes/foods");
const usersRouter = require("./routes/users");
const ordersRouter = require("./routes/orders");
const reviewsRouter = require("./routes/reviews");
const promotionsRouter = require("./routes/promotions");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// ---------- API ROUTES ----------
app.use("/api/restaurants", restaurantsRouter);
app.use("/api/foods", foodsRouter);
app.use("/api/users", usersRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/reviews", reviewsRouter);
app.use("/api/promotions", promotionsRouter);

// ---------- STATIC FRONTEND ----------
const frontendDir = path.join(__dirname, "..", "frontend");
app.use(express.static(frontendDir));

// Pretty URLs: /login -> /pages/login.html
app.get("/", (_req, res) => res.sendFile(path.join(frontendDir, "pages", "landing.html")));
app.get("/:page", (req, res, next) => {
  const file = path.join(frontendDir, "pages", `${req.params.page}.html`);
  res.sendFile(file, (err) => (err ? next() : null));
});

app.listen(PORT, () => {
  console.log(`\n🍔  QuickEats running at http://localhost:${PORT}\n`);
});
