"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Day 02, Puzzle 01!");
var line_reader_1 = __importDefault(require("line-reader"));
var depth = 0;
var position = 0;
var aim = 0;
line_reader_1.default.eachLine("./input/input.txt", function (line, last) {
    var parsedLine = line.split(" ");
    var operation = parsedLine[0];
    var amount = parseInt(parsedLine[1]);
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
//# sourceMappingURL=puzzle02.js.map