import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { EMAIL_RGX } from '../helpers/data';
import { postLogin } from '../services/axios';
import { setToLS } from '../services/localstorage';

export default function Login() {
  const [user, setUser] = useState({
    entry: '',
    password: '',
  });
  const [validations, setValidations] = useState({});
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const { entry, password } = user;
    setValidations({
      email: EMAIL_RGX.test(entry),
      userName: entry.length >= 3,
      password: password.length >= 8,
    });
  }, [user]);

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { entry, password } = user;
    const key = entry.includes('@') ? 'email' : 'userName';

    const { status, token, message } = await postLogin({ [key]: entry, password });

    if (status !== 200) setErrorMsg(message);
    else {
      setToLS('token', token);
      navigate('/home');
    }
  };

  return (
    <form action="" onSubmit={handleSubmit}>
      <label htmlFor="entry">
        <input type="text" name="entry" placeholder="Email or username" onChange={handleChange} />
      </label>
      <label htmlFor="password">
        <input type="password" name="password" placeholder="Password" onChange={handleChange} />
      </label>
      {errorMsg && <span>{errorMsg}</span>}
      <button type="submit">Login</button>
    </form>
  );
}
