"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Day 09, Puzzle 01!");
var line_reader_1 = __importDefault(require("line-reader"));
var heightMap = [];
line_reader_1.default.eachLine("./input/input.txt", function (line, last) {
    var heightLine = [];
    heightLine.push(9);
    line.split("").forEach(function (digit) { return heightLine.push(parseInt(digit)); });
    heightLine.push(9);
    var addFirstLastLine = function () {
        var dummyLine = [];
        for (var i = 0; i < heightLine.length; i++) {
            dummyLine.push(9);
        }
        heightMap.push(dummyLine);
    };
    if (heightMap.length === 0) {
        addFirstLastLine();
    }
    heightMap.push(heightLine);
    if (last) {
        addFirstLastLine();
        var riskLevelSum = 0;
        for (var y = 1; y < heightMap.length - 1; y++) {
            for (var x = 1; x < heightMap[y].length - 1; x++) {
                if (heightMap[y][x] < heightMap[y - 1][x] &&
                    heightMap[y][x] < heightMap[y][x - 1] &&
                    heightMap[y][x] < heightMap[y][x + 1] &&
                    heightMap[y][x] < heightMap[y + 1][x]) {
                    riskLevelSum += 1 + heightMap[y][x];
                }
            }
        }
        console.log("Sum of risk level of all low points: " + riskLevelSum);
    }
});
//# sourceMappingURL=puzzle01.js.map