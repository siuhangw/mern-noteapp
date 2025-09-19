import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import NotesRouter from "./routes/noteRoutes.js"
import connectDB from "./config/db.js"
import ratelimiter from "./middleware/rateLimiter.js"

const app = express()
const PORT = process.env.PORT || 5000

dotenv.config()

// Middleware
app.use(cors(
  {
    origin: "http://localhost:5173",
  }
));
app.use(express.json());
app.use((req, res, next) => {
  console.log(`Request ${req.method} ${req.url}`);
  next();
});
app.use(ratelimiter);

// API
app.get('/', (req, res) => {
  res.status(200).send("Welcome to My Notes!")
});
app.use('/api/notes', NotesRouter)
connectDB().then(()=>{
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}👂`)
  })
});