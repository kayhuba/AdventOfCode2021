console.log("Day 12, Puzzle 01!")

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
    }

    return cave;
};

let root: CaveNode = new CaveNode("start");
let caveNodeRegistry: Map<string, CaveNode> = new Map<string, CaveNode>([[root.name, root]]);
linereader.eachLine("./input/input.txt", (line, last) => {
    let edge = line.split("-");
    let nodeA = getOrCreateCaveNode(edge[0]);
    let nodeB = getOrCreateCaveNode(edge[1]);
    nodeA.edge.add(nodeB);
    nodeB.edge.add(nodeA);

    if (last) {
        let traverse = (cave: CaveNode, currentPath: string, visitedCaves: Set<CaveNode>, foundPath: string[]) => {
            if (!cave.multiVisit) {
                visitedCaves.add(cave);
            }

            if (currentPath.length > 0) {
                currentPath += ",";
            }
            currentPath += cave.name;

            if (cave.name === "end") {
                foundPath.push(currentPath);
            }

            cave.edge.forEach(nextCave => {
                if (!visitedCaves.has(nextCave)) {
                    traverse(nextCave, currentPath, new Set(visitedCaves), foundPath);
                }
            });
        };

        // traverse all paths until either dead end or "end" node
        let foundPath: string[] = [];
        traverse(root, "", new Set<CaveNode>(), foundPath);

        if (foundPath.length < 50) {
            foundPath.sort().forEach(path => console.log(path));
        }

        console.log("Total paths found: " + foundPath.length);
    }
});

