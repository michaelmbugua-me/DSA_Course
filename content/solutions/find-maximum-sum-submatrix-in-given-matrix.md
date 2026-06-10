# Find maximum sum `K × K` submatrix in a given `M × N` matrix

> Source: https://www.techiedelight.com/find-maximum-sum-submatrix-in-given-matrix/

Given an `M × N` integer matrix, calculate the maximum sum submatrix of size `k × k` in it in `O(M × N)` time. Here, `0 < k < M <= N`.

For example, consider the following `5 × 5` matrix:

[ 3 -4 6 -5 1 ] [ 1 -2 8 -4 -2 ] [ 3 -8 9 3 1 ] [ -7 3 4 2 7 ] [ -3 7 -5 7 -6 ] If k = 2, the maximum sum k × k submatrix is [ 9 3 ] [ 4 2 ] If k = 3, the maximum sum k × k submatrix is [ 8 -4 -2 ] [ 9 3 1 ] [ 4 2 7 ]

> 

We strongly suggest going through the following post as a prerequisite of the below solution:

> [Calculate the sum of all elements in a submatrix in constant time](https://techiedelight.com/calculate-sum-elements-sub-matrix-constant-time/)

The idea is to preprocess the matrix. We take an auxiliary matrix `sum[][]`, where `sum[i][j]` stores the sum of elements in the matrix from `(0, 0)` to `(i, j)`. We can easily calculate the value of `sum[i][j]` in constant time using the following relation:

sum[i][j] = sum[i][j – 1] + sum[i – 1][j] + mat[i][j] – sum[i – 1][j – 1]

Now to find the maximum sum `k × k` submatrix, consider every submatrix of size `k × k` and calculate their sum in constant time by directly using the following relation:

submatrixSum = sum[i][j] – sum[i – k][j] – sum[i][j – k] + sum[i – k][j – k]

Here, `(i, j)` represents the bottom-right corner coordinates of the `k × k` submatrix. Finally, print the submatrix that has the maximum sum.

The algorithm can be implemented as follows in TypeScript:

```ts
function preprocess(mat: number[][], M: number, N: number): number[][] {

    // preprocess the matrix `mat` such that `s[i][j]` stores
    // sum of elements in the matrix from (0, 0) to (i, j)
    const s: number[][] = Array.from({ length: M }, () => Array(N).fill(0));
    s[0][0] = mat[0][0];

    // preprocess the first row
    for (let j = 1; j < N; j++) {
        s[0][j] = mat[0][j] + s[0][j - 1];
    }

    // preprocess the first column
    for (let i = 1; i < M; i++) {
        s[i][0] = mat[i][0] + s[i - 1][0];
    }

    // preprocess the rest of the matrix
    for (let i = 1; i < M; i++) {
        for (let j = 1; j < N; j++) {
            s[i][j] = mat[i][j] + s[i - 1][j] + s[i][j - 1] - s[i - 1][j - 1];
        }
    }

    return s;
}

function findMaxSumSubMatrix(mat: number[][], k: number): number[][] {

    // base case
    if (!mat || !mat.length) {
        return [];
    }

    // `M × N` matrix
    const [M, N] = [mat.length, mat[0].length];

    // preprocess the matrix
    const s = preprocess(mat, M, N);

    let maximum = -Infinity;

    // `p` stores the bottom-right corner coordinates of the submatrix
    let p: number[] = [0, 0];

    // find the maximum sum submatrix

    // start from cell (k-1, k-1) and consider each submatrix of size `k × k`
    for (let i = k - 1; i < M; i++) {
        for (let j = k - 1; j < N; j++) {

            // Note that (i, j) is the bottom-right corner coordinates of the
            // square submatrix of size `k`

            let total = s[i][j];
            if (i - k >= 0) {
                total = total - s[i - k][j];
            }

            if (j - k >= 0) {
                total = total - s[i][j - k];
            }

            if (i - k >= 0 && j - k >= 0) {
                total = total + s[i - k][j - k];
            }

            if (total > maximum) {
                maximum = total;
                p = [i, j];
            }
        }
    }

    // `p` stores bottom-right corner coordinates of the submatrix
    const [x, y] = p;

    // return maximum sum submatrix
    return Array.from({ length: k }, (_, i) =>
        Array.from({ length: k }, (_, j) => mat[i + x - k + 1][j + y - k + 1]));
}

// 5 × 5 matrix
const mat = [
    [3, -4, 6, -5, 1],
    [1, -2, 8, -4, -2],
    [3, -8, 9, 3, 1],
    [-7, 3, 4, 2, 7],
    [-3, 7, -5, 7, -6]
];

// submatrix size
const k = 3;

const submatrix = findMaxSumSubMatrix(mat, k);
for (const row of submatrix) {
    console.log(row);
}
```

**Output:** [8, -4, -2] [9, 3, 1] [4, 2, 7]

The time complexity of the proposed solution is O(M × N) and requires O(M × N) extra space, where `M` and `N` are dimensions of the matrix.

Also See:

> [Calculate the sum of all elements in a submatrix in constant time](https://www.techiedelight.com/calculate-sum-elements-sub-matrix-constant-time/ "Calculate the sum of all elements in a submatrix in constant time")

> [Find maximum sum submatrix present in a matrix](https://www.techiedelight.com/find-maximum-sum-submatrix-present-given-matrix/ "Find maximum sum submatrix present in a matrix")

> [Find the size of the largest square submatrix of 1’s present in a binary matrix](https://www.techiedelight.com/find-size-largest-square-sub-matrix-1s-present-given-binary-matrix/ "Find the size of the largest square submatrix of 1’s present in a binary matrix")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.68/5. Vote count: 209

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Bottom-up](https://www.techiedelight.com/Tags/Tabulation/), [Hard](https://www.techiedelight.com/Tags/hard/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
