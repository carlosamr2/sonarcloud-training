import { useState } from 'react';
import { UserSignupForm } from '../components/UserSignupForm';

// CÓDIGO CON MALAS PRÁCTICAS - NO USAR EN PRODUCCIÓN
function BadCodeExample(): JSX.Element {
  const [n, setN] = useState('');
  const [e, setE] = useState('');
  const [p, setP] = useState('');
  const [p2, setP2] = useState('');
  const [a, setA] = useState(0);
  const [err, setErr] = useState('');
  const [ok, setOk] = useState(false);
  const [data, setData] = useState<any>(null);

  // Función gigante que hace todo
  const submit = () => {
    setErr('');
    setOk(false);

    // Validaciones en cadena sin estructura
    if (n == '') {
      setErr('Name required');
      return;
    }
    if (n.length < 3) {
      setErr('Name too short');
      return;
    }
    if (e == '') {
      setErr('Email required');
      return;
    }
    if (!e.includes('@') || !e.includes('.')) {
      setErr('Email invalid');
      return;
    }
    if (p == '') {
      setErr('Password required');
      return;
    }
    if (p.length < 8) {
      setErr('Password must be 8+ chars');
      return;
    }
    if (!/[A-Z]/.test(p)) {
      setErr('Password needs uppercase');
      return;
    }
    if (!/[0-9]/.test(p)) {
      setErr('Password needs number');
      return;
    }
    if (p != p2) {
      setErr('Passwords dont match');
      return;
    }
    if (a < 18) {
      setErr('Must be 18+');
      return;
    }
    if (a > 120) {
      setErr('Age invalid');
      return;
    }

    // Simulación de guardado
    const u = {
      name: n,
      email: e,
      password: p,
      age: a,
      createdAt: new Date().toISOString(),
    };

    setData(u);
    setOk(true);
    console.log('User created:', u);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>User Signup - BAD CODE</h1>
      <p style={{ color: '#d32f2f', marginBottom: '20px', fontWeight: 'bold' }}>
        ⚠️ CÓDIGO CON MALAS PRÁCTICAS - SOLO PARA DEMOSTRACIÓN ⚠️
      </p>

      <div style={{ marginBottom: '10px' }}>
        <label>Name:</label><br/>
        <input id="name" type="text" value={n} onChange={(ev) => setN(ev.target.value)} style={{ width: '100%', padding: '8px' }} />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>Email:</label><br/>
        <input id="email" type="email" value={e} onChange={(ev) => setE(ev.target.value)} style={{ width: '100%', padding: '8px' }} />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>Password:</label><br/>
        <input id="password" type="password" value={p} onChange={(ev) => setP(ev.target.value)} style={{ width: '100%', padding: '8px' }} />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>Confirm Password:</label><br/>
        <input id="confirmPassword" type="password" value={p2} onChange={(ev) => setP2(ev.target.value)} style={{ width: '100%', padding: '8px' }} />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>Age:</label><br/>
        <input id="age" type="number" value={a || ''} onChange={(ev) => setA(parseInt(ev.target.value) || 0)} style={{ width: '100%', padding: '8px' }} />
      </div>

      <button onClick={submit} style={{ padding: '10px 20px', backgroundColor: '#0070f3', color: 'white', border: 'none', cursor: 'pointer' }}>
        Submit
      </button>

      {err && <div style={{ color: 'red', marginTop: '10px', padding: '10px', backgroundColor: '#ffebee' }}>{err}</div>}
      {ok && <div style={{ color: 'green', marginTop: '10px', padding: '10px', backgroundColor: '#e8f5e9' }}>User created successfully!</div>}
      {data && <pre style={{ marginTop: '10px', padding: '10px', backgroundColor: '#f5f5f5' }}>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}

// COMPONENTE PRINCIPAL - Muestra ambas versiones
export default function Home(): JSX.Element {
  const [showBadCode, setShowBadCode] = useState(false);

  return (
    <div style={{ padding: '40px 20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', marginBottom: '16px' }}>Comparación: Código Malo vs Refactorizado</h1>
        <p style={{ color: '#666', marginBottom: '24px' }}>
          Explora la diferencia entre código con malas prácticas y código refactorizado con buenas prácticas
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button
            onClick={() => setShowBadCode(false)}
            style={{
              padding: '12px 24px',
              backgroundColor: showBadCode ? '#f5f5f5' : '#4caf50',
              color: showBadCode ? '#333' : 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            ✓ Código Refactorizado (Buenas Prácticas)
          </button>
          <button
            onClick={() => setShowBadCode(true)}
            style={{
              padding: '12px 24px',
              backgroundColor: showBadCode ? '#d32f2f' : '#f5f5f5',
              color: showBadCode ? 'white' : '#333',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            ✗ Código con Malas Prácticas
          </button>
        </div>
      </div>

      {showBadCode ? <BadCodeExample /> : <UserSignupForm />}
    </div>
  );
}
