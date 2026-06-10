# Fill binary matrix with alternating rectangles of 0 and 1

> Source: https://www.techiedelight.com/fill-binary-matrix-alternating-rectangles-0-1/

[Matrix](https://www.techiedelight.com/Category/Matrix/)

Given an `M × N` binary matrix, fill it with alternating rectangles of 1’s and 0’s.

For example,

**Input:** 10 × 8 matrix **Output:** 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 1 1 0 1 1 1 1 0 1 1 0 1 0 0 1 0 1 1 0 1 0 0 1 0 1 1 0 1 0 0 1 0 1 1 0 1 0 0 1 0 1 1 0 1 1 1 1 0 1 1 0 0 0 0 0 0 1 1 1 1 1 1 1 1 1

> 

The idea is to fill the matrix by following the [spiral order](https://techiedelight.com/print-matrix-spiral-order/). All elements involved in each alternating run in spiral order are filled by either `0` or `1` based on input from the last run. Four loops are used to maintain the spiral order, each for the top, right, bottom, and left corner of the matrix.

Following is the implementation in TypeScript based on the above idea:

```ts
// Fill a binary matrix with alternating rectangles of 1's and 0's
function processMatrix(mat: number[][]): void {

    // base case
    if (!mat || !mat.length) {
        return;
    }

    let top = 0;
    let left = 0;
    let bottom = mat.length - 1;
    let right = mat[0].length - 1;

    let flag = true;

    while (true) {
        if (left > right) {
            break;
        }

        // set the top row
        for (let i = left; i <= right; i++) {
            mat[top][i] = flag ? 1 : 0;
        }
        top = top + 1;

        if (top > bottom) {
            break;
        }

        // set the right column
        for (let i = top; i <= bottom; i++) {
            mat[i][right] = flag ? 1 : 0;
        }
        right = right - 1;

        if (left > right) {
            break;
        }

        // set the bottom row
        for (let i = right; i >= left; i--) {
            mat[bottom][i] = flag ? 1 : 0;
        }
        bottom -= 1;

        if (top > bottom) {
            break;
        }

        // set the left column
        for (let i = bottom; i >= top; i--) {
            mat[i][left] = flag ? 1 : 0;
        }
        left = left + 1;

        // invert the flag for the next run
        flag = !flag;
    }
}

const M = 10;
const N = 8;

// create `M × N` matrix
const mat: number[][] = Array.from({ length: M }, () => new Array(N).fill(0));

// fill the matrix
processMatrix(mat);

for (const r of mat) {
    console.log(r);
}
```

**Output:** 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 1 1 0 1 1 1 1 0 1 1 0 1 0 0 1 0 1 1 0 1 0 0 1 0 1 1 0 1 0 0 1 0 1 1 0 1 0 0 1 0 1 1 0 1 1 1 1 0 1 1 0 0 0 0 0 0 1 1 1 1 1 1 1 1 1

## Another Approach

An `M × N` matrix has `min(ceil(M/2), ceil(N/2))` rectangular cycles. A cycle is formed by `i'th` row, `(N-i+1)'th` column, `(M-i+1)'th` row, and `i'th` column where `i` varies from `1` to `min(ceil(M/2), ceil(N/2))`. The idea is for each rectangular cycle, associate a value to it. For the outer cycle, the value will be `0`; for the second cycle, the value will be `1`, and the third cycle will have a value of `2`, and so on… The following figure shows `4` cycles in a `10 × 8` matrix marked by the value `0–3`:

0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 0 0 1 2 2 2 2 1 0 0 1 2 3 3 2 1 0 0 1 2 3 3 2 1 0 0 1 2 3 3 2 1 0 0 1 2 3 3 2 1 0 0 1 2 2 2 2 1 0 0 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0

Depending upon whether the assigned value is odd or even for a matrix cell, assign `0` or `1` to the output matrix. The algorithm can be implemented as follows in TypeScript:

```ts
// Fill a binary matrix with alternating rectangles of 1's and 0's
function findValue(i: number, j: number, M: number, N: number): number {

    if (i > M - i - 1) {
        i = M - i - 1;
    }

    if (j > N - j - 1) {
        j = N - j - 1;
    }

    return i < j ? i : j;
}

function processMatrix(mat: number[][]): void {
    // base case
    if (!mat || !mat.length) {
        return;
    }

    // `M × N` matrix
    const M = mat.length;
    const N = mat[0].length;

    for (let i = 0; i < M; i++) {
        for (let j = 0; j < N; j++) {
            mat[i][j] = (findValue(i, j, M, N) & 1) === 0 ? 1 : 0;
        }
    }
}

const M = 10;
const N = 8;

const mat: number[][] = Array.from({ length: M }, () => new Array(N).fill(0));

processMatrix(mat);

// print matrix
for (const r of mat) {
    console.log(r);
}
```

**Output:** 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 1 1 0 1 1 1 1 0 1 1 0 1 0 0 1 0 1 1 0 1 0 0 1 0 1 1 0 1 0 0 1 0 1 1 0 1 0 0 1 0 1 1 0 1 1 1 1 0 1 1 0 0 0 0 0 0 1 1 1 1 1 1 1 1 1

The time complexity of the proposed solution is O(M × N) for an `M × N` matrix and doesn’t require any extra space.
