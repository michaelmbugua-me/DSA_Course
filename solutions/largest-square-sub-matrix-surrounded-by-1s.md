# Find the largest square submatrix which is surrounded by all 1’s

> Source: https://www.techiedelight.com/largest-square-sub-matrix-surrounded-by-1s/

[Matrix](https://www.techiedelight.com/Category/Matrix/)

Given a binary matrix, find the size of the largest square submatrix, which is surrounded by all 1’s.

For example, the size of the largest square submatrix in the following binary matrix is `4`. The largest square submatrix is formed by cells `(0, 2)`, `(3, 2)`, `(0, 5)`, and `(3, 5)`.

1 1 **1 1 1 1** 1 0 **1** 1 0 **1** 0 1 **1** 0 0 **1** 1 1 **1 1 1 1** 1 0 0 1 0 1 1 0 1 1 0 0 1 0 1 0 1 1 1 1 1 0 1 1

> 

The brute-force solution is to consider every square submatrix and check if it is surrounded by all `1's`. We keep track of the dimensions of the largest square submatrix seen and finally return it. The time complexity of this solution is O(M2 × N2), where `M` and `N` are dimensions of the matrix.

We can reduce the time complexity of the problem to O(M2 × N) by using O(M × N) extra space. The idea is to create two auxiliary matrices, say `X` and `Y`, where `X[i][j]` and `Y[i][j]` stores the total number of continuous horizontal and vertical `1's` ending at cell `(i, j)`, respectively in the given matrix.

After filling both auxiliary matrices, process each cell `(i, j)` starting from the last cell in the last row. For every cell `(i, j)`, take the minimum of `X[i][j]` and `Y[i][j]` which could be the maximum length of the right vertical line and bottom horizontal line of the square matrix ending at cell `(i, j)`. The cell ending at the current cell `(i, j)` would form a square submatrix if there exist a left vertical line and a top horizontal line of at least the same length. Keep track of the largest square submatrix’s dimensions so far and return it when every cell is processed.

Following is the C++, Java, and Python program that demonstrates it:

```cpp
#include <iostream>
#include <vector>
using namespace std;

// Function to find the largest square submatrix, which is surrounded by all 1's
int findLargestSquareSubMatrix(vector<vector<int>> const &mat)
{
    // base case
    if (mat.size() == 0) {
        return;
    }

    // `M × N` matrix
    int M = mat.size();
    int N = mat[0].size();

    // create two auxiliary matrices filled with all 0's of size `M × N`
    int X[M][N] = {};
    int Y[M][N] = {};

    // update the auxiliary matrix `X[][]` and `Y[][]` with the total number of
    // continuous 1's ending at the cell
    for (int i = 0; i < M; i++)
    {
        for (int j = 0; j < N; j++)
        {
            if (mat[i][j])
            {
                if (i == 0) {
                    Y[i][j] = 1;
                }
                else {
                    Y[i][j] = Y[i - 1][j] + 1;
                }

                if (j == 0) {
                    X[i][j] = 1;
                }
                else {
                    X[i][j] = X[i][j - 1] + 1;
                }
            }
        }
    }

    // to keep track of the largest square submatrix
    int max_length = 0;

    // process each cell `(i, j)` of the auxiliary matrix starting from the
    // last cell in the last row

    for (int i = M - 1; i >= 0; i--)
    {
        for (int j = N - 1; j >= 0; j--)
        {
            // The minimum of `X[i][j]` and `Y[i][j]` would be the length of the
            // right vertical line and bottom horizontal line of the
            // square matrix ending at cell `(i, j)`

            int len = min(X[i][j], Y[i][j]);
            while (len)
            {
                // the cell ending at the current cell `(i, j)` forms a square
                // submatrix if there exists a left vertical line and a
                // top horizontal line of at least length `len`

                bool isSquare = Y[i][j - len + 1] >= len &&
                                X[i - len + 1][j] >= len;

                // check if the square ending at the current cell is the largest so far
                if (isSquare && max_length < len) {
                    max_length = len;
                }

                // reduce the length by 1 to check for smaller squares ending at
                // the current cell
                len--;
            }
        }
    }

    return max_length;
}

int main()
{
    vector<vector<int>> mat =
    {
        { 1, 1, 1, 1, 1, 1 },
        { 1, 0, 1, 1, 0, 1 },
        { 0, 1, 1, 0, 0, 1 },
        { 1, 1, 1, 1, 1, 1 },
        { 1, 0, 0, 1, 0, 1 },
        { 1, 0, 1, 1, 0, 0 },
        { 1, 0, 1, 0, 1, 1 },
        { 1, 1, 1, 0, 1, 1 }
    };

    cout << "The size of the largest square submatrix is "
         << findLargestSquareSubMatrix(mat);

    return 0;
}
```

**Output:** The largest square submatrix has a length of 4

##

```java
class Main
{
    // Function to find the largest square submatrix, which is surrounded by all 1's
    public static int findLargestSquareSubMatrix(int[][] mat)
    {
        // base case
        if (mat == null || mat.length == 0) {
            return 0;
        }

        // `M × N` matrix
        int M = mat.length;
        int N = mat[0].length;

        // create two auxiliary matrices filled with all 0's of size `M × N`
        int[][] X = new int[M][N];
        int[][] Y = new int[M][N];

        // update the auxiliary matrix `X[][]` and `Y[][]` with the
        // total number of continuous 1's ending at the cell
        for (int i = 0; i < M; i++)
        {
            for (int j = 0; j < N; j++)
            {
                if (mat[i][j] != 0)
                {
                    if (i == 0) {
                        Y[i][j] = 1;
                    }
                    else {
                        Y[i][j] = Y[i - 1][j] + 1;
                    }

                    if (j == 0) {
                        X[i][j] = 1;
                    }
                    else {
                        X[i][j] = X[i][j - 1] + 1;
                    }
                }
            }
        }

        /*
            // print `X` matrix
            for (int i = 0; i < M; i++) {
                System.out.println(Arrays.toString(X[i]));
            }

            System.out.println();

            // print `Y` matrix
            for (int i = 0; i < M; i++) {
                System.out.println(Arrays.toString(Y[i]));
            }

            System.out.println();

        */

        // to keep track of the largest square submatrix
        int max_length = 0;

        // process each cell `(i, j)` of the auxiliary matrix starting from the
        // last cell in the last row

        for (int i = M - 1; i >= 0; i--)
        {
            for (int j = N - 1; j >= 0; j--)
            {
                // The minimum of `X[i][j]` and `Y[i][j]` would be the length of the
                // right vertical line and bottom horizontal line of the
                // square matrix ending at cell `(i, j)`

                int len = Math.min(X[i][j], Y[i][j]);
                while (len > 0)
                {
                    // the cell ending at the current cell `(i, j)` forms a square
                    // submatrix if there exists a left vertical line and a
                    // top horizontal line of at least length `len`

                    boolean isSquare = Y[i][j - len + 1] >= len &&
                                            X[i - len + 1][j] >= len;

                    // check if the square ending at the current cell is the largest
                    // so far
                    if (isSquare && max_length < len) {
                        max_length = len;
                    }

                    // reduce the length by 1 to check for smaller squares ending at
                    // the current cell
                    len--;
                }
            }
        }

        return max_length;
    }

    public static void main(String[] args)
    {
        int[][] mat =
        {
                { 1, 1, 1, 1, 1, 1 },
                { 1, 0, 1, 1, 0, 1 },
                { 0, 1, 1, 0, 0, 1 },
                { 1, 1, 1, 1, 1, 1 },
                { 1, 0, 0, 1, 0, 1 },
                { 1, 0, 1, 1, 0, 0 },
                { 1, 0, 1, 0, 1, 1 },
                { 1, 1, 1, 0, 1, 1 }
        };

        System.out.println("The size of largest square submatrix is "
                                + findLargestSquareSubMatrix(mat));
    }
}
```

##

```python3
# Function to find the largest square submatrix, which is surrounded by all 1's
def findLargestSquareSubMatrix(mat):

    # base case
    if not mat or not len(mat):
        return

    # `M × N` matrix
    (M, N) = (len(mat), len(mat[0]))

    # create two auxiliary matrices filled with all 0's of size `M × N`
    X = [[0 for x in range(N)] for y in range(M)]
    Y = [[0 for x in range(N)] for y in range(M)]

    # update the auxiliary matrix `X` and `Y` with the
    # total number of continuous 1's ending at the cell
    for i in range(M):
        for j in range(N):
            if mat[i][j]:
                Y[i][j] = (0 if i == 0 else Y[i - 1][j]) + 1
                X[i][j] = (0 if j == 0 else X[i][j - 1]) + 1

    # to keep track of the largest square submatrix
    max_len = 0

    # process each cell `(i, j)` of the auxiliary matrix starting from the
    # last cell in the last row

    for i in reversed(range(M)):
        for j in reversed(range(N)):

            # The minimum of `X[i][j]` and `Y[i][j]` would be the length of the
            # right vertical line and bottom horizontal line of the
            # square matrix ending at cell `(i, j)`

            length = min(X[i][j], Y[i][j])
            while length:

                # the cell ending at the current cell `(i, j)` forms a square
                # submatrix if there exists a left vertical line and a
                # top horizontal line of at least length `length`

                isSquare = Y[i][j - length + 1] >= length and \
                        X[i - length + 1][j] >= length

                # check if the square ending at the current cell is the largest so far
                if isSquare and max_len < length:
                    max_len = length

                # reduce the length by 1 to check for smaller squares ending at
                # the current cell
                length = length - 1

    return max_len

if __name__ == '__main__':

    mat = [
        [1, 1, 1, 1, 1, 1],
        [1, 0, 1, 1, 0, 1],
        [0, 1, 1, 0, 0, 1],
        [1, 1, 1, 1, 1, 1],
        [1, 0, 0, 1, 0, 1],
        [1, 0, 1, 1, 0, 0],
        [1, 0, 1, 0, 1, 1],
        [1, 1, 1, 0, 1, 1]
    ]

    print("The size of largest square submatrix is", findLargestSquareSubMatrix(mat))
```

Also See:

> [Find the size of the largest square submatrix of 1’s present in a binary matrix](https://www.techiedelight.com/find-size-largest-square-sub-matrix-1s-present-given-binary-matrix/ "Find the size of the largest square submatrix of 1’s present in a binary matrix")

> [Find maximum sum `K × K` submatrix in a given `M × N` matrix](https://www.techiedelight.com/find-maximum-sum-submatrix-in-given-matrix/ "Find maximum sum `K × K` submatrix in a given `M × N` matrix")

> [Calculate the sum of all elements in a submatrix in constant time](https://www.techiedelight.com/calculate-sum-elements-sub-matrix-constant-time/ "Calculate the sum of all elements in a submatrix in constant time")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.84/5. Vote count: 171

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
