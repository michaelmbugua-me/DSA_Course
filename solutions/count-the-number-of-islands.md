# Count number of islands

> Source: https://www.techiedelight.com/count-the-number-of-islands/

Given a binary matrix where 0 represents water and 1 represents land, and connected ones form an island, count the total islands.

For example, consider the following image:

The above image highlights water in blue and land in gray in a `10 × 10` matrix. There are a total of **five islands** present in the above matrix. They are marked by the numbers `1–5` in the image below.

> 

The solution is inspired by finding the total number of [connected components in a graph](https://techiedelight.com/check-given-graph-strongly-connected-not/) problem. The idea is to start [Breadth–first search (BFS)](https://techiedelight.com/breadth-first-search/) from each unprocessed node and increment the island count. Each BFS traversal will mark all cells which make one island as processed. So, the problem reduces to finding the total number of BFS calls.

In each BFS traversal, start by creating an empty [queue](https://techiedelight.com/circular-queue-implementation-c/). Then enqueue the starting cell and mark it as processed. Next dequeue the front node, process all eight adjacent cells of the current cell, and enqueue each valid cell, which is land. Repeat this process till the queue is not empty.

We can find all the possible locations we can move to from the given location by using the array that stores the relative position of movement from any location. For example, if the current location is `(x, y)`, we can move to `(x + row[k], y + col[k])` for `0 <= k <= 7` using the following arrays:

int row[] = { -1, -1, -1, 0, 0, 1, 1, 1 } int col[] = { -1, 0, 1, -1, 1, -1, 0, 1 }

So, from position `(x, y)`, we can move to:

(x – 1, y – 1) (x – 1, y) (x – 1, y + 1) (x, y – 1) (x, y + 1) (x + 1, y – 1) (x + 1, y) (x + 1, y + 1)

This can be implemented as follows in TypeScript:

```ts
// Below lists detail all eight possible movements from a cell
// (top, right, bottom, left, and four diagonal moves)
const row = [-1, -1, -1, 0, 1, 0, 1, 1];
const col = [-1, 1, 0, -1, -1, 1, 0, 1];

// Function to check if it is safe to go to position (x, y)
// from the current position. The function returns false if (x, y)
// is not valid matrix coordinates or (x, y) represents water or
// position (x, y) is already processed.
function isSafe(mat: number[][], x: number, y: number, processed: boolean[][]): boolean {
    return (x >= 0 && x < processed.length) && (y >= 0 && y < processed[0].length) &&
        mat[x][y] === 1 && !processed[x][y];
}

function BFS(mat: number[][], processed: boolean[][], i: number, j: number): void {
    // create an empty queue and enqueue source node
    const q: number[][] = [];
    q.push([i, j]);

    // mark source node as processed
    processed[i][j] = true;

    // loop till queue is empty
    while (q.length > 0) {
        // dequeue front node and process it
        const [x, y] = q.shift()!;

        // check for all eight possible movements from the current cell
        // and enqueue each valid movement
        for (let k = 0; k < row.length; k++) {
            // skip if the location is invalid, or already processed, or has water
            if (isSafe(mat, x + row[k], y + col[k], processed)) {
                // skip if the location is invalid, or it is already
                // processed, or consists of water
                processed[x + row[k]][y + col[k]] = true;
                q.push([x + row[k], y + col[k]]);
            }
        }
    }
}

function countIslands(mat: number[][]): number {
    // base case
    if (!mat || !mat.length) {
        return 0;
    }

    // `M × N` matrix
    const [M, N] = [mat.length, mat[0].length];

    // stores if a cell is processed or not
    const processed: boolean[][] = Array.from({ length: M }, () => new Array(N).fill(false));

    let island = 0;
    for (let i = 0; i < M; i++) {
        for (let j = 0; j < N; j++) {
            // start BFS from each unprocessed node and increment island count
            if (mat[i][j] === 1 && !processed[i][j]) {
                BFS(mat, processed, i, j);
                island = island + 1;
            }
        }
    }

    return island;
}

const mat = [
    [1, 0, 1, 0, 0, 0, 1, 1, 1, 1],
    [0, 0, 1, 0, 1, 0, 1, 0, 0, 0],
    [1, 1, 1, 1, 0, 0, 1, 0, 0, 0],
    [1, 0, 0, 1, 0, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 0, 0, 0, 1, 1, 1],
    [0, 1, 0, 1, 0, 0, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 1, 1, 1, 0, 0],
    [0, 0, 0, 1, 0, 0, 1, 1, 1, 0],
    [1, 0, 1, 0, 1, 0, 0, 1, 0, 0],
    [1, 1, 1, 1, 0, 0, 0, 1, 1, 1]
];

console.log('The total number of islands is', countIslands(mat));
```

**Output:** The total number of islands is 5

The time complexity of the proposed solution is O(M × N) and requires O(M × N) extra space, where `M` and `N` are dimensions of the matrix.

**Exercise:** Solve this problem using [Depth–first search](https://techiedelight.com/depth-first-search/) algorithm.

Also See:

> [Find the shortest distance of every cell from a landmine inside a maze](https://www.techiedelight.com/find-shortest-distance-every-cell-landmine-maze/ "Find the shortest distance of every cell from a landmine inside a maze")

> [Find the shortest safe route in a field with sensors present](https://www.techiedelight.com/find-shortest-safe-route-field-sensors-present/ "Find the shortest safe route in a field with sensors present")

> [Shortest path in a maze – Lee Algorithm](https://www.techiedelight.com/lee-algorithm-shortest-path-in-a-maze/ "Shortest path in a maze – Lee Algorithm")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.69/5. Vote count: 180

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Breadth-first search](https://www.techiedelight.com/Tags/BFS/), [FIFO](https://www.techiedelight.com/Tags/FIFO/), [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
