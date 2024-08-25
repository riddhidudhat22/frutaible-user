import {  GET_SHOP } from "../ActionType";


const initialState = {
    isloading: false,
    shop: [],
    error: null
}

export const  shopReducer = (state = initialState, action) => {
    // console.log(action);
    switch (action.type) {

        case GET_SHOP:
            return {
                isloading: false,
                shop: action.payload,
                error: null
            }


        default:
            return state

    }
}