'using strict';

// Create the sketch pad squares
const SKETCHPADWIDTH = 600;
const sketchpad = document.getElementById('sketchpad-wrapper');
drawSketchpad();

/**
 * Remove the children of wrapper if there are any and populateit
 * with new children according to squareSize and rowLength.
 * @param {Number} squareSize The size (in pixels) of each square.
 * @param {Number} rowLength  The number of squares in each row/column.
 */
function drawSketchpad(rowLength=16){

    let squareSize = SKETCHPADWIDTH / rowLength;


    // Used in several places so store as a a variable.
    let numChildren = sketchpad.children.length;
  
    let numNewSquares = rowLength**2 - numChildren;

    while (numNewSquares < 0) {
        sketchpad.removeChild(sketchpad.children[numChildren - 1]);
        numNewSquares++;
        numChildren--;
    }

    for (let i = 0; i < rowLength**2; i++) {
      let padSquare = document.getElementById(i);
      if (padSquare === null) {
        padSquare = document.createElement('div');
        padSquare.classList.add('sketchpad-square');
        padSquare.setAttribute('id', `${i}`);
        sketchpad.appendChild(padSquare);
      }

      padSquare.setAttribute('style', `width:${squareSize}px; height:${squareSize}px;`);
      padSquare.style.backgroundColor = 'rgb(204, 204, 204)';
      padSquare.addEventListener('mouseover', drawOnSketchpad);

      
    }
}

/**
 * Change the (background) color of th sketchpad squares.
 * @param {Event} event The event that calls this function (needs target).
 */
function drawOnSketchpad(event) {
    let targetedSquare = document.getElementById(`${event.target.id}`);
    
    let currentColor = targetedSquare.style.backgroundColor;
    currentColor = currentColor.slice(4, -1).split(',')
    currentColor.forEach((item, idx, arr) => arr[idx] = +item);

    targetedSquare.style.backgroundColor = `rgb(${currentColor[0] - 20}, ${currentColor[1] - 20}, ${currentColor[2] - 20})`;
}
