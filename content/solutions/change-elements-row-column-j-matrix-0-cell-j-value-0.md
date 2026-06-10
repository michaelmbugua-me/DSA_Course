# Change all elements of row `i` and column `j` in a matrix to 0 if cell `(i, j)` is 0

> Source: https://www.techiedelight.com/change-elements-row-column-j-matrix-0-cell-j-value-0/

[Matrix](https://www.techiedelight.com/Category/Matrix/)

Given an `M × N` matrix consisting of only `0` or `1`, change all elements of row `i` and column `j` to `0` if cell `(i, j)` has value `0`. Do this without using any extra space for every `(i, j)` having value `0`.

For example,

**Input:** [ 1 1 0 1 1 ] [ 1 1 1 1 1 ] [ 1 1 1 0 1 ] [ 1 1 1 1 1 ] [ 0 1 1 1 1 ] **Output:** [ 0 0 0 0 0 ] [ 0 1 0 0 1 ] [ 0 0 0 0 0 ] [ 0 1 0 0 1 ] [ 0 0 0 0 0 ] **Explanation:** 0’s are present at (0, 2), (4, 0), and (2, 3) in the input matrix. So, we change all elements of the following cells to 0:

  * row 0 and column 2
  * row 4 and column 0
  * row 2 and column 3

> 

A simple solution is to traverse the matrix and if we encounter any cell `(i, j)` that has value `0`, change each element in the row `i` and column `j` to some arbitrary value other than `0` or `1`. Later traverse the matrix once again and replace all elements with assigned value to `0`.

The algorithm can be implemented as follows in TypeScript:

```ts
// Function to change all elements of row `x` and column `y` to -1
const changeRowColumn = (mat: number[][], M: number, N: number, x: number, y: number): void => {

    for (let j = 0; j < N; j++) {
        if (mat[x][j]) {
            mat[x][j] = -1;
        }
    }

    for (let i = 0; i < M; i++) {
        if (mat[i][y]) {
            mat[i][y] = -1;
        }
    }
};

// Function to convert the matrix
const convert = (mat: number[][]): void => {

    // base case
    if (!mat || mat.length === 0) {
        return;
    }

    // `M × N` matrix
    const M = mat.length, N = mat[0].length;

    // traverse the matrix
    for (let i = 0; i < M; i++) {
        for (let j = 0; j < N; j++) {
            if (mat[i][j] === 0) {      // cell `(i, j)` has value 0
                // change each non-zero element in row `i` and column `j` to -1
                changeRowColumn(mat, M, N, i, j);
            }
        }
    }

    // traverse the matrix once again and replace cells having
    // value -1 with 0
    for (let i = 0; i < M; i++) {
        for (let j = 0; j < N; j++) {
            if (mat[i][j] === -1) {
                mat[i][j] = 0;
            }
        }
    }
};

const mat = [
    [1, 1, 0, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 0, 1, 1],
    [1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1]
];

// convert the matrix
convert(mat);

// print matrix
for (const r of mat) {
    console.log(r);
}
```

The time complexity of the proposed solution is O(M × N × (M + N)), which is not efficient for an `M × N` matrix.

We can solve this problem in O(M × N) time as well. The idea is to traverse the matrix once and use the first row and the first column (or last row and last column) to mark if any cell in the corresponding row or column has a value `0` or not. Before doing that, initially mark if the chosen row/column has any `0's` present in them in two different flags.

Following is the TypeScript implementation of the idea. Note that this method will work for any integer matrix (not just binary matrix).

```ts
// Function to convert the matrix
const convert = (mat: number[][]): void => {

    // base case
    if (!mat || mat.length === 0) {
        return;
    }

    const M = mat.length, N = mat[0].length;

    let rowFlag = false, colFlag = false;

    // scan the first row for any 0's
    for (let j = 0; j < N; j++) {
        if (mat[0][j] === 0) {
            rowFlag = true;
            break;
        }
    }

    // scan the first column for any 0's
    for (let i = 0; i < M; i++) {
        if (mat[i][0] === 0) {
            colFlag = true;
            break;
        }
    }

    // process the rest of the matrix and use the first row and the
    // first column to mark if any cell in the corresponding
    // row or column has a value 0 or not
    for (let i = 1; i < M; i++) {
        for (let j = 1; j < N; j++) {
            if (mat[i][j] === 0) {
                mat[0][j] = mat[i][0] = 0;
            }
        }
    }

    // if `(0, j)` or `(i, 0)` is 0, assign 0 to cell `(i, j)`
    for (let i = 1; i < M; i++) {
        for (let j = 1; j < N; j++) {
            if (mat[0][j] === 0 || mat[i][0] === 0) {
                mat[i][j] = 0;
            }
        }
    }

    // if `rowFlag` is true, then assign 0 to all cells of the first row
    for (let i = 0; rowFlag && i < N; i++) {
        mat[0][i] = 0;
    }

    // if `colFlag` is true, then assign 0 to all cells of the first column
    for (let i = 0; colFlag && i < M; i++) {
        mat[i][0] = 0;
    }
};

const mat = [
    [5, 3, 0, 8, 1],
    [8, 1, 8, 4, 7],
    [2, 6, 5, 0, 3],
    [1, 4, 2, 7, 9],
    [0, 1, 3, 6, 5]
];

// convert the matrix
convert(mat);

for (const r of mat) {
    console.log(r);
}
```

**Output:** 0 0 0 0 0 0 1 0 0 7 0 0 0 0 0 0 4 0 0 9 0 0 0 0 0

**Output:** 0 0 0 0 0 0 1 0 0 7 0 0 0 0 0 0 4 0 0 9 0 0 0 0 0

The time complexity of the above solution is O(M × N) and doesn’t require any extra space for the M × N matrix.
