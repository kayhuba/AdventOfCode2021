console.log("Day 06, Puzzle 02!")

import linereader from "line-reader";

let lanternFishCount: number[] = [];
for (let i=0; i < 9; i++) {
    lanternFishCount[i] = 0;
}

linereader.eachLine("./input/input.txt", (line, last) => {
    let lanternFishAgeRaw = line.split(",");

    lanternFishAgeRaw.forEach(fishAgeRaw => {
        lanternFishCount[parseInt(fishAgeRaw)]++;
    });

    if (last) {
        let simulateDay = (lanternFishCount: number[]) => {
            let newLanternFish = lanternFishCount[0];
            lanternFishCount.shift();
            lanternFishCount.push(newLanternFish);
            lanternFishCount[6] += newLanternFish;
        };

        for (let i=0; i < 256; i++) {
            simulateDay(lanternFishCount);
        }

        let lanternFishTotalCount = 0;
        lanternFishCount.forEach(count => lanternFishTotalCount += count);

        console.log("Number of lantern fish: " + lanternFishTotalCount);
    }
});

