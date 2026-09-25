# Shortest path in a maze – Lee Algorithm

> Source: https://www.techiedelight.com/lee-algorithm-shortest-path-in-a-maze/

Given a [maze](https://techiedelight.com/maze-problems-in-data-structures/) in the form of the binary rectangular matrix, find the shortest path’s length in a maze from a given source to a given destination.

The path can only be constructed out of cells having value 1, and at any given moment, we can only move one step in one of the four directions. The valid moves are:

**Go Top:** (x, y) ——> (x – 1, y) **Go Left:** (x, y) ——> (x, y – 1) **Go Down:** (x, y) ——> (x + 1, y) **Go Right:** (x, y) ——> (x, y + 1)

For example, consider the following binary matrix. If `source = (0, 0)` and `destination = (7, 5)`, the shortest path from source to destination has length 12.

[ **1** **1** **1** 1 1 0 0 1 1 1 ] [ 0 1 **1** 1 1 1 0 1 0 1 ] [ 0 0 **1** 0 1 1 1 0 0 1 ] [ 1 0 **1** **1** 1 0 1 1 0 1 ] [ 0 0 0 **1** 0 0 0 1 0 1 ] [ 1 0 1 **1** **1** 0 0 1 1 0 ] [ 0 0 0 0 **1** 0 0 1 0 1 ] [ 0 1 1 1 **1** **1** 1 1 0 0 ] [ 1 1 1 1 1 0 0 1 1 1 ] [ 0 0 1 0 0 1 1 0 0 1 ]

> 

We have already discussed a [backtracking](https://techiedelight.com/backtracking-interview-questions/) solution in the [previous post](https://techiedelight.com/find-shortest-path-in-maze/). The time complexity of the backtracking solution will be higher since all paths need to be traveled. However, since it is the shortest path problem, [Breadth–first search (BFS)](https://techiedelight.com/breadth-first-search/) would be an ideal choice.

The **Lee algorithm** is one possible solution for maze routing problems based on Breadth–first search. It always gives an optimal solution, if one exists, but is slow and requires considerable memory. Following is the complete algorithm:

  1. Create an empty [queue](https://techiedelight.com/circular-queue-implementation-c/) and enqueue the source cell having a distance 0 from the source (itself) and mark it as visited.
  2. Loop till queue is empty.
     * Dequeue the front node.
     * If the popped node is the destination node, then return its distance.
     * Otherwise, for each of four adjacent cells of the current cell, enqueue each valid cell with `+1` distance and mark them as visited.
  3. If all the queue nodes are processed, and the destination is not reached, then return false.

Note that in BFS, all cells having the shortest path as 1 are visited first, followed by their adjacent cells having the shortest path as `1 + 1 = 2` and so on… So if we reach any node in BFS, its shortest path is one more than the shortest path of the parent. So, the destination cell’s first occurrence gives us the result, and we can stop our search there. It is impossible that the shortest path exists from some other cell for which we haven’t reached the given node yet. If any such path were possible, we would have already explored it.

Following is a TypeScript program that demonstrates it:

```ts
// Below lists detail all four possible movements from a cell
const row = [-1, 0, 0, 1];
const col = [0, -1, 1, 0];

// Function to check if it is possible to go to position (row, col)
// from the current position. The function returns false if row, col
// is not a valid position or has a value 0 or already visited.
function isValid(mat: number[][], visited: boolean[][], row: number, col: number): boolean {
  return row >= 0 && row < mat.length && col >= 0 && col < mat[0].length &&
    mat[row][col] === 1 && !visited[row][col];
}

// Find the shortest possible route in a matrix `mat` from source `src` to
// destination `dest`
function findShortestPathLength(
  mat: number[][],
  src: [number, number],
  dest: [number, number]
): number {
  // get source cell (i, j)
  const [i0, j0] = src;

  // get destination cell (x, y)
  const [x, y] = dest;

  // base case: invalid input
  if (!mat || mat.length === 0 || mat[i0][j0] === 0 || mat[x][y] === 0) {
    return -1;
  }

  // `M × N` matrix
  const M = mat.length, N = mat[0].length;

  // construct a matrix to keep track of visited cells
  const visited: boolean[][] = Array.from({ length: M }, () => Array(N).fill(false));

  // create an empty queue
  const q: number[][] = [];

  // mark the source cell as visited and enqueue the source node
  visited[i0][j0] = true;

  // (i, j, dist) represents matrix cell coordinates, and their
  // minimum distance from the source
  q.push([i0, j0, 0]);

  // stores length of the longest path from source to destination
  let minDist = Number.MAX_VALUE;

  // loop till queue is empty
  while (q.length > 0) {
    // dequeue front node and process it
    const [i, j, dist] = q.shift()!;

    // (i, j) represents a current cell, and `dist` stores its
    // minimum distance from the source

    // if the destination is found, update `min_dist` and stop
    if (i === x && j === y) {
      minDist = dist;
      break;
    }

    // check for all four possible movements from the current cell
    // and enqueue each valid movement
    for (let k = 0; k < 4; k++) {
      // check if it is possible to go to position
      // (i + row[k], j + col[k]) from current position
      if (isValid(mat, visited, i + row[k], j + col[k])) {
        // mark next cell as visited and enqueue it
        visited[i + row[k]][j + col[k]] = true;
        q.push([i + row[k], j + col[k], dist + 1]);
      }
    }
  }

  return minDist !== Number.MAX_VALUE ? minDist : -1;
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

The time complexity of the proposed solution is O(M × N) and requires O(M × N) extra space, where `M` and `N` are dimensions of the matrix.

**Exercise:** Extend the solution to print the shortest path from source to destination.

Also See:

> [Find the shortest path in a maze](https://www.techiedelight.com/find-shortest-path-in-maze/ "Find the shortest path in a maze")

> [Chess Knight Problem | Find the shortest path from source to destination](https://www.techiedelight.com/chess-knight-problem-find-shortest-path-source-destination/ "Chess Knight Problem | Find the shortest path from source to destination")

> [Find the shortest path from source to destination in a matrix that satisfies given constraints](https://www.techiedelight.com/find-shortest-path-source-destination-matrix-satisfies-given-constraints/ "Find the shortest path from source to destination in a matrix that satisfies given constraints")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.68/5. Vote count: 213

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Algorithm](https://www.techiedelight.com/Tags/Algorithm/), [Breadth-first search](https://www.techiedelight.com/Tags/BFS/), [FIFO](https://www.techiedelight.com/Tags/FIFO/), [Medium](https://www.techiedelight.com/Tags/medium/), [Must Know](https://www.techiedelight.com/Tags/Must-Know/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
