import express, { Request, Response } from 'express';
import User, { IUser } from '../models/User';
import Word, { IWord } from '../models/Word';

const router = express.Router();

// UPDATE USER INFO
router.put("/:id", async (req: Request, res: Response) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("You can update information");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can only update information when it is in your account");
  }
});


// DELETE USER INFO
router.delete("/:id", async (req: Request, res: Response) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);

      await Word.deleteMany({ userId: req.params.id });
      res.status(200).json("User and related word information have been deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res
      .status(403)
      .json("You can only delete information when it is in your account");
  }
});

export default router;
