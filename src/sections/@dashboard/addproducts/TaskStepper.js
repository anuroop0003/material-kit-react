import { Step, StepLabel, Stepper } from '@mui/material';

// ----------------------------------------------------------------------

const steps = ['Onboard Completed', 'Create a product', 'Approval Completed'];

// ----------------------------------------------------------------------

export default function AppProducts({ activeStep }) {
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
