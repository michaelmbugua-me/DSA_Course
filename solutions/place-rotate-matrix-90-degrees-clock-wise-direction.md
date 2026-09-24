# In-place rotate matrix by 90 degrees in a clockwise direction

> Source: https://www.techiedelight.com/place-rotate-matrix-90-degrees-clock-wise-direction/

[Matrix](https://www.techiedelight.com/Category/Matrix/)

Given a square matrix, rotate the matrix by 90 degrees in a clockwise direction. The transformation should be done [in-place](https://techiedelight.com/in-place-vs-out-of-place-algorithms/) and in quadratic time.

For example,

**Input:** 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 **Output:** 13 9 5 1 14 10 6 2 15 11 7 3 16 12 8 4

> 

The idea is to in-place convert the matrix into its transpose first. If we swap the first column with the last column, the second column with the second last column, and so on… we will get our desired matrix.

Following is the implementation in C++, Java, and Python based on the above idea:

```cpp
#include <iostream>
#include <algorithm>
#include <vector>
#include <iomanip>
using namespace std;

// In-place rotate it by 90 degrees in a clockwise direction
void rotate(vector<vector<int>> &mat)
{
    // `N × N` matrix
    int N = mat.size();

    // base case
    if (N == 0) {
        return;
    }

    // Transpose the matrix
    for (int i = 0; i < N; i++)
    {
        for (int j = 0; j < i; j++) {
            swap(mat[i][j], mat[j][i]);
        }
    }

    // swap columns
    for (int i = 0; i < N; i++)
    {
        for (int j = 0; j < N/2; j++) {
            swap(mat[i][j], mat[i][N - j - 1]);
        }
    }
}

// Function to print the matrix
void printMatrix(vector<vector<int>> const &mat)
{
    for (auto &row: mat) {
        for (auto &i: row) {
            cout << setw(3) << i;
        }
        cout << endl;
    }
    cout << endl;
}

int main()
{
    vector<vector<int>> mat =
    {
        { 1, 2, 3, 4 },
        { 5, 6, 7, 8 },
        { 9, 10, 11, 12 },
        { 13, 14, 15, 16 }
    };

    rotate(mat);
    printMatrix(mat);

    return 0;
}
```

**Output:** 13 9 5 1 14 10 6 2 15 11 7 3 16 12 8 4

##

```java
import java.util.Arrays;

class Main
{
    // In-place rotate it by 90 degrees in a clockwise direction
    public static void rotate(int[][] mat)
    {
        // base case
        if (mat == null || mat.length == 0) {
            return;
        }

        // `N × N` matrix
        int N = mat.length;

        // Transpose the matrix
        for (int i = 0; i < N; i++)
        {
            for (int j = 0; j < i; j++)
            {
                int temp = mat[i][j];
                mat[i][j] = mat[j][i];
                mat[j][i] = temp;
            }
        }

        // swap columns
        for (int i = 0; i < N; i++)
        {
            for (int j = 0; j < N / 2; j++)
            {
                int temp = mat[i][j];
                mat[i][j] = mat[i][N - j - 1];
                mat[i][N - j - 1] = temp;
            }
        }
    }

    public static void main(String[] args)
    {
        int[][] mat =
        {
            { 1, 2, 3, 4 },
            { 5, 6, 7, 8 },
            { 9, 10, 11, 12 },
            { 13, 14, 15, 16 }
        };

        rotate(mat);

        for (var r: mat) {
            System.out.println(Arrays.toString(r));
        }
    }
}
```

##

```python3
# In-place rotate it by 90 degrees in a clockwise direction
def rotate(mat):

    # base case
    if not mat or not len(mat):
        return

    # `N × N` matrix
    N = len(mat)

    # Transpose the matrix
    for i in range(N):
        for j in range(i):
            temp = mat[i][j]
            mat[i][j] = mat[j][i]
            mat[j][i] = temp

    # swap columns
    for i in range(N):
        for j in range(N // 2):
            temp = mat[i][j]
            mat[i][j] = mat[i][N - j - 1]
            mat[i][N - j - 1] = temp

if __name__ == '__main__':

    mat = [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
        [13, 14, 15, 16]
    ]

    rotate(mat)

    for r in mat:
        print(r)
```

If we were asked to rotate the matrix in an anti-clockwise manner, we could easily do that, too, using the same logic. The only difference is that instead of swapping columns, we swap rows.

```cpp
#include <iostream>
#include <algorithm>
#include <vector>
#include <iomanip>
using namespace std;

// In-place rotate it by 90 degrees in an anti-clockwise direction
void rotate(vector<vector<int>> &mat)
{
    // `N × N` matrix
    int N = mat.size();

    // base case
    if (N == 0) {
        return;
    }

    // Transpose the matrix
    for (int i = 0; i < N; i++)
    {
        for (int j = 0; j < i; j++) {
            swap(mat[i][j], mat[j][i]);
        }
    }

    // swap rows
    for (int i = 0; i < N/2; i++)
    {
        for (int j = 0; j < N; j++) {
            swap(mat[i][j], mat[N - i - 1][j]);
        }
    }
}

// Function to print the matrix
void printMatrix(vector<vector<int>> const &mat)
{
    for (auto &row: mat) {
        for (auto &i: row) {
            cout << setw(3) << i;
        }
        cout << endl;
    }
    cout << endl;
}

int main()
{
    vector<vector<int>> mat =
    {
        { 1, 2, 3, 4 },
        { 5, 6, 7, 8 },
        { 9, 10, 11, 12 },
        { 13, 14, 15, 16 }
    };

    rotate(mat);
    printMatrix(mat);

    return 0;
}
```

**Output:** 4 8 12 16 3 7 11 15 2 6 10 14 1 5 9 13

##

```java
import java.util.Arrays;

class Main
{
    // In-place rotate it by 90 degrees in an anti-clockwise direction
    public static void rotate(int[][] mat)
    {
        // base case
        if (mat == null || mat.length == 0) {
            return;
        }

        // `N × N` matrix
        int N = mat.length;

        // Transpose the matrix
        for (int i = 0; i < N; i++)
        {
            for (int j = 0; j < i; j++)
            {
                // swap `mat[i][j]` with `mat[j][i]`
                int temp = mat[i][j];
                mat[i][j] = mat[j][i];
                mat[j][i] = temp;
            }
        }

        // swap rows
        for (int i = 0; i < N/2; i++)
        {
            for (int j = 0; j < N; j++)
            {
                // swap `mat[i][j]` with `mat[N-i-1][j]`
                int temp = mat[i][j];
                mat[i][j] = mat[N-i-1][j];
                mat[N-i-1][j] = temp;
            }
        }
    }

    public static void main(String[] args)
    {
        // `N × N` matrix
        int[][] mat =
        {
            { 1, 2, 3, 4 },
            { 5, 6, 7, 8 },
            { 9, 10, 11, 12 },
            { 13, 14, 15, 16 }
        };

        rotate(mat);

        for (var r: mat) {
            System.out.println(Arrays.toString(r));
        }
    }
}
```

##

```python3
# In-place rotate it by 90 degrees in an anti-clockwise direction
def rotate(mat):

    # base case
    if not mat or not len(mat):
        return

    # `N × N` matrix
    N = len(mat)

    # Transpose the matrix
    for i in range(N):
        for j in range(i):
            # swap `mat[i][j]` with `mat[j][i]`
            temp = mat[i][j]
            mat[i][j] = mat[j][i]
            mat[j][i] = temp

    # swap rows
    for i in range(N // 2):
        for j in range(N):
            # swap `mat[i][j]` with `mat[N-i-1][j]`
            temp = mat[i][j]
            mat[i][j] = mat[N - i - 1][j]
            mat[N - i - 1][j] = temp

if __name__ == '__main__':

    # `N × N` matrix
    mat = [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
        [13, 14, 15, 16]
    ]

    rotate(mat)
    for r in mat:
        print(r)
```

The time complexity of the proposed solution is O(N2) for an `N × N` matrix and doesn’t require any extra space.

**Exercise:** In-place rotate the matrix by 180 degrees
