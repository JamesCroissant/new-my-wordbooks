import React, { useRef } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import "./Register.css";

const Register: React.FC = () => {
  const username = useRef<HTMLInputElement | null>(null);
  const email = useRef<HTMLInputElement | null>(null);
  const password = useRef<HTMLInputElement | null>(null);
  const passwordConfirmation = useRef<HTMLInputElement | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // パスワードと確認用のパスワードが合っているかどうかを確認
    if (password.current?.value !== passwordConfirmation.current?.value) {
      passwordConfirmation.current?.setCustomValidity('Incorrect password')
    } else {
      try {
        const user = {
          username: username.current?.value,
          email: email.current?.value,
          password: password.current?.value,
        };
        await axios.post(`/auth/register`, user);
        navigate("/login");

      } catch (err) {
      console.log(err);
    }
  }};

    
  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h1 className="registerTitle text-center mb-4">SignUp</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="registerInputUsername">UserName</Form.Label>
              <Form.Control type="text" id="registerInputUsername" required ref={username} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="registerInputEmail">Email address</Form.Label>
              <Form.Control type="email" id="registerInputEmail" required ref={email} />
              <Form.Text>We'll never share your email with anyone else.</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="registerInputPassword1">Password</Form.Label>
              <Form.Control type="password" id="registerInputPassword1" required minLength={6} ref={password} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="registerInputPassword2">Confirm Password</Form.Label>
              <Form.Control type="password" id="registerInputPassword2" required minLength={6} ref={passwordConfirmation} />
            </Form.Group>

            <div className="d-grid">
              <Button type="submit" variant="danger" size="lg">
                Submit
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>

  )

}

export default Register;

