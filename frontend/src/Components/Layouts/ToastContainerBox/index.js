import React from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./style.css"

const ToastContainerBox = () => {
  return (
    <div className='toastContainer'>
      <ToastContainer
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
      />
    </div>
  )
}

export default ToastContainerBox;