import PropTypes from "prop-types"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faExpand } from "@fortawesome/free-solid-svg-icons"
import "./fullScreen.css"

const FullScreen = ({ onFullScreen }) => {
  const handleClick = () => {
    onFullScreen && onFullScreen()
  }

  return (
    <div className="fullscreen" onClick={handleClick}>
      <FontAwesomeIcon
        icon={faExpand}
        color="var(--font-color)"
        width={35}
        fontSize={35}
      />
    </div>
  )
}

FullScreen.propTypes = {
  onFullScreen: PropTypes.func,
  fullscreen: PropTypes.bool,
}

export default FullScreen
