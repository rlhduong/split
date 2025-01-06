import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { setLogin } from './store/loggedin';
import { RequestHelper } from './utilities/helper';
import { useEffect } from 'react';

import LandingPage from './screens/Home/LandingPage';
import Dashboard from './screens/Dashboard/Dashboard';

const request = new RequestHelper();

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
