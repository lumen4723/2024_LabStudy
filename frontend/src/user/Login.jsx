import React, { useState } from 'react';

const Login = () => {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [session, setSession] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://coin.oppspark.net:8088/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, pw }),
      });

      const data = await response.json();

      if (data.result === 'login_success') {
        alert('로그인 성공!');
      } else {
        alert(`로그인 실패: ${data.result}`);
      }
    } catch (error) {
      console.error('로그인 요청 중 에러 발생:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('http://coin.oppspark.net:8088/login', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      alert('로그아웃 성공!');
    } catch (error) {
      console.error('로그아웃 요청 중 에러 발생:', error);
    }
  };


  return (
    <div>
      <label>
        ID:
        <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
      </label>
      <br />
      <label>
        PW:
        <input type="password" value={pw} onChange={(e) => setPw(e.target.value)} />
      </label>
      <br />
      <button type="button" onClick={handleLogin}>
        로그인
      </button>
      <button type="button" onClick={handleLogout}>
        로그아웃
      </button>
    </div>
  );
};

export default Login;
