# Find the longest possible route in a matrix

> Source: https://www.techiedelight.com/find-longest-possible-route-matrix/

Given a rectangular path in the form of a binary matrix, find the length of the longest possible route from source to destination by moving to only non-zero adjacent positions, i.e., We can form the route from positions having their value as 1. Note there should not be any cycles in the output path.

For example, the longest path from source cell `(0, 0)` to destination cell `(5, 7)` has length `22` for the following matrix.

(0, 0) —> (1, 0) —> (2, 0) —> (2, 1) —> (2, 2) —> (1, 2) —> (0, 2) —> (0, 3) —> (0, 4) —> (1, 4) —> (1, 5) —> (2, 5) —> (2, 4) —> (3, 4) —> (4, 4) —> (5, 4) —> (5, 5) —> (5, 6) —> (4, 6) —> (4, 7) —> (4, 8) —> (5, 8) —> (5, 7)

> 

We can use [backtracking](https://techiedelight.com/backtracking-interview-questions/) to solve this problem. We start from the given source cell in the matrix and explore all four paths possible and recursively check if they will lead to the destination or not. We have to keep track of the current cell’s distance from the source and update the value of the longest path found so far on reaching the destination cell. If a path doesn’t reach the destination or explored all possible routes from the current cell, backtrack. To make sure that the path is simple and doesn’t contain any cycles, keep track of cells involved in the current path in a matrix, and before exploring any cell, ignore the cell if it is already covered in the current path.

Following is the C++, Java, and Python implementation of the idea:

```cpp
#include <iostream>
#include <vector>
#include <cstring>
using namespace std;

// Check if it is possible to go to position (x, y) from
// the current position. The function returns false if the cell
// has a value 0, or it is already visited.
bool isSafe(vector<vector<int>> &mat, vector<vector<bool>> &visited, int x, int y)
{
    return (x >= 0 && x < mat.size() && y >= 0 && y < mat[0].size()) &&
            mat[x][y] == 1 && !visited[x][y];
}

// Find the longest possible route in a matrix `mat` from the source cell
// (i, j) to destination cell (x, y).
// `max_dist` —> keep track of the length of the longest path from source to
// destination. It is passed by reference.
// `dist` —> length of the path from the source cell to the current cell (i, j).
void findLongestPath(vector<vector<int>> &mat, vector<vector<bool>> &visited,
                int i, int j, int x, int y, int &max_dist, int dist)
{
    // if the destination is not possible from the current cell
    if (mat[i][j] == 0) {
        return;
    }

    // if the destination is found, update `max_dist`
    if (i == x && j == y)
    {
        max_dist = max(dist, max_dist);
        return;
    }

    // set (i, j) cell as visited
    visited[i][j] = 1;

    // go to the bottom cell
    if (isSafe(mat, visited, i + 1, j)) {
        findLongestPath(mat, visited, i + 1, j, x, y, max_dist, dist + 1);
    }

    // go to the right cell
    if (isSafe(mat, visited, i, j + 1)) {
        findLongestPath(mat, visited, i, j + 1, x, y, max_dist, dist + 1);
    }

    // go to the top cell
    if (isSafe(mat, visited, i - 1, j)) {
        findLongestPath(mat, visited, i - 1, j, x, y, max_dist, dist + 1);
    }

    // go to the left cell
    if (isSafe(mat, visited, i, j - 1)) {
        findLongestPath(mat, visited, i, j - 1, x, y, max_dist, dist + 1);
    }

    // backtrack: remove (i, j) from the visited matrix
    visited[i][j] = 0;
}

// Wrapper over findLongestPath() function
int findLongestPathLength(vector<vector<int>> &mat, pair<int, int> &src,
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

    int max_dist = 0;
    findLongestPath(mat, visited, src.first, src.second, dest.first, dest.second,
            max_dist, 0);

    return max_dist;
}

int main()
{
    // input matrix
    vector<vector<int>> mat =
    {
        { 1, 0, 1, 1, 1, 1, 0, 1, 1, 1 },
        { 1, 0, 1, 0, 1, 1, 1, 0, 1, 1 },
        { 1, 1, 1, 0, 1, 1, 0, 1, 0, 1 },
        { 0, 0, 0, 0, 1, 0, 0, 1, 0, 0 },
        { 1, 0, 0, 0, 1, 1, 1, 1, 1, 1 },
        { 1, 1, 1, 1, 1, 1, 1, 1, 1, 0 },
        { 1, 0, 0, 0, 1, 0, 0, 1, 0, 1 },
        { 1, 0, 1, 1, 1, 1, 0, 0, 1, 1 },
        { 1, 1, 0, 0, 1, 0, 0, 0, 0, 1 },
        { 1, 0, 1, 1, 1, 1, 0, 1, 0, 0 }
    };

    // (0, 0) are the source cell, and (5, 7) are the destination cell coordinates
    pair<int, int> src = make_pair(0, 0);
    pair<int, int> dest = make_pair(5, 7);

    cout << "The Maximum length path is " << findLongestPathLength(mat, src, dest);

    return 0;
}
```

**Output:** The maximum length path is 22

##

```java
class Main
{
    // Check if it is possible to go to position (x, y) from
    // the current position. The function returns false if the cell
    // is invalid, has a value 0, or it is already visited.
    private static boolean isSafe(int[][] mat, boolean[][] visited, int x, int y) {
        return (x >= 0 && x < mat.length && y >= 0 && y < mat[0].length) &&
                mat[x][y] == 1 && !visited[x][y];
    }

    // Find the longest possible route in a matrix `mat` from the source cell
    // (i, j) to destination cell (x, y).
    // `max_dist` —> keep track of the length of the longest path from source to
    // destination.
    // `dist` —> length of the path from the source cell to the current cell (i, j).
    public static int findLongestPath(int[][] mat, boolean[][] visited, int i, int j,
                                      int x, int y, int max_dist, int dist)
    {
        // if the destination is not possible from the current cell
        if (mat[i][j] == 0) {
            return 0;
        }

        // if the destination is found, update `max_dist`
        if (i == x && j == y) {
            return Integer.max(dist, max_dist);
        }

        // set (i, j) cell as visited
        visited[i][j] = true;

        // go to the bottom cell
        if (isSafe(mat, visited, i + 1, j))
        {
            max_dist = findLongestPath(mat, visited, i + 1, j, x, y,
                    max_dist, dist + 1);
        }

        // go to the right cell
        if (isSafe(mat, visited, i, j + 1))
        {
            max_dist = findLongestPath(mat, visited, i, j + 1, x, y,
                    max_dist, dist + 1);
        }

        // go to the top cell
        if (isSafe(mat, visited, i - 1, j))
        {
            max_dist = findLongestPath(mat, visited, i - 1, j, x, y,
                    max_dist, dist + 1);
        }

        // go to the left cell
        if (isSafe(mat, visited, i, j - 1))
        {
            max_dist = findLongestPath(mat, visited, i, j - 1, x, y,
                    max_dist, dist + 1);
        }

        // backtrack: remove (i, j) from the visited matrix
        visited[i][j] = false;

        return max_dist;
    }

    // Wrapper over findLongestPath() function
    public static int findLongestPathLength(int[][] mat, int i, int j, int x, int y)
    {
        // base case: invalid input
        if (mat == null || mat.length == 0 || mat[i][j] == 0 || mat[x][y] == 0) {
            return -1;
        }

        // `M × N` matrix
        int M = mat.length;
        int N = mat[0].length;

        // construct an `M × N` matrix to keep track of visited cells
        boolean[][] visited= new boolean[M][N];

        // (i, j) are the source cell, and (x, y) are the destination
        // cell coordinates
        return findLongestPath(mat, visited, i, j, x, y, 0, 0);
    }

    public static void main(String[] args)
    {
        // input matrix
        int mat[][] =
                {
                        { 1, 0, 1, 1, 1, 1, 0, 1, 1, 1 },
                        { 1, 0, 1, 0, 1, 1, 1, 0, 1, 1 },
                        { 1, 1, 1, 0, 1, 1, 0, 1, 0, 1 },
                        { 0, 0, 0, 0, 1, 0, 0, 1, 0, 0 },
                        { 1, 0, 0, 0, 1, 1, 1, 1, 1, 1 },
                        { 1, 1, 1, 1, 1, 1, 1, 1, 1, 0 },
                        { 1, 0, 0, 0, 1, 0, 0, 1, 0, 1 },
                        { 1, 0, 1, 1, 1, 1, 0, 0, 1, 1 },
                        { 1, 1, 0, 0, 1, 0, 0, 0, 0, 1 },
                        { 1, 0, 1, 1, 1, 1, 0, 1, 0, 0 }
                };

        // (0, 0) are the source cell, and (5, 7) are the destination
        // cell coordinates
        int max_dist = findLongestPathLength(mat, 0, 0, 5, 7);
        System.out.println("The maximum length path is " + max_dist);
    }
}
```

##

```python3
# Check if it is possible to go to position (x, y) from
# the current position. The function returns false if the cell
# is invalid, has a value 0, or it is already visited.
def isSafe(mat, visited, x, y):
    return 0 <= x < len(mat) and 0 <= y < len(mat[0]) and \
           not (mat[x][y] == 0 or visited[x][y])

# Find the longest possible route in a matrix `mat` from the source cell (i, j)
# to destination cell `dest`.
# `max_dist` —> keep track of the length of the longest path from source to destination
# `dist` —> length of the path from the source cell to the current cell (i, j)
def findLongestPath(mat, visited, i, j, dest, max_dist=0, dist=0):

    # if the destination is not possible from the current cell
    if mat[i][j] == 0:
        return 0

    # if the destination is found, update `max_dist`
    if (i, j) == dest:
        return max(dist, max_dist)

    # set (i, j) cell as visited
    visited[i][j] = 1

    # go to the bottom cell
    if isSafe(mat, visited, i + 1, j):
        max_dist = findLongestPath(mat, visited, i + 1, j, dest, max_dist, dist + 1)

    # go to the right cell
    if isSafe(mat, visited, i, j + 1):
        max_dist = findLongestPath(mat, visited, i, j + 1, dest, max_dist, dist + 1)

    # go to the top cell
    if isSafe(mat, visited, i - 1, j):
        max_dist = findLongestPath(mat, visited, i - 1, j, dest, max_dist, dist + 1)

    # go to the left cell
    if isSafe(mat, visited, i, j - 1):
        max_dist = findLongestPath(mat, visited, i, j - 1, dest, max_dist, dist + 1)

    # backtrack: remove (i, j) from the visited matrix
    visited[i][j] = 0

    return max_dist

# Wrapper over findLongestPath() function
def findLongestPathLength(mat, src, dest):

    # get source cell (i, j)
    i, j = src

    # get destination cell (x, y)
    x, y = dest

    # base case
    if not mat or len(mat) == 0 or mat[i][j] == 0 or mat[x][y] == 0:
        return 0

    # `M × N` matrix
    (M, N) = (len(mat), len(mat[0]))

    # construct an `M × N` matrix to keep track of visited cells
    visited = [[0 for x in range(N)] for y in range(M)]

    # (i, j) are the source cell coordinates, and (x, y) are the
    # destination cell coordinates
    return findLongestPath(mat, visited, i, j, dest)

if __name__ == '__main__':

    # input matrix
    mat = [
        [1, 0, 1, 1, 1, 1, 0, 1, 1, 1],
        [1, 0, 1, 0, 1, 1, 1, 0, 1, 1],
        [1, 1, 1, 0, 1, 1, 0, 1, 0, 1],
        [0, 0, 0, 0, 1, 0, 0, 1, 0, 0],
        [1, 0, 0, 0, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [1, 0, 0, 0, 1, 0, 0, 1, 0, 1],
        [1, 0, 1, 1, 1, 1, 0, 0, 1, 1],
        [1, 1, 0, 0, 1, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 0, 1, 0, 0]
    ]

    src = (0, 0)
    dest = (5, 7)

    print("The maximum length path is", findLongestPathLength(mat, src, dest))
```

The time complexity of the above solution is exponential and requires additional space for the recursion (call stack).

Also See:

> [Find the shortest path in a maze](https://www.techiedelight.com/find-shortest-path-in-maze/ "Find the shortest path in a maze")

> [Shortest path in a maze – Lee Algorithm](https://www.techiedelight.com/lee-algorithm-shortest-path-in-a-maze/ "Shortest path in a maze – Lee Algorithm")

> [Find the longest sequence formed by adjacent numbers in the matrix](https://www.techiedelight.com/find-longest-sequence-formed-adjacent-numbers-matrix/ "Find the longest sequence formed by adjacent numbers in the matrix")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.72/5. Vote count: 172

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
