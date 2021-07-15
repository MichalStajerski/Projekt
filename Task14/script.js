// for now set of answers is hardcoded
// need to fill remaining boxes with random letters from alphabet
// for now only logic behind checking answers is implemented and creating board
const answers = [
  { fields: [3, 4] },
  { fields: [28, 29, 30] },
  { fields: [30, 37, 44] },
  { fields: [15, 22, 29] }
]

const colors = {
  selected: 'blue',
  normal: '#ddd',
  success: 'green'
}

const numRows = 7
const numCols = 7

const clickedValues = []
const clickedTiles = []

const arraysAreEqual = (a1, a2) => a1.length === a2.length && a1.every(el => a2.includes(el))

function onTileClicked (tile, id) {
  if (tile.style.backgroundColor === colors.success) {
    // already answered correctly, do nothing
    return
  }

  const idx = clickedValues.indexOf(id)

  if (idx < 0) {
    tile.style.backgroundColor = colors.selected
    clickedValues.push(id)
    clickedTiles.push(tile)
  } else {
    tile.style.backgroundColor = colors.normal
    clickedValues.splice(idx, 1)
    clickedTiles.splice(idx, 1)
  }

  const correctAnswer = answers.find(answer => arraysAreEqual(clickedValues, answer.fields))

  if (!correctAnswer) {
    return
  }

  for (const tile of clickedTiles) {
    tile.style.backgroundColor = colors.success
  }

  answers.splice(answers.indexOf(correctAnswer), 1)

  for (const a of answers) {
    a.fields = a.fields.filter(field => !clickedValues.includes(field))
  }

  clickedValues.length = 0
  clickedTiles.length = 0

  if (!answers.length) {
    setTimeout(() => alert('Victory'), 10)
  }
}

window.onload = () => {
  const container = document.getElementById('container')
  container.innerHTML = ''// don't want any extra boxes when you call this function again

  for (let rowIndex = 0; rowIndex < numRows; rowIndex++) {
    const row = document.createElement('div')
    row.className = 'row'

    for (let colIndex = 0; colIndex < numCols; colIndex++) {
      const tile = document.createElement('div')
      tile.className = 'box'
      tile.onclick = () => onTileClicked(tile, rowIndex * numCols + colIndex)
      row.appendChild(tile)
    }

    container.appendChild(row)
  }
}
