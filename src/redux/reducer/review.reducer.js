
import { ADD_REVIEW, DELETE_REVIEW, GET_REVIEW, GET_SHOP, UPDATE_REVIEW } from "../ActionType";


const initialState = {
    isloading: false,
    review: [],
    error: null
}

export const reviweReducer = (state = initialState, action) => {
    // console.log(action);
    switch (action.type) {

        case GET_REVIEW:
            return {
                isloading: false,
                review: action.payload,
                error: null
            }
        case ADD_REVIEW:
            return {
                isloading: false,
                review: state.review.concat(action.payload),
                error: null
            }
        case DELETE_REVIEW:
            return {
                isloading: false,
                review: state.review.filter((v) => v.id !== action.payload),
                error: null
            }

        case UPDATE_REVIEW:
            return {
                isloading: false,
                review: state.review.map((v) => {
                    if (v.id === action.payload.id) {
                        return action.payload

                    } else {
                        return v
                    }
                }),
                error: null
            }
        default:
            return state

    }
}