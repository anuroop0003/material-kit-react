import { useEffect, useState } from 'react';
import { CreateProduct, SellerOnboarding, TaskStepper, ApproveProduct } from '../sections/@dashboard/addproducts';
import APIService from '../services/api';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function AppProducts() {
  const [stepperValue, setStepperValue] = useState({ stepper: -1, status: '' });

  useEffect(() => {
    APIService.SellerCheck().then((res) => {
      if (res?.data?.data?.status === 'pending') {
        setStepperValue({ stepper: -1, status: 'pending' });
      }
      if (res?.data?.data?.status === 'success') {
        setStepperValue({ stepper: 1, status: 'success' });
      }
      return null;
    });
  }, []);

  return (
    <div>
      <TaskStepper activeStep={stepperValue?.stepper} />
      {stepperValue?.stepper === -1 && (
        <SellerOnboarding status={stepperValue.status} />
      )}
      {stepperValue?.stepper === 1 && (
        <CreateProduct setStepperValue={setStepperValue} status={stepperValue.status} />
      )}
            {stepperValue?.stepper === 3 && (
        <ApproveProduct setStepperValue={setStepperValue} status={stepperValue.status} />
      )}
    </div>
  );
}
