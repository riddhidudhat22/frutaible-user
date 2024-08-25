

import axios from 'axios';
import { baseURL } from '../../utils/baseURL';
import {GET_SHOP } from '../ActionType';



export const shoptdata = () => async (dispatch) => {
    try {
        await axios.get(baseURL + "fruits")
            .then((Response) => {
      
                // console.log(Response.data); 
                    dispatch({ type: GET_SHOP, payload: Response.data })
                
            })
            .catch((error) => {
                console.log(error);
            })
    } catch (error) {

    }
}