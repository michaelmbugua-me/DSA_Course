# Find the shortest path from source to destination in a matrix that satisfies given constraints

> Source: https://www.techiedelight.com/find-shortest-path-source-destination-matrix-satisfies-given-constraints/

Given an `N × N` matrix of positive integers, find the shortest path from the first cell of the matrix to its last cell that satisfies given constraints.

We are allowed to move exactly `k` steps from any cell in the matrix where `k` is the cell’s value, i.e., from a cell `(i, j)` having value `k` in a matrix `M`, we can move to `(i+k, j)`, `(i-k, j)`, `(i, j+k)`, or `(i, j-k)`. The diagonal moves are not allowed.

For example,

**Input:** [ 7 1 3 5 3 6 1 1 7 5 ] [ 2 3 6 1 1 6 6 6 1 2 ] [ 6 1 7 2 1 4 7 6 6 2 ] [ 6 6 7 1 3 3 5 1 3 4 ] [ 5 5 6 1 5 4 6 1 7 4 ] [ 3 5 5 2 7 5 3 4 3 6 ] [ 4 1 4 3 6 4 5 3 2 6 ] [ 4 4 1 7 4 3 3 1 4 2 ] [ 4 4 5 1 5 2 3 5 3 5 ] [ 3 6 3 5 2 2 6 4 2 1 ] **Output:** The shortest path length is 6 The shortest path is (0, 0) (0, 7) (0, 6) (1, 6) (7, 6) (7, 9) (9, 9) **Input:** [ 4 4 6 5 5 1 1 1 7 4 ] [ 3 6 2 4 6 5 7 2 6 6 ] [ 1 3 6 1 1 1 7 1 4 5 ] [ 7 5 6 3 1 3 3 1 1 7 ] [ 3 4 6 4 7 2 6 5 4 4 ] [ 3 2 5 1 2 5 1 2 3 4 ] [ 4 2 2 2 5 2 3 7 7 3 ] [ 7 2 4 3 5 2 2 3 6 3 ] [ 5 1 4 2 6 4 6 7 3 7 ] [ 1 4 1 7 5 3 6 5 3 4 ] **Output:** The shortest path length is 6 The shortest path is (0, 0) (0, 4) (5, 4) (5, 2) (5, 7) (5, 9) (9, 9)

> 

