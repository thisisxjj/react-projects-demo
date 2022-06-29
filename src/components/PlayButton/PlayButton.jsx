import React from "react"
import PropTypes from "prop-types"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons"
import "./playButton.css"

const PlayButton = (props) => {
  function handleClick(e) {
    e.preventDefault()
    // 调用父组件传入的方法
    props.onPlay && props.onPlay(e)
  }

  return (
    <div className="playControl" onClick={handleClick}>
      <FontAwesomeIcon
        color="var(--font-color)"
        width={35}
        fontSize={35}
        icon={props.playing ? faPause : faPlay}
      />
    </div>
  )
}

PlayButton.propTypes = {
  onPlay: PropTypes.func,
  playing: PropTypes.bool.isRequired,
}

export default PlayButton
