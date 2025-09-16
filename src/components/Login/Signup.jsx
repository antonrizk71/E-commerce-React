import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

export default function Signup() {
  const handleFocus = (e) => {
    e.target.dataset.placeholder = e.target.placeholder;
    e.target.placeholder = '';
  };

  const handleBlur = (e) => {
    if (e.target.value === '') {
      e.target.placeholder = e.target.dataset.placeholder;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup form submitted");
  };

  return (
    <div className="form">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          onFocus={handleFocus}
          onBlur={handleBlur}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          onFocus={handleFocus}
          onBlur={handleBlur}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          onFocus={handleFocus}
          onBlur={handleBlur}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          onFocus={handleFocus}
          onBlur={handleBlur}
          required
        />
        <input type="submit" value="Sign Up" />
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
