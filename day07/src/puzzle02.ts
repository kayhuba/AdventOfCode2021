console.log("Day 07, Puzzle 02!")

import linereader from "line-reader";

let minPosition: number = Number.POSITIVE_INFINITY;
let maxPosition: number = Number.NEGATIVE_INFINITY;

let crabPositions: number[] = [];
linereader.eachLine("./input/input.txt", (line, last) => {
    let posRaw = line.split(",");
    posRaw.forEach(posRaw => {
        let pos: number = parseInt(posRaw);
        minPosition = Math.min(pos, minPosition);
        maxPosition = Math.max(pos, maxPosition);
        crabPositions.push(pos);
    });

    if (last) {
        let calculateFuel = (alignmentPosition: number): number => {
            let totalFuel: number = 0;
            crabPositions.forEach(position => totalFuel += 0.5 * Math.abs(alignmentPosition - position) * (Math.abs(alignmentPosition - position) + 1));
            return totalFuel;
        };

        let minimalFuel: number = Number.POSITIVE_INFINITY;
        let alignmentPosition: number = -1;
        for (let i=minPosition; i <= maxPosition; i++) {
            let fuel = calculateFuel(i);
            if (fuel < minimalFuel) {
                minimalFuel = fuel;
                alignmentPosition = i;
            }
        }

        console.log("Alignment position: " + alignmentPosition);
        console.log("Total fuel required: " + minimalFuel);
    }
});

