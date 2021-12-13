"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Day 13, Puzzle 02!");
const line_reader_1 = __importDefault(require("line-reader"));
var Axis;
(function (Axis) {
    Axis[Axis["Y_AXIS"] = 0] = "Y_AXIS";
    Axis[Axis["X_AXIS"] = 1] = "X_AXIS";
})(Axis || (Axis = {}));
let maxX = Number.NEGATIVE_INFINITY;
let maxY = Number.NEGATIVE_INFINITY;
let coordinates = [];
let folds = [];
line_reader_1.default.eachLine("./input/input.txt", (line, last) => {
    if (line.startsWith("fold along ")) {
        line = line.substring("fold along ".length);
        let foldRaw = line.split("=");
        folds.push({
            axis: foldRaw[0] === "y" ? Axis.Y_AXIS : Axis.X_AXIS,
            position: parseInt(foldRaw[1])
        });
    }
    else if (line.trim().length > 0) {
        let coordinatesRaw = line.split(",");
        coordinates.push({
            x: parseInt(coordinatesRaw[0]),
            y: parseInt(coordinatesRaw[1])
        });
        maxX = Math.max(maxX, parseInt(coordinatesRaw[0]));
        maxY = Math.max(maxY, parseInt(coordinatesRaw[1]));
    }
    if (last) {
        let printPaper = (paper) => {
            if (paper.length > 50) {
                return;
            }
            for (let y = 0; y < paper.length; y++) {
                let paperLine = "";
                for (let x = 0; x < paper[y].length; x++) {
                    paperLine += paper[y][x] ? "#" : ".";
                }
                console.log(paperLine);
            }
            console.log();
        };
        let transparentPaper = [];
        for (let y = 0; y < maxY + 1; y++) {
            let paperLine = [];
            for (let x = 0; x < maxX + 1; x++) {
                paperLine.push(false);
            }
            transparentPaper.push(paperLine);
        }
        coordinates.forEach(coordinate => {
            transparentPaper[coordinate.y][coordinate.x] = true;
        });
        printPaper(transparentPaper);
        let doFold = (transparentPaper, fold) => {
            let height = transparentPaper.length;
            let foldedPaper = [];
            if (fold.axis === Axis.Y_AXIS) {
                for (let y = 0; y < fold.position; y++) {
                    let paperLine = [];
                    for (let x = 0; x < transparentPaper[y].length; x++) {
                        paperLine.push(transparentPaper[y][x] || transparentPaper[height - 1 - y][x]);
                    }
                    foldedPaper.push(paperLine);
                }
            }
            else if (fold.axis === Axis.X_AXIS) {
                for (let y = 0; y < transparentPaper.length; y++) {
                    let paperLine = [];
                    let width = transparentPaper[y].length;
                    for (let x = 0; x < fold.position; x++) {
                        paperLine.push(transparentPaper[y][x] || transparentPaper[y][width - 1 - x]);
                    }
                    foldedPaper.push(paperLine);
                }
            }
            return foldedPaper;
        };
        // fold all
        folds.forEach(fold => {
            transparentPaper = doFold(transparentPaper, fold);
            printPaper(transparentPaper);
        });
        console.log("Look at the last paper print - it contains 8 capital letters. This is the solution");
    }
});
//# sourceMappingURL=puzzle02.js.map