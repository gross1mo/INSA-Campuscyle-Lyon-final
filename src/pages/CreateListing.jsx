import React, { useState } from 'react';
import { db } from '@/api/client';

const s = {
  page: { maxWidth: 480, margin: '0 auto', padding: '24px 16px', fontFamily: 'sans-serif' },
  back: { fontSize: 13, color: '#555', textDecoration: 'none' },
  h1: { fontSize: 20, margin: '12px 0 20px', fontWeight: 'bold' },
  input: { display: 'block', width: '100%', padding: '7px 8px', marginBottom: 10, border: '1px solid #ccc', fontSize: 14, boxSizing: 'border-box', fontFamily: 'sans-serif' },
  textarea: { display: 'block', width: '100%', padding: '7px 8px', marginBottom: 10, border: '1px solid #ccc', fontSize: 14, boxSizing: 'border-box', fontFamily: 'sans-serif', height: 80, resize: 'vertical' },
  fileInput: { display: 'block', width: '100%', padding: '5px 8px', marginBottom: 10, border: '1px solid #ccc', fontSize: 14, boxSizing: 'border-box' },
  submitBtn: { background: '#000', color: '#fff', border: 'none', padding: '9px 20px', fontSize: 14, cursor: 'pointer' },
};

export default function CreateListing() {
  const [form, setForm] = useState({ title: '', description: '', building: '' });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.building) return alert('Title and location are required.');
    setLoading(true);

    let image_url = '';
    if (imageFile) {
      const res = await db.items.uploadImage(imageFile);
      image_url = res.file_url;
    }

    await db.items.create({ ...form, image_url });
    setLoading(false);
    setTimeout(() => { window.location.href = '/'; }, 500);
  };

  return (
    <div style={s.page}>
      <a href="/" style={s.back}>← Back</a>
      <h1 style={s.h1}>New Listing</h1>

      <form onSubmit={handleSubmit}>
        <input style={s.input} placeholder="Title *" value={form.title} onChange={e => set('title', e.target.value)} />
        <textarea style={s.textarea} placeholder="Description (optional)" value={form.description} onChange={e => set('description', e.target.value)} />
        <input style={s.input} placeholder="Location / Residence *" value={form.building} onChange={e => set('building', e.target.value)} />
        <input style={s.fileInput} type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])} />
        <button type="submit" disabled={loading} style={s.submitBtn}>
          {loading ? 'Publishing...' : 'Publish'}
        </button>
      </form>
    </div>
  );
}