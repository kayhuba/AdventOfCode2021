"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Day 07, Puzzle 01!");
var line_reader_1 = __importDefault(require("line-reader"));
var crabPositions = [];
line_reader_1.default.eachLine("./input/input.txt", function (line, last) {
    var posRaw = line.split(",");
    posRaw.forEach(function (pos) { return crabPositions.push(parseInt(pos)); });
    if (last) {
        var median_1;
        crabPositions = crabPositions.sort(function (a, b) { return a - b; });
        if (crabPositions.length % 2 === 1) {
            median_1 = crabPositions[(crabPositions.length + 1) / 2 - 1];
        }
        else {
            var high = crabPositions[crabPositions.length / 2];
            var low = crabPositions[crabPositions.length / 2 - 1];
            median_1 = Math.round((high + low) / 2);
        }
        console.log("Horizontal alignment position: " + median_1);
        var totalFuel_1 = 0;
        crabPositions.forEach(function (position) { return totalFuel_1 += Math.abs(median_1 - position); });
        console.log("Total fule required: " + totalFuel_1);
    }
});
//# sourceMappingURL=puzzle01.js.map