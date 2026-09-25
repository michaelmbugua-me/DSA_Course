# Find the longest possible route in a matrix

> Source: https://www.techiedelight.com/find-longest-possible-route-matrix/

Given a rectangular path in the form of a binary matrix, find the length of the longest possible route from source to destination by moving to only non-zero adjacent positions, i.e., We can form the route from positions having their value as 1. Note there should not be any cycles in the output path.

For example, the longest path from source cell `(0, 0)` to destination cell `(5, 7)` has length `22` for the following matrix.

(0, 0) —> (1, 0) —> (2, 0) —> (2, 1) —> (2, 2) —> (1, 2) —> (0, 2) —> (0, 3) —> (0, 4) —> (1, 4) —> (1, 5) —> (2, 5) —> (2, 4) —> (3, 4) —> (4, 4) —> (5, 4) —> (5, 5) —> (5, 6) —> (4, 6) —> (4, 7) —> (4, 8) —> (5, 8) —> (5, 7)

> 

We can use [backtracking](https://techiedelight.com/backtracking-interview-questions/) to solve this problem. We start from the given source cell in the matrix and explore all four paths possible and recursively check if they will lead to the destination or not. We have to keep track of the current cell’s distance from the source and update the value of the longest path found so far on reaching the destination cell. If a path doesn’t reach the destination or explored all possible routes from the current cell, backtrack. To make sure that the path is simple and doesn’t contain any cycles, keep track of cells involved in the current path in a matrix, and before exploring any cell, ignore the cell if it is already covered in the current path.

Following is a TypeScript implementation of the idea:

```ts
// Check if it is possible to go to position (x, y) from
// the current position. The function returns false if the cell
// is invalid, has a value 0, or it is already visited.
function isSafe(mat: number[][], visited: boolean[][], x: number, y: number): boolean {
    return (x >= 0 && x < mat.length && y >= 0 && y < mat[0].length) &&
            mat[x][y] === 1 && !visited[x][y];
}

// Find the longest possible route in a matrix `mat` from the source cell
// (i, j) to destination cell (x, y).
// `max_dist` —> keep track of the length of the longest path from source to
// destination.
// `dist` —> length of the path from the source cell to the current cell (i, j).
function findLongestPath(mat: number[][], visited: boolean[][], i: number, j: number,
                          x: number, y: number, max_dist: number, dist: number): number {

    // if the destination is not possible from the current cell
    if (mat[i][j] === 0) {
        return 0;
    }

    // if the destination is found, update `max_dist`
    if (i === x && j === y) {
        return Math.max(dist, max_dist);
    }

    // set (i, j) cell as visited
    visited[i][j] = true;

    // go to the bottom cell
    if (isSafe(mat, visited, i + 1, j)) {
        max_dist = findLongestPath(mat, visited, i + 1, j, x, y,
                max_dist, dist + 1);
    }

    // go to the right cell
    if (isSafe(mat, visited, i, j + 1)) {
        max_dist = findLongestPath(mat, visited, i, j + 1, x, y,
                max_dist, dist + 1);
    }

    // go to the top cell
    if (isSafe(mat, visited, i - 1, j)) {
        max_dist = findLongestPath(mat, visited, i - 1, j, x, y,
                max_dist, dist + 1);
    }

    // go to the left cell
    if (isSafe(mat, visited, i, j - 1)) {
        max_dist = findLongestPath(mat, visited, i, j - 1, x, y,
                max_dist, dist + 1);
    }

    // backtrack: remove (i, j) from the visited matrix
    visited[i][j] = false;

    return max_dist;
}

// Wrapper over findLongestPath() function
function findLongestPathLength(mat: number[][], i: number, j: number, x: number, y: number): number {
    // base case: invalid input
    if (mat === null || mat.length === 0 || mat[i][j] === 0 || mat[x][y] === 0) {
        return -1;
    }

    // `M × N` matrix
    const M = mat.length;
    const N = mat[0].length;

    // construct an `M × N` matrix to keep track of visited cells
    const visited: boolean[][] = new Array(M).fill(false).map(() => new Array(N).fill(false));

    // (i, j) are the source cell, and (x, y) are the destination
    // cell coordinates
    return findLongestPath(mat, visited, i, j, x, y, 0, 0);
}

// input matrix
const mat = [
    [1, 0, 1, 1, 1, 1, 0, 1, 1, 1],
    [1, 0, 1, 0, 1, 1, 1, 0, 1, 1],
    [1, 1, 1, 0, 1, 1, 0, 1, 0, 1],
    [0, 0, 0, 0, 1, 0, 0, 1, 0, 0],
    [1, 0, 0, 0, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [1, 0, 0, 0, 1, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 0, 1, 1],
    [1, 1, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 0, 0]
];

// (0, 0) are the source cell, and (5, 7) are the destination
// cell coordinates
const max_dist = findLongestPathLength(mat, 0, 0, 5, 7);
console.log('The maximum length path is ' + max_dist);
```

**Output:** The maximum length path is 22

The time complexity of the above solution

The time complexity of the above solution is exponential and requires additional space for the recursion (call stack).

Also See:

> [Find the shortest path in a maze](https://www.techiedelight.com/find-shortest-path-in-maze/ "Find the shortest path in a maze")

> [Shortest path in a maze – Lee Algorithm](https://www.techiedelight.com/lee-algorithm-shortest-path-in-a-maze/ "Shortest path in a maze – Lee Algorithm")

> [Find the longest sequence formed by adjacent numbers in the matrix](https://www.techiedelight.com/find-longest-sequence-formed-adjacent-numbers-matrix/ "Find the longest sequence formed by adjacent numbers in the matrix")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.72/5. Vote count: 172

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
