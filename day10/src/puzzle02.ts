console.log("Day 10, Puzzle 02!")

import linereader from "line-reader";

let rateInvalidCharacter = (character: string): number => {
    if (character === "(") {
        return 1;
    } else if (character === "[") {
        return 2;
    } else if (character === "{") {
        return 3;
    } else if (character === "<") {
        return 4;
    }

    throw new Error("Invalid character");
}

let allAutocompleteScores: number[] = [];
linereader.eachLine("./input/input.txt", (line, last) => {
    let tokenStack: string[] = [];
    let valid = line.split("").every(token => {
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
        let totalAutocompleteScore = 0;
        tokenStack.reverse().forEach(unfinishedToken => {
            totalAutocompleteScore = 5 * totalAutocompleteScore + rateInvalidCharacter(unfinishedToken);
        });
        allAutocompleteScores.push(totalAutocompleteScore);
    }

    if (last) {
        let sorted = allAutocompleteScores.sort((a, b) => a - b);
        console.log("Auto complete error score: " + sorted[Math.floor(allAutocompleteScores.length / 2)]);
    }
});

