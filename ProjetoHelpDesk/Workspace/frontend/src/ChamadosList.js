import React, { useEffect, useState } from 'react';
import EditarChamado from './EditarChamado';

function ChamadosList({ token }) {
  const [chamados, setChamados] = useState([]);
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(true);
  const [editando, setEditando] = useState(null);

  const fetchChamados = async () => {
    setLoading(true);
    setErro('');
    try {
      const response = await fetch('http://localhost:5215/api/Chamados', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        setErro('Erro ao buscar chamados');
        setChamados([]);
      } else {
        const data = await response.json();
        setChamados(data);
      }
    } catch (err) {
      setErro('Erro de conexão com a API');
      setChamados([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchChamados();
    // eslint-disable-next-line
  }, [token]);

  const handleExcluir = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir este chamado?')) return;
    try {
      const response = await fetch(`http://localhost:5215/api/Chamados/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        fetchChamados();
      } else {
        alert('Erro ao excluir chamado');
      }
    } catch {
      alert('Erro de conexão com a API');
    }
  };

  if (loading) return <p>Carregando chamados...</p>;
  if (erro) return <p style={{ color: 'red' }}>{erro}</p>;
  if (chamados.length === 0) return <p>Nenhum chamado encontrado.</p>;

  if (editando) {
    return <EditarChamado chamado={editando} token={token} onSalvo={() => { setEditando(null); fetchChamados(); }} onCancelar={() => setEditando(null)} />;
  }

  return (
    <div style={{ maxWidth: 900, margin: '40px auto' }}>
      <h2>Chamados</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ccc', padding: 8 }}>ID</th>
            <th style={{ border: '1px solid #ccc', padding: 8 }}>Título</th>
            <th style={{ border: '1px solid #ccc', padding: 8 }}>Status</th>
            <th style={{ border: '1px solid #ccc', padding: 8 }}>Data Abertura</th>
            <th style={{ border: '1px solid #ccc', padding: 8 }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {chamados.map(c => (
            <tr key={c.id}>
              <td style={{ border: '1px solid #ccc', padding: 8 }}>{c.id}</td>
              <td style={{ border: '1px solid #ccc', padding: 8 }}>{c.titulo}</td>
              <td style={{ border: '1px solid #ccc', padding: 8 }}>{c.status}</td>
              <td style={{ border: '1px solid #ccc', padding: 8 }}>{new Date(c.dataAbertura).toLocaleString()}</td>
              <td style={{ border: '1px solid #ccc', padding: 8 }}>
                <button onClick={() => setEditando(c)} style={{ marginRight: 8 }}>Editar</button>
                <button onClick={() => handleExcluir(c.id)} style={{ color: 'red' }}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ChamadosList;
