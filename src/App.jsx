import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Marketplace from '@/pages/Marketplace';
import CreateListing from '@/pages/CreateListing';
import Login from '@/pages/Login';          // ← NEU

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Marketplace />} />
        <Route path="/new" element={<CreateListing />} />
        <Route path="/login" element={<Login />} />   {/* ← NEU */}
      </Routes>
    </Router>
  );
}