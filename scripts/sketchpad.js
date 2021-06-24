'using strict';

// Create the sketch pad items.
const sketchpad = document.getElementById('sketchpad-wrapper');
drawSketchpad();

/**
 * Remove the children of wrapper if there are any and populateit
 * with new children according to squareSize and rowLength.
 * @param {Number} squareSize The size (in pixels) of each square.
 * @param {Number} rowLength  The number of squares in each row/column.
 */
function drawSketchpad(squareSize=50, rowLength=3){
    for (let i = 0; i < rowLength**2; i++) {
        let padSquare = document.createElement('div');
        padSquare.classList.add('sketchpad-square');
        padSquare.setAttribute('id', `${i}`);
        padSquare.setAttribute('style', `width:${squareSize}px; height:${squareSize}px;`);

        sketchpad.appendChild(padSquare);
    }
}