import React, { useState } from 'react';
import axios from 'axios'; // Import axios for API requests
import { Button, Container, Form, Row, Col, Dropdown, DropdownButton, Table } from 'react-bootstrap'; // Import Bootstrap components

const Query = () => {
  const [field1, setField1] = useState('');
  const [field2, setField2] = useState('');
  const [selectedQuery, setSelectedQuery] = useState(null); // Initialize with null
  const [tableData, setTableData] = useState([]); // State to store fetched data
  const queryOptions = ['exact', 'string', 'aggregate', 'greaterthan', 'lessthan']; // Replace with actual options

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!field1 || !field2 || !selectedQuery) {
      alert('Please fill in all required fields');
      return;
    }

  


    let params = {
      [field1]: field2,
      query_type: selectedQuery,
    };

    if (field1 === 'Release_date') {
        const date = new Date(field2);
        // Format the date as YYYY-MM-DD
        const formattedField2 = date.toISOString().split('T')[0];
        // Update params with formatted date
        params = {
          ...params,
          [field1]: formattedField2,
        };
      }


    let token = document.cookie
      .split(";")
      .map((c) => c.trim())
      .find((c) => c.startsWith("auth_token="));

    token = token.split('=')[1];


    try {
      const response = await axios.get(
        `${'https://analytics-backend-odh4.onrender.com'}/api/get_data/`, // Replace with your query endpoint 
        {
          params,
          headers: { Authorization: `token ${token}` }
        },
      );
      setTableData(response.data);

      // Reset the form fields upon successful response
      setField1('');
      setField2('');
      setSelectedQuery(null);
    } catch (error) {
      console.error('Query failed:', error);
      // Handle query errors (e.g., display error message)
    }
  };

  const renderTableHeaders = () => {
    if (tableData.length === 0) return null;
    return (
      <thead>
        <tr>
          {Object.keys(tableData[0]).map((key) => (
            <th key={key}>{key}</th>
          ))}
        </tr>
      </thead>
    );
  };

  const renderTableRows = () => {
    return (
      <tbody>
        {tableData.map((item) => (
          <tr key={item.id}>
            {Object.values(item).map((value, index) => (
              <td key={index}>{value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  };

  return (
    <Container className="mt-1">
      <Container className='text-center mb-4'>
        <h2>Query Data</h2>
      </Container>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col xs={4}>
            <Form.Label htmlFor="field1">Parameter :</Form.Label>
            <Form.Control type="text" id="field1" value={field1} onChange={(e) => setField1(e.target.value)} required style={{ width: '100%' }} />
          </Col>
          <Col xs={4}>
            <Form.Label htmlFor="field2">Value :</Form.Label>
            <Form.Control type="text" id="field2" value={field2} onChange={(e) => setField2(e.target.value)} required style={{ width: '100%' }} />
          </Col>
          <Col xs={4}>
            <Form.Label>Query Type:</Form.Label>
            <DropdownButton
              onSelect={(key, event) => setSelectedQuery(event.target.innerText)} // Use event.target.innerText to get the selected option text
              title={selectedQuery || "Select Query"} // Display selectedQuery if not null, otherwise display default text
              variant="primary"
              required
              style={{ width: '100%' }} // Apply width to the dropdown
            >
              {queryOptions.map((option, index) => (
                <Dropdown.Item key={index} eventKey={option}>
                  {option}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </Col>
        </Row>
        <Row className="mt-4 justify-content-end">
          <Col xs={8}>
            <Button variant="primary" type="submit">
              Get Data
            </Button>
          </Col>
        </Row>
      </Form>

      {tableData.length > 0 && ( // Conditionally render the table
        <Container className="mt-4">
          <Table striped bordered hover responsive>
            {renderTableHeaders()}
            {renderTableRows()}
          </Table>
        </Container>
      )}
    </Container>
  );
};

export default Query;
