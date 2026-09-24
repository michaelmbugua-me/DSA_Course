# Count all paths in a matrix from the first cell to the last cell

> Source: https://www.techiedelight.com/count-all-paths-matrix-from-first-cell-to-last-cell/

Given an `M × N` rectangular grid, efficiently count all paths starting from the first cell `(0, 0)` to the last cell `(M-1, N-1)`. We can either move down or move towards right from a cell.

For example,

**Input:** 3 × 3 matrix **Output:** Total number of paths are 6 (0, 0) —> (0, 1) —> (0, 2) —> (1, 2) —> (2, 2) (0, 0) —> (0, 1) —> (1, 1) —> (1, 2) —> (2, 2) (0, 0) —> (0, 1) —> (1, 1) —> (2, 1) —> (2, 2) (0, 0) —> (1, 0) —> (2, 0) —> (2, 1) —> (2, 2) (0, 0) —> (1, 0) —> (1, 1) —> (1, 2) —> (2, 2) (0, 0) —> (1, 0) —> (1, 1) —> (2, 1) —> (2, 2)

> 

The idea is to start from the top-left corner of the matrix and recur for the next cell, which can be either the immediate right cell or the immediate bottom cell. We can easily maintain the path count as we move along in the recursion, as demonstrated below in C, Java, and Python:

```c
#include <stdio.h>

// Top-down recursive function to count all paths from cell (m, n)
// to the last cell (M-1, N-1) in a given `M × N` rectangular grid
int countPaths(int m, int n, int M, int N)
{
    // there is only one way to reach the last cell
    // when we are at the last row or the last column
    if (m == M - 1 || n == N - 1) {
        return 1;
    }

    return countPaths(m + 1, n, M, N)     // move down
        + countPaths(m, n + 1, M, N);     // move right
}

int main(void)
{
    // `M × N` matrix
    int M = 3;
    int N = 3;

    int k = countPaths(0, 0, M, N);
    printf("The total number of paths is %d", k);

    return 0;
}
```

**Output:** The total number of paths is 6

##

```java
class Main
{
    // Top-down recursive function to count all paths from cell (m, n)
    // to the last cell (M-1, N-1) in a given `M × N` rectangular grid
    public static int countPaths(int m, int n, int M, int N)
    {
        // there is only one way to reach the last cell
        // when we are at the last row or the last column
        if (m == M - 1 || n == N - 1) {
            return 1;
        }

        return countPaths(m + 1, n, M, N)     // move down
            + countPaths(m, n + 1, M, N);     // move right
    }

    public static void main(String[] args)
    {
        // `M × N` matrix
        int M = 3;
        int N = 3;

        int k = countPaths(0, 0, M, N);
        System.out.println("The total number of paths is " + k);
    }
}
```

##

```python3
# Top-down recursive function to count all paths from cell (m, n)
# to the last cell (M-1, N-1) in a given `M × N` rectangular grid
def countPaths(M, N, m=0, n=0):

    # there is only one way to reach the last cell
    # when we are at the last row or the last column
    if m == M - 1 or n == N - 1:
        return 1

    # move down or right
    return countPaths(M, N, m + 1, n) + countPaths(M, N, m, n + 1)

if __name__ == '__main__':

    # `M × N` matrix
    M = N = 3

    k = countPaths(M, N)
    print("Total number of paths are", k)
```

