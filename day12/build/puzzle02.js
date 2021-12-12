"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Day 12, Puzzle 02!");
const line_reader_1 = __importDefault(require("line-reader"));
class CaveNode {
    constructor(name, edge) {
        this.edge = new Set();
        this.name = name;
        this.multiVisit = this.name.charAt(0) === this.name.charAt(0).toUpperCase();
        if (this.edge !== undefined) {
            this.edge = new Set(edge);
        }
    }
}
let getOrCreateCaveNode = (name) => {
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
let root = new CaveNode("start");
let smallCaves = new Set();
let caveNodeRegistry = new Map([[root.name, root]]);
line_reader_1.default.eachLine("./input/input.txt", (line, last) => {
    let edge = line.split("-");
    let nodeA = getOrCreateCaveNode(edge[0]);
    let nodeB = getOrCreateCaveNode(edge[1]);
    nodeA.edge.add(nodeB);
    nodeB.edge.add(nodeA);
    if (last) {
        let traverse = (cave, doubleVisitCave, currentPath, caveVisitCount, foundPath) => {
            if (!cave.multiVisit) {
                if (!caveVisitCount.has(cave)) {
                    caveVisitCount.set(cave, 1);
                }
                else {
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
        let foundPath = [];
        smallCaves.forEach(smallCave => {
            traverse(root, smallCave, "", new Map(), foundPath);
        });
        let distinctFoundPath = new Set(foundPath);
        if (distinctFoundPath.size < 50) {
            Array.from(distinctFoundPath.values()).sort().forEach(path => console.log(path));
        }
        console.log("Total paths found: " + distinctFoundPath.size);
    }
});
//# sourceMappingURL=puzzle02.js.map