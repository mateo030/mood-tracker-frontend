import React from "react";
import "./AuthForms.css";

// The user types their credentials (email + password).

// React sends that data to your backend API (e.g., using fetch or axios).

// The backend checks if it’s valid (using a database).

// If valid, the backend responds with a token (like a JWT).

// The frontend stores that token and marks the user as “logged in.”

// React uses that token for future requests (e.g., getting profile info).

const LoginForm: React.FC = () => {
  return (
    <div className="container">
      <div className="card auth-card">
        <h2 className="form-title">Welcome back</h2>
        <p className="form-sub">Sign in to your account</p>
        <form className="auth-form" noValidate>
          <label className="input-label">
            Username
            <input
              name="email"
              type="email"
              className="input"
              placeholder="Username"
            />
          </label>

          <label className="input-label">
            Password
            <input
              name="password"
              type="password"
              className="input"
              placeholder="••••••••"
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
