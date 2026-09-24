# Find minimum jumps required to reach the destination

> Source: https://www.techiedelight.com/find-minimum-jumps-required-reach-destination/

Given an array of non-negative integers, where each array element represents the maximum number of positions one can move forward from that element. Find the minimum number of jumps required to reach a given destination from a given source within the array.

If any element has value zero in the array, the destination cannot be reached through that element. If the source itself has value zero, return infinity as the destination cannot be reached at all. To make the problem simpler, let’s assume the source and destination to be the start and end of the array.

For example,

**Input:** nums[] = { 4, 2, 0, 3, 2, 0, 1, 8 } **Output:** Minimum jumps required to reach the destination are 3. 3 jumps: (4 —> 3 —> 1 —> 8) or (4 —> 2 —> 1 —> 8) 4 jumps: (4 —> 2 —> 3 —> 1 —> 8) or (4 —> 3 —> 2 —> 1 —> 8) 5 jumps: (4 —> 2 —> 3 —> 2 —> 1 —> 8) **Input:** nums[] = { 4, 2, 2, 1, 0, 8, 1 } **Output:** Minimum jumps required to reach the destination are infinity. This is because no matter what path we choose, we will always end up in a dead cell. 4 —> 2 —> 2 —> 1 —> 0 4 —> 2 —> 1 —> 0 4 —> 1 —> 0 4 —> 0

> 

The idea is to recur for all elements reachable from the source and consider their minimum cost. The recurrence relation `T(n)` can be written as:

T(source, dest) = minimum{T(j, dest)} for all j reachable from source

