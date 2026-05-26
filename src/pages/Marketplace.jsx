import React, { useState, useEffect } from 'react';
import { db, supabase } from '@/api/client';

const CATEGORIES = ['All', 'Kitchen', 'Bathroom', 'Bedroom & Living Room', 'Furniture', 'Electronics', 'Study & Books', 'Plants', 'Clothing & Shoes', 'Other', 'My Listings'];

const s = {
  page: { maxWidth: 600, margin: '0 auto', padding: '24px 16px', fontFamily: 'sans-serif' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  h1: { margin: 0, fontSize: 20, fontWeight: 'bold' },
  newBtn: { background: '#000', color: '#fff', padding: '7px 14px', textDecoration: 'none', fontSize: 14, border: 'none', cursor: 'pointer' },
  filters: { display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 },
  filterBtn: { padding: '5px 12px', fontSize: 13, border: '1px solid #ccc', background: '#fff', cursor: 'pointer', borderRadius: 20 },
  filterBtnActive: { padding: '5px 12px', fontSize: 13, border: '1px solid #000', background: '#000', color: '#fff', cursor: 'pointer', borderRadius: 20 },
  card: { border: '1px solid #ccc', padding: 14, marginBottom: 12 },
  img: { width: '100%', height: 180, objectFit: 'cover', marginBottom: 10, display: 'block' },
  title: { fontWeight: 'bold', fontSize: 15 },
  desc: { margin: '6px 0', fontSize: 14 },
  loc: { margin: '4px 0', fontSize: 13, color: '#555' },
  cat: { margin: '4px 0', fontSize: 12, color: '#888' },
  actions: { marginTop: 10, display: 'flex', gap: 10 },
  contactLink: { fontSize: 13, color: '#000' },
  deleteBtn: { fontSize: 13, background: 'none', border: 'none', cursor: 'pointer', color: 'red', padding: 0 },
  empty: { color: '#888' },
};

export default function Marketplace() {
  const [items, setItems] = useState([]);
  const [user, setUser] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    db.items.list().then(data => setItems(data || []));
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/login';
  };

  const deleteItem = async (id) => {
    if (!confirm('Delete this listing?')) return;
    await db.items.delete(id);
    setItems(items.filter(i => i.id !== id));
  };

  // Filtert die Artikel je nach aktivem Filter
  const filteredItems = items.filter(item => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'My Listings') return item.created_by === user?.email;
    return item.category === activeFilter;
  });

  return (
    <div style={s.page}>
      <div style={s.header}>
        <h1 style={s.h1}>CampusCycle INSA Lyon</h1>
        <div style={{ display: 'flex', gap: 10 }}>
          {user && <a href="/new" style={s.newBtn}>+ New</a>}
          {user
            ? <button onClick={handleLogout} style={{ ...s.newBtn, background: '#555' }}>Logout</button>
            : <a href="/login" style={s.newBtn}>Login</a>
          }
        </div>
      </div>

      {/* Filter-Buttons */}
      <div style={s.filters}>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            style={activeFilter === cat ? s.filterBtnActive : s.filterBtn}
          >
            {cat}
          </button>
        ))}
      </div>

      {filteredItems.length === 0 && <p style={s.empty}>No listings yet.</p>}

      {filteredItems.map(item => (
        <div key={item.id} style={s.card}>
          {item.image_url && <img src={item.image_url} alt={item.title} style={s.img} />}
          <div style={s.title}>{item.title}</div>
          {item.category && <p style={s.cat}>📦 {item.category}</p>}
          {item.description && <p style={s.desc}>{item.description}</p>}
          <p style={s.loc}>📍 {item.building}</p>
          <div style={s.actions}>
            <a href={`mailto:${item.created_by}?subject=CampusCycle: ${item.title}`} style={s.contactLink}>Contact</a>
            {user && item.created_by === user.email &&
              <button onClick={() => deleteItem(item.id)} style={s.deleteBtn}>Delete</button>
            }
          </div>
        </div>
      ))}
    </div>
  );
}