console.log("Day 08, Puzzle 02!")

import linereader from "line-reader";

let sum = 0;
linereader.eachLine("./input/input.txt", (line, last) => {
    let mainSplit = line.split(" | ");
    let uniqueSignalPatterns = mainSplit[0].split(" ");
    let fourDigitOutputValues = mainSplit[1].split(" ");

    fourDigitOutputValues.forEach((value, i, array) => array[i] = value.split("").sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0)).join(""))

    let aBar = ["a", "b", "c", "d", "e", "f", "g"];
    let bBar = ["a", "b", "c", "d", "e", "f", "g"];
    let cBar = ["a", "b", "c", "d", "e", "f", "g"];
    let dBar = ["a", "b", "c", "d", "e", "f", "g"];
    let eBar = ["a", "b", "c", "d", "e", "f", "g"];
    let fBar = ["a", "b", "c", "d", "e", "f", "g"];
    let gBar = ["a", "b", "c", "d", "e", "f", "g"];

    uniqueSignalPatterns.sort((a, b) => a.length - b.length);

    uniqueSignalPatterns.forEach(pattern => {
        if (pattern.length === 2) {
            // digit 1
            cBar = cBar.filter(signal => pattern.includes(signal));
            fBar = fBar.filter(signal => pattern.includes(signal));

            aBar = aBar.filter(signal => !pattern.includes(signal));
            bBar = bBar.filter(signal => !pattern.includes(signal));
            dBar = dBar.filter(signal => !pattern.includes(signal));
            eBar = eBar.filter(signal => !pattern.includes(signal));
            gBar = gBar.filter(signal => !pattern.includes(signal));
        } else if (pattern.length === 3) {
            // digit 7
            aBar = aBar.filter(signal => pattern.includes(signal));
            cBar = cBar.filter(signal => pattern.includes(signal));
            fBar = fBar.filter(signal => pattern.includes(signal));

            bBar = bBar.filter(signal => !pattern.includes(signal));
            dBar = dBar.filter(signal => !pattern.includes(signal));
            eBar = eBar.filter(signal => !pattern.includes(signal));
            gBar = gBar.filter(signal => !pattern.includes(signal));
        } else if (pattern.length === 4) {
            // digit 4
            bBar = bBar.filter(signal => pattern.includes(signal));
            cBar = cBar.filter(signal => pattern.includes(signal));
            dBar = dBar.filter(signal => pattern.includes(signal));
            fBar = fBar.filter(signal => pattern.includes(signal));

            aBar = aBar.filter(signal => !pattern.includes(signal));
            eBar = eBar.filter(signal => !pattern.includes(signal));
            gBar = gBar.filter(signal => !pattern.includes(signal));
        } else if (pattern.length === 5) {
            // at this point, we can identify digit 3: It must have
            // segments c and f in its pattern
            if (pattern.includes(cBar[0]) && pattern.includes(cBar[1])) {
                // it's digit 3
                bBar = bBar.filter(signal => !pattern.includes(signal));
                eBar = eBar.filter(signal => !pattern.includes(signal));

                // after this,
                // * dBar can be derived from bBar
                // * gBar can be derived from eBar
                dBar = dBar.filter(signal => signal !== bBar[0]);
                gBar = gBar.filter(signal => signal !== eBar[0]);
            }
        } else if (pattern.length === 6) {
            // at this point, we can identify digit 6: It must have
            // segments a, b, d, e, f, g
            if (pattern.includes(aBar[0]) &&
                pattern.includes(bBar[0]) &&
                pattern.includes(dBar[0]) &&
                pattern.includes(eBar[0]) &&
                (pattern.includes(fBar[0]) || pattern.includes(fBar[1])) &&
                pattern.includes(gBar[0])) {

                cBar = cBar.filter(signal => !pattern.includes(signal));
                fBar = fBar.filter(signal => signal !== cBar[0]);
            }
        }
    });

    let digits: string[] = [
        [aBar[0], bBar[0], cBar[0], eBar[0], fBar[0], gBar[0]].sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0)).join(""),
        [cBar[0], fBar[0]].sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0)).join(""),
        [aBar[0], cBar[0], dBar[0], eBar[0], gBar[0]].sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0)).join(""),
        [aBar[0], cBar[0], dBar[0], fBar[0], gBar[0]].sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0)).join(""),
        [bBar[0], cBar[0], dBar[0], fBar[0]].sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0)).join(""),
        [aBar[0], bBar[0], dBar[0], fBar[0], gBar[0]].sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0)).join(""),
        [aBar[0], bBar[0], dBar[0], eBar[0], fBar[0], gBar[0]].sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0)).join(""),
        [aBar[0], cBar[0], fBar[0]].sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0)).join(""),
        [aBar[0], bBar[0], cBar[0], dBar[0], eBar[0], fBar[0], gBar[0]].sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0)).join(""),
        [aBar[0], bBar[0], cBar[0], dBar[0], fBar[0], gBar[0]].sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0)).join("")
    ];

    let fourDigitOutputValueDerived = "";
    fourDigitOutputValues.forEach(value => {
        fourDigitOutputValueDerived += "" + digits.findIndex(digit => digit === value);
    });
    console.log("Output Value: " + fourDigitOutputValueDerived);
    sum += parseInt(fourDigitOutputValueDerived);

    if (last) {
        console.log("Output value sum: " + sum);
    }
});

