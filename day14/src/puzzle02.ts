console.log("Day 14, Puzzle 02!")

import linereader from "line-reader";

let polymerTemplate: string[] = [];
let rules: Map<string, string> = new Map<string, string>();
linereader.eachLine("./input/input.txt", (line, last) => {
    if (polymerTemplate.length === 0) {
        polymerTemplate = line.split("");
        return;
    }

    if (line.trim().length === 0) {
        return;
    }

    let ruleParts = line.split(" -> ");
    rules.set(ruleParts[0], ruleParts[1]);

    if (last) {
        let addPair = (pair: string, polymerPairs: Map<string, Set<string>>): Set<string> => {
            let pairFollowers = polymerPairs.get(pair);
            if (pairFollowers === undefined) {
                pairFollowers = new Set<string>();
                polymerPairs.set(pair, pairFollowers);
            }
            return pairFollowers;
        };

        let addFollower = (follower: string, followers: Set<string> | undefined, pair: string, followerReverseIndex: Map<string, string[]>) => {
            followers?.add(follower);
            let pairs = followerReverseIndex.get(follower);
            if (pairs === undefined) {
                pairs = [];
                followerReverseIndex.set(follower, pairs);
            }
            pairs.push(pair);
        };

        let polymerPairs: Map<string, Set<string>> = new Map<string, Set<string>>();
        let followerReverseIndex: Map<string, string[]> = new Map<string, string[]>();
        let previous = polymerTemplate[0];
        for (let i=1; i < polymerTemplate.length; i++) {
            let pair = previous + polymerTemplate[i];
            let pairFollowers = addPair(pair, polymerPairs);
            let follower = polymerTemplate[i] + (polymerTemplate[i + 1] !== undefined ? polymerTemplate[i + 1] : "");
            addFollower(follower, pairFollowers, pair, followerReverseIndex);

            previous = polymerTemplate[i];
        }

        // idea: given polymer NNCB and rule NN -> A.
        // * we split the polymer into pairs (key of a map) and it's immediately following pair
        // * we go through all rules and search for matching pairs of the polymer
        // * for each match we create new pairs. E.g. first pair NN matches rule so new pairs are:
        //   i)   NA followed by AN
        //   ii)  AN followed by NC
        //   iii) NC followed by CB
        //   iv)  CB followed by B<empty>
        let step = () => {
            let newPolymerPairs: Map<string, Set<string>> = new Map<string, Set<string>>();
            let newFollowerReverseIndex: Map<string, string[]> = new Map<string, string[]>();
            Array.from(rules.entries()).forEach(rule => {
                let followers = polymerPairs.get(rule[0]);
                if (followers !== undefined) {
                    let pair = rule[0].charAt(0) + rule[1];
                    addFollower(rule[1] + rule[0].charAt(1), addPair(pair, newPolymerPairs), pair, newFollowerReverseIndex);
                    followers.forEach(follower => {
                        let pair = rule[1] + rule[0].charAt(1);
                        addFollower(follower, addPair(pair, newPolymerPairs), pair, newFollowerReverseIndex);
                    });
                    polymerPairs.delete(rule[0]);

                }
            });

            // copy remaining pairs from old to new polymerPairs map
            Array.from(polymerPairs.entries()).forEach(pair => {
                let followers = pair[1];
                followers.forEach(follower => addFollower(follower, undefined, pair[0], newFollowerReverseIndex));
                newPolymerPairs.set(pair[0], followers);
            });

            // fix the followers
            Array.from(rules.entries()).forEach(rule => {
                let matchingPairs = newFollowerReverseIndex.get(rule[0]);
                if (matchingPairs !== undefined) {
                    let newFollower = rule[0].charAt(0) + rule[1];
                    matchingPairs.forEach(matchingPair => {
                        let followers = newPolymerPairs.get(matchingPair);
                        let newFollowers: Set<string> = new Set<string>();
                        followers?.forEach(follower => follower === rule[0] ? newFollowers.add(newFollower) : newFollowers.add(follower));
                        newPolymerPairs.set(matchingPair, newFollowers);
                    });
                }
            });

            followerReverseIndex = newFollowerReverseIndex;
            polymerPairs = newPolymerPairs;
        };

        for (let i=0; i < 4; i++) {
            step();
        }

        // TODO - it's not correct, find the problem :-(

        // find most and least common elements
        let commonElements: Map<string, number> = new Map<string, number>();
        commonElements.set(polymerTemplate[0], 1);
        Array.from(polymerPairs.entries()).forEach(pair => {
            let element = pair[0].charAt(1);
            let count = commonElements.get(element);
            if (count === undefined) {
                count = 0;
            }
            commonElements.set(element, count + pair[1].size);
        });

        let sortedElements = Array.from(commonElements.entries()).sort((a, b) => b[1] - a[1]);

        console.log(`Least common element ${sortedElements[sortedElements.length - 1][0]} (${sortedElements[sortedElements.length - 1][1]}), most common element: ${sortedElements[0][0]} (${sortedElements[0][1]})`);
        console.log(`Most common element count minus least common element count: ${sortedElements[0][1] - sortedElements[sortedElements.length - 1][1]}`);
    }
});

