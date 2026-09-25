# Find the shortest path in a maze

> Source: https://www.techiedelight.com/find-shortest-path-in-maze/

Given a [maze](https://techiedelight.com/maze-problems-in-data-structures/) in the form of a binary rectangular matrix, find the shortest path’s length in the maze from a given source to a given destination. The path can only be constructed out of cells having value 1, and at any moment, we can only move one step in one of the four directions.

The valid moves are:

**Go Top:** (x, y) ——> (x – 1, y) **Go Left:** (x, y) ——> (x, y – 1) **Go Down:** (x, y) ——> (x + 1, y) **Go Right:** (x, y) ——> (x, y + 1)

For example, consider the following binary matrix. If source = `(0, 0)` and destination = `(7, 5)`, the shortest path from source to destination has length 12.

[ 1 1 1 1 1 0 0 1 1 1 ] [ 0 1 1 1 1 1 0 1 0 1 ] [ 0 0 1 0 1 1 1 0 0 1 ] [ 1 0 1 1 1 0 1 1 0 1 ] [ 0 0 0 1 0 0 0 1 0 1 ] [ 1 0 1 1 1 0 0 1 1 0 ] [ 0 0 0 0 1 0 0 1 0 1 ] [ 0 1 1 1 1 1 1 1 0 0 ] [ 1 1 1 1 1 0 0 1 1 1 ] [ 0 0 1 0 0 1 1 0 0 1 ]

> 

To find the maze’s shortest path, search for all possible paths in the maze from the starting position to the goal position until all possibilities are exhausted. We can easily achieve this with the help of [backtracking](https://techiedelight.com/backtracking-interview-questions/). The idea is to start from the given source cell in the matrix and explore all four paths possible and recursively check if they will lead to the destination or not. Then update the minimum path length whenever the destination cell is reached. If a path doesn’t reach the destination or explored all possible routes from the current cell, backtrack. To make sure that the path is simple and doesn’t contain any cycles, keep track of cells involved in the current path in a matrix, and before exploring any cell, ignore the cell if it is already covered in the current path.

Following is the TypeScript implementation of the idea:

```ts
// Check if it is possible to go to (x, y) from the current position. The
// function returns false if the cell is invalid, has value 0 or already visited
function isSafe(mat: number[][], visited: boolean[][], x: number, y: number): boolean {
    return x >= 0 && x < mat.length && y >= 0 && y < mat[0].length &&
           !(mat[x][y] === 0 || visited[x][y]);
}

// Find the shortest possible route in a matrix `mat` from source cell (i, j)
// to destination cell `dest`.

// `min_dist` stores the length of the longest path from source to a destination
// found so far, and `dist` maintains the length of the path from a source cell to
// the current cell (i, j).

function findShortestPath(mat: number[][], visited: boolean[][], i: number, j: number,
        dest: [number, number], minDist = Number.MAX_SAFE_INTEGER, dist = 0): number {

    // if the destination is found, update `min_dist`
    if (i === dest[0] && j === dest[1]) {
        return Math.min(dist, minDist);
    }

    // set (i, j) cell as visited
    visited[i][j] = true;

    // go to the bottom cell
    if (isSafe(mat, visited, i + 1, j)) {
        minDist = findShortestPath(mat, visited, i + 1, j, dest, minDist, dist + 1);
    }

    // go to the right cell
    if (isSafe(mat, visited, i, j + 1)) {
        minDist = findShortestPath(mat, visited, i, j + 1, dest, minDist, dist + 1);
    }

    // go to the top cell
    if (isSafe(mat, visited, i - 1, j)) {
        minDist = findShortestPath(mat, visited, i - 1, j, dest, minDist, dist + 1);
    }

    // go to the left cell
    if (isSafe(mat, visited, i, j - 1)) {
        minDist = findShortestPath(mat, visited, i, j - 1, dest, minDist, dist + 1);
    }

    // backtrack: remove (i, j) from the visited matrix
    visited[i][j] = false;

    return minDist;
}

// Wrapper over findShortestPath() function
function findShortestPathLength(mat: number[][], src: [number, number],
        dest: [number, number]): number {

    // get source cell (i, j)
    const [i, j] = src;

    // get destination cell (x, y)
    const [x, y] = dest;

    // base case
    if (!mat || mat.length === 0 || mat[i][j] === 0 || mat[x][y] === 0) {
        return -1;
    }

    // `M × N` matrix
    const M = mat.length;
    const N = mat[0].length;

    // construct an `M × N` matrix to keep track of visited cells
    const visited: boolean[][] = Array.from({ length: M }, () => new Array(N).fill(false));

    const minDist = findShortestPath(mat, visited, i, j, dest);

    if (minDist !== Number.MAX_SAFE_INTEGER) {
        return minDist;
    } else {
        return -1;
    }
}

const mat = [
    [1, 1, 1, 1, 1, 0, 0, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 0, 1, 0, 1],
    [0, 0, 1, 0, 1, 1, 1, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
    [0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 0, 1, 1, 0],
    [0, 0, 0, 0, 1, 0, 0, 1, 0, 1],
    [0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [1, 1, 1, 1, 1, 0, 0, 1, 1, 1],
    [0, 0, 1, 0, 0, 1, 1, 0, 0, 1]
];

const src: [number, number] = [0, 0];
const dest: [number, number] = [7, 5];

const minDist = findShortestPathLength(mat, src, dest);

if (minDist !== -1) {
    console.log('The shortest path from source to destination has length', minDist);
} else {
    console.log('Destination cannot be reached from source');
}
```

**Output:** The shortest path from source to destination has length 12

The time complexity of the above backtracking solution will be higher since all paths need to be traveled. However, since it is the shortest path problem, [Breadth–first search (BFS)](https://techiedelight.com/breadth-first-search/) would be an ideal choice. If BFS is used to solve this problem, we travel level by level. So the destination node’s first occurrence gives us the result, and we can stop our search there. The BFS approach is discussed [here](https://techiedelight.com/lee-algorithm-shortest-path-in-a-maze/).

Also See:

> [Find the longest possible route in a matrix](https://www.techiedelight.com/find-longest-possible-route-matrix/ "Find the longest possible route in a matrix")

> [Shortest path in a maze – Lee Algorithm](https://www.techiedelight.com/lee-algorithm-shortest-path-in-a-maze/ "Shortest path in a maze – Lee Algorithm")

> [Find the total number of unique paths in a maze from source to destination](https://www.techiedelight.com/find-total-number-unique-paths-maze-source-destination/ "Find the total number of unique paths in a maze from source to destination")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.84/5. Vote count: 211

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
