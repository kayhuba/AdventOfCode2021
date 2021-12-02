console.log("Day 02, Puzzle 01!")

import linereader from "line-reader";

let depth = 0;
let position = 0;
let aim = 0;
linereader.eachLine("./input/input.txt", (line, last) => {
    let parsedLine = line.split(" ");
    let operation = parsedLine[0];
    let amount = parseInt(parsedLine[1]);

    switch (operation) {
        case "forward":
            position += amount;
            depth += aim * amount;
            break;
        case "down":
            aim += amount;
            break;
        case "up":
            aim -= amount;
            break;
    }

    if (last) {
        console.log("Multiple of horizontal and depth: " + position * depth);
    }
});

