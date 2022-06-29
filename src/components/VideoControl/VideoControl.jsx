import { useState, useImperativeHandle, forwardRef, useContext } from "react"
import ProgressBar from "../ProgressBar/ProgressBar"
import PlayButton from "../PlayButton/PlayButton"
import VolumeProgress from "../VolumeProgress/VolumeProgress"
import SpeedSelector from "../SpeedSelector/SpeedSelector"
import PlayTime from "../PlayTime/PlayTime"
import FullScreen from "../FullScreen/FullScreen"
import { VideoContext } from "../VideoPlayer/VideoPlayer"
import { launchFullscreen, exitFullscreen, displayTime } from "../../utils/util"
import "./videoControl.css"

let lastVolumeNumer = 0

const VideoControl = (props, ref) => {
  const [playing, isPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [volumeNumer, setVolumeNumber] = useState(100)
  const [currentTime, setCurrentTime] = useState("")
  const [duration, setDuration] = useState("")
  const [fullscreen, isFullscreen] = useState(false)

  const { videoRef: videoContext, playerRef: playerContext } =
    useContext(VideoContext)

  // 切换播放
  function togglePlay() {
    const videoEl = videoContext.current

    if (videoEl.paused) {
      videoEl.play()
      isPlaying(true)
    } else {
      videoEl.pause()
      isPlaying(false)
    }
  }

  // 播放完成,重置属性
  function resetPlaying() {
    isPlaying(false)
    setProgress(0)
    setCurrentTime(displayTime(0))
  }

  function progressVideo() {
    progressUpdate()
    timeUpdate()
  }

  // 进度条更新
  function progressUpdate() {
    const videoEl = videoContext.current
    setProgress((videoEl.currentTime / videoEl.duration) * 100)
  }

  // 点击进度条更新进度
  function handleTimeProgressClick(e) {
    const videoEl = videoContext.current
    const newTime = commonUtil(e) * 100
    videoEl.currentTime = (newTime / 100) * videoEl.duration
    setProgress(newTime)
  }

  // 音量进度条更新
  function handleVolumeProgressClick(e) {
    const videoEl = videoContext.current
    const newVolume = commonUtil(e)
    videoEl.volume = newVolume
    setVolumeNumber(newVolume * 100)
  }

  function commonUtil(e) {
    const event = e.nativeEvent
    const target = e.target.classList.contains("progressRange")
      ? e.target
      : e.target.parentElement
    const value = event.offsetX / target.offsetWidth
    return value
  }

  // 静音
  function handleMuted(e, muted) {
    const videoEl = videoContext.current
    videoEl.muted = muted
    if (muted) {
      lastVolumeNumer = volumeNumer
      setVolumeNumber(0)
    } else {
      setVolumeNumber(lastVolumeNumer)
    }
  }

  // 时间更新
  function timeUpdate() {
    const videoEl = videoContext.current
    setCurrentTime(displayTime(videoEl.currentTime))
    setDuration(displayTime(videoEl.duration))
  }

  // 全屏
  function handleFullscreen() {
    const playerEl = playerContext.current
    if (!playerEl) return
    if (!fullscreen) {
      launchFullscreen(playerEl)
    } else {
      exitFullscreen()
    }
    isFullscreen(!fullscreen)
  }

  // 此处注意useImperativeHandle方法的的第一个参数是目标元素的ref引用
  useImperativeHandle(ref, () => ({
    // togglePlay 就是暴露给父组件的方法
    togglePlay,
    progressVideo,
    resetPlaying,
  }))

  return (
    <div className="controlContainer">
      <ProgressBar progress={progress} onClick={handleTimeProgressClick} />
      <div className="controlGroup">
        <div className="controlLeft">
          <PlayButton onPlay={togglePlay} playing={playing} />
          <VolumeProgress
            onMuted={handleMuted}
            volume={volumeNumer}
            onClick={handleVolumeProgressClick}
          />
        </div>
        <div className="controlRight">
          <SpeedSelector />
          <PlayTime currentTime={currentTime} duration={duration} />
          <FullScreen fullscreen={fullscreen} onFullScreen={handleFullscreen} />
        </div>
      </div>
    </div>
  )
}

export default forwardRef(VideoControl)
