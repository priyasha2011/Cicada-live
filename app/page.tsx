'use client'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Sum from './sum/page';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/sum" element={<Sum />} />
        <Route path="/" element={<Navigate replace to="/sum" />} />
      </Routes>
    </Router>
  );
}