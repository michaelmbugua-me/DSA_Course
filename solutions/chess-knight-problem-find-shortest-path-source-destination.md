# Chess Knight Problem | Find the shortest path from source to destination

> Source: https://www.techiedelight.com/chess-knight-problem-find-shortest-path-source-destination/

Given a chessboard, find the shortest distance (minimum number of steps) taken by a knight to reach a given destination from a given source.

For example,

**Input:** N = 8 (8 × 8 board) Source = (7, 0) Destination = (0, 7) **Output:** Minimum number of steps required is 6

The knight’s movement is illustrated in the following figure:

> 

The idea is to use [Breadth–first search (BFS)](https://techiedelight.com/breadth-first-search/) as it is the shortest path problem. Following is the complete algorithm:

  1. Create an empty queue and enqueue the source cell having a distance of 0 from the source (itself).
  2. Loop till queue is empty:
     1. Dequeue next unvisited node.
     2. If the popped node is the destination node, return its distance.
     3. Otherwise, we mark the current node as visited. For each of eight possible movements for a knight, enqueue each valid movement with `+1` distance (minimum distance of a given node from the source is one more than the minimum distance of parent from source).

A knight can move in eight possible directions from a given cell, as illustrated in the following figure:

We can find all the possible locations the knight can move to from the given location by using the array that stores the relative position of knight movement from any location. For example, if the current location is `(x, y)`, we can move to `(x + row[k], y + col[k])` for `0 <= k <= 7` using the following array:

row[] = [ 2, 2, -2, -2, 1, 1, -1, -1 ] col[] = [ -1, 1, 1, -1, 2, -2, 2, -2 ]

So, from position `(x, y)` knight’s can move to:

(x + 2, y – 1) (x + 2, y + 1) (x – 2, y + 1) (x – 2, y – 1) (x + 1, y + 2) (x + 1, y – 2) (x – 1, y + 2) (x – 1, y – 2)

Note that in BFS, all cells having the shortest path as 1 are visited first, followed by their adjacent cells having the shortest path as 1 + 1 = 2 and so on… so if we reach any node in BFS, its shortest path = shortest path of parent + 1. So, the destination cell’s first occurrence gives us the result, and we can stop our search there.**The shortest path cannot exist from some other cell for which we haven’t reached the given node yet. If any such path were possible, we would have already explored it.**

The algorithm can be implemented as follows in TypeScript:

```ts
// A queue node used in BFS
class Node {
    // (x, y) represents chessboard coordinates
    // `dist` represents its minimum distance from the source
    constructor(public x: number, public y: number, public dist: number = 0) {}
}

// Below arrays detail all eight possible movements for a knight
const row = [2, 2, -2, -2, 1, 1, -1, -1];
const col = [-1, 1, 1, -1, 2, -2, 2, -2];

// Check if (x, y) is valid chessboard coordinates.
// Note that a knight cannot go out of the chessboard
const isValid = (x: number, y: number, N: number): boolean =>
    !(x < 0 || y < 0 || x >= N || y >= N);

// Find the minimum number of steps taken by the knight
// from the source to reach the destination using BFS
const findShortestDistance = (src: Node, dest: Node, N: number): number => {

    // set to check if the matrix cell is visited before or not
    const visited = new Set<string>();

    // create a queue and enqueue the first node
    const q: Node[] = [];
    q.push(src);

    // loop till queue is empty
    while (q.length > 0) {

        // dequeue front node and process it
        const node = q.shift()!;

        const x = node.x;
        const y = node.y;
        const dist = node.dist;

        // if the destination is reached, return distance
        if (x === dest.x && y === dest.y) {
            return dist;
        }

        // skip if the location is visited before
        if (!visited.has(`${x}|${y}|${dist}`)) {
            // mark the current node as visited
            visited.add(`${x}|${y}|${dist}`);

            // check for all eight possible movements for a knight
            // and enqueue each valid movement
            for (let i = 0; i < row.length; i++) {
                // get the knight's valid position from the current position on
                // the chessboard and enqueue it with +1 distance
                const x1 = x + row[i];
                const y1 = y + col[i];

                if (isValid(x1, y1, N)) {
                    q.push(new Node(x1, y1, dist + 1));
                }
            }
        }
    }

    // return infinity if the path is not possible
    return Number.MAX_SAFE_INTEGER;
};

// demo

const N = 8;                // N x N matrix
const src = new Node(0, 7); // source coordinates
const dest = new Node(7, 0);// destination coordinates

console.log('The minimum number of steps required is',
    findShortestDistance(src, dest, N));
```

The time complexity of the proposed solution is O(M × N) and requires O(M × N) extra space, where `M` and `N` are dimensions of the matrix.

**Exercise:** Extend the solution to print the paths as well.

Also See:

> [Find the shortest path from source to destination in a matrix that satisfies given constraints](https://www.techiedelight.com/find-shortest-path-source-destination-matrix-satisfies-given-constraints/ "Find the shortest path from source to destination in a matrix that satisfies given constraints")

> [Shortest path in a maze – Lee Algorithm](https://www.techiedelight.com/lee-algorithm-shortest-path-in-a-maze/ "Shortest path in a maze – Lee Algorithm")

> [Find the shortest safe route in a field with sensors present](https://www.techiedelight.com/find-shortest-safe-route-field-sensors-present/ "Find the shortest safe route in a field with sensors present")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.85/5. Vote count: 87

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Algorithm](https://www.techiedelight.com/Tags/Algorithm/), [Breadth-first search](https://www.techiedelight.com/Tags/BFS/), [FIFO](https://www.techiedelight.com/Tags/FIFO/), [Hard](https://www.techiedelight.com/Tags/hard/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
