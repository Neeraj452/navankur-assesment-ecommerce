import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const endpoint = process.env.REACT_APP_FAKE_URL;

const initialProductState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    products: [],
    };
const productSlice = createSlice({
    name: "Product",
    initialState: initialProductState,
    reducers: {
        productRequested(state) {
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
            state.products = [];
        },
        productSuccess(state, action) {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.products = action.payload;
        },
        productFailure(state, action) {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.products = [];
        },
    },
});
export const productAction = () => {
    return async (dispatch) => {
        dispatch(productRequested());
        try {
            const response = await axios.get(`${endpoint}/products`);
            dispatch(productSuccess(response.data));
        } catch (error) {
            dispatch(productFailure());
        }
    };
};

export const { productRequested, productSuccess, productFailure } = productSlice.actions;

export default productSlice.reducer;
