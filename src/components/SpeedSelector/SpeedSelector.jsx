import { useState, useContext } from "react"
import { VideoContext } from "../VideoPlayer/VideoPlayer"
import "./speedSelector.css"

const SpeedSelector = () => {
  const [speed, setSpeed] = useState(1)
  const { videoRef: videoContext } = useContext(VideoContext)

  const handleSpeedChange = (e) => {
    const value = Number(e.target.value)
    setSpeed(value)
    videoContext.current.playbackRate = value
  }

  return (
    <div className="speed" title="PlayBack Rate">
      <select
        name="playbackRate"
        value={speed}
        onChange={handleSpeedChange}
        className="playerSpeed"
      >
        <option value="0.5">0.5 x</option>
        <option value="0.75">0.75 x</option>
        <option value="1">1 x</option>
        <option value="1.25">1.25 x</option>
        <option value="2">2 x</option>
      </select>
    </div>
  )
}

export default SpeedSelector
