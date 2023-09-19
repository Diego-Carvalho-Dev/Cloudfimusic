import { toast } from "react-toastify";

interface ToastProps {
  message: string;
  isSucess?: boolean;
}

export const Toast = ({ message, isSucess = false }: ToastProps) => {
  return isSucess
    ? toast.success(message, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark"
      })
    : toast.error(message, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark"
      });
};

export default Toast;
