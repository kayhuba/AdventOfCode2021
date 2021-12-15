"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Day 14, Puzzle 02!");
const line_reader_1 = __importDefault(require("line-reader"));
let polymerTemplate = [];
let rules = new Map();
line_reader_1.default.eachLine("./input/input.txt", (line, last) => {
    if (polymerTemplate.length === 0) {
        polymerTemplate = line.split("");
        return;
    }
    if (line.trim().length === 0) {
        return;
    }
    let ruleParts = line.split(" -> ");
    rules.set(ruleParts[0], ruleParts[1]);
    if (last) {
        let addPair = (pair, additionalPairCount, polymerPairs) => {
            let pairCount = polymerPairs.get(pair);
            if (pairCount === undefined) {
                pairCount = 0;
            }
            polymerPairs.set(pair, pairCount + 1 + additionalPairCount);
        };
        let polymerPairs = new Map();
        let previous = polymerTemplate[0];
        for (let i = 1; i < polymerTemplate.length; i++) {
            let pair = previous + polymerTemplate[i];
            addPair(pair, 0, polymerPairs);
            previous = polymerTemplate[i];
        }
        // idea: given polymer NNCB and rule NN -> A.
        // * we split the polymer into pairs (key of a map) and it's count
        // * we go through all rules and search for matching pairs of the polymer
        // * for each match we create new pairs. E.g. first pair NN matches rule so new pairs are:
        //   i)   NA
        //   ii)  AN
        //   iii) NC
        //   iv)  CB
        let step = () => {
            let newPolymerPairs = new Map();
            Array.from(rules.entries()).forEach(rule => {
                let pairCount = polymerPairs.get(rule[0]);
                if (pairCount !== undefined) {
                    let firstPair = rule[0].charAt(0) + rule[1];
                    addPair(firstPair, pairCount - 1, newPolymerPairs);
                    let secondPair = rule[1] + rule[0].charAt(1);
                    addPair(secondPair, pairCount - 1, newPolymerPairs);
                    polymerPairs.delete(rule[0]);
                }
            });
            // copy remaining pairs from old to new polymerPairs map
            Array.from(polymerPairs.entries()).forEach(pair => {
                let pairCount = pair[1];
                newPolymerPairs.set(pair[0], pairCount);
            });
            polymerPairs = newPolymerPairs;
        };
        for (let i = 0; i < 40; i++) {
            step();
        }
        // find most and least common elements
        let commonElements = new Map();
        commonElements.set(polymerTemplate[0], 1);
        Array.from(polymerPairs.entries()).forEach(pair => {
            let element = pair[0].charAt(1);
            let count = commonElements.get(element);
            if (count === undefined) {
                count = 0;
            }
            commonElements.set(element, count + pair[1]);
        });
        let sortedElements = Array.from(commonElements.entries()).sort((a, b) => b[1] - a[1]);
        console.log(`Least common element ${sortedElements[sortedElements.length - 1][0]} (${sortedElements[sortedElements.length - 1][1]}), most common element: ${sortedElements[0][0]} (${sortedElements[0][1]})`);
        console.log(`Most common element count minus least common element count: ${sortedElements[0][1] - sortedElements[sortedElements.length - 1][1]}`);
    }
});
//# sourceMappingURL=puzzle02.js.map