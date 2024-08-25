// import axios from "axios"
// import { baseURL } from "../../utils/baseURL"
// import { ADD_COUPANCODE, GET_COUPANCODE } from "../ActionType"

// export const codegetdata = () => async (dispatch) => {
//     try {

//         await axios.get(baseURL + "code")
//             .then((Response) => {
                
//                 console.log(Response.data);
               
//                     dispatch({ type: GET_COUPANCODE, payload: Response.data })
               
//             })
//             .catch((error) => {
                
//             })
//     } catch (error) {

//     }
// }

// export const addproductdata = (data) => async (dispatch) => {
//     try {
//         await axios.post(baseURL + "code", data)
//             .then((response) => {
//                 dispatch({ type: ADD_COUPANCODE, payload: response.data })
//             })
//             .catch((error) => {
//                 console.log(error);
//             })
//     } catch (error) {

//     }
// }
