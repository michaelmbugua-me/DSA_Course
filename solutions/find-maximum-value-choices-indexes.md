# Find maximum value of `M[c][d] – M[a][b]` over all choices of indexes

> Source: https://www.techiedelight.com/find-maximum-value-choices-indexes/

[Matrix](https://www.techiedelight.com/Category/Matrix/)

Given a square matrix of integers, find the maximum value of `M[c][d] - M[a][b]` over every choice of indexes such that `c > a` and `d > b` in a single traversal of the matrix.

For example,

**Input Matrix:** { 1, 2, -1, -4, -20 } { -8, -3, 4, 2, 1 } { 3, 8, 6, 1, 3 } { -4, -1, 1, 7, -6 } { 0, -4, 10, -5, 1 } **Output:** The maximum value is 18 as M[4][2] – M[1][0] has maximum difference.

> 

A naive solution would be to find `M[c][d]` for all values `M[a][b]` in the matrix, having the maximum value and satisfies `c > a` and `d > b`. We keep track of the maximum value found so far in a variable and finally return the maximum value. The implementation can be seen [here](https://techiedelight.com/compiler/?run=5yYWh1) and runs in O(N4) time for an `N × N` matrix.

The efficient solution is to use an auxiliary matrix whose index `(i, j)` will store the value of the maximum element in the input matrix from coordinates `(i, j)` to `(N-1, N-1)`. We keep track of the maximum value found so far in a variable and finally return the maximum value.

Following is a TypeScript implementation of the idea:

**Output:** The maximum value is 18

```ts
// Returns maximum value `M[c][d] - M[a][b]` over every choice of indexes
// such that `c > a` and `d > b`
function findMax(M: number[][]): number {

    // base case
    if (!M || !M.length) {
        return 0;
    }

    // get size of the matrix
    const n = M.length;

    // `K[i][j]` stores the maximum of elements in the matrix from `(i, j)`
    // to `(n-1, n-1)`
    const K: number[][] = Array.from({ length: n }, () => Array(n).fill(0));

    // the last element of `K[][]` will be the same as that of the specified matrix
    K[n - 1][n - 1] = M[n - 1][n - 1];

    let maximum = M[n - 1][n - 1];  // Initialize max

    // preprocess the last row
    for (let j = n - 2; j >= 0; j--) {
        if (M[n - 1][j] > maximum) {
            maximum = M[n - 1][j];
        }
        K[n - 1][j] = maximum;
    }

    maximum = M[n - 1][n - 1];  // Initialize max

    // preprocess the last column
    for (let i = n - 2; i >= 0; i--) {
        if (M[i][n - 1] > maximum) {
            maximum = M[i][n - 1];
        }
        K[i][n - 1] = maximum;
    }

    maximum = -Infinity;  // Initialize max

    // preprocess the rest of the matrix from the bottom
    for (let i = n - 2; i >= 0; i--) {
        for (let j = n - 2; j >= 0; j--) {
            // update the max value
            if (K[i + 1][j + 1] - M[i][j] > maximum) {
                maximum = K[i + 1][j + 1] - M[i][j];
            }

            // assign `K[i][j]`
            K[i][j] = Math.max(M[i][j], K[i][j + 1], K[i + 1][j]);
        }
    }

    return maximum;
}

const M = [
        [1, 2, -1, -4, -20],
        [-8, -3, 4, 2, 1],
        [3, 8, 6, 1, 3],
        [-4, -1, 1, 7, -6],
        [0, -4, 10, -5, 1]
    ];

console.log(`The maximum value is ${findMax(M)}`);
```

The above solution uses extra space for the auxiliary matrix. We can avoid that by using the input matrix instead.

**Author:** Aditya Goel

**Exercise:** Extend the solution to print index `(a, b)` and `(c, d)`.

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.83/5. Vote count: 184

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
