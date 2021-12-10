"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Day 09, Puzzle 02!");
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
        var lowPoints = [];
        for (var y = 1; y < heightMap.length - 1; y++) {
            for (var x = 1; x < heightMap[y].length - 1; x++) {
                if (heightMap[y][x] < heightMap[y - 1][x] &&
                    heightMap[y][x] < heightMap[y][x - 1] &&
                    heightMap[y][x] < heightMap[y][x + 1] &&
                    heightMap[y][x] < heightMap[y + 1][x]) {
                    lowPoints.push({ x: x, y: y });
                }
            }
        }
        var resetMask_1 = function () {
            var mask = [];
            for (var y = 0; y < heightMap.length; y++) {
                var maskLine = [];
                mask.push(maskLine);
                for (var x = 0; x < heightMap[y].length; x++) {
                    maskLine.push(9);
                }
            }
            return mask;
        };
        var scanLine_1 = function (startPoint, heightMap, mask) {
            for (var x = startPoint.x; heightMap[startPoint.y][x] !== 9; x++) {
                mask[startPoint.y][x] = heightMap[startPoint.y][x];
                if (heightMap[startPoint.y - 1][x] !== 9 && mask[startPoint.y - 1][x] === 9) {
                    scanLine_1({ x: x, y: startPoint.y - 1 }, heightMap, mask);
                }
                if (heightMap[startPoint.y + 1][x] !== 9 && mask[startPoint.y + 1][x] === 9) {
                    scanLine_1({ x: x, y: startPoint.y + 1 }, heightMap, mask);
                }
            }
            for (var x = startPoint.x - 1; heightMap[startPoint.y][x] !== 9; x--) {
                mask[startPoint.y][x] = heightMap[startPoint.y][x];
                if (heightMap[startPoint.y - 1][x] !== 9 && mask[startPoint.y - 1][x] === 9) {
                    scanLine_1({ x: x, y: startPoint.y - 1 }, heightMap, mask);
                }
                if (heightMap[startPoint.y + 1][x] !== 9 && mask[startPoint.y + 1][x] === 9) {
                    scanLine_1({ x: x, y: startPoint.y + 1 }, heightMap, mask);
                }
            }
        };
        var printMask = function (mask) {
            for (var y = 1; y < mask.length - 1; y++) {
                var line_1 = "";
                for (var x = 1; x < mask[y].length - 1; x++) {
                    line_1 += mask[y][x] === 9 ? "." : mask[y][x];
                }
                console.log(line_1);
            }
        };
        // for each lowpoint calculate the basin
        var getBasinSize_1 = function (mask) {
            var basinSize = 0;
            for (var y = 1; y < mask.length - 1; y++) {
                for (var x = 1; x < mask[y].length - 1; x++) {
                    if (mask[y][x] !== 9) {
                        basinSize++;
                    }
                }
            }
            return basinSize;
        };
        var basinSizes_1 = [];
        lowPoints.forEach(function (lowPoint) {
            var mask = resetMask_1();
            scanLine_1(lowPoint, heightMap, mask);
            // printMask(mask);
            // console.log("");
            basinSizes_1.push(getBasinSize_1(mask));
        });
        basinSizes_1 = basinSizes_1.sort(function (a, b) { return b - a; });
        console.log("Multple of three largest basins: " + (basinSizes_1[0] * basinSizes_1[1] * basinSizes_1[2]));
    }
});
//# sourceMappingURL=puzzle02.js.map