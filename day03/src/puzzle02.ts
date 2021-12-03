console.log("Day 03, Puzzle 02!")

import linereader from "line-reader";

interface Division {
    startsWithBitSet: string[];
    startsWithBitUnset: string[];
}

let division: Division = {
    startsWithBitSet: [],
    startsWithBitUnset: []
};

let assignToDivision = (position: number, value: string, division: Division) => {
    if (value.charAt(position) === "1") {
        division.startsWithBitSet.push(value);
    } else {
        division.startsWithBitUnset.push(value);
    }
};

let values: string[] = [];
linereader.eachLine("./input/input.txt", (line, last) => {
    values.push(line);

    if (last) {
        let evalMostOrLeast = (values: string[], comparator: (a: number, b: number) => boolean): number => {
            let pos = 0;
            let remaining: string[] = values;
            do {
                remaining.forEach(value => assignToDivision(pos, value, division));

                if (comparator(division.startsWithBitSet.length, division.startsWithBitUnset.length)) {
                    remaining = division.startsWithBitSet;
                } else  {
                    remaining = division.startsWithBitUnset;
                }

                division = {
                    startsWithBitSet: [],
                    startsWithBitUnset: []
                };

                pos++;
            } while (remaining.length > 1);

            return parseInt(remaining[0], 2);
        };

        let mostCommonRating = evalMostOrLeast(values, (a, b) => (a >= b));
        let leastCommonRating = evalMostOrLeast(values, (a, b) => (a < b));

        console.log("Oxygen Generator Rating: " + mostCommonRating);
        console.log("CO2 Scrubber Rating: "+ leastCommonRating);
        console.log("Multiple: " + mostCommonRating * leastCommonRating);
    }
});

