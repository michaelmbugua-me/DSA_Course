# Count all paths in a matrix from the first cell to the last cell

> Source: https://www.techiedelight.com/count-all-paths-matrix-from-first-cell-to-last-cell/

Given an `M × N` rectangular grid, efficiently count all paths starting from the first cell `(0, 0)` to the last cell `(M-1, N-1)`. We can either move down or move towards right from a cell.

For example,

**Input:** 3 × 3 matrix **Output:** Total number of paths are 6 (0, 0) —> (0, 1) —> (0, 2) —> (1, 2) —> (2, 2) (0, 0) —> (0, 1) —> (1, 1) —> (1, 2) —> (2, 2) (0, 0) —> (0, 1) —> (1, 1) —> (2, 1) —> (2, 2) (0, 0) —> (1, 0) —> (2, 0) —> (2, 1) —> (2, 2) (0, 0) —> (1, 0) —> (1, 1) —> (1, 2) —> (2, 2) (0, 0) —> (1, 0) —> (1, 1) —> (2, 1) —> (2, 2)

> 

The idea is to start from the top-left corner of the matrix and recur for the next cell, which can be either the immediate right cell or the immediate bottom cell. We can easily maintain the path count as we move along in the recursion, as demonstrated below in TypeScript:

```ts
// Top-down recursive function to count all paths from cell (m, n)
// to the last cell (M-1, N-1) in a given `M × N` rectangular grid
function countPaths(M: number, N: number, m = 0, n = 0): number {
    // there is only one way to reach the last cell
    // when we are at the last row or the last column
    if (m === M - 1 || n === N - 1) {
        return 1;
    }

    // move down or right
    return countPaths(M, N, m + 1, n) + countPaths(M, N, m, n + 1);
}

// `M × N` matrix
const M = 3;
const N = 3;

const k = countPaths(M, N);
console.log(`The total number of paths is ${k}`);
```

**Output:** The total number of paths is 6

The time complexity of the proposed solution is exponential since it exhibits [overlapping subproblems](https://techiedelight.com/introduction-dynamic-programming/#overlapping-subproblems), i.e., it computes solutions to the same subproblems repeatedly. The problem also has an [optimal substructure](https://techiedelight.com/introduction-dynamic-programming/#optimal-substructure) as the solution to the problem can be derived using a solution to its subproblems. Since both [dynamic programming](https://techiedelight.com/dynamic-programming-interview-questions/) properties are satisfied, we can use it to optimize the code.

We can either store results of the function calls and return those results when the same input occurs again or construct an auxiliary matrix to store results of the smaller subproblems. The following code follows the later approach:

```ts
// Bottom-up function to count all paths from the first cell (0, 0)
// to the last cell (M-1, N-1) in a given `M × N` rectangular grid
function countPaths(m: number, n: number): number {
    // `T[i][j]` stores the number of paths from cell (0, 0) to cell (i, j)
    const T: number[][] = Array.from({ length: m }, () => new Array(n).fill(0));

    // There is only one way to reach any cell in the first column, i.e., to move down
    for (let i = 0; i < m; i++) {
        T[i][0] = 1;
    }

    // There is only one way to reach any cell in the first row, i.e., to move right
    for (let j = 0; j < n; j++) {
        T[0][j] = 1;
    }

    // fill `T` in a bottom-up manner
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            T[i][j] = T[i - 1][j] + T[i][j - 1];
        }
    }

    // last cell of `T[][]` stores the count of paths from cell (0, 0) to cell (i, j)
    return T[m - 1][n - 1];
}

// `M × N` matrix
const M = 3;
const N = 3;

const k = countPaths(M, N);
console.log(`The total number of paths is ${k}`);
```

**Output:** The total number of paths is 6

The time complexity of the proposed solution is O(M × N) for an `M × N` matrix. The auxiliary space required by the program is O(M × N). The space complexity of the solution can be improved up to O(N) as we are only reading data of the previous row for filling the current row. Following is the space-optimized solution using only a single array:

```ts
// Bottom-up space-efficient function to count all paths from the first
// cell (0, 0) to the last cell (M-1, N-1) in a given `M × N` rectangular grid
function countPaths(m: number, n: number): number {
    const T = new Array(n).fill(0);
    T[0] = 1;

    // fill `T[][]` in a bottom-up manner
    for (let i = 0; i < m; i++) {
        for (let j = 1; j < n; j++) {
            T[j] += T[j - 1];
        }
    }

    // return the last cell
    return T[n - 1];
}

// `M × N` matrix
const M = 3;
const N = 3;

const k = countPaths(M, N);
console.log(`The total number of paths is ${k}`);
```

**Output:** The total number of paths is 6

