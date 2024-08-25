import { ADD_SELSPEOPLE, DELETE_SELSPEOPLE, GET_SELSPEOPLE, UPDATE_SELSPEOPLE } from "../ActionType";

const initialState = {
    isLoading: false,
    salespeple: [],
    error: null
}

export const salespeopleReducer = (state = initialState, action) => {
    console.log(action.type);

    switch (action.type) {
        case GET_SELSPEOPLE:
            return {
                ...state,
                isLoading: false,
                salespeple: action.payload.data,
                error: null
            }
        case ADD_SELSPEOPLE:
            return {
                ...state,
                isLoading: false,
                salespeple: state.salespeple.concat(action.payload.data),
            }
        case DELETE_SELSPEOPLE:
            return {
                ...state,
                isLoading: false,
                salespeple: state.salespeple.filter((v) => v.SNUM !== action.payload),
            }
        case UPDATE_SELSPEOPLE:
            return {
                ...state,
                isLoading: false,
                salespeple: state.salespeple.map((v) =>{
                    if (v.SNUM===action.payload.SNUM) {
                        return action.payload
                    }else{
                        return v
                    }
                 
                } )
            }
        default:
            return state
    }
}
