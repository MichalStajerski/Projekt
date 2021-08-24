const minutesLabel = document.getElementById('minutes')
const secondsLabel = document.getElementById('seconds')
let totalSeconds = 0
setInterval(setTime, 1000)// we refresh it every sedond because that is the minimum value by which timer is supposed to change

function setTime () {
  ++totalSeconds
  secondsLabel.innerHTML = pad(totalSeconds % 60)
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60))
}

function pad (val) {
  const valString = val + ''
  if (valString.length < 2) { // if we have one number value or two number value
    return '0' + valString
  } else {
    return valString
  }
}
