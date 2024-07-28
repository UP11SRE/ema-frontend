import React, { useState, useEffect } from 'react';
import { Button, Table, Modal } from 'react-bootstrap';
import axios from 'axios';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';
import { toast } from 'react-toastify'; // Import toast


const Read = () => {
  const [files, setFiles] = useState([]);
  const [fileContent, setFileContent] = useState(null);
  const [fileType, setFileType] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    let token = document.cookie
      .split(";")
      .map((c) => c.trim())
      .find((c) => c.startsWith("auth_token="));

    token = token.split('=')[1];

    try {
      const response = await axios.get(
        `${'http://localhost:8000'}/api/files/getall/`, // Replace with your API endpoint
        { headers: { Authorization: `token ${token}` } },
      );
      setFiles(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Data fetch failed:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleReadFile = (fileId) => {
    let token = document.cookie
      .split(";")
      .map((c) => c.trim())
      .find((c) => c.startsWith("auth_token="));

    token = token.split('=')[1];

    axios.get(`${'http://localhost:8000'}/api/files/read/${fileId}/`, {
      headers: { Authorization: `token ${token}` },
    })
    .then(response => {
      console.log('File response:', response.data); // Log the response data
      const fileType = response.data.type;
      const fileContent = response.data.content;

      if (fileType.startsWith('image/')) {
        // Format the base64 string
        const formattedContent = `data:${fileType};base64,${fileContent}`;
        setFileContent(formattedContent);
      } else if (fileType === 'application/pdf') {
        // Decode the base64 string
        const byteCharacters = atob(fileContent);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: fileType });
        const fileURL = URL.createObjectURL(blob);
        setFileContent(fileURL);
      } else if (fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || fileType === 'application/vnd.google-apps.spreadsheet') {
        // Decode the base64 string
        const byteCharacters = atob(fileContent);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const workbook = XLSX.read(byteArray, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        setFileContent(jsonData);
      } else if (fileType === 'text/csv') {
        // Decode the base64 string
        const decodedContent = atob(fileContent);
        setFileContent(decodedContent);
      } else {
        // Handle other file types as needed
        setFileContent(fileContent);
      }

      setFileType(fileType);
      setShowModal(true);
    })
    .catch(error => {if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status === 403) {
        toast.error('Access forbidden: You do not have permission to view this file.');
      } else if (error.response.status === 404) {
        toast.error('File not found: The requested file does not exist.');
      } else {
        toast.error('An error occurred while fetching the file.');
      }
    } else if (error.request) {
      // The request was made but no response was received
      toast.error('No response received from the server.');
    } else {
      // Something happened in setting up the request that triggered an Error
      toast.error('An error occurred while setting up the request.');
    }
  });
  };

  const renderFileContent = () => {
    if (!fileContent) return null;

    console.log('Rendering file content:', { fileType, fileContent }); // Log the file type and content

    if (fileType.startsWith('image/')) {
      return <img src={fileContent} alt="File content" style={{ width: '100%' }} />;
    } else if (fileType === 'application/pdf') {
      return <embed src={fileContent} type="application/pdf" width="100%" height="600px" />;
    } else if (fileType === 'text/csv') {
      const parsedData = Papa.parse(fileContent, { header: true });
      return (
        <Table striped bordered hover>
          <thead>
            <tr>
              {parsedData.meta.fields.map((field, index) => (
                <th key={index}>{field}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {parsedData.data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {parsedData.meta.fields.map((field, colIndex) => (
                  <td key={colIndex}>{row[field]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      );
    } else if (fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || fileType === 'application/vnd.ms-excel' || fileType === 'application/vnd.google-apps.spreadsheet') {
      return (
        <Table striped bordered hover>
          <thead>
            <tr>
              {fileContent[0].map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {fileContent.slice(1).map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, colIndex) => (
                  <td key={colIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      );
    } else if (fileType === 'application/vnd.ms-powerpoint' || fileType === 'application/vnd.openxmlformats-officedocument.presentationml.presentation') {
      return <embed src={fileContent} type={fileType} width="100%" height="600px" />;
    } else if (fileType === 'application/msword' || fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      return <iframe src={fileContent} width="100%" height="600px" title="File content"></iframe>; // Display DOC files
    } else {
      return <pre>{fileContent}</pre>; // Default to text if unknown type
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Read Files</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(files) && files.map(file => (
            <tr key={file.id}>
              <td>{file.name}</td>
              <td>
                <Button onClick={() => handleReadFile(file.id)}>Read File</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>File Content</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {renderFileContent()}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Read;