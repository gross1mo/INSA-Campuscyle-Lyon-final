import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Marketplace from '@/pages/Marketplace';
import CreateListing from '@/pages/CreateListing';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Marketplace />} />
        <Route path="/new" element={<CreateListing />} />
      </Routes>
    </Router>
  );
}