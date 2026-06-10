# Collect maximum value of coins in a matrix

> Source: https://www.techiedelight.com/collect-maximum-value-coins-matrix/

Given an `M × N` matrix of non-negative integers where each cell contains a coin of some denomination, collect the maximum value of coins by traversing the grid.

The first traversal starts from the top-left corner of the matrix and ends in the bottom-left corner, and the second traversal starts from the top-right corner and ends in the bottom-right corner. From any cell `(i, j)` in the matrix, we are allowed to move to cell `(i+1, j+1)` or `(i+1, j-1)` or `(i+1, j)`. If both traversals pass through the same cell, only one can collect coins from that cell.

For example,

**Input:** The given matrix is [ 0 2 4 1 ] [ 4 8 3 7 ] [ 2 3 6 2 ] [ 9 7 8 3 ] [ 1 5 9 4 ] **Output:** The maximum coins collected is 47 (Red coins + Blue coins)

> 

The idea is to simultaneously start both traversals from the top-left corner `(0, 0)` and the top-right corner `(0, N-1)` of the matrix. For each step, the row number would increase by one and the column number might remain the same or can increase/decrease by 1, i.e., `(i, j) —> (i+1, j-1)` or `(i+1, j) or (i+1, j+1)`.

We collect the coins as we move along and return the maximum possible collection. The recursive algorithm can be implemented as follows in TypeScript:

```ts
// Function to check whether (i, x) and (i, y) are valid matrix coordinates
function isValid(i: number, x: number, y: number, M: number, N: number): boolean {
    return i < M && x >= 0 && x < N && y >= 0 && y < N;
}

// Collect maximum coins from cell (i, x) to cell (M-1, 0) and from
// cell (i, y) to cell (M-1, N-1) of a `M × N` matrix
function getMaxCoins(mat: number[][], i: number, x: number, y: number): number;
function getMaxCoins(mat: number[][]): number;
function getMaxCoins(mat: number[][], i?: number, x?: number, y?: number): number {
    if (i === undefined || x === undefined || y === undefined) {
        // base case
        if (!mat || mat.length === 0) {
            return 0;
        }

        // `M × N` matrix
        const N = mat[0].length;

        // start with cell (0, 0) and (0, N-1)
        return getMaxCoins(mat, 0, 0, N - 1);
    }

    // `M × N` matrix
    const M = mat.length;
    const N = mat[0].length;

    // return if either (i, x) or (i, y) is invalid
    if (!isValid(i, x, y, M, N)) {
        return Number.MIN_SAFE_INTEGER;
    }

    // current row is the last row
    if (i === M - 1) {
        // destination reached
        if (x === 0 && y === N - 1) {
            return (x === y) ? mat[i][x] : mat[i][x] + mat[i][y];
        }

        // destination not reached
        return Number.MIN_SAFE_INTEGER;
    }

    // stores the max number of coins
    let coins = Number.MIN_SAFE_INTEGER;

    /*
      Recur for all possible ways:
        (i, x) —> (i+1, x-1) or (i+1, x) or (i+1, x+1)
        (i, y) —> (i+1, y-1) or (i+1, y) or (i+1, y+1)
    */

    coins = Math.max(coins, getMaxCoins(mat, i + 1, x - 1, y - 1));
    coins = Math.max(coins, getMaxCoins(mat, i + 1, x - 1, y));
    coins = Math.max(coins, getMaxCoins(mat, i + 1, x - 1, y + 1));

    coins = Math.max(coins, getMaxCoins(mat, i + 1, x, y - 1));
    coins = Math.max(coins, getMaxCoins(mat, i + 1, x, y));
    coins = Math.max(coins, getMaxCoins(mat, i + 1, x, y + 1));

    coins = Math.max(coins, getMaxCoins(mat, i + 1, x + 1, y - 1));
    coins = Math.max(coins, getMaxCoins(mat, i + 1, x + 1, y));
    coins = Math.max(coins, getMaxCoins(mat, i + 1, x + 1, y + 1));

    // update max number of coins with current cell coins before returning
    if (x === y) {
        return mat[i][x] + coins;
    }
    else {
        return (mat[i][x] + mat[i][y]) + coins;
    }
}

const mat = [
    [0, 2, 4, 1],
    [4, 8, 3, 7],
    [2, 3, 6, 2],
    [9, 7, 8, 3],
    [1, 5, 9, 4]
];

console.log(`The maximum coins collected is ${getMaxCoins(mat)}`);
```

**Output:** The maximum coins collected is 47

The time complexity of the proposed solution is exponential since it recomputes the same subproblems repeatedly. We can easily optimize the code to run in O(M × N2) time using [dynamic programming](https://techiedelight.com/introduction-dynamic-programming/). The idea is to store the results of function calls and use the cached result when the same input occurs again. The dynamic programming solution is left as an exercise to the readers.

Also See:

> [Collect maximum points in a matrix by satisfying given constraints](https://www.techiedelight.com/collect-maximum-points-matrix-satisfying-given-constraints/ "Collect maximum points in a matrix by satisfying given constraints")

> [Find maximum sum `K × K` submatrix in a given `M × N` matrix](https://www.techiedelight.com/find-maximum-sum-submatrix-in-given-matrix/ "Find maximum sum `K × K` submatrix in a given `M × N` matrix")

> [Find the index of a row containing the maximum number of 1’s in a binary matrix](https://www.techiedelight.com/find-index-row-containing-maximum-number-1s-matrix/ "Find the index of a row containing the maximum number of 1’s in a binary matrix")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.8/5. Vote count: 178

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hard](https://www.techiedelight.com/Tags/hard/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
