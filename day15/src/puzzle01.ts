console.log("Day 15, Puzzle 01!")

import linereader from "line-reader";

interface Position {
    x: number
    y: number
}

class Direction {
    static readonly NONE = new Direction(0, 0, 0);
    static readonly LEFT = new Direction(-1, 0, -1);
    static readonly UP = new Direction(0, -1, -2);
    static readonly RIGHT = new Direction(1, 0, 1);
    static readonly DOWN = new Direction(0, 1, 2);

    readonly moveX: number;
    readonly moveY: number;
    readonly ordinal: number;

    static opposite(direction: Direction): Direction {
        return new Direction(0 - direction.moveX, 0 - direction.moveY, 0 - direction.ordinal);
    }

    static readonly ALL_EXCEPT: Map<number, Direction[]> = new Map<number, Direction[]>([
        [Direction.NONE.ordinal,    [Direction.LEFT, Direction.UP, Direction.RIGHT, Direction.DOWN]],
        [Direction.LEFT.ordinal,    [Direction.RIGHT, Direction.DOWN, Direction.UP]],
        [Direction.UP.ordinal,      [Direction.RIGHT, Direction.DOWN, Direction.LEFT]],
        [Direction.RIGHT.ordinal,   [Direction.DOWN, Direction.LEFT, Direction.UP]],
        [Direction.DOWN.ordinal,    [Direction.RIGHT, Direction.DOWN, Direction.LEFT, Direction.UP]],
        [Direction.NONE.ordinal,    [Direction.RIGHT, Direction.LEFT, Direction.UP]],
    ]);

    static allExcept(direction: Direction): Direction[] {
        // @ts-ignore
        return Direction.ALL_EXCEPT.get(direction.ordinal);
    }

    public constructor(moveX: number, moveY: number, ordinal: number) {
        this.moveX = moveX;
        this.moveY = moveY;
        this.ordinal = ordinal;
    }
}

let maxX = 0;
let maxY = 0;
let riskMap: number[][] = [];
linereader.eachLine("./input/input.txt", (line, last) => {
    let horizontalLine: number[] = [];
    line.split("").forEach(riskLevel => horizontalLine.push(parseInt(riskLevel)));
    riskMap.push(horizontalLine);
    maxX = horizontalLine.length;

    if (last) {
        maxY = riskMap.length;

        // attempt: brute force - check all paths from "start" to "target" and weigh them
        let evaluatePath = (position: Position, moveFrom: Direction, path: Position[], pathMap: boolean[][]): number => {
            let risk = riskMap[position.y][position.x];
            pathMap[position.y][position.x] = true;
            path.push(position);

            if (position.x === maxX - 1 && position.y === maxY - 1) {
                return risk;
            }

            let bestPathRisk = Number.POSITIVE_INFINITY;
            let bestPath: Position[] = [];
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

                let newPathMap: boolean[][] = pathMap.map(line => line.slice());
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

        let createPathMap = (): boolean[][] => {
            let pathMap: boolean[][] = [];
            for (let y=0; y < maxY; y++) {
                let pathLine: boolean[] = [];
                for (let x=0; x < maxX; x++) {
                    pathLine.push(false);
                }
                pathMap.push(pathLine);
            }
            return pathMap;
        };

        let pathMap = createPathMap();
        let bestPath: Position[] = [];
        let risk = evaluatePath({x:0,y:0}, Direction.NONE, bestPath, pathMap);

        let printBestPath = (bestPath: Position[]) => {
            let pathMap = createPathMap();

            bestPath.forEach(position => pathMap[position.y][position.x] = true);

            console.log("Path Map");
            for (let y=0; y < maxY; y++) {
                let pathLine = "";
                for (let x=0; x < maxX; x++) {
                    pathLine += pathMap[y][x] ? "x" : ".";
                }
                console.log(pathLine);
            }
        };

        printBestPath(bestPath);

        console.log(`Lowest total risk: ${risk}`);
    }
});

