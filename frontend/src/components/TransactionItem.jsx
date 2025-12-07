import React from 'react';
import { Link } from 'react-router-dom';

export default function TransactionItem({txn, onDelete}){
  return (
    <div className="txn">
      <div>
        <strong>{txn.category}</strong>
        <div className="muted">{new Date(txn.date).toLocaleString()}</div>
      </div>
      <div className="txn-right">
        <div className={txn.type==='income' ? 'money income' : 'money expense'}>
          {txn.type==='income' ? '+' : '-'}₹{txn.amount}
        </div>
        <div className="txn-actions">
          <Link to={`/transactions/edit/${txn._id}`} className="btn-sm">Edit</Link>
          <button className="btn-sm btn-danger" onClick={()=>onDelete(txn._id)}>Delete</button>
        </div>
      </div>
    </div>
  );
}
