"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Day 05, Puzzle 01!");
var line_reader_1 = __importDefault(require("line-reader"));
var maxX = 0;
var maxY = 0;
var segments = [];
line_reader_1.default.eachLine("./input/input.txt", function (line, last) {
    var segmentRaw = line.split(" -> ");
    var v1Raw = segmentRaw[0].split(",");
    var v2Raw = segmentRaw[1].split(",");
    var v1 = {
        x: parseInt(v1Raw[0]),
        y: parseInt(v1Raw[1])
    };
    var v2 = {
        x: parseInt(v2Raw[0]),
        y: parseInt(v2Raw[1])
    };
    var lineSegment;
    if (v1.x <= v2.x && v1.y <= v2.y) {
        lineSegment = {
            start: v1,
            end: v2
        };
    }
    else {
        lineSegment = {
            start: v2,
            end: v1
        };
    }
    // for now only consider horizontal or vertical lines - it says
    if (lineSegment.start.x === lineSegment.end.x || lineSegment.start.y === lineSegment.end.y) {
        segments.push(lineSegment);
        maxX = Math.max(maxX, lineSegment.end.x);
        maxY = Math.max(maxY, lineSegment.end.y);
    }
    if (last) {
        maxX++;
        maxY++;
        var coordinateSystem_1 = [];
        for (var y = 0; y < maxY; y++) {
            var horizontalLine = [];
            for (var x = 0; x < maxX; x++) {
                horizontalLine.push(0);
            }
            coordinateSystem_1.push(horizontalLine);
        }
        var drawLineSegment_1 = function (segment, coordinateSystem) {
            for (var y = segment.start.y; y <= segment.end.y; y++) {
                for (var x = segment.start.x; x <= segment.end.x; x++) {
                    coordinateSystem[y][x]++;
                }
            }
        };
        var printCoordinateSystem = function (coordinateSystem) {
            console.log("Current Diagram:");
            for (var y = 0; y < coordinateSystem.length; y++) {
                var lineDots = "";
                for (var x = 0; x < coordinateSystem[y].length; x++) {
                    lineDots += coordinateSystem[y][x] === 0 ? "." : coordinateSystem[y][x];
                }
                console.log(lineDots);
            }
        };
        var examineCoordinateSystem = function (coordinateSystem) {
            var count = 0;
            for (var y = 0; y < coordinateSystem.length; y++) {
                for (var x = 0; x < coordinateSystem[y].length; x++) {
                    if (coordinateSystem[y][x] > 1) {
                        count++;
                    }
                }
            }
            return count;
        };
        segments.forEach(function (segment) { return drawLineSegment_1(segment, coordinateSystem_1); });
        // printCoordinateSystem(coordinateSystem); // not so useful with the real puzzle input as the system is very large...
        console.log("Number of overlapping lines: " + examineCoordinateSystem(coordinateSystem_1));
    }
});
//# sourceMappingURL=puzzle01.js.map