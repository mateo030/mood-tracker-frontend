import React, { type FormEvent } from "react";
import { useState } from "react";
import "./AuthForms.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";


// The user types their credentials (username + password).
// React sends that data to your backend API.
// The backend checks if it’s valid.
// If valid, the backend responds with a token (like a JWT).
// The frontend stores that token and marks the user as “logged in.”
// React uses that token for future requests.

interface User {
  id: number;
  user_name: string;
  user_password: string;
  created_at: Date;
}

const LoginForm: React.FC = () => {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmitEvent = (e:React.FormEvent) => {
    e.preventDefault();

    console.log(input.username);

    axios.get("http://localhost:3000/users", {
      params: {
        user_name: input.username,
        user_password: input.password,
      }
    })
    .then((response) => {
      const users = response.data;
      users.forEach((user: User) => {
        console.log(user.id)
      });
      localStorage.setItem('userId', String(users[0].id));
      alert('Login Success！');
      navigate("/");
    })
    .catch((error) => {
      console.error(error);
      console.log('ログインに失敗しました。');
    });
  };

  const handleInput = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }))
  };

  return (
    <div className="container">
      <div className="card auth-card">
        <h2 className="form-title">Welcome back</h2>
        <p className="form-sub">Sign in to your account</p>
        <form className="auth-form" onSubmit={handleSubmitEvent}>
          <label className="input-label">
            Username
            <input
              name="username"
              type="text"
              className="input"
              placeholder="Username"
              onChange={handleInput}
            />
          </label>

          <label className="input-label">
            Password
            <input
              name="password"
              type="password"
              className="input"
              placeholder="••••••••"
              onChange={handleInput}
            />
          </label>

          <div className="actions">
            <button type="submit" className="primary-btn">
              Sign in
            </button>
            <button type="button" className="secondary-btn">
              Forgot?
            </button>
          </div>

          <p className="small-note">Don’t have an account? Create one below.</p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
