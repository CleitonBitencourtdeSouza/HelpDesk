import React, { useState } from 'react';
import './App.css';
import Login from './Login';

import ChamadosList from './ChamadosList';
import NovoChamado from './NovoChamado';

function App() {
  const [token, setToken] = useState(null);

  const [refreshChamados, setRefreshChamados] = useState(false);

  if (!token) {
    return <Login onLogin={setToken} />;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>Bem-vindo ao HelpDesk!</h2>
        <button onClick={() => setToken(null)} style={{ position: 'absolute', right: 20, top: 20 }}>Logout</button>
      </header>
      <NovoChamado token={token} onChamadoCriado={() => setRefreshChamados(r => !r)} />
      <ChamadosList token={token} key={refreshChamados} />
    </div>
  );
}

export default App;
