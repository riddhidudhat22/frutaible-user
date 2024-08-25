import { ADD_FACILITY, DELETE_FACILITY, GET_FACILITY, LOADING_FACILITY, UPDATE_CATEGORI, UPDATE_FACILITY } from "../ActionType"


const loadingfacelity = () => (dispatch) => {
    dispatch({ type: LOADING_FACILITY })
}

export const getfacelity=()=>(dispatch)=>{
    dispatch({type:GET_FACILITY})
}

export const addfacility = (data) => (dispatch) => {
    dispatch(loadingfacelity());

    setTimeout(() => {
        dispatch({ type: ADD_FACILITY, payload: data })
    }, 2000)

}

export const deletefacility = (id) => (dispatch) => {
    dispatch(loadingfacelity())
    setTimeout(() => {
        dispatch({ type: DELETE_FACILITY, payload: id })
    }, 1000)


}

export const editeffacility = (data) => (dispatch) => {
    dispatch(loadingfacelity())
    setTimeout(() => {
        dispatch({ type: UPDATE_CATEGORI, payload: data })
    }, 1000)

}