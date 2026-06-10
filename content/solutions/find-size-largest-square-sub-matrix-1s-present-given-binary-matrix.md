# Find the size of the largest square submatrix of 1’s present in a binary matrix

> Source: https://www.techiedelight.com/find-size-largest-square-sub-matrix-1s-present-given-binary-matrix/

Given an `M × N` binary matrix, find the size of the largest square submatrix of `1's` present.

For example, the size of the largest square submatrix of `1's` is `3` in the following matrix:

0 0 1 0 1 1 0 1 1 1 0 0 0 0 1 1 1 1 1 1 0 1 1 1 1 1 1 1 1 1 1 1 0 1 1 1 1 0 1 1 1 1 1 1 1 0 1 1

> 

The idea is to use dynamic programming to solve this problem. The problem has [optimal substructure](https://techiedelight.com/introduction-dynamic-programming/#optimal-substructure). The size of the largest square submatrix ending at a cell `M[i][j]` will be 1 plus the minimum among the largest square submatrix ending at `M[i][j-1]`, `M[i-1][j]` and `M[i-1][j-1]`. The result will be the maximum of all square submatrix ending at `M[i][j]` for all possible values of `i` and `j`.

How does this works?

Let’s consider any `2×2` matrix. For it to be a `2×2` matrix, each of the top, left, and top-left neighbor of its bottom-right corner has to be a `1×1` square matrix.

Similarly, for a `3×3` matrix, each top, left, and top-left neighbor of its bottom-right corner has to be a `2×2` square matrix.

In general, for any `n × n` square matrix, each of its neighbors at the top left and top-left corner should at least have the size of `(n-1) × (n-1)`. The reverse of this statement is also true. If the size of the square submatrix ending at top, left, and top-left neighbors of any _cell_ in the given matrix is at least `n-1`, then we can get `n × n` submatrix from that _cell_. That is the reason behind picking up the smallest neighboring square and adding 1 to it.

The following figure might help in visualizing things better:

Following is the TypeScript implementation of the idea:

```ts
// Function to find the size of the largest square submatrix of 1's
// present in a given binary matrix
function findLargestSquare(mat: number[][], m: number, n: number,
        maxsize: { value: number }): number {
    // base condition
    if (m < 0 || n < 0) {
        return 0;
    }

    // find the largest square matrix ending at mat[m][n-1]
    const left = findLargestSquare(mat, m, n - 1, maxsize);

    // find the largest square matrix ending at mat[m-1][n]
    const top = findLargestSquare(mat, m - 1, n, maxsize);

    // find the largest square matrix ending at mat[m-1][n-1]
    const diagonal = findLargestSquare(mat, m - 1, n - 1, maxsize);

    /*
        The largest square matrix ending at mat[m][n] will be 1 plus
        minimum of largest square matrix ending at mat[m][n-1],
        mat[m-1][n] and mat[m-1][n-1]
    */

    let size = 0;
    if (mat[m][n]) {
        size = 1 + Math.min(Math.min(top, left), diagonal);
    }

    // update maximum size found so far
    maxsize.value = Math.max(maxsize.value, size);

    // return the size of the largest square matrix ending at mat[m][n]
    return size;
}

function findLargestSquareSubmatrix(mat: number[][]): number {

    // base case
    if (!mat || mat.length === 0) {
        return 0;
    }

    // `M × N` matrix
    const M = mat.length;
    const N = mat[0].length;

    // `maxsize` stores the size of the largest square submatrix of 1's
    // and is passed by reference
    const maxsize = { value: 0 };

    findLargestSquare(mat, M - 1, N - 1, maxsize);
    return maxsize.value;
}

const mat = [
    [0, 0, 1, 0, 1, 1],
    [0, 1, 1, 1, 0, 0],
    [0, 0, 1, 1, 1, 1],
    [1, 1, 0, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 0, 1, 1, 1],
    [1, 0, 1, 1, 1, 1],
    [1, 1, 1, 0, 1, 1]
];

console.log("The size of the largest square submatrix of 1's is",
    findLargestSquareSubmatrix(mat));
```

**Output:** The size of the largest square submatrix of 1’s is 3

The time complexity of the proposed solution is exponential and occupies space in the call stack.

The above solution exhibits [overlapping subproblems](https://techiedelight.com/introduction-dynamic-programming/#overlapping-subproblems). If we draw the solution’s recursion tree, we can see that the same subproblems are repeatedly computed. We know that problems with optimal substructure and overlapping subproblems can be solved using dynamic programming, in which subproblem solutions are memoized rather than computed repeatedly. The _memo_ ized version follows the top-down approach since we first break the problem into subproblems and then calculate and store values. We can also solve this problem in a bottom-up manner. In the bottom-up approach, we solve smaller subproblems first, then solve larger subproblems from them.

Following is the TypeScript implementation of the idea:

```ts
// Function to find the size of the largest square submatrix of 1's
// present in a given binary matrix
function findLargestSquare(mat: number[][]): number {

    // base case
    if (!mat || mat.length === 0) {
        return 0;
    }

    // `T[i][j]` stores the size of maximum square submatrix ending at `mat[i][j]`
    const T: number[][] = Array.from({ length: mat.length }, () =>
        new Array(mat[0].length).fill(0));

    // `max` stores the size of the largest square submatrix of 1's
    let max = 0;

    // fill in a bottom-up manner
    for (let i = 0; i < mat.length; i++) {
        for (let j = 0; j < mat[0].length; j++) {
            T[i][j] = mat[i][j];

            // if we are not at the first row or first column and the
            // current cell has value 1
            if (i > 0 && j > 0 && mat[i][j] === 1) {
                // the largest square submatrix ending at `mat[i][j]` will be 1 plus
                // minimum of the largest square submatrix ending at `mat[i][j-1]`,
                // `mat[i-1][j]` and `mat[i-1][j-1]`

                T[i][j] = Math.min(T[i][j - 1], T[i - 1][j], T[i - 1][j - 1]) + 1;
            }

            // update maximum size found so far
            if (max < T[i][j]) {
                max = T[i][j];
            }
        }
    }

    // return size of the largest square matrix
    return max;
}

// input matrix
const mat = [
    [0, 0, 1, 0, 1, 1],
    [0, 1, 1, 1, 0, 0],
    [0, 0, 1, 1, 1, 1],
    [1, 1, 0, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 0, 1, 1, 1],
    [1, 0, 1, 1, 1, 1],
    [1, 1, 1, 0, 1, 1]
];

console.log("The size of largest square submatrix of 1's is", findLargestSquare(mat));
```

The time complexity of the proposed solution is O(M × N) for an `M × N` matrix. The auxiliary space required by the program is O(M × N).

**Exercise:** Find the size of the largest rectangular submatrix of 1’s present in a given binary matrix.
