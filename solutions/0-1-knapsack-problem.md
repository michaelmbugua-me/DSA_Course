# 0–1 Knapsack Problem

> Source: https://www.techiedelight.com/0-1-knapsack-problem/

In the 0–1 Knapsack problem, we are given a set of items, each with a weight and a value, and we need to determine the number of each item to include in a collection so that the total weight is less than or equal to a given limit and the total value is as large as possible.

Please note that the items are indivisible; we can either take an item or not (0-1 property). For example,

**Input:** value = [ 20, 5, 10, 40, 15, 25 ] weight = [ 1, 2, 3, 8, 7, 4 ] int W = 10 **Output:** Knapsack value is 60 value = 20 + 40 = 60 weight = 1 + 8 = 9 < W

> 

The idea is to use [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/) to solve this problem. For each item, there are two possibilities:

  1. Include the current item in the knapsack and recur for remaining items with knapsack’s decreased capacity. If the capacity becomes negative, do not recur or return `-INFINITY`.
  2. Exclude the current item from the knapsack and recur for the remaining items.

Finally, return the maximum value we get by including or excluding the current item. The base case of the recursion would be when no items are left, or capacity becomes 0.

The following TypeScript implementation finds the maximum value that can be attained with weight less than or equal to `W` recursively using the above relations:

```ts
// Values (stored in array `v`)
// Weights (stored in array `w`)
// Total number of distinct items `n`
// Knapsack capacity `W`
function knapsack(v: number[], w: number[], n: number, W: number): number {
    // base case: Negative capacity
    if (W < 0) {
        return -Number.MAX_VALUE;
    }

    // base case: no items left or capacity becomes 0
    if (n < 0 || W === 0) {
        return 0;
    }

    // Case 1. Include current item `v[n]` in the knapsack and recur for
    // remaining items `n-1` with decreased capacity `W-w[n]`
    const include = v[n] + knapsack(v, w, n - 1, W - w[n]);

    // Case 2. Exclude current item `v[n]` from the knapsack and recur for
    // remaining items `n-1`
    const exclude = knapsack(v, w, n - 1, W);

    // return maximum value we get by including or excluding the current item
    return Math.max(include, exclude);
}

// 0–1 Knapsack problem
// input: a set of items, each with a weight and a value
const v = [20, 5, 10, 40, 15, 25];
const w = [1, 2, 3, 8, 7, 4];

// knapsack capacity
const W = 10;

console.log(`Knapsack value is ${knapsack(v, w, v.length - 1, W)}`);
```

**Output:** Knapsack value is 60


The time complexity of the above solution is exponential and occupies space in the call stack.

The above solution has an [optimal substructure](https://techiedelight.com/introduction-dynamic-programming/#optimal-substructure), i.e., the optimal solution can be constructed efficiently from optimal solutions of its subproblem. It also has [overlapping subproblems](https://techiedelight.com/introduction-dynamic-programming/#overlapping-subproblems), i.e., the problem can be broken down into subproblems, and each subproblem is repeated several times. To reuse the subproblem solutions, we can apply [dynamic programming](https://techiedelight.com/dynamic-programming-interview-questions/), in which subproblem solutions are _memo_ ized rather than computed over and over again.

Following is the _memo_ ized version in TypeScript, which follows the top-down approach since we first break the problem into subproblems and then calculate and store values.

```ts
// Values (stored in array `v`)
// Weights (stored in array `w`)
// Total number of distinct items `n`
// Knapsack capacity `W`
function knapsack(v: number[], w: number[], n: number, W: number, lookup: Map<string, number>): number {
    // base case: Negative capacity
    if (W < 0) {
        return -Number.MAX_VALUE;
    }

    // base case: no items left or capacity becomes 0
    if (n < 0 || W === 0) {
        return 0;
    }

    // construct a unique map key from dynamic elements of the input
    const key = `${n}|${W}`;

    // if the subproblem is seen for the first time, solve it and
    // store its result in a map
    if (!lookup.has(key)) {
        // Case 1. Include current item `v[n]` in the knapsack and recur for
        // remaining items `n-1` with decreased capacity `W-w[n]`
        const include = v[n] + knapsack(v, w, n - 1, W - w[n], lookup);

        // Case 2. Exclude current item `v[n]` from the knapsack and recur for
        // remaining items `n-1`
        const exclude = knapsack(v, w, n - 1, W, lookup);

        // assign the max value we get by including or excluding the current item
        lookup.set(key, Math.max(include, exclude));
    }

    // return solution to the current subproblem
    return lookup.get(key)!;
}

// 0–1 Knapsack problem
// input: a set of items, each with a weight and a value
const v = [20, 5, 10, 40, 15, 25];
const w = [1, 2, 3, 8, 7, 4];

// knapsack capacity
const W = 10;

// create a map to store solutions to a subproblem
const lookup = new Map<string, number>();

console.log(`Knapsack value is ${knapsack(v, w, v.length - 1, W, lookup)}`);
```

**Output:** Knapsack value is 60


The time complexity of the above top-down solution is O(n.W) and requires O(n.W) extra space, where `n` is the total number of items in the input and `W` is the knapsack’s capacity.

We can also solve this problem in a bottom-up manner. In the bottom-up approach, we solve smaller subproblems first, then solve larger subproblems from them. The following bottom-up approach computes `T[i][j]`, for each `1 <= i <= n` and `0 <= j <= W`, which is the maximum value that can be attained with weight less than or equal to `j` and using items up to first `i` items. It uses the value of smaller values `i` and `j` already computed. It has the same asymptotic runtime as Memoization but no recursion overhead.

The algorithm can be implemented as follows in TypeScript:

```ts
// Input:
// Values (stored in array `v`)
// Weights (stored in array `w`)
// Total number of distinct items `n`
// Knapsack capacity `W`
function knapsack(v: number[], w: number[], n: number, W: number): number {
    // `T[i][j]` stores the maximum value that can be attained with
    // weight less than or equal to `j` using items up to first `i` items
    const T: number[][] = Array.from({ length: n + 1 }, () => new Array(W + 1).fill(0));

    // do for i'th item
    for (let i = 1; i <= n; i++)
    {
        // consider all weights from 0 to maximum capacity `W`
        for (let j = 0; j <= W; j++)
        {
            // don't include the i'th element if `j-w[i-1]` is negative
            if (w[i - 1] > j) {
                T[i][j] = T[i - 1][j];
            }
            else {
                // find the maximum value by excluding or including the i'th item
                T[i][j] = Math.max(T[i - 1][j], T[i - 1][j - w[i - 1]] + v[i - 1]);
            }
        }
    }

    // return maximum value
    return T[n][W];
}

// 0–1 Knapsack problem
// input: a set of items, each with a weight and a value
const v = [20, 5, 10, 40, 15, 25];
const w = [1, 2, 3, 8, 7, 4];

// knapsack capacity
const W = 10;

console.log(`Knapsack value is ${knapsack(v, w, v.length, W)}`);
```

**Output:** Knapsack value is 60
