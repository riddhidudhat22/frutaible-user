import axios from "axios";
import { ADD_VARIANT, DELETE_VARIANT, GET_VARIANT, UPDATE_VARIANT } from "../ActionType";


export const getVariant = () => (dispatch) => {
    try {
        axios.get("http://localhost:8000/api/v1/variants/list-variant")
        .then((res) => {
            dispatch({ type: GET_VARIANT, payload: res.data.data })
        })
    } catch (error) {
        console.log(error);
    }
}
export const addvariant = (data) => async (dispatch) => {
    try {
        const response = await axios.post("http://localhost:8000/api/v1/variants/add-variant", data, {
            headers: {
                "Content-Type": "application/json",
            }
        });
        dispatch({ type: ADD_VARIANT, payload: response.data });
    } catch (error) {
        console.log(error);
    }
};

export const deletevariant=(_id)=>async(dispatch)=>{
    try {
        await axios.delete("http://localhost:8000/api/v1/variants/delete-variant/"+_id)  
        .then(dispatch({type:DELETE_VARIANT,payload:_id}))
    } catch (error) {
        console.log(error);
    }
};


export const editevariant = (data) => async (dispatch) => {
    try {
        const response = await axios.put("http://localhost:8000/api/v1/variants/update-variant/" + data._id, data, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        dispatch({ type: UPDATE_VARIANT, payload: response.data });
    } catch (error) {
        console.log(error);
    }
};