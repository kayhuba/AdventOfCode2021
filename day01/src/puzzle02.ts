console.log("Day 01, Puzzle 02!")

import linereader from "line-reader";

let lineNumber = 0;
let increaseCount = 0;
let lastWindow = Number.POSITIVE_INFINITY;
let currentWindow = 0;

let previous = 0;
let previousPrevious = 0;
let previousPreviousPrevious = 0;

linereader.eachLine("./input/input.txt", (line, last) => {
    let currentNumber = parseInt(line);

    currentWindow += currentNumber - previousPreviousPrevious;

    previousPreviousPrevious = previousPrevious;
    previousPrevious = previous;
    previous = currentNumber;

    lineNumber++;
    if (lineNumber < 3) {
        return;
    }

    if (lastWindow < currentWindow) {
        increaseCount++;
    }

    lastWindow = currentWindow;

    if (last) {
        console.log("Total count of increases: " + increaseCount);
    }
});

