"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Day 01, Puzzle 02!");
var line_reader_1 = __importDefault(require("line-reader"));
var lineNumber = 0;
var increaseCount = 0;
var lastWindow = Number.POSITIVE_INFINITY;
var currentWindow = 0;
var previous = 0;
var previousPrevious = 0;
var previousPreviousPrevious = 0;
line_reader_1.default.eachLine("./input/input.txt", function (line, last) {
    var currentNumber = parseInt(line);
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
//# sourceMappingURL=puzzle02.js.map