import PropTypes from "prop-types"
import React from "react"
import "./progressBar.css"

const ProgressBar = (props) => {
  return (
    <div
      className="progressRange"
      style={{
        width: props.width,
        backgroundColor: props.bgColor,
      }}
      onClick={(e) => props.onClick && props.onClick(e)}
    >
      <div
        className="progressBar"
        style={{
          backgroundColor: props.activeColor || "var(--primary-color)",
          width: `${props.progress}%`,
        }}
      ></div>
    </div>
  )
}

ProgressBar.propTypes = {
  width: PropTypes.string,
  bgColor: PropTypes.string,
  activeColor: PropTypes.string,
  progress: PropTypes.number,
  onClick: PropTypes.func,
}

export default ProgressBar
