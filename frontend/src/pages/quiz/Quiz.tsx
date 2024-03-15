import { useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { AuthContext } from '../../context/AuthContext';
import "./Quiz.css";
import { Word } from '../../types/wordType';
import { useNavigate } from 'react-router-dom';
import { MoonLoader } from 'react-spinners';
import QuizCard from "../../components/quizcard/QuizCard";


export type QuizProps = {
  _id: string;
  word: string;
  meaning: string;
  userAnswer: string;
  isCorrect: boolean;
}

const Quiz = () => {
  const [questions, setQuestions] = useState<Word[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [results, setResults] = useState<QuizProps[]>([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [answerChecked, setAnswerChecked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const { state, dispatch } = useContext(AuthContext);
  const userId = state.user?._id;

  const shuffleArray = (array: Word[]) =>  {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const checkAnswer = async () => {
    const correct = questions[currentQuestionIndex].meaning === userAnswer;
    let result = {
      _id: questions[currentQuestionIndex]._id,
      userId: state.user?._id,
      word: questions[currentQuestionIndex].word,
      meaning: questions[currentQuestionIndex].meaning,
      userAnswer: userAnswer,
      isCorrect: correct
    }
    setResults([...results, result]);
    await axios.put(`http://localhost:5000/api/words/${result._id}`, result);
    setIsCorrect(correct)
    setUserAnswer('');
    setAnswerChecked(true);
  };

  useEffect(() => {
    if (!userId) return;
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const response = await axios.get<Word[]>(`http://localhost:5000/api/words/${userId}`);
        const words = response.data.map(({ _id, userId, word, meaning, isCorrect }) => ({
          _id,
          userId,
          word,
          meaning,
          isCorrect
        }));
        const shuffledWords = shuffleArray(words);
        setQuestions(shuffledWords);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setUserAnswer(''); 
      setAnswerChecked(false);
    } else {
      localStorage.setItem('quizResults', JSON.stringify(results));
      navigate('/main/result');
    }
  }

  return (
    <div>
      <div className="container mt-5">
        {!loading ? (
          (currentQuestionIndex < questions.length) ? (
            <QuizCard
              currentQuestionIndex={currentQuestionIndex}
              questions={questions}
              userAnswer={userAnswer}
              setUserAnswer={setUserAnswer}
              answerChecked={answerChecked}
              checkAnswer={checkAnswer}
              isCorrect={isCorrect}
              handleNextQuestion={handleNextQuestion}
            />
          ) : null
        ) : (
          <div className="loading">
            <MoonLoader color="#f48e09" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;