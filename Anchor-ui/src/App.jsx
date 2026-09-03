import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Earnings from './pages/Earnings';
import MoneyPlan from './pages/MoneyPlan';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/earnings" element={<Earnings />} />
          <Route path="/plan" element={<MoneyPlan />} />
          {/* Add more routes here as needed for the hackathon demo */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
