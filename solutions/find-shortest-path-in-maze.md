# Find the shortest path in a maze

> Source: https://www.techiedelight.com/find-shortest-path-in-maze/

Given a [maze](https://techiedelight.com/maze-problems-in-data-structures/) in the form of a binary rectangular matrix, find the shortest path’s length in the maze from a given source to a given destination. The path can only be constructed out of cells having value 1, and at any moment, we can only move one step in one of the four directions.

The valid moves are:

**Go Top:** (x, y) ——> (x – 1, y) **Go Left:** (x, y) ——> (x, y – 1) **Go Down:** (x, y) ——> (x + 1, y) **Go Right:** (x, y) ——> (x, y + 1)

For example, consider the following binary matrix. If source = `(0, 0)` and destination = `(7, 5)`, the shortest path from source to destination has length 12.

[ 1 1 1 1 1 0 0 1 1 1 ] [ 0 1 1 1 1 1 0 1 0 1 ] [ 0 0 1 0 1 1 1 0 0 1 ] [ 1 0 1 1 1 0 1 1 0 1 ] [ 0 0 0 1 0 0 0 1 0 1 ] [ 1 0 1 1 1 0 0 1 1 0 ] [ 0 0 0 0 1 0 0 1 0 1 ] [ 0 1 1 1 1 1 1 1 0 0 ] [ 1 1 1 1 1 0 0 1 1 1 ] [ 0 0 1 0 0 1 1 0 0 1 ]

> 

To find the maze’s shortest path, search for all possible paths in the maze from the starting position to the goal position until all possibilities are exhausted. We can easily achieve this with the help of [backtracking](https://techiedelight.com/backtracking-interview-questions/). The idea is to start from the given source cell in the matrix and explore all four paths possible and recursively check if they will lead to the destination or not. Then update the minimum path length whenever the destination cell is reached. If a path doesn’t reach the destination or explored all possible routes from the current cell, backtrack. To make sure that the path is simple and doesn’t contain any cycles, keep track of cells involved in the current path in a matrix, and before exploring any cell, ignore the cell if it is already covered in the current path.

Following is the C++, Java, and Python implementation of the idea:

```cpp
#include <iostream>
#include <vector>
#include <climits>
#include <cstring>
using namespace std;

// Check if it is possible to go to (x, y) from the current position. The
// function returns false if the cell has value 0 or already visited
bool isSafe(vector<vector<int>> &mat, vector<vector<bool>> &visited, int x, int y)
{
    return (x >= 0 && x < mat.size() && y >= 0 && y < mat[0].size()) &&
            mat[x][y] == 1 && !visited[x][y];
}

// Find the shortest possible route in a matrix `mat` from source cell (i, j)
// to destination cell (x, y).

// `min_dist` is passed by reference and stores the length of the longest path
// from source to a destination found so far, and `dist` maintains the length
// of the path from a source cell to a current cell (i, j).

void findShortestPath(vector<vector<int>> &mat, vector<vector<bool>> &visited,
                int i, int j, int x, int y, int &min_dist, int dist)
{
    // if the destination is found, update `min_dist`
    if (i == x && j == y)
    {
        min_dist = min(dist, min_dist);
        return;
    }

    // set (i, j) cell as visited
    visited[i][j] = true;

    // go to the bottom cell
    if (isSafe(mat, visited, i + 1, j)) {
        findShortestPath(mat, visited, i + 1, j, x, y, min_dist, dist + 1);
    }

    // go to the right cell
    if (isSafe(mat, visited, i, j + 1)) {
        findShortestPath(mat, visited, i, j + 1, x, y, min_dist, dist + 1);
    }

    // go to the top cell
    if (isSafe(mat, visited, i - 1, j)) {
        findShortestPath(mat, visited, i - 1, j, x, y, min_dist, dist + 1);
    }

    // go to the left cell
    if (isSafe(mat, visited, i, j - 1)) {
        findShortestPath(mat, visited, i, j - 1, x, y, min_dist, dist + 1);
    }

    // backtrack: remove (i, j) from the visited matrix
    visited[i][j] = false;
}

// Wrapper over findShortestPath() function
int findShortestPathLength(vector<vector<int>> &mat, pair<int, int> &src,
                    pair<int, int> &dest)
{
    // base case: invalid input
    if (mat.size() == 0 || mat[src.first][src.second] == 0 ||
            mat[dest.first][dest.second] == 0) {
        return -1;
    }

    // `M × N` matrix
    int M = mat.size();
    int N = mat[0].size();

    // construct an `M × N` matrix to keep track of visited cells
    vector<vector<bool>> visited;
    visited.resize(M, vector<bool>(N));

    int min_dist = INT_MAX;
    findShortestPath(mat, visited, src.first, src.second, dest.first, dest.second,
            min_dist, 0);

    if (min_dist != INT_MAX) {
        return min_dist;
    }

    return -1;
}

int main()
{
    vector<vector<int>> mat =
    {
        { 1, 1, 1, 1, 1, 0, 0, 1, 1, 1 },
        { 0, 1, 1, 1, 1, 1, 0, 1, 0, 1 },
        { 0, 0, 1, 0, 1, 1, 1, 0, 0, 1 },
        { 1, 0, 1, 1, 1, 0, 1, 1, 0, 1 },
        { 0, 0, 0, 1, 0, 0, 0, 1, 0, 1 },
        { 1, 0, 1, 1, 1, 0, 0, 1, 1, 0 },
        { 0, 0, 0, 0, 1, 0, 0, 1, 0, 1 },
        { 0, 1, 1, 1, 1, 1, 1, 1, 0, 0 },
        { 1, 1, 1, 1, 1, 0, 0, 1, 1, 1 },
        { 0, 0, 1, 0, 0, 1, 1, 0, 0, 1 },
    };

    pair<int, int> src = make_pair(0, 0);
    pair<int, int> dest = make_pair(7, 5);

    int min_dist = findShortestPathLength(mat, src, dest);
    if (min_dist != -1)
    {
        cout << "The shortest path from source to destination "
                "has length " << min_dist;
    }
    else {
        cout << "Destination cannot be reached from a given source";
    }

    return 0;
}
```

**Output:** The shortest path from source to destination has length 12

##

```java
class Main
{
    // Check if it is possible to go to (x, y) from the current position. The
    // function returns false if the cell is invalid, has value 0, or already visited
    private static boolean isSafe(int[][] mat, boolean[][] visited, int x, int y) {
        return (x >= 0 && x < mat.length && y >= 0 && y < mat[0].length) &&
                mat[x][y] == 1 && !visited[x][y];
    }

    // Find the shortest possible route in a matrix `mat` from source cell (i, j)
    // to destination cell (x, y).
    // `min_dist` stores the length of the longest path from source to a destination
    // found so far, and `dist` maintains the length of the path from a source cell
    // to the current cell (i, j).
    public static int findShortestPath(int[][] mat, boolean[][] visited,
                                int i, int j, int x, int y, int min_dist, int dist)
    {
        // if the destination is found, update `min_dist`
        if (i == x && j == y) {
            return Integer.min(dist, min_dist);
        }

        // set (i, j) cell as visited
        visited[i][j] = true;

        // go to the bottom cell
        if (isSafe(mat, visited, i + 1, j))
        {
            min_dist = findShortestPath(mat, visited, i + 1, j, x, y,
                    min_dist, dist + 1);
        }

        // go to the right cell
        if (isSafe(mat, visited, i, j + 1))
        {
            min_dist = findShortestPath(mat, visited, i, j + 1, x, y,
                    min_dist, dist + 1);
        }

        // go to the top cell
        if (isSafe(mat, visited, i - 1, j))
        {
            min_dist = findShortestPath(mat, visited, i - 1, j, x, y,
                    min_dist, dist + 1);
        }

        // go to the left cell
        if (isSafe(mat, visited, i, j - 1))
        {
            min_dist = findShortestPath(mat, visited, i, j - 1, x, y,
                    min_dist, dist + 1);
        }

        // backtrack: remove (i, j) from the visited matrix
        visited[i][j] = false;

        return min_dist;
    }

    // Wrapper over findShortestPath() function
    public static int findShortestPathLength(int[][] mat, int i, int j, int x, int y)
    {
        // base case: invalid input
        if (mat == null || mat.length == 0 || mat[i][j] == 0 || mat[x][y] == 0) {
            return -1;
        }

        // `M × N` matrix
        int M = mat.length;
        int N = mat[0].length;

        int min_dist;

        // construct an `M × N` matrix to keep track of visited cells
        boolean[][] visited = new boolean[M][N];

        min_dist = findShortestPath(mat, visited, i, j, x, y, Integer.MAX_VALUE, 0);
        if (min_dist != Integer.MAX_VALUE) {
            return min_dist;
        }
        return -1;
    }

    public static void main(String[] args)
    {
        int mat[][] =
        {
            { 1, 1, 1, 1, 1, 0, 0, 1, 1, 1 },
            { 0, 1, 1, 1, 1, 1, 0, 1, 0, 1 },
            { 0, 0, 1, 0, 1, 1, 1, 0, 0, 1 },
            { 1, 0, 1, 1, 1, 0, 1, 1, 0, 1 },
            { 0, 0, 0, 1, 0, 0, 0, 1, 0, 1 },
            { 1, 0, 1, 1, 1, 0, 0, 1, 1, 0 },
            { 0, 0, 0, 0, 1, 0, 0, 1, 0, 1 },
            { 0, 1, 1, 1, 1, 1, 1, 1, 0, 0 },
            { 1, 1, 1, 1, 1, 0, 0, 1, 1, 1 },
            { 0, 0, 1, 0, 0, 1, 1, 0, 0, 1 },
        };

        int min_dist = findShortestPathLength(mat, 0, 0, 7, 5);

        if (min_dist != -1) {
            System.out.println("The shortest path from source to destination " +
                    "has length " + min_dist);
        } else {
            System.out.println("Destination cannot be reached from source");
        }
    }
}
```

##

```python3
import sys

# Check if it is possible to go to (x, y) from the current position. The
# function returns false if the cell is invalid, has value 0 or already visited
def isSafe(mat, visited, x, y):
    return 0 <= x < len(mat) and 0 <= y < len(mat[0]) and \
           not (mat[x][y] == 0 or visited[x][y])

# Find the shortest possible route in a matrix `mat` from source cell (i, j)
# to destination cell `dest`.

# `min_dist` stores the length of the longest path from source to a destination
# found so far, and `dist` maintains the length of the path from a source cell to
# the current cell (i, j).

def findShortestPath(mat, visited, i, j, dest, min_dist=sys.maxsize, dist=0):

    # if the destination is found, update `min_dist`
    if (i, j) == dest:
        return min(dist, min_dist)

    # set (i, j) cell as visited
    visited[i][j] = 1

    # go to the bottom cell
    if isSafe(mat, visited, i + 1, j):
        min_dist = findShortestPath(mat, visited, i + 1, j, dest, min_dist, dist + 1)

    # go to the right cell
    if isSafe(mat, visited, i, j + 1):
        min_dist = findShortestPath(mat, visited, i, j + 1, dest, min_dist, dist + 1)

    # go to the top cell
    if isSafe(mat, visited, i - 1, j):
        min_dist = findShortestPath(mat, visited, i - 1, j, dest, min_dist, dist + 1)

    # go to the left cell
    if isSafe(mat, visited, i, j - 1):
        min_dist = findShortestPath(mat, visited, i, j - 1, dest, min_dist, dist + 1)

    # backtrack: remove (i, j) from the visited matrix
    visited[i][j] = 0

    return min_dist

# Wrapper over findShortestPath() function
def findShortestPathLength(mat, src, dest):

    # get source cell (i, j)
    i, j = src

    # get destination cell (x, y)
    x, y = dest

    # base case
    if not mat or len(mat) == 0 or mat[i][j] == 0 or mat[x][y] == 0:
        return -1

    # `M × N` matrix
    (M, N) = (len(mat), len(mat[0]))

    # construct an `M × N` matrix to keep track of visited cells
    visited = [[False for _ in range(N)] for _ in range(M)]

    min_dist = findShortestPath(mat, visited, i, j, dest)

    if min_dist != sys.maxsize:
        return min_dist
    else:
        return -1

if __name__ == '__main__':

    mat = [
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
    ]

    src = (0, 0)
    dest = (7, 5)

    min_dist = findShortestPathLength(mat, src, dest)

    if min_dist != -1:
        print("The shortest path from source to destination has length", min_dist)
    else:
        print("Destination cannot be reached from source")
```

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
