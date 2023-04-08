import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { CreateProduct, SellerOnboarding, TaskStepper, RequestApproval } from '../sections/@dashboard/market';
import APIService from '../services/api';
import { toggleSnackbar } from '../stateManagement/Slices/snackbarSlice';
import Loader from '../components/loader/Loader';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function Market() {
  const [stepperValue, setStepperValue] = useState({ stepper: -1, status: '' });
  const dispatch = useDispatch();

  useEffect(() => {
    APIService.SellerCheck()
      .then((res) => {
        if (res?.data?.data?.status === 'pending') {
          setStepperValue({ stepper: 1, status: 'pending' });
        }
        if (res?.data?.data?.status === 'success') {
          setStepperValue({ stepper: 2, status: 'success' });
        }
        dispatch(
          toggleSnackbar({
            isOpen: true,
            message: res?.data?.message,
            severity: 'success',
          })
        );
        return null;
      })
      .catch((err) => {
        dispatch(
          toggleSnackbar({
            isOpen: true,
            message: err?.response?.data?.message,
            severity: 'error',
          })
        );
      });
  }, []);

  function ProcessStepper(stepperValue) {
    switch (true) {
      case stepperValue?.stepper === 1 && stepperValue?.status === '':
        return <SellerOnboarding status={stepperValue.status} />;
      case stepperValue?.stepper === 1 && stepperValue?.status === 'pending':
        return <RequestApproval setStepperValue={setStepperValue} />;
      case stepperValue?.stepper === 2:
        return <CreateProduct setStepperValue={setStepperValue} status={stepperValue.status} />;
      case stepperValue?.stepper === 3:
        break;
      // return <ApproveProduct setStepperValue={setStepperValue}/>;
      default:
        return <Loader />;
    }
  }

  return (
    <div>
      <TaskStepper activeStep={stepperValue?.stepper} />
      {ProcessStepper(stepperValue)}
    </div>
  );
}
