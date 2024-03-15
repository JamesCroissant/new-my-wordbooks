"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const app_1 = __importDefault(require("./app"));
const mongoose_1 = __importDefault(require("mongoose"));
const port = process.env.PORT;
const mongoUrl = process.env.MONGOURL;
if (!mongoUrl) {
    throw new Error('MongoDB URI is not defined in .env file');
}
// connecting database
mongoose_1.default.connect(mongoUrl).then(() => {
    console.log("Connected to the database");
}).catch((err) => {
    console.error(err);
});
app_1.default.listen(port, () => console.log(`Server running on port ${port}`));
