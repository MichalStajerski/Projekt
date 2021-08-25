function CreateLayout(startButton,body){
  startButton.remove()
  const counter = document.createElement('div')
  counter.className = 'counter'
  const minutesLabel = document.createElement('label')
  minutesLabel.id = 'minutes'
  minutesLabel.innerHTML = '00'+':'
  const secondsLabel = document.createElement('label')
  secondsLabel.id = 'seconds'
  secondsLabel.innerHTML = '00'
  counter.append(minutesLabel,secondsLabel)
  body.appendChild(counter)
  let totalSeconds = 0
  setInterval(setTime, 1000)// we refresh it every sedond because that is the minimum value by which timer is supposed to change

  function setTime () {
    ++totalSeconds
    secondsLabel.innerHTML = pad(totalSeconds % 60)
    minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60))+':'
  }

  function pad (val) {
    const valString = val + ''
    if (valString.length < 2) { // if we have one number value or two number value
      return '0' + valString
    } else {
      return valString
    }
  }
}

window.onload = () =>{
  const body = document.getElementById('body')
  const startButton = document.createElement('button')
  startButton.id = 'startButton'
  startButton.className = 'glow-on-hover button-center'
  startButton.innerHTML = 'Start'
  startButton.onclick = () => CreateLayout(startButton,body)
  body.appendChild(startButton)
}
