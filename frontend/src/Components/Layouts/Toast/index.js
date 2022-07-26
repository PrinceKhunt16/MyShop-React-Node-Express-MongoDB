import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toast = ({ msg }) => {
  return (
    toast(msg, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        closeButton: false,
    })
  )
}

export default Toast;