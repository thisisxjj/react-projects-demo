import React, { useRef } from "react"
import VideoControl from "../VideoControl/VideoControl"
import "./videoPlayer.css"
import video from "../../assets/video.mp4"

export const VideoContext = React.createContext(null)

const VideoPlayer = () => {
  const playerRef = useRef(null)
  const videoRef = useRef(null)
  const videoControlRef = useRef(null)

  return (
    <div className="player" ref={playerRef}>
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
        <VideoControl ref={videoControlRef} video={videoRef} />
      </VideoContext.Provider>
    </div>
  )
}

export default VideoPlayer
