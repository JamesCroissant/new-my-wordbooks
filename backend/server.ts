import express, { Express, Request, Response } from 'express';

const app: Express = express();
const PORT: number = 5000;

app.get("/", (req: Request, res: Response) => {
    res.send("Hello, Hello!");
  });
  
  app.listen(PORT, () => {
    console.log(`port ${PORT} でサーバー起動中`);
  });