"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Day 21, Puzzle 01!");
const line_reader_1 = __importDefault(require("line-reader"));
class Player {
    constructor(name, position) {
        this.points = 0;
        this.name = name;
        this.position = position;
    }
    move(steps) {
        this.position = (this.position + steps - 1) % 10 + 1;
        this.points += this.position;
        return this.points;
    }
}
class DeterministicDice {
    constructor() {
        this.current = 0;
        this.rollCount = 0;
    }
    next() {
        this.rollCount++;
        this.current++;
        if (this.current > 100) {
            this.current = 1;
        }
        return this.current;
    }
}
let players = [];
line_reader_1.default.eachLine("./input/input.txt", (line, last) => {
    let match = line.match(/^(Player (\d+)) starting position: (\d+)$/);
    if (match !== null) {
        players.push(new Player(match[1], parseInt(match[3])));
    }
    if (last) {
        let dice = new DeterministicDice();
        let round = (players, dice) => {
            let winner = null;
            players.some(player => {
                let rolled1 = dice.next();
                let rolled2 = dice.next();
                let rolled3 = dice.next();
                let points = player.move(rolled1 + rolled2 + rolled3);
                console.log(`${player.name} moves ${rolled1}+${rolled2}+${rolled3} to position ${player.position} and has now ${points} points`);
                if (points >= 1000) {
                    winner = player;
                }
                return points >= 1000;
            });
            return winner;
        };
        let winner;
        do {
            winner = round(players, dice);
        } while (winner == null);
        let looser = players.filter(player => player !== winner)[0];
        console.log(`The winner is ${winner.name} with ${winner.points} Points. Puzzle result: ${looser.points * dice.rollCount}`);
    }
});
//# sourceMappingURL=puzzle01.js.map