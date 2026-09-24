# Find total ways to reach n’th stair with at-most `m` steps

> Source: https://www.techiedelight.com/find-total-ways-reach-nth-stair-with-atmost-m-steps/

[Dynamic Programming](https://www.techiedelight.com/Category/Dynamic-Programming/)

Given a staircase, find the total number of ways to reach the `n'th` stair from the bottom of the stair when a person is only allowed to take at most `m` steps at a time.

For example,

**Input:** n = 3, m = 2 **Output:** Total ways to reach the 3rd stair with at most 2 steps are 3 1 step + 1 step + 1 step 1 step + 2 steps 2 steps + 1 step **Input:** n = 4, m = 3 **Output:** Total ways to reach the 4th stair with at most 3 steps are 7 1 step + 1 step + 1 step + 1 steps 1 step + 1 step + 2 steps 1 step + 2 steps + 1 step 1 step + 3 steps 2 steps + 1 step + 1 step 2 steps + 2 steps 3 steps + 1 step

> 

In the [previous post](https://techiedelight.com/find-total-ways-to-reach-nth-stair/), we have discussed how to get the number of ways to reach the `n'th` stair from the bottom of the stair, when a person is allowed to take at most three steps at a time. In this post, we will extend the solution for at most `m` steps.

For a maximum of 3 steps at a time, we have come up with the recurrence relation `T(n)`:

T(n) = T(n-1) + T(n-2) + T(n-3), where n >= 0 and T(0) = 1, T(1) = 1, and T(2) = 2

For at most `m` steps, the recurrence relation `T(n)` can be written as:

T(n) = T(n-1) + T(n-2) + … T(n-m)

i.e. we can reach the `n'th` stair from either `(n-1)'th` stair, `(n-2)'th` stair, `(n-3)'th`. … `(n-m)'th` stair. Following is the C, Java, and Python program that implements the above recurrence:

```c
#include <stdio.h>

// Recursive function to find total ways to reach the n'th stair from the bottom
// when a person is allowed to take at most `m` steps at a time
int totalWays(int n, int m)
{
    // base case: invalid input
    if (n < 0) {
        return 0;
    }

    // base case: 1 way (with no steps)
    if (n == 0) {
        return 1;
    }

    int count = 0;
    for (int i = 1; i <= m; i++) {
        count += totalWays(n - i, m);
    }

    return count;
}

int main(void)
{
    int n = 4, m = 3;

    printf("Total ways to reach the %d'th stair with at most %d steps are %d",
            n, m, totalWays(n, m));

    return 0;
}
```

**Output:** Total ways to reach the 4th stair with at most 3 steps are 7

##

```java
class Main
{
    // Recursive function to find total ways to reach the n'th stair from the bottom
    // when a person is allowed to take at most `m` steps at a time
    public static int totalWays(int n, int m)
    {
        // base case: invalid input
        if (n < 0) {
            return 0;
        }

        // base case: 1 way (with no steps)
        if (n == 0) {
            return 1;
        }

        int count = 0;
        for (int i = 1; i <= m; i++) {
            count += totalWays(n - i, m);
        }

        return count;
    }

    public static void main(String[] args)
    {
        int n = 4, m = 3;

        System.out.printf("Total ways to reach the %d'th stair with at most " +
                                "%d steps are %d", n, m, totalWays(n, m));
    }
}
```

##

```python3
# Recursive function to find total ways to reach the n'th stair from the bottom
# when a person is allowed to take at most `m` steps at a time
def totalWays(n, m):

    # base case: invalid input
    if n < 0:
        return 0

    # base case: 1 way (with no steps)
    if n == 0:
        return 1

    count = 0
    for i in range(1, m + 1):
        count += totalWays(n - i, m)

    return count

if __name__ == '__main__':

    n = 4
    m = 3

    print(f'Total ways to reach the {n}\'th stair with at most {m} steps are',
        totalWays(n, m))
```

The time complexity of the above solution is exponential since it computes solutions to the same subproblems repeatedly, i.e., the problem exhibits [overlapping subproblems](https://techiedelight.com/introduction-dynamic-programming/#overlapping-subproblems).

The problem has an [optimal substructure](https://techiedelight.com/introduction-dynamic-programming/#optimal-substructure) since a solution to a problem can be derived using the solution to its subproblems. Since both [dynamic programming](https://techiedelight.com/dynamic-programming-interview-questions/) properties are satisfied, dynamic programming can bring down the time complexity to O(m.n) and the space complexity to O(n). We can do this in either a top-down or bottom-up fashion:

## 1\. Top-Down Approach

We can use memoization to solve this problem in a top-down fashion. The idea is to store the results of function calls and return the cached result when the same inputs occur again.

Following is the C, Java, and Python program that demonstrates it:

```c
#include <stdio.h>
#include <string.h>

// Recursive DP function to find total ways to reach the n'th stair from the bottom
// when a person is allowed to take at most `m` steps at a time
int totalWays(int n, int m, int lookup[])
{
    // base case: invalid input
    if (n < 0) {
        return 0;
    }

    // base case: 1 way (with no steps)
    if (n == 0) {
        return 1;
    }

    // if the subproblem is not seen before
    if (lookup[n] == 0)
    {
        for (int i = 1; i <= m; i++) {
            lookup[n] += totalWays(n - i, m, lookup);
        }
    }

    // return the subproblem solution
    return lookup[n];
}

int main(void)
{
    int n = 4, m = 3;

    // create an array of size `n+1` storing a solution to the subproblems
    int lookup[n+1];

    // initialize the array by 0's
    memset(lookup, 0, sizeof(int) * (n + 1));

    printf("Total ways to reach the %d'th stair with at most %d steps are %d",
        n, m, totalWays(n, m, lookup));

    return 0;
}
```

**Output:** Total ways to reach the 4th stair with at most 3 steps are 7

##

```java
class Main
{
    // Recursive DP function to find total ways to reach the n'th stair from the bottom
    // when a person is allowed to take at most `m` steps at a time
    public static int totalWays(int n, int m, int[] lookup)
    {
        // base case: invalid input
        if (n < 0) {
            return 0;
        }

        // base case: 1 way (with no steps)
        if (n == 0) {
            return 1;
        }

        // if the subproblem is not seen before
        if (lookup[n] == 0)
        {
            for (int i = 1; i <= m; i++) {
                lookup[n] += totalWays(n - i, m, lookup);
            }
        }

        // return the subproblem solution
        return lookup[n];
    }

    public static void main(String[] args)
    {
        int n = 4, m = 3;

        // create an array of size `n+1` storing a solution to the subproblems
        int[] lookup = new int[n+1];

        System.out.printf("Total ways to reach the %d'th stair with at most " +
                            "%d steps are %d", n, m, totalWays(n, m, lookup));
    }
}
```

##

```python3
# Recursive DP function to find total ways to reach the n'th stair from the bottom
# when a person is allowed to take at most `m` steps at a time
def totalWays(n, m, lookup):

    # base case: invalid input
    if n < 0:
        return 0

    # base case: 1 way (with no steps)
    if n == 0:
        return 1

    # if the subproblem is not seen before
    if lookup[n] == 0:
        for i in range(1, m + 1):
            lookup[n] += totalWays(n - i, m, lookup)

    # return the subproblem solution
    return lookup[n]

if __name__ == '__main__':

    n = 4
    m = 3

    # create a list of `n+1` size for storing a solution to the subproblems
    lookup = [0] * (n + 1)

    print(f'Total ways to reach the {n}\'th stair with at most {m} steps are',
        totalWays(n, m, lookup))
```

## 2\. Bottom-Up Approach

We can also use tabulation to solve this problem in a bottom-up fashion. The idea is to construct a temporary array that stores each subproblem results using already computed results of the smaller subproblems. The algorithm can be implemented as follows in C, Java, and Python:

```c
#include <stdio.h>

// Recursive function to find total ways to reach the n'th stair from the bottom
// when a person is allowed to take at most `m` steps at a time
int totalWays(int n, int m)
{
    // base case
    if (n == 1 || m == 1) {
        return 1;
    }

    // create an array of size `n+1` for storing solutions to the subproblems
    int lookup[n + 1];

    // base case: 1 way (with no steps)
    lookup[0] = 1;

    // 1 way to reach the 1st stair
    lookup[1] = 1;

    // 2 ways to reach the 2nd stair
    lookup[2] = 2;

    // fill the lookup table in a bottom-up manner
    for (int i = 3; i <= n; i++)
    {
        lookup[i] = 0;
        for (int j = 1; j <= m && (i - j) >= 0; j++) {
            lookup[i] += lookup[i - j];
        }
    }

    return lookup[n];
}

int main(void)
{
    int n = 4, m = 3;

    printf("Total ways to reach the %d'th stair with at most %d steps are %d",
        n, m, totalWays(n, m));

    return 0;
}
```

**Output:** Total ways to reach the 4th stair with at most 3 steps are 7
