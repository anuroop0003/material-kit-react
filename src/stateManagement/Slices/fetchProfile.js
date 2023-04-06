import { createSlice } from "@reduxjs/toolkit";

const profileFetch = createSlice({
    name:"profile",
    initialState: {},
    reducers:{
        setdata(state, action){
            return  action.payload;
        }
    }
});


const { actions, reducer} = profileFetch;

export const { setdata} = actions;

export default reducer;