import axios from "axios";
import { ADD_SELSPEOPLE, DELETE_SELSPEOPLE, GET_SELSPEOPLE, UPDATE_SELSPEOPLE } from "../ActionType";

export const getselsepeople = () => async (dispatch) => {
    axios.get("http://localhost:8000/api/v1/salespeoples/list-salespeople")
        .then((res) => {
            dispatch({ type: GET_SELSPEOPLE, payload: res.data })
        })
}

export const habdleadd = (data) => async (dispatch) => {
    try {
        const response = await fetch("http://localhost:8000/api/v1/salespeoples/add-salespeople", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        const datares = await response.json();
        dispatch({ type: ADD_SELSPEOPLE, payload: datares });
    } catch (error) {
        console.log(error);
    }
}

export const deletesalepeople = (SNUM) => async (dispatch) => {
    try {
        await fetch(`http://localhost:8000/api/v1/salespeoples/delete-salespeople/${SNUM}`, {
            method: "DELETE"
        });
        dispatch({ type: DELETE_SELSPEOPLE, payload: SNUM });
    } catch (error) {
        console.log(error);
    }
};

export const editeselespeople = (data) => async (dispatch) => {
    try {
        const response = await fetch(`http://localhost:8000/api/v1/salespeoples/update-salespeople/${data.SNUM}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        // const updatedData = await response.json();
        dispatch({ type: UPDATE_SELSPEOPLE, payload: data });
    } catch (error) {
        console.log(error);
    }
}
