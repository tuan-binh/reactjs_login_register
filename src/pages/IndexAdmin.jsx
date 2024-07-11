import { Navigate, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Navbar from '../layouts/Navbar';
import Sidebar from '../layouts/Sidebar';

function IndexAdmin() {
  const [check, setCheck] = useState(null);

  const isAdmin = () => {
    const users = JSON.parse(localStorage.getItem('users')) || null;
    console.log(users);
    if (users) {
      if (users.roles.some((item) => item === 'ROLE_ADMIN')) {
        setCheck({
          status: true,
          path: '/admin',
        });
      } else {
        setCheck({
          status: false,
          path: '/403',
        });
      }
    } else {
      setCheck({
        status: false,
        path: '/login',
      });
    }
  };

  useEffect(() => {
    isAdmin();
  }, []);

  return (
    <div className="flex h-screen">
      <div className="w-[30%] bg-red-500">
        <Sidebar />
      </div>
      <div className="flex-1">
        <Navbar />
        {console.log(check)}
        {check && (check.status ? <Outlet /> : <Navigate to={check.path} />)}
      </div>
    </div>
  );
}

export default IndexAdmin;
