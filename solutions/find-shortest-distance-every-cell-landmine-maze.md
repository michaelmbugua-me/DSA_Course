# Find the shortest distance of every cell from a landmine inside a maze

> Source: https://www.techiedelight.com/find-shortest-distance-every-cell-landmine-maze/

Given a [maze](https://techiedelight.com/maze-problems-in-data-structures/) in the form of a rectangular matrix, filled with either `O`, `X`, or `M`, where `O` represents an open cell, `X` represents a blocked cell, and `M` represents landmines in the maze, find the shortest distance of every open cell in the maze from its nearest mine.

We are only allowed to travel either of the four directions, and diagonal moves are not allowed. We can assume cells with the mine have distance `0`. Also, blocked and unreachable cells have distance `-1`.

For example,

**Input:** 6 × 5 matrix filled with O (Open cell), X (Blocked Cell), and M (Landmine). O M O O X O X X O M O O O O O O X X X O O O M O O O X X M O **Output:** 1 0 1 2 -1 2 -1 -1 1 0 3 4 3 2 1 3 -1 -1 -1 2 2 1 0 1 2 3 -1 -1 0 1

> 

The idea is to perform a [BFS](https://techiedelight.com/breadth-first-search/) to solve this problem. Start by creating an empty [queue](https://techiedelight.com/circular-queue-implementation-c/) and enqueue all cells with the mines. Then loop through the queue and consider each of four adjacent cells of the front cell. Enqueue the adjacent cell (with updated distance) if it represents an open space, and its distance from the mine is yet to be calculated. Repeat the procedure till the queue is empty.

Following is the C++, Java, and Python implementation of the idea:

```cpp
#include <iostream>
#include <vector>
#include <queue>
#include <iomanip>
using namespace std;

// A Queue Node
struct Node
{
    int x;          // stores x–coordinate of a matrix cell
    int y;          // stores y–coordinate of a matrix cell
    int distance;   // stores the distance of (x, y) from mine
};

// check if specified row and column are valid matrix index
bool isValid(int i, int j, int M, int N) {
    return (i >= 0 && i < M) && (j >= 0 && j < N);
}

// check if the current cell is an open area, and its
// distance from the mine is not yet calculated
bool isSafe(int i, int j, vector<vector<char>> const &mat,
        vector<vector<int>> const &result) {
    return mat[i][j] == 'O' && result[i][j] == -1;
}

// Replace all O's in a matrix with their shortest distance
// from the nearest mine
vector<vector<int>> updateShortestDistance(vector<vector<char>> const &mat)
{
    // base case
    if (mat.size() == 0) {
        return {};
    }

    // `M × N` matrix
    int M = mat.size();
    int N = mat[0].size();

    vector<vector<int>> result(M, vector<int>(N));

    // initialize an empty queue
    queue<Node> q;

    // find all mines location and add them to the queue
    for (int i = 0; i < M; i++)
    {
        for (int j = 0; j < N; j++)
        {
            // if the current cell represents a mine
            if (mat[i][j] == 'M')
            {
                q.push({i, j, 0});

                // update mine distance as 0
                result[i][j] = 0;
            }
            // otherwise, initialize the mine distance by -1
            else {
                result[i][j] = -1;
            }
        }
    }

    // arrays to get indices of four adjacent cells of a given cell
    int row[] = { 0, -1, 0, 1 };
    int col[] = { -1, 0, 1, 0 };

    // do for each node in the queue
    while (!q.empty())
    {
        // process front cell in the queue
        int x = q.front().x;
        int y = q.front().y;
        int distance = q.front().distance;

        // dequeue front cell
        q.pop();

        // update the four adjacent cells of the front node in the queue
        for (int i = 0; i < 4; i++)
        {
            // enqueue adjacent cell if it is valid, unvisited,
            // and has a path through it
            if (isValid(x + row[i], y + col[i], M, N) &&
                isSafe(x + row[i], y + col[i], mat, result))
            {
                result[x + row[i]][y + col[i]] = distance + 1;
                q.push({x + row[i], y + col[i], distance + 1});
            }
        }
    }

    return result;
}

// Utility function to print a matrix
void printMatrix(vector<vector<int>> const &mat)
{
    for (int i = 0; i < mat.size(); i++)
    {
        for (int j = 0; j < mat[0].size(); j++) {
            cout << setw(3) << mat[i][j];
        }
        cout << endl;
    }
}

int main()
{
    vector<vector<char>> mat =
    {
        {'O', 'M', 'O', 'O', 'X'},
        {'O', 'X', 'X', 'O', 'M'},
        {'O', 'O', 'O', 'O', 'O'},
        {'O', 'X', 'X', 'X', 'O'},
        {'O', 'O', 'M', 'O', 'O'},
        {'O', 'X', 'X', 'M', 'O'}
    };

    vector<vector<int>> output = updateShortestDistance(mat);
    printMatrix(output);

    return 0;
}
```

**Output:** 1 0 1 2 -1 2 -1 -1 1 0 3 4 3 2 1 3 -1 -1 -1 2 2 1 0 1 2 3 -1 -1 0 1

##

```java
import java.util.ArrayDeque;
import java.util.Queue;
import java.util.Arrays;

// A Queue Node
class Node
{
    int x;              // stores x–coordinate of a matrix cell
    int y;              // stores y–coordinate of a matrix cell
    int distance;       // stores the distance of (x, y) from mine

    Node(int x, int y, int distance)
    {
        this.x = x;
        this.y = y;
        this.distance = distance;
    }
}

class Main
{
    // check if specified row and column are valid matrix index
    private static boolean isValid(int i, int j, int M, int N) {
        return (i >= 0 && i < M) && (j >= 0 && j < N);
    }

    // check if the current cell is an open area, and its
    // distance from the mine is not yet calculated
    private static boolean isSafe(int i, int j, char[][] mat, int[][] result) {
        return mat[i][j] == 'O' && result[i][j] == -1;
    }

    // Replace all O's in a matrix with their shortest distance
    // from the nearest mine
    public static int[][] updateShortestDistance(char[][] mat)
    {
        // base case
        if (mat == null || mat.length == 0) {
            return null;
        }

        // `M × N` matrix
        int M = mat.length;
        int N = mat[0].length;

        int[][] result = new int[M][N];

        // initialize an empty queue
        Queue<Node> q = new ArrayDeque<>();

        // find all mines location and add them to the queue
        for (int i = 0; i < M; i++)
        {
            for (int j = 0; j < N; j++)
            {
                // if the current cell represents a mine
                if (mat[i][j] == 'M')
                {
                    q.add(new Node(i, j, 0));

                    // update mine distance as 0
                    result[i][j] = 0;
                }
                // otherwise, initialize the mine distance by -1
                else {
                    result[i][j] = -1;
                }
            }
        }

        // arrays to get indices of four adjacent cells of a given cell
        int[] row = { 0, -1, 0, 1 };
        int[] col = { -1, 0, 1, 0 };

        // do for each node in the queue
        while (!q.isEmpty())
        {
            // process front cell in the queue
            int x = q.peek().x;
            int y = q.peek().y;
            int distance = q.peek().distance;

            // dequeue front cell
            q.poll();

            // update the four adjacent cells of the front node in the queue
            for (int i = 0; i < row.length; i++)
            {
                // enqueue adjacent cell if it is valid, unvisited,
                // and has a path through it
                if (isValid(x + row[i], y + col[i], M, N) &&
                        isSafe(x + row[i], y + col[i], mat, result))
                {
                    result[x + row[i]][y + col[i]] = distance + 1;
                    q.add(new Node(x + row[i], y + col[i], distance + 1));
                }
            }
        }

        return result;
    }

    public static void main(String[] args)
    {
        char[][] mat =
                {
                        {'O', 'M', 'O', 'O', 'X'},
                        {'O', 'X', 'X', 'O', 'M'},
                        {'O', 'O', 'O', 'O', 'O'},
                        {'O', 'X', 'X', 'X', 'O'},
                        {'O', 'O', 'M', 'O', 'O'},
                        {'O', 'X', 'X', 'M', 'O'}
                };

        int[][] result = updateShortestDistance(mat);

        // print results
        for (var r: result) {
            System.out.println(Arrays.toString(r));
        }
    }
}
```

##

```python3
from collections import deque

# check if specified row and column are valid matrix index
def isValid(i, j, N, M):
    return (0 <= i < M) and (0 <= j < N)

# check if the current cell is an open area, and its
# distance from the mine is not yet calculated
def isSafe(i, j, mat, result):
    return mat[i][j] == 'O' and result[i][j] == -1

# Replace all O's in a matrix with their shortest distance
# from the nearest mine
def updateShortestDistance(mat):

    # base case
    if not mat or not len(mat):
        return []

    # `M × N` matrix
    (M, N) = (len(mat), len(mat[0]))

    result = [[0 for x in range(N)] for y in range(M)]

    # initialize an empty queue
    q = deque()

    # find all mines location and add them to the queue
    for i in range(M):
        for j in range(N):
            # if the current cell represents a mine
            if mat[i][j] == 'M':
                q.append((i, j, 0))

                # update mine distance as 0
                result[i][j] = 0

            # otherwise, initialize the mine distance by -1
            else:
                result[i][j] = -1

    # lists to get indices of four adjacent cells of a given cell
    row = [0, -1, 0, 1]
    col = [-1, 0, 1, 0]

    # do for each in the queue
    while q:

        # dequeue front cell
        x, y, distance = q.popleft()

        # update the four adjacent cells of the front node in the queue
        for i in range(len(row)):
            # enqueue adjacent cell if it is valid, unvisited,
            # and has a path through it
            if isValid(x + row[i], y + col[i], N, M) and \
                    isSafe(x + row[i], y + col[i], mat, result):
                result[x + row[i]][y + col[i]] = distance + 1
                q.append((x + row[i], y + col[i], distance + 1))

    return result

if __name__ == '__main__':

    mat = [
        ['O', 'M', 'O', 'O', 'X'],
        ['O', 'X', 'X', 'O', 'M'],
        ['O', 'O', 'O', 'O', 'O'],
        ['O', 'X', 'X', 'X', 'O'],
        ['O', 'O', 'M', 'O', 'O'],
        ['O', 'X', 'X', 'M', 'O']
    ]

    result = updateShortestDistance(mat)

    # print results
    for r in result:
        print(r)
```

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
