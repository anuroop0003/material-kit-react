import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { CreateProduct, SellerOnboarding, TaskStepper, RequestApproval } from '../sections/@dashboard/market';
import APIService from '../services/api';
import { toggleSnackbar } from '../stateManagement/Slices/snackbarSlice';
import Loader from '../components/loader/Loader';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function Market() {
  const [stepperValue, setStepperValue] = useState({ stepper: "", status: '' });
  const dispatch = useDispatch();

  useEffect(() => {
    APIService.SellerCheck()
      .then((res) => {
        if (res?.data?.data?.status === 'pending' && res?.data?.data?.isOnboarded === true) {
          setStepperValue({ stepper: 1, status: 'pending' });
        }
        if (res?.data?.data?.status === 'success' && res?.data?.data?.isOnboarded === true) {
          setStepperValue({ stepper: 2, status: 'success' });
        }
        if (res?.data?.data?.status === 'reject' && res?.data?.data?.isOnboarded === true) {
          setStepperValue({ stepper: 2, status: 'success' , description: res?.data?.data?.description});
        }
        // dispatch(
        //   toggleSnackbar({
        //     isOpen: true,
        //     message: res?.data?.message,
        //     severity: 'success',
        //   })
        // );
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
      case stepperValue?.stepper === -1:
        return <SellerOnboarding setStepperValue={setStepperValue} />;
      case stepperValue?.stepper === 1:
        return <RequestApproval setStepperValue={setStepperValue} />;
      case stepperValue?.stepper === 2:
        return <CreateProduct setStepperValue={setStepperValue} status={stepperValue.status} />;
      case stepperValue?.stepper === 3:
        break;
      default:
        return <Loader left="140px" right={0} />;
    }
  }

  return (
    <div>
      <TaskStepper activeStep={stepperValue?.stepper} />
      {ProcessStepper(stepperValue)}
    </div>
  );
}
