// alt array is has duplicates cause merged array has 8 elements and it makes it easier for later use
const alt = ['Bee', 'Bear', 'Dog', 'Parrot', 'Bee', 'Bear', 'Dog', 'Parrot']
const Images = ['Images/0.jpg', 'Images/1.jpg', 'Images/2.jpg', 'Images/3.jpg', 'Images/4.jpg', 'Images/5.jpg', 'Images/6.jpg', 'Images/7.jpg']
// stan array holds the original paths to images so we can return card to back upon wrong match
const stan = []
let answerarray = []
let merged = []
let iterator = 0

// function gets what image is on default for a card
function GetOrigin () {
  for (let i = 0; i < Images.length; i++) {
    const original = document.getElementById(i).src
    // array stan is used for double click on card for unchecking
    stan.push(original)
    console.log('stan ' + stan)
  }
  return stan
}

function ChangeAndCheck (id) {
  iterator++
  if (document.getElementById(id).src === stan[id]) {
    // change image upon click
    document.getElementById(id).src = Images[merged[id]]
    // save our asnwer
    answerarray.push(id)
    console.log(answerarray)
    // if we have two choices made go on
    if (iterator % 2 === 0) {
      setTimeout(function () {
        // check answers by alt
        if (document.getElementById(answerarray[0]).alt !== document.getElementById(answerarray[1]).alt) {
          for (let i = 0; i < answerarray.length; i++) {
            // return them to back card upon wrong pairing after set interval  
            document.getElementById(answerarray[i]).src = stan[id]
          }
          // clear our asnwer array after set of two
          answerarray = []
        } else {
          // block cards if matched corrextly so we can't reuse them
          // asnwer array indexes can be hardcoded because we always choose two cards to match
          document.getElementById(answerarray[0]).onclick = ''
          document.getElementById(answerarray[1]).onclick = ''
          // clear our asnwer array after set of two
          answerarray = []
        }
      }, 300)
    }
  } else {
    // uncheck upon second click on the same picture
    document.getElementById(id).src = stan[id]
    // remove asnwer from array upon uchecking
    answerarray.pop(stan[id])
  }
}

window.onload = function () {
  CreateLayout()
  GetOrigin()
  DrawImages()
}

function DrawImages () {
  for (let j = 0; j < 8; j++) {
    document.getElementById(j).src = stan[j]
  }
  const temp = GetRandomArrayNumbers(4, 0, 3)
  const temp2 = GetRandomArrayNumbers(4, 4, 7)
  merged = temp.concat(temp2)
  merged = Shuffle(merged)
  console.log('merged: ' + merged)
  for (let i = 0; i < merged.length; i++) {
    document.getElementById(i).alt = alt[merged[i]]
  }
}
// fucntion for our button
function Reload () {
  window.location.reload(true)
}
// returns array of random numbers between two numbers - our not repeating images
function GetRandomArrayNumbers (qt, lowerlimit, upperlimit) {
  const indexSet = new Set()
  while (indexSet.size !== qt) {
    indexSet.add(GetRandomIntInclusive(lowerlimit, upperlimit))
  }
  return Array.from(indexSet)
}

// draws randomly a number between two values including them also
function GetRandomIntInclusive (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// randomly shuffles array elements
function Shuffle (array) {
  let currentIndex = array.length; let randomIndex
  // while there remain elements to shuffle
  while (currentIndex !== 0) {
    // pick a remaining element
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--;
    // and swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]]
  }
  return array
}
// dynamically creates our elements instead of hardcoded html code like it was before
function CreateLayout () {
  const divrow = document.createElement('div')
  divrow.setAttribute('class', 'row')
  divrow.setAttribute('id', 'diva')
  const divrow2 = document.createElement('div')
  divrow2.setAttribute('class', 'row')
  document.getElementById('layout').appendChild(divrow)
  document.getElementById('layout').appendChild(divrow2)
  for (let i = 0; i < Images.length; i++) {
    if (i < 4) {
      const div = document.createElement('div')
      div.setAttribute('class', 'column')
      div.setAttribute('id', 'divcol')
      const img = document.createElement('img')
      setAttributes(img,{'src': 'Images/back.jpg','class': 'zoom img','style': 'width:80%','alt': ' ','onclick': 'ChangeAndCheck(id)'})
      img.id = i
      div.appendChild(img)
      divrow.appendChild(div)
    } else {
      const div = document.createElement('div')
      div.setAttribute('class', 'column')
      div.setAttribute('id', 'divcol')
      const img = document.createElement('img')
      setAttributes(img,{'src': 'Images/back.jpg','class': 'zoom img','style': 'width:80%','alt': ' ','onclick': 'ChangeAndCheck(id)'})
      img.id = i
      div.appendChild(img)
      divrow2.appendChild(div)
    }
  }
}
//function so there is no need to call setAttribute several times for each property
function setAttributes(el, attrs) {
  for(var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}
