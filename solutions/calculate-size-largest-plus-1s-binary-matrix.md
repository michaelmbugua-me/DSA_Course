# Calculate the size of the largest plus of 1’s in a binary matrix

> Source: https://www.techiedelight.com/calculate-size-largest-plus-1s-binary-matrix/

Given a square matrix of `0's` and `1's`, calculate the size of the largest plus formed by `1's`.

For example, for the matrix below, we have highlighted the largest plus of ones having size 17.

> 

We start by creating four auxiliary matrices `left[][]`, `right[][]`, `top[][]`, `bottom[][]`, where `left[j][j]`, `right[i][j]`, `top[i][j]`, and `bottom[i][j]` store the maximum number of consecutive `1's` present at the left, right, top and bottom of cell `(i, j)` including cell `(i, j)`, respectively by using [dynamic programming](https://techiedelight.com/introduction-dynamic-programming/):

if grid[i][j] == 1 left[i][j] = left[i][j – 1] + 1 if grid[i][j] == 1 top[i][j] = top[i – 1][j] + 1 if grid[i][j] == 1 bottom[i][j] = bottom[i + 1][j] + 1 if grid[i][j] == 1 right[i][j] = right[i][j + 1] + 1

After calculating the above matrices, find cell `(i, j)` that has maximum value in each direction (by considering the minimum of `left[i][j]`, `right[i][j]`, `top[i][j]`, `bottom[i][j]`). The algorithm can be implemented as follows in TypeScript:

```ts
// Calculate the size of the largest `+` formed by 1's
const calculateSize = (grid: number[][]): number => {

    // base case
    if (!grid || grid.length === 0) {
        return 0;
    }

    const N = grid.length;

    // left[j][j] stores the maximum number of consecutive 1's
    // present at the left of grid[i][j] (including grid[i][j])
    const left: number[][] = Array.from({ length: N }, () => new Array(N).fill(0));

    // right[j][j] stores the maximum number of consecutive 1's
    // present at the right of grid[i][j] (including grid[i][j])
    const right: number[][] = Array.from({ length: N }, () => new Array(N).fill(0));

    // top[j][j] stores the maximum number of consecutive 1's
    // present at the top of grid[i][j] (including grid[i][j])
    const top: number[][] = Array.from({ length: N }, () => new Array(N).fill(0));

    // bottom[j][j] stores the maximum number of consecutive 1's
    // present at the bottom of grid[i][j] (including grid[i][j])
    const bottom: number[][] = Array.from({ length: N }, () => new Array(N).fill(0));

    // initialize the above matrices
    for (let i = 0; i < N; i++) {
        // initialize the first row of the top matrix
        top[0][i] = grid[0][i];

        // initialize the last row of the bottom matrix
        bottom[N - 1][i] = grid[N - 1][i];

        // initialize the first column of the left matrix
        left[i][0] = grid[i][0];

        // initialize the last column of the right matrix
        right[i][N - 1] = grid[i][N - 1];
    }

    // fill all cells of the above matrices
    for (let i = 0; i < N; i++) {
        for (let j = 1; j < N; j++) {
            // fill the left matrix
            if (grid[i][j] === 1) {
                left[i][j] = left[i][j - 1] + 1;
            }

            // fill the top matrix
            if (grid[j][i] === 1) {
                top[j][i] = top[j - 1][i] + 1;
            }

            // fill the bottom matrix
            if (grid[N - 1 - j][i] === 1) {
                bottom[N - 1 - j][i] = bottom[N - j][i] + 1;
            }

            // fill the right matrix
            if (grid[i][N - 1 - j] === 1) {
                right[i][N - 1 - j] = right[i][N - j] + 1;
            }
        }
    }

    // bar` stores the length of the longest `+` found so far
    let bar = 0;

    // compute the longest plus
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            // find minimum of left(i, j), right(i, j), top(i, j), bottom(i, j)
            const length = Math.min(top[i][j], bottom[i][j], left[i][j], right[i][j]);

            // largest `+` would be formed by a cell that has a maximum value
            if (length - 1 > bar) {
                bar = length - 1;
            }
        }
    }

    return bar;
};

const grid = [
    [1, 0, 1, 1, 1, 1, 0, 1, 1, 1],
    [1, 0, 1, 0, 1, 1, 1, 0, 1, 1],
    [1, 1, 1, 0, 1, 1, 0, 1, 0, 1],
    [0, 0, 0, 0, 1, 0, 0, 1, 0, 0],
    [1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [1, 0, 0, 0, 1, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 0, 1, 1],
    [1, 1, 0, 0, 1, 0, 1, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 0, 0]
];

const bar = calculateSize(grid);

// 4 directions of length `4×bar+1` for a middle cell
if (bar) {
    console.log(`The largest plus of 1's has a size of ${4 * bar + 1}`);
}
```

**Output:** The largest plus of 1’s has a size of 17

The time complexity of the proposed solution is O(N2) for an `N × N` matrix. The auxiliary space required by the program is O(N2).

**Author:** Aditya Goel

Also See:

> [Find the size of the largest square submatrix of 1’s present in a binary matrix](https://www.techiedelight.com/find-size-largest-square-sub-matrix-1s-present-given-binary-matrix/ "Find the size of the largest square submatrix of 1’s present in a binary matrix")

> [Find the area of the largest rectangle of 1’s in a binary matrix](https://www.techiedelight.com/find-largest-rectangle-of-1s-binary-matrix/ "Find the area of the largest rectangle of 1’s in a binary matrix")

> [Find the largest square submatrix which is surrounded by all 1’s](https://www.techiedelight.com/largest-square-sub-matrix-surrounded-by-1s/ "Find the largest square submatrix which is surrounded by all 1’s")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.84/5. Vote count: 176

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Bottom-up](https://www.techiedelight.com/Tags/Tabulation/), [Hard](https://www.techiedelight.com/Tags/hard/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
