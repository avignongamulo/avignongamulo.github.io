// This is a small program. There are only two sections. This first section is what runs
// as soon as the page loads and is where you should call your functions.
$(document).ready(function () {
    const $display = $('#display');

    // Multiple TODOs: Call your apply function(s) here
    applyFilter(reddify)
    applyFilter(decreaseBlue)
    applyFilter(increaseGreenByBlue)
    render($display, image);
});

/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////

// TODO 1, 2 & 4: Create the applyFilter function here
function applyFilter(filterFunction){

    for (var r = 0; r < image.length; r++) {

        for (var c = 0; c < image[r].length; c++) {
            rgbString = image[r][c];

            var rgbNumbers = rgbStringToArray(rgbString);
            filterFunction(rgbNumbers)

            rgbString = rgbArrayToString(rgbNumbers)
            image[r][c] = rgbString;
        }

    }

}




// TODO 7: Create the applyFilterNoBackground function
function applyFilterNoBackground(filterFunction){
    for (var r = 0; r < image.length; r++) {

        for (var c = 0; c < image[r].length; c++) {
            rgbString = image[r][c];

            var rgbNumbers = rgbStringToArray(rgbString);
            filterFunction(rgbNumbers)

            rgbString = rgbArrayToString(rgbNumbers)
            image[r][c] = rgbString;
        }

    }

}

// TODO 5: Create the keepInBounds function
function keepInBounds(number) {
    var maxNumber = 255
    var minNumber = 0
    var numberVar = Math.max(number, minNumber)
    return Math.min(numberVar, maxNumber)
}

// TODO 3: Create reddify function
function reddify(array) {
    rgbNumbers[RED] = 200;
}

// TODO 6: Create more filter functions
function decreaseBlue(array) {
    rgbNumbers[BLUE] = keepInBounds(rgbNumbers[BLUE] - 50);
}

function increaseGreenByBlue(array) {
    rgbNumbers[GREEN] = keepInBounds(rgbNumbers[BLUE] + rgbNumbers[GREEN]);
}

// CHALLENGE code goes below here
