# Print matrix in spiral order

> Source: https://www.techiedelight.com/print-matrix-spiral-order/

[Matrix](https://www.techiedelight.com/Category/Matrix/)

Given an `M × N` integer matrix, print it in spiral order.

For example,

**Input:** [ 1 2 3 4 5 ] [ 16 17 18 19 6 ] [ 15 24 25 20 7 ] [ 14 23 22 21 8 ] [ 13 12 11 10 9 ] **Output:** 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25

> 

The idea is to read elements from the given matrix and print the matrix in spiral order. Four loops are used to maintain the spiral order, each for the top, right, bottom, and left corner of the matrix.

Following is the C++, Java, and Python implementation of the idea:

```cpp
#include <iostream>
#include <vector>
using namespace std;

void printSpiralOrder(vector<vector<int>> const &mat)
{
    // base case
    if (mat.size() == 0) {
        return;
    }

    int top = 0, bottom = mat.size() - 1;
    int left = 0, right = mat[0].size() - 1;

    while (1)
    {
        if (left > right) {
            break;
        }
        // print top row
        for (int i = left; i <= right; i++) {
            cout << mat[top][i] << " ";
        }
        top++;

        if (top > bottom) {
            break;
        }
        // print right column
        for (int i = top; i <= bottom; i++) {
            cout << mat[i][right] << " ";
        }
        right--;

        if (left > right) {
            break;
        }
        // print bottom row
        for (int i = right; i >= left; i--) {
            cout << mat[bottom][i] << " ";
        }
        bottom--;

        if (top > bottom) {
            break;
        }
        // print left column
        for (int i = bottom; i >= top; i--) {
            cout << mat[i][left] << " ";
        }
        left++;
    }
}

int main()
{
    vector<vector<int>> mat =
    {
        { 1, 2, 3, 4, 5},
        {16, 17, 18, 19, 6},
        {15, 24, 25, 20, 7},
        {14, 23, 22, 21, 8},
        {13, 12, 11, 10, 9}
    };

    printSpiralOrder(mat);

    return 0;
}
```

**Output:** 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25

##

```java
class Main
{
    private static void printSpiralOrder(int[][] mat)
    {
        // base case
        if (mat == null || mat.length == 0) {
            return;
        }

        int top = 0, bottom = mat.length - 1;
        int left = 0, right = mat[0].length - 1;

        while (true)
        {
            if (left > right) {
                break;
            }

            // print top row
            for (int i = left; i <= right; i++) {
                System.out.print(mat[top][i] + " ");
            }
            top++;

            if (top > bottom) {
                break;
            }

            // print right column
            for (int i = top; i <= bottom; i++) {
                System.out.print(mat[i][right] + " ");
            }
            right--;

            if (left > right) {
                break;
            }

            // print bottom row
            for (int i = right; i >= left; i--) {
                System.out.print(mat[bottom][i] + " ");
            }
            bottom--;

            if (top > bottom) {
                break;
            }

            // print left column
            for (int i = bottom; i >= top; i--) {
                System.out.print(mat[i][left] + " ");
            }
            left++;
        }
    }

    public static void main(String[] args)
    {
        int[][] mat =
        {
            { 1, 2, 3, 4, 5},
            {16, 17, 18, 19, 6},
            {15, 24, 25, 20, 7},
            {14, 23, 22, 21, 8},
            {13, 12, 11, 10, 9}
        };

        printSpiralOrder(mat);
    }
}
```

##

```python3
def printSpiralOrder(mat):

    # base case
    if not mat or not len(mat):
        return

    top = left = 0
    bottom = len(mat) - 1
    right = len(mat[0]) - 1

    while True:
        if left > right:
            break

        # print top row
        for i in range(left, right + 1):
            print(mat[top][i], end=' ')
        top = top + 1

        if top > bottom:
            break

        # print right column
        for i in range(top, bottom + 1):
            print(mat[i][right], end=' ')
        right = right - 1

        if left > right:
            break

        # print bottom row
        for i in range(right, left - 1, -1):
            print(mat[bottom][i], end=' ')
        bottom = bottom - 1

        if top > bottom:
            break

        # print left column
        for i in range(bottom, top - 1, -1):
            print(mat[i][left], end=' ')
        left = left + 1

if __name__ == '__main__':

    mat = [
        [1, 2, 3, 4, 5],
        [16, 17, 18, 19, 6],
        [15, 24, 25, 20, 7],
        [14, 23, 22, 21, 8],
        [13, 12, 11, 10, 9]
    ]

    printSpiralOrder(mat)
```

We can also achieve this easily with the help of [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/).

```cpp
#include <iostream>
#include <vector>
using namespace std;

void printSpiral(vector<vector<int>> const &mat, int top, int bottom, int left, int right)
{
    // base case
    if (mat.size() == 0 || left > right) {
        return;
    }

    // print top row
    for (int i = left; i <= right; i++) {
        cout << mat[top][i] << " ";
    }
    top++;

    if (top > bottom) {
        return;
    }
    // print right column
    for (int i = top; i <= bottom; i++) {
        cout << mat[i][right] << " ";
    }
    right--;

    if (left > right) {
        return;
    }
    // print bottom row
    for (int i = right; i >= left; i--) {
        cout << mat[bottom][i] << " ";
    }
    bottom--;

    if (top > bottom) {
        return;
    }
    // print left column
    for (int i = bottom; i >= top; i--) {
        cout << mat[i][left] << " ";
    }
    left++;

    printSpiral(mat, top, bottom, left, right);

}

int main()
{
    vector<vector<int>> mat =
    {
        { 1, 2, 3, 4, 5},
        {16, 17, 18, 19, 6},
        {15, 24, 25, 20, 7},
        {14, 23, 22, 21, 8},
        {13, 12, 11, 10, 9}
    };

    int top = 0, bottom = mat.size() - 1;
    int left = 0, right = mat[0].size() - 1;

    printSpiral(mat, top, bottom, left, right);

    return 0;
}
```

**Output:** 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25

##

```java
class Main
{
    private static void printSpiral(int mat[][], int top, int bottom,
                                    int left, int right)
    {
        // base case
        if (mat == null || mat.length == 0 || left > right) {
            return;
        }

        // print top row
        for (int i = left; i <= right; i++) {
            System.out.print(mat[top][i] + " ");
        }
        top++;

        if (top > bottom) {
            return;
        }
        // print right column
        for (int i = top; i <= bottom; i++) {
            System.out.print(mat[i][right] + " ");
        }
        right--;

        if (left > right) {
            return;
        }
        // print bottom row
        for (int i = right; i >= left; i--) {
            System.out.print(mat[bottom][i] + " ");
        }
        bottom--;

        if (top > bottom) {
            return;
        }
        // print left column
        for (int i = bottom; i >= top; i--) {
            System.out.print(mat[i][left] + " ");
        }
        left++;

        printSpiral(mat, top, bottom, left, right);
    }

    public static void main(String[] args)
    {
        int[][] mat =
        {
            { 1, 2, 3, 4, 5},
            {16, 17, 18, 19, 6},
            {15, 24, 25, 20, 7},
            {14, 23, 22, 21, 8},
            {13, 12, 11, 10, 9}
        };

        int top = 0, bottom = mat.length - 1;
        int left = 0, right = mat[0].length - 1;

        printSpiral(mat, top, bottom, left, right);
    }
}
```

##

```python3
def printSpiral(mat, top, bottom, left, right):

    # base case
    if not mat or not len(mat) or left > right:
        return

    # print top row
    for i in range(left, right + 1):
        print(mat[top][i], end=' ')

    top = top + 1

    if top > bottom:
        return

    # print right column
    for i in range(top, bottom + 1):
        print(mat[i][right], end=' ')

    right = right - 1

    if left > right:
        return

    # print bottom row
    for i in range(right, left - 1, -1):
        print(mat[bottom][i], end=' ')

    bottom = bottom - 1

    if top > bottom:
        return

    # print left column
    for i in range(bottom, top - 1, -1):
        print(mat[i][left], end=' ')

    left = left + 1

    printSpiral(mat, top, bottom, left, right)

if __name__ == '__main__':

    mat = [
        [1, 2, 3, 4, 5],
        [16, 17, 18, 19, 6],
        [15, 24, 25, 20, 7],
        [14, 23, 22, 21, 8],
        [13, 12, 11, 10, 9]
    ]

    top = 0
    bottom = len(mat) - 1
    left = 0
    right = len(mat[0]) - 1

    printSpiral(mat, top, bottom, left, right)
```

The time complexity of the proposed solution is O(M × N) for an `M × N` matrix. The auxiliary space required by the program is O(M × N) for recursion (call stack).
