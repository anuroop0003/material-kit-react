import { Step, StepLabel, Stepper } from '@mui/material';

// ----------------------------------------------------------------------

const steps = ['Onboard Completed', 'Create a product', 'Approval'];

// ----------------------------------------------------------------------

export default function TaskStepper({ activeStep }) {
  console.log(activeStep);
  return (
    // <div>AppProducts</div>
    <Stepper activeStep={activeStep} alternativeLabel>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}
