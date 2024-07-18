import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';

const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return token !== null; // Verifica se o token está presente
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={isAuthenticated() ? <DashboardPage /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
