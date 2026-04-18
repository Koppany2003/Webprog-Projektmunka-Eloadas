import React, { useState } from 'react';

function PizzaAmoba() {
  const [tepsi, setTepsi] = useState(Array(9).fill(null));
  const [nyertes, setNyertes] = useState(null);
  const [gepJon, setGepJon] = useState(false);

  const vanNyertes = (m) => {
    const v = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    for (let i = 0; i < v.length; i++) {
      const [a, b, c] = v[i];
      if (m[a] && m[a] === m[b] && m[a] === m[c]) return m[a];
    }
    return null;
  };

  const kattintas = (i) => {
    if (tepsi[i] || nyertes || gepJon) return;
    const uj = [...tepsi];
    uj[i] = '🍕';
    setTepsi(uj);
    let n = vanNyertes(uj);
    if (n) { setNyertes(n); return; }
    if (!uj.includes(null)) return;
    setGepJon(true);
    setTimeout(() => {
      const ures = uj.map((v, idx) => v === null ? idx : null).filter(v => v !== null);
      if(ures.length > 0) {
        const r = ures[Math.floor(Math.random() * ures.length)];
        uj[r] = '🍍';
        setTepsi([...uj]);
        n = vanNyertes(uj);
        if (n) setNyertes(n);
      }
      setGepJon(false);
    }, 600);
  };

  return (
    <div style={{ background: '#1a1a1a', padding: '20px', borderRadius: '8px', textAlign: 'center', border: '1px solid #333' }}>
      <h3 style={{ color: '#eee', marginBottom: '15px' }}>PizzAmőba</h3>
      <div style={{ color: nyertes ? '#ff4444' : '#aaa', marginBottom: '15px', fontWeight: 'bold' }}>
        {nyertes ? (nyertes === '🍕' ? 'Nyertél!' : 'Gép nyert!') : (gepJon ? '...' : 'Te jössz')}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 70px)', gap: '5px', justifyContent: 'center' }}>
        {tepsi.map((v, i) => (
          <button key={i} onClick={() => kattintas(i)} style={{ width: '70px', height: '70px', fontSize: '30px', background: '#222', border: '1px solid #444', color: 'white', cursor: 'pointer' }}>{v}</button>
        ))}
      </div>
      <button onClick={() => {setTepsi(Array(9).fill(null)); setNyertes(null);}} style={{ marginTop: '20px', padding: '10px', background: '#444', color: 'white', border: '1px solid #666', cursor: 'pointer' }}>Új játék</button>
    </div>
  );
}

function Szamologep() {
  const [kijelzo, setKijelzo] = useState('0');
  const [folyamat, setFolyamat] = useState('');
  const [elozoErtek, setElozoErtek] = useState(null);
  const [muvelet, setMuvelet] = useState(null);
  const [ujSzam, setUjSzam] = useState(true);

  const szamKatt = (n) => {
    if (ujSzam) {
      setKijelzo(String(n));
      setUjSzam(false);
    } else {
      setKijelzo(kijelzo === '0' ? String(n) : kijelzo + n);
    }
  };

  const muveletKatt = (m) => {
    const aktualis = parseFloat(kijelzo);
    setElozoErtek(aktualis);
    setMuvelet(m);
    setFolyamat(`${aktualis} ${m}`);
    setUjSzam(true);
  };

  const egyenloKatt = () => {
    if (muvelet === null || elozoErtek === null) return;
    const aktualis = parseFloat(kijelzo);
    let eredmeny = 0;
    
    if (muvelet === '+') eredmeny = elozoErtek + aktualis;
    if (muvelet === '-') eredmeny = elozoErtek - aktualis;
    if (muvelet === '*') eredmeny = elozoErtek * aktualis;
    if (muvelet === '/') eredmeny = aktualis !== 0 ? elozoErtek / aktualis : 'Hiba';

    setFolyamat(`${elozoErtek} ${muvelet} ${aktualis} =`);
    setKijelzo(String(eredmeny));
    setMuvelet(null);
    setElozoErtek(null);
    setUjSzam(true);
  };

  const torles = () => {
    setKijelzo('0');
    setFolyamat('');
    setElozoErtek(null);
    setMuvelet(null);
    setUjSzam(true);
  };

  const visszatorles = () => {
    if (ujSzam) return;
    setKijelzo(kijelzo.length > 1 ? kijelzo.slice(0, -1) : '0');
  };

  const gombStilus = {
    background: '#222',
    color: '#fff',
    border: '1px solid #444',
    fontSize: '1.2rem',
    padding: '15px',
    cursor: 'pointer',
    borderRadius: '4px'
  };

  return (
    <div style={{ background: '#000', width: '280px', padding: '10px', borderRadius: '5px', border: '1px solid #333' }}>
      {/* Kijelző */}
      <div style={{ background: '#1a1a1a', border: '1px solid #444', padding: '10px', marginBottom: '10px', textAlign: 'right' }}>
        <div style={{ color: '#888', fontSize: '0.8rem', minHeight: '1.2rem' }}>{folyamat}</div>
        <div style={{ color: '#fff', fontSize: '2rem', overflow: 'hidden' }}>{kijelzo}</div>
      </div>

      {/* Gombok */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4px' }}>
        <button style={gombStilus} onClick={torles}>C</button>
        <button style={gombStilus}>%</button>
        <button style={gombStilus}>+/-</button>
        <button style={gombStilus} onClick={visszatorles}>⌫</button>
        
        {[7,8,9].map(n => <button key={n} style={gombStilus} onClick={() => szamKatt(n)}>{n}</button>)}
        <button style={gombStilus} onClick={() => muveletKatt('/')}>÷</button>
        
        {[4,5,6].map(n => <button key={n} style={gombStilus} onClick={() => szamKatt(n)}>{n}</button>)}
        <button style={gombStilus} onClick={() => muveletKatt('*')}>×</button>
        
        {[1,2,3].map(n => <button key={n} style={gombStilus} onClick={() => szamKatt(n)}>{n}</button>)}
        <button style={gombStilus} onClick={() => muveletKatt('-')}>-</button>
        
        <button style={{...gombStilus, gridColumn: 'span 2'}} onClick={() => szamKatt(0)}>0</button>
        <button style={gombStilus} onClick={() => { if(!kijelzo.includes('.')) setKijelzo(kijelzo + '.') }}>.</button>
        <button style={{...gombStilus, background: '#333'}} onClick={egyenloKatt}>=</button>
        <button style={{...gombStilus, gridColumn: '4', gridRow: '5', height: '60px'}} onClick={() => muveletKatt('+')}>+</button>
      </div>
    </div>
  );
}

export default function SpaApp() {
  const [lap, setLap] = useState('amoba');
  return (
    <div style={{ maxWidth: '800px', margin: '20px auto', fontFamily: 'monospace' }}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
        <button onClick={() => setLap('amoba')} style={{ padding: '10px', background: lap === 'amoba' ? '#444' : '#222', color: 'white', border: '1px solid #555', cursor: 'pointer' }}>Amőba</button>
        <button onClick={() => setLap('szamologep')} style={{ padding: '10px', background: lap === 'szamologep' ? '#444' : '#222', color: 'white', border: '1px solid #555', cursor: 'pointer' }}>Számológép</button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {lap === 'amoba' ? <PizzaAmoba /> : <Szamologep />}
      </div>
    </div>
  );
}