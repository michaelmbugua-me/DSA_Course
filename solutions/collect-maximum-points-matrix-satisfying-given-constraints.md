# Collect maximum points in a matrix by satisfying given constraints

> Source: https://www.techiedelight.com/collect-maximum-points-matrix-satisfying-given-constraints/

Given an `M × N` matrix where each cell can have a value of 1, 0, or -1, where -1 denotes an unsafe cell, collect the maximum number of ones starting from the first cell and by visiting only safe cells (i.e., 0 or 1). We can only go left or down if the row is odd; otherwise, we can only go right or down from the current cell.

For example, consider the following matrix shown on the left. The maximum value collected is 9 as marked.

> 

The idea is to use [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/). The problem has [optimal substructure](https://techiedelight.com/introduction-dynamic-programming/#optimal-substructure). That means the problem can be broken down into smaller, simple “subproblems”, which can further be divided into yet simpler, smaller subproblems until the solution becomes trivial. For matrix `M`, we can recursively define the problem as:

if (M[i][j] != -1) path(i, j) = M[i][j] + | max(path(i, j – 1), path(i + 1, j)) (if i is odd) | max(path(i, j + 1), path(i + 1, j)) (if i is even) else path(i, j) = 0

Here, `path(i, j)` calculates the maximum value that can be collected starting from cell `(i, j)`. Following is the C++, Java, and Python implementation of the idea:

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// Function to check if cell (i, j) is valid and safe to visit
bool isSafe(vector<vector<int>> const &mat, int i, int j) {
    return !(i < 0 || i >= mat.size() || j < 0 || j >= mat[0].size() ||
            mat[i][j] == -1);
}

// Function to collect the maximum number of ones starting from cell mat[i][j]
int findMaximum(vector<vector<int>> const &mat, int i, int j)
{
    // base case
    if (mat.size() == 0) {
        return 0;
    }

    // return if cell (i, j) is invalid or unsafe to visit
    if (!isSafe(mat, i, j)) {
        return 0;
    }

    // if the row is odd, we can go left or down
    if (i & 1)
    {
        return mat[i][j] + max(findMaximum(mat, i, j - 1),
                            findMaximum(mat, i + 1, j));
    }
    // if the row is even, we can go right or down
    else {
        return mat[i][j] + max(findMaximum(mat, i, j + 1),
                        findMaximum(mat, i + 1, j));
    }
}

int main()
{
    vector<vector<int>> mat =
    {
        { 1, 1, -1, 1, 1 },
        { 1, 0, 0, -1, 1 },
        { 1, 1, 1, 1, -1 },
        { -1, -1, 1, 1, 1 },
        { 1, 1, -1, -1, 1 }
    };

    cout << "The Maximum value collected is " << findMaximum(mat, 0, 0);

    return 0;
}
```

**Output:** The maximum value collected is 9

##

```java
class Main
{
    // Function to check if cell (i, j) is valid and safe to visit
    public static boolean isSafe(int[][] mat, int i, int j)
    {
        return !(i < 0 || i >= mat.length || j < 0 || j >= mat[0].length ||
                mat[i][j] == -1);
    }

    // Function to collect the maximum number of ones starting from
    // cell mat[i][j]
    public static int findMaximum(int[][] mat, int i, int j)
    {
        if (mat == null || mat.length == 0) {
            return 0;
        }

        // return if cell (i, j) is invalid or unsafe to visit
        if (!isSafe(mat, i, j)) {
            return 0;
        }

        // if the row is odd, we can go left or down
        if ((i & 1) == 1) {
            return mat[i][j] + Integer.max(findMaximum(mat, i, j - 1),
                                        findMaximum(mat, i + 1, j));
        }

        // if the row is even, we can go right or down
        else {
            return mat[i][j] + Integer.max(findMaximum(mat, i, j + 1),
                                        findMaximum(mat, i + 1, j));
        }
    }

    public static void main(String[] args)
    {
        int[][] mat =
        {
            { 1, 1, -1, 1, 1 },
            { 1, 0, 0, -1, 1 },
            { 1, 1, 1, 1, -1 },
            { -1, -1, 1, 1, 1 },
            { 1, 1, -1, -1, 1 }
        };

        System.out.println("The maximum value collected is " + findMaximum(mat, 0, 0));
    }
}
```

##

```python3
# Function to check if cell (i, j) is invalid or unsafe to visit
def isNotSafe(mat, i, j):
    return i < 0 or i >= len(mat) or j < 0 or j >= len(mat[0]) or mat[i][j] == -1

# Function to collect the maximum number of ones starting from cell `mat[i][j]`
def findMaximum(mat, i=0, j=0):

    # base case
    if not mat or not len(mat):
        return

    # return if cell (i, j) is invalid or unsafe to visit
    if isNotSafe(mat, i, j):
        return 0

    # if the row is odd, we can go left or down
    if i & 1:
        return mat[i][j] + max(findMaximum(mat, i, j - 1), findMaximum(mat, i + 1, j))

    # if the row is even, we can go right or down
    else:
        return mat[i][j] + max(findMaximum(mat, i, j + 1), findMaximum(mat, i + 1, j))

if __name__ == '__main__':

    mat = [
        [1, 1, -1, 1, 1],
        [1, 0, 0, -1, 1],
        [1, 1, 1, 1, -1],
        [-1, -1, 1, 1, 1],
        [1, 1, -1, -1, 1]
    ]

    print("The maximum value collected is", findMaximum(mat))
```

The time complexity of the proposed solution is exponential and occupies space in the call stack.

The problem clearly exhibits [overlapping subproblems](https://techiedelight.com/introduction-dynamic-programming/#overlapping-subproblems), so we will end up solving the same subproblem over and over again. The repeated subproblems can be seen by drawing a recursion tree for any `M × N` matrix. We know that problems having optimal substructure and overlapping subproblems can be solved by dynamic programming, in which subproblem solutions are saved rather than computed repeatedly.

In the following implementation in C++, Java, and Python, we use a bottom-up approach, i.e., we solve smaller subproblems first, then solve larger subproblems from them. It computes `T[i][j]`, for each `1 <= i <= M` and `1 <= j <= N`, which stores the maximum value that can be collected till cell ending `(i-1, j-1)`. It makes use of smaller values of `i` and `j` already computed and has the same asymptotic runtime as _Memo_ ization, but no recursion overhead.

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <cstring>
using namespace std;

// Function to collect maximum value from the first cell (0, 0)
int findMaximum(vector<vector<int>> const &mat)
{
    // base case
    if (mat.size() == 0) {
        return 0;
    }

    // `M × N` matrix
    int M = mat.size();
    int N = mat[0].size();

    // `T[i][j]` stores the maximum value that can be collected
    // from any cell to cell (i-1, j-1)
    vector<vector<int>> T(M + 1, vector<int>(N + 1, 0));

    // process each row one by one and fill the lookup table `T`
    for (int i = 1; i<= M; i++)
    {
        // handle odd and even row separately
        if (i & 1)
        {
            // process current row from left to right
            for (int j = 1; j <= N; j++)
            {
                if (mat[i-1][j-1] == -1) {
                    T[i][j] = 0;
                }
                else {
                    T[i][j] = mat[i-1][j-1] + max(T[i][j-1], T[i-1][j]);
                }
            }
        }
        else {
            // process current row from right to left
            for (int j = N; j >= 1; j--)
            {
                if (mat[i-1][j-1] == -1) {
                    T[i][j] = 0;
                }
                else {
                    T[i][j] = mat[i-1][j-1] + max(T[i][j+1], T[i-1][j]);
                }
            }
        }
    }

    // trace maximum ones starting from the first cell
    int i = 1, j = 1;
    int result = T[i][j];

    while (i <= M && j >= 0 && j <= N)
    {
        if (T[i][j] == T[i+1][j] || T[i][j] + 1 == T[i+1][j]) {
            i++;
        }
        else if (T[i][j] == T[i][j+1] || T[i][j] + 1 == T[i][j+1]) {
            j++;
        }
        else if (T[i][j] == T[i][j-1] || T[i][j] + 1 == T[i][j-1]) {
            j--;
        }
        else {
            break;
        }

        result = T[i][j];
    }

    return result;
}

int main()
{
    vector<vector<int>> mat =
    {
        { 1, 1, -1, 1, 1 },
        { 1, 0, 0, -1, 1 },
        { 1, 1, 1, 1, -1 },
        { -1, -1, 1, 1, 1 },
        { 1, 1, -1, -1, 1 }
    };

    cout << "The Maximum value collected is " << findMaximum(mat);

    return 0;
}
```

**Output:** The maximum value collected is 9

##

```java
class Main
{
    // Function to collect maximum value from the first cell (0, 0)
    public static int findMaximum(int[][] mat)
    {
        if (mat == null || mat.length == 0) {
            return 0;
        }

        // `M × N` matrix
        int M = mat.length;
        int N = mat[0].length;

        // `T[i][j]` stores the maximum value that can be collected
        // from any cell to cell (i-1, j-1)
        int[][] T = new int[M+1][N+1];

        // process each row one by one and fill the lookup table `T`
        for (int i = 1; i<= M; i++)
        {
            // handle odd and even row separately
            if ((i & 1) == 1)
            {
                // process current row from left to right
                for (int j = 1; j <= N; j++)
                {
                    if (mat[i-1][j-1] != -1) {
                        T[i][j] = mat[i-1][j-1] + Integer.max(T[i][j-1], T[i-1][j]);
                    }
                }
            }
            else {
                // process current row from right to left
                for (int j = N - 1; j >= 1; j--)
                {
                    if (mat[i-1][j-1] != -1) {
                        T[i][j] = mat[i-1][j-1] + Integer.max(T[i][j+1], T[i-1][j]);
                    }
                }
            }
        }

        // trace maximum ones starting from the first cell
        int i = 1, j = 1;
        int result = T[i][j];

        while (i <= M && j >= 0 && j <= N)
        {
            if (T[i][j] == T[i+1][j] || T[i][j] + 1 == T[i+1][j]) {
                i++;
            }
            else if (T[i][j] == T[i][j+1] || T[i][j] + 1 == T[i][j+1]) {
                j++;
            }
            else if (T[i][j] == T[i][j-1] || T[i][j] + 1 == T[i][j-1]) {
                j--;
            }
            else {
                break;
            }

            result = T[i][j];
        }

        return result;
    }

    public static void main(String[] args)
    {
        int[][] mat =
        {
            { 1, 1, -1, 1, 1 },
            { 1, 0, 0, -1, 1 },
            { 1, 1, 1, 1, -1 },
            { -1, -1, 1, 1, 1 },
            { 1, 1, -1, -1, 1 }
        };

        System.out.println("The maximum value collected is " + findMaximum(mat));
    }
}
```

##

```python3
# Function to collect maximum value from the first cell (0, 0)
def findMaximum(mat):

    # base case
    if not mat or not len(mat):
        return

    # `M × N` matrix
    (M, N) = (len(mat), len(mat[0]))

    # `T[i][j]` stores the maximum value that can be collected
    # from any cell to cell (i-1, j-1)
    T = [[0 for x in range(N + 1)] for y in range(M + 1)]

    # process each row one by one and fill the lookup table `T`
    for i in range(1, M + 1):

        # handle odd and even row separately
        if i & 1:
            # process current row from left to right
            for j in range(1, N + 1):
                if mat[i - 1][j - 1] != -1:
                    T[i][j] = mat[i - 1][j - 1] + max(T[i][j - 1], T[i - 1][j])

        else:
            # process current row from right to left
            for j in range(N - 1, 0, -1):
                if mat[i - 1][j - 1] != -1:
                    T[i][j] = mat[i - 1][j - 1] + max(T[i][j + 1], T[i - 1][j])

    # trace maximum ones starting from the first cell
    i = j = 1
    result = T[i][j]

    while i <= M and 0 <= j <= N:
        if T[i][j] == T[i + 1][j] or T[i][j] + 1 == T[i + 1][j]:
            i = i + 1
        elif T[i][j] == T[i][j + 1] or T[i][j] + 1 == T[i][j + 1]:
            j = j + 1
        elif T[i][j] == T[i][j - 1] or T[i][j] + 1 == T[i][j - 1]:
            j = j - 1
        else:
            break

        result = T[i][j]

    return result

if __name__ == '__main__':

    mat = [
        [1, 1, -1, 1, 1],
        [1, 0, 0, -1, 1],
        [1, 1, 1, 1, -1],
        [-1, -1, 1, 1, 1],
        [1, 1, -1, -1, 1]
    ]

    print("The maximum value collected is", findMaximum(mat))
```

The time complexity of the proposed solution is O(M × N) for an `M × N` matrix. The auxiliary space required by the program is O(M × N).
