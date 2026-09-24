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

Following is the C++, Java, and Python program that demonstrates it:

```cpp
#include <iostream>
#include <queue>
#include <vector>
#include <climits>
#include <cstring>
using namespace std;

// A Queue Node
struct Node
{
    // (x, y) represents matrix cell coordinates, and
    // `dist` represents their minimum distance from the source
    int x, y, dist;
};

// Below arrays detail all four possible movements from a cell
int row[] = { -1, 0, 0, 1 };
int col[] = { 0, -1, 1, 0 };

// Function to check if it is possible to go to position (row, col)
// from the current position. The function returns false if (row, col)
// is not a valid position or has a value 0 or already visited.
bool isValid(vector<vector<int>> const &mat, vector<vector<bool>> &visited,
        int row, int col) {
    return (row >= 0 && row < mat.size()) && (col >= 0 && col < mat[0].size())
        && mat[row][col] && !visited[row][col];
}

// Find the shortest possible route in a matrix `mat` from source
// cell (i, j) to destination cell (x, y)
int findShortestPathLength(vector<vector<int>> const &mat, pair<int, int> &src,
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

    // construct a `M × N` matrix to keep track of visited cells
    vector<vector<bool>> visited;
    visited.resize(M, vector<bool>(N));

    // create an empty queue
    queue<Node> q;

    // get source cell (i, j)
    int i = src.first;
    int j = src.second;

    // mark the source cell as visited and enqueue the source node
    visited[i][j] = true;
    q.push({i, j, 0});

    // stores length of the longest path from source to destination
    int min_dist = INT_MAX;

    // loop till queue is empty
    while (!q.empty())
    {
        // dequeue front node and process it
        Node node = q.front();
        q.pop();

        // (i, j) represents a current cell, and `dist` stores its
        // minimum distance from the source
        int i = node.x, j = node.y, dist = node.dist;

        // if the destination is found, update `min_dist` and stop
        if (i == dest.first && j == dest.second)
        {
            min_dist = dist;
            break;
        }

        // check for all four possible movements from the current cell
        // and enqueue each valid movement
        for (int k = 0; k < 4; k++)
        {
            // check if it is possible to go to position
            // (i + row[k], j + col[k]) from current position
            if (isValid(mat, visited, i + row[k], j + col[k]))
            {
                // mark next cell as visited and enqueue it
                visited[i + row[k]][j + col[k]] = true;
                q.push({ i + row[k], j + col[k], dist + 1 });
            }
        }
    }

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
import java.util.ArrayDeque;
import java.util.Queue;

// A Queue Node
class Node
{
    // (x, y) represents matrix cell coordinates, and
    // `dist` represents their minimum distance from the source
    int x, y, dist;

    Node(int x, int y, int dist)
    {
        this.x = x;
        this.y = y;
        this.dist = dist;
    }
}

class Main
{
    // Below arrays detail all four possible movements from a cell
    private static final int[] row = { -1, 0, 0, 1 };
    private static final int[] col = { 0, -1, 1, 0 };

    // Function to check if it is possible to go to position (row, col)
    // from the current position. The function returns false if (row, col)
    // is not a valid position or has a value 0 or already visited.
    private static boolean isValid(int[][] mat, boolean[][] visited, int row, int col)
    {
        return (row >= 0) && (row < mat.length) && (col >= 0) && (col < mat[0].length)
                && mat[row][col] == 1 && !visited[row][col];
    }

    // Find the shortest possible route in a matrix `mat` from source
    // cell (i, j) to destination cell (x, y)
    private static int findShortestPathLength(int[][] mat, int i, int j, int x, int y)
    {
        // base case: invalid input
        if (mat == null || mat.length == 0 || mat[i][j] == 0 || mat[x][y] == 0) {
            return -1;
        }

        // `M × N` matrix
        int M = mat.length;
        int N = mat[0].length;

        // construct a matrix to keep track of visited cells
        boolean[][] visited = new boolean[M][N];

        // create an empty queue
        Queue<Node> q = new ArrayDeque<>();

        // mark the source cell as visited and enqueue the source node
        visited[i][j] = true;
        q.add(new Node(i, j, 0));

        // stores length of the longest path from source to destination
        int min_dist = Integer.MAX_VALUE;

        // loop till queue is empty
        while (!q.isEmpty())
        {
            // dequeue front node and process it
            Node node = q.poll();

            // (i, j) represents a current cell, and `dist` stores its
            // minimum distance from the source
            i = node.x;
            j = node.y;
            int dist = node.dist;

            // if the destination is found, update `min_dist` and stop
            if (i == x && j == y)
            {
                min_dist = dist;
                break;
            }

            // check for all four possible movements from the current cell
            // and enqueue each valid movement
            for (int k = 0; k < 4; k++)
            {
                // check if it is possible to go to position
                // (i + row[k], j + col[k]) from current position
                if (isValid(mat, visited, i + row[k], j + col[k]))
                {
                    // mark next cell as visited and enqueue it
                    visited[i + row[k]][j + col[k]] = true;
                    q.add(new Node(i + row[k], j + col[k], dist + 1));
                }
            }
        }

        if (min_dist != Integer.MAX_VALUE) {
            return min_dist;
        }
        return -1;
    }

    public static void main(String[] args)
    {
        int[][] mat =
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
from collections import deque

# Below lists detail all four possible movements from a cell
row = [-1, 0, 0, 1]
col = [0, -1, 1, 0]

# Function to check if it is possible to go to position (row, col)
# from the current position. The function returns false if row, col
# is not a valid position or has a value 0 or already visited.
def isValid(mat, visited, row, col):
    return (row >= 0) and (row < len(mat)) and (col >= 0) and (col < len(mat[0])) \
           and mat[row][col] == 1 and not visited[row][col]

# Find the shortest possible route in a matrix `mat` from source `src` to
# destination `dest`
def findShortestPathLength(mat, src, dest):

    # get source cell (i, j)
    i, j = src

    # get destination cell (x, y)
    x, y = dest

    # base case: invalid input
    if not mat or len(mat) == 0 or mat[i][j] == 0 or mat[x][y] == 0:
        return -1

    # `M × N` matrix
    (M, N) = (len(mat), len(mat[0]))

    # construct a matrix to keep track of visited cells
    visited = [[False for x in range(N)] for y in range(M)]

    # create an empty queue
    q = deque()

    # mark the source cell as visited and enqueue the source node
    visited[i][j] = True

    # (i, j, dist) represents matrix cell coordinates, and their
    # minimum distance from the source
    q.append((i, j, 0))

    # stores length of the longest path from source to destination
    min_dist = sys.maxsize

    # loop till queue is empty
    while q:

        # dequeue front node and process it
        (i, j, dist) = q.popleft()

        # (i, j) represents a current cell, and `dist` stores its
        # minimum distance from the source

        # if the destination is found, update `min_dist` and stop
        if i == x and j == y:
            min_dist = dist
            break

        # check for all four possible movements from the current cell
        # and enqueue each valid movement
        for k in range(4):
            # check if it is possible to go to position
            # (i + row[k], j + col[k]) from current position
            if isValid(mat, visited, i + row[k], j + col[k]):
                # mark next cell as visited and enqueue it
                visited[i + row[k]][j + col[k]] = True
                q.append((i + row[k], j + col[k], dist + 1))

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
