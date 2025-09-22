import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import path from "path"

import NotesRouter from "./routes/noteRoutes.js"
import connectDB from "./config/db.js"
import ratelimiter from "./middleware/rateLimiter.js"

const app = express()
const PORT = process.env.PORT || 5000
const __dirname = path.resolve()

dotenv.config()

// Middleware
if(process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    }));
}
app.use(express.json());
// app.use((req, res, next) => {
//   console.log(`Request ${req.method} ${req.url}`);
//   next();
// });
app.use(ratelimiter);

// API
// app.get('/', (req, res) => {
//   res.status(200).send("Welcome to My Notes!")
// });
app.use('/api/notes', NotesRouter)

if(process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")))
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"))
  })
}

connectDB().then(()=>{
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}👂`)
  })
});