import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import userRoute from './routes/users';
import authRoute from './routes/auth';
import wordRoute from './routes/words';

const app: Express = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: "https://new-my-wordbooks-main.onrender.com" }));
app.use(bodyParser.json());
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/words", wordRoute);


app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Hello, Hello!");
});

export default app;