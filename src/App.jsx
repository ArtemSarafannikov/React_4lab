import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import TodoPage from './pages/TodoPage';
import DndPage from './pages/DndPage';
function App() {
  return (
  <Router>
    <Routes>
      <Route path="/" element={<TodoPage />} />
      <Route path="/dnd" element={<DndPage />} />
    </Routes>
  </Router>
  );
}
export default App;

