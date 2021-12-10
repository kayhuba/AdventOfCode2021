console.log("Day 09, Puzzle 01!")

import linereader from "line-reader";

let heightMap: number[][] = [];
linereader.eachLine("./input/input.txt", (line, last) => {

    let heightLine: number[] = [];
    heightLine.push(9);
    line.split("").forEach(digit => heightLine.push(parseInt(digit)));
    heightLine.push(9);

    let addFirstLastLine = () => {
        let dummyLine: number[] = [];
        for(let i=0; i < heightLine.length; i++) {
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

        let riskLevelSum = 0;
        for (let y=1; y < heightMap.length - 1; y++) {
            for (let x=1; x < heightMap[y].length - 1; x++) {
                if (heightMap[y][x] < heightMap[y-1][x] &&
                    heightMap[y][x] < heightMap[y][x-1] &&
                    heightMap[y][x] < heightMap[y][x+1] &&
                    heightMap[y][x] < heightMap[y+1][x]) {
                    riskLevelSum += 1 + heightMap[y][x];
                }
            }
        }

        console.log("Sum of risk level of all low points: " + riskLevelSum);
    }
});

