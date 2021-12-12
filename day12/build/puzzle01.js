"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Day 12, Puzzle 01!");
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
    }
    return cave;
};
let root = new CaveNode("start");
let caveNodeRegistry = new Map([[root.name, root]]);
line_reader_1.default.eachLine("./input/input.txt", (line, last) => {
    let edge = line.split("-");
    let nodeA = getOrCreateCaveNode(edge[0]);
    let nodeB = getOrCreateCaveNode(edge[1]);
    nodeA.edge.add(nodeB);
    nodeB.edge.add(nodeA);
    if (last) {
        let traverse = (cave, currentPath, visitedCaves, foundPath) => {
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
        let foundPath = [];
        traverse(root, "", new Set(), foundPath);
        if (foundPath.length < 50) {
            foundPath.sort().forEach(path => console.log(path));
        }
        console.log("Total paths found: " + foundPath.length);
    }
});
//# sourceMappingURL=puzzle01.js.map