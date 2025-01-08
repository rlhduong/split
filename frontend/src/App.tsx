import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLogin } from './store/loggedin';
import { request } from './utilities/helper';
import { useEffect } from 'react';

import LandingPage from './pages/Home/LandingPage';
import Dashboard from './pages/Dashboard/Dashboard';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const checkSession = async () => {
      const res = await request.get('/admin/auth/status');
      if (res.status === 200) {
        dispatch(setLogin());
      }
    };

    checkSession();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
