import { ADD_CATEGORI, DELETE_CATEGORI, GET_CATEGORI, UPDATE_CATEGORI } from "../ActionType";

const initialState = {
    isLoading: false,
    categori: [],
    error: null
}

export const categoriReducer = (state = initialState, action) => {
    console.log(action.type);

    switch (action.type) {
        case GET_CATEGORI:
            return {
                ...state,
                isLoading: false,
                categori: action.payload.data
            };
        case ADD_CATEGORI:
            return {
                ...state,
                categori: [...state.categori, action.payload.data]
            };
        case DELETE_CATEGORI:
            return {
                isLoading: false,
                ...state,
                categori: state.categori.filter((v) => v._id !== action.payload),
                error: null
            };
        case UPDATE_CATEGORI:
            return {
                isLoading: false,
                categori: state.categori.map((v) => v._id === action.payload.data._id ? action.payload.data : v),
                categori: state.categori.map((v) => {
                    if (v.id === action.payload.id) {
                        return action.payload
                    } else {
                        return v;
                    }
                })
            
            };
        default:
            return state;
    }
};
