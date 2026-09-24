# Print all shortest routes in a rectangular grid

> Source: https://www.techiedelight.com/print-all-shortest-routes-rectangular-grid/

Given an `M × N` rectangular grid, print all routes in the grid that start at the first cell `(0, 0)` and ends at the last cell `(M-1, N-1)`. We can move down or right or diagonally (down-right), but not up or left.

For example,

**Input:** { 1, 2, 3 } { 4, 5, 6 } { 7, 8, 9 } **Output:** [ 1, 4, 7, 8, 9 ] [ 1, 4, 5, 8, 9 ] [ 1, 4, 5, 6, 9 ] [ 1, 4, 5, 9 ] [ 1, 4, 8, 9 ] [ 1, 2, 5, 8, 9 ] [ 1, 2, 5, 6, 9 ] [ 1, 2, 5, 9 ] [ 1, 2, 3, 6, 9 ] [ 1, 2, 6, 9 ] [ 1, 5, 8, 9 ] [ 1, 5, 6, 9 ] [ 1, 5, 9 ]

> 

The idea is to use [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/) to find all routes. Start from the source cell (top-left corner) of the grid and recur for the next nodes. The next node can be either of the immediate right cell, immediate bottom cell, or immediate down-right diagonal cell. Recursively repeat this for every visited cell until the destination is reached. Also, maintain a data structure to store nodes in the current route and print the path whenever the destination cell (bottom-right corner) is reached.

Here’s code to print all such paths in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
using namespace std;

// Recursive function to get all routes in a rectangular grid
// that start at cell (i, j) and ends at the last cell (M-1, N-1).
void printPaths(vector<vector<int>> const &mat, vector<int> &route, int i, int j)
{
    // base case
    if (mat.size() == 0) {
        return;
    }

    // `M × N` matrix
    int M = mat.size();
    int N = mat[0].size();

    // if the last cell is reached
    if (i == M - 1 && j == N - 1)
    {
        // print the current route
        for (int i: route) {
            cout << i << ", ";
        }
        cout << mat[i][j] << endl;
        return;
    }

    // include current cell in route
    route.push_back(mat[i][j]);

    // move down
    if (i + 1 < M) {
        printPaths(mat, route, i + 1, j);
    }

    // move right
    if (j + 1 < N) {
        printPaths(mat, route, i, j + 1);
    }

    // move diagonally
    if (i + 1 < M && j + 1 < N) {
        printPaths(mat, route, i + 1, j + 1);
    }

    // backtrack
    route.pop_back();
}

// Print all routes in a rectangular grid
void printPaths(vector<vector<int>> const &mat)
{
    // vector to store the current route
    vector<int> route;

    // start from the first cell (0, 0)
    printPaths(mat, route, 0, 0);
}

int main()
{
    vector<vector<int>> mat =
    {
        { 1, 2, 3 },
        { 4, 5, 6 },
        { 7, 8, 9 }
    };

    printPaths(mat);

    return 0;
}
```

##

```java
import java.util.Stack;

class Main
{
    // Recursive function to get all routes in a rectangular grid
    // that start at cell (i, j) and ends at the last cell (M-1, N-1).
    public static void printPaths(int[][] mat, Stack<Integer> route, int i, int j)
    {
        // base case
        if (mat == null || mat.length == 0) {
            return;
        }

        int M = mat.length;
        int N = mat[0].length;

        // include current cell in route
        route.add(mat[i][j]);

        // if the last cell is reached
        if (i == M - 1 && j == N - 1) {
            System.out.println(route);
        }
        else {
            // move down
            if (i + 1 < M) {
                printPaths(mat, route, i + 1, j);
            }

            // move right
            if (j + 1 < N) {
                printPaths(mat, route, i, j + 1);
            }

            // move diagonally
            if (i + 1 < M && j + 1 < N) {
                printPaths(mat, route, i + 1, j + 1);
            }
        }

        // backtrack: remove the current cell from the route
        route.pop();
    }

    // Print all routes in a rectangular grid
    public static void printPaths(int[][] mat)
    {
        // list to store the current route
        Stack<Integer> route = new Stack<>();

        // start from the first cell (0, 0)
        printPaths(mat, route, 0, 0);
    }

    public static void main(String[] args)
    {
        int[][] mat =
        {
            { 1, 2, 3 },
            { 4, 5, 6 },
            { 7, 8, 9 }
        };

        printPaths(mat);
    }
}
```

##

```python3
# Recursive function to get all routes in a rectangular grid
# that start at cell (i, j) and ends at the last cell (M-1, N-1).
def printPaths(mat, route=[], i=0, j=0):

    # base case
    if not mat or not len(mat):
        return

    # `M × N` matrix
    (M, N) = (len(mat), len(mat[0]))

    # include current cell in route
    route.append(mat[i][j])

    # if the last cell is reached
    if i == M - 1 and j == N - 1:
        print(route)
    else:
        # move down
        if i + 1 < M:
            printPaths(mat, route, i + 1, j)

        # move right
        if j + 1 < N:
            printPaths(mat, route, i, j + 1)

        # move diagonally
        if i + 1 < M and j + 1 < N:
            printPaths(mat, route, i + 1, j + 1)

    # backtrack: remove the current cell from the route
    route.pop()

if __name__ == '__main__':

    mat = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ]

    printPaths(mat)
```

**Output:** [1, 4, 7, 8, 9] [1, 4, 5, 8, 9] [1, 4, 5, 6, 9] [1, 4, 5, 9] [1, 4, 8, 9] [1, 2, 5, 8, 9] [1, 2, 5, 6, 9] [1, 2, 5, 9] [1, 2, 3, 6, 9] [1, 2, 6, 9] [1, 5, 8, 9] [1, 5, 6, 9] [1, 5, 9]

The time complexity of the proposed solution is exponential.

T(M, N) = T(M, N-1) + T(M-1, N) + T(M-1, N-1) T(M, 1) = M T(1, N) = N T(1, 1) = 1

The additional space required by the program is O(M + N).

There is another variation of the above problem where we need to print only those paths above the diagonal `x = y`. For example, the following paths are valid for the above matrix:

[1, 2, 3, 6, 9] [1, 2, 5, 6, 9] [1, 2, 5, 9] [1, 2, 6, 9] [1, 5, 6, 9] [1, 5, 9]

For a path to be valid, at all points `(x, y)` on the path, `x` should be less than `y`. We can simply enforce this constraint while building the paths. This is demonstrated below in C++, Java, and Python:

[C++](https://techiedelight.com/compiler/?run=tbJwX8), [Java](https://techiedelight.com/compiler/?run=ltGQJs), and [Python](https://techiedelight.com/compiler/?run=ltGQJsP) code.

**Exercise:** Efficiently count the total number of possible paths in a matrix from the top-left corner to the bottom-right corner using [dynamic programming](https://techiedelight.com/introduction-dynamic-programming/).

Also See:

> [Find the shortest path in a maze](https://www.techiedelight.com/find-shortest-path-in-maze/ "Find the shortest path in a maze")

> [Find all paths from the first cell to the last cell of a matrix](https://www.techiedelight.com/find-all-paths-from-source-to-destination-in-matrix/ "Find all paths from the first cell to the last cell of a matrix")

> [Collect maximum value of coins in a matrix](https://www.techiedelight.com/collect-maximum-value-coins-matrix/ "Collect maximum value of coins in a matrix")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.75/5. Vote count: 157

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
