console.log("Day 08, Puzzle 01!")

import linereader from "line-reader";

let specialDigitCount = 0;
linereader.eachLine("./input/input.txt", (line, last) => {
    let mainSplit = line.split(" | ");
    let uniqueSignalPattern = mainSplit[0].split(" ");
    let fourDigitOutputValue = mainSplit[1].split(" ");

    fourDigitOutputValue.forEach(value => (value.length === 2 || value.length === 3 || value.length === 4 || value.length === 7) ? specialDigitCount++ : 0);

    if (last) {
        console.log("Count of 1, 4, 7, or 8: " + specialDigitCount);
    }
});

