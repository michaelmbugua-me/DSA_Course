# Shift all matrix elements by 1 in spiral order

> Source: https://www.techiedelight.com/shift-matrix-elements-1-spiral-order/

[Matrix](https://www.techiedelight.com/Category/Matrix/)

Given an `M × N` integer matrix, shift all its elements by `1` in spiral order.

For example,

**Input:** [ 1 2 3 4 5 ] [ 16 17 18 19 6 ] [ 15 24 25 20 7 ] [ 14 23 22 21 8 ] [ 13 12 11 10 9 ] **Output:** [ 25 1 2 3 4 ] [ 15 16 17 18 5 ] [ 14 23 24 19 6 ] [ 13 22 21 20 7 ] [ 12 11 10 9 8 ]

> 

**Recommended Read:**

> [Print matrix in spiral order](https://techiedelight.com/print-matrix-spiral-order/)

We can easily solve this problem by reading elements from the given matrix one by one in spiral order and replacing them with their previous elements. Four loops are used to maintain the spiral order, each for the top, right, bottom, and left corner of the matrix.

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
#include <iomanip>
using namespace std;

// Shift all matrix elements by 1 in spiral order
void shiftMatrix(vector<vector<int>> &mat)
{
    // base case
    if (mat.size() == 0) {
        return;
    }

    int top = 0, bottom = mat.size() - 1;
    int left = 0, right = mat[0].size() - 1;
    int prev = mat[0][0];

    while (true)
    {
        if (left > right) {
            break;
        }

        // change top row
        for (int i = left; i <= right; i++) {
            swap(mat[top][i], prev);
        }

        top++;

        if (top > bottom) {
            break;
        }

        // change right column
        for (int i = top; i <= bottom; i++) {
            swap(mat[i][right], prev);
        }

        right--;

        if (left > right) {
            break;
        }

        // change bottom row
        for (int i = right; i >= left; i--) {
            swap(mat[bottom][i], prev);
        }

        bottom--;

        if (top > bottom) {
            break;
        }

        // change left column
        for (int i = bottom; i >= top; i--) {
            swap(mat[i][left], prev);
        }

        left++;
    }

    // the first element of the matrix will be the last element replaced
    mat[0][0] = prev;
}

int main()
{
    vector<vector<int>> matrix =
    {
        { 1, 2, 3, 4, 5},
        {16, 17, 18, 19, 6},
        {15, 24, 25, 20, 7},
        {14, 23, 22, 21, 8},
        {13, 12, 11, 10, 9}
    };

    shiftMatrix(matrix);

    for (auto &row: matrix) {
        for (auto &i: row) {
            cout << setw(3) << i;
        }
        cout << endl;
    }

    return 0;
}
```

**Output:** 25 1 2 3 4 15 16 17 18 5 14 23 24 19 6 13 22 21 20 7 12 11 10 9 8

##

```java
import java.util.Arrays;

class Main
{
    // Shift all matrix elements by 1 in spiral order
    public static void shiftMatrix(int[][] mat)
    {
        // base case
        if (mat == null || mat.length == 0) {
            return;
        }

        int top = 0, bottom = mat.length - 1;
        int left = 0, right = mat[0].length - 1;
        int prev = mat[0][0];

        while (true)
        {
            if (left > right) {
                break;
            }

            // change top row
            for (int i = left; i <= right; i++)
            {
                int temp = mat[top][i];
                mat[top][i] = prev;
                prev = temp;
            }

            top++;

            if (top > bottom) {
                break;
            }

            // change right column
            for (int i = top; i <= bottom; i++)
            {
                int temp = mat[i][right];
                mat[i][right] = prev;
                prev = temp;
            }

            right--;

            if (left > right) {
                break;
            }

            // change bottom row
            for (int i = right; i >= left; i--)
            {
                int temp = mat[bottom][i];
                mat[bottom][i] = prev;
                prev = temp;
            }

            bottom--;

            if (top > bottom) {
                break;
            }

            // change left column
            for (int i = bottom; i >= top; i--)
            {
                int temp = mat[i][left];
                mat[i][left] = prev;
                prev = temp;
            }

            left++;
        }

        // the first element of the matrix will be the last element replaced
        mat[0][0] = prev;
    }

    public static void main(String[] args)
    {
        int[][] matrix =
        {
            { 1, 2,    3, 4, 5},
            {16, 17, 18, 19, 6},
            {15, 24, 25, 20, 7},
            {14, 23, 22, 21, 8},
            {13, 12, 11, 10, 9}
        };

        shiftMatrix(matrix);

        for (int[] row: matrix) {
            System.out.println(Arrays.toString(row));
        }
    }
}
```

##

```python3
# Shift all matrix elements by 1 in spiral order
def shiftMatrix(mat):

    # base case
    if not mat or not len(mat):
        return

    top = 0
    bottom = len(mat) - 1
    left = 0
    right = len(mat[0]) - 1

    prev = mat[0][0]

    while True:

        if left > right:
            break

        # change top row
        for i in range(left, right + 1):
            temp = mat[top][i]
            mat[top][i] = prev
            prev = temp

        top = top + 1

        if top > bottom:
            break

        # change right column
        for i in range(top, bottom + 1):
            temp = mat[i][right]
            mat[i][right] = prev
            prev = temp

        right = right - 1

        if left > right:
            break

        # change bottom row
        for i in range(right, left - 1, -1):
            temp = mat[bottom][i]
            mat[bottom][i] = prev
            prev = temp

        bottom = bottom - 1

        if top > bottom:
            break

        # change left column
        for i in range(bottom, top - 1, -1):
            temp = mat[i][left]
            mat[i][left] = prev
            prev = temp

        left = left + 1

    # first element of the matrix will be the last element replaced
    mat[0][0] = prev

if __name__ == '__main__':

    matrix = [
        [ 1, 2,    3, 4, 5],
        [16, 17, 18, 19, 6],
        [15, 24, 25, 20, 7],
        [14, 23, 22, 21, 8],
        [13, 12, 11, 10, 9]
    ]

    shiftMatrix(matrix)

    for row in matrix:
        print(row)
```

The time complexity of the proposed solution is O(M × N) for an `M × N` matrix and doesn’t require any extra space.

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.86/5. Vote count: 148

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
