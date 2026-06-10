# Find all paths from the first cell to the last cell of a matrix

> Source: https://www.techiedelight.com/find-all-paths-from-source-to-destination-in-matrix/

Given an `M × N` integer matrix, find all paths from the first cell to the last cell. We can only move down or to the right from the current cell.

For example,

**Input:** [ 1 2 3 ] [ 4 5 6 ] [ 7 8 9 ] **Output:** 1, 2, 3, 6, 9 1, 2, 5, 6, 9 1, 2, 5, 8, 9 1, 4, 5, 6, 9 1, 4, 5, 8, 9 1, 4, 7, 8, 9

> 

We can easily solve this problem by using [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/). The idea is to start from the top-left cell of the matrix and recur for the next node (immediate right or immediate bottom cell) and keep on doing that for every visited cell until the destination is reached. Also maintain a path array to store the nodes in the current path and update the path array (including the current node) whenever any cell is visited. Now, whenever the destination (bottom-right corner) is reached, print the path array.

The algorithm can be implemented as follows in TypeScript:

```ts
// Function to check if (i, j) is a valid matrix coordinate
function isValid(i: number, j: number, M: number, N: number): boolean {
    return i >= 0 && i < M && j >= 0 && j < N;
}

// Function to print the route taken
function printPath(path: number[], last: number): void {
    for (const i of path) {
        process.stdout.write(`${i}, `);
    }
    console.log(last);
}

function findPaths(mat: number[][], path: number[], i: number, j: number): void {

    // base case
    if (!mat || !mat.length) {
        return;
    }

    // `M × N` matrix
    const M = mat.length;
    const N = mat[0].length;

    // if the last cell is reached, print the route
    if (i === M - 1 && j === N - 1) {
        printPath(path, mat[i][j]);
        return;
    }

    // include the current cell in the path
    path.push(mat[i][j]);

    // move right
    if (isValid(i, j + 1, M, N)) {
        findPaths(mat, path, i, j + 1);
    }

    // move down
    if (isValid(i + 1, j, M, N)) {
        findPaths(mat, path, i + 1, j);
    }

    // backtrack: remove the current cell from the path
    path.pop();
}

const mat = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

const path: number[] = [];

// start from `(0, 0)` cell
const x = 0, y = 0;

findPaths(mat, path, x, y);
```

**Output:** 1, 2, 3, 6, 9 1, 2, 5, 6, 9 1, 2, 5, 8, 9 1, 4, 5, 6, 9 1, 4, 5, 8, 9 1, 4, 7, 8, 9

The time complexity of the proposed solution is exponential.

T(M, N) = T(M, N-1) + T(M-1, N) // for two recursive calls T(M, 1) = M, T(1, N) = N, T(1, 1) = 1

The additional space used by the program is O(M + N).

If we carefully analyze the solution, we can see the problem has [overlapping subproblems](https://techiedelight.com/introduction-dynamic-programming/#overlapping-subproblems). So, it can be solved using [dynamic programming](https://techiedelight.com/dynamic-programming-interview-questions/), and time complexity can be reduced drastically (space complexity will also increase drastically).

**Exercise:**

1\. Modify the proposed solution to DP using memoization. 2\. Convert the code to use an array for storing path information.

Also See:

> [Print all shortest routes in a rectangular grid](https://www.techiedelight.com/print-all-shortest-routes-rectangular-grid/ "Print all shortest routes in a rectangular grid")

> [Find the longest possible route in a matrix](https://www.techiedelight.com/find-longest-possible-route-matrix/ "Find the longest possible route in a matrix")

> [Find the path from source to destination in a matrix that satisfies given constraints](https://www.techiedelight.com/find-path-source-destination-matrix-satisfies-given-constraints/ "Find the path from source to destination in a matrix that satisfies given constraints")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.77/5. Vote count: 199

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
