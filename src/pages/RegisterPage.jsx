import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import TextField from '@mui/material/TextField';
import { formAxios } from '../api';
import { styled } from '@mui/material/styles';
import { useState } from 'react';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

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

  const [avatar, setAvatar] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formRegister.fullName !== '' && formRegister.email !== '' && formRegister.password !== '') {
      const formData = new FormData();

      formData.append('fullName', formRegister.fullName);
      formData.append('email', formRegister.email);
      formData.append('password', formRegister.password);
      formData.append('avatar', avatar);
      console.log(formData);
      formAxios
        .post('/api/v1/auth/register', formData)
        .then((resp) => console.log(resp))
        .catch((err) => console.log(err));
      // await axios
      //   .post('http://localhost:8080/api/v1/auth/register', formRegister)
      //   .then((resp) => console.log(resp))
      //   .catch((err) => setError(err.response.data));
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
        <Button component="label" role={undefined} variant="contained" tabIndex={-1} startIcon={<CloudUploadIcon />}>
          Upload file
          <VisuallyHiddenInput type="file" onChange={(e) => setAvatar(e.target.files[0])} />
        </Button>
        <Button type="submit" variant="contained">
          Sign Up
        </Button>
      </form>
    </div>
  );
}

export default RegisterPage;
