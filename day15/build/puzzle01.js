"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Day 15, Puzzle 01!");
const line_reader_1 = __importDefault(require("line-reader"));
class Direction {
    constructor(moveX, moveY, ordinal) {
        this.moveX = moveX;
        this.moveY = moveY;
        this.ordinal = ordinal;
    }
    static opposite(direction) {
        return new Direction(0 - direction.moveX, 0 - direction.moveY, 0 - direction.ordinal);
    }
    static allExcept(direction) {
        // @ts-ignore
        return Direction.ALL_EXCEPT.get(direction.ordinal);
    }
}
Direction.NONE = new Direction(0, 0, 0);
Direction.LEFT = new Direction(-1, 0, -1);
Direction.UP = new Direction(0, -1, -2);
Direction.RIGHT = new Direction(1, 0, 1);
Direction.DOWN = new Direction(0, 1, 2);
Direction.ALL_EXCEPT = new Map([
    [Direction.NONE.ordinal, [Direction.LEFT, Direction.UP, Direction.RIGHT, Direction.DOWN]],
    [Direction.LEFT.ordinal, [Direction.RIGHT, Direction.DOWN, Direction.UP]],
    [Direction.UP.ordinal, [Direction.RIGHT, Direction.DOWN, Direction.LEFT]],
    [Direction.RIGHT.ordinal, [Direction.DOWN, Direction.LEFT, Direction.UP]],
    [Direction.DOWN.ordinal, [Direction.RIGHT, Direction.DOWN, Direction.LEFT, Direction.UP]],
    [Direction.NONE.ordinal, [Direction.RIGHT, Direction.LEFT, Direction.UP]],
]);
let maxX = 0;
let maxY = 0;
let riskMap = [];
line_reader_1.default.eachLine("./input/input.txt", (line, last) => {
    let horizontalLine = [];
    line.split("").forEach(riskLevel => horizontalLine.push(parseInt(riskLevel)));
    riskMap.push(horizontalLine);
    maxX = horizontalLine.length;
    if (last) {
        maxY = riskMap.length;
        // attempt: brute force - check all paths from "start" to "target" and weigh them
        let evaluatePath = (position, moveFrom, path, pathMap) => {
            let risk = riskMap[position.y][position.x];
            pathMap[position.y][position.x] = true;
            path.push(position);
            if (position.x === maxX - 1 && position.y === maxY - 1) {
                return risk;
            }
            let bestPathRisk = Number.POSITIVE_INFINITY;
            let bestPath = [];
            let directions = Direction.allExcept(moveFrom);
            directions.forEach(direction => {
                let newPosition = {
                    x: position.x + direction.moveX,
                    y: position.y + direction.moveY
                };
                if (newPosition.x < 0 || newPosition.x >= maxX) {
                    return;
                }
                if (newPosition.y < 0 || newPosition.y >= maxY) {
                    return;
                }
                if (pathMap[newPosition.y][newPosition.x]) {
                    return;
                }
                let newPathMap = pathMap.map(line => line.slice());
                let newPath = [...path];
                let risk = evaluatePath(newPosition, Direction.opposite(direction), newPath, newPathMap);
                if (risk < bestPathRisk) {
                    bestPath = newPath;
                    bestPathRisk = risk;
                }
            });
            path.push(...bestPath);
            return risk + bestPathRisk;
        };
        let createPathMap = () => {
            let pathMap = [];
            for (let y = 0; y < maxY; y++) {
                let pathLine = [];
                for (let x = 0; x < maxX; x++) {
                    pathLine.push(false);
                }
                pathMap.push(pathLine);
            }
            return pathMap;
        };
        let pathMap = createPathMap();
        let bestPath = [];
        let risk = evaluatePath({ x: 0, y: 0 }, Direction.NONE, bestPath, pathMap);
        let printBestPath = (bestPath) => {
            let pathMap = createPathMap();
            bestPath.forEach(position => pathMap[position.y][position.x] = true);
            console.log("Path Map");
            for (let y = 0; y < maxY; y++) {
                let pathLine = "";
                for (let x = 0; x < maxX; x++) {
                    pathLine += pathMap[y][x] ? "x" : ".";
                }
                console.log(pathLine);
            }
        };
        printBestPath(bestPath);
        console.log(`Lowest total risk: ${risk}`);
    }
});
//# sourceMappingURL=puzzle01.js.map