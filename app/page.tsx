'use client'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import Sum from './sum/page';
import Footer from "./components/footer"; // Import the Footer component

export default function App() {
  useEffect(() => {
    const handleContextMenu = (event: MouseEvent) => {
      event.preventDefault();
    };

    const handleCopy = (event: ClipboardEvent) => {
      event.preventDefault();
    };

    const handlePaste = (event: ClipboardEvent) => {
      event.preventDefault();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.ctrlKey &&
        (event.key === "c" || event.key === "v" || event.key === "x")
      ) {
        event.preventDefault();
      }
      if (event.ctrlKey && event.shiftKey && event.key === "I") {
        event.preventDefault();
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("copy", handleCopy);
    document.addEventListener("paste", handlePaste);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("copy", handleCopy);
      document.removeEventListener("paste", handlePaste);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <Router>
      <div style={{ minHeight: '100vh', position: 'relative', paddingBottom: '60px' }}>
        <Routes>
          <Route path="/sum" element={<Sum />} />
          <Route path="/" element={<Navigate replace to="/sum" />} />
        </Routes>
        <Footer /> {/* Add the Footer component */}
      </div>
    </Router>
  );
}