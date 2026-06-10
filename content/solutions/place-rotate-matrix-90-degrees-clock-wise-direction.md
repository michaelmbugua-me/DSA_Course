# In-place rotate matrix by 90 degrees in a clockwise direction

> Source: https://www.techiedelight.com/place-rotate-matrix-90-degrees-clock-wise-direction/

[Matrix](https://www.techiedelight.com/Category/Matrix/)

Given a square matrix, rotate the matrix by 90 degrees in a clockwise direction. The transformation should be done [in-place](https://techiedelight.com/in-place-vs-out-of-place-algorithms/) and in quadratic time.

For example,

**Input:** 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 **Output:** 13 9 5 1 14 10 6 2 15 11 7 3 16 12 8 4

> 

The idea is to in-place convert the matrix into its transpose first. If we swap the first column with the last column, the second column with the second last column, and so on… we will get our desired matrix.

Following is the implementation in TypeScript based on the above idea:

```ts
// In-place rotate it by 90 degrees in a clockwise direction
function rotate(mat: number[][]): void {

    // base case
    if (!mat.length) {
        return;
    }

    // `N × N` matrix
    const N = mat.length;

    // Transpose the matrix
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < i; j++) {
            const temp = mat[i][j];
            mat[i][j] = mat[j][i];
            mat[j][i] = temp;
        }
    }

    // swap columns
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < Math.floor(N / 2); j++) {
            const temp = mat[i][j];
            mat[i][j] = mat[i][N - j - 1];
            mat[i][N - j - 1] = temp;
        }
    }
}

const mat = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16]
];

rotate(mat);

for (const r of mat) {
    console.log(r);
}
```

If we were asked to rotate the matrix in an anti-clockwise manner, we could easily do that, too, using the same logic. The only difference is that instead of swapping columns, we swap rows.

```ts
// In-place rotate it by 90 degrees in an anti-clockwise direction
function rotate(mat: number[][]): void {

    // base case
    if (!mat.length) {
        return;
    }

    // `N × N` matrix
    const N = mat.length;

    // Transpose the matrix
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < i; j++) {
            // swap `mat[i][j]` with `mat[j][i]`
            const temp = mat[i][j];
            mat[i][j] = mat[j][i];
            mat[j][i] = temp;
        }
    }

    // swap rows
    for (let i = 0; i < Math.floor(N / 2); i++) {
        for (let j = 0; j < N; j++) {
            // swap `mat[i][j]` with `mat[N-i-1][j]`
            const temp = mat[i][j];
            mat[i][j] = mat[N - i - 1][j];
            mat[N - i - 1][j] = temp;
        }
    }
}

// `N × N` matrix
const mat = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16]
];

rotate(mat);
for (const r of mat) {
    console.log(r);
}
```

**Output:** 4 8 12 16 3 7 11 15 2 6 10 14 1 5 9 13

The time complexity of the proposed solution is O(N2) for an `N × N` matrix and doesn’t require any extra space.

**Exercise:** In-place rotate the matrix by 180 degrees
