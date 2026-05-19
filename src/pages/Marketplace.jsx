import React, { useState, useEffect } from 'react';
import { db } from '@/api/client';

const s = {
  page: { maxWidth: 600, margin: '0 auto', padding: '24px 16px', fontFamily: 'sans-serif' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  h1: { margin: 0, fontSize: 20, fontWeight: 'bold' },
  newBtn: { background: '#000', color: '#fff', padding: '7px 14px', textDecoration: 'none', fontSize: 14, border: 'none', cursor: 'pointer' },
  card: { border: '1px solid #ccc', padding: 14, marginBottom: 12 },
  img: { width: '100%', height: 180, objectFit: 'cover', marginBottom: 10, display: 'block' },
  title: { fontWeight: 'bold', fontSize: 15 },
  desc: { margin: '6px 0', fontSize: 14 },
  loc: { margin: '4px 0', fontSize: 13, color: '#555' },
  actions: { marginTop: 10, display: 'flex', gap: 10 },
  contactLink: { fontSize: 13, color: '#000' },
  deleteBtn: { fontSize: 13, background: 'none', border: 'none', cursor: 'pointer', color: 'red', padding: 0 },
  empty: { color: '#888' },
};

export default function Marketplace() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    db.items.list().then(setItems);
  }, []);

  const deleteItem = async (id) => {
    if (!confirm('Delete this listing?')) return;
    await db.items.delete(id);
    setItems(items.filter(i => i.id !== id));
  };

  return (
    <div style={s.page}>
      <div style={s.header}>
        <h1 style={s.h1}>CampusCycle INSA Lyon</h1>
        <a href="/new" style={s.newBtn}>+ New</a>
      </div>

      {items.length === 0 && <p style={s.empty}>No listings yet.</p>}

      {items.map(item => (
        <div key={item.id} style={s.card}>
          {item.image_url && <img src={item.image_url} alt={item.title} style={s.img} />}
          <div style={s.title}>{item.title}</div>
          {item.description && <p style={s.desc}>{item.description}</p>}
          <p style={s.loc}>📍 {item.building}</p>
          <div style={s.actions}>
            <a href={`mailto:${item.created_by}?subject=CampusCycle: ${item.title}`} style={s.contactLink}>Contact</a>
            <button onClick={() => deleteItem(item.id)} style={s.deleteBtn}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}