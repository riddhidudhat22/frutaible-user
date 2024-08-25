import { ADD_VARIANT, DELETE_VARIANT, GET_VARIANT, UPDATE_VARIANT } from "../ActionType";

const initialState = {
    isLoading: null,
    variants: [],
    error: false,
};

export const variantReducer = (state = initialState, action) => {
    console.log(action.type);

    switch (action.type) {
        case GET_VARIANT:
            return {
                isLoading: null,
                variants: action.payload,
                error: false,
            }

        case ADD_VARIANT:
            return {
                ...state,
                isLoading: null,
                variants: state.variants.concat(action.payload.data),
                error: false,
            };
        case DELETE_VARIANT:
            return {
                isLoading: null,
                variants: state.variants.filter((v) => v._id !== action.payload),
                error: false,
            }
        case UPDATE_VARIANT:
            return {
                isLoading: null,
                variants: state.variants.map((v) => {
                    if (v._id === action.payload.data._id) {
                        return action.payload.data
                    } else {
                        return v
                    }
                }),
                error: false,
            }
        default:
            return state;
    }
};
