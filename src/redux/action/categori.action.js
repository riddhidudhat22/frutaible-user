import axiosInstance from "../../utils/axiosinstance";
import { ADD_CATEGORI, DELETE_CATEGORI, GET_CATEGORI, UPDATE_CATEGORI } from "../ActionType"

export const getcategori = () => async (dispatch) => {

  // const response = await fetch("http://localhost:8000/api/v1/categories/list-category");
  const response=await axiosInstance.get("categories/list-category")
  const data =response.data;
  console.log(data);

  dispatch({ type: GET_CATEGORI, payload: data })
}


export const handleAdd = (data) => async (dispatch) => {
  try {
    const response = await axiosInstance.post("categories/add-category", data);
    const responseData = response.data;
    dispatch({ type: ADD_CATEGORI, payload: responseData });
  } catch (error) {
    console.error("Error adding category:", error.response?.data || error.message);
  }
};

export const handledelete = (_id) => async (dispatch) => {
  try {
    const response = await axiosInstance.delete(`categories/delete-category/${_id}`);
    dispatch({ type: DELETE_CATEGORI, payload: _id });
  } catch (error) {
    console.error("Error deleting category:", error.response?.data || error.message);
  }
};

export const editecategori = (data) => async (dispatch) => {
  try {
    const response = await axiosInstance.put(`categories/update-category/${data._id}`, data);
    const updatedData = response.data;
    dispatch({ type: UPDATE_CATEGORI, payload: updatedData });
  } catch (error) {
    console.error("Error updating category:", error.response?.data || error.message);
  }
};