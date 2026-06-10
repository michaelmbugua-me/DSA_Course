# Find the shortest safe route in a field with sensors present

> Source: https://www.techiedelight.com/find-shortest-safe-route-field-sensors-present/

Given a rectangular field with few sensors present, cross it by taking the shortest safe route without activating the sensors.

The rectangular field is in the form of an `M × N` matrix, and we need to find the shortest path from any cell in the first column to any cell in the last column of the matrix. The sensors are marked by the value `0` in the matrix, and all its eight adjacent cells can also activate the sensors. The path can only be constructed out of cells having value `1`, and at any given moment, we can only move one step in one of the four directions. The valid moves are:

**Go Up:** (x, y) ——> (x – 1, y) **Go Left:** (x, y) ——> (x, y – 1) **Go Down:** (x, y) ——> (x + 1, y) **Go Right:** (x, y) ——> (x, y + 1)

For example, consider the following matrix:

The shortest safe path has a length of `11`, and the route is marked in green.

> 

The idea is to use [Breadth–first search (BFS)](https://techiedelight.com/breadth-first-search/) since it is the shortest path problem. Following is the complete algorithm:

  1. Create a [queue](https://techiedelight.com/circular-queue-implementation-c/) and enqueue every safe cell of the first column and set their distance as `0` from the source (itself). Also, mark them as visited as we enqueue them.
  2. Loop till queue is empty
     1. Dequeue the front node.
     2. If the popped node is the destination node (last column), return its distance.
     3. Otherwise, for each of four adjacent cells of the current cell, enqueue each valid cell with `+1` distance and mark them as visited.
  3. If all the queue nodes are processed, and the destination is not reached, then return false.

We can find all the possible locations we can move to from the given location by using the array that stores the relative position of movement from any location. For example, if the current location is `(x, y)`, we can move to `(x + row[k], y + col[k])` for `0 <= k < 4` using the following array:

row[] = { -1, 0, 0, 1 } col[] = { 0, -1, 1, 0 } So, from position `(x, y)`, we can move to: (x – 1, y) (x, y – 1) (x, y + 1) (x + 1, y)

Note that in BFS, all cells having the shortest path as 1 are visited first, followed by their adjacent cells having the shortest path as 1 + 1 = 2 and so on… so if we reach any node in BFS, its shortest path is one more than the shortest path of the parent. So, the first occurrence of the destination cell gives us the result, and we can stop our search there. The shortest path cannot possibly exist from some other cell for which we haven’t reached the given node yet. If any such path was possible, we would have already explored it.

The algorithm can be implemented as follows in TypeScript:

```ts
// Below arrays detail all four possible movements from a cell,
// i.e., (top, right, bottom, left)
const row = [-1, 0, 0, 1];
const col = [0, -1, 1, 0];

// Function to check if it is safe to go to position (x, y)
// from the current position. The function returns false if (x, y)
// is unsafe or already visited.
function isSafe(field: number[][], visited: boolean[][], x: number, y: number): boolean {
    return field[x][y] === 1 && !visited[x][y];
}

// Check if (x, y) is valid field coordinates.
// Note that we cannot go out of the field.
function isValid(x: number, y: number, M: number, N: number): boolean {
    return x >= 0 && x < M && y >= 0 && y < N;
}

// Find the minimum number of steps required to reach the last column
// from the first column using BFS
function BFS(field: number[][]): number {

    // `M × N` matrix
    const M = field.length;
    const N = field[0].length;

    // stores if the cell is visited or not
    const visited: boolean[][] = Array.from({ length: M }, () => new Array(N).fill(false));

    // create an empty queue
    const q: [number, number, number][] = [];

    // process every cell of the first column
    for (let r = 0; r < M; r++) {

        // if the cell is safe, mark it as visited and
        // enqueue it by assigning it distance as 0
        if (field[r][0] === 1) {
            q.push([r, 0, 0]);
            visited[r][0] = true;
        }
    }

    // loop till queue is empty
    while (q.length) {

        // dequeue front node and process it

        // (i, j) represents the position inside the field
        // `dist` represents its minimum distance from the source

        const cell = q.shift();
        if (cell === undefined) {
            break;
        }
        const [i, j, dist] = cell;

        // if the destination is found, return minimum distance
        if (j === N - 1) {
            return dist;
        }

        // check for all four possible movements from the current cell
        // and enqueue each valid movement
        for (let k = 0; k < row.length; k++) {

            // skip if the location is invalid or visited, or unsafe
            if (isValid(i + row[k], j + col[k], M, N) &&
                    isSafe(field, visited, i + row[k], j + col[k])) {
                // mark it as visited and enqueue it with +1 distance
                visited[i + row[k]][j + col[k]] = true;
                q.push([i + row[k], j + col[k], dist + 1]);
            }
        }
    }

    return Number.MAX_SAFE_INTEGER;
}

// Find the shortest path from the first column to the last column in a given field
function findShortestDistance(mat: number[][]): number {

    // base case
    if (!mat || mat.length === 0) {
        return 0;
    }

    // `M × N` matrix
    const M = mat.length;
    const N = mat[0].length;

    // `r` and `c` detail all eight possible movements from a cell
    // (top, right, bottom, left, and four diagonal moves)
    const r = [-1, -1, -1, 0, 0, 1, 1, 1];
    const c = [-1, 0, 1, -1, 1, -1, 0, 1];

    // mark adjacent cells of sensors as unsafe
    for (let i = 0; i < M; i++) {
        for (let j = 0; j < N; j++) {
            for (let k = 0; k < r.length; k++) {
                if (mat[i][j] === 0 && isValid(i + r[k], j + c[k], M, N) &&
                        mat[i + r[k]][j + c[k]] === 1) {
                    mat[i + r[k]][j + c[k]] = Number.MAX_SAFE_INTEGER;
                }
            }
        }
    }

    // update the mat
    for (let i = 0; i < M; i++) {
        for (let j = 0; j < N; j++) {
            if (mat[i][j] === Number.MAX_SAFE_INTEGER) {
                mat[i][j] = 0;
            }
        }
    }

    // call BFS and return the shortest distance found by it
    return BFS(mat);
}

const field = [
    [0, 1, 1, 1, 0, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

// `M × N` field
const M = field.length;

const dist = findShortestDistance(field);

if (dist !== Number.MAX_SAFE_INTEGER) {
    console.log('The shortest safe path has a length of', dist);
} else {
    console.log('No route is safe to reach destination');
}
```

**Output:** The shortest safe path has a length of 11

The time complexity of the proposed solution is O(M × N) and requires O(M × N) extra space, where `M` and `N` are dimensions of the matrix.

**Exercise:** Extend the solution to print the shortest path.

Also See:

> [Shortest path in a maze – Lee Algorithm](https://www.techiedelight.com/lee-algorithm-shortest-path-in-a-maze/ "Shortest path in a maze – Lee Algorithm")

> [Find the shortest distance of every cell from a landmine inside a maze](https://www.techiedelight.com/find-shortest-distance-every-cell-landmine-maze/ "Find the shortest distance of every cell from a landmine inside a maze")

> [Chess Knight Problem | Find the shortest path from source to destination](https://www.techiedelight.com/chess-knight-problem-find-shortest-path-source-destination/ "Chess Knight Problem | Find the shortest path from source to destination")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.76/5. Vote count: 184

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Breadth-first search](https://www.techiedelight.com/Tags/BFS/), [FIFO](https://www.techiedelight.com/Tags/FIFO/), [Hard](https://www.techiedelight.com/Tags/hard/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
