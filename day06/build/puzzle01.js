"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Day 06, Puzzle 01!");
var line_reader_1 = __importDefault(require("line-reader"));
var lanternFishCount = [];
for (var i = 0; i < 9; i++) {
    lanternFishCount[i] = 0;
}
line_reader_1.default.eachLine("./input/input.txt", function (line, last) {
    var lanternFishAgeRaw = line.split(",");
    lanternFishAgeRaw.forEach(function (fishAgeRaw) {
        lanternFishCount[parseInt(fishAgeRaw)]++;
    });
    if (last) {
        var simulateDay = function (lanternFishCount) {
            var newLanternFish = lanternFishCount[0];
            lanternFishCount.shift();
            lanternFishCount.push(newLanternFish);
            lanternFishCount[6] += newLanternFish;
        };
        for (var i = 0; i < 80; i++) {
            simulateDay(lanternFishCount);
        }
        var lanternFishTotalCount_1 = 0;
        lanternFishCount.forEach(function (count) { return lanternFishTotalCount_1 += count; });
        console.log("Number of lantern fish: " + lanternFishTotalCount_1);
    }
});
//# sourceMappingURL=puzzle01.js.map