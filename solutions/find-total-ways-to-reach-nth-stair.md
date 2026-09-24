# Find total ways to reach the n’th stair from the bottom

> Source: https://www.techiedelight.com/find-total-ways-to-reach-nth-stair/

[Dynamic Programming](https://www.techiedelight.com/Category/Dynamic-Programming/)

Given a staircase, find the total number of ways to reach the `n'th` stair from the bottom of the stair when a person can only climb either 1 or 2 or 3 stairs at a time.

For example,

**Total ways to reach the 3rd stair are 4** 1 step + 1 step + 1 step 1 step + 2 steps 2 steps + 1 step 3 steps **Total ways to reach the 4th stair are 7** 1 step + 1 step + 1 step + 1 steps 1 step + 1 step + 2 steps 1 step + 2 steps + 1 step 1 step + 3 steps 2 steps + 1 step + 1 step 2 steps + 2 steps 3 steps + 1 step

> 

Let `T(n)` be the total number of ways to reach the `n'th` stair from the bottom. Since a person is only allowed to climb either 1 or 2 or 3 stairs at a time, we can reach the `n'th` stair from either `(n-1)'th` stair, `(n-2)'th` stair, or from `(n-3)'th` stair. Considering this, the recurrence relation `T(n)` can be written as:

T(n) = T(n-1) + T(n-2) + T(n-3), where n >= 0 and T(0) = 1, T(1) = 1, and T(2) = 2

Following is the C, Java, and Python program that implements the above recurrence:

```c
#include <stdio.h>

// Recursive function to find total ways to reach the n'th stair from the bottom
// when a person is allowed to climb either 1 or 2 or 3 stairs at a time
int totalWays(int n)
{
    // base case
    if (n < 0) {
        return 0;
    }

    // base case: there is one way to cover it with no steps
    if (n == 0) {
        return 1;
    }

    // combine results of taking 1 step or 2 steps or 3 steps at a time
    return totalWays(n - 1) + totalWays(n - 2) + totalWays(n - 3);
}

int main(void)
{
    int n = 4;
    printf("Total ways to reach the %d'th stair are %d", n, totalWays(n));

    return 0;
}
```

**Output:** Total ways to reach the 4th stair are 7

##

```java
class Main
{
    // Recursive function to find total ways to reach the n'th stair from the bottom
    // when a person is allowed to climb either 1 or 2 or 3 stairs at a time
    public static int totalWays(int n)
    {
        // base case
        if (n < 0) {
            return 0;
        }

        // base case: there is one way to cover it with no steps
        if (n == 0) {
            return 1;
        }

        // combine results of taking 1 step or 2 steps or 3 steps at a time
        return totalWays(n - 1) + totalWays(n - 2) + totalWays(n - 3);
    }

    public static void main(String[] args)
    {
        int n = 4;
        System.out.printf("Total ways to reach the %d'th stair are %d",
                            n, totalWays(n));
    }
}
```

##

```python3
# Recursive function to find total ways to reach the n'th stair from the bottom
# when a person is allowed to climb either 1 or 2 or 3 stairs at a time
def totalWays(n):

    # base case
    if n < 0:
        return 0

    # base case: there is one way to cover it with no steps
    if n == 0:
        return 1

    # combine results of taking 1 step or 2 steps or 3 steps at a time
    return totalWays(n - 1) + totalWays(n - 2) + totalWays(n - 3)

if __name__ == '__main__':

    n = 4
    print(f'Total ways to reach the {n}\'th stair are', totalWays(n))
```

The time complexity of the above solution is exponential since it computes solutions to the same subproblems repeatedly, i.e., the problem exhibits [overlapping subproblems](https://techiedelight.com/introduction-dynamic-programming/#overlapping-subproblems).

The problem has an [optimal substructure](https://techiedelight.com/introduction-dynamic-programming/#optimal-substructure) since a solution to a problem can be derived using the solution to its subproblems. Since both Dynamic programming properties are satisfied, dynamic programming can be used to optimize the code to linear time. We can do this in two ways:

## 1\. Top-Down Approach

We can use memoization to solve this problem in a top-down fashion. The idea is to store the results of function calls and return the cached result when the same input occurs again.

Following is the C, Java, and Python program that demonstrates it:

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Recursive DP function to find total ways to reach the n'th stair from the bottom
// when a person is allowed to climb either 1 or 2 or 3 stairs at a time
int totalWays(int n, int lookup[])
{
    // base case
    if (n < 0) {
        return 0;
    }

    // base case: there is one way to cover it with no steps
    if (n == 0) {
        return 1;
    }

    // if the subproblem is not seen before
    if (lookup[n] == 0)
    {
        // combine results of taking 1 step or 2 steps or 3 steps at a time
        lookup[n] = totalWays(n - 1, lookup) + totalWays(n - 2, lookup)
                + totalWays(n - 3, lookup);
    }

    // return the subproblem solution
    return lookup[n];
}

int main(void)
{
    int n = 4;

    // create an array of size `n+1` for storing solution to the subproblems
    // and initialize it by 0
    int lookup[n + 1];
    memset(lookup, 0, sizeof(int) * (n + 1));

    printf("Total ways to reach the %d'th stair are %d", n, totalWays(n, lookup));

    return 0;
}
```

**Output:** Total ways to reach the 4th stair are 7

##

```java
class Main
{
    // Recursive DP function to find total ways to reach the n'th stair from the bottom
    // when a person is allowed to climb either 1 or 2 or 3 stairs at a time
    public static int totalWays(int n, int[] lookup)
    {
        // base case
        if (n < 0) {
            return 0;
        }

        // base case: there is one way to cover it with no steps
        if (n == 0) {
            return 1;
        }

        // if the subproblem is not seen before
        if (lookup[n] == 0)
        {
            // combine results of taking 1 step or 2 steps or 3 steps at a time
            lookup[n] = totalWays(n - 1, lookup) + totalWays(n - 2, lookup) + totalWays(n - 3, lookup);
        }

        // return the subproblem solution
        return lookup[n];
    }

    public static void main(String[] args)
    {
        int n = 4;

        // create an array of size `n+1` for storing solution to the subproblems
        // and initialize it by 0
        int[] lookup = new int[n + 1];

        System.out.printf("Total ways to reach the %d'th stair are %d",
                            n, totalWays(n, lookup));
    }
}
```

##

```python3
# Recursive DP function to find total ways to reach the n'th stair from the bottom
# when a person is allowed to climb either 1 or 2 or 3 stairs at a time
def totalWays(n, lookup):

    # base case
    if n < 0:
        return 0

    # base case: there is one way to cover it with no steps
    if n == 0:
        return 1

    # if the subproblem is not seen before
    if lookup[n] == 0:
        # combine results of taking 1 step or 2 steps or 3 steps at a time
        lookup[n] = totalWays(n - 1, lookup) + totalWays(n - 2, lookup) + \
                totalWays(n - 3, lookup)

    # return the subproblem solution
    return lookup[n]

if __name__ == '__main__':

    n = 4

    # create a list of `n+1` size for storing solution to the subproblems
    # and initialize it by 0
    lookup = [0] * (n + 1)

    print(f'Total ways to reach the {n}\'th stair are', totalWays(n, lookup))
```

## 2\. Bottom-Up Approach

We can also use tabulation to solve this problem in a bottom-up fashion. The idea is to construct a temporary array that stores each subproblem results using the already computed results of the smaller subproblems. This can be implemented as follows in C, Java, and Python:

```c
#include <stdio.h>

// DP function to find total ways to reach the n'th stair from the bottom
// when a person is allowed to climb either 1 or 2 or 3 stairs at a time
int totalWays(int n)
{
    // base case
    if (n <= 2) {
        return n;
    }

    // create an array of size `n+1` for storing solutions to the subproblems
    int lookup[n + 1];

    // base case: 1 way (with no steps)
    lookup[0] = 1;

    // There is only 1 way to reach the 1st stair
    lookup[1] = 1;

    // There are 2 ways to reach the 2nd stair
    lookup[2] = 2;

    // fill the lookup table in a bottom-up manner
    for (int i = 3; i <= n; i++) {
        lookup[i] = lookup[i - 1] + lookup[i - 2] + lookup[i - 3];
    }

    return lookup[n];
}

int main(void)
{
    int n = 4;
    printf("Total ways to reach the %d'th stair are %d", n, totalWays(n));

    return 0;
}
```

**Output:** Total ways to reach the 4th stair are 7
