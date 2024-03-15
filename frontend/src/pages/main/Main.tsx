import { FormEvent, useContext, useState, useEffect } from 'react';
import axios from "axios";
import { AuthContext } from '../../context/AuthContext';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Word } from '../../types/wordType';
import { NewWord } from '../../types/wordType';


const Main = () => {
  const [word, setWord] = useState<string>('');
  const [meaning, setMeaning] = useState<string>('');
  const [words, setWords] = useState<Word[]>([]);
  const navigate = useNavigate();
  const { state, dispatch } = useContext(AuthContext);

  const userId = state.user?._id;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!word || !meaning || !userId) return;

    const newWord: NewWord = { word, meaning, userId };
    saveWordToDatabase(newWord);

    setWord('');
    setMeaning('');
  };

  const saveWordToDatabase = async (newWord: NewWord) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/words`, newWord);
      console.log('YOU CAN SAVE THE DATA:', response.data);
      alert("YOU CAN SAVE THE DATA");

    } catch (err) {
      console.log(err);
      alert("YOU CAN'T SAVE THE DATA");
    }
  }

  const handleStartQuiz = () => {
    navigate('/main/quiz');
  };

  useEffect(() => {
    if (!userId) return;
    const fetchWords = async () => {
      const response = await axios.get(`http://localhost:5000/api/words/${userId}`);
      setWords(response.data);
    };
    fetchWords();
  }, [userId]);
  

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <div className="mb-4">
            <p className="fs-5 text-center">分からない単語と意味を入力してね！</p>
            <p className="fs-5 mb-4 text-center">entering words and meanings you don't understand!</p>
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4">
              <Form.Label htmlFor="input-form1">Word</Form.Label>
              <Form.Control
                id="input-word"
                type="text" 
                className="custom-input"
                placeholder="ex) English"
                value={word} 
                onChange={(e) => setWord(e.target.value)}  
                required 
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label htmlFor="input-form2">Meaning</Form.Label>
              <Form.Control 
                id="input-meaning"
                type="meaning" 
                className="custom-input"
                placeholder="ex) 英語"
                value={meaning}
                onChange={(e) => setMeaning(e.target.value)}
                required 
              />
            </Form.Group>

            <div className="mt-4 text-center">
              <Button 
                type="submit" 
                className="px-6" 
                role="button" 
                variant="danger"
              >
                save
              </Button>
            </div>
          </Form>

          <div className="d-grid justify-content-center text-center">
            {words.length > 0 && (
              <button 
                type="submit" 
                className="StartButton btn btn-danger my-4 col-1.8"
                onClick={handleStartQuiz}
              >
                Start Quiz!
              </button>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  )  
};

export default Main;