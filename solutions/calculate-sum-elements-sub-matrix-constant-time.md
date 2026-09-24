# Calculate the sum of all elements in a submatrix in constant time

> Source: https://www.techiedelight.com/calculate-sum-elements-sub-matrix-constant-time/

Given an `M × N` integer matrix and two coordinates `(p, q)` and `(r, s)` representing top-left and bottom-right coordinates of a submatrix of it, calculate the sum of all elements present in the submatrix. Here, `0 <= p < r < M` and `0 <= q < s < N`.

For example,

**Input:** matrix[][] is [ 0 2 5 4 1 ] [ 4 8 2 3 7 ] [ 6 3 4 6 2 ] [ 7 3 1 8 3 ] [ 1 5 7 9 4 ] (p, q) = (1, 1) (r, s) = (3, 3) **Output:** Sum is 38 **Explanation:** The submatrix formed by coordinates (p, q), (p, s), (r, q), and (r, s) is shown below, having the sum of elements equal to 38. [ 8 2 3 ] [ 3 4 6 ] [ 3 1 8 ]

Assume that `m` such lookup calls are made to the matrix; the task is to achieve O(1) time lookups.

> 

The idea is to preprocess the matrix. Take an auxiliary matrix `sum[][]`, where `sum[i][j]` will store the sum of elements in the matrix from `(0, 0)` to `(i, j)`. We can easily calculate the value of `sum[i][j]` in constant time using the following relation:

sum[i][j] = sum[i][j – 1] + sum[i – 1][j] + mat[i][j] – sum[i – 1][j – 1]

The following diagram easily explains this relation. (_Here greyed portion represents the sum of elements in the matrix from`(0, 0)` to `(i, j)`_)

Now to calculate the sum of elements present in the submatrix formed by coordinates `(p, q)`, `(p, s)`, `(r, q)`, and `(r, s)` in constant time, we can directly apply the relation below:

total = sum[r][s] – sum[r][q – 1] – sum[p – 1][s] + sum[p – 1][q – 1]

The following diagram explains this relation. _(Here the greyed portion represent the submatrix)_.

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
using namespace std;

vector<vector<int>> preprocess(vector<vector<int>> const &mat)
{
    // `M × N` matrix
    int M = mat.size();
    int N = mat[0].size();

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
        for (int j = 1; j < N; j++)
        {
            sum[i][j] = mat[i][j] + sum[i - 1][j] + sum[i][j - 1]
                - sum[i - 1][j - 1];
        }
    }
    return sum;
}

// Calculate the sum of all elements in a submatrix in constant time
int findSubmatrixSum(vector<vector<int>> const &mat, int p, int q, int r, int s)
{
    // base case
    if (mat.size() == 0) {
        return 0;
    }

    // preprocess the matrix
    vector<vector<int>> sum = preprocess(mat);

    // `total` is `sum[r][s] - sum[r][q-1] - sum[p-1][s] + sum[p-1][q-1]`
    int total = sum[r][s];

    if (q - 1 >= 0) {
        total -= sum[r][q - 1];
    }

    if (p - 1 >= 0) {
        total -= sum[p - 1][s];
    }

    if (p - 1 >= 0 && q - 1 >= 0) {
        total += sum[p - 1][q - 1];
    }

    return total;
}

