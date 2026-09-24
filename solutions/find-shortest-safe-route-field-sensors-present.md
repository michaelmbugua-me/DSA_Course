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

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <climits>
#include <queue>
#include <cstring>
using namespace std;

// A queue node used in BFS
struct Node {
    // (x, y) represents a position inside the field
    // `dist` represents its minimum distance from the source
    int x, y, dist;
};

// Below arrays detail all four possible movements from a cell,
// i.e., (top, right, bottom, left)
int row[] = { -1, 0, 0, 1 };
int col[] = { 0, -1, 1, 0 };

// Function to check if it is safe to go to position (x, y)
// from the current position. The function returns false if (x, y)
// is unsafe or already visited.
bool isSafe(vector<vector<int>> const &field, vector<vector<bool>> const &visited,
                int x, int y) {
    return field[x][y] != 0 && !visited[x][y];
}

// Check if (x, y) is valid field coordinates.
// Note that we cannot go out of the field.
bool isValid(int x, int y, int M, int N) {
    return (x < M && y < N) && (x >= 0 && y >= 0);
}

// Find the minimum number of steps required to reach the last column
// from the first column using BFS
int BFS(vector<vector<int>> const &field)
{
    // `M × N` matrix
    int M = field.size();
    int N = field[0].size();

    // stores if a cell is visited or not
    vector<vector<bool>> visited;
    visited.resize(M, vector<bool>(N));

    // create an empty queue
    queue<Node> q;

    // process every cell of the first column
    for (int r = 0; r < M; r++)
    {
        // if the cell is safe, mark it as visited and
        // enqueue it by assigning it distance as 0
        if (field[r][0] == 1)
        {
            q.push({r, 0, 0});
            visited[r][0] = true;
        }
    }

    // loop till queue is empty
    while (!q.empty())
    {
        // dequeue front node and process it
        int i = q.front().x;
        int j = q.front().y;
        int dist = q.front().dist;
        q.pop();

        // if the destination is found, return minimum distance
        if (j == N - 1) {
            return dist;
        }

        // check for all four possible movements from the current cell
        // and enqueue each valid movement
        for (int k = 0; k < 4; k++)
        {
            // skip if the location is invalid or visited, or unsafe
            if (isValid(i + row[k], j + col[k], M, N) &&
                isSafe(field, visited, i + row[k], j + col[k]))
            {
                // mark it as visited and enqueue it with +1 distance
                visited[i + row[k]][j + col[k]] = true;
                q.push({i + row[k], j + col[k], dist + 1});
            }
        }
    }

    return INT_MAX;
}

// Find the shortest path from the first column to the last column in a given field
int findShortestDistance(vector<vector<int>> &mat)
{
    // base case
    if (mat.size() == 0) {
        return 0;
    }

    // `M × N` matrix
    int M = mat.size();
    int N = mat[0].size();

    // `r[]` and `c[]` detail all eight possible movements from a cell
    // (top, right, bottom, left, and four diagonal moves)
    int r[] = { -1, -1, -1, 0, 0, 1, 1, 1 };
    int c[] = { -1, 0, 1, -1, 1, -1, 0, 1 };

    // mark adjacent cells of sensors as unsafe
    for (int i = 0; i < M; i++)
    {
        for (int j = 0; j < N; j++)
        {
            for (int k = 0; k < 8; k++) {
                if (!mat[i][j] && isValid(i + r[k], j + c[k], M, N)
                        && mat[i + r[k]][j + c[k]]) {
                    mat[i + r[k]][j + c[k]] = INT_MAX;
                }
            }
        }
    }

    // update the mat
    for (int i = 0; i < M; i++)
    {
        for (int j = 0; j < N; j++)
        {
            if (mat[i][j] == INT_MAX) {
                mat[i][j] = 0;
            }
        }
    }

    // call BFS and return the shortest distance found by it
    return BFS(mat);
}

