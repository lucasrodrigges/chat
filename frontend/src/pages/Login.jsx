import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { EMAIL_RGX } from '../helpers/data';
import { postLogin } from '../services/axios';
import { setToLS } from '../services/localstorage';

export default function Login() {
  const [validations, setValidations] = useState({});
  const [errorMsg, setErrorMsg] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [user, setUser] = useState({
    entry: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { entry, password } = user;
    const { method } = validations;

    const { error, data } = await postLogin({ [method]: entry, password });

    if (!error) {
      setToLS('token', data.token);
      navigate('/home');
    } else setErrorMsg(error);
  };

  useEffect(() => localStorage.clear());

  useEffect(() => {
    const { entry, password } = user;
    const method = entry.includes('@') ? 'email' : 'userName';

    setValidations({
      validEntry: method === 'email' ? EMAIL_RGX.test(entry) : entry.length >= 3,
      validPassword: password.length >= 8,
      method,
    });
  }, [user]);

  useEffect(() => {
    const { validEntry, validPassword } = validations;
    setIsDisabled(!validEntry || !validPassword);
  }, [validations]);

  return (
    <form onSubmit={handleSubmit}>
      <h1> Logo </h1>
      <label htmlFor="entry">
        <input
          type="text"
          name="entry"
          placeholder="Username or email"
          onChange={handleChange}
          className={validations.validEntry ? 'valid' : 'invalid'}
        />
      </label>

      <label htmlFor="password">
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className={validations.validPassword ? 'valid' : 'invalid'}
        />
      </label>

      {errorMsg && <span className="error">{errorMsg}</span>}
      <button type="submit" disabled={isDisabled}>Login</button>

      <button
        className="signup"
        onClick={() => navigate('/signup')}
        type="button"
      >
        Create account

      </button>
    </form>
  );
}
