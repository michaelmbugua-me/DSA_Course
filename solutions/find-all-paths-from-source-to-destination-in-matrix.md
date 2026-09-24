# Find all paths from the first cell to the last cell of a matrix

> Source: https://www.techiedelight.com/find-all-paths-from-source-to-destination-in-matrix/

Given an `M × N` integer matrix, find all paths from the first cell to the last cell. We can only move down or to the right from the current cell.

For example,

**Input:** [ 1 2 3 ] [ 4 5 6 ] [ 7 8 9 ] **Output:** 1, 2, 3, 6, 9 1, 2, 5, 6, 9 1, 2, 5, 8, 9 1, 4, 5, 6, 9 1, 4, 5, 8, 9 1, 4, 7, 8, 9

> 

We can easily solve this problem by using [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/). The idea is to start from the top-left cell of the matrix and recur for the next node (immediate right or immediate bottom cell) and keep on doing that for every visited cell until the destination is reached. Also maintain a path array to store the nodes in the current path and update the path array (including the current node) whenever any cell is visited. Now, whenever the destination (bottom-right corner) is reached, print the path array.

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
using namespace std;

// Function to check if (i, j) is a valid matrix coordinate
bool isValid(int i, int j, int M, int N) {
    return (i >= 0 && i < M && j >= 0 && j < N);
}

// Function to print the route taken
void printPath(vector<int> const &path, int last)
{
    for (int i: path) {
        cout << i << ", ";
    }
    cout << last << endl;
}

void findPaths(vector<vector<int>> const &mat, vector<int> &path, int i, int j)
{
    // base case
    if (mat.size() == 0) {
        return;
    }

    // `M × N` matrix
    int M = mat.size();
    int N = mat[0].size();

    // if the last cell is reached, print the route
    if (i == M - 1 && j == N - 1)
    {
        printPath(path, mat[i][j]);
        return;
    }

    // include the current cell in the path
    path.push_back(mat[i][j]);

    // move right
    if (isValid(i, j + 1, M, N)) {
        findPaths(mat, path, i, j + 1);
    }

    // move down
    if (isValid(i + 1, j, M, N)) {
        findPaths(mat, path, i + 1, j);
    }

    // backtrack: remove the current cell from the path
    path.pop_back();
}

int main()
{
    vector<vector<int>> mat =
    {
        { 1, 2, 3 },
        { 4, 5, 6 },
        { 7, 8, 9 }
    };

    vector<int> path;

    // start from `(0, 0)` cell
    int x = 0, y = 0;

    findPaths(mat, path, x, y);

    return 0;
}
```

**Output:** 1, 2, 3, 6, 9 1, 2, 5, 6, 9 1, 2, 5, 8, 9 1, 4, 5, 6, 9 1, 4, 5, 8, 9 1, 4, 7, 8, 9

##

```java
import java.util.Stack;

class Main
{
    public static void findPaths(int[][] mat, Stack<Integer> path, int i, int j)
    {
        // base case
        if (mat == null || mat.length == 0) {
            return;
        }

        int M = mat.length;
        int N = mat[0].length;

        // if the last cell is reached, print the route
        if (i == M - 1 && j == N - 1)
        {
            path.add(mat[i][j]);
            System.out.println(path);
            path.pop();

            return;
        }

        // include the current cell in the path
        path.add(mat[i][j]);

        // move right
        if ((i >= 0 && i < M && j + 1 >= 0 && j + 1 < N)) {
            findPaths(mat, path, i, j + 1);
        }

        // move down
        if ((i + 1 >= 0 && i + 1 < M && j >= 0 && j < N)) {
            findPaths(mat, path, i + 1, j);
        }

        // backtrack: remove the current cell from the path
        path.pop();
    }

    public static void main(String[] args)
    {
        int[][] mat =
        {
            { 1, 2, 3 },
            { 4, 5, 6 },
            { 7, 8, 9 }
        };

        Stack<Integer> path = new Stack<>();

        // start from `(0, 0)` cell
        int x = 0, y = 0;

        findPaths(mat, path, x, y);
    }
}
```

##

```python3
def findPaths(mat, path, i, j):

    # base case
    if not mat or not len(mat):
        return

    (M, N) = (len(mat), len(mat[0]))

    # if the last cell is reached, print the route
    if i == M - 1 and j == N - 1:
        print(path + [mat[i][j]])
        return

    # include the current cell in the path
    path.append(mat[i][j])

    # move right
    if 0 <= i < M and 0 <= j + 1 < N:
        findPaths(mat, path, i, j + 1)

    # move down
    if 0 <= i + 1 < M and 0 <= j < N:
        findPaths(mat, path, i + 1, j)

    # backtrack: remove the current cell from the path
    path.pop()

if __name__ == '__main__':

    mat = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ]

    path = []

    # start from `(0, 0)` cell
    x = y = 0

    findPaths(mat, path, x, y)
```

The time complexity of the proposed solution is exponential.

T(M, N) = T(M, N-1) + T(M-1, N) // for two recursive calls T(M, 1) = M, T(1, N) = N, T(1, 1) = 1

The additional space used by the program is O(M + N).

If we carefully analyze the solution, we can see the problem has [overlapping subproblems](https://techiedelight.com/introduction-dynamic-programming/#overlapping-subproblems). So, it can be solved using [dynamic programming](https://techiedelight.com/dynamic-programming-interview-questions/), and time complexity can be reduced drastically (space complexity will also increase drastically).

**Exercise:**

1\. Modify the proposed solution to DP using memoization. 2\. Convert the code to C using an array for storing path information.

Also See:

> [Print all shortest routes in a rectangular grid](https://www.techiedelight.com/print-all-shortest-routes-rectangular-grid/ "Print all shortest routes in a rectangular grid")

> [Find the longest possible route in a matrix](https://www.techiedelight.com/find-longest-possible-route-matrix/ "Find the longest possible route in a matrix")

> [Find the path from source to destination in a matrix that satisfies given constraints](https://www.techiedelight.com/find-path-source-destination-matrix-satisfies-given-constraints/ "Find the path from source to destination in a matrix that satisfies given constraints")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.77/5. Vote count: 199

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
