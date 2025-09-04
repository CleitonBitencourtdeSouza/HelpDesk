import React, { useState } from 'react';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    try {
      const response = await fetch('http://localhost:5215/api/Auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })
      });
      if (!response.ok) {
        const data = await response.text();
        setErro(data || 'Erro ao fazer login');
        return;
      }
      const data = await response.json();
      onLogin(data.token);
    } catch (err) {
      setErro('Erro de conexão com a API');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '40px auto', padding: 24, border: '1px solid #ccc', borderRadius: 8 }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label>Email:</label><br />
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%' }} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Senha:</label><br />
          <input type="password" value={senha} onChange={e => setSenha(e.target.value)} required style={{ width: '100%' }} />
        </div>
        {erro && <div style={{ color: 'red', marginBottom: 12 }}>{erro}</div>}
        <button type="submit" style={{ width: '100%' }}>Entrar</button>
      </form>
    </div>
  );
}

export default Login;
