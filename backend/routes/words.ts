import express, { Request, Response } from 'express';
import Word, { IWord } from '../models/Word';
import User, { IUser } from '../models/User';

const router = express.Router();

// CREATE WORD
router.post("/", async (req: Request, res: Response) => {
  try {
    const userId = req.body.userId;
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }
    const newWord = new Word(req.body);
    const savedWord = await newWord.save();
    return res.status(200).json(savedWord);
  } catch (err: any) {
    if (err.name === "ValidationError") {
      return res.status(404).json(err);
    } else {
      return res.status(500).json(err);
    }
  }
});


// PUT WORD
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const word = await Word.findById(req.params.id);
    if (word && word.userId === req.body.userId) {
      await word.updateOne({ $set: req.body });
      return res.status(200).json("You can succeed in editing word");
    } else {
      return res.status(403).json("You can't edit other's word");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

// DELETE WORD
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const word = await Word.findById(req.params.id);
    if (word) {
      await word.deleteOne();
      return res.status(200).json("You can succeed in deleting word");
    } else {
      return res.status(404).json("Word not found");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

// GET WORD（all words of user）
router.get("/:userId", async (req: Request, res: Response) => {
  try {
    const userWords = await Word.find({ userId: req.params.userId });
    return res.status(200).json(userWords);
  } catch (err) {
    return res.status(500).json(err);
  }
});

export default router;
