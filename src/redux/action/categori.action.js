import { ADD_CATEGORI, DELETE_CATEGORI, GET_CATEGORI, UPDATE_CATEGORI } from "../ActionType"

export const getcategori = () => async (dispatch) => {

  const response = await fetch("http://localhost:8000/api/v1/categories/list-category");
  const data = await response.json();
  console.log(data);

  dispatch({ type: GET_CATEGORI, payload: data })
}


export const handleAdd = (data) => async (dispatch) => {
  try {
    console.log("addd...");
    const response = await fetch("http://localhost:8000/api/v1/categories/add-category",{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    const datares = await response.json();
    dispatch({ type: ADD_CATEGORI, payload: datares });
  } catch (error) {
    console.error("Error adding category:", error);
  }
};


export const handledelete = (_id) => async (dispatch) => {

  try {
    await fetch("http://localhost:8000/api/v1/categories/delete-category/" + _id, {
      method: "DELETE"
    })
    dispatch({ type: DELETE_CATEGORI, payload: _id })
  } catch (error) {
    console.log(error);
  }
}

export const editecategori = (data) => async (dispatch) => {
  try {
    const response = await fetch("http://localhost:8000/api/v1/categories/update-category/" + data._id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    const updatedData = await response.json();
    dispatch({ type: UPDATE_CATEGORI, payload: updatedData })
  } catch (error) {
    console.log(error);
  }
}