int main()
{
    vector<vector<int>> field =
    {
        { 0, 1, 1, 1, 0, 1, 1, 1, 1, 1 },
        { 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 },
        { 1, 1, 1, 1, 1, 1, 1, 1, 0, 1 },
        { 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 },
        { 1, 1, 1, 1, 1, 0, 1, 1, 1, 1 },
        { 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 },
        { 1, 0, 1, 1, 1, 1, 1, 1, 1, 1 },
        { 1, 1, 1, 1, 1, 1, 1, 1, 1, 0 },
        { 1, 1, 1, 1, 1, 0, 1, 1, 1, 1 },
        { 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 }
    };

    int dist = findShortestDistance(field);

    if (dist != INT_MAX) {
        cout << "The shortest safe path has a length of " << dist;
    }
    else {
        cout << "No route is safe to reach destination";
    }

    return 0;
}
```

**Output:** The shortest safe path has a length of 11

##

```java
import java.util.ArrayDeque;
import java.util.Queue;

// A queue node used in BFS
class Node
{
    // (x, y) represents a position inside the field
    // `dist` represents its minimum distance from the source
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
    // Below arrays detail all four possible movements from a cell,
    // i.e., (top, right, bottom, left)
    private static final int[] row = { -1, 0, 0, 1 };
    private static final int[] col = { 0, -1, 1, 0 };

    // Function to check if it is safe to go to position (x, y)
    // from the current position. The function returns false if (x, y)
    // is unsafe or already visited.
    private static boolean isSafe(int[][] field, boolean visited[][], int x, int y) {
        return (field[x][y] == 1 && !visited[x][y]);
    }

    // Check if (x, y) is valid field coordinates.
    // Note that we cannot go out of the field.
    private static boolean isValid(int x, int y, int M, int N) {
        return (x < M && y < N && x >= 0 && y >= 0);
    }

    // Find the minimum number of steps required to reach the last column
    // from the first column using BFS
    private static int BFS(int[][] field)
    {
        // `M × N` matrix
        int M = field.length;
        int N = field[0].length;

        // stores if a cell is visited or not
        boolean[][] visited = new boolean[M][N];

        // create an empty queue
        Queue<Node> q = new ArrayDeque<>();

        // process every cell of the first column
        for (int r = 0; r < M; r++)
        {
            // if the cell is safe, mark it as visited and
            // enqueue it by assigning it distance as 0
            if (field[r][0] == 1)
            {
                q.add(new Node(r, 0, 0));
                visited[r][0] = true;
            }
        }

        // loop till queue is empty
        while (!q.isEmpty())
        {
            // dequeue front node and process it
            int i = q.peek().x;
            int j = q.peek().y;
            int dist = q.peek().dist;
            q.poll();

            // if the destination is found, return minimum distance
            if (j == N - 1) {
                return dist;
            }

            // check for all four possible movements from the current cell
            // and enqueue each valid movement
            for (int k = 0; k < row.length; k++)
            {
                // skip if the location is invalid or visited, or unsafe
                if (isValid(i + row[k], j + col[k], M, N) &&
                        isSafe(field, visited, i + row[k], j + col[k]))
                {
                    // mark it as visited and enqueue it with +1 distance
                    visited[i + row[k]][j + col[k]] = true;
                    q.add(new Node(i + row[k], j + col[k], dist + 1));
                }
            }
        }
        return Integer.MAX_VALUE;
    }

    // Find the shortest path from the first column to the last column in a given field
    public static int findShortestDistance(int[][] mat)
    {
        // base case
        if (mat == null || mat.length == 0) {
            return 0;
        }

        // `M × N` matrix
        int M = mat.length;
        int N = mat[0].length;

        // `r[]` and `c[]` detail all eight possible movements from a cell
        // (top, right, bottom, left, and four diagonal moves)
        int[] r = { -1, -1, -1, 0, 0, 1, 1, 1 };
        int[] c = { -1, 0, 1, -1, 1, -1, 0, 1 };

        // mark adjacent cells of sensors as unsafe
        for (int i = 0; i < M; i++)
        {
            for (int j = 0; j < N; j++)
            {
                for (int k = 0; k < r.length; k++) {
                    if (mat[i][j] == 0 && isValid(i + r[k], j + c[k], M, N)
                            && mat[i + r[k]][j + c[k]] == 1) {
                        mat[i + r[k]][j + c[k]] = Integer.MAX_VALUE;
                    }
                }
            }
        }

        // update the mat
        for (int i = 0; i < M; i++)
        {
            for (int j = 0; j < N; j++)
            {
                if (mat[i][j] == Integer.MAX_VALUE) {
                    mat[i][j] = 0;
                }
            }
        }

        // call BFS and return the shortest distance found by it
        return BFS(mat);
    }

