# Find the number of ways to fill an `N × 4` matrix with `1 × 4` tiles

> Source: https://www.techiedelight.com/find-ways-fill-n-x-4-matrix-with-1-x-4-tiles/

Given an `n × 4` matrix where `n` is a positive number, find the number of ways to fill the matrix with `1 × 4` tiles.

For example, there are 3 ways to place `1 × 4` tiles in a `5 × 4` matrix:

  1. Place all 5 tiles horizontally.
  2. Place 4 tiles vertically in the first 4 rows and 1 tile horizontally in the last row.
  3. Place 1 tile horizontally in the first row and adjust 4 tiles vertically in the remaining rows.

Similarly, there are 4 ways to place `1 × 4` tiles in a `6 × 4` matrix:

  1. Place all 6 tiles horizontally.
  2. Place 4 tiles vertically in the first 4 rows and the remaining 2 tiles horizontally in the last 2 rows.
  3. Place 2 tiles horizontally in the first 2 rows, and adjust the remaining 4 tiles vertically in the remaining rows.
  4. Place 2 tiles horizontally in the first and last row, and adjust the remaining 4 tiles vertically in the middle rows.

> 

From the above examples, it is evident that a single tile can be placed horizontally or 4 tiles can be placed together vertically (since the matrix has dimensions `n × 4`). So, the problem of computing the number of ways `T(n)` for an `n × 4` matrix can be broken down into the subproblems of computing `T(n-1)` and `T(n-4)`, and then adding the two.

Considering this, the recurrence relation `T(n)` can be written as:

T(n) = T(n-1) + T(n-4), where n > 4 and T(1) = T(2) = T(3) = 1 // all tiles can be placed horizontally only for `n <= 3` T(4) = 2 // all tiles can be placed horizontally or vertically.

Following is the C++, Java, and Python program that implements the above recurrence:

```cpp
#include <stdio.h>

// Recursive function to find the number of ways to fill an `n × 4` matrix
// with `1 × 4` tiles
int findTotalWays(int n)
{
    // base cases
    if (n < 1) {
        return 0;
    }

    if (n < 4) {
        return 1;
    }

    if (n == 4) {
        return 2;
    }

    // combine the results of placing a tile horizontally and
    // placing 4 tiles vertically
    return findTotalWays(n - 1) + findTotalWays(n - 4);
}

int main(void)
{
    int n = 5;
    printf("The total number of ways is %d", findTotalWays(n));

    return 0;
}
```

**Output:** The total number of ways is 3

##

```java
class Main
{
    // Recursive function to find the number of ways to fill an `N × 4` matrix
    // with `1 × 4` tiles
    public static int findTotalWays(int n)
    {
        // base cases
        if (n < 1) {
            return 0;
        }

        if (n < 4) {
            return 1;
        }

        if (n == 4) {
            return 2;
        }

        // combine the results of placing a tile horizontally and placing 4
        // tiles vertically
        return findTotalWays(n - 1) + findTotalWays(n - 4);
    }

    public static void main(String[] args)
    {
        int n = 5;
        System.out.print("The total number of ways is " + findTotalWays(n));
    }
}
```

##

```python3
# Recursive function to find the number of ways to fill an `n × 4` matrix
# with `1 × 4` tiles
def findTotalWays(n):

    # base cases
    if n < 1:
        return 0

    if n < 4:
        return 1

    if n == 4:
        return 2

    # combine the results of placing a tile horizontally and placing 4 tiles vertically
    return findTotalWays(n - 1) + findTotalWays(n - 4)

if __name__ == '__main__':

    n = 5
    print("The total number of ways is", findTotalWays(n))
```

The time complexity of the proposed solution is exponential since it computes solutions to the same subproblems repeatedly, i.e., the problem exhibits [overlapping subproblems](https://techiedelight.com/introduction-dynamic-programming/#overlapping-subproblems).

We can easily solve this problem by using [dynamic programming](https://techiedelight.com/dynamic-programming-interview-questions/). The idea is to construct a temporary array that stores the results of each subproblem using already computed results of the smaller subproblems. The algorithm can be implemented as follows in C, Java, and Python:

```c
#include <stdio.h>

// Function to find the number of ways to fill an `n × 4` matrix with `1 × 4` tiles
long findTotalWays(int n)
{
    // base case
    if (n < 1) {
        return 0;
    }

    if (n < 4) {
        return 1;
    }

    // construct a temporary array `T[]` such that `T[i]` stores the
    // total number of ways to fill an `i × 4` grid
    long T[n + 1];

    // handle separately for `n <= 4`
    T[1] = T[2] = T[3] = 1;
    T[4] = 2;

    // fill the array in a bottom-up fashion
    for (int i = 5; i <= n; i++) {
        // place a single tile horizontally or 4 tiles vertically together
        T[i] = T[i - 1] + T[i - 4];
    }

    return T[n];
}

int main(void)
{
    int n = 5;
    printf("The total number of ways is %ld", findTotalWays(n));

    return 0;
}
```

**Output:** The total number of ways is 3

##

```java
class Main
{
    // Function to find the number of ways to fill an `N × 4` matrix with `1 × 4` tiles
    public static long findTotalWays(int n)
    {
        // base case
        if (n < 1) {
            return 0;
        }

        if (n < 4) {
            return 1;
        }

        // construct a temporary array `T[]` such that `T[i]` stores the
        // total number of ways to fill an `i × 4` grid
        long[] T = new long[n + 1];

        // handle separately for `n <= 4`
        T[1] = T[2] = T[3] = 1;
        T[4] = 2;

        // fill the array in a bottom-up fashion
        for (int i = 5; i <= n; i++) {
            // place a single tile horizontally or 4 tiles vertically together
            T[i] = T[i - 1] + T[i - 4];
        }

        return T[n];
    }

    public static void main(String[] args)
    {
        int n = 5;
        System.out.println("The total number of ways is " + findTotalWays(n));
    }
}
```

##

```python3
# Function to find the number of ways to fill an `n × 4` matrix with `1 × 4` tiles
def findTotalWays(n):

    # base case
    if n < 1:
        return 0

    if n < 4:
        return 1

    # construct a temporary list `T[]` such that `T[i]` stores the
    # total number of ways to fill an `i × 4` grid
    T = [None] * (n + 1)

    # handle separately for `n <= 4`
    T[1] = T[2] = T[3] = 1
    T[4] = 2

    # fill the list in a bottom-up fashion
    for i in range(5, n + 1):
        # place a single tile horizontally or 4 tiles vertically together
        T[i] = T[i - 1] + T[i - 4]

    return T[n]

if __name__ == '__main__':

    n = 5
    print("The total number of ways is", findTotalWays(n))
```

The time complexity of the proposed solution is O(n) and requires O(n) extra space. We can make the program to run in constant space by storing solutions to only the last four subproblems at any point and discarding the rest. The space-efficient implementation is left as an exercise to the readers.
