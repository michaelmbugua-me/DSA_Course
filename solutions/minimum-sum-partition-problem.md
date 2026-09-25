# Minimum Sum Partition Problem

> Source: https://www.techiedelight.com/minimum-sum-partition-problem/

Given a set of positive integers `S`, partition set `S` into two subsets, `S1` and `S2`, such that the difference between the sum of elements in `S1` and `S2` is minimized. The solution should return the minimum absolute difference between the sum of elements of two partitions.

For example, consider `S = {10, 20, 15, 5, 25}`.

We can partition `S` into two partitions where the minimum absolute difference between the sum of elements is 5.

`S1 = {10, 20, 5}` `S2 = {15, 25}`

Note that this solution is not unique. The following is another solution:

`S1 = {10, 25}` `S2 = {20, 15, 5}`

> 

This problem is an optimization version of the [partition problem](https://techiedelight.com/partition-problem/). The idea is to consider each item in the given set `S` one by one, and for each item, there are two possibilities:

  1. Include the current item in subset `S1` and recur for the remaining items.
  2. Include the current item from the subset `S2` and recur for the remaining items.

Finally, return the minimum difference we get by including the current item in `S1` and `S2`. When there are no items left in the set, return the absolute difference between elements of `S1` and `S2`.

Following is a TypeScript implementation of the idea:

```ts
// Partition set `S` into two subsets, `S1` and `S2`, such that the
// difference between the sum of elements in `S1` and the sum
// of elements in `S2` is minimized
function findMinAbsDiff(S: number[], n: number, S1 = 0, S2 = 0): number {

    // Base case: if the list becomes empty, return the absolute
    // difference between both sets
    if (n < 0) {
        return Math.abs(S1 - S2);
    }

    // Case 1. Include the current item in subset `S1` and recur
    // for the remaining items `n-1`
    const inc = findMinAbsDiff(S, n - 1, S1 + S[n], S2);

    // Case 2. Exclude the current item from subset `S1` and recur for
    // the remaining items `n-1`
    const exc = findMinAbsDiff(S, n - 1, S1, S2 + S[n]);

    return Math.min(inc, exc);
}

// Input: a set of items
const S = [10, 20, 15, 5, 25];

console.log(`The minimum difference is ${findMinAbsDiff(S, S.length - 1)}`);
```

**Output:** The minimum difference is 5

The time complexity of the above solution is exponential and occupies space in the call stack.

The problem has [optimal substructure](https://techiedelight.com/introduction-dynamic-programming/#optimal-substructure). That means the problem can be broken down into smaller, simple “subproblems”, which can further be divided into yet simpler, smaller subproblems until the solution becomes trivial. The above solution also exhibits [overlapping subproblems](https://techiedelight.com/introduction-dynamic-programming/#overlapping-subproblems). If we draw the solution’s recursion tree, we can see that the same subproblems are getting computed repeatedly.

We know that problems with optimal substructure and overlapping subproblems can be solved using [dynamic programming](https://techiedelight.com/dynamic-programming-interview-questions/), in which subproblem solutions are _memo_ ized rather than computed again and again.

Following is the _memo_ ized version in TypeScript that follows the top-down approach since we first break the problem into subproblems and then calculate and store values.

```ts
// Partition set `S` into two subsets, `S1` and `S2`, such that the
// difference between the sum of elements in `S1` and the sum
// of elements in `S2` is minimized
function findMinAbsDiff(S: number[], n: number, S1: number, S2: number,
                    lookup: Map<string, number>): number {

    // Base case: if the list becomes empty, return the absolute
    // difference between both sets
    if (n < 0) {
        return Math.abs(S1 - S2);
    }

    // Construct a unique key from dynamic elements of the input.
    // Note that we can uniquely identify the subproblem with `n` and `S1` only,
    // as `S2` is nothing but `S-S1`, where `S` is the sum of all elements
    const key = `${n}|${S1}`;

    // If the subproblem is seen for the first time, solve it and
    // store its result in a map
    if (!lookup.has(key)) {

        // Case 1. Include the current item in subset `S1` and recur
        // for the remaining items `n-1`
        const inc = findMinAbsDiff(S, n - 1, S1 + S[n], S2, lookup);

        // Case 2. Exclude the current item from subset `S1` and recur for
        // the remaining items `n-1`
        const exc = findMinAbsDiff(S, n - 1, S1, S2 + S[n], lookup);

        lookup.set(key, Math.min(inc, exc));
    }

    return lookup.get(key)!;
}

// Input: a set of items
const S = [10, 20, 15, 5, 25];

// create a map to store solutions to subproblems
const lookup = new Map<string, number>();

console.log(`The minimum difference is ${findMinAbsDiff(S, S.length - 1, 0, 0, lookup)}`);
```

**Output:** The minimum difference is 5

The time complexity of the above top-down solution is O(n × sum) and requires O(n × sum) extra space, where `n` is the size of the input and `sum` is the sum of all elements in the input.

We can also implement the bottom-up version of the memoized solution. The following code shows how to implement it in TypeScript:

```ts
function findMinAbsDiff(S: number[]): number {
    // Find the sum of all elements
    const sum = S.reduce((a, b) => a + b, 0);

    // Create a boolean table to store solutions to subproblems
    const T: boolean[][] = Array.from({ length: S.length + 1 },
        () => new Array(sum + 1).fill(false));

    // Fill the lookup table in a bottom-up manner
    for (let i = 0; i <= S.length; i++) {
        // elements with zero-sum are always true
        T[i][0] = true;

        for (let j = 1; i > 0 && j <= sum; j++) {
            // exclude the i'th element
            T[i][j] = T[i - 1][j];

            // include the i'th element
            if (S[i - 1] <= j) {
                T[i][j] = T[i][j] || T[i - 1][j - S[i - 1]];
            }
        }
    }

    // Find the maximum value of `j` between 0 and `sum/2` for which the
    // last row is true
    let j = Math.floor(sum / 2);
    while (j >= 0 && !T[S.length][j]) {
        j--;
    }
    return sum - 2 * j;
}

const S = [10, 20, 15, 5, 25];

console.log(`The minimum difference is ${findMinAbsDiff(S)}`);
```

**Output:** The minimum difference is 5
