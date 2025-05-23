import React, { useState } from "react";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // Validate confirm password locally if you muốn
    if (formData.password !== formData.confirmPassword) {
      setError("Password and confirm password do not match.");
      return;
    }

    const data = new FormData();
    data.append("Username", formData.username);
    data.append("Email", formData.email);
    data.append("Password", formData.password);
    data.append("ConfirmPassword", formData.confirmPassword);

    try {
      const res = await fetch("/api/auth/registerforcustomer", {
        method: "POST",
        body: data
      });

      if (!res.ok) {
        const text = await res.text();
        setError(text || "Registration failed");
        setSuccess(false);
      } else {
        setError(null);
        setSuccess(true);
        // Optional: redirect to login page or clear form
      }
    } catch (err) {
      setError("Network error");
      setSuccess(false);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>Registration successful! Please login.</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label><br />
          <input
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email</label><br />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password</label><br />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Confirm Password</label><br />
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
