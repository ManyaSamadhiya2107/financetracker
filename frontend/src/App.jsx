import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import TransactionForm from './pages/TransactionForm';
import { AuthProvider, useAuth } from './context/AuthContext';
import Nav from './components/Nav';

function Protected({children}){
  const { user } = useAuth();
  if(!user) return <Navigate to='/login' replace />;
  return children;
}

export default function App(){
  return (
    <AuthProvider>
      <div className="app">
        <Nav />
        <main className="container">
          <Routes>
            <Route path="/" element={<Protected><Dashboard /></Protected>} />
            <Route path="/transactions" element={<Protected><Transactions /></Protected>} />
            <Route path="/transactions/new" element={<Protected><TransactionForm /></Protected>} />
            <Route path="/transactions/edit/:id" element={<Protected><TransactionForm /></Protected>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
}
