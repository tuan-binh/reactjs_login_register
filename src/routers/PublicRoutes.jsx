import { Route, Routes } from 'react-router-dom';

import AccessDeniedPage from '../pages/AccessDeniedPage';
import IndexAdmin from '../pages/IndexAdmin';
import IndexUser from '../pages/IndexUser';
import LoginPage from '../pages/LoginPage';
import ManageUser from '../pages/ManageUser';
import RegisterPage from '../pages/RegisterPage';

function PublicRoutes() {
  return (
    <Routes>
      <Route path="/" element={<IndexUser />}></Route>
      <Route path="/admin" element={<IndexAdmin />}>
        <Route index element={<ManageUser />}></Route>
      </Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/register" element={<RegisterPage />}></Route>
      <Route path="/403" element={<AccessDeniedPage />}></Route>
    </Routes>
  );
}

export default PublicRoutes;
