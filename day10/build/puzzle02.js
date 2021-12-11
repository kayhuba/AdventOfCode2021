"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Day 10, Puzzle 02!");
var line_reader_1 = __importDefault(require("line-reader"));
var rateInvalidCharacter = function (character) {
    if (character === "(") {
        return 1;
    }
    else if (character === "[") {
        return 2;
    }
    else if (character === "{") {
        return 3;
    }
    else if (character === "<") {
        return 4;
    }
    throw new Error("Invalid character");
};
var allAutocompleteScores = [];
line_reader_1.default.eachLine("./input/input.txt", function (line, last) {
    var tokenStack = [];
    var valid = line.split("").every(function (token) {
        var startToken;
        switch (token) {
            case "(":
            case "[":
            case "{":
            case "<":
                tokenStack.push(token);
                break;
            case ")":
                startToken = tokenStack.pop();
                if (startToken !== "(") {
                    return false;
                }
                break;
            case "]":
                startToken = tokenStack.pop();
                if (startToken !== "[") {
                    return false;
                }
                break;
            case "}":
                startToken = tokenStack.pop();
                if (startToken !== "{") {
                    return false;
                }
                break;
            case ">":
                startToken = tokenStack.pop();
                if (startToken !== "<") {
                    return false;
                }
                break;
        }
        return true;
    });
    if (valid) {
        var totalAutocompleteScore_1 = 0;
        tokenStack.reverse().forEach(function (unfinishedToken) {
            totalAutocompleteScore_1 = 5 * totalAutocompleteScore_1 + rateInvalidCharacter(unfinishedToken);
        });
        allAutocompleteScores.push(totalAutocompleteScore_1);
    }
    if (last) {
        var sorted = allAutocompleteScores.sort(function (a, b) { return a - b; });
        console.log("Auto complete error score: " + sorted[Math.floor(allAutocompleteScores.length / 2)]);
    }
});
//# sourceMappingURL=puzzle02.js.map