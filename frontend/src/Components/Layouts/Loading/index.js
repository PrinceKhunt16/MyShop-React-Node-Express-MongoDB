import React from 'react'
import "./style.css"
import Spinner from "../../../Utils/Spinner.svg"

const Loading = () => {
  return (
    <div className="loading"> 
        <img src={Spinner} alt="Spinner" />
    </div>
  )
}

export default Loading