# Maximum Length Snake Sequence

> Source: https://www.techiedelight.com/maximum-length-snake-sequence/

Given a square matrix, print the maximum length snake sequence in it. A snake sequence is defined as a sequence of numbers where each new number, which can only be located to the right or down of the current number, is either plus or minus one.

For example, we can either move right from any cell in the matrix (if that number is `±1`) or move down (if that number is `±1`). The problem is finding the longest path (snake sequence) through the matrix, keeping in mind that we can only move to a new cell whose value is `±1` concerning the current cell.

For example, the maximum length snake sequence of the following matrix is `5 — 4 — 5 — 6 — 7 — 8 — 7 — 6` as highlighted below:

Please note that multiple maximum length snake sequences can exist in the matrix. For example, `3 — 4 — 5 — 6 — 7 — 8 — 7 — 6` is another maximum length snake sequence in the above matrix.

> 

We can use [dynamic programming](https://techiedelight.com/introduction-dynamic-programming/) to solve this problem. For each matrix cell `(i, j)`, we need to calculate the maximum length of a snake, say `L[i][j]`, which ends in that cell. The recurrence relation for calculating `L[i][j]` will be:

if (abs(M[i][j] – M[i][j – 1]) == 1) L[i][j] = max(L[i][j], L[i][j – 1] + 1) if (abs(M[i][j] – M[i – 1][j]) == 1) L[i][j] = max(L[i][j], L[i – 1][j] + 1)

Now, the cell with the maximum value will correspond to the snake’s tail, and we can easily trace the path back to the snake’s head using the `L[][]` matrix. The algorithm can be implemented as follows in TypeScript:

```ts
// Construct maximum length snake sequence from the given tail and `L[]` matrix
function constructPath(L: number[][], grid: number[][], tail: [number, number]): [number, number][] {

    let [i, j] = tail;
    const path: [number, number][] = [tail];

    // start from snake's tail till snake's head
    while (L[i][j]) {
        if (i - 1 >= 0 && L[i][j] - L[i - 1][j] === 1 &&
                Math.abs(grid[i - 1][j] - grid[i][j]) === 1) {
            path.push([i - 1, j]);
            i = i - 1;
        }
        // note that there can be multiple paths – hence we have placed 'else' block
        else if (j - 1 >= 0 && L[i][j] - L[i][j - 1] === 1 &&
                Math.abs(grid[i][j - 1] - grid[i][j]) === 1) {
            path.push([i, j - 1]);
            j = j - 1;
        }
    }

    return path;
}

// Function to find the maximum length of snake sequence in a given matrix
function findMaxLengthSnakeSequence(grid: number[][]): [number, number][] {

    // base case
    if (!grid || !grid.length) {
        return null!;
    }

    // `L[i][j]` stores the maximum length of the snake sequence
    // ending at cell (i, j)
    const L: number[][] = Array.from({ length: grid.length }, () => Array(grid.length).fill(0));

    // stores the maximum length of the snake sequence
    let max_so_far = 0;

    // Pair to store coordinates of a snake's tail
    let tail: [number, number] = [0, 0];

    // process the matrix in a bottom-up fashion
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid.length; j++) {
            // compare the current cell with the top cell and check the
            // absolute difference
            if (i - 1 >= 0 && Math.abs(grid[i - 1][j] - grid[i][j]) === 1) {
                L[i][j] = L[i - 1][j] + 1;
                if (max_so_far < L[i][j]) {
                    max_so_far = L[i][j];
                    tail = [i, j];
                }
            }

            // compare the current cell with the left cell and check the
            // absolute difference
            if (j - 1 >= 0 && Math.abs(grid[i][j - 1] - grid[i][j]) === 1) {
                // `L[i][j]` can be non-zero at this point, hence take the maximum
                L[i][j] = Math.max(L[i][j], L[i][j - 1] + 1);
                if (max_so_far < L[i][j]) {
                    max_so_far = L[i][j];
                    tail = [i, j];
                }
            }
        }
    }

    // construct the maximum length snake sequence
    return constructPath(L, grid, tail);
}

function printSnakeSequence(grid: number[][], path: [number, number][]): void {
    // base case
    if (!grid || !grid.length) {
        return;
    }

    console.log(`The maximum length snake sequence is ${path.slice().reverse().map(([x, y]) => grid[x][y]).join(' — ')}`);
    console.log(`The length is ${path.length - 1}`);
}

const grid = [
    [7, 5, 2, 3, 1],
    [3, 4, 1, 4, 4],
    [1, 5, 6, 7, 8],
    [3, 4, 5, 8, 9],
    [3, 2, 2, 7, 6]
];

const path = findMaxLengthSnakeSequence(grid);
printSnakeSequence(grid, path);
```

**Output:** The maximum length snake sequence is 5 — 4 — 5 — 6 — 7 — 8 — 7 — 6 The length is 7

The time complexity of the proposed solution is O(N2) for an `N × N` matrix. The auxiliary space required by the program is O(N2).

**Exercise:** Extend the solution for a rectangular matrix

Also See:

> [Find the length of the longest path in a matrix with consecutive characters](https://www.techiedelight.com/find-length-longest-path-matrix-consecutive-characters/ "Find the length of the longest path in a matrix with consecutive characters")

> [Find the longest possible route in a matrix](https://www.techiedelight.com/find-longest-possible-route-matrix/ "Find the longest possible route in a matrix")

> [Collect maximum value of coins in a matrix](https://www.techiedelight.com/collect-maximum-value-coins-matrix/ "Collect maximum value of coins in a matrix")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.75/5. Vote count: 222

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Algorithm](https://www.techiedelight.com/Tags/Algorithm/), [Bottom-up](https://www.techiedelight.com/Tags/Tabulation/), [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
