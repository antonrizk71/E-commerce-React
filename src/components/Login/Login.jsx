import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

export default function Login() {
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
    console.log("Form submitted");
  };

  return (
    <div className="form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          id="name" 
          name="name" 
          placeholder="Enter your name" 
          onFocus={handleFocus}
          onBlur={handleBlur}
          required 
        />
        <input 
          type="password" 
          id="password" 
          name="password" 
          placeholder="Enter password" 
          onFocus={handleFocus}
          onBlur={handleBlur}
          required 
        />
        <input type="submit" value="Login" />
        <p>
          Don’t have an account? <Link to="/signup">Create one</Link>
        </p>
      </form>
    </div>
  );
}
