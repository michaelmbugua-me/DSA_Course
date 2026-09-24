# Fill binary matrix with alternating rectangles of 0 and 1

> Source: https://www.techiedelight.com/fill-binary-matrix-alternating-rectangles-0-1/

[Matrix](https://www.techiedelight.com/Category/Matrix/)

Given an `M × N` binary matrix, fill it with alternating rectangles of 1’s and 0’s.

For example,

**Input:** 10 × 8 matrix **Output:** 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 1 1 0 1 1 1 1 0 1 1 0 1 0 0 1 0 1 1 0 1 0 0 1 0 1 1 0 1 0 0 1 0 1 1 0 1 0 0 1 0 1 1 0 1 1 1 1 0 1 1 0 0 0 0 0 0 1 1 1 1 1 1 1 1 1

> 

The idea is to fill the matrix by following the [spiral order](https://techiedelight.com/print-matrix-spiral-order/). All elements involved in each alternating run in spiral order are filled by either `0` or `1` based on input from the last run. Four loops are used to maintain the spiral order, each for the top, right, bottom, and left corner of the matrix.

Following is the implementation in C++, Java, and Python based on the above idea:

```cpp
#include <iostream>
#include <vector>
#include <iomanip>
using namespace std;

// Fill a binary matrix with alternating rectangles of 1's and 0's
void processMatrix(vector<vector<int>> &mat)
{
    int M = mat.size();
    int N = mat[0].size();

    int top = 0, bottom = M - 1;
    int left = 0, right = N - 1;
    bool flag = 1;

    while (true)
    {
        if (left > right) {
            break;
        }

        // set the top row
        for (int i = left; i <= right; i++) {
            mat[top][i] = flag;
        }
        top++;

        if (top > bottom) {
            break;
        }

        // set the right column
        for (int i = top; i <= bottom; i++) {
            mat[i][right] = flag;
        }
        right--;

        if (left > right) {
            break;
        }

        // set the bottom row
        for (int i = right; i >= left; i--) {
            mat[bottom][i] = flag;
        }
        bottom--;

        if (top > bottom) {
            break;
        }

        // set the left column
        for (int i = bottom; i >= top; i--) {
            mat[i][left] = flag;
        }
        left++;

        // invert the flag for the next run
        flag = !flag;
    }
}

int main()
{
    int M = 10;
    int N = 8;

    // create `M × N` matrix
    vector<vector<int>> mat(M, vector<int>(N));

    // fill the matrix
    processMatrix(mat);

    for (int i = 0; i < M; i++)
    {
        for (int j = 0; j < N; j++) {
            cout << setw(3) << mat[i][j];
        }
        cout << endl;
    }

    return 0;
}
```

##

```java
import java.util.Arrays;

class Main
{
    // Fill a binary matrix with alternating rectangles of 1's and 0's
    public static void processMatrix(int[][] mat, int M, int N)
    {
        // base case
        if (mat == null || mat.length == 0) {
            return;
        }

        int top = 0, bottom = mat.length - 1;
        int left = 0, right = mat[0].length - 1;
        boolean flag = true;

        while (true)
        {
            if (left > right) {
                break;
            }

            // set the top row
            for (int i = left; i <= right; i++) {
                mat[top][i] = (flag ? 1: 0);
            }
            top++;

            if (top > bottom) {
                break;
            }

            // set the right column
            for (int i = top; i <= bottom; i++) {
                mat[i][right] = (flag ? 1: 0);
            }
            right--;

            if (left > right) {
                break;
            }

            // set the bottom row
            for (int i = right; i >= left; i--) {
                mat[bottom][i] = (flag ? 1: 0);
            }
            bottom--;

            if (top > bottom) {
                break;
            }

            // set the left column
            for (int i = bottom; i >= top; i--) {
                mat[i][left] = (flag ? 1: 0);
            }
            left++;

            // invert the flag for the next run
            flag = !flag;
        }
    }

    public static void main(String[] args)
    {
        int M = 10;
        int N = 8;

        // create `M × N` matrix
        int[][] mat = new int[M][N];

        // fill the matrix
        processMatrix(mat, M, N);

        for (int[] row: mat) {
            System.out.println(Arrays.toString(row));
        }
    }
}
```

##

```python3
# Fill a binary matrix with alternating rectangles of 1's and 0's
def processMatrix(mat, M, N):

    # base case
    if not mat or not len(mat):
        return

    top = left = 0
    bottom = len(mat) - 1
    right = len(mat[0]) - 1

    flag = True

    while True:
        if left > right:
            break

        # set the top row
        for i in range(left, right + 1):
            mat[top][i] = (1 if flag else 0)
        top = top + 1

        if top > bottom:
            break

        # set the right column
        for i in range(top, bottom + 1):
            mat[i][right] = (1 if flag else 0)
        right = right - 1

        if left > right:
            break

        # set the bottom row
        for i in range(right, left-1, -1):
            mat[bottom][i] = (1 if flag else 0)
        bottom = bottom - 1

        if top > bottom:
            break

        # set the left column
        for i in range(bottom, top-1, -1):
            mat[i][left] = (1 if flag else 0)
        left = left + 1

        # invert the flag for the next run
        flag = not flag

if __name__ == '__main__':

    M = 10
    N = 8

    # create `M × N` matrix
    mat = [[0 for x in range(N)] for y in range(M)]

    # fill the matrix
    processMatrix(mat, M, N)

    for r in mat:
        print(r)
```

**Output:** 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 1 1 0 1 1 1 1 0 1 1 0 1 0 0 1 0 1 1 0 1 0 0 1 0 1 1 0 1 0 0 1 0 1 1 0 1 0 0 1 0 1 1 0 1 1 1 1 0 1 1 0 0 0 0 0 0 1 1 1 1 1 1 1 1 1

## Another Approach

An `M × N` matrix has `min(ceil(M/2), ceil(N/2))` rectangular cycles. A cycle is formed by `i'th` row, `(N-i+1)'th` column, `(M-i+1)'th` row, and `i'th` column where `i` varies from `1` to `min(ceil(M/2), ceil(N/2))`. The idea is for each rectangular cycle, associate a value to it. For the outer cycle, the value will be `0`; for the second cycle, the value will be `1`, and the third cycle will have a value of `2`, and so on… The following figure shows `4` cycles in a `10 × 8` matrix marked by the value `0–3`:

0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 0 0 1 2 2 2 2 1 0 0 1 2 3 3 2 1 0 0 1 2 3 3 2 1 0 0 1 2 3 3 2 1 0 0 1 2 3 3 2 1 0 0 1 2 2 2 2 1 0 0 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0

Depending upon whether the assigned value is odd or even for a matrix cell, assign `0` or `1` to the output matrix. The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
#include <iomanip>
using namespace std;

// Fill a binary matrix with alternating rectangles of 1's and 0's
int findValue(int i, int j, int M, int N)
{
    if (i > (M - i - 1)) {
        i = M - i - 1;
    }

    if (j > (N - j - 1)) {
        j = N - j - 1;
    }

    return i < j ? i : j;
}

void processMatrix(vector<vector<int>> &mat)
{
    // base case
    if (mat.size() == 0) {
        return;
    }

    // `M × N` matrix
    int M = mat.size();
    int N = mat[0].size();

    for (int i = 0; i < M; i++)
    {
        for (int j = 0; j < N; j++) {
            mat[i][j] = !(findValue(i, j, M, N) & 1);
        }
    }
}

int main()
{
    int M = 10;
    int N = 8;

    vector<vector<int>> mat(M, vector<int>(N, 0));
    processMatrix(mat);

    // print matrix
    for (auto row: mat) {
        for (int i: row) {
            cout << setw(3) << i << " ";
        }
        cout << endl;
    }

    return 0;
}
```

##

```java
import java.util.Arrays;

class Main
{
    // Fill a binary matrix with alternating rectangles of 1's and 0's
    private static int findValue(int i, int j, int M, int N)
    {
        if (i > (M - i - 1)) {
            i = M - i - 1;
        }

        if (j > (N - j - 1)) {
            j = N - j - 1;
        }

        return i < j ? i : j;
    }

    private static void processMatrix(int[][] mat)
    {
        // base case
        if (mat == null || mat.length == 0) {
            return;
        }

        // `M × N` matrix
        int M = mat.length;
        int N = mat[0].length;

        for (int i = 0; i < M; i++)
        {
            for (int j = 0; j < N; j++) {
                mat[i][j] = (findValue(i, j, M, N) & 1) == 0 ? 1 : 0;
            }
        }
    }

    public static void main(String[] args)
    {
        int M = 10;
        int N = 8;

        int[][] mat = new int[M][N];

        processMatrix(mat);

        // print matrix
        for (int i = 0; i < M; i++) {
            System.out.println(Arrays.toString(mat[i]));
        }
    }
}
```

##

```python3
# Fill a binary matrix with alternating rectangles of 1's and 0's
def findValue(i, j, M, N):

    if i > (M - i - 1):
        i = M - i - 1

    if j > (N - j - 1):
        j = N - j - 1

    return i if i < j else j

def processMatrix(mat):
    # base case
    if not mat or not len(mat):
        return

    # `M × N` matrix
    (M, N) = (len(mat), len(mat[0]))

    for i in range(M):
        for j in range(N):
            mat[i][j] = 1 if not (findValue(i, j, M, N) & 1) else 0

if __name__ == '__main__':

    M, N = 10, 8
    mat = [[0 for x in range(N)] for y in range(M)]

    processMatrix(mat)

    # print matrix
    for r in mat:
        print(r)
```

**Output:** 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 1 1 0 1 1 1 1 0 1 1 0 1 0 0 1 0 1 1 0 1 0 0 1 0 1 1 0 1 0 0 1 0 1 1 0 1 0 0 1 0 1 1 0 1 1 1 1 0 1 1 0 0 0 0 0 0 1 1 1 1 1 1 1 1 1

The time complexity of the proposed solution is O(M × N) for an `M × N` matrix and doesn’t require any extra space.
