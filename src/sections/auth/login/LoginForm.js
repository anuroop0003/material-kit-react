import { useFormik } from 'formik';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { IconButton, InputAdornment, Link, Stack, TextField } from '@mui/material';
// components
import Iconify from '../../../components/iconify';
import APIService from '../../../services/api';
import { toggleSnackbar } from '../../../stateManagement/Slices/snackbarSlice';

// ----------------------------------------------------------------------

const validationSchem = yup.object({
  email: yup.string('Enter your email').email('Enter a valid email').required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

export default function LoginForm() {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchem,
    onSubmit: (values) => {
      CallApi(values);
    },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    // navigate('/dashboard', { replace: true });
  };

  const CallApi = (values) => {
    setLoading(true);
    APIService.signIn({ email: values?.email, password: values?.password })
      .then((res) => {
        setLoading(false);
        navigate('/dashboard/app');
        localStorage.setItem('user_data', JSON.stringify(res?.data?.data));
        dispatch(
          toggleSnackbar({
            isOpen: true,
            message: res?.data?.message,
            severity: 'success',
          })
        );
      })
      .catch((err) => {
        setLoading(false);
        dispatch(
          toggleSnackbar({
            isOpen: true,
            message: err?.response?.data?.message,
            severity: 'error',
          })
        );
      });
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={3}>
          <TextField
          autoComplete="on"
            name="email"
            id="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

          <TextField
          autoComplete="on"
            name="password"
            id="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        <Stack sx={{ my: 2 }}>
          {/* <Checkbox name="remember" label="Remember me" /> */}
          <Link textAlign="right" sx={{ cursor: 'pointer' }} variant="subtitle2" underline="hover">
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton loading={loading} fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
          Login
        </LoadingButton>
      </form>
    </>
  );
}
