export function launchFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen()
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen()
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen()
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen()
  }
}

// 判断浏览器种类
export function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen()
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen()
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen()
  }
}

// 设置时间格式
export function displayTime(time) {
  let minutes = Math.floor(time / 60)
  let seconds = Math.floor(time % 60)
  seconds = seconds > 9 ? seconds : `0${seconds}`
  minutes = minutes > 9 ? minutes : `0${minutes}`
  return `${minutes}:${seconds}`
}
