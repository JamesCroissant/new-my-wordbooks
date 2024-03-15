"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const users_1 = __importDefault(require("./routes/users"));
const auth_1 = __importDefault(require("./routes/auth"));
const words_1 = __importDefault(require("./routes/words"));
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: "http://localhost:3000" }));
app.use(body_parser_1.default.json());
app.use("/api/users", users_1.default);
app.use("/api/auth", auth_1.default);
app.use("/api/words", words_1.default);
app.get("/", (req, res) => {
    res.send("Hello, Hello!");
});
exports.default = app;
