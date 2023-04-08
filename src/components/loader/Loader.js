import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

export default function Loader() {
  return (
    <Typography component="div" width="100vw" height="100vh" display="flex" justifyContent="center" alignItems="center">
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    </Typography>
  );
}
