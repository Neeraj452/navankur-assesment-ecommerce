import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ShowtoastError, ShowtoastSuccess } from "../../utils";
const endpoint = process.env.REACT_APP_ENDPOINT;

const initialLogOutState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  result: "",
};

const logSlice = createSlice({
  name: "User logout",
  initialState: initialLogOutState,
  reducers: {
    logRequested(state) {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.result = "";
    },
    logSuccess(state, action) {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.result = action.payload;
    },
    logFailure(state, action) {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.result = "";
    },
  },
});

export const logAction = (data, navigate) => {
  return async (dispatch) => {
    dispatch(logRequested());
    try {
      const response = await axios.post(`${endpoint}/login`, data);
      dispatch(logSuccess(response.data));
      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/products");
      ShowtoastSuccess("Login sucessfully...");
    } catch (error) {
      dispatch(logFailure());
      ShowtoastError("Please enter valid credentials");
    }
  };
};

export const { logRequested, logSuccess, logFailure } = logSlice.actions;

export default logSlice.reducer;
