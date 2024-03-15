import { Alert, ProgressBar } from "react-bootstrap"
import { Word } from '../../types/wordType';

type QuizCardProps = {
  currentQuestionIndex: number;
  questions: Word[];
  userAnswer: string;
  setUserAnswer: (userAnswer: string) => void;
  answerChecked: boolean;
  checkAnswer: () => void;
  isCorrect: boolean;
  handleNextQuestion: () => void;
}

const QuizCard = ({ currentQuestionIndex, questions, userAnswer, setUserAnswer, answerChecked, checkAnswer, isCorrect, handleNextQuestion }: QuizCardProps) => {
  return (
    <div className="quiz-container">
      <div className="quiz-content text-center">
        <div className="quiz-progress-bar pt-5 pb-4 d-flex justify-content-center">
          <ProgressBar style={{ width: '40%'  }} animated variant="danger" now={((currentQuestionIndex + 1) / questions.length) * 100} />
        </div>
        <div className="quiz-progressbar-text text-center">
          <p>{currentQuestionIndex+1} / {questions.length} </p>
        </div>
        <div className="quiz-text fs-4 my-3">
          {questions[currentQuestionIndex].word}
        </div>
        <div className="quiz-form d-flex flex-column align-items-center">
          <input 
            type="text"
            className="form-control mx-sm-3 my-2 custom-input"
            style={{ width: '200px' }}
            placeholder="input your answer"
            value={userAnswer}
            required
            onChange={(e) => setUserAnswer(e.target.value)}
            disabled={answerChecked}
          />
          {!answerChecked && (
            <button 
              className="btn btn-outline-dark my-3" 
              onClick={checkAnswer}
            >
              Check
            </button>
          )}
          {answerChecked && (
            <div className="mt-4">
              <Alert variant={isCorrect ? 'success': 'danger'}>{isCorrect ? "Correct!" : "Incorrect"}</Alert> 
              <p className="answer-text">Answer : {questions[currentQuestionIndex].meaning}</p>
              <button 
                className="btn btn-outline-dark" 
                onClick={handleNextQuestion}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default QuizCard