import { createSlice } from "@reduxjs/toolkit"


const initialstate = {
    isloading: false,
    cart: [],
    error: null
}

const addtocartSlice = createSlice({
    name: "cart",
    initialState: initialstate,
    reducers: {
        addtocart: (state, action) => {
            console.log(action);
            const index = state.cart.findIndex((v) => v.pid === action.payload.id)
            if (index !== -1) {
                state.cart[index].qty+=action.payload.countqty
            } else {
                state.cart.push({ pid: action.payload.id, qty: action.payload.countqty })
            }

        },
        incress: (state, action) => {
            console.log(action);
            const index = state.cart.findIndex((v) => v.pid === action.payload);
            state.cart[index].qty++
        },
        decress: (state, action) => {
            // console.log(action)

            const index = state.cart.findIndex((v) => v.pid === action.payload);

            if (state.cart[index].qty > 1) {
                state.cart[index].qty--
            }

        },
        remoeproduct:(state,action)=>{
            const fdata=state.cart.filter((v)=>v.pid!==action.payload)
            state.cart=fdata
        }
    
    }
})
export const { addtocart, incress, decress ,remoeproduct} = addtocartSlice.actions
export default addtocartSlice.reducer                 