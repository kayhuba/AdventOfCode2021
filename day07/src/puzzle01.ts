console.log("Day 07, Puzzle 01!")

import linereader from "line-reader";

let crabPositions: number[] = [];
linereader.eachLine("./input/input.txt", (line, last) => {
    let posRaw = line.split(",");
    posRaw.forEach(pos => crabPositions.push(parseInt(pos)));

    if (last) {
        let median: number;
        crabPositions = crabPositions.sort((a, b) => a - b);
        if (crabPositions.length % 2 === 1) {
            median = crabPositions[(crabPositions.length + 1) / 2 - 1];
        } else {
            let high = crabPositions[crabPositions.length / 2];
            let low = crabPositions[crabPositions.length / 2 - 1];
            median = Math.round((high + low) / 2);
        }

        console.log("Horizontal alignment position: " + median);

        let totalFuel: number = 0;
        crabPositions.forEach(position => totalFuel += Math.abs(median - position));
        console.log("Total fule required: " + totalFuel);
    }
});

