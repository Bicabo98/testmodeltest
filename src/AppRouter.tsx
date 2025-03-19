import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router';

import History from './pages/History';
import { MobileNavBar } from './components/layout/MobileNavBar';

import Home from '@/pages/Home/Home';
import Profile from '@/pages/Profile/Profile';
import Header from '@/components/Header/Header';
import { Toaster } from '@/components/ui/sonner';

function AppRouter() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portal" element={<Home />} />
        <Route path="/model" element={<Profile />} />
        <Route path="/market" element={<History />} />
        <Route path="/dao" element={<History />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster position="top-right" />
      <MobileNavBar />
    </Router>
  );
}

export default AppRouter;
