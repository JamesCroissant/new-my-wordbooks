import { Link } from "react-router-dom";


type Result = {
  word: string;
  meaning: string;
  userAnswer: string;
  isCorrect: boolean;
}

const Result = () => {
  let results: Result[] = [];
  const resultsString = localStorage.getItem('quizResults');

  if (resultsString !== null) {
    results = JSON.parse(resultsString);
  } else {
    results = [];
  }

  return (
    <div className="quiz-result-message">
      <div className="mt-4 text-center">
        <h2 className="quiz-title display-5 fw-bold mb-7">Your Result</h2>
        <div className="display-5 fs-1 fw-semibold my-3">
          {results.filter((result) => (result.isCorrect === true)).length} / {results.length}
        </div>
        <div className="quiz-result-content text-center my-3">
          <table className="table table-striped w-75 mx-auto">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Question</th>
                <th scope="col">Answer</th>
                <th scope="col">User Answer</th>
                <th scope="col">Result</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => (
                <tr key={index}>
                  <th scope="row"> {index+1}</th>
                  <td> {result.word} </td>
                  <td> {result.meaning} </td>
                  <td> {result.userAnswer} </td>
                  <td> {result.isCorrect ? "○" : "×"} </td>
                </tr> 
              ))}
            </tbody>
          </table>
        </div>
        <Link to="/main" className="mt-4">
          <button className="mt-2 btn btn-outline-danger">back to Top page</button>
        </Link>
      </div>
    </div>
  )
}

export default Result