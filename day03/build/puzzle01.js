"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Day 03, Puzzle 01!");
var line_reader_1 = __importDefault(require("line-reader"));
var lineCounter = 0;
var bitSetCounter = []; // each element is the count of bit 1 at the position in the line
var xorMask = "";
line_reader_1.default.eachLine("./input/input.txt", function (line, last) {
    var bitChars = line.split("");
    if (bitSetCounter.length === 0) {
        bitChars.forEach(function () {
            bitSetCounter.push(0);
            xorMask = xorMask + "1";
        });
    }
    for (var i = 0; i < bitChars.length; i++) {
        if (bitChars[i] === "1") {
            bitSetCounter[i]++;
        }
    }
    lineCounter++;
    if (last) {
        var gammaBitChars_1 = [];
        bitSetCounter.forEach(function (bitSetCount) { return bitSetCount > (lineCounter / 2) ? gammaBitChars_1.push("1") : gammaBitChars_1.push("0"); });
        var gammaBitString = gammaBitChars_1.join('');
        var gamma = parseInt(gammaBitString, 2);
        var epsylon = (gamma ^ parseInt(xorMask, 2));
        console.log("Calculated Gamma (binary): " + gammaBitString + " (decimal): " + gamma);
        console.log("Calculated Epsylon: " + epsylon);
        console.log("Multiple of gamma and epsylon: " + gamma * epsylon);
    }
});
//# sourceMappingURL=puzzle01.js.map