import React, { useState } from 'react';
import axios from 'axios'; // Import axios for API requests
import { Button, Container, Form, Row, Col } from 'react-bootstrap'; // Import Bootstrap components

const Upload = () => {
  const [link, setLink] = useState('');
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Retrieve auth token from cookie
    let token = document.cookie
      .split(';')
      .map((c) => c.trim())
      .find((c) => c.startsWith('auth_token='));

    token = token.split('=')[1];

    try {
      const response = await axios.post(
        `${'https://analytics-backend-odh4.onrender.com'}/api/upload/`, // Replace with your upload endpoint
        { csv_url: link },
        { headers: { Authorization: `token ${token}` } } // Include auth token in header
      );
      console.log('Upload successful:', response.data);
      // Display success message and refresh the page
      alert('Data uploaded successfully');
      window.location.reload(); // Refresh the page
    } catch (error) {
      console.error('Upload failed:', error);
      // Handle upload errors (e.g., display error message)
    }
  };

  return (
    <Container className="mt-1">
      <Container className="text-center mb-1">
        <h1>Upload Link</h1>
      </Container>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col xs={12}>
            <Form.Label htmlFor="link">Enter Link:</Form.Label> {/* Added a space for clarity */}
            <Form.Control type="text" id="link" value={link} onChange={(e) => setLink(e.target.value)} required size="lg" />
          </Col>
        </Row>
        <Row className="mt-3 justify-content-center">
          <Col xs={4}> {/* Adjusted Col size for wider button */}
            <Button variant="primary" type="submit" style={{ width: '150px' }}> {/* Added inline style for button width */}
              Send
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default Upload;