    public static void main(String[] args)
    {
        int[][] field =
                {
                        { 0, 1, 1, 1, 0, 1, 1, 1, 1, 1 },
                        { 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 },
                        { 1, 1, 1, 1, 1, 1, 1, 1, 0, 1 },
                        { 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 },
                        { 1, 1, 1, 1, 1, 0, 1, 1, 1, 1 },
                        { 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 },
                        { 1, 0, 1, 1, 1, 1, 1, 1, 1, 1 },
                        { 1, 1, 1, 1, 1, 1, 1, 1, 1, 0 },
                        { 1, 1, 1, 1, 1, 0, 1, 1, 1, 1 },
                        { 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 }
                };

        int dist = findShortestDistance(field);

        if (dist != Integer.MAX_VALUE) {
            System.out.print("The shortest safe path has a length of " + dist);
        }
        else {
            System.out.print("No route is safe to reach destination");
        }
    }
}
```

##

```python3
import sys
from collections import deque

# Below lists detail all four possible movements from a cell,
# i.e., (top, right, bottom, left)
row = [-1, 0, 0, 1]
col = [0, -1, 1, 0]

# Function to check if it is safe to go to position (x, y)
# from the current position. The function returns false if (x, y)
# is unsafe or already visited.
def isSafe(field, visited, x, y):
    return field[x][y] == 1 and not visited[x][y]

# Check if (x, y) is valid field coordinates.
# Note that we cannot go out of the field.
def isValid(x, y, M, N):
    return M > x >= 0 and N > y >= 0

# Find the minimum number of steps required to reach the last column
# from the first column using BFS
def BFS(field):

    # `M × N` matrix
    (M, N) = (len(field), len(field[0]))

    # stores if the cell is visited or not
    visited = [[False for x in range(N)] for y in range(M)]

    # create an empty queue
    q = deque()

    # process every cell of the first column
    for r in range(M):

        # if the cell is safe, mark it as visited and
        # enqueue it by assigning it distance as 0
        if field[r][0] == 1:
            q.append((r, 0, 0))
            visited[r][0] = True

    # loop till queue is empty
    while q:

        # dequeue front node and process it

        # (i, j) represents the position inside the field
        # `dist` represents its minimum distance from the source

        (i, j, dist) = q.popleft()

        # if the destination is found, return minimum distance
        if j == N - 1:
            return dist

        # check for all four possible movements from the current cell
        # and enqueue each valid movement
        for k in range(len(row)):

            # skip if the location is invalid or visited, or unsafe
            if (isValid(i + row[k], j + col[k], M, N) and
                    isSafe(field, visited, i + row[k], j + col[k])):
                # mark it as visited and enqueue it with +1 distance
                visited[i + row[k]][j + col[k]] = True
                q.append((i + row[k], j + col[k], dist + 1))

    return sys.maxsize

# Find the shortest path from the first column to the last column in a given field
def findShortestDistance(mat):

    # base case
    if not mat or not len(mat):
        return 0

    # `M × N` matrix
    (M, N) = (len(mat), len(mat[0]))

    # `r` and `c` detail all eight possible movements from a cell
    # (top, right, bottom, left, and four diagonal moves)
    r = [-1, -1, -1, 0, 0, 1, 1, 1]
    c = [-1, 0, 1, -1, 1, -1, 0, 1]

    # mark adjacent cells of sensors as unsafe
    for i in range(M):
        for j in range(N):
            for k in range(len(r)):
                if mat[i][j] == 0 and isValid(i + r[k], j + c[k], M, N) \
                        and mat[i + r[k]][j + c[k]] == 1:
                    mat[i + r[k]][j + c[k]] = sys.maxsize

    # update the mat
    for i in range(M):
        for j in range(N):
            if mat[i][j] == sys.maxsize:
                mat[i][j] = 0

    # call BFS and return the shortest distance found by it
    return BFS(field)

if __name__ == '__main__':

    field = [
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
    ]

    # `M × N` field
    M = N = len(field)

    dist = findShortestDistance(field)

    if dist != sys.maxsize:
        print("The shortest safe path has a length of", dist)
    else:
        print("No route is safe to reach destination")
```

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
