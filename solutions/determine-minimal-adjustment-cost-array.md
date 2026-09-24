# Determine the minimal adjustment cost of an array

> Source: https://www.techiedelight.com/determine-minimal-adjustment-cost-array/

[Dynamic Programming](https://www.techiedelight.com/Category/Dynamic-Programming/)

Write an algorithm to replace each element in an array of positive integers such that the difference between adjacent elements in the array is less than or equal to a given target. The goal is to minimize the adjustment cost, which is the sum of differences between new and old values.

In other words, minimize `∑|A[i] - Anew[i]|`, where `0 <= i <= n-1`, `n` is the size of `A[]` and `Anew[]` is the array with adjacent difference less than or equal to target.

For example,

**Input:** A = [1, 3, 0, 3], target = 1 **Output:** Minimum adjustment cost is 3 One of the possible solutions is [2, 3, 2, 3] **Input:** A = [55, 77, 52, 61, 39, 6, 25, 60, 49, 47], target = 10 **Output:** Minimum adjustment cost is 75 One of the possible solutions is [55, 62, 52, 49, 39, 29, 30, 40, 49, 47] **Input:** A = [2, 3, 2, 3], target = 1 **Output:** Minimum adjustment cost is 0 All adjacent elements in the input array are already less than equal to the given target.

To minimize the adjustment cost `∑|A[i] - Anew[i]|` for all index `i` in the array, `|A[i] - Anew[i]|` should be as close to 0 as possible. Also, `|A[i] - Anew[i+1] ]| <= Target`.

We can use [dynamic programming](https://techiedelight.com/introduction-dynamic-programming/) to solve this problem. Let `T[i][j]` defines minimal adjustment cost on changing A[i] to j, then the DP relation is defined by:

`T[i][j] = min{T[i - 1][k]} + |j - A[i]|` for all `k's` such that `|k - j| <= target`

Here, `0 <= i < n` and `0 <= j <= M`, where `n` is the total number of elements in the array. We have to consider all `k` such that `max(j - target, 0) <= k <= min(M, j + target)`. Finally, the minimum adjustment cost of the array will be `min{T[n - 1][j]}` for all `0 <= j <= M`.

The algorithm can be implemented as follows in C, Java, and Python:

```c
#include <stdio.h>
#include <limits.h>
#include <stdlib.h>

#define M 100

int max(int x, int y) { return (x > y)? x : y; }
int min(int x, int y) { return (x < y)? x : y; }

// Find the minimum adjustment cost of an array
int findMinAdjustmentCost(int A[], int n, int target)
{
    // base case
    if (n == 0) {
        return 0;
    }

    // T[i][j] stores the minimal adjustment cost on changing A[i] to j
    int T[n][M + 1];

    // do for each array element
    for (int i = 0; i < n; i++)
    {
        // replace A[i] to `j` and calculate minimal adjustment cost T[i][j]
        for (int j = 0; j <= M; j++)
        {
            // separately handle the first array element
            if (i == 0) {
                T[i][j] = abs(j - A[i]);
            }
            else {
                // initialize minimal adjustment cost with `INT_MAX`
                T[i][j] = INT_MAX;

                // consider all `k` such that k >= max(j - target, 0) and
                // k <= min(M, j + target) and take minimum

                int k = max(j - target, 0);
                while (k <= min(M, j + target))
                {
                    T[i][j] = min(T[i][j], T[i - 1][k] + abs(A[i] - j));
                    k++;
                }
            }
        }
    }

    // return minimum value from the last row of T[][]
    int result = INT_MAX;
    for (int j = 0; j <= M; j++) {
        result = min(result, T[n - 1][j]);
    }

    return result;
}

int main(void)
{
    int A[] = { 55, 77, 52, 61, 39, 6, 25, 60, 49, 47 };
    int target = 10;

    int n = sizeof(A) / sizeof(A[0]);
    printf("The minimal adjustment cost is %d", findMinAdjustmentCost(A, n, target));

    return 0;
}
```

**Output:** The minimal adjustment cost is 75

##

```java
class Main
{
    private static final int M = 100;

    // Find the minimum adjustment cost of an array
    public static int findMinAdjustmentCost(int[] A, int target)
    {
        // base case
        if (A == null || A.length == 0) {
            return 0;
        }

        // T[i][j] stores the minimal adjustment cost on changing A[i] to j
        int[][] T = new int[A.length][M + 1];

        // do for each array element
        for (int i = 0; i < A.length; i++)
        {
            // replace A[i] to `j` and calculate minimal adjustment cost T[i][j]
            for (int j = 0; j <= M; j++)
            {
                // separately handle the first array element
                if (i == 0) {
                    T[i][j] = Math.abs(j - A[i]);
                }
                else {
                    // initialize minimal adjustment cost with infinity
                    T[i][j] = Integer.MAX_VALUE;

                    // consider all `k` such that k >= max(j - target, 0) and
                    // k <= min(M, j + target) and take minimum

                    int k = Integer.max(j - target, 0);
                    while (k <= Integer.min(M, j + target))
                    {
                        T[i][j] = Integer.min(T[i][j], T[i-1][k] + Math.abs(A[i] - j));
                        k++;
                    }
                }
            }
        }

        // return minimum value from the last row of T[][]
        int result = Integer.MAX_VALUE;
        for (int j = 0; j <= M; j++) {
            result = Integer.min(result, T[A.length - 1][j]);
        }

        return result;
    }

    public static void main(String[] args)
    {
        int[] A = { 55, 77, 52, 61, 39, 6, 25, 60, 49, 47 };
        int target = 10;

        System.out.println("The minimal adjustment cost is " +
                    findMinAdjustmentCost(A, target));
    }
}
```

##

```python3
import sys

# Find the minimum adjustment cost of a list
def findMinAdjustmentCost(A, target):

    # base case
    if not A:
        return 0

    # T[i][j] stores the minimal adjustment cost on changing A[i] to j
    T = [[0 for x in range(M + 1)] for y in range(len(A))]

    # do for each element in the list
    for i in range(len(A)):

        # replace A[i] to `j` and calculate minimal adjustment cost T[i][j]
        for j in range(M + 1):

            # separately handle the first element in the list
            if i == 0:
                T[i][j] = abs(j - A[i])
            else:
                # initialize minimal adjustment cost with `sys.maxsize`
                T[i][j] = sys.maxsize

                # consider all `k` such that k >= max(j - target, 0) and
                # k <= min(M, j + target) and take minimum
                for k in range(max(j - target, 0), min(M, j + target) + 1):
                    T[i][j] = min(T[i][j], T[i - 1][k] + abs(A[i] - j))

    # return minimum value from the last row of `T`
    result = sys.maxsize
    for j in range(M + 1):
        result = min(result, T[-1][j])

    return result

if __name__ == '__main__':

    A = [55, 77, 52, 61, 39, 6, 25, 60, 49, 47]
    target = 10

    M = 100

    print('The minimal adjustment cost is', findMinAdjustmentCost(A, target))
```

**Author:** Aditya Goel

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.58/5. Vote count: 154

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Bottom-up](https://www.techiedelight.com/Tags/Tabulation/), [Hard](https://www.techiedelight.com/Tags/hard/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
