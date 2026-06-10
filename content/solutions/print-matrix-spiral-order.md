# Print matrix in spiral order

> Source: https://www.techiedelight.com/print-matrix-spiral-order/

[Matrix](https://www.techiedelight.com/Category/Matrix/)

Given an `M × N` integer matrix, print it in spiral order.

For example,

**Input:** [ 1 2 3 4 5 ] [ 16 17 18 19 6 ] [ 15 24 25 20 7 ] [ 14 23 22 21 8 ] [ 13 12 11 10 9 ] **Output:** 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25

> 

The idea is to read elements from the given matrix and print the matrix in spiral order. Four loops are used to maintain the spiral order, each for the top, right, bottom, and left corner of the matrix.

Following is a TypeScript implementation of the idea:

```ts
function printSpiralOrder(mat: number[][]): void {

    // base case
    if (!mat || mat.length === 0) {
        return;
    }

    let top = 0;
    let left = 0;
    let bottom = mat.length - 1;
    let right = mat[0].length - 1;

    while (true) {
        if (left > right) {
            break;
        }

        // print top row
        for (let i = left; i <= right; i++) {
            process.stdout.write(mat[top][i] + ' ');
        }
        top = top + 1;

        if (top > bottom) {
            break;
        }

        // print right column
        for (let i = top; i <= bottom; i++) {
            process.stdout.write(mat[i][right] + ' ');
        }
        right = right - 1;

        if (left > right) {
            break;
        }

        // print bottom row
        for (let i = right; i >= left; i--) {
            process.stdout.write(mat[bottom][i] + ' ');
        }
        bottom = bottom - 1;

        if (top > bottom) {
            break;
        }

        // print left column
        for (let i = bottom; i >= top; i--) {
            process.stdout.write(mat[i][left] + ' ');
        }
        left = left + 1;
    }
}

const mat = [
    [1, 2, 3, 4, 5],
    [16, 17, 18, 19, 6],
    [15, 24, 25, 20, 7],
    [14, 23, 22, 21, 8],
    [13, 12, 11, 10, 9]
];

printSpiralOrder(mat);
```

**Output:** 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25

We can also achieve this easily with the help of [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/).

```ts
function printSpiral(mat: number[][], top: number, bottom: number, left: number, right: number): void {

    // base case
    if (!mat || mat.length === 0 || left > right) {
        return;
    }

    // print top row
    for (let i = left; i <= right; i++) {
        process.stdout.write(mat[top][i] + ' ');
    }

    top = top + 1;

    if (top > bottom) {
        return;
    }

    // print right column
    for (let i = top; i <= bottom; i++) {
        process.stdout.write(mat[i][right] + ' ');
    }

    right = right - 1;

    if (left > right) {
        return;
    }

    // print bottom row
    for (let i = right; i >= left; i--) {
        process.stdout.write(mat[bottom][i] + ' ');
    }

    bottom = bottom - 1;

    if (top > bottom) {
        return;
    }

    // print left column
    for (let i = bottom; i >= top; i--) {
        process.stdout.write(mat[i][left] + ' ');
    }

    left = left + 1;

    printSpiral(mat, top, bottom, left, right);
}

const mat = [
    [1, 2, 3, 4, 5],
    [16, 17, 18, 19, 6],
    [15, 24, 25, 20, 7],
    [14, 23, 22, 21, 8],
    [13, 12, 11, 10, 9]
];

const top = 0;
const bottom = mat.length - 1;
const left = 0;
const right = mat[0].length - 1;

printSpiral(mat, top, bottom, left, right);
```

**Output:** 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25

The time complexity of the proposed solution is O(M × N) for an `M × N` matrix. The auxiliary space required by the program is O(M × N) for recursion (call stack).
