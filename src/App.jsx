/* import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [registeredUsers, setRegisteredUsers] = useState([]); 

  const handleLogin = (user) => {
    setLoggedIn(true);
    setUsername(user);
  };

  const handleRegister = (newUser) => {
    setRegisteredUsers([...registeredUsers, newUser]);
    setLoggedIn(true); 
    setUsername(newUser.username);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUsername('');
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={loggedIn ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} registeredUsers={registeredUsers} />} />
          <Route path="/register" element={loggedIn ? <Navigate to="/dashboard" /> : <Register onRegister={handleRegister} registeredUsers={registeredUsers} />} />
          <Route path="/dashboard" element={loggedIn ? <Dashboard username={username} onLogout={handleLogout} /> : <Navigate to="/login" />}/>
          <Route path="/" element={loggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
 */




import React, { useEffect, useState } from 'react';
import mongoose from 'mongoose';

// Replace with your MongoDB Atlas connection string
const mongoUri = 'mongodb+srv://ttilakrajldtech:Y7pLNrTgYQlRNPMw@cluster0.qhovk7v.mongodb.net/';

// Define a Mongoose schema
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
});

// Create a Mongoose model
const User = mongoose.model('User', userSchema);

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Connect to MongoDB Atlas
    mongoose.connect(mongoUri, {useNewUrlParser: true, useUnifiedTopology: true,})
      .then(() => {
        console.log('Connected to MongoDB Atlas');
        // Fetch data from MongoDB
        User.find({}, (err, data) => {
          if (err) {
            console.error('Error fetching data:', err);
          } else {
            setUsers(data);
          }
          mongoose.connection.close(); // Close the connection
        });
      })
      .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
      });
  }, []);

  
  return (
    <div>
      <h1>Users from MongoDB Atlas</h1>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
