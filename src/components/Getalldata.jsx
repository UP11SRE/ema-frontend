import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Container, Table } from 'react-bootstrap'; // Import necessary Bootstrap components

const GetAll = () => {
  const [tableData, setTableData] = useState([]); // State to store fetched data

  const fetchData = async () => {
    let token = document.cookie
      .split(";")
      .map((c) => c.trim())
      .find((c) => c.startsWith("auth_token="));

    token = token.split('=')[1];


    try {
      const response = await axios.get(
        `${'https://analytics-backend-odh4.onrender.com'}/api/get_data/`, // Replace with your API endpoint
        { headers: { Authorization: `token ${token}` } },
      );
      setTableData(response.data);
      //console.log('Data fetch successful:', response.data);
    } catch (error) {
      console.error('Data fetch failed:', error);
      // Handle data fetch errors (e.g., display error message)
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data when component mounts
  }, []);

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
        <h2>All CSV Data</h2>
      </Container>

      {tableData.length > 0 ? ( // Conditionally render the table
        <Container className="mt-4">
          <Table striped bordered hover responsive>
            {renderTableHeaders()}
            {renderTableRows()}
          </Table>
        </Container>
      ) : (
        <Container className="text-center mt-4">
          <p>Loading data...</p>
        </Container>
      )}
    </Container>
  );
};

export default GetAll;
