# Find the largest square submatrix which is surrounded by all 1’s

> Source: https://www.techiedelight.com/largest-square-sub-matrix-surrounded-by-1s/

[Matrix](https://www.techiedelight.com/Category/Matrix/)

Given a binary matrix, find the size of the largest square submatrix, which is surrounded by all 1’s.

For example, the size of the largest square submatrix in the following binary matrix is `4`. The largest square submatrix is formed by cells `(0, 2)`, `(3, 2)`, `(0, 5)`, and `(3, 5)`.

1 1 **1 1 1 1** 1 0 **1** 1 0 **1** 0 1 **1** 0 0 **1** 1 1 **1 1 1 1** 1 0 0 1 0 1 1 0 1 1 0 0 1 0 1 0 1 1 1 1 1 0 1 1

> 

The brute-force solution is to consider every square submatrix and check if it is surrounded by all `1's`. We keep track of the dimensions of the largest square submatrix seen and finally return it. The time complexity of this solution is O(M2 × N2), where `M` and `N` are dimensions of the matrix.

We can reduce the time complexity of the problem to O(M2 × N) by using O(M × N) extra space. The idea is to create two auxiliary matrices, say `X` and `Y`, where `X[i][j]` and `Y[i][j]` stores the total number of continuous horizontal and vertical `1's` ending at cell `(i, j)`, respectively in the given matrix.

After filling both auxiliary matrices, process each cell `(i, j)` starting from the last cell in the last row. For every cell `(i, j)`, take the minimum of `X[i][j]` and `Y[i][j]` which could be the maximum length of the right vertical line and bottom horizontal line of the square matrix ending at cell `(i, j)`. The cell ending at the current cell `(i, j)` would form a square submatrix if there exist a left vertical line and a top horizontal line of at least the same length. Keep track of the largest square submatrix’s dimensions so far and return it when every cell is processed.

Following is a TypeScript program that demonstrates it:

```ts
// Function to find the largest square submatrix, which is surrounded by all 1's
function findLargestSquareSubMatrix(mat: number[][]): number {

    // base case
    if (mat === null || mat.length === 0) {
        return 0;
    }

    // `M × N` matrix
    const M = mat.length;
    const N = mat[0].length;

    // create two auxiliary matrices filled with all 0's of size `M × N`
    const X: number[][] = Array.from({ length: M }, () => new Array(N).fill(0));
    const Y: number[][] = Array.from({ length: M }, () => new Array(N).fill(0));

    // update the auxiliary matrix `X` and `Y` with the
    // total number of continuous 1's ending at the cell
    for (let i = 0; i < M; i++) {
        for (let j = 0; j < N; j++) {
            if (mat[i][j]) {
                Y[i][j] = (i === 0 ? 0 : Y[i - 1][j]) + 1;
                X[i][j] = (j === 0 ? 0 : X[i][j - 1]) + 1;
            }
        }
    }

    /* 
        // print `X` matrix
        for (let i = 0; i < M; i++) {
            console.log(X[i].join(' '));
        }

        console.log();

        // print `Y` matrix
        for (let i = 0; i < M; i++) {
            console.log(Y[i].join(' '));
        }

        console.log();
    */

    // to keep track of the largest square submatrix
    let maxLen = 0;

    // process each cell `(i, j)` of the auxiliary matrix starting from the
    // last cell in the last row

    for (let i = M - 1; i >= 0; i--) {
        for (let j = N - 1; j >= 0; j--) {

            // The minimum of `X[i][j]` and `Y[i][j]` would be the length of the
            // right vertical line and bottom horizontal line of the
            // square matrix ending at cell `(i, j)`

            let length = Math.min(X[i][j], Y[i][j]);
            while (length) {

                // the cell ending at the current cell `(i, j)` forms a square
                // submatrix if there exists a left vertical line and a
                // top horizontal line of at least length `length`

                const isSquare = Y[i][j - length + 1] >= length &&
                        X[i - length + 1][j] >= length;

                // check if the square ending at the current cell is the largest so far
                if (isSquare && maxLen < length) {
                    maxLen = length;
                }

                // reduce the length by 1 to check for smaller squares ending at
                // the current cell
                length = length - 1;
            }
        }
    }

    return maxLen;
}

const mat = [
    [1, 1, 1, 1, 1, 1],
    [1, 0, 1, 1, 0, 1],
    [0, 1, 1, 0, 0, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 0, 0],
    [1, 0, 1, 0, 1, 1],
    [1, 1, 1, 0, 1, 1]
];

console.log('The size of largest square submatrix is', findLargestSquareSubMatrix(mat));
```

**Output:** The largest square submatrix has a length of 4

Also See:

> [Find the size of the largest square submatrix of 1’s present in a binary matrix](https://www.techiedelight.com/find-size-largest-square-sub-matrix-1s-present-given-binary-matrix/ "Find the size of the largest square submatrix of 1’s present in a binary matrix")

> [Find maximum sum `K × K` submatrix in a given `M × N` matrix](https://www.techiedelight.com/find-maximum-sum-submatrix-in-given-matrix/ "Find maximum sum `K × K` submatrix in a given `M × N` matrix")

> [Calculate the sum of all elements in a submatrix in constant time](https://www.techiedelight.com/calculate-sum-elements-sub-matrix-constant-time/ "Calculate the sum of all elements in a submatrix in constant time")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.84/5. Vote count: 171

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
