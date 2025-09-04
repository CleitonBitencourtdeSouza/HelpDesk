import React, { useState } from 'react';

function NovoChamado({ token, onChamadoCriado }) {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setSucesso('');
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5215/api/Chamados', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ titulo, descricao })
      });
      if (!response.ok) {
        const data = await response.text();
        setErro(data || 'Erro ao criar chamado');
      } else {
        setSucesso('Chamado criado com sucesso!');
        setTitulo('');
        setDescricao('');
        if (onChamadoCriado) onChamadoCriado();
      }
    } catch (err) {
      setErro('Erro de conexão com a API');
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 500, margin: '40px auto', padding: 24, border: '1px solid #ccc', borderRadius: 8 }}>
      <h3>Novo Chamado</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label>Título:</label><br />
          <input type="text" value={titulo} onChange={e => setTitulo(e.target.value)} required style={{ width: '100%' }} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Descrição:</label><br />
          <textarea value={descricao} onChange={e => setDescricao(e.target.value)} style={{ width: '100%' }} />
        </div>
        {erro && <div style={{ color: 'red', marginBottom: 12 }}>{erro}</div>}
        {sucesso && <div style={{ color: 'green', marginBottom: 12 }}>{sucesso}</div>}
        <button type="submit" disabled={loading} style={{ width: '100%' }}>Criar Chamado</button>
      </form>
    </div>
  );
}

export default NovoChamado;
