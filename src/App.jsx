import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [pizzak, setPizzak] = useState([]);
  const [ujNev, setUjNev] = useState('');
  const [ujAr, setUjAr] = useState('');
  const [szerkesztId, setSzerkesztId] = useState(null);
  const [uzenet, setUzenet] = useState('');

  const adatokBetoltese = () => {
    axios.get('pizzak.php').then(res => setPizzak(res.data));
  };

  useEffect(() => { adatokBetoltese(); }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const adatok = { nev: ujNev, ar: ujAr };
    
    if (szerkesztId) {
      axios.put('pizzak.php', { id: szerkesztId, ...adatok }).then(() => {
        setSzerkesztId(null);
        setUzenet("Sikeres módosítás!");
        finish();
      });
    } else {
      axios.post('pizzak.php', adatok).then(() => {
        setUzenet("Sikeres mentés!");
        finish();
      });
    }
  };

  const finish = () => {
    setUjNev(''); setUjAr('');
    adatokBetoltese();
  };

  const szerkesztesreKijelol = (p) => {
    setSzerkesztId(p.id);
    setUjNev(p.nev);
    setUjAr(p.ar);
  };

  const torles = (id) => {
    if(window.confirm("Törlöd?")) {
      axios.delete('pizzak.php', { data: { id } }).then(() => adatokBetoltese());
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>React + Axios Pizza Admin (Teljes CRUD)</h1>
      <form onSubmit={handleSubmit}>
        <input value={ujNev} onChange={e => setUjNev(e.target.value)} placeholder="Név" />
        <input type="number" value={ujAr} onChange={e => setUjAr(e.target.value)} placeholder="Ár" />
        <button type="submit">{szerkesztId ? 'Módosítás mentése' : 'Hozzáadás'}</button>
      </form>
      <table border="1" style={{ width: '100%', marginTop: '20px' }}>
        <thead><tr><th>Név</th><th>Ár</th><th>Műveletek</th></tr></thead>
        <tbody>
          {pizzak.map(p => (
            <tr key={p.id}>
              <td>{p.nev}</td><td>{p.ar} Ft</td>
              <td>
                <button onClick={() => szerkesztesreKijelol(p)}>Módosít</button>
                <button onClick={() => torles(p.id)}>Töröl</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default App;