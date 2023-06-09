import { useDispatch, useSelector } from 'react-redux';

import { useFormik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { IconButton, InputAdornment, MenuItem, Stack, TextField } from '@mui/material';
// components
import Iconify from '../../../components/iconify';
import APIService from '../../../services/api';
import { toggleSnackbar } from '../../../stateManagement/Slices/snackbarSlice';

// ----------------------------------------------------------------------

const validationSchem = yup.object({
  name: yup.string('Enter your name').required('Name is required'),
  gender: yup.string('Select gender').required('Gender is required'),
  usertype: yup.string('Select user type').required('User type is required'),
  mobile: yup
    .string('Enter your mobile number')
    .length(10, 'Mobile number should be 10 digit')
    .required('Mobile number is required'),
  email: yup.string('Enter your email').email('Enter a valid email').required('Email is required'),
  setpassword: yup
    .string('Enter set password')
    .min(8, 'Set password should be of minimum 8 characters length')
    .required('Set password is required'),
  confirmpassword: yup
    .string('Enter confirm password')
    .oneOf([yup.ref('setpassword'), null], 'The specified password does not match')
    .min(8, 'Set password should be of minimum 8 characters length')
    .required('Confirm password is required'),
});

const options = [
  { id: 'admin', name: 'Administrator' },
  { id: 'buyer', name: 'Buyer' },
  { id: 'seller', name: 'Seller' },
];

const genderOptions = [
  { id: 'm', name: 'Male' },
  { id: 'f', name: 'Female' },
];

export default function LoginForm() {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      mobile: '',
      usertype: '',
      setpassword: '',
      confirmpassword: '',
      gender: '',
    },
    validationSchema: validationSchem,
    onSubmit: (values) => {
      CallApi(values);
    },
  });

  const dispatch = useDispatch();
  const { showSnackbar } = useSelector((state) => state);
  console.log('showSnackbar', showSnackbar);
  const navigate = useNavigate();

  const [showsetpassword, setShowsetpassword] = useState(false);
  const [showconfirmpassword, setShowconfirmpassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    // navigate('/dashboard', { replace: true });
  };

  const CallApi = (values) => {
    setLoading(true);
    APIService.signUp({
      name: values?.name,
      email: values?.email,
      password: values?.confirmpassword,
      usertype: values?.usertype,
      mobile: values?.mobile,
      gender: values?.gender,
    })
      .then((res) => {
        console.log('res?.data?.message', res?.data?.message);
        setLoading(false);
        dispatch(
          toggleSnackbar({
            isOpen: true,
            message: res?.data?.message,
            severity: 'success',
          })
        );
        navigate('/');
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
            name="name"
            id="name"
            label="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />

          <TextField
            select
            name="gender"
            id="gender"
            label="Gender"
            value={formik.values.gender}
            onChange={formik.handleChange}
            error={formik.touched.gender && Boolean(formik.errors.gender)}
            helperText={formik.touched.gender && formik.errors.gender}
          >
            {genderOptions.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            name="email"
            id="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

          <TextField
            name="mobile"
            id="mobile"
            label="Mobile"
            value={formik.values.mobile}
            onChange={formik.handleChange}
            error={formik.touched.mobile && Boolean(formik.errors.mobile)}
            helperText={formik.touched.mobile && formik.errors.mobile}
          />

          <TextField
            select
            name="usertype"
            id="usertype"
            label="User Type"
            value={formik.values.usertype}
            onChange={formik.handleChange}
            error={formik.touched.usertype && Boolean(formik.errors.usertype)}
            helperText={formik.touched.usertype && formik.errors.usertype}
          >
            {/* <MenuItem key={""} value={""}>
                            No Selected
                        </MenuItem> */}
            {options.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            name="setpassword"
            id="setpassword"
            label="Set Password"
            type={showsetpassword ? 'text' : 'password'}
            value={formik.values.setpassword}
            onChange={formik.handleChange}
            error={formik.touched.setpassword && Boolean(formik.errors.setpassword)}
            helperText={formik.touched.setpassword && formik.errors.setpassword}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowsetpassword(!showsetpassword)} edge="end">
                    <Iconify icon={showsetpassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            name="confirmpassword"
            id="confirmpassword"
            label="Confirm Password"
            type={showconfirmpassword ? 'text' : 'password'}
            value={formik.values.confirmpassword}
            onChange={formik.handleChange}
            error={formik.touched.confirmpassword && Boolean(formik.errors.confirmpassword)}
            helperText={formik.touched.confirmpassword && formik.errors.confirmpassword}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowconfirmpassword(!showconfirmpassword)} edge="end">
                    <Iconify icon={showconfirmpassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        {/* <Stack sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link textAlign="right" sx={{cursor:"pointer"}} variant="subtitle2" underline="hover">
          Forgot setpassword?
        </Link>
      </Stack> */}

        <LoadingButton
          loading={loading}
          sx={{ my: 4 }}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          onClick={handleClick}
        >
          Sign Up
        </LoadingButton>
      </form>
    </>
  );
}
