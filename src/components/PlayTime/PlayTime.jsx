import PropTypes from "prop-types"
import "./playTime.css"

const PlayTime = ({ currentTime, duration }) => {
  return (
    <div className="time">
      <span className="timeElapsed">{currentTime}</span>
      <span> / </span>
      <span className="timeElapsed">{duration}</span>
    </div>
  )
}

PlayTime.propTypes = {
  currentTime: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
}

export default PlayTime
