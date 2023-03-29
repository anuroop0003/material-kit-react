import styled from '@emotion/styled';
import { Card, Typography } from '@mui/material';
import { useState } from 'react';
import { AddProductsForm, TaskStepper } from '../sections/@dashboard/addproducts';

// ----------------------------------------------------------------------

const steps = ['Onboard Completed', 'Create a product', 'Approval Completed'];

const CustomCard = styled(Card)({
  margin: '32px',
  padding: '30px',
});

// ----------------------------------------------------------------------

export default function AppProducts() {
  const [stepperValue, setStepperValue] = useState(-1);

  return (
    <div>
      <TaskStepper activeStep={stepperValue} />
      <CustomCard>
        <Typography marginBottom="30px" component="div" width="100%" textAlign="center" fontSize="20px">
          Seller Onboarding
        </Typography>
        <AddProductsForm setStepperValue={setStepperValue} />
      </CustomCard>
    </div>
  );
}
