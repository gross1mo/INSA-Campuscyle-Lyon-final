import React, { useState } from 'react';
import { supabase } from '@/api/client';

const s = {
  page: { maxWidth: 400, margin: '0 auto', padding: '24px 16px', fontFamily: 'sans-serif' },
  back: { fontSize: 13, color: '#555', textDecoration: 'none' },
  h1: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  input: { display: 'block', width: '100%', padding: '7px 8px', marginBottom: 10, border: '1px solid #ccc', fontSize: 14, boxSizing: 'border-box' },
  btn: { background: '#000', color: '#fff', border: 'none', padding: '9px 20px', fontSize: 14, cursor: 'pointer' },
};

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
    else window.location.href = '/';
    setLoading(false);
  };

  const handleSignup = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) alert(error.message);
    else alert('Check your email to confirm your account!');
    setLoading(false);
  };

  return (
    <div style={s.page}>
      <a href="/" style={s.back}>← Back</a>
      <h1 style={s.h1}>Login</h1>
      <form onSubmit={handleLogin}>
        <input style={s.input} placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input style={s.input} placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit" disabled={loading} style={s.btn}>
          {loading ? 'Loading...' : 'Login'}
        </button>
        <button type="button" onClick={handleSignup} disabled={loading} style={{ ...s.btn, background: '#555', marginLeft: 10 }}>
          Sign Up
        </button>
      </form>
    </div>
  );
}
