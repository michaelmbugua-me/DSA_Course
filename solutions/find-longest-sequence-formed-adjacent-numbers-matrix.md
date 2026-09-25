# Find the longest sequence formed by adjacent numbers in the matrix

> Source: https://www.techiedelight.com/find-longest-sequence-formed-adjacent-numbers-matrix/

Given an `N × N` matrix where each cell has a distinct value in the 1 to `N × N`. Find the longest sequence formed by adjacent numbers in the matrix such that for each number, the number on the adjacent neighbor is `+1` in its value.

If we are at location `(x, y)` in the matrix, we can move to `(x, y+1)`, `(x, y-1)`, `(x+1, y)`, or `(x-1, y)` if the value at the destination cell is one more than the value at source cell. For example, the longest sequence formed by adjacent numbers in the following matrix is `[2, 3, 4, 5, 6, 7]`:

> 

The idea is to use [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/). The problem has [optimal substructure](https://techiedelight.com/introduction-dynamic-programming/#optimal-substructure). That means the problem can be broken down into smaller, simple “subproblems”, which can further be divided into yet simpler, smaller subproblems until the solution becomes trivial. We can recursively define the problem as:

The longest path starting from cell (i, j) = M[i][j] + | longest path starting from cell (i-1, j) (if M[i][j] + 1 = M[i-1][j]) | longest path starting from cell (i, j-1) (if M[i][j] + 1 = M[i][j-1]) | longest path starting from cell (i, j+1) (if M[i][j] + 1 = M[i][j+1]) | longest path starting from cell (i+1, j) (if M[i][j] + 1 = M[i+1][j])

This is demonstrated below in TypeScript:

```ts
// Function to check if a cell (i, j) is valid or not
function isValid(mat: number[][], i: number, j: number): boolean {
    return 0 <= i && i < mat.length && 0 <= j && j < mat.length;
}

// Find the longest path starting from cell (i, j) formed by adjacent
// numbers in a matrix
function findLongestPath(mat: number[][], i: number, j: number): number[] {

    // if the cell is invalid
    if (!isValid(mat, i, j)) {
        return [];
    }

    // path to store path starting (i, j)
    let path: number[] = [];

    // Since the matrix contains all distinct elements,
    // there is only one path possible from the current cell

    // recur top cell if its value is +1 of value at (i, j)
    if (i > 0 && mat[i - 1][j] - mat[i][j] === 1) {
        path = findLongestPath(mat, i - 1, j);
    }

    // recur right cell if its value is +1 of value at (i, j)
    if (j + 1 < mat.length && mat[i][j + 1] - mat[i][j] === 1) {
        path = findLongestPath(mat, i, j + 1);
    }

    // recur bottom cell if its value is +1 of value at (i, j)
    if (i + 1 < mat.length && mat[i + 1][j] - mat[i][j] === 1) {
        path = findLongestPath(mat, i + 1, j);
    }

    // recur left cell if its value is +1 of value at (i, j)
    if (j > 0 && mat[i][j - 1] - mat[i][j] === 1) {
        path = findLongestPath(mat, i, j - 1);
    }

    // return path starting from (i, j)
    path.unshift(mat[i][j]);
    return path;
}

function longestPath(mat: number[][]): number[] {

    // base case
    if (!mat || !mat.length) {
        return [];
    }

    // stores the longest path found so far
    let longest_path: number[] = [];

    // from each cell (i, j), find the longest path starting from it
    for (let i = 0; i < mat.length; i++) {
        for (let j = 0; j < mat.length; j++) {
            // store current path
            const path = findLongestPath(mat, i, j);

            // update result if a longer path is found
            if (path.length > longest_path.length) {
                longest_path = path; // update the longest path found so far
            }
        }
    }

    // print the path
    return longest_path;
}

const mat = [
    [10, 13, 14, 21, 23],
    [11, 9, 22, 2, 3],
    [12, 8, 1, 5, 4],
    [15, 24, 7, 6, 20],
    [16, 17, 18, 19, 25]
];

// find and print the longest path
console.log(longestPath(mat));
```

The implementation that involves only finding the length of the longest sequence can be seen [here](https://techiedelight.com/compiler/?run=EOO3Gy).

The time complexity of the proposed solution is exponential as we are doing a lot of redundant work. As we are calculating the longest path starting from each cell (i, j) of the matrix. Therefore,

The longest path starting from 2 is (2 — **3 — 4 — 5 — 6 — 7**) The longest path starting from 3 is (**3 — 4 — 5 — 6 — 7**) The longest path starting from 5 is (5 — 6 — 7) The longest path starting from 4 is (4 — 5 — 6 — 7) The longest path starting from 6 is (6 — 7)

The longest path starting from 2 is (2 — 3 — **4 — 5 — 6 — 7**) The longest path starting from 3 is (3 — **4 — 5 — 6 — 7**) The longest path starting from 5 is (5 — 6 — 7) The longest path starting from 4 is (**4 — 5 — 6 — 7**) The longest path starting from 6 is (6 — 7)

The longest path starting from 2 is (2 — 3 — 4 — **5 — 6 — 7**) The longest path starting from 3 is (3 — 4 — **5 — 6 — 7**) The longest path starting from 5 is (**5 — 6 — 7**) The longest path starting from 4 is (4 — **5 — 6 — 7**) The longest path starting from 6 is (6 — 7)

The longest path starting from 2 is (2 — 3 — 4 — 5 — **6 — 7**) The longest path starting from 3 is (3 — 4 — 5 — **6 — 7**) The longest path starting from 5 is (5 — **6 — 7**) The longest path starting from 4 is (4 — 5 — **6 — 7**) The longest path starting from 6 is (**6 — 7**)

As we can see, the same subproblems are getting computed repeatedly. As the recursion grows deeper, more and more of this type of unnecessary repetition occurs. We know that problems having optimal substructure and [overlapping subproblems](https://techiedelight.com/introduction-dynamic-programming/#overlapping-subproblems) can be solved by dynamic programming, in which subproblem solutions are memoized rather than computed repeatedly. Now each time we compute the longest path starting from cell (i, j), save it. If we are ever asked to compute it again, give the saved answer and do not recompute it.

The implementation can be seen below in TypeScript:

```ts
// Function to check if a cell (i, j) is valid or not
function isValid(mat: number[][], i: number, j: number): boolean {
    return (0 <= i && i < mat.length) && (0 <= j && j < mat.length);
}

// Find the longest path starting from cell (i, j) formed by adjacent
// numbers in a matrix
function findLongestPath(mat: number[][], i: number, j: number,
                         lookup: Map<string, string>): string {

    // if the cell is invalid
    if (!isValid(mat, i, j)) {
        return null;
    }

    // construct a unique map key from dynamic elements of the input
    const key = `${i}|${j}`;

    // if the subproblem is seen for the first time, solve it and
    // store its result in a map
    if (!lookup.has(key)) {

        // string to store path starting (i, j)
        let path: string = null;

        // recur top cell if its value is +1 of value at (i, j)
        if (i > 0 && mat[i - 1][j] - mat[i][j] === 1) {
            path = findLongestPath(mat, i - 1, j, lookup);
        }

        // recur right cell if its value is +1 of value at (i, j)
        if (j + 1 < mat.length && mat[i][j + 1] - mat[i][j] === 1) {
            path = findLongestPath(mat, i, j + 1, lookup);
        }

        // recur bottom cell if its value is +1 of value at (i, j)
        if (i + 1 < mat.length && mat[i + 1][j] - mat[i][j] === 1) {
            path = findLongestPath(mat, i + 1, j, lookup);
        }

        // recur left cell if its value is +1 of value at (i, j)
        if (j > 0 && mat[i][j - 1] - mat[i][j] === 1) {
            path = findLongestPath(mat, i, j - 1, lookup);
        }

        // note that as the matrix contains all distinct elements,
        // there is only one path possible from the current cell

        lookup.set(key, path ? `${mat[i][j]}, ${path}` : String(mat[i][j]));
    }

    // return path starting from (i, j)
    return lookup.get(key);
}

function longestPath(mat: number[][]): string {

    let res_size = Number.MIN_SAFE_INTEGER; // stores number of elements in `result`
    let result: string = null;             // stores the longest path found so far

    // create a map to store solutions to subproblems
    const lookup = new Map<string, string>();

    // from each cell (i, j), find the longest path starting from it
    for (let i = 0; i < mat.length; i++) {
        for (let j = 0; j < mat.length; j++) {
            // store current path (`path` would be like `1, 2, 3, 4, 5, 6, 7`)
            const path = findLongestPath(mat, i, j, lookup);

            // find the number of elements involved in the current path
            const size = [...path].filter(ch => ch === ',').length;

            // update result if a longer path is found
            if (size > res_size) {
                result = path;         // update the longest path found so far
                res_size = size;
            }
        }
    }

    // print the path
    return result;
}

const mat = [
    [10, 13, 14, 21, 23],
    [11, 9, 22, 2, 3],
    [12, 8, 1, 5, 4],
    [15, 24, 7, 6, 20],
    [16, 17, 18, 19, 25]
];

// find and print the longest path
console.log(longestPath(mat));
```

The time complexity of the proposed solution is O(N2) for an `N × N` matrix. The auxiliary space required by the program is O(N2).

**Exercise:** Extend the solution to consider diagonal moves as well.
