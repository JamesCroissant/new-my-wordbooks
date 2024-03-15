import "dotenv/config";
import app from "./app";
import mongoose from 'mongoose';


const port = process.env.PORT;
const mongoUrl = process.env.MONGOURL;

if (!mongoUrl) {
  throw new Error('MongoDB URI is not defined in .env file');
}

// connecting database
mongoose.connect(mongoUrl as string).then(() => {
  console.log("Connected to the database");
}).catch((err) => {
  console.error(err);
});
  
app.listen(port, () => console.log(`Server running on port ${port}`));









