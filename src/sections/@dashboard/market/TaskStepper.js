import { Step, StepLabel, Stepper } from '@mui/material';

// ----------------------------------------------------------------------

const steps = ['Onboard Completed', 'Market'];

// ----------------------------------------------------------------------

export default function TaskStepper({ activeStep }) {
  return (
    <Stepper activeStep={activeStep} alternativeLabel>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}
