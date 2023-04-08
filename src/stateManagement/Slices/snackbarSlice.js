const { createSlice } = require('@reduxjs/toolkit');

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState: {
    isOpen: false,
    message: '',
    severity: 'success',
  },
  reducers: {
    toggleSnackbar(state, action) {
      return action.payload;
    },
  },
});

const { actions, reducer } = snackbarSlice;
export const { toggleSnackbar } = actions;
export default reducer;
