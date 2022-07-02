import React, { useRef } from "react"
import VideoControl from "../VideoControl/VideoControl"
import "./videoPlayer.css"
import video from "../../assets/video.mp4"

export const VideoContext = React.createContext(null)

const VideoPlayer = () => {
  const playerRef = useRef(null)
  const videoRef = useRef(null)
  const videoControlRef = useRef(null)

  let timer = null // 定时器id
  let showControl = false // 是否显示video control
  let isOverControl = false // 是否在video control上
  // 显示video control
  function handleVideoControlShow() {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }

    if (!showControl) {
      showControl = true
      videoControlRef && videoControlRef.current.handleMouseEnterAnimation({})
    }

    if (!isOverControl) {
      timer = setTimeout(() => {
        handleVideoControlHide()
      }, 2000)
    }
  }

  // 隐藏video control
  function handleVideoControlHide() {
    showControl = false
    videoControlRef && videoControlRef.current.handleMouseLeaveAnimation({})
  }

  function handleVideoControlEnter() {
    isOverControl = true
  }

  function handleVideoControlLeave() {
    isOverControl = false
  }
  return (
    <div
      className="player"
      ref={playerRef}
      onMouseMove={handleVideoControlShow}
      onMouseLeave={handleVideoControlHide}
    >
      <VideoContext.Provider value={{ videoRef, playerRef }}>
        <video
          onClick={() =>
            videoControlRef && videoControlRef.current.togglePlay()
          }
          onCanPlay={() =>
            videoControlRef && videoControlRef.current.progressVideo()
          }
          onTimeUpdate={() =>
            videoControlRef && videoControlRef.current.progressVideo()
          }
          onEnded={() =>
            videoControlRef && videoControlRef.current.resetPlaying()
          }
          ref={videoRef}
          src={video}
          autoPlay={false}
          className="video"
        ></video>
        <VideoControl
          ref={videoControlRef}
          video={videoRef}
          onMouseEnter={handleVideoControlEnter}
          onMouseLeave={handleVideoControlLeave}
        />
      </VideoContext.Provider>
    </div>
  )
}

export default VideoPlayer
