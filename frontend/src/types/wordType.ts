export type Word = {
  _id: string;
  userId: string;
  word: string;
  meaning: string;
  isCorrect: boolean;
}

// export type NewWord = Omit<Word, '_id', 'isCorrect'>;
export type NewWord = Omit<Word, '_id' | 'isCorrect'>;
