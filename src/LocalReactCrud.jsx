import React, { useState } from 'react';

export default function LocalReactCrud() {
  const [pizzak, setPizzak] = useState([
    { id: 1, nev: "Margherita", ar: 1500 },
    { id: 2, nev: "Sonkás", ar: 1700 }
  ]);
  const [nev, setNev] = useState('');
  const [ar, setAr] = useState('');
  const [szerkesztId, setSzerkesztId] = useState(null);

  const mentsPizza = (e) => {
    e.preventDefault();
    if (!nev || !ar) return;

    if (szerkesztId) {
      setPizzak(pizzak.map(p => p.id === szerkesztId ? { ...p, nev, ar: parseInt(ar) } : p));
      setSzerkesztId(null);
    } else {
      const ujId = pizzak.length > 0 ? Math.max(...pizzak.map(p => p.id)) + 1 : 1;
      setPizzak([...pizzak, { id: ujId, nev, ar: parseInt(ar) }]);
    }
    setNev(''); setAr('');
  };

  const szerkesztes = (p) => {
    setSzerkesztId(p.id);
    setNev(p.nev);
    setAr(p.ar);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Helyi React Pizzatároló (Tömb CRUD)</h1>
      <form onSubmit={mentsPizza} style={{ marginBottom: '20px' }}>
        <input value={nev} onChange={e => setNev(e.target.value)} placeholder="Név" />
        <input type="number" value={ar} onChange={e => setAr(e.target.value)} placeholder="Ár" />
        <button type="submit">{szerkesztId ? 'Módosítás' : 'Hozzáadás'}</button>
      </form>
      <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead><tr><th>ID</th><th>Név</th><th>Ár</th><th>Művelet</th></tr></thead>
        <tbody>
          {pizzak.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td><td>{p.nev}</td><td>{p.ar} Ft</td>
              <td>
                <button onClick={() => szerkesztes(p)}>Módosít</button>
                <button onClick={() => setPizzak(pizzak.filter(px => px.id !== p.id))}>Töröl</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}