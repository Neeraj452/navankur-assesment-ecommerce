import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ShowtoastError, ShowtoastSuccess } from "../../utils";
import { clearCart } from "../cart/cart";
const webhook_url = process.env.REACT_APP_WEBHOOK_URL;

const initialBuyState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    webhook: {},
};

const buyItemsSlice = createSlice({
    name: "BuyItems",
    initialState: initialBuyState,
    reducers: {
        buyItemsRequested(state) {
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
            state.webhook = {};
        },
        buyItemsSuccess(state, action) {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.webhook = action.payload;
        },
        buyItemsFailure(state, action) {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.webhook = {};
        },
    },
});

export const buyItemsAction = (data,navigate) => {
    return async (dispatch) => {
        dispatch(buyItemsRequested());
        try {
            const headers = {
                'Content-Type': 'application/json',
                 'Access-Control-Allow-Origin': '*',
            };
            const response = await axios.post(webhook_url, data, { headers });
            dispatch(buyItemsSuccess(response.data));
            dispatch(clearCart())
            ShowtoastSuccess("Item bought successfully");
            navigate("/products");
        } catch (error) {
            dispatch(buyItemsFailure());
            ShowtoastError(error.message)
        }
    };
};

export const { buyItemsRequested, buyItemsSuccess, buyItemsFailure } = buyItemsSlice.actions;

export default buyItemsSlice.reducer;
