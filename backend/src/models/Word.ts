import mongoose, { Schema, Document } from 'mongoose';

export interface IWord extends Document {
  userId: string;
  word: string;
  meaning: string;
  isCorrect?: boolean;
}

const WordSchema: Schema = new Schema(
  {
    userId: { 
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    word: { 
      type: String, 
      required: true
    },
    meaning: { 
      type: String, 
      required: true
    },
    isCorrect: { type: Boolean }
  },
  { timestamps: true }
);


export default mongoose.model<IWord>('Word', WordSchema);



