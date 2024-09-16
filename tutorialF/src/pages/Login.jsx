import { useState } from 'react';
import { Navigate } from 'react-router-dom';

export default function Expenses() {
  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get('id');
  const [auth, setAuth] = useState(null);
  const [email, setEmail] = useState('test@gmail.com');
  const [password, setPassword] = useState('pass123');

  const update = async () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier: email, password: password }),
    };

    try {
      const response = await fetch('http://localhost:1337/api/auth/local', requestOptions);
      const data = await response.json();
      setAuth(data);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  if (auth?.jwt) {
    const url = `/dashboard?token=${auth.jwt}`;
    return <Navigate to={url} />;
  }

  return (
    <div className="container">
      <center>
        <div style={{ width: '270px', marginLeft: '0px', marginTop: '200px' }}>
          <h2>Login</h2>
          <p>login as {id} agent</p>
          <form role="form">
            <div className="form-group">
              <label htmlFor="usr">Email:</label>
              <input
                type="text"
                className="form-control"
                id="usr"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="pwd">Password:</label>
              <input
                type="password"
                className="form-control"
                id="pwd"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className="form-group">
              <br />
              <button
                type="button"
                className="form-control"
                onClick={update}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </center>
    </div>
  );
}
