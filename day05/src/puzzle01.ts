console.log("Day 05, Puzzle 01!")

import linereader from "line-reader";

interface Vector {
    x: number
    y: number
}

interface LineSegment {
    start: Vector
    end: Vector
}

let maxX = 0;
let maxY = 0;
let segments: LineSegment[] = [];
linereader.eachLine("./input/input.txt", (line, last) => {
    let segmentRaw = line.split(" -> ");
    let v1Raw = segmentRaw[0].split(",");
    let v2Raw = segmentRaw[1].split(",");

    let v1: Vector = {
        x: parseInt(v1Raw[0]),
        y: parseInt(v1Raw[1])
    }
    let v2: Vector =  {
        x: parseInt(v2Raw[0]),
        y: parseInt(v2Raw[1])
    }

    let lineSegment: LineSegment;
    if (v1.x <= v2.x && v1.y <= v2.y) {
        lineSegment = {
            start: v1,
            end: v2
        }
    } else {
        lineSegment = {
            start: v2,
            end: v1
        }
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

        let coordinateSystem: number[][] = [];
        for (let y=0; y < maxY; y++) {
            let horizontalLine: number[] = [];
            for (let x=0; x < maxX; x++) {
                horizontalLine.push(0);
            }
            coordinateSystem.push(horizontalLine);
        }

        let drawLineSegment = (segment: LineSegment, coordinateSystem: number[][]) => {
            for (let y=segment.start.y; y <= segment.end.y; y++) {
                for (let x = segment.start.x; x <= segment.end.x; x++) {
                    coordinateSystem[y][x]++;
                }
            }
        };

        let printCoordinateSystem = (coordinateSystem: number[][]) => {
            console.log("Current Diagram:");

            for (let y=0; y < coordinateSystem.length; y++) {
                let lineDots = "";
                for (let x = 0; x < coordinateSystem[y].length; x++) {
                    lineDots += coordinateSystem[y][x] === 0 ? "." : coordinateSystem[y][x];
                }
                console.log(lineDots);
            }
        };

        let examineCoordinateSystem = (coordinateSystem: number[][]): number => {
            let count = 0;
            for (let y=0; y < coordinateSystem.length; y++) {
                for (let x = 0; x < coordinateSystem[y].length; x++) {
                    if (coordinateSystem[y][x] > 1) {
                        count++;
                    }
                }
            }
            return count;
        };

        segments.forEach(segment => drawLineSegment(segment, coordinateSystem));
        // printCoordinateSystem(coordinateSystem); // not so useful with the real puzzle input as the system is very large...

        console.log("Number of overlapping lines: " + examineCoordinateSystem(coordinateSystem));
    }
});

