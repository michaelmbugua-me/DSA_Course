# Create a spiral matrix from a given array

> Source: https://www.techiedelight.com/create-spiral-matrix-given-array/

[Matrix](https://www.techiedelight.com/Category/Matrix/)

Given an integer array containing `M × N` elements, construct an `M × N` matrix from it in spiral order.

For example,

**Input:** 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 **Output:** [ 1 2 3 4 5 ] [ 16 17 18 19 6 ] [ 15 24 25 20 7 ] [ 14 23 22 21 8 ] [ 13 12 11 10 9 ]

> 

This problem is mainly the reverse of the following problem:

> [Print matrix in spiral order](https://techiedelight.com/print-matrix-spiral-order/)

The idea remains the same – read elements from the given array one by one and fill the matrix in spiral order. Four loops are used to maintain the spiral order, each for the top, right, bottom, and left corner of the matrix.

Following is the implementation in C++, Java, and Python based on the above idea:

```cpp
#include <iostream>
#include <iomanip>
#include <cmath>
#include <vector>
using namespace std;

// Create a spiral matrix from the given array
vector<vector<int>> printSpiralOrder(vector<int> const &arr, int M, int N)
{
    vector<vector<int>> mat;

    // base case
    if (arr.size() == 0) {
        return mat;
    }

    // construct an `M × N` matrix
    mat.resize(N, vector<int>(M));

    int top = 0, bottom = M - 1;
    int left = 0, right = N - 1;

    int index = 0;

    while (1)
    {
        if (left > right) {
            break;
        }
        // print top row
        for (int i = left; i <= right; i++) {
            mat[top][i] = arr[index++];
        }
        top++;

        if (top > bottom) {
            break;
        }
        // print right column
        for (int i = top; i <= bottom; i++) {
            mat[i][right] = arr[index++];
        }
        right--;

        if (left > right) {
            break;
        }
        // print bottom row
        for (int i = right; i >= left; i--) {
            mat[bottom][i] = arr[index++];
        }
        bottom--;

        if (top > bottom) {
            break;
        }
        // print left column
        for (int i = bottom; i >= top; i--) {
            mat[i][left] = arr[index++];
        }
        left++;
    }
}

int main()
{
    // `M × N` matrix
    int M = 5;
    int N = 5;

    // a vector of size `M×N`
    vector<int> arr = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
                    16, 17, 18, 19, 20, 21, 22, 23, 24, 25 };

    vector<vector<int>> matrix = printSpiralOrder(arr, M, N);

    for (auto &row: matrix) {
        for (auto &i: row) {
            cout << setw(3) << i;
        }
        cout << endl;
    }

    return 0;
}
```

**Output:** 1 2 3 4 5 16 17 18 19 6 15 24 25 20 7 14 23 22 21 8 13 12 11 10 9

##

```java
import java.util.Arrays;

class Main
{
    // Create a spiral matrix from the given array
    private static int[][] printSpiralOrder(int[] arr, int M, int N)
    {
        // base case
        if (arr == null) {
            return null;
        }

        // construct an `M × N` matrix
        int[][] mat = new int[M][N];

        int top = 0, bottom = M - 1;
        int left = 0, right = N - 1;

        int index = 0;

        while (true)
        {
            if (left > right) {
                break;
            }

            // print top row
            for (int i = left; i <= right; i++) {
                mat[top][i] = arr[index++];
            }
            top++;

            if (top > bottom) {
                break;
            }

            // print right column
            for (int i = top; i <= bottom; i++) {
                mat[i][right] = arr[index++];
            }
            right--;

            if (left > right) {
                break;
            }

            // print bottom row
            for (int i = right; i >= left; i--) {
                mat[bottom][i] = arr[index++];
            }
            bottom--;

            if (top > bottom) {
                break;
            }

            // print left column
            for (int i = bottom; i >= top; i--) {
                mat[i][left] = arr[index++];
            }
            left++;
        }
        return mat;
    }

    public static void main(String[] args)
    {
        // `M × N` matrix
        int M = 5;
        int N = 5;

        // an array of size `M×N`
        int[] arr = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
                16, 17, 18, 19, 20, 21, 22, 23, 24, 25 };

        int[][] mat = printSpiralOrder(arr, M, N);
        for (var r: mat) {
            System.out.println(Arrays.toString(r));
        }
    }
}
```

##

```python3
# Create a spiral matrix from a given list
def printSpiralOrder(A, M, N):

    # base case
    if not A:
        return []

    top = left = 0
    bottom = M - 1
    right = N - 1

    # construct an `M × N` matrix
    mat = [[0 for x in range(N)] for y in range(M)]

    index = 0

    while True:

        if left > right:
            break

        # print top row
        for i in range(left, right + 1):
            mat[top][i] = A[index]
            index = index + 1
        top = top + 1

        if top > bottom:
            break

        # print right column
        for i in range(top, bottom + 1):
            mat[i][right] = A[index]
            index = index + 1
        right = right - 1

        if left > right:
            break

        # print bottom row
        for i in range(right, left - 1, -1):
            mat[bottom][i] = A[index]
            index = index + 1
        bottom = bottom - 1

        if top > bottom:
            break

        # print left column
        for i in range(bottom, top - 1, -1):
            mat[i][left] = A[index]
            index = index + 1
        left = left + 1

    for r in mat:
        print(r)

if __name__ == '__main__':

    # `M × N` matrix
    M = N = 5

    # a list of length `M×N`
    A = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
        16, 17, 18, 19, 20, 21, 22, 23, 24, 25]

    printSpiralOrder(A, M, N)
```

The time complexity of the proposed solution is O(M × N) for an `M × N` matrix and doesn’t require any extra space.

**Exercise:** Write recursive solution of above problem.

Also See:

> [Shift all matrix elements by 1 in spiral order](https://www.techiedelight.com/shift-matrix-elements-1-spiral-order/ "Shift all matrix elements by 1 in spiral order")

> [Print matrix in spiral order](https://www.techiedelight.com/print-matrix-spiral-order/ "Print matrix in spiral order")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.8/5. Vote count: 147

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
