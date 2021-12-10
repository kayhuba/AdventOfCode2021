console.log("Day 09, Puzzle 02!")

import linereader from "line-reader";

interface Vector {
    x: number;
    y: number;
}

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

        let lowPoints: Vector[] = [];
        for (let y=1; y < heightMap.length - 1; y++) {
            for (let x=1; x < heightMap[y].length - 1; x++) {
                if (heightMap[y][x] < heightMap[y-1][x] &&
                    heightMap[y][x] < heightMap[y][x-1] &&
                    heightMap[y][x] < heightMap[y][x+1] &&
                    heightMap[y][x] < heightMap[y+1][x]) {
                    lowPoints.push({x: x, y: y});
                }
            }
        }

        let resetMask = (): number[][] => {
            let mask = [];
            for (let y=0; y < heightMap.length; y++) {
                let maskLine: number[] = [];
                mask.push(maskLine);

                for (let x=0; x < heightMap[y].length; x++) {
                    maskLine.push(9);
                }
            }
            return mask;
        };

        let scanLine = (startPoint: Vector, heightMap: number[][], mask: number[][]) => {
            for (let x=startPoint.x; heightMap[startPoint.y][x] !== 9; x++) {
                mask[startPoint.y][x] = heightMap[startPoint.y][x];

                if (heightMap[startPoint.y-1][x] !== 9 && mask[startPoint.y-1][x] === 9) {
                    scanLine({x: x, y: startPoint.y-1}, heightMap, mask);
                }

                if (heightMap[startPoint.y+1][x] !== 9 && mask[startPoint.y+1][x] === 9) {
                    scanLine({x: x, y: startPoint.y+1}, heightMap, mask);
                }
            }

            for (let x=startPoint.x - 1; heightMap[startPoint.y][x] !== 9; x--) {
                mask[startPoint.y][x] = heightMap[startPoint.y][x];

                if (heightMap[startPoint.y-1][x] !== 9 && mask[startPoint.y-1][x] === 9) {
                    scanLine({x: x, y: startPoint.y-1}, heightMap, mask);
                }

                if (heightMap[startPoint.y+1][x] !== 9 && mask[startPoint.y+1][x] === 9) {
                    scanLine({x: x, y: startPoint.y+1}, heightMap, mask);
                }
            }
        };

        let printMask = (mask: number[][]) => {
            for (let y=1; y < mask.length-1; y++) {
                let line = "";
                for (let x=1; x < mask[y].length-1; x++) {
                    line += mask[y][x] === 9 ? "." : mask[y][x];
                }
                console.log(line);
            }
        };

        // for each lowpoint calculate the basin
        let getBasinSize = (mask: number[][]): number => {
            let basinSize = 0;

            for (let y=1; y < mask.length-1; y++) {
                for (let x=1; x < mask[y].length-1; x++) {
                    if (mask[y][x] !== 9) {
                        basinSize++;
                    }
                }
            }

            return basinSize;
        };

        let basinSizes: number[] = [];
        lowPoints.forEach(lowPoint => {
            let mask = resetMask();
            scanLine(lowPoint, heightMap, mask);
            // printMask(mask);
            // console.log("");

            basinSizes.push(getBasinSize(mask))
        });

        basinSizes = basinSizes.sort((a, b) => b - a);

        console.log("Multple of three largest basins: " + (basinSizes[0] * basinSizes[1] * basinSizes[2]));
    }
});

