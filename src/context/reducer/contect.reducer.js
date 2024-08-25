import { ADD_CONTECT, DELETE_CONTECT, GET_CONTECT, UPDATE_CONTECT } from "../Actioncontext";


export const ContactReducer = (state, action) => {
    console.log(action.type);

    switch (action.type) {
        case ADD_CONTECT:
            return {
                isLoading: false,
                contact: state.contact.concat(action.payload),
                error: null
            }
        case GET_CONTECT:

            return {
                isLoading: false,
                contact: action.payload,
                error: null
            }
        case DELETE_CONTECT:
            return {
                isLoading: false,
                contact: action.payload,
                contact: state.contact.filter((v) => v.id !== action.payload),
                error: null
            }
        case UPDATE_CONTECT:
            return {
                contact: state.contact.map((v) => {
                    if (v.id === action.payload.id) {
                        return action.payload

                    } else {
                        return v;
                    }
                })
            }
        default:
            return state;
    }
}