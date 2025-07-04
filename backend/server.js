import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js"
import "dotenv/config";
import { sql } from "./config/db.js";
import { aj } from "./lib/arcjet.js";
import path from "path";

const app = express();
const port = process.env.PORT || 3000;
const __dirname = path.resolve(); 

// setup middleware
app.use(
  helmet({
    contentSecurityPolicy: false
  })
);
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// apply arcject to all routes
app.use(async (req, res, next) => {
  try {
    const decision = await aj.protect(req, {
      requested: 1, // specifies that each request consumes 1 token
    });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        res.status(429).json({ error: "Too Many Requests" });
      } else if (decision.reason.isBot()) {
        res.status(403).json({ error: "Bot access denied" });
      } else {
        res.status(403).json({ error: "Forbidden" });
      }
      return;
    }

    // check for spoofed bots
    if (decision.results.some((result) => result.reason.isBot() && result.reason.isSpoofed())) {
      res.status(403).json({ error: "Spoofed bot detected" });
      return;
    }

    next();
  } catch (error) {
    console.log("Arcjet error", error);
    next(error);
  }
});

app.use("/api/products", productRoutes);

if (process.env.NODE_ENV === "production") {
  // server our react app
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get(/(.*)/, (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

async function initDB() {
try {
  await sql`
    CREATE TABLE IF NOT EXISTS PRODUCTS (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      image VARCHAR(255) NOT NULL,
      price DECIMAL(10, 2) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  console.log("Initialize Database successfully")
} catch(error) {
  console.log("Error connecting to Database: " + error);
}
};

initDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
});