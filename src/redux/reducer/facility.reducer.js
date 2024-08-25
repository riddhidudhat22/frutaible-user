import { ADD_FACILITY, DELETE_FACILITY, GET_FACILITY, LOADING_FACILITY, UPDATE_FACILITY } from "../ActionType";

const initialstate = {
    isLoading: false,
    facility: [],
    error: null,
}

export const facilityReducer = (state = initialstate, action) => {
    // console.log(action);

    switch (action.type) {

        case LOADING_FACILITY:
            return {
                ...state,
                isLoading: true,
            }

        case GET_FACILITY:
            return {
                ...state
            }

        case ADD_FACILITY:
            return {
                ...state,
                isLoading: false,
                facility: state.facility.concat(action.payload),
            }

        case DELETE_FACILITY:
            return {
                ...state,
                isLoading: false,
                facility: state.facility.filter((v) => v.id !== action.payload),
            }

        case UPDATE_FACILITY:
            return {
                ...state,
                isLoading: false,
                facility: state.facility.map((v) => {
                    if (v.id === action.payload.id) {
                        return action.payload
                    } else {
                        return v;
                    }
                })
            }
        default:
            return state
    }
}