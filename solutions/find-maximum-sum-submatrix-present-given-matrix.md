# Find maximum sum submatrix present in a matrix

> Source: https://www.techiedelight.com/find-maximum-sum-submatrix-present-given-matrix/

Given an `N × N` matrix of integers, find the maximum sum submatrix present in it.

For example, the maximum sum submatrix is highlighted in green in the following matrices:

> 

The idea is to preprocess the matrix. We take an auxiliary matrix `S[][]`, where `S[i][j]` will store the sum of elements in the matrix from `(0, 0)` to `(i-1, j-1)`. The idea is similar to the following post:

> [Calculate the sum of all elements in a submatrix in constant time](https://techiedelight.com/calculate-sum-elements-sub-matrix-constant-time/)

After we have preprocessed the matrix to create the sum matrix, consider every submatrix formed by row `i` to `j` and column `m` to `n` to calculate the submatrix sum in constant time using the following relation:

submatrix sum = S[j+1][n+1] – S[j+1][m] – S[i][n+1] + S[i][m]

If the submatrix sum is more than the maximum found so far, we update the maximum sum. We can also store the submatrix coordinates to print the maximum sum submatrix. The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
#include <climits>
using namespace std;

void printVector(vector<int> const &input)
{
    cout << "[";
    for (int i = 0; i < input.size(); i++) {
        cout << input[i];
        if (i < input.size() - 1) {
            cout << ", ";
        }
    }
    cout << "]\n";
}

// Find the maximum sum submatrix present in a given matrix
int findMaxSumSubmatrix(vector<vector<int>> const &mat)
{
    // base case
    if (mat.size() == 0) {
        return 0;
    }

    // `M × N` matrix
    int M = mat.size();
    int N = mat[0].size();

    // `S[i][j]` stores the sum of submatrix formed by row 0 to `i-1`
    // and column 0 to `j-1`
    int S[M+1][N+1];

    // preprocess the matrix to fill `S`
    for (int i = 0; i <= M; i++)
    {
        for (int j = 0; j <= N; j++)
        {
            if (i == 0 || j == 0) {
                S[i][j] = 0;
            }
            else {
                S[i][j] = S[i-1][j] + S[i][j-1] - S[i-1][j-1] + mat[i-1][j-1];
            }
        }
    }

    int maxSum = INT_MIN;
    int rowStart, rowEnd, colStart, colEnd;

    // consider every submatrix formed by row `i` to `j`
    // and column `m` to `n`
    for (int i = 0; i < M; i++)
    {
        for (int j = i; j < M; j++)
        {
            for (int m = 0; m < N; m++)
            {
                for (int n = m; n < N; n++)
                {
                    // calculate the submatrix sum using `S[][]` in O(1) time
                    int submatrix_sum = S[j+1][n+1] - S[j+1][m] - S[i][n+1] + S[i][m];

                    // if the submatrix sum is more than the maximum found so far
                    if (submatrix_sum > maxSum)
                    {
                        maxSum = submatrix_sum;
                        rowStart = i;
                        rowEnd = j;
                        colStart = m;
                        colEnd = n;
                    }
                }
            }
        }
    }

    cout << "The maximum sum submatrix is\n\n";
    for (int i = rowStart; i <= rowEnd; i++) {
        vector<int> row;
        for (int j = colStart; j <= colEnd; j++) {
            row.push_back(mat[i][j]);
        }
        printVector(row);
    }

    return maxSum;
}

int main()
{
    // input matrix
    vector<vector<int>> mat =
    {
        { -5, -6, 3, 1, 0 },
        { 9, 7, 8, 3, 7 },
        { -6, -2, -1, 2, -4 },
        { -7, 5, 5, 2, -6 },
        { 3, 2, 9, -5, 1 }
    };

    // find the maximum sum submatrix
    cout << "\nThe maximum sum is " << findMaxSumSubmatrix(mat);

    return 0;
}
```

##

```java
import java.util.ArrayList;
import java.util.List;

class Main
{
    // Find the maximum sum submatrix present in a given matrix
    public static int findMaxSumSubmatrix(int[][] matrix)
    {
        // base case
        if (matrix == null || matrix.length == 0) {
            return 0;
        }

        // `M × N` matrix
        int M = matrix.length;
        int N = matrix[0].length;

        // `S[i][j]` stores the sum of submatrix formed by row 0 to `i-1`
        // and column 0 to `j-1`
        int[][] S = new int[M+1][N+1];

        // preprocess the matrix to fill `S`
        for (int i = 0; i <= M; i++)
        {
            for (int j = 0; j <= N; j++)
            {
                if (i == 0 || j == 0) {
                    S[i][j] = 0;
                }
                else {
                    S[i][j] = S[i-1][j] + S[i][j-1] - S[i-1][j-1] +
                            matrix[i-1][j-1];
                }
            }
        }

        int maxSum = Integer.MIN_VALUE;
        int rowStart = 0, rowEnd = 0, colStart = 0, colEnd = 0;

        // consider every submatrix formed by row `i` to `j`
        // and column `m` to `n`
        for (int i = 0; i < M; i++)
        {
            for (int j = i; j < M; j++)
            {
                for (int m = 0; m < N; m++)
                {
                    for (int n = m; n < N; n++)
                    {
                        // calculate the submatrix sum using `S[][]` in O(1) time
                        int submatrix_sum = S[j+1][n+1] - S[j+1][m]
                                - S[i][n+1] + S[i][m];

                        // if the submatrix sum is more than the maximum found so far
                        if (submatrix_sum > maxSum)
                        {
                            maxSum = submatrix_sum;
                            rowStart = i;
                            rowEnd = j;
                            colStart = m;
                            colEnd = n;
                        }
                    }
                }
            }
        }

        List<List<Integer>> result = new ArrayList<>();
        for (int i = rowStart; i <= rowEnd; i++) {
            List<Integer> row = new ArrayList<>();
            for (int j = colStart; j <= colEnd; j++) {
                row.add(matrix[i][j]);
            }
            result.add(row);
        }

        System.out.println("The maximum sum submatrix is " + result);
        return maxSum;
    }

    public static void main(String[] args)
    {
        // input matrix
        int[][] mat =
        {
            { -5, -6, 3, 1, 0 },
            { 9, 7, 8, 3, 7 },
            { -6, -2, -1, 2, -4 },
            { -7, 5, 5, 2, -6 },
            { 3, 2, 9, -5, 1 }
        };

        // find the maximum sum submatrix
        System.out.print("The maximum sum is " + findMaxSumSubmatrix(mat));
    }
}
```

##

```python3
import sys

# Find the maximum sum submatrix present in a given matrix
def findMaxSumSubmatrix(mat):

    # base case
    if not mat or not len(mat):
        return []

    # `M × N` matrix
    (M, N) = (len(mat), len(mat[0]))

    # `S[i][j]` stores the sum of submatrix formed by row 0 to `i-1`
    # and column 0 to `j-1`
    S = [[0 for x in range(N + 1)] for y in range(M + 1)]

    # preprocess the matrix to fill `S`
    for i in range(1, M + 1):
        for j in range(1, N + 1):
            S[i][j] = S[i - 1][j] + S[i][j - 1] - S[i - 1][j - 1] \
                      + mat[i - 1][j - 1]

    maxSum = -sys.maxsize
    rowStart = rowEnd = colStart = colEnd = 0

    # consider every submatrix formed by row `i` to `j`
    # and column `m` to `n`
    for i in range(M):
        for j in range(i, M):
            for m in range(N):
                for n in range(m, N):
                    # calculate the submatrix sum using `S` in `O(1)` time
                    submatrix_sum = S[j + 1][n + 1] - S[j + 1][m] \
                                    - S[i][n + 1] + S[i][m]

                    # if the submatrix sum is more than the maximum found so far
                    if submatrix_sum > maxSum:
                        maxSum = submatrix_sum
                        rowStart = i
                        rowEnd = j
                        colStart = m
                        colEnd = n

    output = [[mat[i][j] for j in range(colStart, colEnd + 1)]
              for i in range(rowStart, rowEnd + 1)]

    print('The maximum sum submatrix is', output)
    return maxSum

if __name__ == '__main__':

    # input matrix
    matrix = [
        [-5, -6, 3, 1, 0],
        [9, 7, 8, 3, 7],
        [-6, -2, -1, 2, -4],
        [-7, 5, 5, 2, -6],
        [3, 2, 9, -5, 1]
    ]

    # find the maximum sum submatrix
    print("The maximum sum is", findMaxSumSubmatrix(matrix))
```

**Output:** The maximum sum submatrix is [[7, 8, 3], [-2, -1, 2], [5, 5, 2], [2, 9, -5]] The maximum sum is 35

The time complexity of the proposed solution is O(N4) for an `N × N` matrix. The auxiliary space required by the program is O(N2). We can solve this problem in O(N3) time using [Kadane’s algorithm](https://techiedelight.com/maximum-subarray-problem-kadanes-algorithm/).

Also See:

> [Find maximum sum `K × K` submatrix in a given `M × N` matrix](https://www.techiedelight.com/find-maximum-sum-submatrix-in-given-matrix/ "Find maximum sum `K × K` submatrix in a given `M × N` matrix")

> [Calculate the sum of all elements in a submatrix in constant time](https://www.techiedelight.com/calculate-sum-elements-sub-matrix-constant-time/ "Calculate the sum of all elements in a submatrix in constant time")

> [Find the size of the largest square submatrix of 1’s present in a binary matrix](https://www.techiedelight.com/find-size-largest-square-sub-matrix-1s-present-given-binary-matrix/ "Find the size of the largest square submatrix of 1’s present in a binary matrix")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.68/5. Vote count: 160

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Bottom-up](https://www.techiedelight.com/Tags/Tabulation/), [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
