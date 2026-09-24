# Coin Change Problem

> Source: https://www.techiedelight.com/coin-change-problem-find-total-number-ways-get-denomination-coins/

Given an unlimited supply of coins of given denominations, find the total number of distinct ways to get the desired change.

For example,

**Input:** S = { 1, 3, 5, 7 }, target = 8 The total number of ways is 6 { 1, 7 } { 3, 5 } { 1, 1, 3, 3 } { 1, 1, 1, 5 } { 1, 1, 1, 1, 1, 3 } { 1, 1, 1, 1, 1, 1, 1, 1 } **Input:** S = { 1, 2, 3 }, target = 4 The total number of ways is 4 { 1, 3 } { 2, 2 } { 1, 1, 2 } { 1, 1, 1, 1 }

> 

The idea is to use [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/) to solve this problem. We recur to see if the total can be reached by choosing the coin or not for each coin of given denominations. If choosing the current coin results in the solution, update the total number of ways.

Following is the C++, Java, and Python implementation of the idea:

```cpp
#include <iostream>
#include <vector>
using namespace std;

// Function to find the total number of ways to get a change of `target`
// from an unlimited supply of coins in set `S`
int count(vector<int> const &S, int target)
{
    // if the total is 0, return 1
    if (target == 0) {
        return 1;
    }

    // return 0 if total becomes negative
    if (target < 0) {
        return 0;
    }

    // initialize the total number of ways to 0
    int result = 0;

    // do for each coin
    for (int c: S)
    {
        // recur to see if total can be reached by including current coin `c`
        result += count(S, target - c);
    }

    // return the total number of ways
    return result;
}

// Coin Change Problem
int main()
{
    // `n` coins of given denominations
    vector<int> S = { 1, 2, 3 };

    // total change required
    int target = 4;

    cout << "The total number of ways to get the desired change is "
         << count(S, target);

    return 0;
}
```

**Output:** The total number of ways to get the desired change is 7

##

```java
class Main
{
    // Function to find the total number of ways to get a change
    // of `target` from an unlimited supply of coins in set `S`
    public static int count(int[] S, int target)
    {
        // if the total is 0, return 1
        if (target == 0) {
            return 1;
        }

        // return 0 if total becomes negative
        if (target < 0) {
            return 0;
        }

        // initialize the total number of ways to 0
        int result = 0;

        // do for each coin
        for (int c: S)
        {
            // recur to see if total can be reached by including current coin `c`
            result += count(S, target - c);
        }

        // return the total number of ways
        return result;
    }

    public static void main(String[] args)
    {
        // `n` coins of given denominations
        int[] S = { 1, 2, 3 };

        // total change required
        int target = 4;

        System.out.println("The total number of ways to get the desired change is "
                + count(S, target));
    }
}
```

##

```python3
# Function to find the total number of ways to get a change of `target` from an
# unlimited supply of coins in set `S`
def count(S, target):

    # if the total is 0, return 1
    if target == 0:
        return 1

    # return 0 if total becomes negative
    if target < 0:
        return 0

    # initialize the total number of ways to 0
    result = 0

    # do for each coin
    for c in S:
        # recur to see if total can be reached by including current coin `c`
        result += count(S, target - c)

    # return the total number of ways
    return result

if __name__ == '__main__':

    # `n` coins of given denominations
    S = [1, 2, 3]

    # total change required
    target = 4

    print('The total number of ways to get the desired change is', count(S, target))
```

The time complexity of the above solution is exponential since each recursive call is making `n` recursive calls. It also requires additional space for the call stack.

There is an issue with the above solution. The above solution doesn’t always return distinct sets. For example, for set `{1, 2, 3}`, it returns 7 as some ways are permutations of each other, as shown below:

{1, 1, 1, 1} {1, 1, 2}, {2, 1, 1}, {1, 2, 1} {2, 2} {1, 3}, {3, 1}

How can we get distinct ways?

