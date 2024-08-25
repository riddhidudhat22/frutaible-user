import { createContext, useReducer } from "react"
import { ContactReducer } from "./reducer/contect.reducer";
import axios from "axios";

import { baseURL } from '../utils/baseURL'
import { ADD_CONTECT, DELETE_CONTECT, GET_CONTECT, UPDATE_CONTECT } from "./Actioncontext";
const initialState = {
    isLoading: false,
    contact: [],
    error: null
}

export const ContactContext = createContext();

export const ContactProvider = ({ children }) => {

    const [state, dispatch] = useReducer(ContactReducer, initialState)

    const addcontact = async (data) => {
        try {
            const response = await axios.post(baseURL + 'contact', data)
            console.log(response.data);
            dispatch({
                type: ADD_CONTECT, payload: response.data
            })
        } catch (error) {

        }

    }

    const getcontact=async(data)=>{
        try {
            const response = await axios.get(baseURL + 'contact',data)
            console.log(response.data);
            dispatch({type:GET_CONTECT,payload:response.data})
        } catch (error) {
            
        }
    }

    const deletecontact=async(id)=>{
        try {
            const response=await axios.delete(baseURL+'contact/'+id)
            dispatch({type:DELETE_CONTECT,payload: id})

        } catch (error) {
            
        }
    }

    const editecontact=async(data)=>{
        try {
            const response=await axios.put(baseURL+'contact/'+data.id,data)
            dispatch({type:UPDATE_CONTECT,payload: data})

        } catch (error) {
            
        }
    }

    return (
        <ContactContext.Provider
            value={{ ...state, addcontact ,getcontact,deletecontact,editecontact}}
        >
            {children}
        </ContactContext.Provider>
    )
}