// alt array is has duplicates cause merged array has 8 elements and it makes it easier for later use
const alt = ['Bee', 'Bear', 'Dog', 'Parrot', 'Bee', 'Bear', 'Dog', 'Parrot']
const Images = ['Images/0.jpg', 'Images/1.jpg', 'Images/2.jpg', 'Images/3.jpg', 'Images/4.jpg', 'Images/5.jpg', 'Images/6.jpg', 'Images/7.jpg']
// originalState array holds the original paths to images so we can return card to back upon wrong match
const originalState = []
let answerarray = []
let merged = []
let iterator = 0

const getRandomIntInclusive = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

// function gets what image is on default for a card
function GetOrigin () {
  for (let i = 0; i < Images.length; i++) {
    const original = document.getElementById(i).src
    // array originalState is used for double click on card for unchecking
    originalState.push(original)
    console.log('originalState ' + originalState)
  }
  return originalState
}

function ChangeAndCheck (id) {
  iterator++
  if (document.getElementById(id).src === originalState[id]) {
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
          document.getElementById(...answerarray).src = originalState[id]
          // clear our asnwer array after set of two
          answerarray = []
        } else {
          // block cards if matched corrextly so we can't reuse them
          // asnwer array indexes can be hardcoded because we always choose two cards to match
          document.getElementById(...answerarray).onclick = disabled
          // clear our asnwer array after set of two
          answerarray = []
        }
      }, 300)
    }
  } else {
    // uncheck upon second click on the same picture
    document.getElementById(id).src = originalState[id]
    // remove asnwer from array upon uchecking
    answerarray.pop(originalState[id])
  }
}

window.onload = () => {
  CreateLayout()
  GetOrigin()
  DrawImages()
}

function DrawImages () {
  for (let j = 0; j < 8; j++) {
    document.getElementById(j).src = originalState[j]
  }
  
  merged = getRandomArrayNumbers(8, 0, 7)
  merged.sort(() => Math.random() - 0.5)
  console.log('merged: ' + merged)
  for (let i = 0; i < merged.length; i++) {
    document.getElementById(...merged).alt = alt[merged[i]]
  }
}

// returns array of random numbers between two numbers - our not repeating images
function getRandomArrayNumbers (qt, lowerlimit, upperlimit) {
  const indexSet = new Set()
  while (indexSet.size !== qt) {
    indexSet.add(getRandomIntInclusive(lowerlimit, upperlimit))
  }
  return Array.from(indexSet)
}

// dynamically creates our elements instead of hardcoded html code like it was before
function CreateLayout () {
  const divrow = document.createElement('div')
  divrow.className = 'row'
  divrow.id = 'diva'

  const divrow2 = document.createElement('div')
  divrow2.className = 'row'
  document.getElementById('layout').appendChildren(divrow,divrow2)
  for (let i = 0; i < Images.length; i++) {
    if (i < 4) {
      const div = document.createElement('div')
      div.className = 'column'
      div.id - 'divcol'
      const img = document.createElement('img')
      setAttributes(img, { src: 'Images/back.jpg', class: 'zoom img', style: 'width:70%', alt: ' ', onclick: 'ChangeAndCheck(id)' })
      img.id = i
      div.appendChild(img)
      divrow.appendChild(div)
    } else {
      const div = document.createElement('div')
      div.className = 'column'
      div.id - 'divcol'
      const img = document.createElement('img')
      setAttributes(img, { src: 'Images/back.jpg', class: 'zoom img', style: 'width:70%', alt: ' ', onclick: 'ChangeAndCheck(id)' })
      img.id = i
      div.appendChild(img)
      divrow2.appendChild(div)
    }
  }
}
// function so there is no need to call setAttribute several times for each property
function setAttributes (el, attrs) {
  for (const key in attrs) {
    el.setAttribute(key, attrs[key])
  }
}
