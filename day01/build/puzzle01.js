"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Day 01, Puzzle 01!");
var line_reader_1 = __importDefault(require("line-reader"));
var increaseCount = 0;
var lastNumber = Number.POSITIVE_INFINITY;
line_reader_1.default.eachLine("./input/input.txt", function (line, last) {
    var currentNumber = parseInt(line);
    if (lastNumber < currentNumber) {
        increaseCount++;
    }
    lastNumber = currentNumber;
    if (last) {
        console.log("Total count of increases: " + increaseCount);
    }
});
//# sourceMappingURL=puzzle01.js.map