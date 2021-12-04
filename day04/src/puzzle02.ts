console.log("Day 04, Puzzle 02!")

import linereader from "line-reader";

interface NumberAndState {
    number: number,
    drawn: boolean
}

interface Board {
    index: number;
    rows: NumberAndState[][];
}

let firstLine = true;
let randomNumbers: number[] = [];
let boards: Board[] = [];
let currentBoard: Board | null = null;
linereader.eachLine("./input/input.txt", (line, last) => {
    if (firstLine) {
        let randomNumbersRaw = line.split(",");
        randomNumbersRaw.forEach(number => randomNumbers.push(parseInt(number)));
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
    let row: NumberAndState[] = [];
    let rowRaw = line.split(/\s+/);
    rowRaw.forEach(num => {
        row.push({
            number: parseInt(num),
            drawn: false
        });
    });
    currentBoard?.rows.push(row);

    if (last) {
        if (currentBoard !== null) {
            boards.push(currentBoard);
        }

        let markBoard = (board: Board, number: number) => {
            board.rows.forEach(row => {
                row.forEach(numberAndState => {
                    if (numberAndState.number === number) {
                        numberAndState.drawn = true;
                    }
                });
            });
        };

        let checkBoard = (board: Board): boolean =>  {
            for (let y=0; y < board.rows.length; y++) {
                let x;
                for (x=0; x < board.rows[y].length; x++) {
                    if (!board.rows[y][x].drawn) {
                        break;
                    }
                }

                if (x === board.rows[y].length) {
                    return true;
                }
            }

            for (let x=0; x < board.rows[0].length; x++) {
                let y;
                for (y=0; y < board.rows.length; y++) {
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

        let boardsNotWon: Board[] = boards;
        for (let randomNumberIndex=0; randomNumberIndex < randomNumbers.length; randomNumberIndex++) {
            let randomNumber = randomNumbers[randomNumberIndex];
            boardsNotWon.forEach(board => markBoard(board, randomNumber));

            let boardsNotWonNext: Board[] = [];
            for (let i=0; i < boardsNotWon.length; i++) {
                if (checkBoard(boardsNotWon[i])) {
                    console.log(`Board ${boardsNotWon[i].index + 1} has won when number ${randomNumber} was drawn`);
                    if (boardsNotWon.length === 1) {
                        console.log(`Board ${boardsNotWon[i].index + 1} is the last to win when number ${randomNumber} was drawn`);
                        let sum = 0;
                        for (let x = 0; x < boardsNotWon[i].rows[0].length; x++) {
                            for (let y = 0; y < boardsNotWon[i].rows.length; y++) {
                                if (!boardsNotWon[i].rows[y][x].drawn) {
                                    sum += boardsNotWon[i].rows[y][x].number;
                                }
                            }
                        }

                        console.log("Final score: " + sum * randomNumber);

                        return;
                    }
                } else {
                    boardsNotWonNext.push(boardsNotWon[i]);
                }
            }

            boardsNotWon = boardsNotWonNext;
        }
    }
});

