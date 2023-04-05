import styled from '@emotion/styled';
import { Card, Typography } from '@mui/material';
import CreateProductForm from './CreateProductForm';

const CustomCard = styled(Card)({
  margin: '32px',
  padding: '30px',
});

export default function CreateProduct({ status, setStepperValue }) {
  return (
    <>
      {status && (
        <CustomCard>
          <Typography marginBottom="30px" component="div" width="100%" textAlign="center" fontSize="20px">
            Create a Product
          </Typography>
          <CreateProductForm setStepperValue={setStepperValue}/>
        </CustomCard>
      )}
    </>
  );
}