The time complexity of this solution would be exponential since we might end up computing the same subproblem repeatedly. We can use [dynamic programming](https://techiedelight.com/dynamic-programming-interview-questions/) to optimize the code since this problem exhibits both properties of dynamic programming, i.e., [overlapping subproblems](https://techiedelight.com/introduction-dynamic-programming/#overlapping-subproblems) and [optimal substructure](https://techiedelight.com/introduction-dynamic-programming/#optimal-substructure).

## 1\. Using Memoization

We can use memoization to solve this problem in a top-down fashion. The idea is to store the results of function calls and return the cached result when the same inputs occur again.

```c
#include <stdio.h>
#include <stdlib.h>
#include <limits.h>
#include <string.h>

// Function to find a minimum of two elements
int min(int x, int y) { return (x < y) ? x: y; }

// Find minimum jumps required to reach the destination
int findMinJumps(int nums[], int i, int n, int lookup[])
{
    // base case: destination is reached
    if (i == n - 1) {
        return 0;
    }

    // base case: array index out of bound or destination is
    // unreachable from the source
    if (i >= n || nums[i] == 0) {
        return INT_MAX;
    }

    // if the subproblem is seen before
    if (lookup[i] != 0) {
        return lookup[i];
    }

    // find the minimum jumps required to reach the destination by considering
    // the minimum of all elements reachable from `nums[i]`
    int min_jumps = INT_MAX;
    for (int j = i + 1; j <= i + nums[i]; j++)
    {
        int cost = findMinJumps(nums, j, n, lookup);
        if (cost != INT_MAX) {
            min_jumps = min(min_jumps, cost + 1);
        }
    }

    // if the subproblem is seen for the first time
    return (lookup[i] = min_jumps);
}

int findMinimumJumps(int nums[], int n)
{
    // base case
    if (n == 0) {
        return 0;
    }

    // create an auxiliary array to store solutions to the subproblems and
    // initialize it with 0
    int lookup[n];
    memset(lookup, 0, n * sizeof(int));

    return findMinJumps(nums, 0, n, lookup);
}

int main(void)
{
    int nums[] = { 1, 3, 6, 1, 0, 9 };
    int n = sizeof(nums) / sizeof(nums[0]);

    printf("The minimum jumps required to reach the destination are %d\n",
        findMinimumJumps(nums, n));

    return 0;
}
```

**Output:** The minimum jumps required to reach the destination are 3

##

```java
class Main
{
    // Find minimum jumps required to reach the destination
    public static int findMinJumps(int[] nums, int i, int n, int[] lookup)
    {
        // base case: destination is reached
        if (i == n - 1) {
            return 0;
        }

        // base case: array index out of bound or destination is
        // unreachable from the source
        if (i >= n || nums[i] == 0) {
            return Integer.MAX_VALUE;
        }

        // if the subproblem is seen before
        if (lookup[i] != 0) {
            return lookup[i];
        }

        // find the minimum jumps required to reach the destination by considering
        // the minimum of all elements reachable from `nums[i]`
        int min_jumps = Integer.MAX_VALUE;
        for (int j = i + 1; j <= i + nums[i]; j++)
        {
            int cost = findMinJumps(nums, j, n, lookup);
            if (cost != Integer.MAX_VALUE) {
                min_jumps = Math.min(min_jumps, cost + 1);
            }
        }

        // if the subproblem is seen for the first time
        return (lookup[i] = min_jumps);
    }

    public static int findMinimumJumps(int[] nums)
    {
        // base case
        if (nums == null || nums.length == 0) {
            return 0;
        }

        // create an auxiliary array to store solutions to the subproblems and
        // initialize it with 0
        int[] lookup = new int[nums.length];

        return findMinJumps(nums, 0, nums.length, lookup);
    }

    public static void main(String[] args)
    {
        int[] nums = { 1, 3, 6, 1, 0, 9 };

        System.out.println("The minimum jumps required to reach the destination are " +
                                    findMinimumJumps(nums));
    }
}
```

##

```python3
import sys

# Find minimum jumps required to reach the destination
def findMinJumps(nums, i, n, lookup):

    # base case: destination is reached
    if i == n - 1:
        return 0

    # base case: list index out of bound or destination is
    # unreachable from the source
    if i >= n or nums[i] == 0:
        return sys.maxsize

    # if the subproblem is seen before
    if lookup[i]:
        return lookup[i]

    # find the minimum jumps required to reach the destination by considering
    # the minimum of all elements reachable from `nums[i]`
    min_jumps = sys.maxsize
    for j in range(i + 1, i + nums[i] + 1):
        cost = findMinJumps(nums, j, n, lookup)
        if cost != sys.maxsize:
            min_jumps = min(min_jumps, cost + 1)

    # if the subproblem is seen for the first time
    lookup[i] = min_jumps
    return lookup[i]

def findMinimumJumps(nums):

    # base case
    if not nums:
        return 0

    # create an auxiliary list to store solutions to the subproblems and
    # initialize it with 0
    lookup = [0] * len(nums)

    return findMinJumps(nums, 0, len(nums), lookup)

if __name__ == '__main__':

    nums = [1, 3, 6, 1, 0, 9]

    print('The minimum jumps required to reach the destination are',
        findMinimumJumps(nums))
```

The time complexity of the above top-down solution is O(n3) and requires O(n2) extra space, where `n` is the size of the input.

## 2\. Using Tabulation

Another idea is to construct an auxiliary array `lookup[]` for storing the subproblem solutions. For an array `nums[]`, `lookup[i]` will store the minimum jumps required to reach nums[i] from source nums[0]. The algorithm can be implemented as follows in C, Java, and Python, where `lookup[]` is filled in a bottom-up fashion.

```c
#include <stdio.h>
#include <limits.h>

// Function to find a minimum of two elements
int min(int x, int y) { return (x < y) ? x: y; }

// Find minimum jumps required to reach the destination
int findMinJumps(int nums[], int n)
{
    // base case
    if (n == 0) {
        return 0;
    }

    // base case: the destination is unreachable from the source
    if (n > 1 && nums[0] == 0) {
        return INT_MAX;
    }

    // lookup[i] stores minimum jumps required to reach nums[i] from source nums[0]
    int lookup[n];
    for (int i = 0; i < n; i++) {
        lookup[i] = INT_MAX;
    }

    // destination is the same as the source
    lookup[0] = 0;

    // do for every position
    for (int i = 0; i < n; i++)
    {
        // find the minimum jumps required to reach the destination by
        // considering the minimum from each position reachable from nums[i]
        for (int j = 1; (i + j < n) && j <= min(n - 1, nums[i]) &&
            lookup[i] != INT_MAX; j++)
        {
            lookup[i + j] = (lookup[i + j] != INT_MAX) ?
                            min(lookup[i + j], lookup[i] + 1): (lookup[i] + 1);
        }
    }

    // lookup[n-1] would have the result since nums[n-1] is the destination
    return lookup[n - 1];
}

int main(void)
{
    int nums[] = { 4, 2, 0, 3, 2, 0, 1, 8 };
    int n = sizeof(nums) / sizeof(nums[0]);

    printf("The minimum jumps required to reach the destination are %d\n",
        findMinJumps(nums, n));

    return 0;
}
```

**Output:** The minimum jumps required to reach the destination are 3

##

```java
import java.util.Arrays;

class Main
{
    // Find minimum jumps required to reach the destination
    public static int findMinJumps(int[] nums)
    {
        // base case
        if (nums == null || nums.length == 0) {
            return 0;
        }

        // get the length of the array
        int n = nums.length;

        // base case: the destination is unreachable from the source
        if (n > 1 && nums[0] == 0) {
            return Integer.MAX_VALUE;
        }

        // lookup[i] stores minimum jumps required to reach nums[i] from source nums[0]
        int[] lookup = new int[n];
        Arrays.fill(lookup, Integer.MAX_VALUE);

        // destination is the same as the source
        lookup[0] = 0;

        // do for every position
        for (int i = 0; i < n; i++)
        {
            // find the minimum jumps required to reach the destination by
            // considering the minimum from each position reachable from nums[i]
            for (int j = 1; (i + j < n) && j <= Math.min(n - 1, nums[i]) &&
                lookup[i] != Integer.MAX_VALUE; j++)
            {
                lookup[i + j] = (lookup[i + j] != Integer.MAX_VALUE) ?
                            Math.min(lookup[i + j], lookup[i] + 1): (lookup[i] + 1);
            }
        }

        // lookup[n-1] would have the result since nums[n-1] is the destination
        return lookup[n - 1];
    }

    public static void main(String[] args)
    {
        int[] nums = { 4, 2, 0, 3, 2, 0, 1, 8 };

        System.out.println("The minimum jumps required to reach the destination are " +
                                    findMinJumps(nums));
    }
}
```

##

```python3
import sys

# Find minimum jumps required to reach the destination
def findMinJumps(nums):

    # base case
    if not nums:
        return 0

    # get length of the list
    n = len(nums)

    # base case: the destination is unreachable from the source
    if n > 1 and nums[0] == 0:
        return sys.maxsize

    # lookup[i] stores the minimum jumps required to reach nums[i] from source nums[0]
    lookup = [sys.maxsize] * n

    # destination is the same as the source
    lookup[0] = 0

    # do for every position
    for i in range(n):

        # find the minimum jumps required to reach the destination by
        # considering the minimum from each position reachable from nums[i]
        j = 1
        while (i + j < n) and j <= min(n - 1, nums[i]) and lookup[i] != sys.maxsize:
            lookup[i + j] = min(lookup[i + j], lookup[i] + 1) \
                if (lookup[i + j] != sys.maxsize) else (lookup[i] + 1)
            j = j + 1

    # lookup[n-1] would have the result since nums[n-1] is the destination
    return lookup[n - 1]

if __name__ == '__main__':

    nums = [4, 2, 0, 3, 2, 0, 1, 8]
    print('The minimum jumps required to reach the destination are',
        findMinJumps(nums))
```

The time complexity of the above bottom-up solution is O(n2) and requires O(n) extra space, where `n` is the size of the input.
