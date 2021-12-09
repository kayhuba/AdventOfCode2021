"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Day 08, Puzzle 01!");
var line_reader_1 = __importDefault(require("line-reader"));
var specialDigitCount = 0;
line_reader_1.default.eachLine("./input/input.txt", function (line, last) {
    var mainSplit = line.split(" | ");
    var uniqueSignalPattern = mainSplit[0].split(" ");
    var fourDigitOutputValue = mainSplit[1].split(" ");
    fourDigitOutputValue.forEach(function (value) { return (value.length === 2 || value.length === 3 || value.length === 4 || value.length === 7) ? specialDigitCount++ : 0; });
    if (last) {
        console.log("Count of 1, 4, 7, or 8: " + specialDigitCount);
    }
});
//# sourceMappingURL=puzzle01.js.map