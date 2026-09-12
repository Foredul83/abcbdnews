import React from 'react';
import { Link } from 'react-router-dom';
import './Logo.css';

function Logo() {
  return (
    <Link to="/" className="navbar-logo-wrapper">
      <img src="/logo.svg" alt="ABCBD News Logo" className="logo-icon" title="ABCBD News" />
      <span className="logo-text">ABCBD</span>
    </Link>
  );
}

export default Logo;
