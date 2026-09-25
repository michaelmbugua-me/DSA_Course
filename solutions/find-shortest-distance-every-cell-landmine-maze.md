# Find the shortest distance of every cell from a landmine inside a maze

> Source: https://www.techiedelight.com/find-shortest-distance-every-cell-landmine-maze/

Given a [maze](https://techiedelight.com/maze-problems-in-data-structures/) in the form of a rectangular matrix, filled with either `O`, `X`, or `M`, where `O` represents an open cell, `X` represents a blocked cell, and `M` represents landmines in the maze, find the shortest distance of every open cell in the maze from its nearest mine.

We are only allowed to travel either of the four directions, and diagonal moves are not allowed. We can assume cells with the mine have distance `0`. Also, blocked and unreachable cells have distance `-1`.

For example,

**Input:** 6 × 5 matrix filled with O (Open cell), X (Blocked Cell), and M (Landmine). O M O O X O X X O M O O O O O O X X X O O O M O O O X X M O **Output:** 1 0 1 2 -1 2 -1 -1 1 0 3 4 3 2 1 3 -1 -1 -1 2 2 1 0 1 2 3 -1 -1 0 1

> 

The idea is to perform a [BFS](https://techiedelight.com/breadth-first-search/) to solve this problem. Start by creating an empty [queue](https://techiedelight.com/circular-queue-implementation-c/) and enqueue all cells with the mines. Then loop through the queue and consider each of four adjacent cells of the front cell. Enqueue the adjacent cell (with updated distance) if it represents an open space, and its distance from the mine is yet to be calculated. Repeat the procedure till the queue is empty.

Following is the TypeScript implementation of the idea:

```ts
// check if specified row and column are valid matrix index
function isValid(i: number, j: number, M: number, N: number): boolean {
    return (i >= 0 && i < M) && (j >= 0 && j < N);
}

// check if the current cell is an open area, and its
// distance from the mine is not yet calculated
function isSafe(i: number, j: number, mat: string[][], result: number[][]): boolean {
    return mat[i][j] === 'O' && result[i][j] === -1;
}

// Replace all O's in a matrix with their shortest distance
// from the nearest mine
function updateShortestDistance(mat: string[][]): number[][] {

    // base case
    if (!mat || mat.length === 0) {
        return [];
    }

    // `M × N` matrix
    const M = mat.length;
    const N = mat[0].length;

    const result: number[][] = Array.from({ length: M }, () => new Array(N).fill(0));

    // initialize an empty queue
    const q: [number, number, number][] = [];

    // find all mines location and add them to the queue
    for (let i = 0; i < M; i++) {
        for (let j = 0; j < N; j++) {
            // if the current cell represents a mine
            if (mat[i][j] === 'M') {
                q.push([i, j, 0]);

                // update mine distance as 0
                result[i][j] = 0;

            // otherwise, initialize the mine distance by -1
            } else {
                result[i][j] = -1;
            }
        }
    }

    // arrays to get indices of four adjacent cells of a given cell
    const row = [0, -1, 0, 1];
    const col = [-1, 0, 1, 0];

    // do for each in the queue
    while (q.length) {

        // dequeue front cell
        const [x, y, distance] = q.shift();

        // update the four adjacent cells of the front node in the queue
        for (let i = 0; i < row.length; i++) {
            // enqueue adjacent cell if it is valid, unvisited,
            // and has a path through it
            if (isValid(x + row[i], y + col[i], M, N) &&
                    isSafe(x + row[i], y + col[i], mat, result)) {
                result[x + row[i]][y + col[i]] = distance + 1;
                q.push([x + row[i], y + col[i], distance + 1]);
            }
        }
    }

    return result;
}

const mat = [
    ['O', 'M', 'O', 'O', 'X'],
    ['O', 'X', 'X', 'O', 'M'],
    ['O', 'O', 'O', 'O', 'O'],
    ['O', 'X', 'X', 'X', 'O'],
    ['O', 'O', 'M', 'O', 'O'],
    ['O', 'X', 'X', 'M', 'O']
];

const result = updateShortestDistance(mat);

// print results
for (const r of result) {
    console.log(r.join(' '));
}
```

**Output:** 1 0 1 2 -1 2 -1 -1 1 0 3 4 3 2 1 3 -1 -1 -1 2 2 1 0 1 2 3 -1 -1 0 1

The time complexity of the proposed solution is O(M × N) and requires O(M × N) extra space, where `M` and `N` are dimensions of the matrix.

**Author:** Aditya Goel

Also See:

> [Shortest path in a maze – Lee Algorithm](https://www.techiedelight.com/lee-algorithm-shortest-path-in-a-maze/ "Shortest path in a maze – Lee Algorithm")

> [Find the shortest safe route in a field with sensors present](https://www.techiedelight.com/find-shortest-safe-route-field-sensors-present/ "Find the shortest safe route in a field with sensors present")

> [Find minimum passes required to convert all negative values in a matrix](https://www.techiedelight.com/find-minimum-passes-required-convert-negative-values-matrix/ "Find minimum passes required to convert all negative values in a matrix")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.84/5. Vote count: 165

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Breadth-first search](https://www.techiedelight.com/Tags/BFS/), [FIFO](https://www.techiedelight.com/Tags/FIFO/), [Hard](https://www.techiedelight.com/Tags/hard/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
