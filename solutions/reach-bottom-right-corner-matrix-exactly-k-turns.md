# Ways to reach the bottom-right corner of a matrix with exactly `k` turns allowed

> Source: https://www.techiedelight.com/reach-bottom-right-corner-matrix-exactly-k-turns/

Given an `M × N` matrix, count the number of different ways to reach the bottom-right corner of a matrix from its top-left corner with exactly `k` turn allowed and using only the directions _right_ or _down_.

A turn is defined as a down move immediately followed by a right move, or a right move immediately followed by a down move.

For example, consider a `3 × 3` matrix.

**Input:** k = 1 **Output:** Total number of paths are 2 (0, 0) —> (0, 1) —> (0, 2) —> (1, 2) —> (2, 2) (0, 0) —> (1, 0) —> (2, 0) —> (2, 1) —> (2, 2) **Input:** k = 2 **Output:** Total number of paths are 2 (0, 0) —> (0, 1) —> (1, 1) —> (2, 1) —> (2, 2) (0, 0) —> (1, 0) —> (1, 1) —> (1, 2) —> (2, 2) **Input:** k = 3 **Output:** Total number of paths are 2 (0, 0) —> (0, 1) —> (1, 1) —> (1, 2) —> (2, 2) (0, 0) —> (1, 0) —> (1, 1) —> (2, 1) —> (2, 2) **Input:** k = 4 **Output:** Total number of paths are 0

> 

We can recursively solve this problem. The idea is to keep track of the current direction and number of turns so far. If the current direction is along a column, we have two options for the next move – continue moving along the column, or turn right and decrement the number of turns by 1. Similarly, if the current direction is along a row, continue moving in the same direction, or turn down and decrement the number of turns by 1. A path is found if the destination is reached with exactly `k` turns.

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
using namespace std;

// Function to check whether (i, j) is a valid matrix coordinate or not
bool isValid(int i, int j, int M, int N) {
    return (i >= 0 && i < M && j >= 0 && j < N);
}

// Recursive function to count the number of different ways to reach the last
// cell (M-1, N-1) of a matrix from the given cell (i, j) with `k` turns left.
// `isCol` flag is true when the current direction is along a column, false otherwise.

int totalWays(int M, int N, int i, int j, int k, bool isCol)
{
    // If the number of turns is exhausted or if the cell is invalid
    if (k == -1 || !isValid(i, j, M, N)) {
        return 0;
    }

    // If the destination is reached with exactly `k` turns
    if (k == 0 && i == M - 1 && j == N - 1) {
        return 1;
    }

    // If the current direction is along a column
    if (isCol)
    {
        // 1. Continue moving along the column
        // 2. Turn right and decrement the number of turns by 1

        return totalWays(M, N, i + 1, j, k, isCol) +
            totalWays(M, N, i, j + 1, k - 1, !isCol);
    }

    // If the current direction is along a row
    // 1. Continue moving along the row
    // 2. Turn down and decrement the number of turns by 1

    return totalWays(M, N, i, j + 1, k, isCol) +
        totalWays(M, N, i + 1, j, k - 1, !isCol);
}

// Function to count the number of different ways to reach the bottom-right corner
// of a matrix from its top-left corner with exactly `k` turns allowed
int totalWays(int M, int N, int k)
{
    int i = 0, j = 0;

    return totalWays(M, N, i + 1, j, k, true) +   // Recur by moving along a column
        totalWays(M, N, i, j + 1, k, false);      // Recur by moving along a row
}

int main()
{
    // `M × N` matrix
    int M = 3, N = 3;

    // Number of turns
    int k = 2;

    cout << "The total number of ways is " << totalWays(M, N, k);

    return 0;
}
```

**Output:** The total number of paths is 2

##

```java
class Main
{
    // Function to check whether (i, j) is a valid matrix coordinate or not
    public static boolean isValid(int i, int j, int M, int N) {
        return (i >= 0 && i < M && j >= 0 && j < N);
    }

    // Recursive function to count the number of different ways to reach the last
    // cell (M-1, N-1) of a matrix from the given cell (i, j) with `k` turns left.
    // `isCol` flag is true only if the current direction is along the column.

