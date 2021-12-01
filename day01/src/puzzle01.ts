console.log("Day 01, Puzzle 01!")

import linereader from "line-reader";

let increaseCount = 0;
let lastNumber = Number.POSITIVE_INFINITY;
linereader.eachLine("./input/input.txt", (line, last) => {
    let currentNumber = parseInt(line);
    if (lastNumber < currentNumber) {
        increaseCount++;
    }
    lastNumber = currentNumber;

    if (last) {
        console.log("Total count of increases: " + increaseCount);
    }
});

