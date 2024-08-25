

import axios from 'axios';
import { baseURL } from '../../utils/baseURL';
import { ADD_REVIEW, DELETE_REVIEW, GET_REVIEW, UPDATE_REVIEW } from '../ActionType';



export const reviewtdata = () => async (dispatch) => {
    try {
        await axios.get(baseURL + "reviews")
            .then((Response) => {

                // console.log(Response.data); 
                dispatch({ type: GET_REVIEW, payload: Response.data })

            })
            .catch((error) => {
                console.log(error);
            })
    } catch (error) {

    }
}

export const addreviewdata = (data) => async (dispatch) => {
    try {
        await axios.post(baseURL + "reviews", data)
            .then((response) => {
                dispatch({ type: ADD_REVIEW, payload: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    } catch (error) {

    }
}


export const deletereviewdata = (id) => async (dispatch) => {
    try {
       
        await axios.delete(baseURL+"reviews/"+id)
            .then((response) => {
                dispatch({ type: DELETE_REVIEW, payload: id})
            })
            .catch((error) => {
                console.log(error);
            })
    } catch (error) {

    }
}

export const editteviewdata = (data) => async (dispatch) => {
    try {
       
        await axios.put(baseURL+"reviews/"+data.id,data)
            .then((response) => {
                dispatch({ type: UPDATE_REVIEW, payload: data})
            })
            .catch((error) => {
                console.log(error);
            })
    } catch (error) {

    }
}