import styled from '@emotion/styled';
import { Card, Typography } from '@mui/material';
import AddProductsForm from './AddProductsForm';

const CustomCard = styled(Card)({
  margin: '32px',
  padding: '30px',
});

export default function SellerOnboarding({ status }) {
  return (
    <>
      {/* {status && (
        <CustomCard>
          <Typography marginBottom="30px" component="div" width="100%" textAlign="center" fontSize="20px">
            Seller Onboarding
          </Typography>
          <AddProductsForm />
        </CustomCard>
      )} */}
      <CustomCard>
        <Typography marginBottom="30px" component="div" width="100%" textAlign="center" fontSize="20px">
          Onboarding Initiated
        </Typography>
        <AddProductsForm />
      </CustomCard>
    </>
  );
}
