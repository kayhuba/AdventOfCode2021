"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Day 10, Puzzle 01!");
var line_reader_1 = __importDefault(require("line-reader"));
var rateInvalidCharacter = function (character) {
    if (character === ")") {
        return 3;
    }
    else if (character === "]") {
        return 57;
    }
    else if (character === "}") {
        return 1197;
    }
    else if (character === ">") {
        return 25137;
    }
    throw new Error("Invalid character");
};
var totalSyntaxRate = 0;
line_reader_1.default.eachLine("./input/input.txt", function (line, last) {
    var tokenStack = [];
    line.split("").forEach(function (token) {
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
                    totalSyntaxRate += rateInvalidCharacter(token);
                }
                break;
            case "]":
                startToken = tokenStack.pop();
                if (startToken !== "[") {
                    totalSyntaxRate += rateInvalidCharacter(token);
                }
                break;
            case "}":
                startToken = tokenStack.pop();
                if (startToken !== "{") {
                    totalSyntaxRate += rateInvalidCharacter(token);
                }
                break;
            case ">":
                startToken = tokenStack.pop();
                if (startToken !== "<") {
                    totalSyntaxRate += rateInvalidCharacter(token);
                }
                break;
        }
    });
    if (last) {
        console.log("Syntax error score: " + totalSyntaxRate);
    }
});
//# sourceMappingURL=puzzle01.js.map