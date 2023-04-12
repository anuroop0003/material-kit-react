import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

export default function Loader({left, right}) {
  return (
    <Typography component="div" position="fixed" width="100vw" left={left} right={right} top={0} bottom={0}  display="flex" justifyContent="center" alignItems="center">
      {/* <Box sx={{ display: 'flex' }}> */}
        <CircularProgress />
      {/* </Box> */}
    </Typography>
  );
}