We have already discussed a [backtracking](https://techiedelight.com/backtracking-interview-questions/) solution in the [previous post](https://techiedelight.com/find-path-source-destination-matrix-satisfies-given-constraints/). The time complexity of the backtracking solution would be higher since all paths need to be traveled until the destination is reached. However, since it is the shortest path problem, [Breadth–first search (BFS)](https://techiedelight.com/breadth-first-search/) would be an ideal choice. This post proposes the BFS solution.

Following is the complete algorithm:

  1. Create an empty [queue](https://techiedelight.com/circular-queue-implementation-c/) and enqueue the source cell having a distance 0 from source (itself) and mark it as visited.
  2. Loop till queue is empty

     1. Dequeue the front node.
     2. If the popped node is the destination node, return its distance.
     3. Otherwise, for each of four adjacent cells of the current cell, enqueue each of the valid cells with +1 distance and mark them as visited.
  3. If all the queue nodes are processed, and the destination is not reached, then return false.

Note that in BFS, all cells having the shortest path as 1 are visited first, followed by their adjacent cells having the shortest path as 1 + 1 = 2 and so on. So if we reach any node in BFS, its shortest path is one more than the shortest path of the parent. So, the first occurrence of the destination cell gives us the result, and we can stop our search there. _The shortest path cannot possibly exist from some other cell for which we haven’t reached the given node yet. If any such path was possible, we would have already explored it._

Note that we can find all the possible locations we can move to from the given location by using the array that stores the relative position of movement from any location. For example, if the current location is `(x, y)`, we can move to `(x + row[k], y + col[k])` for `0 <= k < 4` using the following array:

row[] = { -1, 0, 0, 1 } col[] = { 0, -1, 1, 0 } So, from position (x, y), we can move to: (x – 1, y) (x, y – 1) (x, y + 1) (x + 1, y)

The algorithm can be implemented as follows in TypeScript:

```ts
// A queue node used in BFS
class Node {
    // (x, y) represents coordinates of a cell in the matrix
    // maintain a parent node for the printing path
    x: number;
    y: number;
    parent: Node | null = null;
    constructor(x: number, y: number, parent: Node | null = null) {
        this.x = x;
        this.y = y;
        this.parent = parent;
    }

    toString(): string {
        return `(${this.x}, ${this.y})`;
    }
}

// Below arrays detail all four possible movements from a cell
const row = [-1, 0, 0, 1];
const col = [0, -1, 1, 0];

// The function returns false if (x, y) is not a valid position
function isValid(x: number, y: number, N: number): boolean {
    return (x >= 0 && x < N) && (y >= 0 && y < N);
}

// Utility function to find path from source to destination
function getPath(node: Node | null, path: Node[]): void {
    if (node) {
        getPath(node.parent, path);
        path.push(node);
    }
}

// Find the shortest route in a matrix from source cell (x, y) to
// destination cell (N-1, N-1)
function findPath(matrix: number[][], x = 0, y = 0): Node[] | null {
    // base case
    if (!matrix || matrix.length === 0) {
        return null;
    }

    // `N × N` matrix
    const N = matrix.length;

    // create a queue and enqueue the first node
    const q: Node[] = [];
    const src = new Node(x, y);
    q.push(src);

    // set to check if the matrix cell is visited before or not
    const visited = new Set<string>();

    let key = `${src.x},${src.y}`;
    visited.add(key);

    // loop till queue is empty
    while (q.length) {

        // dequeue front node and process it
        const curr = q.shift();
        if (curr === undefined) {
            break;
        }
        const i = curr.x;
        const j = curr.y;

        // return if the destination is found
        if (i === N - 1 && j === N - 1) {
            const path: Node[] = [];
            getPath(curr, path);
            return path;
        }

        // value of the current cell
        const n = matrix[i][j];

        // check all four possible movements from the current cell
        // and recur for each valid movement
        for (let k = 0; k < row.length; k++) {
            // get next position coordinates using the value of the current cell
            x = i + row[k] * n;
            y = j + col[k] * n;

            // check if it is possible to go to the next position
            // from the current position
            if (isValid(x, y, N)) {
                // construct the next cell node
                const next = new Node(x, y, curr);
                key = `${next.x},${next.y}`;

                // if it isn't visited yet
                if (!visited.has(key)) {
                    // enqueue it and mark it as visited
                    q.push(next);
                    visited.add(key);
                }
            }
        }
    }

    // return null if the path is not possible
    return null;
}

const matrix = [
    [4, 4, 6, 5, 5, 1, 1, 1, 7, 4],
    [3, 6, 2, 4, 6, 5, 7, 2, 6, 6],
    [1, 3, 6, 1, 1, 1, 7, 1, 4, 5],
    [7, 5, 6, 3, 1, 3, 3, 1, 1, 7],
    [3, 4, 6, 4, 7, 2, 6, 5, 4, 4],
    [3, 2, 5, 1, 2, 5, 1, 2, 3, 4],
    [4, 2, 2, 2, 5, 2, 3, 7, 7, 3],
    [7, 2, 4, 3, 5, 2, 2, 3, 6, 3],
    [5, 1, 4, 2, 6, 4, 6, 7, 3, 7],
    [1, 4, 1, 7, 5, 3, 6, 5, 3, 4]
];

// Find a route in the matrix from source cell (0, 0) to
// destination cell (N-1, N-1)
const path = findPath(matrix);

if (path) {
    console.log('The shortest path is', path.map(node => node.toString()).join(' '));
} else {
    console.log('Destination is not found');
}
```

**Output:** The shortest path is (0, 0) (0, 4) (5, 4) (5, 2) (5, 7) (5, 9) (9, 9)

In the above program, each node in the queue takes extra space as we are storing path information along with it. The space complexity can be improved if we are asked only to find the shortest distance from the source to the destination. The implementation can be seen below in TypeScript:

```ts
// Below arrays detail all four possible movements from a cell
const row = [-1, 0, 0, 1];
const col = [0, -1, 1, 0];

// The function returns false if (x, y) is not a valid position
function isValid(x: number, y: number, N: number): boolean {
    return x >= 0 && x < N && y >= 0 && y < N;
}

// Find the shortest route in a matrix from source cell (x, y) to
// destination cell (N-1, N-1)
function findPath(matrix: number[][], x = 0, y = 0, level = 0): number {

    // base case
    if (!matrix || matrix.length === 0) {
        return -1;
    }

    // `N × N` matrix
    const N = matrix.length;

    // create a queue and enqueue the first node
    const q: [number, number, number][] = [];

    // (x, y) represents coordinates of a cell in the matrix
    // `level` stores the distance of a current node from the source node
    // (i.e., BFS level)

    q.push([x, y, level]);

    // set to check if the matrix cell is visited before or not
    const visited = new Set<string>();
    visited.add(`${x},${y}`);

    // loop till queue is empty
    while (q.length) {

        // dequeue front node and process it
        const current = q.shift();
        if (current === undefined) {
            break;
        }
        const [i, j, currLevel] = current;

        // return if the destination is found
        if (i === N - 1 && j === N - 1) {
            return currLevel;
        }

        // value of the current cell
        const n = matrix[i][j];

        // check all four possible movements from the current cell
        // and recur for each valid movement
        for (let k = 0; k < row.length; k++) {
            // get next position coordinates using the value of the current cell
            x = i + row[k] * n;
            y = j + col[k] * n;

            // check if it is possible to go to the next position
            // from the current position
            if (isValid(x, y, N)) {
                // if it isn't visited yet
                if (!visited.has(`${x},${y}`)) {

                    // construct the next cell node and enqueue it
                    // and mark it as visited
                    q.push([x, y, currLevel + 1]);
                    visited.add(`${x},${y}`);
                }
            }
        }
    }

    // return a negative number if the path is not possible
    return -1;
}

const matrix = [
    [4, 4, 6, 5, 5, 1, 1, 1, 7, 4],
    [3, 6, 2, 4, 6, 5, 7, 2, 6, 6],
    [1, 3, 6, 1, 1, 1, 7, 1, 4, 5],
    [7, 5, 6, 3, 1, 3, 3, 1, 1, 7],
    [3, 4, 6, 4, 7, 2, 6, 5, 4, 4],
    [3, 2, 5, 1, 2, 5, 1, 2, 3, 4],
    [4, 2, 2, 2, 5, 2, 3, 7, 7, 3],
    [7, 2, 4, 3, 5, 2, 2, 3, 6, 3],
    [5, 1, 4, 2, 6, 4, 6, 7, 3, 7],
    [1, 4, 1, 7, 5, 3, 6, 5, 3, 4]
];

// Find a route in the matrix from source cell (0, 0) to
// destination cell (N-1, N-1)
const dist = findPath(matrix);

if (dist !== -1) {
    console.log('The shortest path length is', dist);
} else {
    console.log('Destination is not found');
}
```
