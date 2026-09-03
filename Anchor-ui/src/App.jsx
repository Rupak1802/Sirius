import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Earnings from './pages/Earnings';
import MoneyPlan from './pages/MoneyPlan';
import Savings from './pages/Savings';
import FinancialWeather from './pages/FinancialWeather';
import WhatIf from './pages/WhatIf';
import Emergency from './pages/Emergency';
import Insights from './pages/Insights';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/earnings" element={<Earnings />} />
          <Route path="/plan" element={<MoneyPlan />} />
          <Route path="/savings" element={<Savings />} />
          <Route path="/weather" element={<FinancialWeather />} />
          <Route path="/whatif" element={<WhatIf />} />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/insights" element={<Insights />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
