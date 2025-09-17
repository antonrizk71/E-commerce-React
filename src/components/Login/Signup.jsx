import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

export default function Signup() {
  const Focus = (e) => {
    e.target.dataset.placeholder = e.target.placeholder;
    e.target.placeholder = '';
  };

  const Blur = (e) => {
    if (e.target.value === '') {
      e.target.placeholder = e.target.dataset.placeholder;
    }
  };

  const Submit = (e) => {
    e.preventDefault();
    console.log("Signup form submitted");
  };

  return (
    <div className="form">
      <h2>Sign Up</h2>
      <form onSubmit={Submit}>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          onFocus={Focus}
          onBlur={Blur}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          onFocus={Focus}
          onBlur={Blur}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          onFocus={Focus}
          onBlur={Blur}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          onFocus={Focus}
          onBlur={Blur}
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
