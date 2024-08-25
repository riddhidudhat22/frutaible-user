import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    subcategories: [],
    error: null
};

export const subcategoriget = createAsyncThunk(
    'subcategories/get',
    async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/v1/subcategories/list-subcategory");
            return response.data.data;
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }
);

export const subcategoriadd = createAsyncThunk(
    'subcategories/add',
    async (data) => {
        try {
            const response = await axios.post("http://localhost:8000/api/v1/subcategories/add-subcategory", data);
            return response.data.data;
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }
);

export const subcategoridelete = createAsyncThunk(
    'subcategories/delete',
    async (_id) => {
        try {
            const response = await axios.delete(`http://localhost:8000/api/v1/subcategories/delete-subcategory/${_id}`);
            return { id: _id };
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
);

export const subcategoriedite = createAsyncThunk(
    'subcategories/edit',
    async (data) => {
        try {
            const response = await axios.put(`http://localhost:8000/api/v1/subcategories/update-subcategory/${data._id}`, data);
            return response.data.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
);

const subcategoriSlice = createSlice({
    name: 'subcategories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(subcategoriget.fulfilled, (state, action) => {
            state.subcategories = action.payload;
        });

        builder.addCase(subcategoriadd.fulfilled, (state, action) => {
            state.subcategories.push(action.payload);
        });

        builder.addCase(subcategoridelete.fulfilled, (state, action) => {
            state.subcategories = state.subcategories.filter((v) => v._id !== action.payload.id);
        });

        builder.addCase(subcategoriedite.fulfilled, (state, action) => {
            state.subcategories = state.subcategories.map((v) => {
                if (v._id === action.payload._id) {
                    return action.payload;
                } else {
                    return v;
                }
            });
        });
    }
});

export default subcategoriSlice.reducer;
