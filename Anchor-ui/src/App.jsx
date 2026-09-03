import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Earnings from './pages/Earnings';
import MoneyPlan from './pages/MoneyPlan';
import Savings from './pages/Savings';
import FinancialWeather from './pages/FinancialWeather';
import WhatIf from './pages/WhatIf';
import Emergency from './pages/Emergency';
import Insights from './pages/Insights';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Growth from './pages/Growth';
import Report from './pages/Report';
import Profile from './pages/Profile';
import Platforms from './pages/Platforms';
import BudgetManager from './pages/BudgetManager';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <LanguageProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
                <Route path="/" element={<Home />} />
                <Route path="/earnings" element={<Earnings />} />
                <Route path="/plan" element={<MoneyPlan />} />
                <Route path="/budget-manager" element={<BudgetManager />} />
                <Route path="/savings" element={<Savings />} />
                <Route path="/weather" element={<FinancialWeather />} />
                <Route path="/whatif" element={<WhatIf />} />
                <Route path="/emergency" element={<Emergency />} />
                <Route path="/insights" element={<Insights />} />
                <Route path="/growth" element={<Growth />} />
                <Route path="/report" element={<Report />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/platforms" element={<Platforms />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </LanguageProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
