# Find the path from source to destination in a matrix that satisfies given constraints

> Source: https://www.techiedelight.com/find-path-source-destination-matrix-satisfies-given-constraints/

Given an `N × N` matrix of positive integers, find a path from the first cell of the matrix to its last cell.

We are allowed to move exactly `k` steps from any cell in the matrix where `k` is the cell’s value, i.e., from a cell `(i, j)` having value `k` in a matrix `M`, we can move to `(i+k, j)`, `(i-k, j)`, `(i, j+k)`, or `(i, j-k)`. The diagonal moves are not allowed.

For example,

**Input:** [ 7 1 3 5 3 6 1 1 7 5 ] [ 2 3 6 1 1 6 6 6 1 2 ] [ 6 1 7 2 1 4 7 6 6 2 ] [ 6 6 7 1 3 3 5 1 3 4 ] [ 5 5 6 1 5 4 6 1 7 4 ] [ 3 5 5 2 7 5 3 4 3 6 ] [ 4 1 4 3 6 4 5 3 2 6 ] [ 4 4 1 7 4 3 3 1 4 2 ] [ 4 4 5 1 5 2 3 5 3 5 ] [ 3 6 3 5 2 2 6 4 2 1 ] **Output:** (0, 0) (7, 0) (3, 0) (9, 0) (6, 0) (2, 0) (8, 0) (4, 0) (4, 5) (0, 5) (6, 5) (2, 5) (2, 1) (1, 1) (4, 1) (9, 1) (3, 1) (3, 7) (2, 7) (8, 7) (8, 2) (3, 2) (3, 9) (7, 9) (9, 9) OR (0, 0) (7, 0) (3, 0) (9, 0) (6, 0) (2, 0) (8, 0) (4, 0) (4, 5) (8, 5) (6, 5) (2, 5) (2, 9) (4, 9) (8, 9) (3, 9) (7, 9) (9, 9) OR Any other path possible from source to destination [ 4 4 6 5 5 1 1 1 7 4 ] [ 3 6 2 4 6 5 7 2 6 6 ] [ 1 3 6 1 1 1 7 1 4 5 ] [ 7 5 6 3 1 3 3 1 1 7 ] [ 3 4 6 4 7 2 6 5 4 4 ] [ 3 2 5 1 2 5 1 2 3 4 ] [ 4 2 2 2 5 2 3 7 7 3 ] [ 7 2 4 3 5 2 2 3 6 3 ] [ 5 1 4 2 6 4 6 7 3 7 ] [ 1 4 1 7 5 3 6 5 3 4 ] **Output:** (0, 0) (4, 0) (1, 0) (1, 3) (5, 3) (4, 3) (0, 3) (0, 8) (7, 8) (1, 8) (1, 2) (3, 2) (9, 2) (8, 2) (4, 2) (4, 8) (8, 8) (5, 8) (2, 8) (6, 8) (6, 1) (4, 1) (0, 1) (0, 5) (1, 5) (6, 5) (4, 5) (2, 5) (3, 5) (3, 8) (3, 7) (2, 7) (1, 7) (1, 9) (7, 9) (7, 6) (5, 6) (6, 6) (6, 9) (9, 9) OR Any other path possible from source to destination.

> 

