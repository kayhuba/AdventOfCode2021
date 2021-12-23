console.log("Day 21, Puzzle 01!")

import linereader from "line-reader";

class Player {
    name: string;
    position: number;
    points: number = 0;

    constructor(name: string, position: number) {
        this.name = name;
        this.position = position;
    }

    move(steps: number): number {
        this.position = (this.position + steps - 1) % 10 + 1;
        this.points += this.position;
        return this.points;
    }
}

class DeterministicDice {
    private current = 0;
    rollCount = 0;

    next(): number {
        this.rollCount++;
        this.current++;
        if (this.current > 100) {
            this.current = 1
        }
        return this.current;
    }
}

let players: Player[] = [];
linereader.eachLine("./input/input.txt", (line, last) => {
    let match = line.match(/^(Player (\d+)) starting position: (\d+)$/);
    if (match !== null) {
        players.push(new Player(match[1], parseInt(match[3])));
    }

    if (last) {
        let dice: DeterministicDice = new DeterministicDice();

        let round = (players: Player[], dice: DeterministicDice): Player | null => {
            let winner: Player | null = null;

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

        let winner: Player | null;
        do {
            winner = round(players, dice);
        } while (winner == null);

        let looser = players.filter(player => player !== winner)[0];
        console.log(`The winner is ${winner.name} with ${winner.points} Points. Puzzle result: ${looser.points * dice.rollCount}`);
    }
});

