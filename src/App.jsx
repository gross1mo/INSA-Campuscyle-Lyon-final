// Defines which page shows at which URL.
// To add a new page: import it here and add a new <Route>.

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Marketplace from '@/pages/Marketplace';
import CreateListing from '@/pages/CreateListing';
import Login from '@/pages/Login';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Main listing page — visible to everyone */}
        <Route path="/" element={<Marketplace />} />

        {/* Create listing — redirects to /login if not logged in */}
        <Route path="/new" element={<CreateListing />} />

        {/* Login and sign up */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}