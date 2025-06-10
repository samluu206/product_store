import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js"

import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 3000;

// setup middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/api/products", productRoutes);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});