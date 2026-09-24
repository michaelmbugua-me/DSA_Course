# Find total ways to achieve a given sum with `n` throws of dice having `k` faces

> Source: https://www.techiedelight.com/total-ways-sum-with-n-throws-dice-having-k-faces/

[Dynamic Programming](https://www.techiedelight.com/Category/Dynamic-Programming/)

Calculate the total number of ways to achieve a given sum with `n` throws of dice having `k` faces.

For example,

**Input:** The total number of throws `n` is 2 The total number of faces `k` is 6 (i.e., each dice has values from 1 to 6) The desired sum is 10 **Output:** The total number of ways is 3. The possible throws are (6, 4), (4, 6), (5, 5)

> 

The problem has an [optimal substructure](https://techiedelight.com/introduction-dynamic-programming/#optimal-substructure) as the problem can be broken down into smaller subproblems, which can further be broken down into yet smaller subproblems, and so on.

The idea is to use [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/) to solve this problem. We reduce the desired sum by values between 1 and `k` and recur for the remaining sum with throws left for each throw. If the expected sum is reached with `n` dices, we have found a way.

The algorithm can be implemented as follows in C, Java, and Python:

```c
#include <stdio.h>

// Function to calculate the total number of ways to achieve a given
// sum with `n` throws of dice having `k` faces
int count(int n, int k, int target)
{
    // if the desired sum is reached with `n` dices
    if (n == 0) {
        return (target == 0) ? 1 : 0;
    }

    // the desired sum can't be reached with the current configuration
    if (target < 0 || k * n < target || n > target) {
        return 0;
    }

    int result = 0;

    // recur for all possible solutions
    for (int i = 1; i <= k; i++) {
        result += count(n - 1, k, target - i);
    }

    return result;
}

int main(void)
{
    int n = 4;      // n throws
    int k = 6;      // values 1 to 6

    int target = 15;   // desired sum

    printf("The total number of ways is %d", count(n, k, target));

    return 0;
}
```

**Output:** The total number of ways is 140

##

```java
class Main
{
    // Function to calculate the total number of ways to achieve a given
    // sum with `n` throws of dice having `k` faces
    public static int count(int n, int k, int target)
    {
        // if the desired sum is reached with `n` dices
        if (n == 0) {
            return (target == 0) ? 1: 0;
        }

        // the desired sum can't be reached with the current configuration
        if (target < 0 || k * n < target || n > target) {
            return 0;
        }

        int result = 0;

        // recur for all possible solutions
        for (int i = 1; i <= k; i++) {
            result += count(n - 1, k, target - i);
        }

        return result;
    }

    public static void main(String[] args)
    {
        int n = 4;      // n throws
        int k = 6;      // values 1 to 6

        int target = 15;   // desired sum

        System.out.println("The total number of ways is " + count(n, k, target));
    }
}
```

##

```python3
# Function to calculate the total number of ways to achieve a given
# sum with `n` throws of dice having `k` faces
def count(n, k, target):

    # if the desired sum is reached with `n` dices
    if n == 0:
        return 1 if (target == 0) else 0

    # the desired sum can't be reached with the current configuration
    if target < 0 or k * n < target or n > target:
        return 0

    result = 0

    # recur for all possible solutions
    for i in range(1, k + 1):
        result += count(n - 1, k, target - i)

    return result

if __name__ == '__main__':

    n = 4       # n throws
    k = 6       # values 1 to 6

    target = 15    # desired sum

    print('The total number of ways is', count(n, k, target))
```

The time complexity of the above solution is exponential and occupies space in the call stack.

The above solution exhibits [overlapping subproblems](https://techiedelight.com/introduction-dynamic-programming/#overlapping-subproblems). If we draw the solution’s recursion tree, we can see that the same subproblems are getting computed repeatedly. We know that problems with optimal substructure and overlapping subproblems can be solved using dynamic programming, in which subproblem solutions are memoized rather than computed again and again. The _memo_ ized version follows the top-down approach since we first break the problem into subproblems and then calculate and store values.

The approach is demonstrated below in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
using namespace std;

// Function to calculate the total number of ways to achieve a given
// sum with `n` throws of dice having `k` faces
int count(int n, int k, int target, auto &lookup)
{
    // if the desired sum is reached with `n` dices
    if (n == 0) {
        return (target == 0) ? 1 : 0;
    }

    // the desired sum can't be reached with the current configuration
    if (target < 0 || k * n < target || n > target) {
        return 0;
    }

    // if the subproblem is seen for the first time, solve it and
    // store its result in a 2D array or map
    if (lookup[n][target] == 0)
    {
        // recur for all possible solutions
        for (int i = 1; i <= k; i++) {
            lookup[n][target] += count(n - 1, k, target - i, lookup);
        }
    }

    // return solution to the current subproblem
    return lookup[n][target];
}

int main()
{
    int n = 4;      // n throws
    int k = 6;      // values 1 to 6

    int target = 15;   // desired sum

    // Create a lookup table to store solutions to subproblems
    // lookup[i][j] stores the total number of ways to achieve sum `j`
    // with `i` throws of given dice.
    vector<vector<int>> lookup(n + 1, vector<int>(target + 1));

    cout << "The total number of ways is " << count(n, k, target, lookup);

    return 0;
}
```

**Output:** The total number of ways is 140

##

```java
class Main
{
    // Function to calculate the total number of ways to achieve a given
    // sum with `n` throws of dice having `k` faces
    public static int count(int n, int k, int target, int[][] lookup)
    {
        // if the desired sum is reached with `n` dices
        if (n == 0) {
            return (target == 0) ? 1 : 0;
        }

        // the desired sum can't be reached with the current configuration
        if (target < 0 || k * n < target || n > target) {
            return 0;
        }

        // if the subproblem is seen for the first time, solve it and
        // store its result in a 2D array or map
        if (lookup[n][target] == 0)
        {
            // recur for all possible solutions
            for (int i = 1; i <= k; i++) {
                lookup[n][target] += count(n - 1, k, target - i, lookup);
            }
        }

        // return solution to the current subproblem
        return lookup[n][target];
    }

    public static void main(String[] args)
    {
        int n = 4;      // n throws
        int k = 6;      // values 1 to 6

        int target = 15;   // desired sum

        // create a lookup table to store solutions to subproblems
        // lookup[i][j] stores the total number of ways to achieve sum `j`
        // with `i` throws of given dice.
        int[][] lookup = new int[n + 1][target + 1];

        System.out.println("The total number of ways is " +
                count(n, k, target, lookup));
    }
}
```

##

```python3
# Function to calculate the total number of ways to achieve a given
# sum with `n` throws of dice having `k` faces
def count(n, k, target, lookup):

    # if the desired sum is reached with `n` dices
    if n == 0:
        return 1 if (target == 0) else 0

    # the desired sum can't be reached with the current configuration
    if target < 0 or k * n < target or n > target:
        return 0

    # if the subproblem is seen for the first time, solve it and
    # store its result
    if lookup[n][target] == 0:
        # recur for all possible solutions
        for i in range(1, k + 1):
            lookup[n][target] += count(n - 1, k, target - i, lookup)

    # return solution to the current subproblem
    return lookup[n][target]

if __name__ == '__main__':

    n = 4       # n throws
    k = 6       # values 1 to 6

    target = 15    # desired sum

    # create a lookup table to store solutions to subproblems
    # lookup[i][j] stores the total number of ways to achieve sum `j`
    # with `i` throws of given dice.
    lookup = [[0 for x in range(target + 1)] for y in range(n + 1)]

    print('The total number of ways is', count(n, k, target, lookup))
```

The time complexity of the above solution is O(n × k × target), and the auxiliary space used by the program is O(n × target).

We can also solve this problem in a bottom-up manner. In the bottom-up approach, we solve smaller subproblems first, then solve larger subproblems from them.

**Exercise:** Write bottom-up version of above solution.
