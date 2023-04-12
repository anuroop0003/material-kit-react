import { useFormik } from 'formik';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
// @mui
import styled from '@emotion/styled';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import { LoadingButton } from '@mui/lab';
import { Badge, Button, Grid, IconButton, MenuItem, TextField, Typography, useMediaQuery } from '@mui/material';
// components
import APIService from '../../../services/api';
import CreateProductsPreview from './CreateProductsPreview';

// ----------------------------------------------------------------------

const ImageList = styled(Typography)({
  display: 'flex',
  border: '1px solid #e0e0e0',
  borderRadius: '6px',
  padding: '0 10px',
  alignItems: 'center',
  color: '#212B36',
});

const options = [
  { id: 'phone', name: 'Phone' },
  { id: 'laptops', name: 'Laptop' },
  { id: 'watch', name: 'Watch' },
];

export default function CreateProductForm({ setStepperValue }) {
  const hiddenFileInput = useRef(null);

  const validationSchem = yup.object({
    productname: yup.string('Enter product name').required('Product name is required'),
    category: yup.string('Enter your company reg no').required('Company reg no is required'),
    price: yup.number('Enter product price').required('Product price is required'),
    minprice: yup.number('Enter product min price').required('Min price is required'),
    maxprice: yup.number('Enter product max price').required('Max price is required'),
    description: yup.string('Enter product description').required('Description is required'),
    file: yup.mixed().required('Image is required'),
  });

  const formik = useFormik({
    initialValues: {
      productname: '',
      description: '',
      category: '',
      minprice: '',
      price: '',
      maxprice: '',
      file: '',
    },
    validationSchema: validationSchem,
    onSubmit: (values) => {
      if (images.length === 0) {
        formik.setFieldValue('file', '');
      }
      CallApi(values);
    },
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [imageView, setImageView] = useState(null);
  const [open, setOpen] = useState(false);

  const CallApi = (values) => {
    setLoading(true);
    APIService.AddProducts({
      productname: values?.productname,
      category: values?.category,
      description: values?.description,
      minprice: parseInt(values?.minprice, 10),
      price: parseInt(values?.price, 10),
      maxprice: parseInt(values?.maxprice, 10),
      file: images,
    })
      .then((res) => {
        setLoading(false);
        setStepperValue({ stepper: 3, status: 'success' });
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const matches = useMediaQuery('(max-width:600px)');

  const handleFileChange = (event) => {
    const reader = new FileReader();
    const fileUploaded = event?.target?.files[0];

    reader.readAsDataURL(fileUploaded);
    reader.onload = function () {
      setImages((prev) => [
        ...prev,
        {
          name: fileUploaded?.name,
          base64: reader.result,
          size: fileUploaded?.size,
          filetype: fileUploaded?.type,
        },
      ]);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  };

  const handleClick = (e) => {
    hiddenFileInput?.current?.click();
  };

  const handleImageDelete = (id) => {
    const newData = [...images.slice(0, id), ...images.slice(id + 1)];
    hiddenFileInput.current.value = null;
    setImages(newData);
  };

  const handleImageView = (id) => {
    setOpen(true);
    setImageView(images[id]);
  };

  const handleImageOnChange = (event) => {
    handleFileChange(event);
    formik.handleChange(event);
  };

  function ImageChecker(image) {
    if (images.length === 0) {
      formik.setFieldValue('file', '');
    }
    if (image.size <= 1000000) {
      if (image.filetype === 'image/png' && 'image/jpeg') {
        return <CheckCircleRoundedIcon sx={{ color: 'green' }} />;
      }
      return <CancelRoundedIcon sx={{ color: 'red' }} />;
    }
  }

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              name="productname"
              id="productname"
              label="Product Name"
              value={formik?.values?.productname}
              onChange={formik.handleChange}
              error={formik.touched.productname && Boolean(formik.errors.productname)}
              helperText={formik.touched.productname && formik.errors.productname}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              select
              name="category"
              id="category"
              label="Category"
              value={formik.values.category}
              onChange={formik.handleChange}
              error={formik.touched.category && Boolean(formik.errors.category)}
              helperText={formik.touched.category && formik.errors.category}
            >
              {options.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              multiline
              rows={4}
              name="description"
              id="description"
              label="Description"
              value={formik.values.description}
              onChange={formik.handleChange}
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
            />
          </Grid>
          <Grid
            item
            sm={12}
            xs={12}
            md={6}
            sx={
              matches
                ? { display: 'flex', flexDirection: 'column', gap: '16px' }
                : { display: 'flex', flexDirection: 'row', gap: '50px' }
            }
          >
            <TextField
              fullWidth
              name="price"
              id="price"
              label="Price"
              value={formik.values.price}
              onChange={formik.handleChange}
              error={formik.touched.price && Boolean(formik.errors.price)}
              helperText={formik.touched.price && formik.errors.price}
            />
            <TextField
              fullWidth
              name="minprice"
              id="minprice"
              label="Min Price"
              value={formik.values.minprice}
              onChange={formik.handleChange}
              error={formik.touched.minprice && Boolean(formik.errors.minprice)}
              helperText={formik.touched.minprice && formik.errors.minprice}
            />
            <TextField
              fullWidth
              name="maxprice"
              id="maxprice"
              label="Max Price"
              value={formik.values.maxprice}
              onChange={formik.handleChange}
              error={formik.touched.maxprice && Boolean(formik.errors.maxprice)}
              helperText={formik.touched.maxprice && formik.errors.maxprice}
            />
          </Grid>
          <Grid marginTop="30px" item sm={12} xs={12} md={6} position="relative">
            {images.map((item, i) => (
              <ImageList component="div" key={i}>
                <Typography width="100%" variant="subtitle2" component="p">
                  {item?.name}
                </Typography>
                <IconButton
                  sx={{ marginRight: '50px' }}
                  onClick={() => handleImageView(i)}
                  color="secondary"
                  aria-label="add an alarm"
                >
                  {ImageChecker(item)}
                </IconButton>
                <IconButton onClick={() => handleImageView(i)} color="secondary" aria-label="add an alarm">
                  <VisibilityRoundedIcon />
                </IconButton>
                <IconButton onClick={() => handleImageDelete(i)} color="secondary" aria-label="add an alarm">
                  <DeleteIcon />
                </IconButton>
              </ImageList>
            ))}
            <input
              ref={hiddenFileInput}
              onChange={handleImageOnChange}
              hidden
              accept="image/*"
              multiple
              type="file"
              name="file"
            />
            {formik.touched.file && formik.errors.file && (
              <div
                name="file"
                style={{
                  fontSize: '12px',
                  color: '#FF4842',
                  fontFamily: 'Public Sans, sans-serif',
                  position: 'absolute',
                  bottom: '-30px',
                  margin: '3px 14px',
                }}
              >
                {formik.errors.file}
              </div>
            )}
            <Badge sx={{ marginTop: '30px' }} color="error" badgeContent={images.length}>
              <Button type="submit" onClick={handleClick} variant="contained" component="label">
                Upload Image
              </Button>
            </Badge>
          </Grid>
        </Grid>

        <Typography component="div" display="flex" justifyContent="center" gap="20px">
          <LoadingButton
            sx={{ mt: 5, maxWidth: '180px' }}
            loading={loading}
            fullWidth
            size="large"
            type="submit"
            variant="contained"
          >
            Create Product
          </LoadingButton>
        </Typography>
      </form>
      <CreateProductsPreview open={open} setOpen={setOpen} image={imageView} />
    </>
  );
}
