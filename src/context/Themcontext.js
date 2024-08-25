import { useReducer } from "react";
import { createContext } from "react"
import { ThemeReducer } from "./reducer/them.reducer";
import { GET_EMPLOYE, TOGAE_THEME } from "./Actioncontext";
import axios from "axios";

const initialstate = {
    theme: "light",
}

export const ThemeContext = createContext();


export const ThemeProvider = ({ children }) => {
    const [state, dispatch] = useReducer(ThemeReducer, initialstate)

    const togaleTheme = (val) => {
        console.log(val);

        const theme = val === "light" ? "dark" : "light"

        dispatch({ type: TOGAE_THEME, payload: theme })
    }

        return (
        <>
            <ThemeContext.Provider
                value={{ ...state, togaleTheme }}
            >
                {children}
            </ThemeContext.Provider>

            
        </>
    )

}