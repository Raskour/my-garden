import {
  Button,
  FormControl,
  FormLabel,
  Stack,
  TextField,
} from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Authentication = () => {
  const [userInfo, setUserInfo] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  function handleUsername(e) {
    setUserInfo((prev) => ({
      ...prev,
      username: e.target.value,
    }));
  }

  function handlePassword(e) {
    setUserInfo((prev) => ({
      ...prev,
      password: e.target.value,
    }));
  }

  async function handleLogin(e) {
    e.preventDefault();
    if (!userInfo.username || !userInfo.password) {
      alert('Please fill in username and password');
      return;
    }
    try {
      const res = await fetch(`http://localhost:8004/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: userInfo.username,
          password: userInfo.password,
        }),
      });
      // const data = await res.json();

      if (res.ok) {
        navigate('/');
      } else {
        throw new Error('login failed');
      }
    } catch (err) {
      alert(err.message);
    }
    // if (userInfo.username === 'rasna' && userInfo.password === '1234') {
    //   navigate('/');
    // } else {
    //   setError('Please type correct username and Password');
    // }
  }

  return (
    <Stack
      onSubmit={handleLogin}
      component="form"
      maxWidth={400}
      marginInline="auto"
      gap={2}
    >
      <h1>Login Form</h1>

      <TextField
        value={userInfo.username}
        onChange={handleUsername}
        label="Username"
      />

      <TextField
        value={userInfo.password}
        onChange={handlePassword}
        label="Password"
        type="password"
      />

      <Button variant="outlined" type="submit">
        Login
      </Button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </Stack>
  );
};

export default Authentication;
