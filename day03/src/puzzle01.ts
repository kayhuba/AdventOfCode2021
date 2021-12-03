console.log("Day 03, Puzzle 01!")

import linereader from "line-reader";

let lineCounter = 0;
let bitSetCounter: number[] = []; // each element is the count of bit 1 at the position in the line
let xorMask = "";
linereader.eachLine("./input/input.txt", (line, last) => {
    let bitChars = line.split("");
    if (bitSetCounter.length === 0) {
        bitChars.forEach(() => {
            bitSetCounter.push(0);
            xorMask = xorMask + "1";
        });
    }

    for (let i=0; i < bitChars.length; i++) {
        if (bitChars[i] === "1") {
            bitSetCounter[i]++;
        }
    }
    lineCounter++;

    if (last) {
        let gammaBitChars: string[] = [];

        bitSetCounter.forEach(bitSetCount => bitSetCount > (lineCounter / 2) ? gammaBitChars.push("1") : gammaBitChars.push("0"));

        let gammaBitString = gammaBitChars.join('');
        let gamma = parseInt(gammaBitString, 2);
        let epsylon = (gamma ^ parseInt(xorMask, 2));

        console.log("Calculated Gamma (binary): " + gammaBitString + " (decimal): " + gamma);
        console.log("Calculated Epsylon: " + epsylon);
        console.log("Multiple of gamma and epsylon: " + gamma * epsylon);
    }
});

