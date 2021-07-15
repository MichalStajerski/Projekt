const recorder = document.getElementById('recorder')
const player = document.getElementById('audio')
recorder.addEventListener('change', function (e) {
  const file = e.target.files[0]
  const url = URL.createObjectURL(file)
  player.src = url
})

const vid = document.getElementById('audio')

function audioLength () {
  alert('Długośc trwania audio => ' + vid.duration)
}

function getCurTime () {
  const x = document.getElementById('mySelect')
  var option = document.createElement('option')
  option.text = vid.currentTime
  x.add(option)

  const e = document.getElementById('Delta')
  var option = document.createElement('option')

  const length = document.getElementById('mySelect').options.length

  if (length > 1 && length % 2 == 0) {
    for (let i = 0; i < length; i = i + 2) {
      const first = document.getElementById('mySelect').options[i].value
      const second = document.getElementById('mySelect').options[i + 1].value
      const delta = second - first
      option.text = delta
      e.add(option)
    }
  }
}
function Pause () {
  vid.pause()
}
function PlayAudio () {
  vid.play()
}

function Reload () {
  vid.load()
  document.location.reload(true)
}
function Save () {
  const timeStamps = ['Nasze time stampy']
  const x = document.getElementById('mySelect')
  let txt = 'Time Stamps: '
  let i
  for (i = 0; i < x.length; i++) {
    txt = x.options[i].text
    timeStamps.push(txt)
  }
  console.log(timeStamps)
  const textDoc = document.createElement('a')
  // var title = document.getElementById("title").src;
  // console.log(title);
  textDoc.href = 'data:attachment/text,' + encodeURI(timeStamps.join('\n'))
  textDoc.target = '_blank'
  textDoc.download = 'dwd.txt'
  textDoc.click()
}

function download (content, fileName, contentType) {
  const a = document.createElement('a')
  const file = new Blob([content], { type: contentType })
  a.href = URL.createObjectURL(file)
  a.download = fileName
  a.click()
}