The time complexity of the proposed solution is exponential since it exhibits [overlapping subproblems](https://techiedelight.com/introduction-dynamic-programming/#overlapping-subproblems), i.e., it computes solutions to the same subproblems repeatedly. The problem also has an [optimal substructure](https://techiedelight.com/introduction-dynamic-programming/#optimal-substructure) as the solution to the problem can be derived using a solution to its subproblems. Since both [dynamic programming](https://techiedelight.com/dynamic-programming-interview-questions/) properties are satisfied, we can use it to optimize the code.

We can either store results of the function calls and return those results when the same input occurs again or construct an auxiliary matrix to store results of the smaller subproblems. The following code follows the later approach:

```c
#include <stdio.h>

// Bottom-up function to count all paths from the first cell (0, 0)
// to the last cell (M-1, N-1) in a given `M × N` rectangular grid
int countPaths(int m, int n)
{
    // `T[i][j]` stores the number of paths from cell (0, 0) to cell (i, j)
    int T[m][n];

    // There is only one way to reach any cell in the first column
    // i.e., to move down
    for (int i = 0; i < m; i++) {
        T[i][0] = 1;
    }

    // There is only one way to reach any cell in the first row
    // i.e., to move right
    for (int j = 0; j < n; j++) {
        T[0][j] = 1;
    }

    // fill `T[][]` in a bottom-up manner
    for (int i = 1; i < m; i++)
    {
        for (int j = 1; j < n; j++) {
            T[i][j] = T[i-1][j] + T[i][j-1];
        }
    }

    // last cell of `T[][]` stores the count of paths from cell (0, 0) to
    // cell (i, j)
    return T[m-1][n-1];
}

int main(void)
{
    // `M × N` matrix
    int M = 3;
    int N = 3;

    int k = countPaths(M, N);
    printf("The total number of paths is %d", k);

    return 0;
}
```

**Output:** The total number of paths is 6

##

```java
class Main
{
    // Bottom-up function to count all paths from the first cell (0, 0)
    // to the last cell (M-1, N-1) in a given `M × N` rectangular grid
    public static int countPaths(int m, int n)
    {
        // `T[i][j]` stores the number of paths from cell (0, 0) to cell (i, j)
        int[][] T = new int[m][n];

        // There is only one way to reach any cell in the first column, i.e.,
        // to move down
        for (int i = 0; i < m; i++) {
            T[i][0] = 1;
        }

        // There is only one way to reach any cell in the first row, i.e.,
        // to move right
        for (int j = 0; j < n; j++) {
            T[0][j] = 1;
        }

        // fill `T[][]` in a bottom-up manner
        for (int i = 1; i < m; i++)
        {
            for (int j = 1; j < n; j++) {
                T[i][j] = T[i-1][j] + T[i][j-1];
            }
        }

        // last cell of `T[][]` stores the count of paths from cell (0, 0) to
        // cell (i, j)
        return T[m-1][n-1];
    }

    public static void main(String[] args)
    {
        // `M × N` matrix
        int M = 3;
        int N = 3;

        int k = countPaths(M, N);
        System.out.println("The total number of paths is " + k);
    }
}
```

##

```python3
# Bottom-up function to count all paths from the first cell (0, 0)
# to the last cell (M-1, N-1) in a given `M × N` rectangular grid
def countPaths(m, n):

    # `T[i][j]` stores the number of paths from cell (0, 0) to cell (i, j)
    T = [[0 for x in range(n)] for y in range(m)]

    # There is only one way to reach any cell in the first column, i.e., to move down
    for i in range(m):
        T[i][0] = 1

    # There is only one way to reach any cell in the first row, i.e., to move right
    for j in range(n):
        T[0][j] = 1

    # fill `T` in a bottom-up manner
    for i in range(1, m):
        for j in range(1, n):
            T[i][j] = T[i-1][j] + T[i][j-1]

    # last cell of `T[][]` stores the count of paths from cell (0, 0) to cell
    # (i, j)
    return T[m-1][n-1]

if __name__ == '__main__':

    # `M × N` matrix
    M = N = 3

    k = countPaths(M, N)
    print("The total number of paths is", k)
```

The time complexity of the proposed solution is O(M × N) for an `M × N` matrix. The auxiliary space required by the program is O(M × N). The space complexity of the solution can be improved up to O(N) as we are only reading data of the previous row for filling the current row. Following is the space-optimized solution using only a single array:

```c
#include <stdio.h>

// Bottom-up space-efficient function to count all paths from the first
// cell (0, 0) to the last cell (M-1, N-1) in a given `M × N` rectangular grid
int countPaths(int m, int n)
{
    int T[n];
    T[0] = 1;

    // fill `T[][]` in a bottom-up manner
    for (int i = 0; i < m; i++)
    {
        for (int j = 1; j < n; j++) {
            T[j] += T[j - 1];
        }
    }

    // return the last cell
    return T[n-1];
}

int main(void)
{
    // `M × N` matrix
    int M = 3;
    int N = 3;

    int k = countPaths(M, N);
    printf("The total number of paths is %d", k);

    return 0;
}
```

**Output:** The total number of paths is 6
