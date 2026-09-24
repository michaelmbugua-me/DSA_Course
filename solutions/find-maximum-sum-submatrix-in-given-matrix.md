# Find maximum sum `K × K` submatrix in a given `M × N` matrix

> Source: https://www.techiedelight.com/find-maximum-sum-submatrix-in-given-matrix/

Given an `M × N` integer matrix, calculate the maximum sum submatrix of size `k × k` in it in `O(M × N)` time. Here, `0 < k < M <= N`.

For example, consider the following `5 × 5` matrix:

[ 3 -4 6 -5 1 ] [ 1 -2 8 -4 -2 ] [ 3 -8 9 3 1 ] [ -7 3 4 2 7 ] [ -3 7 -5 7 -6 ] If k = 2, the maximum sum k × k submatrix is [ 9 3 ] [ 4 2 ] If k = 3, the maximum sum k × k submatrix is [ 8 -4 -2 ] [ 9 3 1 ] [ 4 2 7 ]

> 

We strongly suggest going through the following post as a prerequisite of the below solution:

> [Calculate the sum of all elements in a submatrix in constant time](https://techiedelight.com/calculate-sum-elements-sub-matrix-constant-time/)

The idea is to preprocess the matrix. We take an auxiliary matrix `sum[][]`, where `sum[i][j]` stores the sum of elements in the matrix from `(0, 0)` to `(i, j)`. We can easily calculate the value of `sum[i][j]` in constant time using the following relation:

sum[i][j] = sum[i][j – 1] + sum[i – 1][j] + mat[i][j] – sum[i – 1][j – 1]

Now to find the maximum sum `k × k` submatrix, consider every submatrix of size `k × k` and calculate their sum in constant time by directly using the following relation:

submatrixSum = sum[i][j] – sum[i – k][j] – sum[i][j – k] + sum[i – k][j – k]

Here, `(i, j)` represents the bottom-right corner coordinates of the `k × k` submatrix. Finally, print the submatrix that has the maximum sum.

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
#include <climits>
using namespace std;

// to store matrix coordinates
typedef pair<int, int> Point;

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

vector<vector<int>> preprocess(vector<vector<int>> const &mat, int M, int N)
{
    // preprocess the matrix `mat` such that `sum[i][j]` stores
    // sum of elements in the matrix from (0, 0) to (i, j)
    vector<vector<int>> sum(M, vector<int>(N));

    sum[0][0] = mat[0][0];

    // preprocess the first row
    for (int j = 1; j < N; j++) {
        sum[0][j] = mat[0][j] + sum[0][j - 1];
    }

    // preprocess the first column
    for (int i = 1; i < M; i++) {
        sum[i][0] = mat[i][0] + sum[i - 1][0];
    }

    // preprocess the rest of the matrix
    for (int i = 1; i < M; i++)
    {
        for (int j = 1; j < N; j++) {
            sum[i][j] = mat[i][j] + sum[i - 1][j] + sum[i][j - 1] - sum[i - 1][j - 1];
        }
    }

    return sum;
}

void findMaxSumSubMatrix(vector<vector<int>> const &mat, int k)
{
    // base case
    if (mat.size() == 0) {
        return;
    }

    // `M × N` matrix
    int M = mat.size();
    int N = mat[0].size();

    // preprocess the matrix
    vector<vector<int>> sum = preprocess(mat, M, N);

    int max = INT_MIN;

    // `p` stores bottom-right corner coordinates of the submatrix
    Point p;

    // find the maximum sum submatrix

    // start from cell (k-1, k-1) and consider each submatrix of size `k × k`
    for (int i = k - 1; i < M; i++)
    {
        for (int j = k - 1; j < N; j++)
        {
            // Note that (i, j) is the bottom-right corner coordinates of the
            // square submatrix of size `k`

            int total = sum[i][j];
            if (i - k >= 0) {
                total = total - sum[i - k][j];
            }

            if (j - k >= 0) {
                total = total - sum[i][j - k];
            }

            if (i - k >= 0 && j - k >= 0) {
                total = total + sum[i - k][j - k];
            }

            if (total > max) {
                max = total, p = make_pair(i, j);
            }
        }
    }

    // print maximum sum submatrix
    for (int i = 0; i < k; i++)
    {
        vector<int> row;
        for (int j = 0; j < k; j++) {
            row.push_back(mat[i + p.first - k + 1][j + p.second - k + 1]);
        }
        printVector(row);
    }
}

int main()
{
    vector<vector<int>> mat =
    {
        { 3, -4, 6, -5, 1 },
        { 1, -2, 8, -4, -2 },
        { 3, -8, 9, 3, 1 },
        { -7, 3, 4, 2, 7 },
        { -3, 7, -5, 7, -6 }
    };

    // submatrix size
    int k = 3;

    findMaxSumSubMatrix(mat, k);

    return 0;
}
```

##

```java
import java.util.ArrayList;
import java.util.List;

class Point
{
    int first, second;

    public Point(int first, int second)
    {
        this.first = first;
        this.second = second;
    }
}

class Main
{
    public static int[][] preprocess(int[][] mat, int M, int N)
    {
        // preprocess the matrix `mat` such that `sum[i][j]` stores
        // sum of elements in the matrix from (0, 0) to (i, j)
        int[][] sum = new int[mat.length][mat[0].length];
        sum[0][0] = mat[0][0];

        // preprocess the first row
        for (int j = 1; j < mat[0].length; j++) {
            sum[0][j] = mat[0][j] + sum[0][j - 1];
        }

        // preprocess the first column
        for (int i = 1; i < mat.length; i++) {
            sum[i][0] = mat[i][0] + sum[i - 1][0];
        }

        // preprocess the rest of the matrix
        for (int i = 1; i < mat.length; i++)
        {
            for (int j = 1; j < mat[0].length; j++)
            {
                sum[i][j] = mat[i][j] + sum[i - 1][j] + sum[i][j - 1]
                        - sum[i - 1][j - 1];
            }
        }

        return sum;
    }

    public static void findMaxSumSubMatrix(int[][] mat, int k)
    {
        // base case
        if (mat == null || mat.length == 0) {
            return;
        }

        // `M × N` matrix
        int M = mat.length;
        int N = mat[0].length;

        // preprocess the matrix
        int[][] sum = preprocess(mat, M, N);

        int total, max = Integer.MIN_VALUE;

        // `p` stores bottom-right corner coordinates of the submatrix
        Point p = null;

        // find the maximum sum submatrix

        // start from cell (k-1, k-1) and consider each submatrix of size `k × k`
        for (int i = k - 1; i < M; i++)
        {
            for (int j = k - 1; j < N; j++)
            {
                // Note that (i, j) is the bottom-right corner coordinates of the
                // square submatrix of size `k`

                total = sum[i][j];
                if (i - k >= 0) {
                    total = total - sum[i - k][j];
                }

                if (j - k >= 0) {
                    total = total - sum[i][j - k];
                }

                if (i - k >= 0 && j - k >= 0) {
                    total = total + sum[i - k][j - k];
                }

                if (total > max)
                {
                    max = total;
                    p = new Point(i, j);
                }
            }
        }

        // get maximum sum submatrix
        for (int i = 0; i < k; i++)
        {
            List<Integer> row = new ArrayList<>();
            for (int j = 0; j < k; j++) {
                int r = i + p.first - k + 1;
                int c = j + p.second - k + 1;
                row.add(mat[r][c]);
            }
            System.out.println(row);
        }
    }

    public static void main(String[] args)
    {
        // 5 × 5 matrix
        int[][] mat =
        {
            { 3, -4, 6, -5, 1 },
            { 1, -2, 8, -4, -2 },
            { 3, -8, 9, 3, 1 },
            { -7, 3, 4, 2, 7 },
            { -3, 7, -5, 7, -6 }
        };

        // submatrix size
        int k = 3;

        findMaxSumSubMatrix(mat, k);
    }
}
```

##

```python3
import sys

def preprocess(mat, M, N):

    # preprocess the matrix `mat` such that `s[i][j]` stores
    # sum of elements in the matrix from (0, 0) to (i, j)
    s = [[0 for x in range(len(mat[0]))] for y in range(len(mat))]
    s[0][0] = mat[0][0]

    # preprocess the first row
    for j in range(1, len(mat[0])):
        s[0][j] = mat[0][j] + s[0][j - 1]

    # preprocess the first column
    for i in range(1, len(mat)):
        s[i][0] = mat[i][0] + s[i - 1][0]

    # preprocess the rest of the matrix
    for i in range(1, len(mat)):
        for j in range(1, len(mat[0])):
            s[i][j] = mat[i][j] + s[i - 1][j] + s[i][j - 1] - s[i - 1][j - 1]

    return s

def findMaxSumSubMatrix(mat, k: int):

    # base case
    if not mat or not len(mat):
        return []

    # `M × N` matrix
    (M, N) = (len(mat), len(mat[0]))

    # preprocess the matrix
    s = preprocess(mat, M, N)

    maximum = -sys.maxsize

    # find the maximum sum submatrix

    # start from cell (k-1, k-1) and consider each submatrix of size `k × k`
    for i in range(k - 1, M):
        for j in range(k - 1, N):

            # Note that (i, j) is the bottom-right corner coordinates of the
            # square submatrix of size `k`

            total = s[i][j]
            if i - k >= 0:
                total = total - s[i - k][j]

            if j - k >= 0:
                total = total - s[i][j - k]

            if i - k >= 0 and j - k >= 0:
                total = total + s[i - k][j - k]

            if total > maximum:
                maximum = total
                p = (i, j)

    # `p` stores bottom-right corner coordinates of the submatrix
    (x, y) = p

    # return maximum sum submatrix
    return [[mat[i + x - k + 1][j + y - k + 1] for j in range(k)] for i in range(k)]

if __name__ == '__main__':

    # 5 × 5 matrix
    mat = [
        [3, -4, 6, -5, 1],
        [1, -2, 8, -4, -2],
        [3, -8, 9, 3, 1],
        [-7, 3, 4, 2, 7],
        [-3, 7, -5, 7, -6]
    ]

    # submatrix size
    k = 3

    submatrix = findMaxSumSubMatrix(mat, k)
    for row in submatrix:
        print(row)
```

**Output:** [8, -4, -2] [9, 3, 1] [4, 2, 7]

The time complexity of the proposed solution is O(M × N) and requires O(M × N) extra space, where `M` and `N` are dimensions of the matrix.

Also See:

> [Calculate the sum of all elements in a submatrix in constant time](https://www.techiedelight.com/calculate-sum-elements-sub-matrix-constant-time/ "Calculate the sum of all elements in a submatrix in constant time")

> [Find maximum sum submatrix present in a matrix](https://www.techiedelight.com/find-maximum-sum-submatrix-present-given-matrix/ "Find maximum sum submatrix present in a matrix")

> [Find the size of the largest square submatrix of 1’s present in a binary matrix](https://www.techiedelight.com/find-size-largest-square-sub-matrix-1s-present-given-binary-matrix/ "Find the size of the largest square submatrix of 1’s present in a binary matrix")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.68/5. Vote count: 209

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Bottom-up](https://www.techiedelight.com/Tags/Tabulation/), [Hard](https://www.techiedelight.com/Tags/hard/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
