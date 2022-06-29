import React, { useState } from "react"
import PropTypes from "prop-types"
import ProgressBar from "../ProgressBar/ProgressBar"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faVolumeUp, faVolumeMute } from "@fortawesome/free-solid-svg-icons"
import "./volumeProgress.css"

const VolumeProgress = (props) => {
  const [muted, setMuted] = useState(false)

  const handleIconClick = (e) => {
    e.preventDefault()
    // 设置切换播放
    setMuted(!muted)
    // 调用父组件传入的方法
    props.onMuted && props.onMuted(e, !muted)
  }

  const handleVolumePorgressClick = (e) => {
    props.onClick && props.onClick(e)
  }

  return (
    <div className="volume">
      <div className="volumeIcon">
        <FontAwesomeIcon
          color="var(--font-color)"
          fontSize={35}
          width={35}
          icon={muted ? faVolumeMute : faVolumeUp}
          onClick={handleIconClick}
        />
      </div>
      <ProgressBar
        width="100px"
        progress={props.volume}
        bgColor="rgba(70, 70, 70, 0.5)"
        activeColor="var(--font-color)"
        onClick={handleVolumePorgressClick}
      />
    </div>
  )
}

VolumeProgress.propTypes = {
  volume: PropTypes.number,
  onMuted: PropTypes.func,
  onClick: PropTypes.func,
}

export default VolumeProgress