The idea is somewhat similar to the [Knapsack problem](https://techiedelight.com/0-1-knapsack-problem/). We can recursively define the problem as:

count(S, n, total) = count(S, n, total-S[n]) + count(S, n-1, total);

That is, for each coin.

  1. Include current coin `S[n]` in solution and recur with remaining change `total-S[n]` with the same number of coins.
  2. Exclude current coin `S[n]` from solution and recur for remaining coins `n-1`.

Finally, return the total ways by including or excluding the current coin. The recursion’s base case is when a solution is found (i.e., change becomes 0) or the solution doesn’t exist (when no coins are left, or total becomes negative). Following is the C++, Java, and Python implementation of the idea:

```cpp
#include <iostream>
#include <vector>
using namespace std;

// Function to find the total number of distinct ways to get a change of `target`
// from an unlimited supply of coins in set `S`
int count(vector<int> const &S, int n, int target)
{
    // if the total is 0, return 1 (solution found)
    if (target == 0) {
        return 1;
    }

    // return 0 (solution does not exist) if total becomes negative,
    // no elements are left
    if (target < 0 || n < 0) {
        return 0;
    }

    // Case 1. Include current coin `S[n]` in solution and recur
    // with remaining change `target-S[n]` with the same number of coins
    int include = count(S, n, target - S[n]);

    // Case 2. Exclude current coin `S[n]` from solution and recur
    // for remaining coins `n-1`
    int exclude = count(S, n - 1, target);

    // return total ways by including or excluding current coin
    return include + exclude;
}

// Coin Change Problem
int main()
{
    // `n` coins of given denominations
    vector<int> S = { 1, 2, 3 };
    int n = S.size();

    // total change required
    int target = 4;

    cout << "The total number of ways to get the desired change is "
         << count(S, n - 1, target);

    return 0;
}
```

**Output:** The total number of ways to get the desired change is 4

##

```java
class Main
{
    // Function to find the total number of distinct ways to get
    // a change of `target` from an unlimited supply of coins in set `S`
    public static int count(int[] S, int n, int target)
    {
        // if the total is 0, return 1 (solution found)
        if (target == 0) {
            return 1;
        }

        // return 0 (solution does not exist) if total becomes negative,
        // no elements are left
        if (target < 0 || n < 0) {
            return 0;
        }

        // Case 1. Include current coin `S[n]` in solution and recur
        // with remaining change `target-S[n]` with the same number of coins
        int incl = count(S, n, target - S[n]);

        // Case 2. Exclude current coin `S[n]` from solution and recur
        // for remaining coins `n-1`
        int excl = count(S, n - 1, target);

        // return total ways by including or excluding current coin
        return incl + excl;
    }

    // Coin Change Problem
    public static void main(String[] args)
    {
        // `n` coins of given denominations
        int[] S = { 1, 2, 3 };

        // total change required
        int target = 4;

        System.out.print("The total number of ways to get the desired change is "
                                + count(S, S.length - 1, target));
    }
}
```

##

```python3
# Function to find the total number of distinct ways to get a change of `target`
# from an unlimited supply of coins in set `S`
def count(S, n, target):

    # if the total is 0, return 1 (solution found)
    if target == 0:
        return 1

    # return 0 (solution does not exist) if total becomes negative,
    # no elements are left
    if target < 0 or n < 0:
        return 0

    # Case 1. Include current coin `S[n]` in solution and recur
    # with remaining change `target-S[n]` with the same number of coins
    incl = count(S, n, target - S[n])

    # Case 2. Exclude current coin `S[n]` from solution and recur
    # for remaining coins `n-1`
    excl = count(S, n - 1, target)

    # return total ways by including or excluding current coin
    return incl + excl

# Coin Change Problem
if __name__ == '__main__':

    # `n` coins of given denominations
    S = [1, 2, 3]

    # total change required
    target = 4

    print('The total number of ways to get the desired change is',
        count(S, len(S) - 1, target))
```

The time complexity of the above solution is still exponential and requires auxiliary space for the call stack.

The problem has an [optimal substructure](https://techiedelight.com/introduction-dynamic-programming/#optimal-substructure) as the problem can be broken down into smaller subproblems, which can further be broken down into yet smaller subproblems, and so on. The problem also clearly exhibits [overlapping subproblems](https://techiedelight.com/introduction-dynamic-programming/#overlapping-subproblems), so we will end up solving the same subproblem over and over again. The repeated subproblems can be seen by drawing a recursion tree for higher values of the desired change. We know that problems with optimal substructure and overlapping subproblems can be solved using dynamic programming where the subproblem solutions are _memo_ ized rather than computed and again.

Following is the C++, Java, and Python implementation of the idea:

```cpp
#include <iostream>
#include <vector>
#include <unordered_map>
#include <string>
using namespace std;

// Function to find the total number of distinct ways to get a change of `target`
// from an unlimited supply of coins in set `S`
int count(vector<int> const &S, int n, int target, auto &lookup)
{
    // if the total is 0, return 1 (solution found)
    if (target == 0) {
        return 1;
    }

    // return 0 (solution does not exist) if total becomes negative,
    // no elements are left
    if (target < 0 || n < 0) {
        return 0;
    }

    // construct a unique map key from dynamic elements of the input
    string key = to_string(n) + "|" + to_string(target);

    // if the subproblem is seen for the first time, solve it and
    // store its result in a map
    if (lookup.find(key) == lookup.end())
    {
        // Case 1. Include current coin `S[n]` in solution and recur
        // with remaining change `target-S[n]` with the same number of coins
        int include = count(S, n, target - S[n], lookup);

        // Case 2. Exclude current coin `S[n]` from solution and recur
        // for remaining coins `n-1`
        int exclude = count(S, n - 1, target, lookup);

        // assign total ways by including or excluding current coin
        lookup[key] = include + exclude;
    }

    // return solution to the current subproblem
    return lookup[key];
}

// Coin Change Problem
int main()
{
    // `n` coins of given denominations
    vector<int> S = { 1, 2, 3 };
    int n = S.size();

    // total change required
    int target = 4;

    // create a map to store solutions to subproblems
    unordered_map<string, int> lookup;

    cout << "The total number of ways to get the desired change is "
         << count(S, n - 1, target, lookup);

    return 0;
}
```

**Output:** The minimum number of coins required to get the desired change is 4
