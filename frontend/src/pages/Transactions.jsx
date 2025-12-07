import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import TransactionItem from '../components/TransactionItem';

export default function Transactions(){
  const [txns, setTxns] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(()=>{
    const load = async ()=> {
      try {
        const data = await api.get('/transactions');
        setTxns(data);
      } catch (err) {
        console.error(err);
      } finally { setLoading(false); }
    };
    load();
  },[]);

  const del = async (id) => {
    if(!confirm('Delete this transaction?')) return;
    try {
      await api.delete(`/transactions/${id}`);
      setTxns(txns.filter(t=>t._id !== id));
    } catch (err) {
      alert('Delete failed');
    }
  };

  return (
    <div>
      <div className="page-head">
        <h2>Transactions</h2>
        <Link to="/transactions/new" className="btn">Add</Link>
      </div>
      {loading ? <div>Loading...</div> : (
        <div>
          {txns.length===0 && <div className="card muted">No transactions yet.</div>}
          {txns.map(t=> <TransactionItem key={t._id} txn={t} onDelete={del} />)}
        </div>
      )}
    </div>
  );
}
