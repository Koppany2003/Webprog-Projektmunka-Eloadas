import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [pizzak, setPizzak] = useState([]);
  const [ujNev, setUjNev] = useState('');
  const [ujAr, setUjAr] = useState('');
  const [uzenet, setUzenet] = useState('');

  const adatokBetoltese = () => {
    axios.get('pizzak.php')
      .then(valasz => {
        setPizzak(valasz.data);
      })
      .catch(hiba => {
        console.error("Hiba a letöltésnél:", hiba);
        setUzenet("Nem sikerült elérni az adatbázist.");
      });
  };

  // Az oldal betöltésekor azonnal lefut
  useEffect(() => {
    adatokBetoltese();
  }, []);

  const pizzaHozzaadasa = (e) => {
    e.preventDefault();
    if (!ujNev || !ujAr) return;

    axios.post('pizzak.php', {
      nev: ujNev,
      ar: ujAr
    })
    .then(valasz => {
      setUzenet("Sikeres mentés!");
      setUjNev('');
      setUjAr('');
      adatokBetoltese(); // Táblázat frissítése
    })
    .catch(hiba => {
      setUzenet("Hiba történt a mentés során.");
    });
  };

  const pizzaTorlese = (id) => {
    if (!window.confirm("Biztosan törlöd?")) return;

    axios.delete('pizzak.php', {
      data: { id: id }
    })
    .then(valasz => {
      setUzenet("Sikeres törlés!");
      adatokBetoltese(); // Táblázat frissítése
    })
    .catch(hiba => {
      setUzenet("Hiba történt a törlésnél.");
    });
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>React + Axios Pizza Admin</h1>
      
      {uzenet && <p style={{ color: 'blue' }}>{uzenet}</p>}

      {/* Új pizza felvétele űrlap */}
      <form onSubmit={pizzaHozzaadasa} style={{ marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="Pizza neve" 
          value={ujNev} 
          onChange={(e) => setUjNev(e.target.value)} 
        />
        <input 
          type="number" 
          placeholder="Ár" 
          value={ujAr} 
          onChange={(e) => setUjAr(e.target.value)} 
        />
        <button type="submit">Hozzáadás</button>
      </form>

      {/* Adatok megjelenítése táblázatban */}
      <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#eee' }}>
            <th>ID</th>
            <th>Név</th>
            <th>Ár (Ft)</th>
            <th>Művelet</th>
          </tr>
        </thead>
        <tbody>
          {pizzak.map(pizza => (
            <tr key={pizza.id}>
              <td>{pizza.id}</td>
              <td>{pizza.nev}</td>
              <td>{pizza.ar}</td>
              <td>
                <button onClick={() => pizzaTorlese(pizza.id)}>Törlés</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;