"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Day 07, Puzzle 02!");
var line_reader_1 = __importDefault(require("line-reader"));
var minPosition = Number.POSITIVE_INFINITY;
var maxPosition = Number.NEGATIVE_INFINITY;
var crabPositions = [];
line_reader_1.default.eachLine("./input/input.txt", function (line, last) {
    var posRaw = line.split(",");
    posRaw.forEach(function (posRaw) {
        var pos = parseInt(posRaw);
        minPosition = Math.min(pos, minPosition);
        maxPosition = Math.max(pos, maxPosition);
        crabPositions.push(pos);
    });
    if (last) {
        var calculateFuel = function (alignmentPosition) {
            var totalFuel = 0;
            crabPositions.forEach(function (position) { return totalFuel += 0.5 * Math.abs(alignmentPosition - position) * (Math.abs(alignmentPosition - position) + 1); });
            return totalFuel;
        };
        var minimalFuel = Number.POSITIVE_INFINITY;
        var alignmentPosition = -1;
        for (var i = minPosition; i <= maxPosition; i++) {
            var fuel = calculateFuel(i);
            if (fuel < minimalFuel) {
                minimalFuel = fuel;
                alignmentPosition = i;
            }
        }
        console.log("Alignment position: " + alignmentPosition);
        console.log("Total fuel required: " + minimalFuel);
    }
});
//# sourceMappingURL=puzzle02.js.map