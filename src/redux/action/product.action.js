import axios from 'axios';
import { ADD_PRODUCT, DELETE_PRODUCT, ERROR_PRODUCT, GET_PRODUCT, LOADING_PRODUCT, UPDATE_PRODUCT } from '../ActionType';
import { baseURL } from '../../utils/baseURL';

const loadingproduct = () => ({ type: LOADING_PRODUCT });

const errorproduct = (error) => ({ type: ERROR_PRODUCT, payload: error });

export const getdatapro = () => async (dispatch) => {

  try {
    dispatch(loadingproduct());
    const response = await fetch("http://localhost:8000/api/v1/products/list-product");
    const data = await response.json();
    dispatch({ type: GET_PRODUCT, payload: data });
  } catch (error) {
    dispatch(errorproduct(error.message));
  }
};

export const addproductdata = (data) => async (dispatch) => {
  // console.log("datadatadataaddd", data);
  // try {
  //   const response = await fetch("http://localhost:8000/api/v1/products/add-product", {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(data)
  //   });
  //   const dataproduct = await response.json();
  //   dispatch({ type: ADD_PRODUCT, payload: dataproduct });
  // } catch (error) {
  //   dispatch(errorproduct(error.message));
  // }
  try {
    const response = await axios.post("http://localhost:8000/api/v1/products/add-product", data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
    })
    dispatch({ type: ADD_PRODUCT, payload: response.data.data });
  } catch (error) {
    dispatch(errorproduct(error.message));
  }
};

export const editproductdata = (product) => async (dispatch) => {
  console.log("datadatadata", product);

  try {
    // const response = await fetch("http://localhost:8000/api/v1/products/update-product/" + data._id, {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(data)
    // });
    // const datapro = await response.json();
    // dispatch({ type: UPDATE_PRODUCT, payload: datapro });

    const response = await axios.put(`http://localhost:8000/api/v1/products/update-product/${product._id}`, product, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
    })
    dispatch({ type: UPDATE_PRODUCT, payload: response.data.data });

  } catch (error) {
    dispatch(errorproduct(error.message));
  }

};

export const deleteproductdata = (_id) => async (dispatch) => {
  try {
    await fetch(`http://localhost:8000/api/v1/products/delete-product/${_id}`, {
      method: 'DELETE'
    });
    dispatch({ type: DELETE_PRODUCT, payload: _id });
  } catch (error) {
    dispatch(errorproduct(error.message));
  }
};
