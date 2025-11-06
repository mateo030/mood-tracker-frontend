import React from "react";
import { useState } from "react";
import "./AuthForms.css";
import * as validation from "./helpers";
import axios from "axios";

type RegisterFormData = {
  userName: string;
  userPassword: string;
};

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    userName: "",
    userPassword: "",
  });
  const [confPassword, setConfPassword] = useState("");
  const [nameErrMsg, setNameErrMsg] = useState("");
  const [passwordErrMsg, setPasswordErrMsg] = useState("");
  const [confPasswordErrMsg, setConfPasswordErrMsg] = useState("");
  const [errState, setErrState] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setNameErrMsg("");
    setPasswordErrMsg("");
    setConfPasswordErrMsg("");
    setErrState(false);

    const userName = formData.userName;
    const userPassword = formData.userPassword;
    const confirm = confPassword;

    if (userName.trim() === "") {
      setNameErrMsg("Username is required");
      setErrState(true);
    }

    if (userPassword.trim() === "") {
      setPasswordErrMsg("Password is required");
      setErrState(true);
    }

    if (confirm.trim() === "") {
      setConfPasswordErrMsg("Password is required");
      setErrState(true);
    }

    if (userName) {
      console.log("piss");
      if (validation.checkMaxValue(userName, 100)) {
        setNameErrMsg("Username must not exceed 100 chars");
        setErrState(true);
      }
      if (validation.checkMinValue(userName, 4)) {
        setNameErrMsg("Username must be above 4 chars");
        setErrState(true);
      }
      const regex = /^[A-Za-z0-9_]{1,32}$/;
      if (!regex.test(userName)) {
        setNameErrMsg("Username must not contain special characters!");
        setErrState(true);
      }
    }

    //passRegex rules:
    // At least 8 characters long
    // Contains at least one uppercase letter
    // Contains at least one lowercase letter
    // Contains at least one number
    // Contains at least one special symbol from !@#$%^&*
    // No spaces

    if (userPassword) {
      if (validation.checkMaxValue(userPassword, 100)) {
        setPasswordErrMsg("Password must not exceed 100 chars");
        setErrState(true);
      }
      if (validation.checkMinValue(userPassword, 4)) {
        setPasswordErrMsg("Password must be above 4 chars");
        setErrState(true);
      }
      const passRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/u;
      if (!passRegex.test(userPassword)) {
        setPasswordErrMsg("Password must not contain special characters!");
        setErrState(true);
      }
    }

    if (confirm !== userPassword) {
      setConfPasswordErrMsg("Passwords do not match");
      setErrState(true);
    }

    if (!errState) {
      const response = await axios.post(
        "http://localhost:3000/users",
        formData
      );
      console.log(response);
    }
  };

  return (
    <div className="container">
      <div className="card auth-card">
        <h2 className="form-title">Create an account</h2>
        <p className="form-sub">
          Start tracking your moods — it only takes a minute.
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="input-label">
            Username
            <input
              name="userName"
              type="text"
              className="input"
              placeholder="Username"
              value={formData.userName}
              onChange={handleChange}
            />
            <span className="errMsg">{errState ? nameErrMsg : ""}</span>
          </label>
          <label className="input-label">
            Password
            <input
              name="userPassword"
              type="password"
              className="input"
              placeholder="Create a password"
              value={formData.userPassword}
              onChange={handleChange}
            />
            <span className="errMsg">{errState ? passwordErrMsg : ""}</span>
          </label>
          <label className="input-label">
            Confirm password
            <input
              name="confirmPassword"
              type="password"
              className="input"
              placeholder="Repeat password"
              value={confPassword}
              onChange={(e) => setConfPassword(e.target.value)}
            />
            <span className="errMsg">{errState ? confPasswordErrMsg : ""}</span>
          </label>
          <div className="actions">
            <button type="submit" className="primary-btn">
              Register
            </button>
            <button type="button" className="secondary-btn">
              Clear
            </button>
          </div>
          <p className="small-note">
            By registering you agree to the terms and privacy policy.
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
