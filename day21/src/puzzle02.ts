console.log("Day 21, Puzzle 02!")

import linereader from "line-reader";

class PlayerBoard {
    position: number;
    points: number;

    constructor(position: number, points: number = 0) {
        this.position = position;
        this.points = points;
    }
}

class CombinedUniverse {
    playerBoards: PlayerBoard[] = [];
    worldCount: number;

    constructor(playerBoards: PlayerBoard[], worldCount: number = 1) {
        this.playerBoards = playerBoards;
        this.worldCount = worldCount;
    }
}

class Player {
    name: string;
    index: number;
    universesWon: number = 0;

    constructor(name: string, index: number) {
        this.name = name;
        this.index = index;
    }
}

let players: Player[] = [];
let playerBoards: PlayerBoard[] = [];
linereader.eachLine("./input/input.txt", (line, last) => {
    let match = line.match(/^(Player (\d+)) starting position: (\d+)$/);
    if (match !== null) {
        players.push(new Player(match[1], parseInt(match[2]) - 1));
        playerBoards.push(new PlayerBoard(parseInt(match[3])));
    }

    if (last) {
        let universes: CombinedUniverse[] = [new CombinedUniverse(playerBoards)];
        let totalUniverses = (universes: CombinedUniverse[], players: Player[]): number => {
            let total = players.map(player => player.universesWon).reduce((previousValue, currentValue) => previousValue + currentValue, 0);
            universes.map(universe => universe.worldCount).reduce(((previousValue, currentValue) => previousValue + currentValue), 0);
            return total;
        };

        // 1+1+1 = 3
        // 1+1+2 = 4
        // 1+1+3 = 5
        // 1+2+1 = 4 -> duplicate
        // 1+2+2 = 5 -> duplicate
        // 1+2+3 = 6
        // 1+3+1 = 5 -> duplicate
        // 1+3+2 = 6 -> duplicate
        // 1+3+3 = 7

        // 2+1+1 = 4 -> duplicate
        // 2+1+2 = 5 -> duplicate
        // 2+1+3 = 6 -> duplicate
        // 2+2+1 = 5 -> duplicate
        // 2+2+2 = 6 -> duplicate
        // 2+2+3 = 7 -> duplicate
        // 2+3+1 = 6 -> duplicate
        // 2+3+2 = 7 -> duplicate
        // 2+3+3 = 8

        // 3+1+1 = 5 -> duplicate
        // 3+1+2 = 6 -> duplicate
        // 3+1+3 = 7 -> duplicate
        // 3+2+1 = 6 -> duplicate
        // 3+2+2 = 7 -> duplicate
        // 3+2+3 = 8 -> duplicate
        // 3+3+1 = 7 -> duplicate
        // 3+3+2 = 8 -> duplicate
        // 3+3+3 = 9

        // three throws with each three outcomes leads to 3^3 = 27 universes.
        // Some of them however share the same outcome and can be combined
        // map of result of three times throwing dice to how many universes will have that result
        let outcomes: Map<number, number> = new Map([[3, 1], [4, 3], [5, 6], [6, 7], [7, 6], [8, 3], [9, 1]]);
        let round = (players: Player[]): number => {
            let move = (board: PlayerBoard, steps: number): PlayerBoard => {
                let newPosition = (board.position + steps - 1) % 10 + 1;
                let newPoints = board.points + newPosition;
                return new PlayerBoard(newPosition, newPoints);
            }

            let roleDice = (player: Player): number => {
                let newUniverses: Map<number, CombinedUniverse> = new Map();
                Array.from(outcomes.keys()).forEach(outcome => {
                    universes.forEach(universe => {
                        let playerBoard = universe.playerBoards[player.index];
                        let otherPlayerBoard = universe.playerBoards[1 - player.index];

                        let newPlayerBoard = move(playerBoard, outcome);

                        // @ts-ignore
                        let universesAffected: number = outcomes.get(outcome) * universe.worldCount;

                        let points = newPlayerBoard.points;
                        if (points >= 21) {
                            player.universesWon += universesAffected;
                        } else {
                            let key = (newPlayerBoard.position * 21 + newPlayerBoard.points) * (21 * 11) + (otherPlayerBoard.position * 21 + otherPlayerBoard.points);
                            let combinableUniverses = newUniverses.get(key);
                            if (combinableUniverses === undefined) {
                                let playerBoards: PlayerBoard[] = [];
                                if (player.index === 0) {
                                    playerBoards.push(newPlayerBoard);
                                    playerBoards.push(otherPlayerBoard);
                                } else {
                                    playerBoards.push(otherPlayerBoard);
                                    playerBoards.push(newPlayerBoard);
                                }
                                newUniverses.set(key, new CombinedUniverse(playerBoards, universesAffected));
                            } else {
                                combinableUniverses.worldCount += universesAffected;
                            }
                        }
                    });
                });

                universes = Array.from(newUniverses.values());
                let total = totalUniverses(universes, players);
                return universes.length;
            };

            let universesLeft = players.map(player => roleDice(player)).reduce((previousValue, currentValue) => currentValue);

            return universesLeft;
        };

        let universesLeft: number;
        do {
            universesLeft = round(players);
            let total = totalUniverses(universes, players);
            console.log(`Universes left: ${universesLeft}, player 1 universes counted: ${total}`);
        } while (universesLeft > 0);

        let winner: Player = players[0];
        let looser: Player = players[1];
        if (players[0].universesWon < players[1].universesWon) {
            winner = players[1];
            looser = players[0];
        }

        console.log(`The winner is ${winner.name} in ${winner.universesWon} universes`);
        console.log(`The looswer is ${looser.name} in ${looser.universesWon} universes`);
    }
});

