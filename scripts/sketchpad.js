'using strict';

// Create the sketch pad squares
const sketchpad = document.getElementById('sketchpad-wrapper');
drawSketchpad();

/**
 * Remove the children of wrapper if there are any and populateit
 * with new children according to squareSize and rowLength.
 * @param {Number} squareSize The size (in pixels) of each square.
 * @param {Number} rowLength  The number of squares in each row/column.
 */
function drawSketchpad(rowLength=4){

    let squareSize = Math.round(600 / rowLength);

    // Adjust size so flexbox works as intended.
    // sketchpad.style.width = `${squareSize*(rowLength)}px`;
    // sketchpad.style.height = `${squareSize*(rowLength)}px`;

    // Used in several places so store asa a variable.
    let numChildren = sketchpad.children.length;
    let numNewSquares = rowLength**2 - numChildren;

    while (numNewSquares < 0) {
        sketchpad.removeChild(sketchpad.children[numChildren - 1]);
        numNewSquares++;
    }

    if (numNewSquares > 0) {
        for (let i = numChildren; i < rowLength**2; i++) {
            let padSquare = document.createElement('div');
            padSquare.classList.add('sketchpad-square');
            padSquare.setAttribute('id', `${i}`);
            padSquare.setAttribute('style', `width:${squareSize}px; height:${squareSize}px;`);
            padSquare.style.backgroundColor = 'rgb(204, 204, 204)';
            padSquare.addEventListener('mouseover', drawOnSketchpad);
            
            sketchpad.appendChild(padSquare);
        }
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

