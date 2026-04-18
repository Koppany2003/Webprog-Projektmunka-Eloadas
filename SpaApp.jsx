import React, { useState } from 'react';

function PizzaAmoba() {
  const [tepsi, setTepsi] = useState(Array(9).fill(null));
  const [pizzaJon, setPizzaJon] = useState(true);

  const kattintas = (index) => {
    if (tepsi[index] || vanNyertes(tepsi)) return;
    const ujTepsi = [...tepsi];
    ujTepsi[index] = pizzaJon ? '🍕' : '🍍';
    setTepsi(ujTepsi);
    setPizzaJon(!pizzaJon);
  };

  const vanNyertes = (mezok) => {
    const vonalak = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    for (let i = 0; i < vonalak.length; i++) {
      const [a, b, c] = vonalak[i];
      if (mezok[a] && mezok[a] === mezok[b] && mezok[a] === mezok[c]) return mezok[a];
    }
    return null;
  };

  const nyertes = vanNyertes(tepsi);
  const teleTepsi = !tepsi.includes(null);

  return (
    <div style={{ textAlign: 'center', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h3>PizzAmőba 🍕 vs 🍍</h3>
      <p><b>{nyertes ? `Nyertes: ${nyertes}` : teleTepsi ? 'Döntetlen!' : `Következik: ${pizzaJon ? '🍕' : '🍍'}`}</b></p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 50px)', gap: '5px', justifyContent: 'center', margin: '20px auto' }}>
        {tepsi.map((ertek, index) => (
          <button key={index} onClick={() => kattintas(index)} style={{ width: '50px', height: '50px', fontSize: '24px', cursor: 'pointer' }}>
            {ertek}
          </button>
        ))}
      </div>
      <button onClick={() => setTepsi(Array(9).fill(null))}>Új játék</button>
    </div>
  );
}

function Szamologep() {
  const [szam1, setSzam1] = useState('');
  const [szam2, setSzam2] = useState('');
  const [eredmeny, setEredmeny] = useState(null);

  const szamol = (muvelet) => {
    const a = parseFloat(szam1);
    const b = parseFloat(szam2);
    if (isNaN(a) || isNaN(b)) {
      setEredmeny('Kérlek adj meg érvényes számokat!');
      return;
    }
    if (muvelet === '+') setEredmeny(a + b);
    if (muvelet === '-') setEredmeny(a - b);
    if (muvelet === '*') setEredmeny(a * b);
    if (muvelet === '/') setEredmeny(b !== 0 ? a / b : 'Nullával nem osztunk!');
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h3>Alap Számológép</h3>
      <input type="number" value={szam1} onChange={(e) => setSzam1(e.target.value)} placeholder="Első szám" style={{ margin: '5px' }} />
      <br />
      <input type="number" value={szam2} onChange={(e) => setSzam2(e.target.value)} placeholder="Második szám" style={{ margin: '5px' }} />
      <br />
      <div style={{ margin: '15px 0' }}>
        <button onClick={() => szamol('+')} style={{ margin: '2px', padding: '5px 15px' }}>+</button>
        <button onClick={() => szamol('-')} style={{ margin: '2px', padding: '5px 15px' }}>-</button>
        <button onClick={() => szamol('*')} style={{ margin: '2px', padding: '5px 15px' }}>*</button>
        <button onClick={() => szamol('/')} style={{ margin: '2px', padding: '5px 15px' }}>/</button>
      </div>
      <h4>Eredmény: {eredmeny !== null ? eredmeny : '-'}</h4>
    </div>
  );
}

export default function SpaApp() {
  const [aktivJatek, setAktivJatek] = useState('amoba'); // Alapértelmezetten az amőba tölt be

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '20px auto' }}>
      <h2>React Egyoldalas Alkalmazás (SPA)</h2>
      
      {/* Menü a két játék közötti váltáshoz */}
      <div style={{ marginBottom: '20px', padding: '10px', background: '#f4f4f4', borderRadius: '5px', textAlign: 'center' }}>
        <button 
          onClick={() => setAktivJatek('amoba')} 
          style={{ marginRight: '10px', fontWeight: aktivJatek === 'amoba' ? 'bold' : 'normal' }}
        >
          PizzAmőba Játék
        </button>
        <button 
          onClick={() => setAktivJatek('szamologep')}
          style={{ fontWeight: aktivJatek === 'szamologep' ? 'bold' : 'normal' }}
        >
          Számológép
        </button>
      </div>

      {/* Itt dől el, melyik komponens rajzolódik ki (SPA logika) */}
      <div>
        {aktivJatek === 'amoba' && <PizzaAmoba />}
        {aktivJatek === 'szamologep' && <Szamologep />}
      </div>
    </div>
  );
}