import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { QuizProps } from '../quiz/Quiz';
import { Link } from 'react-router-dom';
import "./WordList.css";
import { MoonLoader } from 'react-spinners';


const WordList = () => {
  const [userWords, setUserWords] = useState<QuizProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { state, dispatch } = useContext(AuthContext);
  const userId = state.user?._id;
  const baseUrl = "http://localhost:5000";

  useEffect(() => {
    if(!userId) return;
    const fetchUserWords = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${baseUrl}/api/words/${userId}`);
        setUserWords(response.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchUserWords();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${baseUrl}/words/${id}`);
      const response = await axios.get(`${baseUrl}/words/${userId}`);
      setUserWords(response.data);
    } catch (err) {
      console.error("Error deleting word:", err);
    }
  };

  return (
    <div className="container mt-5">
      {!loading ? (
        <div>
          <div className="wordListTop text-center">
          <h2 className="wordListTitle display-5 fw-bold mb-7">{`${state.user?.username}'s Word List`}</h2>
        </div>
        <div className="wordListContent text-center my-3">
          <table className="table table-striped w-75 mx-auto">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Question</th>
                <th scope="col">Answer</th>
                <th scope="col">Result</th>
              </tr>
            </thead>
            <tbody>
              {userWords.map((userWord, index) => (
                <tr key={index}>
                  <th scope="row"> {index+1}</th>
                  <td> {userWord.word} </td>
                  <td> {userWord.meaning} </td>
                  <td> {userWord.isCorrect ? "○" : "×"} </td>
                  <td>
                    {userWord.isCorrect && (
                      <button 
                        className="btn btn-danger" 
                        onClick={() => handleDelete(userWord._id)}
                      >
                        Delete
                      </button>
                    )}
                  </td>

                </tr> 
              ))}
            </tbody>
          </table>
          
          <Link to="/main">
            <button className="btn btn-outline-danger">back to Top page</button>
          </Link>
        </div>
      </div>
    ) : (
      <div className="loading">
        <MoonLoader color="#f48e09" />
      </div>
    )}
    </div>
  )
}

export default WordList;