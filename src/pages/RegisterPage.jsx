import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useState } from 'react';

function RegisterPage() {
  const [formRegister, setFormRegister] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setFormRegister({ ...formRegister, [name]: value });
    if (value !== '') {
      setError({ ...error, [name]: '' });
    } else {
      setError({ ...error, [name]: name + ' must be not empty' });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formRegister.fullName !== '' && formRegister.email !== '' && formRegister.password !== '') {
      await axios
        .post('http://localhost:8080/api/v1/auth/register', formRegister)
        .then((resp) => console.log(resp))
        .catch((err) => setError(err.response.data));
    } else {
      if (!formRegister.fullName) {
        console.log('có vào fullName');
        setError((prev) => ({ ...prev, fullName: 'fullName must be not empty' }));
      }
      if (!formRegister.email) {
        setError((prev) => ({ ...prev, email: 'email must be not empty' }));
      }
      if (!formRegister.password) {
        setError((prev) => ({ ...prev, password: 'password must be not empty' }));
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {console.log(error)}
      <form action="" onSubmit={handleRegister} className="flex flex-col gap-[15px] w-[400px]">
        <TextField
          error={error.fullName}
          onChange={handleChangeForm}
          size="small"
          name="fullName"
          label={error.fullName ? error.fullName : 'FullName'}
          variant="outlined"
        />
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
          Sign Up
        </Button>
      </form>
    </div>
  );
}

export default RegisterPage;
