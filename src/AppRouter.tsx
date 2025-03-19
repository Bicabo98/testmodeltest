import { Navigate, Route, BrowserRouter as Router, Routes, useLocation } from 'react-router';

import History from './pages/History';
import { MobileNavBar } from './components/layout/MobileNavBar';

import Home from '@/pages/Home/Home';
import Profile from '@/pages/Profile/Profile';
// import Header from '@/components/Header/Header';
import { Toaster } from '@/components/ui/sonner';
import GetStarted from '@/pages/Started';
import SignUp from '@/pages/Signup';

function AppRouter() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation()
  const withoutLoginPage = ['/', '/signup', '/login']
  return (
    <>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<GetStarted />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/portal" element={<Home />} />
        <Route path="/model" element={<Profile />} />
        <Route path="/market" element={<History />} />
        <Route path="/dao" element={<History />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster position="top-right" />
      {
        !withoutLoginPage.includes(location.pathname) && <MobileNavBar />
      }
    </>
  );
}

export default AppRouter;