    public static int totalWays(int M, int N, int i, int j, int k, boolean isCol)
    {
        // If the number of turns is exhausted or if the cell is invalid
        if (k == -1 || !isValid(i, j, M, N)) {
            return 0;
        }

        // If the destination is reached with exactly `k` turns
        if (k == 0 && i == M - 1 && j == N - 1) {
            return 1;
        }

        // If the current direction is along a column
        if (isCol)
        {
            // 1. Continue moving along the column
            // 2. Turn right and decrement the number of turns by 1

            return totalWays(M, N, i + 1, j, k, isCol) +
                totalWays(M, N, i, j + 1, k - 1, !isCol);
        }

        // If the current direction is along a row
        // 1. Continue moving along the row
        // 2. Turn down and decrement the number of turns by 1

        return totalWays(M, N, i, j + 1, k, isCol) +
            totalWays(M, N, i + 1, j, k - 1, !isCol);
    }

    // Function to count the number of different ways to reach the bottom-right corner
    // of a matrix from its top-left corner with exactly `k` turns allowed
    public static int totalWays(int M, int N, int k)
    {
        int i = 0, j = 0;

        return totalWays(M, N, i + 1, j, k, true) +   // Recur by moving along a column
            totalWays(M, N, i, j + 1, k, false);      // Recur by moving along a row
    }

    public static void main(String[] args)
    {
        // `M × N` matrix
        int M = 3, N = 3;

        // Number of turns
        int k = 2;

        System.out.print("The total number of ways is " + totalWays(M, N, k));
    }
}
```

##

```python3
# Function to check whether (i, j) is a valid matrix coordinate or not
def isValid(i, j, M, N):
    return 0 <= i < M and 0 <= j < N

# Recursive function to count the number of different ways to reach the last
# cell (M-1, N-1) of a matrix from the given cell (i, j) with `k` turns left.
# `isCol` flag is true when the current direction is along the column, false otherwise.
def totalWays(M, N, i, j, k, isCol):
    # If the number of turns is exhausted or if the cell is invalid
    if k == -1 or not isValid(i, j, M, N):
        return 0

    # If the destination is reached with exactly `k` turns
    if k == 0 and i == M - 1 and j == N - 1:
        return 1

    # If the current direction is along a column
    if isCol:
        # 1. Continue moving along the column
        # 2. Turn right and decrement the number of turns by 1
        return totalWays(M, N, i + 1, j, k, isCol) + \
            totalWays(M, N, i, j + 1, k - 1, not isCol)

    # If the current direction is along a row
    # 1. Continue moving along the row
    # 2. Turn down and decrement the number of turns by 1
    return totalWays(M, N, i, j + 1, k, isCol) + \
        totalWays(M, N, i + 1, j, k - 1, not isCol)

# Function to count the number of different ways to reach the bottom-right corner
# of a matrix from its top-left corner with exactly `k` turns allowed
def findTotalWays(M, N, k, i=0, j=0):
    # Recur by moving along a column and a row.
    return totalWays(M, N, i + 1, j, k, True) + totalWays(M, N, i, j + 1, k, False)

if __name__ == '__main__':

    # `M × N` matrix
    M = N = 3

    # Number of turns
    k = 2

    print("The total number of ways is", findTotalWays(M, N, k))
```

The time complexity of the proposed solution is exponential since it recomputes the same subproblem repeatedly. We can easily optimize the code to run in O(M × N × k) time with [dynamic programming](https://techiedelight.com/introduction-dynamic-programming/). The idea is to store the results of function calls and return the cached result when the same input occurs again.

**Exercise:**

1\. Implement a dynamic programming solution using memoization. 2\. Modify the solution for at most `k` turns.

Also See:

> [Find the index of a row containing the maximum number of 1’s in a binary matrix](https://www.techiedelight.com/find-index-row-containing-maximum-number-1s-matrix/ "Find the index of a row containing the maximum number of 1’s in a binary matrix")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.82/5. Vote count: 157

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hard](https://www.techiedelight.com/Tags/hard/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
