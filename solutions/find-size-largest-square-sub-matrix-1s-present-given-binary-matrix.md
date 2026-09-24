# Find the size of the largest square submatrix of 1’s present in a binary matrix

> Source: https://www.techiedelight.com/find-size-largest-square-sub-matrix-1s-present-given-binary-matrix/

Given an `M × N` binary matrix, find the size of the largest square submatrix of `1's` present.

For example, the size of the largest square submatrix of `1's` is `3` in the following matrix:

0 0 1 0 1 1 0 1 1 1 0 0 0 0 1 1 1 1 1 1 0 1 1 1 1 1 1 1 1 1 1 1 0 1 1 1 1 0 1 1 1 1 1 1 1 0 1 1

> 

The idea is to use dynamic programming to solve this problem. The problem has [optimal substructure](https://techiedelight.com/introduction-dynamic-programming/#optimal-substructure). The size of the largest square submatrix ending at a cell `M[i][j]` will be 1 plus the minimum among the largest square submatrix ending at `M[i][j-1]`, `M[i-1][j]` and `M[i-1][j-1]`. The result will be the maximum of all square submatrix ending at `M[i][j]` for all possible values of `i` and `j`.

How does this works?

Let’s consider any `2×2` matrix. For it to be a `2×2` matrix, each of the top, left, and top-left neighbor of its bottom-right corner has to be a `1×1` square matrix.

Similarly, for a `3×3` matrix, each top, left, and top-left neighbor of its bottom-right corner has to be a `2×2` square matrix.

In general, for any `n × n` square matrix, each of its neighbors at the top left and top-left corner should at least have the size of `(n-1) × (n-1)`. The reverse of this statement is also true. If the size of the square submatrix ending at top, left, and top-left neighbors of any _cell_ in the given matrix is at least `n-1`, then we can get `n × n` submatrix from that _cell_. That is the reason behind picking up the smallest neighboring square and adding 1 to it.

The following figure might help in visualizing things better:

Following is the C++, Java, and Python implementation of the idea:

```cpp
#include <iostream>
#include <vector>
using namespace std;

// Function to find the size of the largest square submatrix of 1's
// present in a given binary matrix
int findLargestSquare(vector<vector<int>> const &mat, int m, int n, int &maxsize)
{
    // base condition
    if (m < 0 || n < 0) {
        return 0;
    }

    // find the largest square matrix ending at mat[m][n-1]
    int left = findLargestSquare(mat, m, n - 1, maxsize);

    // find the largest square matrix ending at mat[m-1][n]
    int top = findLargestSquare(mat, m - 1, n, maxsize);

    // find the largest square matrix ending at mat[m-1][n-1]
    int top_left = findLargestSquare(mat, m - 1, n - 1, maxsize);

    /* The largest square matrix ending at mat[m][n] will be 1 plus
        minimum of largest square matrix ending at mat[m][n-1],
        mat[m-1][n] and mat[m-1][n-1] */

    int size = 0;
    if (mat[m][n] != 0) {
        size = 1 + min (min(top, left), top_left);
    }

    // update maximum size found so far
    maxsize = max(maxsize, size);

    // return the size of the largest square matrix ending at mat[m][n]
    return size;
}

int findLargestSquareSubmatrix(vector<vector<int>> const &mat)
{
    // base case
    if (mat.size() == 0) {
        return 0;
    }

    // `M × N` matrix
    int M = mat.size();
    int N = mat[0].size();

    // `size` stores the size of the largest square submatrix of 1's
    // and is passed by reference
    int size = 0;

    findLargestSquare(mat, M - 1, N - 1, size);

    return size;
}

int main()
{
    vector<vector<int>> mat =
    {
        { 0, 0, 1, 0, 1, 1 },
        { 0, 1, 1, 1, 0, 0 },
        { 0, 0, 1, 1, 1, 1 },
        { 1, 1, 0, 1, 1, 1 },
        { 1, 1, 1, 1, 1, 1 },
        { 1, 1, 0, 1, 1, 1 },
        { 1, 0, 1, 1, 1, 1 },
        { 1, 1, 1, 0, 1, 1 }
    };

    cout << "The size of the largest square submatrix of 1's is " <<
        findLargestSquareSubmatrix(mat);

    return 0;
}
```

**Output:** The size of the largest square submatrix of 1’s is 3

##

```java
import java.util.concurrent.atomic.AtomicInteger;

class Main
{
    // Function to find the size of the largest square submatrix of 1's
    // present in a given binary matrix
    public static int findLargestSquare(int[][] mat, int m, int n,
            AtomicInteger maxsize)
    {
        // base condition
        if (m < 0 || n < 0) {
            return 0;
        }

        // find the largest square matrix ending at mat[m][n-1]
        int left = findLargestSquare(mat, m, n - 1, maxsize);

        // find the largest square matrix ending at mat[m-1][n]
        int top = findLargestSquare(mat, m - 1, n, maxsize);

        // find the largest square matrix ending at mat[m-1][n-1]
        int diagonal = findLargestSquare(mat, m - 1, n - 1, maxsize);

        /* The largest square matrix ending at mat[m][n] will be 1 plus
            minimum of largest square matrix ending at mat[m][n-1],
            mat[m-1][n] and mat[m-1][n-1] */

        int size = 0;
        if (mat[m][n] != 0) {
            size = 1 + Integer.min(Integer.min(top, left), diagonal);
        }

        // update maximum size found so far
        maxsize.set(Integer.max(maxsize.get(), size));

        // return the size of the largest square matrix ending at mat[m][n]
        return size;
    }

    public static int findLargestSquareSubmatrix(int[][] mat)
    {
        // base case
        if (mat == null || mat.length == 0) {
            return 0;
        }

        // `M × N` matrix
        int M = mat.length;
        int N = mat[0].length;

        // `size` stores the size of the largest square submatrix of 1's
        // and is passed by reference using the `AtomicInteger` class
        AtomicInteger maxsize = new AtomicInteger();

        findLargestSquare(mat, M - 1, N - 1, maxsize);
        return maxsize.get();
    }

    public static void main(String[] args)
    {
        int[][] mat =
                {
                        { 0, 0, 1, 0, 1, 1 },
                        { 0, 1, 1, 1, 0, 0 },
                        { 0, 0, 1, 1, 1, 1 },
                        { 1, 1, 0, 1, 1, 1 },
                        { 1, 1, 1, 1, 1, 1 },
                        { 1, 1, 0, 1, 1, 1 },
                        { 1, 0, 1, 1, 1, 1 },
                        { 1, 1, 1, 0, 1, 1 }
                };

        System.out.println("The size of largest square submatrix of 1's is " +
                findLargestSquareSubmatrix(mat));
    }
}
```

##

```python3
# Function to find the size of the largest square submatrix of 1's
# present in a given binary matrix
def findLargestSquare(mat, m, n, maxsize):
    # base condition
    if m < 0 or n < 0:
        return 0, maxsize

    # find the largest square matrix ending at mat[m][n-1]
    left, maxsize = findLargestSquare(mat, m, n - 1, maxsize)

    # find the largest square matrix ending at mat[m-1][n]
    top, maxsize = findLargestSquare(mat, m - 1, n, maxsize)

    # find the largest square matrix ending at mat[m-1][n-1]
    diagonal, maxsize = findLargestSquare(mat, m - 1, n - 1, maxsize)

    '''
        The largest square matrix ending at mat[m][n] will be 1 plus
        minimum of largest square matrix ending at mat[m][n-1],
        mat[m-1][n] and mat[m-1][n-1]
    '''

    size = 1 + min(min(top, left), diagonal) if mat[m][n] else 0

    # return the size of the largest square matrix ending at mat[m][n] and
    # maximum size found so far
    return size, max(maxsize, size)

def findLargestSquareSubmatrix(mat) -> int:

    # base case
    if not mat or not len(mat):
        return 0

    # `M × N` matrix
    (M, N) = (len(mat), len(mat[0]))

    # `size` stores the size of the largest square submatrix of 1's
    maxsize = findLargestSquare(mat, M - 1, N - 1, 0)[1]
    return maxsize

if __name__ == '__main__':
    mat = [
        [0, 0, 1, 0, 1, 1],
        [0, 1, 1, 1, 0, 0],
        [0, 0, 1, 1, 1, 1],
        [1, 1, 0, 1, 1, 1],
        [1, 1, 1, 1, 1, 1],
        [1, 1, 0, 1, 1, 1],
        [1, 0, 1, 1, 1, 1],
        [1, 1, 1, 0, 1, 1]
    ]

    print("The size of the largest square submatrix of 1's is",
        findLargestSquareSubmatrix(mat))
```

The time complexity of the proposed solution is exponential and occupies space in the call stack.

The above solution exhibits [overlapping subproblems](https://techiedelight.com/introduction-dynamic-programming/#overlapping-subproblems). If we draw the solution’s recursion tree, we can see that the same subproblems are repeatedly computed. We know that problems with optimal substructure and overlapping subproblems can be solved using dynamic programming, in which subproblem solutions are memoized rather than computed repeatedly. The _memo_ ized version follows the top-down approach since we first break the problem into subproblems and then calculate and store values. We can also solve this problem in a bottom-up manner. In the bottom-up approach, we solve smaller subproblems first, then solve larger subproblems from them.

Following is the C++, Java, and Python implementation of the idea:

```cpp
#include <iostream>
#include <vector>
using namespace std;

// Function to find the size of the largest square submatrix of 1's
// present in a given binary matrix
int findLargestSquare(vector<vector<int>> const &mat)
{
    // base case
    if (mat.size() == 0) {
        return 0;
    }

    // `M × N` matrix
    int M = mat.size();
    int N = mat[0].size();

    // `lookup[i][j]` stores the size of maximum square
    // submatrix ending at mat[i][j]
    int lookup[M][N];

    // `max` stores the size of the largest square submatrix of 1's
    int max = 0;

    // fill in a bottom-up manner
    for (int i = 0; i < M; i++)
    {
        for (int j = 0; j < N; j++)
        {
            lookup[i][j] = mat[i][j];

            // if we are not at the first row or first column and the
            // current cell has value 1
            if (i && j && mat[i][j])
            {
                // largest square submatrix ending at `mat[i][j]` will be
                // 1 plus minimum of largest square submatrix ending at
                // mat[i][j-1], mat[i-1][j] and mat[i-1][j-1]

                lookup[i][j] = min (min (lookup[i][j - 1], lookup[i - 1][j]),
                                        lookup[i - 1][j - 1]) + 1;
            }

            // update maximum size found so far
            if (max < lookup[i][j]) {
                max = lookup[i][j];
            }
        }
    }

    // return size of the largest square matrix
    return max;
}

int main()
{
    // input matrix
    vector<vector<int>> mat =
    {
        { 0, 0, 1, 0, 1, 1 },
        { 0, 1, 1, 1, 0, 0 },
        { 0, 0, 1, 1, 1, 1 },
        { 1, 1, 0, 1, 1, 1 },
        { 1, 1, 1, 1, 1, 1 },
        { 1, 1, 0, 1, 1, 1 },
        { 1, 0, 1, 1, 1, 1 },
        { 1, 1, 1, 0, 1, 1 }
    };

    cout << "The size of the largest square submatrix of 1's is " <<
            findLargestSquare(mat);

    return 0;
}
```

**Output:** The size of the largest square submatrix of 1’s is 3

##

```java
class Main
{
    public static int minimum (int x, int y, int z) {
        return Integer.min(Integer.min(x, y), z);
    }

    // Function to find the size of the largest square submatrix of 1's
    // present in a given binary matrix
    public static int findLargestSquare(int[][] mat)
    {
        // base case
        if (mat == null || mat.length == 0) {
            return 0;
        }

        // `T[i][j]` stores the size of maximum square
        // submatrix ending at `mat[i][j]`
        int[][] T = new int[mat.length][mat[0].length];

        // `max` stores the size of the largest square submatrix of 1's
        int max = 0;

        // fill in a bottom-up manner
        for (int i = 0; i < mat.length; i++)
        {
            for (int j = 0; j < mat[0].length; j++)
            {
                T[i][j] = mat[i][j];

                // if we are not at the first row or first column and the
                // current cell has value 1
                if (i > 0 && j > 0 && mat[i][j] == 1)
                {
                    // the largest square submatrix ending at `mat[i][j]` will be
                    // 1 plus minimum of largest square submatrix
                    // ending at `mat[i][j-1]`, `mat[i-1][j]` and `mat[i-1][j-1]`

                    T[i][j] = minimum(T[i][j - 1], T[i - 1][j],
                            T[i - 1][j - 1]) + 1;
                }

                // update maximum size found so far
                if (max < T[i][j]) {
                    max = T[i][j];
                }
            }
        }

        // return size of the largest square matrix
        return max;
    }

    public static void main(String[] args)
    {
        // input matrix
        int mat[][] =
                {
                        { 0, 0, 1, 0, 1, 1 },
                        { 0, 1, 1, 1, 0, 0 },
                        { 0, 0, 1, 1, 1, 1 },
                        { 1, 1, 0, 1, 1, 1 },
                        { 1, 1, 1, 1, 1, 1 },
                        { 1, 1, 0, 1, 1, 1 },
                        { 1, 0, 1, 1, 1, 1 },
                        { 1, 1, 1, 0, 1, 1 }
                };

        System.out.print("The size of largest square submatrix of 1's is " +
                findLargestSquare(mat));
    }
}
```

##

```python3
# Function to find the size of the largest square submatrix of 1's
# present in a given binary matrix
def findLargestSquare(mat):

    # base case
    if not mat or not len(mat):
        return 0

    # `T[i][j]` stores the size of maximum square submatrix ending at `mat[i][j]`
    T = [[0 for x in range(len(mat[0]))] for y in range(len(mat))]

    # `max` stores the size of the largest square submatrix of 1's
    max = 0

    # fill in a bottom-up manner
    for i in range(len(mat)):
        for j in range(len(mat[0])):
            T[i][j] = mat[i][j]

            # if we are not at the first row or first column and the
            # current cell has value 1
            if i > 0 and j > 0 and mat[i][j] == 1:
                # the largest square submatrix ending at `mat[i][j]` will be 1 plus
                # minimum of the largest square submatrix ending at `mat[i][j-1]`,
                # `mat[i-1][j]` and `mat[i-1][j-1]`

                T[i][j] = min(T[i][j - 1], T[i - 1][j], T[i - 1][j - 1]) + 1

            # update maximum size found so far
            if max < T[i][j]:
                max = T[i][j]

    # return size of the largest square matrix
    return max

if __name__ == '__main__':

    # input matrix
    mat = [
        [0, 0, 1, 0, 1, 1],
        [0, 1, 1, 1, 0, 0],
        [0, 0, 1, 1, 1, 1],
        [1, 1, 0, 1, 1, 1],
        [1, 1, 1, 1, 1, 1],
        [1, 1, 0, 1, 1, 1],
        [1, 0, 1, 1, 1, 1],
        [1, 1, 1, 0, 1, 1]
    ]

    print("The size of largest square submatrix of 1's is", findLargestSquare(mat))
```

The time complexity of the proposed solution is O(M × N) for an `M × N` matrix. The auxiliary space required by the program is O(M × N).

**Exercise:** Find the size of the largest rectangular submatrix of 1’s present in a given binary matrix.
