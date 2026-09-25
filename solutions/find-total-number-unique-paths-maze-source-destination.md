# Find the total number of unique paths in a maze from source to destination

> Source: https://www.techiedelight.com/find-total-number-unique-paths-maze-source-destination/

Find the total number of unique paths that the robot can take in a given [maze](https://techiedelight.com/maze-problems-in-data-structures/) to reach a given destination from a given source.

Positions in the maze will either be open or blocked with an obstacle. The robot can only move to positions without obstacles, i.e., the solution should find paths that contain only open cells. Retracing the one or more cells back and forth is not considered a new path. The set of all cells covered in a single path should be unique from other paths. At any given moment, the robot can only move one step in either of the four directions. The valid moves are:

**Go North:** (x, y) ——> (x – 1, y) **Go West:** (x, y) ——> (x, y – 1) **Go South:** (x, y) ——> (x + 1, y) **Go East:** (x, y) ——> (x, y + 1)

For example, consider the following maze in the form of a binary matrix where 0 represents a blocked cell and 1 represents an open cell:

[ 1 1 1 1 ] [ 1 1 0 1 ] [ 0 1 0 1 ] [ 1 1 1 1 ]

We have to find the total number of unique paths from source to destination. The above maze contains 4 unique paths (marked in blue color).

[ 1 1 1 1 ] [ 1 1 1 1 ] [ 1 1 0 1 ] [ 1 1 0 1 ] [ 0 1 0 1 ] [ 0 1 0 1 ] [ 1 1 1 1 ] [ 1 1 1 1 ] [ 1 1 1 1 ] [ 1 1 1 1 ] [ 1 1 0 1 ] [ 1 1 0 1 ] [ 0 1 0 1 ] [ 0 1 0 1 ] [ 1 1 1 1 ] [ 1 1 1 1 ]

> 

The robot should search for a path from the starting position to the goal position until it finds one or until it exhausts all possibilities. We can easily achieve this with the help of [Backtracking](https://techiedelight.com/backtracking-interview-questions/). We start from the given source cell in the matrix and explore all four paths possible and recursively check if they will lead to the destination or not. We update the unique path count whenever the destination cell is reached. If a path doesn’t reach the destination or explored all possible routes from the current cell, we backtrack. To make sure that the path is simple and doesn’t contain any cycles, keep track of cells involved in the current path in a matrix, and before exploring any cell, ignore the cell if it is already covered in the current path.

The algorithm can be implemented as follows in TypeScript:

```ts
// Check if cell (x, y) is valid or not
const isValidCell = (x: number, y: number, N: number): boolean =>
    !(x < 0 || y < 0 || x >= N || y >= N);

const countPaths = (maze: number[][], i: number, j: number, dest: [number, number], visited: boolean[][]): number => {
    // `N × N` matrix
    const N = maze.length;

    // if destination (x, y) is found, return 1
    if (i === dest[0] && j === dest[1]) {
        return 1;
    }

    // stores number of unique paths from source to destination
    let count = 0;

    // mark the current cell as visited
    visited[i][j] = true;

    // if the current cell is a valid and open cell
    if (isValidCell(i, j, N) && maze[i][j] === 1) {
        // go down (i, j) ——> (i + 1, j)
        if (i + 1 < N && !visited[i + 1][j]) {
            count += countPaths(maze, i + 1, j, dest, visited);
        }

        // go up (i, j) ——> (i - 1, j)
        if (i - 1 >= 0 && !visited[i - 1][j]) {
            count += countPaths(maze, i - 1, j, dest, visited);
        }

        // go right (i, j) ——> (i, j + 1)
        if (j + 1 < N && !visited[i][j + 1]) {
            count += countPaths(maze, i, j + 1, dest, visited);
        }

        // go left (i, j) ——> (i, j - 1)
        if (j - 1 >= 0 && !visited[i][j - 1]) {
            count += countPaths(maze, i, j - 1, dest, visited);
        }
    }

    // backtrack from the current cell and remove it from the current path
    visited[i][j] = false;

    return count;
};

const findCount = (maze: number[][], src: [number, number], dest: [number, number]): number => {
    // get source cell (i, j)
    const [i, j] = src;

    // get destination cell (x, y)
    const [x, y] = dest;

    // base case: invalid input
    if (!maze || maze.length === 0 || maze[i][j] === 0 || maze[x][y] === 0) {
        return 0;
    }

    // `N × N` matrix
    const N = maze.length;

    // 2D matrix to keep track of cells involved in the current path
    const visited = Array.from({ length: N }, () => new Array<boolean>(N).fill(false));

    // start from source cell (i, j)
    return countPaths(maze, i, j, dest, visited);
};

const maze = [
    [1, 1, 1, 1],
    [1, 1, 0, 1],
    [0, 1, 0, 1],
    [1, 1, 1, 1]
];

// source cell
const src: [number, number] = [0, 0];

// destination cell
const dest: [number, number] = [3, 3];

console.log('The total number of unique paths are', findCount(maze, src, dest));
```

**Output:** The total number of unique paths are 4

The time complexity of the above solution is exponential and requires additional space for the recursion (call stack).

**Exercise:** Extend the solution to print the paths as well

Also See:

> [Find the shortest path in a maze](https://www.techiedelight.com/find-shortest-path-in-maze/ "Find the shortest path in a maze")

> [Find the longest possible route in a matrix](https://www.techiedelight.com/find-longest-possible-route-matrix/ "Find the longest possible route in a matrix")

> [Shortest path in a maze – Lee Algorithm](https://www.techiedelight.com/lee-algorithm-shortest-path-in-a-maze/ "Shortest path in a maze – Lee Algorithm")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.89/5. Vote count: 167

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
