import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MachinePage from './componets/MachinePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/SPI" />} />
        <Route path="/:machineType" element={<MachinePage />} />
      </Routes>
    </Router>
  );
}

export default App;