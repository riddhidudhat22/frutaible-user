
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { baseURL } from "../../../utils/baseURL"

const initialstate = {
  isloading: false,
  coupon: [],
  error: null
}

export const couponadd = createAsyncThunk(
  'coupon/add',
  async (data) => {
    try {
      // console.log(data);
      const response = await axios.post(baseURL + 'coupon', data)
      // console.log(response)
      return response.data

    } catch (error) {
      console.log(error.message);
    }
  }
)

export const couponget = createAsyncThunk(
  'coupon/get',
  async () => {
    try {
      const response = await axios.get(baseURL + 'coupon')
      console.log(response)
      return response.data
    } catch (error) {
      console.log(error.message);
    }
  }
)

export const coupondelete = createAsyncThunk(
  'coupon/delete',
  async (id) => {
    try {
      const response = await axios.delete(baseURL + 'coupon/' + id)
      // console.log(response)
      return response.data.id
    } catch (error) {

    }
  }
)

export const couponedite = createAsyncThunk(
  'coupon/edite',
  async (data) => {
    try {
      const response = await axios.put(baseURL + 'coupon/' + data.id, data)
      return response.data
    } catch (error) {

    }
  }
)

const couponSlice = createSlice({
  name: 'coupon',
  initialState: initialstate,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(couponadd.fulfilled, (state, action) => {
      // console.log(action);
      state.coupon = state.coupon.concat(action.payload)
    });
    builder.addCase(couponget.fulfilled, (state, action) => {
      state.coupon = action.payload
    });
    builder.addCase(coupondelete.fulfilled, (state, action) => {
      state.coupon = state.coupon.filter((v) => v.id !== action.payload)
    });
    builder.addCase(couponedite.fulfilled, (state, action) => {
      state.coupon = state.coupon.map((v) => {
        if (v.id === action.payload.id) {
          return action.payload
        } else {
          return v
        }
      })
    })
  }
})

export default couponSlice.reducer;