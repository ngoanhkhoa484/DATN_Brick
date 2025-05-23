import React, { useState } from "react";
import axios from "axios";
import "./sign.css";
import logo from "../img/logo1.jpg";


function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("https://localhost:44333/scalar/#tag/auth/POST/api/Auth/login", form);
      localStorage.setItem("token", res.data.token);
      alert("Đăng nhập thành công!");
    } catch (err) {
      setError("Email hoặc mật khẩu không đúng.");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <img src={logo} alt="Logo" className="logo-img" />
        <h2 className="title">Đăng nhập vào tài khoản</h2>
        <p className="subtitle">Nhập email và mật khẩu của bạn để tiếp tục.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Nhập email"
            onChange={handleChange}
            required
            className="input-box"
          />
          <input
            type="password"
            name="password"
            placeholder="Nhập mật khẩu"
            onChange={handleChange}
            required
            className="input-box"
          />
          {error && <p className="error-text">{error}</p>}
          <button type="submit" className="login-btn">Tiếp tục</button>
        </form>
        <p className="or-text">hoặc tiếp tục với</p>
        <div className="social-icons">
          <button className="social-btn facebook"></button>
          <button className="social-btn google"></button>
          <button className="social-btn apple"></button>
          <button className="social-btn epic"></button>
        </div>
        <div className="footer-links">
          <a href="#">Chính sách bảo mật</a>
          <span>|</span>
          <a href="#">Cookie</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
