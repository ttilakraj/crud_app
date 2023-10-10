import React, { useState } from 'react';

const Login = ({ onLogin, registeredUsers }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    
    const user = registeredUsers.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      onLogin(username);
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br/>
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br/>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
