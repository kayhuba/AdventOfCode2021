"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Day 04, Puzzle 02!");
var line_reader_1 = __importDefault(require("line-reader"));
var firstLine = true;
var randomNumbers = [];
var boards = [];
var currentBoard = null;
line_reader_1.default.eachLine("./input/input.txt", function (line, last) {
    if (firstLine) {
        var randomNumbersRaw = line.split(",");
        randomNumbersRaw.forEach(function (number) { return randomNumbers.push(parseInt(number)); });
        firstLine = false;
    }
    if (line.length === 0) {
        if (currentBoard !== null) {
            boards.push(currentBoard);
        }
        currentBoard = {
            index: boards.length,
            rows: []
        };
        return;
    }
    // drop initial white space
    line = line.replace(/^\s+/, "");
    var row = [];
    var rowRaw = line.split(/\s+/);
    rowRaw.forEach(function (num) {
        row.push({
            number: parseInt(num),
            drawn: false
        });
    });
    currentBoard === null || currentBoard === void 0 ? void 0 : currentBoard.rows.push(row);
    if (last) {
        if (currentBoard !== null) {
            boards.push(currentBoard);
        }
        var markBoard_1 = function (board, number) {
            board.rows.forEach(function (row) {
                row.forEach(function (numberAndState) {
                    if (numberAndState.number === number) {
                        numberAndState.drawn = true;
                    }
                });
            });
        };
        var checkBoard = function (board) {
            for (var y = 0; y < board.rows.length; y++) {
                var x = void 0;
                for (x = 0; x < board.rows[y].length; x++) {
                    if (!board.rows[y][x].drawn) {
                        break;
                    }
                }
                if (x === board.rows[y].length) {
                    return true;
                }
            }
            for (var x = 0; x < board.rows[0].length; x++) {
                var y = void 0;
                for (y = 0; y < board.rows.length; y++) {
                    if (!board.rows[y][x].drawn) {
                        break;
                    }
                }
                if (y === board.rows.length) {
                    return true;
                }
            }
            return false;
        };
        var boardsNotWon = boards;
        var _loop_1 = function (randomNumberIndex) {
            var randomNumber = randomNumbers[randomNumberIndex];
            boardsNotWon.forEach(function (board) { return markBoard_1(board, randomNumber); });
            var boardsNotWonNext = [];
            for (var i = 0; i < boardsNotWon.length; i++) {
                if (checkBoard(boardsNotWon[i])) {
                    console.log("Board ".concat(boardsNotWon[i].index + 1, " has won when number ").concat(randomNumber, " was drawn"));
                    if (boardsNotWon.length === 1) {
                        console.log("Board ".concat(boardsNotWon[i].index + 1, " is the last to win when number ").concat(randomNumber, " was drawn"));
                        var sum = 0;
                        for (var x = 0; x < boardsNotWon[i].rows[0].length; x++) {
                            for (var y = 0; y < boardsNotWon[i].rows.length; y++) {
                                if (!boardsNotWon[i].rows[y][x].drawn) {
                                    sum += boardsNotWon[i].rows[y][x].number;
                                }
                            }
                        }
                        console.log("Final score: " + sum * randomNumber);
                        return { value: void 0 };
                    }
                }
                else {
                    boardsNotWonNext.push(boardsNotWon[i]);
                }
            }
            boardsNotWon = boardsNotWonNext;
        };
        for (var randomNumberIndex = 0; randomNumberIndex < randomNumbers.length; randomNumberIndex++) {
            var state_1 = _loop_1(randomNumberIndex);
            if (typeof state_1 === "object")
                return state_1.value;
        }
    }
});
//# sourceMappingURL=puzzle02.js.map