import express from "express";
import dotenv from "dotenv";
import path from "path";
import connectDB from "./config/db.js";
import productRoutes from "./routes/product.routes.js";

dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json()); // Body parser



// Routes
app.use("/api/products", productRoutes);

// Server Listener
const PORT = process.env.PORT;
const __dirname = path.resolve();
if(process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });

}
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
