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
    static fromTo(from, to) {
        if (from.y !== to.y) {
            if (from.y < to.y) {
                return Direction.DOWN;
            }
            else {
                return Direction.UP;
            }
        }
        if (from.x !== to.x) {
            if (from.x < to.x) {
                return Direction.RIGHT;
            }
            else {
                return Direction.LEFT;
            }
        }
        return Direction.NONE;
    }
    static move(from, direction) {
        switch (direction) {
            case Direction.UP:
                return { y: from.y - 1, x: from.x };
            case Direction.RIGHT:
                return { y: from.y, x: from.x + 1 };
            case Direction.DOWN:
                return { y: from.y + 1, x: from.x };
            case Direction.LEFT:
                return { y: from.y, x: from.x - 1 };
        }
        return from;
    }
}
Direction.NONE = new Direction(0, 0, 0);
Direction.LEFT = new Direction(-1, 0, -1);
Direction.UP = new Direction(0, -1, -2);
Direction.RIGHT = new Direction(1, 0, 1);
Direction.DOWN = new Direction(0, 1, 2);
let maxX = 0;
let riskMap = [];
line_reader_1.default.eachLine("./input/input.txt", (line, last) => {
    if (line.length > 0) {
        let horizontalLine = [];
        line.split("").forEach(riskLevel => horizontalLine.push(parseInt(riskLevel)));
        riskMap.push(horizontalLine);
        maxX = horizontalLine.length - 1;
    }
    if (last) {
        let bestPathDirectionMap = [];
        let gMap = [];
        let maxY = riskMap.length - 1;
        let gLine = riskMap[0].map(value => 0);
        riskMap.forEach(value => gMap.push([...gLine]));
        let directionLine = riskMap[0].map(value => Direction.NONE);
        riskMap.forEach(value => bestPathDirectionMap.push([...directionLine]));
        // the h function
        let estimatedPathLength = (position) => {
            let pathLength = 0;
            pathLength += maxX - position.x;
            pathLength += maxY - position.y;
            return pathLength;
        };
        // openList: Map offset to f-value
        let openList = new Map();
        // closedList: Just use the offset as the key
        let closedList = new Set();
        // attempt: a* pathfinding algorithm
        let evaluatePath = () => {
            let positionFromOffset = (offset) => {
                return { y: Math.floor(offset / (maxX + 1)), x: offset % (maxX + 1) };
            };
            let offsetFromPosition = (position) => {
                return position.y * (maxX + 1) + position.x;
            };
            let addIfValid = (position, array) => {
                if (position.x >= 0 && position.x <= maxX && position.y >= 0 && position.y <= maxY) {
                    array.push(position);
                }
            };
            let expand = (current) => {
                let successors = [];
                // do NOT use diagonal ones!
                addIfValid({ x: current.x, y: current.y - 1 }, successors);
                addIfValid({ x: current.x - 1, y: current.y }, successors);
                addIfValid({ x: current.x + 1, y: current.y }, successors);
                addIfValid({ x: current.x, y: current.y + 1 }, successors);
                successors.forEach(successor => {
                    let successorOffset = offsetFromPosition(successor);
                    if (closedList.has(successorOffset)) {
                        return;
                    }
                    let tentativeG = gMap[current.y][current.x] + riskMap[successor.y][successor.x];
                    // we found a new path to successor, if it is not better, ignore the new path
                    if (openList.has(successorOffset) && tentativeG >= gMap[successor.y][successor.x]) {
                        return;
                    }
                    bestPathDirectionMap[successor.y][successor.x] = Direction.fromTo(successor, current);
                    gMap[successor.y][successor.x] = tentativeG;
                    let f = tentativeG + estimatedPathLength(successor);
                    openList.set(successorOffset, f);
                });
            };
            let pathFound = false;
            do {
                let sortedOpenList = Array.from(openList.entries()).sort((a, b) => a[1] - b[1]);
                let current = sortedOpenList[0][0];
                openList.delete(current);
                if (current === maxY * maxX) {
                    // Path found - not sure whether we should really abort here, though (I think this is a mistake)
                    pathFound = true;
                }
                closedList.add(current);
                expand(positionFromOffset(current));
            } while (openList.size > 0);
            return pathFound;
        };
        openList.set(0, 0);
        let pathFound = evaluatePath();
        let createPathMap = () => {
            let pathMap = [];
            for (let y = 0; y <= maxY; y++) {
                let pathLine = [];
                for (let x = 0; x <= maxX; x++) {
                    pathLine.push(false);
                }
                pathMap.push(pathLine);
            }
            return pathMap;
        };
        let printBestPathAndCountTotalRisk = () => {
            let pathMap = createPathMap();
            let current = { y: maxY, x: maxX };
            let totalRisk = 0;
            do {
                totalRisk += riskMap[current.y][current.x];
                pathMap[current.y][current.x] = true;
                current = Direction.move(current, bestPathDirectionMap[current.y][current.x]);
            } while (current.y > 0 || current.x > 0);
            pathMap[current.y][current.x] = true;
            console.log("Path Map");
            for (let y = 0; y <= maxY; y++) {
                let pathLine = "";
                for (let x = 0; x <= maxX; x++) {
                    pathLine += pathMap[y][x] ? "x" : ".";
                }
                console.log(pathLine);
            }
            return totalRisk;
        };
        let totalRisk = printBestPathAndCountTotalRisk();
        console.log(`Lowest total risk: ${totalRisk}`);
    }
});
//# sourceMappingURL=puzzle01.js.map