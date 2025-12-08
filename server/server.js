import express from "express";
import { PORT } from "./config/config.js";
import userRoute from "./routes/userRoute.js";
import loginRoute from "./routes/authRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import productRoute from "./routes/productRoute.js";
import orderRoute from "./routes/orderRoute.js";
import taxRoute from "./routes/taxRoute.js";
import ReportRoute from "./routes/reportsRoute.js";
import notfound from "./middlewares/notfound.js";
import { ConnectDB } from "./config/db.js";
import cors from "cors";

const app = express();

app.use(express.json());
//Enable Cors
app.use(
  cors({
    origin: "http://localhost:3000/",
    credentials: true,
  })
);

// Connect DB
ConnectDB();

// Routes
app.use("/api/v1/users", userRoute);
app.use("/api/v1/login", loginRoute); // ✔ Correct
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/products", productRoute);
app.use("/api/v1/orders", orderRoute);
app.use("/api/v1/tax", taxRoute);
app.use("/api/v1/dailySales", ReportRoute);

// 404 Middleware
//app.use(notfound);

// Error handler (add when ready)
// app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
