import { GET_EMPLOYE, TOGAE_THEME } from "../Actioncontext";

export const ThemeReducer = (state, action) => {
    console.log(state);
    switch (action.type) {
        case TOGAE_THEME:
            return {
                theme: action.payload
            }
      
        default:
            return state;
    }
}