int main()
{
    vector<vector<int>> mat =
    {
        { 0, 2, 5, 4, 1 },
        { 4, 8, 2, 3, 7 },
        { 6, 3, 4, 6, 2 },
        { 7, 3, 1, 8, 3 },
        { 1, 5, 7, 9, 4 }
    };

    // (p, q) and (r, s) represent top-left and bottom-right
    // coordinates of the submatrix
    int p = 1, q = 1, r = 3, s = 3;

    // calculate the submatrix sum
    cout << findSubmatrixSum(mat, p, q, r, s);

    return 0;
}
```

**Output:** 38

##

```java
class Main
{
    public static int[][] preprocess(int[][] mat)
    {
        // `M × N` matrix
        int M = mat.length;
        int N = mat[0].length;

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

    // Calculate the sum of all elements in a submatrix in constant time
    public static int findSubmatrixSum(int[][] mat, int p, int q, int r, int s)
    {
        // base case
        if (mat == null || mat.length == 0) {
            return 0;
        }

        // preprocess the matrix
        int[][] sum = preprocess(mat);

        /* `total` is `sum[r][s] - sum[r][q-1] - sum[p-1][s] + sum[p-1][q-1]` */
        int total = sum[r][s];

        if (q - 1 >= 0) {
            total -= sum[r][q - 1];
        }

        if (p - 1 >= 0) {
            total -= sum[p - 1][s];
        }

        if (p - 1 >= 0 && q - 1 >= 0) {
            total += sum[p - 1][q - 1];
        }

        return total;
    }

    public static void main(String[] args)
    {
        int[][] mat =
        {
            { 0, 2, 5, 4, 1 },
            { 4, 8, 2, 3, 7 },
            { 6, 3, 4, 6, 2 },
            { 7, 3, 1, 8, 3 },
            { 1, 5, 7, 9, 4 }
        };

        // (p, q) and (r, s) represent top-left and bottom-right
        // coordinates of the submatrix
        int p = 1, q = 1, r = 3, s = 3;

        // calculate the submatrix sum
        System.out.print(findSubmatrixSum(mat, p, q, r, s));
    }
}
```

##

```python3
def preprocess(mat):
    # `M × N` matrix
    (M, N) = (len(mat), len(mat[0]))

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

# Calculate the sum of all elements in a submatrix in constant time
def findSubmatrixSum(mat, p, q, r, s):

    # base case
    if not mat or not len(mat):
        return 0

    # preprocess the matrix
    mat = preprocess(mat)

    # `total` is `mat[r][s] - mat[r][q-1] - mat[p-1][s] + mat[p-1][q-1]`
    total = mat[r][s]

    if q - 1 >= 0:
        total -= mat[r][q - 1]

    if p - 1 >= 0:
        total -= mat[p - 1][s]

    if p - 1 >= 0 and q - 1 >= 0:
        total += mat[p - 1][q - 1]

    return total

if __name__ == '__main__':

    mat = [
        [0, 2, 5, 4, 1],
        [4, 8, 2, 3, 7],
        [6, 3, 4, 6, 2],
        [7, 3, 1, 8, 3],
        [1, 5, 7, 9, 4]
    ]

    # (p, q) and (r, s) represent top-left and bottom-right
    # coordinates of the submatrix
    p = q = 1
    r = s = 3

    # calculate the submatrix sum
    print(findSubmatrixSum(mat, p, q, r, s))
```

This solution takes O(N2) time for an `N × N` matrix, but we can do constant-time lookups any number of times once the matrix is preprocessed. In other words, if `M` lookup calls are made to the matrix, then the naive solution takes O(M × N2) time, while the above solution takes only O(M + N2) time.

**Exercise:**

1\. Given an `M × N` integer matrix, find the sum of all `K × K` submatrix

2\. Given an `M × N` integer matrix and a cell `(i, j)`, find the sum of all matrix elements in constant time, except the elements present at row `i` and column `j` of the matrix.

Also See:

> [Find maximum sum `K × K` submatrix in a given `M × N` matrix](https://www.techiedelight.com/find-maximum-sum-submatrix-in-given-matrix/ "Find maximum sum `K × K` submatrix in a given `M × N` matrix")

> [Find maximum sum submatrix present in a matrix](https://www.techiedelight.com/find-maximum-sum-submatrix-present-given-matrix/ "Find maximum sum submatrix present in a matrix")

> [Find the largest square submatrix which is surrounded by all 1’s](https://www.techiedelight.com/largest-square-sub-matrix-surrounded-by-1s/ "Find the largest square submatrix which is surrounded by all 1’s")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.82/5. Vote count: 234

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Bottom-up](https://www.techiedelight.com/Tags/Tabulation/), [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
