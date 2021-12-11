"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Day 11, Puzzle 01!");
var line_reader_1 = __importDefault(require("line-reader"));
var grid = [];
line_reader_1.default.eachLine("./input/input.txt", function (line, last) {
    var gridLine = [];
    line.split("").forEach(function (level) { return gridLine.push(parseInt(level)); });
    grid.push(gridLine);
    if (last) {
        var totalFlashCount_1 = 0;
        var increaseAll_1 = function () {
            // increase all by one
            for (var y = 0; y < grid.length; y++) {
                for (var x = 0; x < grid[y].length; x++) {
                    grid[y][x]++;
                }
            }
        };
        var flash_1 = function () {
            var newGrid = grid.map(function (line) {
                return line.slice();
            });
            var checkedIncreaseOne = function (grid, y, x) {
                if (y < 0 || y >= grid.length) {
                    return;
                }
                if (x < 0 || x >= grid[y].length) {
                    return;
                }
                grid[y][x]++;
            };
            var flashCount = 0;
            for (var y = 0; y < grid.length; y++) {
                for (var x = 0; x < grid[y].length; x++) {
                    if (grid[y][x] > 9) {
                        flashCount++;
                        checkedIncreaseOne(newGrid, y - 1, x - 1);
                        checkedIncreaseOne(newGrid, y - 1, x);
                        checkedIncreaseOne(newGrid, y - 1, x + 1);
                        checkedIncreaseOne(newGrid, y, x - 1);
                        checkedIncreaseOne(newGrid, y, x + 1);
                        checkedIncreaseOne(newGrid, y + 1, x - 1);
                        checkedIncreaseOne(newGrid, y + 1, x);
                        checkedIncreaseOne(newGrid, y + 1, x + 1);
                        // make sure it doesn't flash again in this step: Set to negative infinity
                        newGrid[y][x] = Number.NEGATIVE_INFINITY;
                    }
                }
            }
            grid = newGrid;
            return flashCount;
        };
        var resetFlashed_1 = function () {
            for (var y = 0; y < grid.length; y++) {
                for (var x = 0; x < grid[y].length; x++) {
                    if (grid[y][x] < 0) {
                        grid[y][x] = 0;
                    }
                }
            }
        };
        var step = function () {
            // do the step parts
            increaseAll_1();
            var flashCount = 0;
            do {
                flashCount = flash_1();
                totalFlashCount_1 += flashCount;
            } while (flashCount > 0);
            resetFlashed_1();
        };
        var printGrid = function (grid) {
            for (var y = 0; y < grid.length; y++) {
                var lineString = "";
                for (var x = 0; x < grid[y].length; x++) {
                    lineString += "" + grid[y][x];
                }
                console.log(lineString);
            }
            console.log("");
        };
        console.log("Before start:");
        printGrid(grid);
        for (var i = 0; i < 100; i++) {
            step();
            // printGrid(grid);
        }
        console.log("Final grid:");
        printGrid(grid);
        console.log("Total flash count: " + totalFlashCount_1);
    }
});
//# sourceMappingURL=puzzle01.js.map