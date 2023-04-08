import styled from '@emotion/styled';
import { Card, Typography, Button } from '@mui/material';

const CustomCard = styled(Card)({
  margin: '32px',
  padding: '30px',
});

export default function ApproveProduct({ status, setStepperValue }) {
  const handleAddProducts = () => {
    setStepperValue({ stepper: 1, status: 'success' });
  };

  return (
    <>
      {status && (
        <CustomCard>
          <Typography marginBottom="30px" component="div" width="100%" textAlign="center" fontSize="20px">
            Approval Report
          </Typography>
          <Typography component="p" width="100%" textAlign="center">
            Your product is being evaluated, the current state may be found on my products page. Please browse to my
            products page by clicking the icon below or to continue adding new products.
          </Typography>
          <Typography component="p" width="100%" textAlign="center" marginTop="50px">
            <Button sx={{ marginRight: '20px' }} variant="contained">
              My Products
            </Button>
            <Button onClick={() => handleAddProducts()} sx={{ marginLeft: '20px' }} variant="contained">
              Add New Products
            </Button>
          </Typography>
        </CustomCard>
      )}
    </>
  );
}
