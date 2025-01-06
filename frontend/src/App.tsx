import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './screens/Home/LandingPage';
import { useDispatch } from 'react-redux';
import { setLogin } from './store/loggedin';
import { RequestHelper } from './utilities/helper';
import { useEffect } from 'react';

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
