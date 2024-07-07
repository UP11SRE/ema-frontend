import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { loginUser, saveAuthTokenInCookie } from '../../services/authService'; // Import updated service

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await loginUser({ username, password });

      // Extract auth token from response (assuming it's in a specific field)
      const authToken = response.data.token; // Replace with actual token location

      // Save auth token in cookie
      saveAuthTokenInCookie(authToken);

      // Handle successful login (e.g., redirect to protected area)
      navigate('/dashboard'); // Replace with your protected route path
    } catch (error) {
      console.error('Login failed:', error);
      // Handle login errors (e.g., display error message)
    }
  };

  return (
    <div className="container mt-5">
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
        <br />
        <Button variant="link" onClick={() => navigate('/register')}>
          Don't have an account? Register Here
        </Button>
      </Form>
    </div>
  );
};

export default Login;
