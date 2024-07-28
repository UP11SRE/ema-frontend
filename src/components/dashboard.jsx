import React from 'react';
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap';
import Read from './Read';
import GetAll from '../components/Getalldata';

const Dashboard = () => {
    const isDashboardHome = window.location.pathname === '/dashboard';
  
    return (
      <div className="d-flex flex-column min-vh-100">
        <Navbar bg="light" expand="lg" sticky="top" className="flex-wrap">
          <Container>
            <Navbar.Brand href="#">Dashboard</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="http://analytics-frontend-mq5e.onrender.com/dashboard">Home</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
  
        <div className="container mt-1 flex-grow-1">
          <Row>
            <Col md={2} className="bg-light d-flex flex-column justify-content-between">
              <Nav className="flex-column">
                <Nav.Link href="/dashboard/read">Read</Nav.Link>
                <Nav.Link href="/dashboard/getall">Get All Files</Nav.Link>
              </Nav>
            </Col>
            <Col md={10}>
              {/* Conditionally render Upload or Query component based on selected route */}
              {window.location.pathname === '/dashboard/read' && <Read />}
              {window.location.pathname === '/dashboard/getall' && <GetAll />}
              {/* Placeholder for Query component (to be added later) */}
            </Col>
          </Row>
        </div>
  
        {/* Render welcome message only on dashboard home */}
        {isDashboardHome && (
          <div className="d-flex justify-content-center align-items-top vh-100">
            <div className="text-center">
              <h2>Welcome to our Dashboard!</h2>
            </div>
          </div>
        )}
      </div>
    );
  };

export default Dashboard;
