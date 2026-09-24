# Change all elements of row `i` and column `j` in a matrix to 0 if cell `(i, j)` is 0

> Source: https://www.techiedelight.com/change-elements-row-column-j-matrix-0-cell-j-value-0/

[Matrix](https://www.techiedelight.com/Category/Matrix/)

Given an `M × N` matrix consisting of only `0` or `1`, change all elements of row `i` and column `j` to `0` if cell `(i, j)` has value `0`. Do this without using any extra space for every `(i, j)` having value `0`.

For example,

**Input:** [ 1 1 0 1 1 ] [ 1 1 1 1 1 ] [ 1 1 1 0 1 ] [ 1 1 1 1 1 ] [ 0 1 1 1 1 ] **Output:** [ 0 0 0 0 0 ] [ 0 1 0 0 1 ] [ 0 0 0 0 0 ] [ 0 1 0 0 1 ] [ 0 0 0 0 0 ] **Explanation:** 0’s are present at (0, 2), (4, 0), and (2, 3) in the input matrix. So, we change all elements of the following cells to 0:

  * row 0 and column 2
  * row 4 and column 0
  * row 2 and column 3

> 

A simple solution is to traverse the matrix and if we encounter any cell `(i, j)` that has value `0`, change each element in the row `i` and column `j` to some arbitrary value other than `0` or `1`. Later traverse the matrix once again and replace all elements with assigned value to `0`.

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
using namespace std;

// Function to print the matrix
void printMatrix(vector<vector<int>> const &mat)
{
    for (auto &row: mat) {
        for (auto &i: row) {
            cout << i << " ";
        }
        cout << endl;
    }
    cout << endl;
}

// Function to change all elements of row `x` and column `y` to -1
void changeRowColumn(vector<vector<int>> &mat, int x, int y)
{
    // `M × N` matrix
    int M = mat.size();
    int N = mat[0].size();

    for (int j = 0; j < N; j++)
    {
        if (mat[x][j] != 0) {
            mat[x][j] = -1;
        }
    }

    for (int i = 0; i < M; i++)
    {
        if (mat[i][y] != 0) {
            mat[i][y] = -1;
        }
    }
}

// Function to convert the matrix
void convert(vector<vector<int>> &mat)
{
    // base case
    if (mat.size() == 0) {
        return;
    }

    // `M × N` matrix
    int M = mat.size();
    int N = mat[0].size();

    // traverse the matrix
    for (int i = 0; i < M; i++)
    {
        for (int j = 0; j < N; j++)
        {
            if (mat[i][j] == 0)            // cell `(i, j)` has value 0
            {
                // change each non-zero element in row `i` and column `j` to -1
                changeRowColumn(mat, i, j);
            }
        }
    }

    // traverse the matrix once again and replace cells having
    // value -1 with 0
    for (int i = 0; i < M; i++)
    {
        for (int j = 0; j < N; j++)
        {
            if (mat[i][j] == -1) {
                mat[i][j] = 0;
            }
        }
    }
}

int main()
{
    vector<vector<int>> mat =
    {
        { 1, 1, 0, 1, 1 },
        { 1, 1, 1, 1, 1 },
        { 1, 1, 0, 1, 1 },
        { 1, 1, 1, 1, 1 },
        { 0, 1, 1, 1, 1 }
    };

    // convert the matrix
    convert(mat);

    // print matrix
    printMatrix(mat);

    return 0;
}
```

**Output:** 0 0 0 0 0 0 1 0 1 1 0 0 0 0 0 0 1 0 1 1 0 0 0 0 0

##

```java
import java.util.Arrays;

class Main
{
    // Function to change all elements of row `x` and column `y` to -1
    public static void changeRowColumn(int[][] mat, int M, int N, int x, int y)
    {
        for (int j = 0; j < N; j++)
        {
            if (mat[x][j] != 0) {
                mat[x][j] = -1;
            }
        }

        for (int i = 0; i < M; i++)
        {
            if (mat[i][y] != 0) {
                mat[i][y] = -1;
            }
        }
    }

    // Function to convert the matrix
    public static void convert(int[][] mat)
    {
        // base case
        if (mat == null || mat.length == 0) {
            return;
        }

        // `M × N` matrix
        int M = mat.length;
        int N = mat[0].length;

        // traverse the matrix
        for (int i = 0; i < M; i++)
        {
            for (int j = 0; j < N; j++)
            {
                if (mat[i][j] == 0)            // cell `(i, j)` has value 0
                {
                    // change each non-zero element in row `i` and column `j` to -1
                    changeRowColumn(mat, M, N, i, j);
                }
            }
        }

        // traverse the matrix once again and replace cells having
        // value -1 with 0
        for (int i = 0; i < M; i++)
        {
            for (int j = 0; j < N; j++)
            {
                if (mat[i][j] == -1) {
                    mat[i][j] = 0;
                }
            }
        }
    }

    public static void main(String[] args)
    {
        int[][] mat =
        {
            { 1, 1, 0, 1, 1 },
            { 1, 1, 1, 1, 1 },
            { 1, 1, 0, 1, 1 },
            { 1, 1, 1, 1, 1 },
            { 0, 1, 1, 1, 1 }
        };

        // convert the matrix
        convert(mat);

        // print matrix
        for (var r: mat) {
            System.out.println(Arrays.toString(r));
        }
    }
}
```

##

```python3
# Function to change all elements of row `x` and column `y` to -1
def changeRowColumn(mat, M, N, x, y):

    for j in range(N):
        if mat[x][j]:
            mat[x][j] = -1

    for i in range(M):
        if mat[i][y]:
            mat[i][y] = -1

# Function to convert the matrix
def convert(mat):

    # base case
    if not mat or not len(mat):
        return

    # `M × N` matrix
    (M, N) = (len(mat), len(mat[0]))

    # traverse the matrix
    for i in range(M):
        for j in range(N):
            if mat[i][j] == 0:      # cell `(i, j)` has value 0
                # change each non-zero element in row `i` and column `j` to -1
                changeRowColumn(mat, M, N, i, j)

    # traverse the matrix once again and replace cells having
    # value -1 with 0
    for i in range(M):
        for j in range(N):
            if mat[i][j] == -1:
                mat[i][j] = 0

if __name__ == '__main__':

    mat = [
        [1, 1, 0, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 0, 1, 1],
        [1, 1, 1, 1, 1],
        [0, 1, 1, 1, 1]
    ]

    # convert the matrix
    convert(mat)

    # print matrix
    for r in mat:
        print(r)
```

The time complexity of the proposed solution is O(M × N × (M + N)), which is not efficient for an `M × N` matrix.

We can solve this problem in O(M × N) time as well. The idea is to traverse the matrix once and use the first row and the first column (or last row and last column) to mark if any cell in the corresponding row or column has a value `0` or not. Before doing that, initially mark if the chosen row/column has any `0's` present in them in two different flags.

Following is the C++, Java, and Python implementation of the idea. Note that this method will work for any integer matrix (not just binary matrix).

```cpp
#include <iostream>
#include <vector>
using namespace std;

// Function to print the matrix
void printMatrix(vector<vector<int>> const &mat)
{
    for (auto &row: mat) {
        for (auto &i: row) {
            cout << i << " ";
        }
        cout << endl;
    }
    cout << endl;
}

// Function to convert the matrix
void convert(vector<vector<int>> &mat)
{
    // base case
    if (mat.size() == 0) {
        return;
    }

    // `M × N` matrix
    int M = mat.size();
    int N = mat[0].size();

    bool rowFlag = false, colFlag = false;

    // scan the first row for any 0's
    for (int j = 0; j < N; j++)
    {
        if (!mat[0][j])
        {
            rowFlag = true;
            break;
        }
    }

    // scan the first column for any 0's
    for (int i = 0; i < M; i++)
    {
        if (!mat[i][0])
        {
            colFlag = true;
            break;
        }
    }

    // process the rest of the matrix and use the first row and the
    // first column to mark if any cell in the corresponding
    // row or column has a value 0 or not
    for (int i = 1; i < M; i++)
    {
        for (int j = 1; j < N; j++)
        {
            if (!mat[i][j]) {
                mat[0][j] = mat[i][0] = 0;
            }
        }
    }

    // if `(0, j)` or `(i, 0)` is 0, assign 0 to cell `(i, j)`
    for (int i = 1; i < M; i++)
    {
        for (int j = 1; j < N; j++)
        {
            if (!mat[0][j] || !mat[i][0]) {
                mat[i][j] = 0;
            }
        }
    }

    // if `rowFlag` is true, then assign 0 to all cells of the first row
    for (int i = 0; rowFlag && i < N; i++) {
        mat[0][i] = 0;
    }

    // if `colFlag` is true, then assign 0 to all cells of the first column
    for (int i = 0; colFlag && i < M; i++) {
        mat[i][0] = 0;
    }
}

int main()
{
    vector<vector<int>> mat =
    {
        { 5, 3, 0, 8, 1 },
        { 8, 1, 8, 4, 7 },
        { 2, 6, 5, 0, 3 },
        { 1, 4, 2, 7, 9 },
        { 0, 1, 3, 6, 5 }
    };

    // convert the matrix
    convert(mat);

    // print matrix
    printMatrix(mat);

    return 0;
}
```

**Output:** 0 0 0 0 0 0 1 0 0 7 0 0 0 0 0 0 4 0 0 9 0 0 0 0 0

##

```java
import java.util.Arrays;

class Main
{
    // Function to convert the matrix
    private static void convert(int[][] mat)
    {
        // base case
        if (mat == null || mat.length == 0) {
            return;
        }

        int M = mat.length;
        int N = mat[0].length;

        boolean rowFlag = false, colFlag = false;

        // scan the first row for any 0's
        for (int j = 0; j < N; j++)
        {
            if (mat[0][j] == 0)
            {
                rowFlag = true;
                break;
            }
        }

        // scan the first column for any 0's
        for (int i = 0; i < M; i++)
        {
            if (mat[i][0] == 0)
            {
                colFlag = true;
                break;
            }
        }

        // process the rest of the matrix and use the first row and the
        // first column to mark if any cell in the corresponding
        // row or column has a value 0 or not
        for (int i = 1; i < M; i++)
        {
            for (int j = 1; j < N; j++)
            {
                if (mat[i][j] == 0) {
                    mat[0][j] = mat[i][0] = 0;
                }
            }
        }

        // if `(0, j)` or `(i, 0)` is 0, assign 0 to cell `(i, j)`
        for (int i = 1; i < M; i++)
        {
            for (int j = 1; j < N; j++)
            {
                if (mat[0][j] == 0 || mat[i][0] == 0) {
                    mat[i][j] = 0;
                }
            }
        }

        // if `rowFlag` is true, then assign 0 to all cells of the first row
        for (int i = 0; rowFlag && i < N; i++) {
            mat[0][i] = 0;
        }

        // if `colFlag` is true, then assign 0 to all cells of the first column
        for (int i = 0; colFlag && i < M; i++) {
            mat[i][0] = 0;
        }
    }

    public static void main(String[] args)
    {
        int[][] mat =
        {
            { 5, 3, 0, 8, 1 },
            { 8, 1, 8, 4, 7 },
            { 2, 6, 5, 0, 3 },
            { 1, 4, 2, 7, 9 },
            { 0, 1, 3, 6, 5 }
        };

        // convert the matrix
        convert(mat);

        // print matrix
        for (var r: mat) {
            System.out.println(Arrays.toString(r));
        }
    }
}
```

##

```python3
# Function to convert the matrix
def convert(mat):

    # base case
    if not mat or not len(mat):
        return

    (M, N) = (len(mat), len(mat[0]))

    rowFlag = colFlag = False

    # scan the first row for any 0's
    for j in range(N):
        if mat[0][j] == 0:
            rowFlag = True
            break

    # scan the first column for any 0's
    for i in range(M):
        if mat[i][0] == 0:
            colFlag = True
            break

    # process the rest of the matrix and use the first row and the
    # first column to mark if any cell in the corresponding
    # row or column has a value 0 or not
    for i in range(1, M):
        for j in range(1, N):
            if mat[i][j] == 0:
                mat[0][j] = mat[i][0] = 0

    # if `(0, j)` or `(i, 0)` is 0, assign 0 to cell `(i, j)`
    for i in range(1, M):
        for j in range(1, N):
            if mat[0][j] == 0 or mat[i][0] == 0:
                mat[i][j] = 0

    # if `rowFlag` is true, then assign 0 to all cells of the first row
    i = 0
    while rowFlag and i < N:
        mat[0][i] = 0
        i = i + 1

    # if `colFlag` is true, then assign 0 to all cells of the first column
    i = 0
    while colFlag and i < M:
        mat[i][0] = 0
        i = i + 1

if __name__ == '__main__':

    mat = [
        [5, 3, 0, 8, 1],
        [8, 1, 8, 4, 7],
        [2, 6, 5, 0, 3],
        [1, 4, 2, 7, 9],
        [0, 1, 3, 6, 5]
    ]

    # convert the matrix
    convert(mat)

    for r in mat:
        print(r)
```
