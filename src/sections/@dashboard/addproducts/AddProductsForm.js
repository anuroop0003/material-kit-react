import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Grid, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import APIService from '../../../services/api';
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const validationSchem = yup.object({
  companyname: yup.string('Enter company name').required('Company name is required'),
  regno: yup.string('Enter your company reg no').required('Company reg no is required'),
  gstno: yup.string('Enter your company GST no').required('Company GST no is required'),
  address: yup.string('Enter your company address').required('Company address is required'),
  pincode: yup.string('Enter your company pin code').required('Company pin code is required'),
});

export default function AddProductsForm({ setStepperValue }) {
  const formik = useFormik({
    initialValues: {
      companyname: '',
      regno: '',
      gstno: '',
      address: '',
      pincode: '',
    },
    validationSchema: validationSchem,
    onSubmit: (values) => {
      CallApi(values);
    },
  });

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const CallApi = (values) => {
    console.log(values);
    setLoading(true);
    APIService.signIn({ email: values?.email, password: values?.password })
      .then((res) => {
        setLoading(false);
        navigate('/dashboard');
        console.log(res?.data);
        localStorage.setItem('user_data', JSON.stringify(res?.data?.data));
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        {/* <Stack display="flex" flexDirection="row" gap="50px" > */}
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              name="companyname"
              id="companyname"
              label="Company Name"
              value={formik.values.companyname}
              onChange={formik.handleChange}
              error={formik.touched.companyname && Boolean(formik.errors.companyname)}
              helperText={formik.touched.companyname && formik.errors.companyname}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              name="regno"
              id="regno"
              label="Comapany Reg No"
              value={formik.values.regno}
              onChange={formik.handleChange}
              error={formik.touched.regno && Boolean(formik.errors.regno)}
              helperText={formik.touched.regno && formik.errors.regno}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              name="gstno"
              id="gstno"
              label="GST No"
              value={formik.values.gstno}
              onChange={formik.handleChange}
              error={formik.touched.gstno && Boolean(formik.errors.gstno)}
              helperText={formik.touched.gstno && formik.errors.gstno}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              name="pincode"
              id="pincode"
              label="Pin Code"
              value={formik.values.pincode}
              onChange={formik.handleChange}
              error={formik.touched.pincode && Boolean(formik.errors.pincode)}
              helperText={formik.touched.pincode && formik.errors.pincode}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              multiline
              rows={4}
              name="address"
              id="address"
              label="Company Address"
              value={formik.values.address}
              onChange={formik.handleChange}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
            />
          </Grid>
        </Grid>

        <Typography component="div" display="flex" justifyContent="center">
          <LoadingButton
            sx={{ mt: 5, maxWidth: '300px' }}
            loading={loading}
            fullWidth
            size="large"
            type="submit"
            variant="contained"
          >
            Login
          </LoadingButton>
        </Typography>
      </form>
    </>
  );
}
