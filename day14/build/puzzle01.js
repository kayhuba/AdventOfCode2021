"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Day 14, Puzzle 01!");
const line_reader_1 = __importDefault(require("line-reader"));
let polymer = [];
let rules = new Map();
line_reader_1.default.eachLine("./input/input.txt", (line, last) => {
    if (polymer.length === 0) {
        polymer = line.split("");
        return;
    }
    if (line.trim().length === 0) {
        return;
    }
    let ruleParts = line.split(" -> ");
    rules.set(ruleParts[0], ruleParts[1]);
    if (last) {
        let step = (polymer) => {
            let newPolymer = [];
            polymer.reduce((previousValue, currentValue) => {
                let match = rules.get(previousValue + currentValue);
                if (match !== undefined) {
                    newPolymer.push(match);
                }
                newPolymer.push(currentValue);
                return currentValue;
            }, "");
            return newPolymer;
        };
        for (let i = 0; i < 10; i++) {
            polymer = step(polymer);
            if (polymer.length < 100) {
                console.log(`Polymer after step ${i + 1}: ` + polymer.join(""));
            }
        }
        // find most and least common elements
        let commonElements = new Map();
        polymer.forEach(element => {
            let count = commonElements.get(element);
            if (count === undefined) {
                count = 0;
            }
            commonElements.set(element, count + 1);
        });
        let sortedElements = Array.from(commonElements.entries()).sort((a, b) => b[1] - a[1]);
        console.log(`Least common element ${sortedElements[sortedElements.length - 1][0]} (${sortedElements[sortedElements.length - 1][1]}), most common element: ${sortedElements[0][0]} (${sortedElements[0][1]})`);
        console.log(`Most common element count minus least common element count: ${sortedElements[0][1] - sortedElements[sortedElements.length - 1][1]}`);
    }
});
//# sourceMappingURL=puzzle01.js.map