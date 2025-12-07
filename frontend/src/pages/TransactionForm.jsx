import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';

export default function TransactionForm(){
  const { id } = useParams();
  const [type,setType]=useState('expense');
  const [amount,setAmount]=useState('');
  const [category,setCategory]=useState('');
  const [note,setNote]=useState('');
  const [date,setDate]=useState('');
  const nav = useNavigate();

  useEffect(()=>{
    if(id){
      api.get(`/transactions`).then(list=>{
        const item = list.find(x=>x._id===id);
        if(item){
          setType(item.type); setAmount(item.amount); setCategory(item.category);
          setNote(item.note||''); setDate(new Date(item.date).toISOString().slice(0,16));
        }
      }).catch(()=>{});
    } else {
      setDate(new Date().toISOString().slice(0,16));
    }
  },[id]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const payload = { type, amount: Number(amount), category, note, date };
      if(id) await api.put(`/transactions/${id}`, payload);
      else await api.post('/transactions', payload);
      nav('/transactions');
    } catch (err) {
      alert('Save failed');
    }
  };

  return (
    <div className="card">
      <h2>{id ? 'Edit' : 'Add'} transaction</h2>
      <form onSubmit={submit}>
        <label>Type</label>
        <select value={type} onChange={e=>setType(e.target.value)}>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
        <label>Amount</label>
        <input type="number" value={amount} onChange={e=>setAmount(e.target.value)} required />
        <label>Category</label>
        <input value={category} onChange={e=>setCategory(e.target.value)} required />
        <label>Note</label>
        <input value={note} onChange={e=>setNote(e.target.value)} />
        <label>Date & time</label>
        <input type="datetime-local" value={date} onChange={e=>setDate(e.target.value)} required />
        <div style={{display:'flex',gap:8}}>
          <button className="btn" type="submit">Save</button>
          <button className="btn-ghost" type="button" onClick={()=>nav('/transactions')}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
