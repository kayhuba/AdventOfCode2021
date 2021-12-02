console.log("Day 02, Puzzle 01!")

import linereader from "line-reader";

let depth = 0;
let position = 0;
linereader.eachLine("./input/input.txt", (line, last) => {
    let parsedLine = line.split(" ");
    let operation = parsedLine[0];
    let amount = parseInt(parsedLine[1]);

    switch (operation) {
        case "forward":
            position += amount;
            break;
        case "down":
            depth += amount;
            break;
        case "up":
            depth -= amount;
            break;
    }

    if (last) {
        console.log("Multiple of horizontal and depth: " + position * depth);
    }
});

