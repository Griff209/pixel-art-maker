const board = document.getElementById('board')
const pen = document.getElementById('pen')
const picker = document.getElementById('color')
const eraser = document.getElementById('eraser')
const cellSize = getCssVar("--cell-size")
const numColumns = getCssVar("--number-of-columns")
const numRows = getCssVar("--number-of-rows")
let savedColor = getCssVar("--picked-color")

buildBoard(numColumns, numRows)
setEventListeners()

function buildBoard(columns, rows) {
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      let cell = document.createElement('div')
      cell.style += `grid-column-start: ${i}; grid-row-start: ${j}`
      cell.classList.add('cell')
      board.appendChild(cell)
    }
  }
}

function setEventListeners() {
  board.addEventListener("click", colorCell)
  picker.addEventListener("change", changeColor)
  eraser.addEventListener("click", toggleEraser)
}

function changeColor(e) {
  setCssVar("--picked-color", this.value)
}

function colorCell(e) {
  let color = getCssVar("--picked-color")
  if (e.target.classList.contains('cell')) {
    e.target.style.setProperty("background-color", color)
  }
}

function toggleEraser() {
  let currentColor = getCssVar("--picked-color")
  if (currentColor === '#ffffff') {
    setCssVar("--picked-color", savedColor)
    eraser.innerText = 'Drawing...'
  } else {
    savedColor = currentColor
    setCssVar("--picked-color", '#ffffff')
    eraser.innerText = 'Erasing...'
  }
}

function getCssVar(prop) {
  return getComputedStyle(board).getPropertyValue(prop)
}

function setCssVar(prop, value) {
  board.style.setProperty(prop, value)
}
