import React from 'react';
import { BrowserRouter as Router, Routes, Route,Navigate  } from 'react-router-dom';
import Register from './components/auth/Register';
import ProtectedRoute from './components/auth/protectedRoute';
 import Login from './components/auth/Login';
 import Dashboard from './components/dashboard';
 import Upload from './components/Upload';
import Query from './components/Query';
import GetAll from './components/Getalldata';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />}> {/* Use Dashboard component */}
            <Route path="/dashboard/upload" element={<Upload />} /> {/* Nested upload route */}
            <Route path="/dashboard/query" element={<Query />} />
            <Route path="/dashboard/getall" element={<GetAll />} />

          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
