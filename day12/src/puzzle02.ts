console.log("Day 12, Puzzle 02!")

import linereader from "line-reader";

class CaveNode {
    name: string;
    edge: Set<CaveNode> = new Set<CaveNode>();
    multiVisit: boolean;

    public constructor(name: string, edge?: Set<CaveNode>) {
        this.name = name;

        this.multiVisit = this.name.charAt(0) === this.name.charAt(0).toUpperCase();

        if (this.edge !== undefined) {
            this.edge = new Set(edge);
        }
    }
}

let getOrCreateCaveNode = (name: string): CaveNode => {
    let cave = caveNodeRegistry.get(name);
    if (cave === undefined) {
        cave = new CaveNode(name);
        caveNodeRegistry.set(name, cave);

        if (!cave.multiVisit && cave.name !== "start" && cave.name !== "end") {
            smallCaves.add(cave);
        }
    }

    return cave;
};

let root: CaveNode = new CaveNode("start");
let smallCaves: Set<CaveNode> = new Set();
let caveNodeRegistry: Map<string, CaveNode> = new Map<string, CaveNode>([[root.name, root]]);
linereader.eachLine("./input/input.txt", (line, last) => {
    let edge = line.split("-");
    let nodeA = getOrCreateCaveNode(edge[0]);
    let nodeB = getOrCreateCaveNode(edge[1]);
    nodeA.edge.add(nodeB);
    nodeB.edge.add(nodeA);

    if (last) {
        let traverse = (cave: CaveNode, doubleVisitCave: CaveNode, currentPath: string, caveVisitCount: Map<CaveNode, number>, foundPath: string[]) => {
            if (!cave.multiVisit) {
                if (!caveVisitCount.has(cave)) {
                    caveVisitCount.set(cave, 1);
                } else {
                    // @ts-ignore
                    caveVisitCount.set(cave, caveVisitCount.get(cave) + 1);
                }
            }

            if (currentPath.length > 0) {
                currentPath += ",";
            }
            currentPath += cave.name;

            if (cave.name === "end") {
                foundPath.push(currentPath);
            }

            cave.edge.forEach(nextCave => {
                // @ts-ignore
                if (!caveVisitCount.has(nextCave) || (nextCave === doubleVisitCave && caveVisitCount.get(nextCave) < 2)) {
                    traverse(nextCave, doubleVisitCave, currentPath, new Map(caveVisitCount), foundPath);
                }
            });
        };

        // traverse all paths
        let foundPath: string[] = [];
        smallCaves.forEach(smallCave => {
            traverse(root, smallCave, "", new Map<CaveNode, number>(), foundPath);
        });

        let distinctFoundPath: Set<string> = new Set(foundPath);
        if (distinctFoundPath.size < 50) {
            Array.from(distinctFoundPath.values()).sort().forEach(path => console.log(path));
        }

        console.log("Total paths found: " + distinctFoundPath.size);
    }
});

