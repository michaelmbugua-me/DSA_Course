# Find maximum sum submatrix present in a matrix

> Source: https://www.techiedelight.com/find-maximum-sum-submatrix-present-given-matrix/

Given an `N × N` matrix of integers, find the maximum sum submatrix present in it.

For example, the maximum sum submatrix is highlighted in green in the following matrices:

> 

The idea is to preprocess the matrix. We take an auxiliary matrix `S[][]`, where `S[i][j]` will store the sum of elements in the matrix from `(0, 0)` to `(i-1, j-1)`. The idea is similar to the following post:

> [Calculate the sum of all elements in a submatrix in constant time](https://techiedelight.com/calculate-sum-elements-sub-matrix-constant-time/)

After we have preprocessed the matrix to create the sum matrix, consider every submatrix formed by row `i` to `j` and column `m` to `n` to calculate the submatrix sum in constant time using the following relation:

submatrix sum = S[j+1][n+1] – S[j+1][m] – S[i][n+1] + S[i][m]

If the submatrix sum is more than the maximum found so far, we update the maximum sum. We can also store the submatrix coordinates to print the maximum sum submatrix. The algorithm can be implemented as follows in TypeScript:

```ts
// Find the maximum sum submatrix present in a given matrix
function findMaxSumSubmatrix(mat: number[][]): number {

    // base case
    if (!mat || !mat.length) {
        return 0;
    }

    // `M × N` matrix
    const [M, N] = [mat.length, mat[0].length];

    // `S[i][j]` stores the sum of submatrix formed by row 0 to `i-1`
    // and column 0 to `j-1`
    const S: number[][] = Array.from({ length: M + 1 }, () => Array(N + 1).fill(0));

    // preprocess the matrix to fill `S`
    for (let i = 1; i <= M; i++) {
        for (let j = 1; j <= N; j++) {
            S[i][j] = S[i - 1][j] + S[i][j - 1] - S[i - 1][j - 1] + mat[i - 1][j - 1];
        }
    }

    let maxSum = -Infinity;
    let rowStart = 0, rowEnd = 0, colStart = 0, colEnd = 0;

    // consider every submatrix formed by row `i` to `j`
    // and column `m` to `n`
    for (let i = 0; i < M; i++) {
        for (let j = i; j < M; j++) {
            for (let m = 0; m < N; m++) {
                for (let n = m; n < N; n++) {
                    // calculate the submatrix sum using `S` in `O(1)` time
                    const submatrix_sum = S[j + 1][n + 1] - S[j + 1][m]
                                    - S[i][n + 1] + S[i][m];

                    // if the submatrix sum is more than the maximum found so far
                    if (submatrix_sum > maxSum) {
                        maxSum = submatrix_sum;
                        rowStart = i;
                        rowEnd = j;
                        colStart = m;
                        colEnd = n;
                    }
                }
            }
        }
    }

    const output = Array.from({ length: rowEnd - rowStart + 1 }, (_, i) =>
        Array.from({ length: colEnd - colStart + 1 }, (_, j) =>
            mat[rowStart + i][colStart + j]));

    console.log('The maximum sum submatrix is', output);
    return maxSum;
}

// input matrix
const matrix = [
    [-5, -6, 3, 1, 0],
    [9, 7, 8, 3, 7],
    [-6, -2, -1, 2, -4],
    [-7, 5, 5, 2, -6],
    [3, 2, 9, -5, 1]
];

// find the maximum sum submatrix
console.log(`The maximum sum is ${findMaxSumSubmatrix(matrix)}`);
```

**Output:** The maximum sum submatrix is [[7, 8, 3], [-2, -1, 2], [5, 5, 2], [2, 9, -5]] The maximum sum is 35

The time complexity of the proposed solution is O(N4) for an `N × N` matrix. The auxiliary space required by the program is O(N2). We can solve this problem in O(N3) time using [Kadane’s algorithm](https://techiedelight.com/maximum-subarray-problem-kadanes-algorithm/).

Also See:

> [Find maximum sum `K × K` submatrix in a given `M × N` matrix](https://www.techiedelight.com/find-maximum-sum-submatrix-in-given-matrix/ "Find maximum sum `K × K` submatrix in a given `M × N` matrix")

> [Calculate the sum of all elements in a submatrix in constant time](https://www.techiedelight.com/calculate-sum-elements-sub-matrix-constant-time/ "Calculate the sum of all elements in a submatrix in constant time")

> [Find the size of the largest square submatrix of 1’s present in a binary matrix](https://www.techiedelight.com/find-size-largest-square-sub-matrix-1s-present-given-binary-matrix/ "Find the size of the largest square submatrix of 1’s present in a binary matrix")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.68/5. Vote count: 160

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Bottom-up](https://www.techiedelight.com/Tags/Tabulation/), [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
