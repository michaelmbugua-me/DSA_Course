# Activity Selection Problem using Dynamic Programming

> Source: https://www.techiedelight.com/activity-selection-problem-using-dynamic-programming/

Given a set of activities and the starting and finishing time of each activity, find the maximum number of activities that can be performed by a single person assuming that a person can only work on a single activity at a time.

This problem is called the activity selection problem, which concerns the selection of non-conflicting activities to perform within a given time frame, given a set of activities each marked by a start and finish time.

For example,

**Input:** {1, 4}, {3, 5}, {0, 6}, {5, 7}, {3, 8}, {5, 9}, {6, 10}, {8, 11}, {8, 12}, {2, 13}, {12, 14} **Output:** {1, 4}, {5, 7}, {8, 11}, {12, 14}

> 

In the [previous post](https://techiedelight.com/activity-selection-problem/), we have discussed a [greedy approach](https://techiedelight.com/greedy-algorithm-problems/) for activity selection problem. This post will discuss a [dynamic programming](https://techiedelight.com/introduction-dynamic-programming/) solution for the activity selection problem, which is nothing but a variation of the [Longest Increasing Subsequence (LIS)](https://techiedelight.com/longest-increasing-subsequence-using-dynamic-programming/) problem.

The idea is first to sort given activities in increasing order of their start time. Let `activities[0…n-1]` be the sorted array of activities. We can define an array `L` such that `L[i]` itself is an array that stores maximum non-conflicting activities ending at `i'th` activity. Therefore, `L[i]` can be recursively written as:

L[i] = activities[i] + { max(L[j]), where j < i and activities[j].end < activities[i].start } = activities[i], if there is no such j

For example, consider the following sorted activities:

{0, 6} {1, 4} {2, 13} {3, 5} {3, 8} {5, 7} {5, 9} {6, 10} {8, 11} {8, 12} {12, 14}

Then `L[]` would be:

L[0]: {0, 6} L[1]: {1, 4} L[2]: {2, 13} L[3]: {3, 5} L[4]: {3, 8} L[5]: {1, 4} {5, 7} L[6]: {1, 4} {5, 9} L[7]: {1, 4} {6, 10} L[8]: {1, 4} {5, 7} {8, 11} L[9]: {1, 4} {5, 7} {8, 12} L[10]: {1, 4} {5, 7} {8, 11} {12, 14}

1\. Count the maximum number of non-conflicting activities:

The algorithm can be implemented as follows in TypeScript:

```ts
// Returns the maximum count of non-conflicting activities that can be performed
// by a single person
function findNonConflictingActivitiesLength(activities: [number, number][]): number {

    // Sort the activities according to increasing order of their start time
    activities.sort((x, y) => x[0] - y[0]);

    // L[i] stores the maximum count of non-conflicting activities ending at i'th activity
    const L: number[] = new Array(activities.length).fill(0);

    for (let i = 0; i < activities.length; i++) {
        // consider each `j` less than `i`
        for (let j = 0; j < i; j++) {
            // L[i] = max(L[j]), where `activities[j].finish` is less than `activities[i].start`
            if (activities[j][1] < activities[i][0] && L[i] < L[j]) {
                L[i] = L[j];
            }
        }

        // increment L[i] since it ends at the i'th activity
        L[i] = L[i] + 1;
    }

    // return the maximum activity length in the list
    return Math.max(...L);
}

// Each pair stores the start and the finish time of a activity
const activities: [number, number][] = [
    [1, 4], [3, 5], [0, 6], [5, 7], [3, 8], [5, 9],
    [6, 10], [8, 11], [8, 12], [2, 13], [12, 14]
];

console.log('The maximum number of non-conflicting activities is',
    findNonConflictingActivitiesLength(activities));
```

**Output:** The maximum number of non-conflicting activities is 4


The time complexity of the above solution is O(n2) and requires O(n) extra space, where `n` is the total number of given activities.

2\. Print the maximum number of non-conflicting activities:

The algorithm can be implemented as follows in TypeScript:

```ts
// Find the maximum number of non-conflicting activities that can be performed
// by a single person
function findNonConflictingActivities(activities: [number, number][]): void {

    // sort the activities according to increasing order of their start time
    activities.sort((x, y) => x[0] - y[0]);

    // `L[i]` stores the maximum non-conflicting activities that end at i'th activity
    const L: [number, number][][] = Array.from({ length: activities.length }, () => []);

    for (let i = 0; i < activities.length; i++) {
        // consider each `j` less than `i`
        for (let j = 0; j < i; j++) {
            // L[i] = max(L[j]), where `activities[j].finish` is less than `activities[i].start`
            const [start, finish] = [activities[i][0], activities[j][1]];
            if (finish < start && L[i].length < L[j].length) {
                L[i] = L[j].slice();
            }
        }

        // `L[i]` ends at i'th activity
        L[i].push(activities[i]);
    }

    // find the list having a maximum size
    let max: [number, number][] = [];
    for (const pair of L) {
        if (max.length < pair.length) {
            max = pair;
        }
    }

    // print maximum non-conflicting activities
    console.log(max);
}

// Each pair stores the start and the finish time of a activity
const activities: [number, number][] = [
    [1, 4], [3, 5], [0, 6], [5, 7],
    [3, 8], [5, 9], [6, 10], [8, 11],
    [8, 12], [2, 13], [12, 14]
];

findNonConflictingActivities(activities);
```

**Output:** {1, 4} {5, 7} {8, 11} {12, 14}

The time complexity of the above solution is O(n2) and requires O(n2) extra space, where `n` is the total number of given activities.
