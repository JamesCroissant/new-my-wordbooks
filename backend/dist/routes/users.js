"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../models/User"));
const Word_1 = __importDefault(require("../models/Word"));
const router = express_1.default.Router();
// UPDATE USER INFO
router.put("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            const user = await User_1.default.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json("You can update information");
        }
        catch (err) {
            return res.status(500).json(err);
        }
    }
    else {
        return res.status(403).json("You can only update information when it is in your account");
    }
});
// DELETE USER INFO
router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            await User_1.default.findByIdAndDelete(req.params.id);
            await Word_1.default.deleteMany({ userId: req.params.id });
            res.status(200).json("User and related word information have been deleted");
        }
        catch (err) {
            return res.status(500).json(err);
        }
    }
    else {
        return res
            .status(403)
            .json("You can only delete information when it is in your account");
    }
});
exports.default = router;
