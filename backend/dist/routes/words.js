"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../models/User"));
const Word_1 = __importDefault(require("../models/Word"));
const router = express_1.default.Router();
// CREATE WORD
router.post("/", async (req, res) => {
    try {
        const userId = req.body.userId;
        const userExists = await User_1.default.findById(userId);
        if (!userExists) {
            return res.status(404).json({ message: "User not found" });
        }
        const newWord = new Word_1.default(req.body);
        const savedWord = await newWord.save();
        return res.status(200).json(savedWord);
    }
    catch (err) {
        if (err.name === "ValidationError") {
            return res.status(404).json(err);
        }
        else {
            return res.status(500).json(err);
        }
    }
});
// PUT WORD
router.put("/:id", async (req, res) => {
    try {
        const word = await Word_1.default.findById(req.params.id);
        if (word && word.userId === req.body.userId) {
            await word.updateOne({ $set: req.body });
            return res.status(200).json("You can succeed in editing word");
        }
        else {
            return res.status(403).json("You can't edit other's word");
        }
    }
    catch (err) {
        return res.status(500).json(err);
    }
});
// DELETE WORD
router.delete("/:id", async (req, res) => {
    try {
        const word = await Word_1.default.findById(req.params.id);
        if (word) {
            await word.deleteOne();
            return res.status(200).json("You can succeed in deleting word");
        }
        else {
            return res.status(404).json("Word not found");
        }
    }
    catch (err) {
        return res.status(500).json(err);
    }
});
// GET WORD（all words of user）
router.get("/:userId", async (req, res) => {
    try {
        const userWords = await Word_1.default.find({ userId: req.params.userId });
        return res.status(200).json(userWords);
    }
    catch (err) {
        return res.status(500).json(err);
    }
});
exports.default = router;
