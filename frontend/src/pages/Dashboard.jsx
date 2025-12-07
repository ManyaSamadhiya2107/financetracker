import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard(){
  const [txns, setTxns] = useState([]);
  const [summary, setSummary] = useState({income:0, expense:0});

  useEffect(()=>{
    const load = async ()=>{
      try {
        const data = await api.get('/transactions');
        setTxns(data);
        const inc = data.filter(t=>t.type==='income').reduce((s,t)=>s+t.amount,0);
        const exp = data.filter(t=>t.type==='expense').reduce((s,t)=>s+t.amount,0);
        setSummary({income:inc, expense:exp});
      } catch (err) {
        console.error(err);
      }
    };
    load();
  },[]);

  const chartData = [
    { name: 'Income', value: summary.income },
    { name: 'Expense', value: summary.expense }
  ];
  const COLORS = ['#00C49F', '#FF8042'];

  return (
    <div>
      <h2>Dashboard</h2>
      <div className="grid">
        <div className="card">
          <h3>Overview</h3>
          <p>Total income: ₹{summary.income}</p>
          <p>Total expense: ₹{summary.expense}</p>
          <p>Net: ₹{summary.income - summary.expense}</p>
        </div>
        <div className="card">
          <h3>Breakdown</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={chartData} dataKey="value" innerRadius={40} outerRadius={80} paddingAngle={3}>
                {chartData.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card">
        <h3>Recent transactions</h3>
        {txns.slice(0,6).map(t=>(
          <div key={t._id} className="txn-row">
            <div>{t.category}</div>
            <div className="muted">{new Date(t.date).toLocaleString()}</div>
            <div className={t.type==='income' ? 'money income' : 'money expense'}>₹{t.amount}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
