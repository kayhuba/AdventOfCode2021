"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Day 08, Puzzle 02!");
var line_reader_1 = __importDefault(require("line-reader"));
var sum = 0;
line_reader_1.default.eachLine("./input/input.txt", function (line, last) {
    var mainSplit = line.split(" | ");
    var uniqueSignalPatterns = mainSplit[0].split(" ");
    var fourDigitOutputValues = mainSplit[1].split(" ");
    fourDigitOutputValues.forEach(function (value, i, array) { return array[i] = value.split("").sort(function (a, b) { return a.charCodeAt(0) - b.charCodeAt(0); }).join(""); });
    var aBar = ["a", "b", "c", "d", "e", "f", "g"];
    var bBar = ["a", "b", "c", "d", "e", "f", "g"];
    var cBar = ["a", "b", "c", "d", "e", "f", "g"];
    var dBar = ["a", "b", "c", "d", "e", "f", "g"];
    var eBar = ["a", "b", "c", "d", "e", "f", "g"];
    var fBar = ["a", "b", "c", "d", "e", "f", "g"];
    var gBar = ["a", "b", "c", "d", "e", "f", "g"];
    uniqueSignalPatterns.sort(function (a, b) { return a.length - b.length; });
    uniqueSignalPatterns.forEach(function (pattern) {
        if (pattern.length === 2) {
            // digit 1
            cBar = cBar.filter(function (signal) { return pattern.includes(signal); });
            fBar = fBar.filter(function (signal) { return pattern.includes(signal); });
            aBar = aBar.filter(function (signal) { return !pattern.includes(signal); });
            bBar = bBar.filter(function (signal) { return !pattern.includes(signal); });
            dBar = dBar.filter(function (signal) { return !pattern.includes(signal); });
            eBar = eBar.filter(function (signal) { return !pattern.includes(signal); });
            gBar = gBar.filter(function (signal) { return !pattern.includes(signal); });
        }
        else if (pattern.length === 3) {
            // digit 7
            aBar = aBar.filter(function (signal) { return pattern.includes(signal); });
            cBar = cBar.filter(function (signal) { return pattern.includes(signal); });
            fBar = fBar.filter(function (signal) { return pattern.includes(signal); });
            bBar = bBar.filter(function (signal) { return !pattern.includes(signal); });
            dBar = dBar.filter(function (signal) { return !pattern.includes(signal); });
            eBar = eBar.filter(function (signal) { return !pattern.includes(signal); });
            gBar = gBar.filter(function (signal) { return !pattern.includes(signal); });
        }
        else if (pattern.length === 4) {
            // digit 4
            bBar = bBar.filter(function (signal) { return pattern.includes(signal); });
            cBar = cBar.filter(function (signal) { return pattern.includes(signal); });
            dBar = dBar.filter(function (signal) { return pattern.includes(signal); });
            fBar = fBar.filter(function (signal) { return pattern.includes(signal); });
            aBar = aBar.filter(function (signal) { return !pattern.includes(signal); });
            eBar = eBar.filter(function (signal) { return !pattern.includes(signal); });
            gBar = gBar.filter(function (signal) { return !pattern.includes(signal); });
        }
        else if (pattern.length === 5) {
            // at this point, we can identify digit 3: It must have
            // segments c and f in its pattern
            if (pattern.includes(cBar[0]) && pattern.includes(cBar[1])) {
                // it's digit 3
                bBar = bBar.filter(function (signal) { return !pattern.includes(signal); });
                eBar = eBar.filter(function (signal) { return !pattern.includes(signal); });
                // after this,
                // * dBar can be derived from bBar
                // * gBar can be derived from eBar
                dBar = dBar.filter(function (signal) { return signal !== bBar[0]; });
                gBar = gBar.filter(function (signal) { return signal !== eBar[0]; });
            }
        }
        else if (pattern.length === 6) {
            // at this point, we can identify digit 6: It must have
            // segments a, b, d, e, f, g
            if (pattern.includes(aBar[0]) &&
                pattern.includes(bBar[0]) &&
                pattern.includes(dBar[0]) &&
                pattern.includes(eBar[0]) &&
                (pattern.includes(fBar[0]) || pattern.includes(fBar[1])) &&
                pattern.includes(gBar[0])) {
                cBar = cBar.filter(function (signal) { return !pattern.includes(signal); });
                fBar = fBar.filter(function (signal) { return signal !== cBar[0]; });
            }
        }
    });
    var digits = [
        [aBar[0], bBar[0], cBar[0], eBar[0], fBar[0], gBar[0]].sort(function (a, b) { return a.charCodeAt(0) - b.charCodeAt(0); }).join(""),
        [cBar[0], fBar[0]].sort(function (a, b) { return a.charCodeAt(0) - b.charCodeAt(0); }).join(""),
        [aBar[0], cBar[0], dBar[0], eBar[0], gBar[0]].sort(function (a, b) { return a.charCodeAt(0) - b.charCodeAt(0); }).join(""),
        [aBar[0], cBar[0], dBar[0], fBar[0], gBar[0]].sort(function (a, b) { return a.charCodeAt(0) - b.charCodeAt(0); }).join(""),
        [bBar[0], cBar[0], dBar[0], fBar[0]].sort(function (a, b) { return a.charCodeAt(0) - b.charCodeAt(0); }).join(""),
        [aBar[0], bBar[0], dBar[0], fBar[0], gBar[0]].sort(function (a, b) { return a.charCodeAt(0) - b.charCodeAt(0); }).join(""),
        [aBar[0], bBar[0], dBar[0], eBar[0], fBar[0], gBar[0]].sort(function (a, b) { return a.charCodeAt(0) - b.charCodeAt(0); }).join(""),
        [aBar[0], cBar[0], fBar[0]].sort(function (a, b) { return a.charCodeAt(0) - b.charCodeAt(0); }).join(""),
        [aBar[0], bBar[0], cBar[0], dBar[0], eBar[0], fBar[0], gBar[0]].sort(function (a, b) { return a.charCodeAt(0) - b.charCodeAt(0); }).join(""),
        [aBar[0], bBar[0], cBar[0], dBar[0], fBar[0], gBar[0]].sort(function (a, b) { return a.charCodeAt(0) - b.charCodeAt(0); }).join("")
    ];
    var fourDigitOutputValueDerived = "";
    fourDigitOutputValues.forEach(function (value) {
        fourDigitOutputValueDerived += "" + digits.findIndex(function (digit) { return digit === value; });
    });
    console.log("Output Value: " + fourDigitOutputValueDerived);
    sum += parseInt(fourDigitOutputValueDerived);
    if (last) {
        console.log("Output value sum: " + sum);
    }
});
//# sourceMappingURL=puzzle02.js.map