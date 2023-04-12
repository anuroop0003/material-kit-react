import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { MenuItem, TextField } from '@mui/material';
import { useEffect } from 'react';
import APIService from '../../../services/api';
import { toggleSnackbar } from '../../../stateManagement/Slices/snackbarSlice';

const options = [
    { id: 'success', name: 'Onboard' },
    { id: 'reject', name: 'Reject' },
    { id: 'pending', name: 'Keep Pending' },
];

export default function ActionModal({ state, setState }) {

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));



    const validationSchem = yup.object().shape({
        status: yup.string('Select an option').required('status is required'),
        description: yup.string().when('status', {
            is: (value) => value === 'reject',
            then:(schema) => schema.required('Description is required'),
            otherwise:(schema) => schema.notRequired(),
        })
    });

    const formik = useFormik({
        initialValues: {
            status: '',
            description: ""
        },
        validationSchema: validationSchem,
        onSubmit: (values) => {
              CallApi(values);
        },
    });

    useEffect(() => {
        formik.resetForm()
    }, [state?.view]);

    const handleClose = (event, reason) => {
        if (reason && reason === "backdropClick") 
        return;
        setState({ type: "", view: false });
    };

    const dispatch = useDispatch();

    const CallApi = (values) => {
        setState({ type: "", view: false });
        if(state?.type === "edit") {
            APIService.ApproveSellers({...values,  userId: state?.id}).then((res) => {
                dispatch(
                    toggleSnackbar({
                      isOpen: true,
                      message: res?.data?.message,
                      severity: 'success',
                    })
                  );
            }).catch((err) => {
                dispatch(
                    toggleSnackbar({
                      isOpen: true,
                      message: err?.response?.data?.message,
                      severity: 'error',
                    })
                  );
            })
        }
        if(state?.type === "delete") {
            APIService.DeleteSellers({...values,  userId: state?.id}).then((res) => {
                dispatch(
                    toggleSnackbar({
                      isOpen: true,
                      message: res?.data?.message,
                      severity: 'success',
                    })
                  );
            }).catch((err) => {
                dispatch(
                    toggleSnackbar({
                      isOpen: true,
                      message: err?.response?.data?.message,
                      severity: 'error',
                    })
                  );
            })
        }
    }

    switch (true) {
        case state?.type === "delete":
            return (
                <Dialog
                   
                    fullScreen={fullScreen}
                    open={state?.view}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">
                        {"Are you sure?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you certain you want to delete this vendor forever?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleClose}>
                            Disagree
                        </Button>
                        <Button onClick={handleClose} autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>
            );
        case state?.type === "edit":
            return (
                <Dialog
                    fullScreen={fullScreen}
                    open={state?.view}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <form onSubmit={formik.handleSubmit}>
                        <DialogTitle id="responsive-dialog-title">
                            {"Onboard vendor?"}
                        </DialogTitle>
                        <DialogContent>
                            <TextField
                                sx={{ width: "300px", margin: "10px 0" }}
                                select
                                name="status"
                                id="status"
                                label="Onboard Vendor"
                                value={formik.values.status}
                                onChange={formik.handleChange}
                                error={formik.touched.status && Boolean(formik.errors.status)}
                                helperText={formik.touched.status && formik.errors.status}
                            >
                                {options.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                            {formik.values.status === "reject" &&
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={4}
                                    name="description"
                                    id="description"
                                    label="Description"
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                    error={formik.touched.description && Boolean(formik.errors.description)}
                                    helperText={formik.touched.description && formik.errors.description}
                                />}
                        </DialogContent>
                        <DialogActions>
                            <Button autoFocus onClick={handleClose}>
                                Disagree
                            </Button>
                            <Button type='submit' autoFocus>
                                Agree
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
            );
        default:
            break;
    }
}