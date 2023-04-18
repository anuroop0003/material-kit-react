import CustomSnackbar from "../snackbar/CustomSnackbar";

function ModalProvider({children}) {
    return(
        <>
        <CustomSnackbar />
        {children}
        </>
    )
}

export default ModalProvider;