"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = __importDefault(require("../models/User"));
const router = express_1.default.Router();
const saltRounds = 10;
// SIGNUP
router.post("/register", async (req, res) => {
    try {
        const hashedPassword = await bcryptjs_1.default.hash(req.body.password, saltRounds);
        const newUser = new User_1.default({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });
        const user = await newUser.save();
        return res.status(200).json(user);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json(err);
    }
});
// LOGIN
router.post("/login", async (req, res) => {
    try {
        const user = await User_1.default.findOne({ email: req.body.email });
        if (!user)
            return res.status(404).send("User not found");
        const validPassword = await bcryptjs_1.default.compare(req.body.password, user.password);
        if (!validPassword)
            return res.status(400).json("Invalid password");
        return res.status(200).json(user);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json(err);
    }
});
exports.default = router;
