console.log("Day 10, Puzzle 01!")

import linereader from "line-reader";

let rateInvalidCharacter = (character: string): number => {
    if (character === ")") {
        return 3;
    } else if (character === "]") {
        return 57;
    } else if (character === "}") {
        return 1197;
    } else if (character === ">") {
        return 25137;
    }

    throw new Error("Invalid character");
}

let totalSyntaxRate = 0;
linereader.eachLine("./input/input.txt", (line, last) => {
    let tokenStack: string[] = [];
    line.split("").forEach(token => {
        let startToken;
        switch(token) {
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

