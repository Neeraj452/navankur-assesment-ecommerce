import {createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const endpoint = 'https://fakestoreapi.com'

const initialProductDetailedState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    product: {},
};

const productDetailedSlice = createSlice({
    name: 'ProductDetailed',
    initialState: initialProductDetailedState,
    reducers: {
        productDetailedRequested(state) {
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
            state.product = {};
        },
        productDetailedSuccess(state, action) {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.product = action.payload;
        },
        productDetailedFailure(state, action) {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.product = {};
        },
    },
});

export const productDetailedAction = (id) => {
    return async (dispatch) => {
        dispatch(productDetailedRequested());
        try {
            const response = await axios.get(`${endpoint}/products/${id}`);
            dispatch(productDetailedSuccess(response?.data));
            console.log("response",response.data);


        } catch (error) {
            dispatch(productDetailedFailure());
        }
    };
}


export const {productDetailedRequested, productDetailedSuccess, productDetailedFailure} = productDetailedSlice.actions;

export default productDetailedSlice.reducer;
