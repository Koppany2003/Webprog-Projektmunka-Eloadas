import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Opcionális, ha van CSS fájlod

function App() {
  const [pizzak, setPizzak] = useState([]);
  const [hiba, setHiba] = useState(null);
  const [toltes, setToltes] = useState(true);

  useEffect(() => {
    axios.get('pizzak.php') 
      .then(valasz => {
        if (valasz.data.error) {
            setHiba(valasz.data.error);
        } else {
            setPizzak(valasz.data);
        }
        setToltes(false);
      })
      .catch(error => {
        setHiba('Kritikus hiba: Nem sikerült elérni a szervert az Axios segítségével.');
        console.error(error);
        setToltes(false);
      });
  }, []);

  return (
    <div style={{ fontFamily: 'Arial', padding: '20px' }}>
      <h1>React + Axios CRUD - Adatbázisból</h1>
      <a href="index.html" style={{ display: 'block', marginBottom: '20px' }}>Vissza a Főoldalra</a>

      <div style={{ background: '#e9ecef', padding: '15px', borderRadius: '5px', marginBottom: '20px' }}>
        <p><strong>Rendszer üzenet:</strong> Ez az oldal React állapotváltozókat és Axiost használ a <code>pizzak.php</code> eléréséhez.</p>
      </div>

      {hiba && <p style={{ color: 'red', fontWeight: 'bold' }}>{hiba}</p>}

      <table border="1" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead style={{ backgroundColor: '#333', color: 'white' }}>
          <tr>
            <th style={{ padding: '10px' }}>Azonosító</th>
            <th style={{ padding: '10px' }}>Pizza Neve</th>
            <th style={{ padding: '10px' }}>Ár (Ft)</th>
          </tr>
        </thead>
        <tbody>
          {toltes ? (
            <tr><td colSpan="3" style={{ padding: '10px', textAlign: 'center' }}>Adatok betöltése Axios-szal...</td></tr>
          ) : pizzak.length === 0 ? (
            <tr><td colSpan="3" style={{ padding: '10px', textAlign: 'center' }}>Nincs adat az adatbázisban.</td></tr>
          ) : (
            pizzak.map(pizza => (
              <tr key={pizza.id}>
                <td style={{ padding: '10px' }}>{pizza.id}</td>
                <td style={{ padding: '10px' }}>{pizza.nev}</td>
                <td style={{ padding: '10px' }}>{pizza.ar} Ft</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;