import { createSlice } from "@reduxjs/toolkit"

const initialState={
    color:'',
    message:''
}

const alertslice=createSlice({
name :'alert',
initialState,
reducers:{
    setAlert:(state,action)=>{
        state.color=action.payload.color;
        state.message=action.payload.message;
    },
    resetAlert:(state,action)=>{
        state.color='';
        state.message='';
    }
       
}
});

export const {setAlert,resetAlert}=alertslice.actions;
export default alertslice.reducer;