import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Nav(){
  const { user, logout } = useAuth();
  const nav = useNavigate();
  const doLogout = () => { logout(); nav('/login'); };

  return (
    <nav className="nav">
      <div className="nav-left">
        <Link to="/" className="brand">FinanceTracker</Link>
      </div>
      <div className="nav-right">
        {user ? (
          <>
            <span className="muted">Hi, {user.name}</span>
            <Link to="/transactions">Transactions</Link>
            <button className="btn-ghost" onClick={doLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
