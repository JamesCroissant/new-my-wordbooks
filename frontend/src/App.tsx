import { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import './App.css';
import Home from './pages/home/Home';
import Login from "./pages/login/Login";
import Register from './pages/register/Register';
import Layout from './pages/Layout';
import Main from './pages/main/Main';
import Profile from './pages/profile/Profile';
import WordList from './pages/wordlist/WordList';
import Quiz from './pages/quiz/Quiz';

import { AuthContext } from './context/AuthContext';
import NotFound from './pages/notfound/NotFound';
import Result from './components/result/Result';


function App() {
  const { state, dispatch } = useContext(AuthContext);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={ <Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/main" element={state.user ? <Layout /> : <Navigate replace to="/login" />}>
            <Route index element={<Main />} />
            <Route path="profile" element={<Profile />}/>
            <Route path="words" element={<WordList />} />
            <Route path="quiz" element={<Quiz />} />
            <Route path="result" element={<Result />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