We can use [backtracking](https://techiedelight.com/backtracking-interview-questions/) to solve this problem. The idea is to start from the source cell in the matrix and explore all four possible paths and recursively check if they will lead to the solution or not. If a path doesn’t reach the destination or explored all possible routes from the current cell, backtrack. To make sure that the path is simple and doesn’t contain any cycles, keep track of cells involved in the current path in a matrix, and before exploring any cell, ignore the cell if it is already covered in the current path.

We can find all the possible locations we can move to from the given location by using the array that stores the relative position of movement from any location. For example, if the current location is `(x, y)`, we can move to `(x + row[k], y + col[k])` for `0 <= k < 4` using the arrays:

row[] = { -1, 0, 0, 1 } col[] = { 0, -1, 1, 0 }

So, from position `(x, y)`, we can move to `(x - 1, y)`, `(x, y - 1)`, `(x, y + 1)`, and `(x + 1, y)`. The algorithm can be implemented as follows in TypeScript:

```ts
// To store cell coordinates of the matrix
class Node {
    constructor(public first: number, public second: number) {}
}

// Below arrays detail all four possible movements from a cell
const row = [-1, 0, 0, 1];
const col = [0, -1, 1, 0];

// Function to check if it is possible to go to position `pt`
// from the current position. The function returns false if `pt` is
// not a valid position, or it is already visited
function isValid(path: Node[], pt: Node, N: number): boolean {
    return pt.first >= 0 && pt.first < N && pt.second >= 0 && pt.second < N &&
        !path.some(x => x.first === pt.first && x.second === pt.second);
}

// Function to print the complete path from source to destination
function printPath(path: Node[]): void {
    for (const cell of path) {
        process.stdout.write(`(${cell.first}, ${cell.second}) `);
    }
    console.log();
}

// Find a route in a matrix `mat` from source cell (0, 0) to
// destination cell (N-1, N-1)
function findPath(mat: number[][], path: Node[], curr: Node): boolean {

    // base case
    if (!mat || mat.length === 0) {
        return false;
    }

    // include current vertex in the path
    path.push(curr);

    // `N × N` matrix
    const N = mat.length;

    // if the destination is found, return true
    if (curr.first === N - 1 && curr.second === N - 1) {
        return true;
    }

    // get the value of the current cell
    const n = mat[curr.first][curr.second];

    // check all four possible movements from the current cell
    // and recur for each valid movement
    for (let i = 0; i < row.length; i++) {

        // get the next position using the value of the current cell
        const x = curr.first + row[i] * n;
        const y = curr.second + col[i] * n;

        const next = new Node(x, y);

        // check if it is possible to go to a position (x, y)
        // from the current position
        if (isValid(path, next, N) && findPath(mat, path, next)) {
            return true;
        }
    }

    // backtrack: exclude the current cell from the path
    path.pop();
    return false;
}

const mat = [
    [7, 1, 3, 5, 3, 6, 1, 1, 7, 5],
    [2, 3, 6, 1, 1, 6, 6, 6, 1, 2],
    [6, 1, 7, 2, 1, 4, 7, 6, 6, 2],
    [6, 6, 7, 1, 3, 3, 5, 1, 3, 4],
    [5, 5, 6, 1, 5, 4, 6, 1, 7, 4],
    [3, 5, 5, 2, 7, 5, 3, 4, 3, 6],
    [4, 1, 4, 3, 6, 4, 5, 3, 2, 6],
    [4, 4, 1, 7, 4, 3, 3, 1, 4, 2],
    [4, 4, 5, 1, 5, 2, 3, 5, 3, 5],
    [3, 6, 3, 5, 2, 2, 6, 4, 2, 1]
];

const path: Node[] = [];
const source = new Node(0, 0);

// Find a route in a matrix `mat` from source cell (0, 0) to
// destination cell (N-1, N-1)
if (findPath(mat, path, source)) {
    printPath(path);
}
```

**Output:** (0, 0) (0, 7) (0, 6) (0, 5) (6, 5) (2, 5) (2, 1) (1, 1) (1, 4) (0, 4) (0, 1) (0, 2) (3, 2) (3, 9) (3, 5) (3, 8) (0, 8) (7, 8) (7, 4) (3, 4) (3, 1) (3, 7) (3, 6) (8, 6) (5, 6) (2, 6) (9, 6) (9, 0) (6, 0) (2, 0) (8, 0) (4, 0) (4, 5) (4, 1) (9, 1) (9, 7) (5, 7) (1, 7) (7, 7) (7, 6) (7, 9) (9, 9)

The time complexity of the above solution is exponential and requires additional space for the recursion (call stack).

**Exercise:** Extend this solution to return the [length of the shortest path from source to destination efficiently](https://techiedelight.com/find-shortest-path-source-destination-matrix-satisfies-given-constraints/).

Also See:

> [Find the shortest path from source to destination in a matrix that satisfies given constraints](https://www.techiedelight.com/find-shortest-path-source-destination-matrix-satisfies-given-constraints/ "Find the shortest path from source to destination in a matrix that satisfies given constraints")

> [Chess Knight Problem | Find the shortest path from source to destination](https://www.techiedelight.com/chess-knight-problem-find-shortest-path-source-destination/ "Chess Knight Problem | Find the shortest path from source to destination")

> [Find the length of the longest path in a matrix with consecutive characters](https://www.techiedelight.com/find-length-longest-path-matrix-consecutive-characters/ "Find the length of the longest path in a matrix with consecutive characters")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.83/5. Vote count: 160

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Depth-first search](https://www.techiedelight.com/Tags/DFS/), [Medium](https://www.techiedelight.com/Tags/medium/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
