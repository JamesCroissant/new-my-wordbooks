import { FormEvent, useContext, useRef } from 'react';
import { loginCall } from '../../services/actionCalls';
import { AuthContext } from '../../context/AuthContext';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import "./Login.css";

const Login = () => {
  const email = useRef<HTMLInputElement | null>(null);
  const password = useRef<HTMLInputElement | null>(null);
  const { state, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginCall({
      email: email.current?.value || '',
      password: password.current?.value || '',
    }, dispatch).then(() => navigate("/main"));
  };
  
  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h1 className="login-title text-center mb-4">Login</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="loginInputEmail">Email address</Form.Label>
              <Form.Control type="email" id="loginInputEmail"  className="custom-input" required ref={email} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="loginInputPassword">Password</Form.Label>
              <Form.Control type="password" id="loginInputPassword"  className="custom-input" required minLength={6} ref={password} />
            </Form.Group>

            <div className="d-grid">
              <Button type="submit" className="mt-4" variant="danger" size="lg">
                Submit
              </Button>
            </div>

            <div className="text-center mt-4">
              <span className="m-2">Forgot your Password?</span>
              <Link to="/register" className="register-link">
                signup
              </Link>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  )
};

export default Login;