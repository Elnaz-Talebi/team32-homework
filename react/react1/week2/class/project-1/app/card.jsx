'use client';

export default function Card({ title, description, imageUrl }) {
  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '16px',
      maxWidth: '300px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <img
        src={imageUrl}
        alt={title}
        style={{ width: '100%', borderRadius: '4px' }}
      />
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}
