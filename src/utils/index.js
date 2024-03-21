import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function ShowtoastError(msg) {
    toast.error(`${msg}`, {
      position: "bottom-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  }
  
  export function ShowtoastSuccess(msg) {
    toast.success(`${msg}`, {
      position: "bottom-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  }