"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Day 03, Puzzle 02!");
var line_reader_1 = __importDefault(require("line-reader"));
var division = {
    startsWithBitSet: [],
    startsWithBitUnset: []
};
var assignToDivision = function (position, value, division) {
    if (value.charAt(position) === "1") {
        division.startsWithBitSet.push(value);
    }
    else {
        division.startsWithBitUnset.push(value);
    }
};
var values = [];
line_reader_1.default.eachLine("./input/input.txt", function (line, last) {
    values.push(line);
    if (last) {
        var evalMostOrLeast = function (values, comparator) {
            var pos = 0;
            var remaining = values;
            do {
                remaining.forEach(function (value) { return assignToDivision(pos, value, division); });
                if (comparator(division.startsWithBitSet.length, division.startsWithBitUnset.length)) {
                    remaining = division.startsWithBitSet;
                }
                else {
                    remaining = division.startsWithBitUnset;
                }
                division = {
                    startsWithBitSet: [],
                    startsWithBitUnset: []
                };
                pos++;
            } while (remaining.length > 1);
            return parseInt(remaining[0], 2);
        };
        var mostCommonRating = evalMostOrLeast(values, function (a, b) { return (a >= b); });
        var leastCommonRating = evalMostOrLeast(values, function (a, b) { return (a < b); });
        console.log("Oxygen Generator Rating: " + mostCommonRating);
        console.log("CO2 Scrubber Rating: " + leastCommonRating);
        console.log("Multiple: " + mostCommonRating * leastCommonRating);
    }
});
//# sourceMappingURL=puzzle02.js.map