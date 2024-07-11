import Button from '@mui/material/Button';
import { Cookies } from 'react-cookie';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function LoginPage() {
  const navigate = useNavigate();

  const [error, setError] = useState({
    email: '',
    password: '',
  });

  const [formLogin, setFormLogin] = useState({
    email: '',
    password: '',
  });

  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setFormLogin({
      ...formLogin,
      [name]: value,
    });
    if (value === '') {
      setError({ ...error, [name]: name + ' must be not empty' });
    } else {
      setError({ ...error, [name]: '' });
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (formLogin.email !== '' && formLogin.password !== '') {
      await axios
        .post('http://localhost:8080/api/v1/auth/login', formLogin)
        .then((resp) => {
          // khi đăng nhập xong
          const users = resp.data;
          const cookie = new Cookies();
          cookie.set('accessToken', users.accessToken, {
            maxAge: 1 * 60 * 1000,
          });
          cookie.set('type', users.type, { maxAge: 1 * 60 * 1000 });
          localStorage.setItem('users', JSON.stringify(users));

          // điều hướng trang admin
          if (users.roles.some((item) => item === 'ROLE_ADMIN')) {
            navigate('/admin');
          } else {
            navigate('/');
          }
        })
        .catch((err) => setError(err.response.data));
    } else {
      if (formLogin.email === '') {
        setError((prev) => ({ ...prev, email: 'email must be not empty' }));
      }
      if (formLogin.password === '') {
        setError((prev) => ({
          ...prev,
          password: 'password must be not empty',
        }));
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form action="" onSubmit={handleLogin} className="flex flex-col gap-[15px] w-[400px]">
        <TextField
          error={error.email}
          onChange={handleChangeForm}
          size="small"
          name="email"
          label={error.email ? error.email : 'Email'}
          variant="outlined"
        />
        <TextField
          error={error.password}
          onChange={handleChangeForm}
          size="small"
          name="password"
          label={error.password ? error.password : 'Password'}
          variant="outlined"
        />
        <Button type="submit" variant="contained">
          Sign In
        </Button>
      </form>
    </div>
  );
}

export default LoginPage;
