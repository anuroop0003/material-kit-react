import styled from '@emotion/styled';
import { Card, Typography, Button } from '@mui/material';

const CustomCard = styled(Card)({
  margin: '32px',
  padding: '30px',
});

export default function RequestApproval({ setStepperValue }) {
  const handleAddProducts = () => {
    setStepperValue({ stepper: 1, status: 'success' });
  };

  return (
    <>
      <CustomCard>
        <Typography marginBottom="30px" component="div" width="100%" textAlign="center" fontSize="20px">
          Approval Pending
        </Typography>
        <Typography component="p" width="100%" textAlign="center">
          Your request is being reviewed, kindly wait for approval.
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
    </>
  );
}
