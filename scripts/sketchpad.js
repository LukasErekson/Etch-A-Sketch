'using strict';

// Create the sketch pad squares
const SKETCHPADWIDTH = 600;
const DEFAULTROWLENGTH = 16;
const sketchpad = document.getElementById('sketchpad-wrapper');

/**
 * Change the (background) color of th sketchpad squares.
 * @param {Event} event The event that calls this function (needs target).
 */
function drawOnSketchpadGrey(event) {
    let targetedSquare = document.getElementById(`${event.target.id}`);
    
    let currentColor = targetedSquare.style.backgroundColor;
    currentColor = currentColor.slice(4, -1).split(',')
    currentColor.forEach((item, idx, arr) => arr[idx] = +item);

    targetedSquare.style.backgroundColor = `rgb(${currentColor[0] - 20}, ${currentColor[1] - 20}, ${currentColor[2] - 20})`;
}

let drawFunction = drawOnSketchpadGrey;

drawSketchpad();



/**
 * Remove the children of wrapper if there are any and populateit
 * with new children according to squareSize and rowLength.
 * @param {Number} squareSize The size (in pixels) of each square.
 * @param {Number} rowLength  The number of squares in each row/column.
 */
function drawSketchpad(rowLength=DEFAULTROWLENGTH){

    let squareSize = SKETCHPADWIDTH / rowLength;
  
    let gridCols = "";
    for (let i=0; i < rowLength; i++) {
      gridCols += "1fr"
    }
  
    sketchpad.setAttribute('style', `grid-template-columns: ${gridCols}; grid-template-rows: ${gridCols};`);

    // Used in several places so store as a a variable.
    let numChildren = sketchpad.children.length;
  
    let numNewSquares = rowLength**2 - numChildren;

    while (numNewSquares < 0) {
        sketchpad.removeChild(sketchpad.children[numChildren - 1]);
        numNewSquares++;
        numChildren--;
    }

    for (let i = 0; i < rowLength**2; i++) {
      let padSquare = document.getElementById(`square-${i}`);
      if (padSquare === null) {
        padSquare = document.createElement('div');
        padSquare.classList.add('sketchpad-square');
        padSquare.setAttribute('id', `square-${i}`);
        sketchpad.appendChild(padSquare);
      }
      
      padSquare.setAttribute('style', `min-width:${squareSize}px; min-height:${squareSize}px; grid-area: ${i % rowLength + 1}`);
      padSquare.style.backgroundColor = 'rgb(204, 204, 204)';
      padSquare.addEventListener('mouseover', drawFunction);

      
    }
}

/**
 * Reset the sketchpad to match its original color.
*/
function clearSketchpad() {
  for (let i = 0; i < sketchpad.children.length; i++) {
    sketchpad.children[i].style.backgroundColor = 'rgb(204, 204, 204)';
  }
}

clearButton = document.getElementById('clear-button');
clearButton.addEventListener('click', clearSketchpad);

/**
 * Change the resolution of the sketchpad using the slider.
 * @param {Event} event
*/
function changeResolution(event) {
  let resolution = +event.target.value;
  if (resolution > 70) {
    resolution = 70;
  }
  else if (resolution < 1) {
    resolution = 1;
  }
  drawSketchpad(resolution);
  resolutionNumber.value = `${resolution}`;
  resolutionSlider.value = `${resolution}`;
  resolutionSliderLabel.innerText = `Resolution: (${resolution} x ${resolution})`;
}

// Let the user change resolution using either a slider or a number field.
resolutionSliderLabel = document.getElementById('resolution-label');
resolutionSlider = document.getElementById('resolution');
resolutionNumber = document.getElementById('resolution-number');

resolutionSlider.value = DEFAULTROWLENGTH;
resolutionNumber.value = DEFAULTROWLENGTH;

resolutionSlider.addEventListener('input', changeResolution);
resolutionNumber.addEventListener('input', changeResolution);

/**
 * Change the (background) color of th sketchpad squares.
 * @param {Event} event The event that calls this function (needs target).
 */
function drawOnSketchpadColor(event) {
    let targetedSquare = document.getElementById(`${event.target.id}`);

    targetedSquare.style.backgroundColor = `rgb(${Math.random()*255 + 1}, ${Math.random()*255 + 1}, ${Math.random()*255 + 1})`;
}

function toggleColor() {
  let oldDrawFunction = drawFunction;
  if (drawFunction === drawOnSketchpadGrey) {
    drawFunction = drawOnSketchpadColor;
    colorButton.innerText = "Toggle Dark";
  }
  else {
    drawFunction = drawOnSketchpadGrey;
    colorButton.innerText = "Toggle Color";
  }
  document.querySelectorAll('.sketchpad-square').forEach( (item, idx) => {item.removeEventListener('mouseover', oldDrawFunction);
 item.addEventListener('mouseover', drawFunction); });
}

let colorButton = document.getElementById('color-button');
colorButton.addEventListener('click', toggleColor);