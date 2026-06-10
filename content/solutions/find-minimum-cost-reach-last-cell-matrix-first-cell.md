# Find minimum cost to reach the last cell of a matrix from its first cell

> Source: https://www.techiedelight.com/find-minimum-cost-reach-last-cell-matrix-first-cell/

Given an `M × N` matrix of integers where each cell has a cost associated with it, find the minimum cost to reach the last cell `(M-1, N-1)` of the matrix from its first cell `(0, 0)`. We can only move one unit right or one unit down from any cell, i.e., from cell `(i, j)`, we can move to `(i, j+1)` or `(i+1, j)`.

For example,

The highlighted path shows the minimum cost path having a cost of 36.

> 

The idea is to use [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/). The problem has [optimal substructure](https://techiedelight.com/introduction-dynamic-programming/#optimal-substructure). That means the problem can be broken down into smaller, simple “subproblems”, which can further be divided into yet simpler, smaller subproblems until the solution becomes trivial. We can recursively define the problem as:

Cost to reach cell (m, n) = cost[m][n] + min (cost to reach cell (m, n-1), cost to reach cell (m, n-1))

Following is a TypeScript implementation of the idea:

```ts
// Naive recursive function to find the minimum cost to reach
// cell (m, n) from cell (0, 0)
function findMinCost(cost: number[][], m: number, n: number): number {

    // base case
    if (n === 0 || m === 0) {
        return Infinity;
    }

    // if we are in the first cell (0, 0)
    if (m === 1 && n === 1) {
        return cost[0][0];
    }

    // include the current cell's cost in the path and recur to find the minimum
    // of the path from the adjacent left cell and adjacent top cell.
    return Math.min(findMinCost(cost, m - 1, n), findMinCost(cost, m, n - 1))
        + cost[m - 1][n - 1];
}

function findMinCostOverall(cost: number[][]): number {

    // base case
    if (!cost || !cost.length) {
        return 0;
    }

    // `M × N` matrix
    const M = cost.length;
    const N = cost[0].length;

    return findMinCost(cost, M, N);
}

const cost = [
    [4, 7, 8, 6, 4],
    [6, 7, 3, 9, 2],
    [3, 8, 1, 2, 4],
    [7, 1, 7, 3, 7],
    [2, 9, 8, 9, 3]
];

console.log(`The minimum cost is ${findMinCostOverall(cost)}`);
```

**Output:** The minimum cost is 36

The time complexity of the proposed solution is exponential as we are doing a lot of redundant work. For example, consider the recursion tree for a `5 × 5` matrix.

As we can see, the same subproblems (highlighted in the same color) are getting computed repeatedly. As the recursion grows deeper, more and more of this type of unnecessary repetition occurs. We know that problems having optimal substructure and [overlapping subproblems](https://techiedelight.com/introduction-dynamic-programming/#overlapping-subproblems) can be solved by dynamic programming, in which subproblem solutions are memoized rather than computed repeatedly. Each time we calculate the minimum cost of reaching any cell `(i, j)`, we save it. If we are ever asked to compute it again, give the saved answer and do not recompute it.

The following bottom-up approach computes, for each `0 <= i < M` and `0 <= j < N`, the minimum costs of reaching cell `(i, j)` from cell `(0, 0)`, using the costs of smaller values `i` and `j` already computed. It has the same asymptotic runtime as Memoization but no recursion overhead.

Following is a TypeScript implementation of the idea:

```ts
// Iterative function to find the minimum cost to traverse from the
// first cell to the last cell of a matrix
function findMinCost(cost: number[][]): number {

    // base case
    if (!cost || !cost.length) {
        return 0;
    }

    // `M × N` matrix
    const [M, N] = [cost.length, cost[0].length];

    // `T[i][j]` maintains the minimum cost to reach cell (i, j) from cell (0, 0)
    const T: number[][] = Array.from({ length: M }, () => Array(N).fill(0));

    // fill the matrix in a bottom-up manner
    for (let i = 0; i < M; i++) {
        for (let j = 0; j < N; j++) {
            T[i][j] = cost[i][j];

            // fill the first row (there is only one way to reach any cell in the
            // first row from its adjacent left cell)
            if (i === 0 && j > 0) {
                T[0][j] += T[0][j - 1];
            }

            // fill the first column (there is only one way to reach any cell in
            // the first column from its adjacent top cell)
            else if (j === 0 && i > 0) {
                T[i][0] += T[i - 1][0];
            }

            // fill the rest with the matrix (there are two ways to reach any
            // cell in the rest of the matrix, from its adjacent
            // left cell or adjacent top cell)
            else if (i > 0 && j > 0) {
                T[i][j] += Math.min(T[i - 1][j], T[i][j - 1]);
            }
        }
    }

    // last cell of `T[][]` stores the minimum cost to reach destination cell
    // (M-1, N-1) from source cell (0, 0)
    return T[M - 1][N - 1];
}

const cost = [
    [4, 7, 8, 6, 4],
    [6, 7, 3, 9, 2],
    [3, 8, 1, 2, 4],
    [7, 1, 7, 3, 7],
    [2, 9, 8, 9, 3]
];

console.log(`The minimum cost is ${findMinCost(cost)}`);
```

**Output:** The minimum cost is 36

The time complexity of the proposed solution is O(M × N) for an `M × N` matrix. The auxiliary space required by the program is O(M × N).

**Exercise:** Extend the solution to consider diagonal moves as well.
