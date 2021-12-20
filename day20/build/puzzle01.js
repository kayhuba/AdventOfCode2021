"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Day 20, Puzzle 01!");
const line_reader_1 = __importDefault(require("line-reader"));
let emptyLine;
let algorithm = [];
let image = [];
line_reader_1.default.eachLine("./input/input.txt", (line, last) => {
    if (algorithm.length === 0) {
        algorithm = line.split("").map(binary => binary === "#");
    }
    else if (line.length > 0) {
        let imageLine = [false, false].concat(line.split("").map(value => value === "#")).concat([false, false]);
        if (image.length === 0) {
            emptyLine = imageLine.map(value => false);
            image.push([...emptyLine]);
            image.push([...emptyLine]);
        }
        image.push(imageLine);
    }
    if (last) {
        image.push([...emptyLine]);
        image.push([...emptyLine]);
        let printImage = (image) => {
            image.forEach(line => console.log(line.map(value => value ? "#" : ".").join("")));
            console.log("");
        };
        let processImage = (image) => {
            let newImage = [];
            // create new and bigger image
            let baseFlag = algorithm[image[0][0] ? 511 : 0];
            emptyLine = [baseFlag].concat(image[0].map(value => baseFlag)).concat([baseFlag]);
            newImage.push([...emptyLine]);
            image.forEach(line => newImage.push([...emptyLine]));
            newImage.push([...emptyLine]);
            // apply "algorithm"
            for (let y = 1; y < image.length - 1; y++) {
                for (let x = 1; x < image[y].length - 1; x++) {
                    let number = 0;
                    number = (image[y - 1][x - 1] ? 1 << 2 : 0) + (image[y - 1][x] ? 1 << 1 : 0) + (image[y - 1][x + 1] ? 1 : 0);
                    number = (number << 3) + (image[y][x - 1] ? 1 << 2 : 0) + (image[y][x] ? 1 << 1 : 0) + (image[y][x + 1] ? 1 : 0);
                    number = (number << 3) + (image[y + 1][x - 1] ? 1 << 2 : 0) + (image[y + 1][x] ? 1 << 1 : 0) + (image[y + 1][x + 1] ? 1 : 0);
                    newImage[y + 1][x + 1] = algorithm[number];
                }
            }
            return newImage;
        };
        printImage(image);
        image = processImage(image);
        printImage(image);
        // a second time
        image = processImage(image);
        printImage(image);
        let count = 0;
        image.forEach(value => value.forEach(pixel => pixel ? count++ : 0));
        console.log(`Number of pixels lit: ${count}`);
    }
});
//# sourceMappingURL=puzzle01.js.map