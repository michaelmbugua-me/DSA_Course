# Collect maximum points in a matrix by satisfying given constraints

> Source: https://www.techiedelight.com/collect-maximum-points-matrix-satisfying-given-constraints/

Given an `M × N` matrix where each cell can have a value of 1, 0, or -1, where -1 denotes an unsafe cell, collect the maximum number of ones starting from the first cell and by visiting only safe cells (i.e., 0 or 1). We can only go left or down if the row is odd; otherwise, we can only go right or down from the current cell.

For example, consider the following matrix shown on the left. The maximum value collected is 9 as marked.

> 

The idea is to use [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/). The problem has [optimal substructure](https://techiedelight.com/introduction-dynamic-programming/#optimal-substructure). That means the problem can be broken down into smaller, simple “subproblems”, which can further be divided into yet simpler, smaller subproblems until the solution becomes trivial. For matrix `M`, we can recursively define the problem as:

if (M[i][j] != -1) path(i, j) = M[i][j] + | max(path(i, j – 1), path(i + 1, j)) (if i is odd) | max(path(i, j + 1), path(i + 1, j)) (if i is even) else path(i, j) = 0

Here, `path(i, j)` calculates the maximum value that can be collected starting from cell `(i, j)`. Following is a TypeScript implementation of the idea:

```ts
// Function to check if cell (i, j) is invalid or unsafe to visit
function isNotSafe(mat: number[][], i: number, j: number): boolean {
    return i < 0 || i >= mat.length || j < 0 || j >= mat[0].length || mat[i][j] === -1;
}

// Function to collect the maximum number of ones starting from cell `mat[i][j]`
function findMaximum(mat: number[][], i = 0, j = 0): number {

    // base case
    if (!mat || mat.length === 0) {
        return 0;
    }

    // return if cell (i, j) is invalid or unsafe to visit
    if (isNotSafe(mat, i, j)) {
        return 0;
    }

    // if the row is odd, we can go left or down
    if (i & 1) {
        return mat[i][j] + Math.max(findMaximum(mat, i, j - 1), findMaximum(mat, i + 1, j));
    }

    // if the row is even, we can go right or down
    else {
        return mat[i][j] + Math.max(findMaximum(mat, i, j + 1), findMaximum(mat, i + 1, j));
    }
}

const mat = [
    [1, 1, -1, 1, 1],
    [1, 0, 0, -1, 1],
    [1, 1, 1, 1, -1],
    [-1, -1, 1, 1, 1],
    [1, 1, -1, -1, 1]
];

console.log(`The maximum value collected is ${findMaximum(mat)}`);
```

**Output:** The maximum value collected is 9

The time complexity of the proposed solution is exponential and occupies space in the call stack.

The problem clearly exhibits [overlapping subproblems](https://techiedelight.com/introduction-dynamic-programming/#overlapping-subproblems), so we will end up solving the same subproblem over and over again. The repeated subproblems can be seen by drawing a recursion tree for any `M × N` matrix. We know that problems having optimal substructure and overlapping subproblems can be solved by dynamic programming, in which subproblem solutions are saved rather than computed repeatedly.

In the following TypeScript implementation, we use a bottom-up approach, i.e., we solve smaller subproblems first, then solve larger subproblems from them. It computes `T[i][j]`, for each `1 <= i <= M` and `1 <= j <= N`, which stores the maximum value that can be collected till cell ending `(i-1, j-1)`. It makes use of smaller values of `i` and `j` already computed and has the same asymptotic runtime as _Memo_ ization, but no recursion overhead.

```ts
// Function to collect maximum value from the first cell (0, 0)
function findMaximum(mat: number[][]): number {

    // base case
    if (!mat || mat.length === 0) {
        return 0;
    }

    // `M × N` matrix
    const M = mat.length;
    const N = mat[0].length;

    // `T[i][j]` stores the maximum value that can be collected
    // from any cell to cell (i-1, j-1)
    const T = Array.from({ length: M + 1 }, () => new Array(N + 1).fill(0));

    // process each row one by one and fill the lookup table `T`
    for (let i = 1; i <= M; i++) {

        // handle odd and even row separately
        if (i & 1) {
            // process current row from left to right
            for (let j = 1; j <= N; j++) {
                if (mat[i - 1][j - 1] !== -1) {
                    T[i][j] = mat[i - 1][j - 1] + Math.max(T[i][j - 1], T[i - 1][j]);
                }
            }
        }

        else {
            // process current row from right to left
            for (let j = N - 1; j >= 1; j--) {
                if (mat[i - 1][j - 1] !== -1) {
                    T[i][j] = mat[i - 1][j - 1] + Math.max(T[i][j + 1], T[i - 1][j]);
                }
            }
        }
    }

    // trace maximum ones starting from the first cell
    let i = 1, j = 1;
    let result = T[i][j];

    while (i <= M && j >= 0 && j <= N) {
        if (T[i][j] === T[i + 1][j] || T[i][j] + 1 === T[i + 1][j]) {
            i = i + 1;
        }
        else if (T[i][j] === T[i][j + 1] || T[i][j] + 1 === T[i][j + 1]) {
            j = j + 1;
        }
        else if (T[i][j] === T[i][j - 1] || T[i][j] + 1 === T[i][j - 1]) {
            j = j - 1;
        }
        else {
            break;
        }

        result = T[i][j];
    }

    return result;
}

const mat = [
    [1, 1, -1, 1, 1],
    [1, 0, 0, -1, 1],
    [1, 1, 1, 1, -1],
    [-1, -1, 1, 1, 1],
    [1, 1, -1, -1, 1]
];

console.log(`The maximum value collected is ${findMaximum(mat)}`);
```

The time complexity of the proposed solution is O(M × N) for an `M × N` matrix. The auxiliary space required by the program is O(M × N).
