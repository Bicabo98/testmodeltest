import { Navigate, Route, BrowserRouter as Router, Routes, useLocation } from 'react-router';

import { MobileNavBar } from './components/layout/MobileNavBar';
import LoginV2Page from './pages/Signup/LoginV2';

import Market from '@/pages/Market';
import Home from '@/pages/Home/Home';
import Model from '@/pages/Model';
import Dao from '@/pages/Dao';
// import Header from '@/components/Header/Header';
import { Toaster } from '@/components/ui/sonner';
import GetStarted from '@/pages/Started';
import CreateModelPage from './pages/CreateModel';
import CreateModelFormPage from './pages/CreateModel/ModelForm';
// import SignUp from '@/pages/Signup';
import ChatPage from '@/pages/Model/chat';

function AppRouter() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation()
  // const withoutLoginPage = ['/', '/signup', '/login', '/chat']
  const withoutLoginPage = ['/', '/signup', '/login', '/createModel', '/createModelForm']
  return (
    <>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<GetStarted />} />
        {/* <Route path="/signup" element={<SignUp />} /> */}
        <Route path="/signup" element={<LoginV2Page />} />
        <Route path="/login" element={<LoginV2Page />} />

        <Route path="/portal" element={<Home />} />
        <Route path="/model" element={<Model />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/market" element={<Market />} />
        <Route path="/dao" element={<Dao />} />
        <Route path="/createModel" element={<CreateModelPage />} />
        <Route path="/createModelForm" element={<CreateModelFormPage />} />


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
