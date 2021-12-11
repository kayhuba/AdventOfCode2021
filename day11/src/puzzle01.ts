console.log("Day 11, Puzzle 01!")

import linereader from "line-reader";

let grid: number[][] = [];
linereader.eachLine("./input/input.txt", (line, last) => {
    let gridLine: number[] = [];
    line.split("").forEach(level => gridLine.push(parseInt(level)));
    grid.push(gridLine);

    if (last) {
        let totalFlashCount = 0;

        let increaseAll = () => {
            // increase all by one
            for (let y=0; y < grid.length; y++) {
                for (let x=0; x < grid[y].length; x++) {
                    grid[y][x]++;
                }
            }
        };

        let flash = (): number => {
            let newGrid: number[][] = grid.map((line) => {
                return line.slice();
            });

            let checkedIncreaseOne = (grid: number[][], y: number, x: number) => {
                if (y < 0 || y >= grid.length) {
                    return;
                }

                if (x < 0 || x >= grid[y].length) {
                    return;
                }

                grid[y][x]++;
            };

            let flashCount = 0;
            for (let y=0; y < grid.length; y++) {
                for (let x=0; x < grid[y].length; x++) {
                    if (grid[y][x] > 9) {
                        flashCount++;

                        checkedIncreaseOne(newGrid, y-1, x-1);
                        checkedIncreaseOne(newGrid, y-1, x);
                        checkedIncreaseOne(newGrid, y-1, x+1);

                        checkedIncreaseOne(newGrid, y, x-1);
                        checkedIncreaseOne(newGrid, y, x+1);

                        checkedIncreaseOne(newGrid, y+1, x-1);
                        checkedIncreaseOne(newGrid, y+1, x);
                        checkedIncreaseOne(newGrid, y+1, x+1);

                        // make sure it doesn't flash again in this step: Set to negative infinity
                        newGrid[y][x] = Number.NEGATIVE_INFINITY;
                    }
                }
            }

            grid = newGrid;
            return flashCount;
        };

        let resetFlashed = () => {
            for (let y=0; y < grid.length; y++) {
                for (let x=0; x < grid[y].length; x++) {
                    if (grid[y][x] < 0) {
                        grid[y][x] = 0;
                    }
                }
            }
        };

        let step = () => {
            // do the step parts
            increaseAll();

            let flashCount = 0;
            do {
                flashCount = flash();
                totalFlashCount += flashCount;
            } while (flashCount > 0);

            resetFlashed();
        };

        let printGrid = (grid: number[][]) => {
            for (let y=0; y < grid.length; y++) {
                let lineString = "";
                for (let x=0; x < grid[y].length; x++) {
                    lineString += "" + grid[y][x];
                }
                console.log(lineString);
            }
            console.log("");
        };

        console.log("Before start:");
        printGrid(grid);
        for (let i=0; i < 100; i++) {
            step();
            // printGrid(grid);
        }
        console.log("Final grid:");
        printGrid(grid);

        console.log("Total flash count: " + totalFlashCount);
    }
});

