# Find minimum passes required to convert all negative values in a matrix

> Source: https://www.techiedelight.com/find-minimum-passes-required-convert-negative-values-matrix/

Given an `M × N` matrix of integers whose each cell can contain a negative, zero, or a positive value, determine the minimum number of passes required to convert all negative values in the matrix positive.

Only a non-zero positive value at cell `(i, j)` can convert negative values present at its adjacent cells `(i-1, j)`, `(i+1, j)`, `(i, j-1)`, and `(i, j+1)`, i.e., up, down, left and right.

For example, the following matrix needs 3 passes, as demonstrated:

> 

The idea is to use [Breadth–first Search](https://techiedelight.com/breadth-first-search/) as it is the shortest path problem. The algorithm can be implemented as follows:

  1. Create a [queue](https://techiedelight.com/circular-queue-implementation-c/) `Q` and enqueue cell coordinates of all positive numbers in the matrix. Create another queue `q` to separate the positive numbers involved in the previous pass from the positive numbers in the current pass.
  2. Do till first queue `Q` is empty
     1. Copy contents of the original queue `Q` to the second queue `q` and empty the original queue.
     2. Do till second queue `q` is empty
        1. Remove the front node from queue `q` and check all four adjacent cells of the current cell.
        2. If any of the four adjacent cells is negative, make its value positive and enqueue it into queue `Q`.
     3. Increment number of passes by 1.
  3. If all the nodes in the queue are processed, return the total number of passes.

We can find all the adjacent cells of the given cell by storing the relative position of movement from any cell in an array. For example, if the current cell is `(x, y)`, we can move to `(x + row[k], y + col[k])` cell for `0 <= k < 4` using the following arrays:

row[] = { -1, 0, 0, 1 } col[] = { 0, -1, 1, 0 } So, from any position `(x, y)`, we can move to: (x – 1, y) (x, y – 1) (x, y + 1) (x + 1, y)

Following is the TypeScript program that demonstrates it:

```ts
// Function to check whether given coordinates is a valid cell or not
const isValid = (i: number, j: number, M: number, N: number): boolean =>
    (i >= 0 && i < M) && (j >= 0 && j < N);

// Below lists detail all four possible movements from a cell
// (top, right, bottom, and left)
const row = [-1, 0, 0, 1];
const col = [0, -1, 1, 0];

// Returns true if the matrix contains at least one negative value
const hasNegative = (mat: number[][]): boolean => {
    for (let i = 0; i < mat.length; i++) {
        for (let j = 0; j < mat[0].length; j++) {
            if (mat[i][j] < 0) {
                return true;
            }
        }
    }
    return false;
};

// Find the minimum number of passes required to convert all negative values
// in the given matrix to positive
const findMinPasses = (mat: number[][]): number => {

    // base case
    if (!mat || mat.length === 0) {
        return 0;
    }

    // `M × N` matrix
    const [M, N] = [mat.length, mat[0].length];

    // create a queue to store cell coordinates of positive integers
    let Q: [number, number][] = [];

    // enqueue cell coordinates of all positive numbers in the matrix
    for (let i = 0; i < M; i++) {
        for (let j = 0; j < N; j++) {
            if (mat[i][j] > 0) {
                Q.push([i, j]);
            }
        }
    }

    // to keep track of the time taken to make all numbers positive
    let passes = 0;

    // loop till all reachable negative numbers in the matrix are processed
    while (Q.length) {

        // use two queues to separate positive numbers involved in the
        // previous pass with positive numbers involved in the current pass

        // copy contents of the original queue `Q` to another queue `q` and
        // empty the original queue
        const q = Q;
        Q = [];

        /* Start of the current pass */

        // process all cells in the queue
        while (q.length) {

            // pop front node and process it
            const [x, y] = q.shift() as [number, number];

            // check all four adjacent cells of the current cell
            for (let k = 0; k < row.length; k++) {
                // if the current adjacent cell is valid and has a negative value
                if (isValid(x + row[k], y + col[k], M, N) &&
                        mat[x + row[k]][y + col[k]] < 0) {
                    // make the value positive
                    mat[x + row[k]][y + col[k]] = -1 * mat[x + row[k]][y + col[k]];

                    // enqueue adjacent cell
                    Q.push([x + row[k], y + col[k]]);
                }
            }
        }

        /* End of the current pass */

        // increment number of passes by 1
        passes = passes + 1;
    }

    // return number of passes or
    // -1 if the matrix has an unreachable cell which is negative
    return hasNegative(mat) ? -1 : (passes - 1);
};

const mat = [
    [-1, -9, 0, -1, 0],
    [-8, -3, -2, 9, -7],
    [2, 0, 0, -6, 0],
    [0, -7, -3, 5, -4]
];

const passes = findMinPasses(mat);
if (passes !== -1) {
    console.log(`The total number of passes required is ${passes}`);
}
else {
    console.log('Invalid Input');
}
```

**Output:** The total number of passes required is 3

The time complexity of the proposed solution is O(M × N) and requires O(M × N) extra space for queue data structure, where `M` and `N` are dimensions of the matrix.

Also See:

> [Find the shortest distance of every cell from a landmine inside a maze](https://www.techiedelight.com/find-shortest-distance-every-cell-landmine-maze/ "Find the shortest distance of every cell from a landmine inside a maze")

> [Replace all occurrences of 0 that are surrounded by 1 in a binary matrix](https://www.techiedelight.com/replace-occurrences-of-0-surrounded-by-1-matrix/ "Replace all occurrences of 0 that are surrounded by 1 in a binary matrix")

> [Find the length of the longest path in a matrix with consecutive characters](https://www.techiedelight.com/find-length-longest-path-matrix-consecutive-characters/ "Find the length of the longest path in a matrix with consecutive characters")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.88/5. Vote count: 163

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Breadth-first search](https://www.techiedelight.com/Tags/BFS/), [FIFO](https://www.techiedelight.com/Tags/FIFO/), [Hard](https://www.techiedelight.com/Tags/hard/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
