# Print diagonal elements of a matrix having a positive slope

> Source: https://www.techiedelight.com/print-matrix-diagonally-positive-slope/

[Matrix](https://www.techiedelight.com/Category/Matrix/)

Given an `M × N` integer matrix, print all its diagonal elements having a positive slope.

For example,

**Input:** **Output:** 1 2 2 3 3 3 4 4 4 4 5 5 5 5 5 6 6 6 6 7 7 7 8 8 9

> 

The idea is to start from each cell of the first column of the matrix to print `/` diagonal for the matrix’s upper-left half. Similarly, after the upper-left half, start from each cell of the last row to print the `/` diagonal for the matrix’s lower-right half.

Following is a TypeScript implementation of the idea:

```ts
function printMatrixDiagonally(mat: number[][]): void {

    // base case
    if (!mat || mat.length === 0) {
        return;
    }

    const M = mat.length;
    const N = mat[0].length;

    // print `/` diagonal for the upper-left half of the matrix
    for (let r = 0; r < M; r++) {
        // start from each cell of the first column
        let i = r;
        let j = 0;
        while (j < N && i >= 0) {
            process.stdout.write(mat[i][j] + ' ');
            i = i - 1;
            j = j + 1;
        }

        console.log();
    }

    // print `/` diagonal for the lower-right half of the matrix
    for (let c = 1; c < N; c++) {
        // start from each cell of the last row
        let i = M - 1;
        let j = c;
        while (j < N && i >= 0) {
            process.stdout.write(mat[i][j] + ' ');
            i = i - 1;
            j = j + 1;
        }

        console.log();
    }
}

const mat = [
    [1, 2, 3, 4, 5],
    [2, 3, 4, 5, 6],
    [3, 4, 5, 6, 7],
    [4, 5, 6, 7, 8],
    [5, 6, 7, 8, 9]
];

printMatrixDiagonally(mat);
```

**Output:** 1 2 2 3 3 3 4 4 4 4 5 5 5 5 5 6 6 6 6 7 7 7 8 8 9

The time complexity of the proposed solution is O(M × N) for an `M × N` matrix and doesn’t require any extra space.

Also See:

> [Count negative elements present in the sorted matrix in linear time](https://www.techiedelight.com/count-negative-elements-present-sorted-matrix/ "Count negative elements present in the sorted matrix in linear time")

> [Change all elements of row `i` and column `j` in a matrix to 0 if cell `(i, j)` is 0](https://www.techiedelight.com/change-elements-row-column-j-matrix-0-cell-j-value-0/ "Change all elements of row `i` and column `j` in a matrix to 0 if cell `\(i, j\)` is 0")

> [Print a spiral square matrix without using any extra space](https://www.techiedelight.com/print-spiral-square-matrix-without-extra-space/ "Print a spiral square matrix without using any extra space")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.84/5. Vote count: 140

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
