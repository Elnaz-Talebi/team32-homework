'use client';

export default function Layout({ children }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      fontFamily: 'sans-serif'
    }}>
      <header style={{
        background: '#333',
        color: '#fff',
        padding: '1rem',
        textAlign: 'center'
      }}>
        <h1>My App Header</h1>
      </header>

      <main style={{ flex: 1, padding: '2rem' }}>
        {children}
      </main>

      <footer style={{
        background: '#333',
        color: '#fff',
        padding: '1rem',
        textAlign: 'center'
      }}>
        <p>© 2025 My Homework App</p>
      </footer>
    </div>
  );
}
