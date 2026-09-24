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

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
#include <cstring>
using namespace std;

// Check if cell (x, y) is valid or not
bool isValidCell(int x, int y, int N) {
    return !(x < 0 || y < 0 || x >= N || y >= N);
}

void countPaths(vector<vector<int>> const &maze, int x, int y, pair<int, int> &dest,
            vector<vector<bool>> &visited, int& count)
{
    // if destination is found, increment the path count
    if (x == dest.first && y == dest.second)
    {
        count++;
        return;
    }

    // mark the current cell as visited
    visited[x][y] = 1;

    // `N × N` matrix
    int N = maze.size();

    // if the current cell is a valid and open cell,
    if (isValidCell(x, y, N) && maze[x][y])
    {
        // go down (x, y) ——> (x + 1, y)
        if (x + 1 < N && !visited[x + 1][y]) {
            countPaths(maze, x + 1, y, dest, visited, count);
        }

        // go up (x, y) ——> (x - 1, y)
        if (x - 1 >= 0 && !visited[x - 1][y]) {
            countPaths(maze, x - 1, y, dest, visited, count);
        }

        // go right (x, y) ——> (x, y + 1)
        if (y + 1 < N && !visited[x][y + 1]) {
            countPaths(maze, x, y + 1, dest, visited, count);
        }

        // go left (x, y) ——> (x, y - 1)
        if (y - 1 >= 0 && !visited[x][y - 1]) {
            countPaths(maze, x, y - 1, dest, visited, count);
        }
    }

    // backtrack from the current cell and remove it from the current path
    visited[x][y] = 0;
}

// Wrapper over countPaths()
int findCount(vector<vector<int>> const &maze, pair<int, int> &src,
        pair<int, int> &dest)
{
    // `N × N` matrix
    int N = maze.size();

    // base case
    if (N == 0 || maze[src.first][src.second] == 0 ||
            maze[dest.first][dest.second] == 0) {
        return 0;
    }

    // stores number of unique paths from source to destination
    int count = 0;

    // 2D matrix to keep track of cells involved in the current path
    vector<vector<bool>> visited;
    visited.resize(N, vector<bool>(N));

    // start from source cell
    countPaths(maze, src.first, src.second, dest, visited, count);

    return count;
}

int main()
{
    // input matrix
    vector<vector<int>> maze =
    {
        { 1, 1, 1, 1 },
        { 1, 1, 0, 1 },
        { 0, 1, 0, 1 },
        { 1, 1, 1, 1 }
    };

    // source cell
    pair<int,int> src = make_pair(0, 0);

    // destination cell
    pair<int,int> dest = make_pair(3, 3);

    cout << "The total number of unique paths are " << findCount(maze, src, dest);

    return 0;
}
```

**Output:** The total number of unique paths are 4

##

```java
class Main
{
    // Check if cell (x, y) is valid or not
    private static boolean isValidCell(int x, int y, int N) {
        return !(x < 0 || y < 0 || x >= N || y >= N);
    }

    private static int countPaths(int[][] maze, int i, int j, int x, int y,
                                  boolean visited[][])
    {
        // if destination (x, y) is found, return 1
        if (i == x && j == y) {
            return 1;
        }

        // stores number of unique paths from source to destination
        int count = 0;

        // mark the current cell as visited
        visited[i][j] = true;

        // `N × N` matrix
        int N = maze.length;

        // if the current cell is a valid and open cell
        if (isValidCell(i, j, N) && maze[i][j] == 1)
        {
            // go down (i, j) ——> (i + 1, j)
            if (i + 1 < N && !visited[i + 1][j]) {
                count += countPaths(maze, i + 1, j, x, y, visited);
            }

            // go up (i, j) ——> (i - 1, j)
            if (i - 1 >= 0 && !visited[i - 1][j]) {
                count += countPaths(maze, i - 1, j, x, y, visited);
            }

            // go right (i, j) ——> (i, j + 1)
            if (j + 1 < N && !visited[i][j + 1]) {
                count += countPaths(maze, i, j + 1, x, y, visited);
            }

            // go left (i, j) ——> (i, j - 1)
            if (j - 1 >= 0 && !visited[i][j - 1]) {
                count += countPaths(maze, i, j - 1, x, y, visited);
            }
        }

        // backtrack from the current cell and remove it from the current path
        visited[i][j] = false;

        return count;
    }

    public static int findCount(int[][] maze, int i, int j, int x, int y)
    {
        // base case: invalid input
        if (maze == null || maze.length == 0 || maze[i][j] == 0 || maze[x][y] == 0) {
            return 0;
        }

        // `N × N` matrix
        int N = maze.length;

        // 2D matrix to keep track of cells involved in the current path
        boolean[][] visited = new boolean[N][N];

        // start from source cell (i, j)
        return countPaths(maze, i, j, x, y, visited);
    }

    public static void main(String[] args)
    {
        int[][] maze =
        {
            { 1, 1, 1, 1 },
            { 1, 1, 0, 1 },
            { 0, 1, 0, 1 },
            { 1, 1, 1, 1 }
        };

        // source cell (0, 0), destination cell (3, 3)
        int count = findCount(maze, 0, 0, 3, 3);

        System.out.println("The total number of unique paths are " + count);
    }
}
```

##

```python3
# Check if cell (x, y) is valid or not
def isValidCell(x, y, N):
    return not (x < 0 or y < 0 or x >= N or y >= N)

def countPaths(maze, i, j, dest, visited):

    # `N × N` matrix
    N = len(maze)

    # if destination (x, y) is found, return 1
    if (i, j) == dest:
        return 1

    # stores number of unique paths from source to destination
    count = 0

    # mark the current cell as visited
    visited[i][j] = True

    # if the current cell is a valid and open cell
    if isValidCell(i, j, N) and maze[i][j] == 1:

        # go down (i, j) ——> (i + 1, j)
        if i + 1 < N and not visited[i + 1][j]:
            count += countPaths(maze, i + 1, j, dest, visited)

        # go up (i, j) ——> (i - 1, j)
        if i - 1 >= 0 and not visited[i - 1][j]:
            count += countPaths(maze, i - 1, j, dest, visited)

        # go right (i, j) ——> (i, j + 1)
        if j + 1 < N and not visited[i][j + 1]:
            count += countPaths(maze, i, j + 1, dest, visited)

        # go left (i, j) ——> (i, j - 1)
        if j - 1 >= 0 and not visited[i][j - 1]:
            count += countPaths(maze, i, j - 1, dest, visited)

    # backtrack from the current cell and remove it from the current path
    visited[i][j] = False

    return count

def findCount(maze, src, dest):

    # get source cell (i, j)
    i, j = src

    # get destination cell (x, y)
    x, y = dest

    # base case: invalid input
    if not maze or not len(maze) or not maze[i][j] or not maze[x][y]:
        return 0

    # `N × N` matrix
    N = len(maze)

    # 2D matrix to keep track of cells involved in the current path
    visited = [[False for x in range(N)] for y in range(N)]

    # start from source cell (i, j)
    return countPaths(maze, i, j, dest, visited)

if __name__ == '__main__':

    maze = [
        [1, 1, 1, 1],
        [1, 1, 0, 1],
        [0, 1, 0, 1],
        [1, 1, 1, 1]
    ]

    # source cell
    src = (0, 0)

    # destination cell
    dest = (3, 3)

    print("The total number of unique paths are", findCount(maze, src, dest))
```

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
