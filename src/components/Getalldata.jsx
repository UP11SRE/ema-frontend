import { useState, useEffect } from 'react';
import { Button, Table, Form } from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GetAll = () => {
  const [files, setFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const fetchData = async () => {
    let token = document.cookie
      .split(";")
      .map((c) => c.trim())
      .find((c) => c.startsWith("auth_token="));

    token = token.split('=')[1];

    try {
      const response = await axios.get(
        `${'http://localhost:8000'}/api/files/list/`, // Replace with your API endpoint
        { headers: { Authorization: `token ${token}` } },
      );
      setFiles(response.data);
      //console.log('Data fetch successful:', response.data);
    } catch (error) {
      console.error('Data fetch failed:', error);
      // Handle data fetch errors (e.g., display error message)
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data when component mounts
  }, []);

  const handleSelectFile = (file) => {
    setSelectedFiles(prevSelectedFiles => {
      if (prevSelectedFiles.some(f => f.id === file.id)) {
        return prevSelectedFiles.filter(f => f.id !== file.id);
      } else {
        return [...prevSelectedFiles, file];
      }
    });
  };

  const handleUploadFiles = () => {
    let token = document.cookie
      .split(";")
      .map((c) => c.trim())
      .find((c) => c.startsWith("auth_token="));

    token = token.split('=')[1];

    // Format the selected files as required
    const formattedFiles = selectedFiles.map(file => ({
        name: file.name,
        size: file.size,
        google_drive_id: file.id
    }));

    // Upload selected files
    axios.post(`${'http://localhost:8000'}/api/files/upload/`, { files: formattedFiles }, {
       headers: { Authorization: `token ${token}` } 
    })
    .then(response => {
      if (response.status === 200 || response.status === 201) {
        toast.success('Files uploaded successfully');
        setSelectedFiles([]); // Clear selected files
      }
    })
    .catch(error => {
      console.error('Error uploading files:', error);
      toast.error('Error uploading files');
    });
  };

  return (
    <div>
      <h2>Get All Files</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Select</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {files.map(file => (
            <tr key={file.id}>
              <td>
                <Form.Check
                  type="checkbox"
                  checked={selectedFiles.some(f => f.id === file.id)}
                  onChange={() => handleSelectFile(file)}
                />
              </td>
              <td>{file.name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button onClick={handleUploadFiles} disabled={selectedFiles.length === 0}>Upload Selected Files</Button>
      <ToastContainer />
    </div>
  );
};

export default GetAll;
