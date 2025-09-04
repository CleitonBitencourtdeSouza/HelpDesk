import React, { useState } from 'react';

function EditarChamado({ chamado, token, onSalvo, onCancelar }) {
  const [titulo, setTitulo] = useState(chamado.titulo);
  const [descricao, setDescricao] = useState(chamado.descricao || '');
  const [status, setStatus] = useState(chamado.status);
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5215/api/Chamados/${chamado.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ titulo, descricao, status })
      });
      if (!response.ok) {
        const data = await response.text();
        setErro(data || 'Erro ao salvar chamado');
      } else {
        if (onSalvo) onSalvo();
      }
    } catch (err) {
      setErro('Erro de conexão com a API');
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 500, margin: '40px auto', padding: 24, border: '1px solid #ccc', borderRadius: 8 }}>
      <h3>Editar Chamado</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label>Título:</label><br />
          <input type="text" value={titulo} onChange={e => setTitulo(e.target.value)} required style={{ width: '100%' }} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Descrição:</label><br />
          <textarea value={descricao} onChange={e => setDescricao(e.target.value)} style={{ width: '100%' }} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Status:</label><br />
          <select value={status} onChange={e => setStatus(e.target.value)} style={{ width: '100%' }}>
            <option value="Aberto">Aberto</option>
            <option value="EmAndamento">EmAndamento</option>
            <option value="Fechado">Fechado</option>
          </select>
        </div>
        {erro && <div style={{ color: 'red', marginBottom: 12 }}>{erro}</div>}
        <button type="submit" disabled={loading} style={{ width: '49%', marginRight: '2%' }}>Salvar</button>
        <button type="button" onClick={onCancelar} style={{ width: '49%' }}>Cancelar</button>
      </form>
    </div>
  );
}

export default EditarChamado;
