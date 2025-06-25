import { Routes, Route ,Navigate} from 'react-router-dom';

import Navbar from './components/Navbar';
import {Toaster} from 'react-hot-toast';

import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';
import ProfilePage from './pages/ProfilePage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage'; 
import { useAuthStore } from './store/useAuthStore';
import { useEffect } from 'react';
import { Loader } from 'lucide-react';

const App = () => {
  const {authUser,checkAuth,ischeckingAuth}=useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (ischeckingAuth && !authUser) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin size-12" />
      </div>
    );
  }
  console.log(authUser);
  return (
    <div>
      <Navbar />
      <Toaster position="top-right" reverseOrder={false} />
      
      {/* Main content */}
      <Routes>
        <Route path="/" element={authUser?<HomePage />:<Navigate to='/login' />} />
        <Route path="/signup" element={!authUser?<SignUpPage />:<Navigate to='/'/>} />
        <Route path="/login" element={!authUser?<LoginPage />:<Navigate to='/'/>} />
        <Route path="/setting" element={<SettingsPage />} />
        <Route path="/profile" element={authUser?<ProfilePage />:<Navigate to='/login'/>} />
      </Routes>
    </div>
  );
};

export default App;
