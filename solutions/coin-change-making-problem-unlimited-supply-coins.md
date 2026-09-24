# Coin change-making problem

> Source: https://www.techiedelight.com/coin-change-making-problem-unlimited-supply-coins/

Given an unlimited supply of coins of given denominations, find the minimum number of coins required to get the desired change.

For example, consider `S = { 1, 3, 5, 7 }`.

If the desired change is 15, the minimum number of coins required is 3 (7 + 7 + 1) or (5 + 5 + 5) or (3 + 5 + 7) If the desired change is 18, the minimum number of coins required is 4 (7 + 7 + 3 + 1) or (5 + 5 + 5 + 3) or (7 + 5 + 5 + 1)

> 

The idea is to use [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/) to solve this problem. We recur to see if the total can be reached by including the coin or not for each coin of given denominations. If choosing the current coin resulted in the solution, update the minimum number of coins needed. Finally, return the minimum value we get after exhausting all combinations.

Following is the C++, Java, and Python implementation of the idea:

```cpp
#include <iostream>
#include <vector>
#include <climits>
using namespace std;

// Function to find the minimum number of coins required
// to get a total of `target` from set `S`
int findMinCoins(vector<int> const &S, int target)
{
    // if the total is 0, no coins are needed
    if (target == 0) {
        return 0;
    }

    // return infinity if total becomes negative
    if (target < 0) {
        return INT_MAX;
    }

    // initialize the minimum number of coins needed to infinity
    int coins = INT_MAX;

    // do for each coin
    for (int i: S)
    {
        // recur to see if total can be reached by including current coin `i`
        int result = findMinCoins(S, target - i);

        // update the minimum number of coins needed if choosing the current
        // coin resulted in a solution
        if (result != INT_MAX) {
            coins = min(coins, result + 1);
        }
    }

    // return the minimum number of coins needed
    return coins;
}

int main()
{
    // coins of given denominations
    vector<int> S = { 1, 2, 3, 4 };

    // total change required
    int target = 15;

    int coins = findMinCoins(S, target);
    if (coins != INT_MAX)
    {
        cout << "The minimum number of coins required to get the desired change is "
             << coins;
    }

    return 0;
}
```

**Output:** The minimum number of coins required to get the desired change is 4

##

```java
class Main
{
    // Function to find the minimum number of coins required
    // to get a total of `target` from set `S`
    public static int findMinCoins(int[] S, int target)
    {
        // if the total is 0, no coins are needed
        if (target == 0) {
            return 0;
        }

        // return infinity if total becomes negative
        if (target < 0) {
            return Integer.MAX_VALUE;
        }

        // initialize the minimum number of coins needed to infinity
        int coins = Integer.MAX_VALUE;

        // do for each coin
        for (int c: S)
        {
            // recur to see if total can be reached by including current coin `c`
            int result = findMinCoins(S, target - c);

            // update the minimum number of coins needed if choosing the current
            // coin resulted in a solution
            if (result != Integer.MAX_VALUE) {
                coins = Integer.min(coins, result + 1);
            }
        }

        // return the minimum number of coins needed
        return coins;
    }

    public static void main(String[] args)
    {
        // coins of given denominations
        int[] S = { 1, 3, 5, 7 };

        // total change required
        int target = 18;

        int coins = findMinCoins(S, target);
        if (coins != Integer.MAX_VALUE)
        {
            System.out.print("The minimum number of coins required to get the " +
                    "desired change is " + coins);
        }
    }
}
```

##

```python3
import sys

# Function to find the minimum number of coins required
# to get a total of `target` from set `S`
def findMinCoins(S, target):

    # if the total is 0, no coins are needed
    if target == 0:
        return 0

    # return infinity if total becomes negative
    if target < 0:
        return sys.maxsize

    # initialize the minimum number of coins needed to infinity
    coins = sys.maxsize

    # do for each coin
    for c in S:

        # recur to see if total can be reached by including current coin `c`
        result = findMinCoins(S, target - c)

        # update the minimum number of coins needed if choosing the current
        # coin resulted in a solution
        if result != sys.maxsize:
            coins = min(coins, result + 1)

    # return the minimum number of coins needed
    return coins

if __name__ == '__main__':

    # coins of given denominations
    S = [1, 3, 5, 7]

    # total change required
    target = 18

    coins = findMinCoins(S, target)
    if coins != sys.maxsize:
        print('The minimum number of coins required to get the desired change is',
            coins)
```

The time complexity of the above solution is exponential as each recursive call is making `n` recursive calls.

The problem has an [optimal substructure](https://techiedelight.com/introduction-dynamic-programming/#optimal-substructure) as the problem can be broken down into smaller subproblems, which can further be broken down into yet smaller subproblems, and so on. The problem also clearly exhibits [overlapping subproblems](https://techiedelight.com/introduction-dynamic-programming/#overlapping-subproblems), so we will end up solving the same subproblem over and over again. The repeated subproblems can be seen by drawing a recursion tree for higher values of `n`. We know that problems having optimal substructure and overlapping subproblems can be solved by dynamic programming, in which subproblem solutions are saved rather than computed repeatedly.

In the method is demonstrated below in C++, Java, and Python, we use a bottom-up approach, i.e., we solve smaller subproblems first, then solve larger subproblems from them. It computes `T[i]` for each `1 <= i <= target`, which stores the minimum number of coins needed to get a total of `i`. It makes use of smaller values of `i` already computed and has the same asymptotic runtime as _Memo_ ization but no recursion overhead.

```cpp
#include <iostream>
#include <vector>
#include <climits>
using namespace std;

// Function to find the minimum number of coins required
// to get a total of `target` from set `S`
int findMinCoins(vector<int> const &S, int target)
{
    // `T[i]` stores the minimum number of coins needed to get a total of `i`
    int T[target + 1];
    T[0] = 0;        // 0 coins are needed to get a total of `i`

    for (int i = 1; i <= target; i++)
    {
        // initialize the minimum number of coins needed to infinity
        T[i] = INT_MAX;
        int result = INT_MAX;

        // do for each coin
        for (int c: S)
        {
            // check if the index doesn't become negative by including current coin `c`
            if (i - c >= 0) {
                result = T[i - c];
            }

            // if total can be reached by including current coin `c`,
            // update the minimum number of coins needed `T[i]`
            if (result != INT_MAX) {
                T[i] = min(T[i], result + 1);
            }
        }
    }

    // `T[target]` stores the minimum number of coins needed to get a total of `target`
    return T[target];
}

int main()
{
    // coins of given denominations
    vector<int> S = { 1, 2, 3, 4 };

    // total change required
    int target = 15;

    int coins = findMinCoins(S, target);
    if (coins != INT_MAX)
    {
        cout << "The minimum number of coins required to get the desired change is "
             << coins;
    }

    return 0;
}
```

**Output:** The minimum number of coins required to get the desired change is 4

##

```java
class Main
{
    // Function to find the minimum number of coins required
    // to get a total of `target` from set `S`
    public static int findMinCoins(int[] S, int target)
    {
        // `T[i]` stores the minimum number of coins needed to get a total of `i`
        int[] T = new int[target + 1];

        for (int i = 1; i <= target; i++)
        {
            // initialize the minimum number of coins needed to infinity
            T[i] = Integer.MAX_VALUE;
            int result = Integer.MAX_VALUE;

            // do for each coin
            for (int c: S)
            {
                // check if the index doesn't become negative by including
                // current coin `c`
                if (i - c >= 0) {
                    result = T[i - c];
                }

                // if total can be reached by including current coin `c`,
                // update the minimum number of coins needed `T[i]`
                if (result != Integer.MAX_VALUE) {
                    T[i] = Integer.min(T[i], result + 1);
                }
            }
        }

        // `T[target]` stores the minimum number of coins needed to
        // get a total of `target`
        return T[target];
    }

    public static void main(String[] args)
    {
        // coins of given denominations
        int[] S = { 1, 2, 3, 4 };

        // total change required
        int target = 15;

        int coins = findMinCoins(S, target);
        if (coins != Integer.MAX_VALUE)
        {
            System.out.print("The minimum number of coins required to get the " +
                "desired change is " + coins);
        }
    }
}
```

##

```python3
import sys

# Function to find the minimum number of coins required
# to get a total of `target` from set `S`
def findMinCoins(S, target):

    # `T[i]` stores the minimum number of coins needed to get a total of i
    T = [0] * (target + 1)

    for i in range(1, target + 1):

        # initialize the minimum number of coins needed to infinity
        T[i] = sys.maxsize

        # do for each coin
        for c in range(len(S)):
            # check if the index doesn't become negative by including
            # current coin `c`
            if i - S[c] >= 0:
                result = T[i - S[c]]

                # if total can be reached by including current coin `c`,
                # update the minimum number of coins needed `T[i]`
                if result != sys.maxsize:
                    T[i] = min(T[i], result + 1)

    # `T[target]` stores the minimum number of coins needed to get a total of `target`
    return T[target]

if __name__ == '__main__':

    # coins of given denominations
    S = [1, 2, 3, 4]

    # total change required
    target = 15

    coins = findMinCoins(S, target)
    if coins != sys.maxsize:
        print('The minimum number of coins required to get the desired change is',
            coins)
```

The time complexity of the above solution is O(n.target), where `n` is the total number of coins and `target` is the total change required. The auxiliary space required by the program is O(target).

**Exercise:** Find a minimum number of coins required to get the desired change from a limited supply of coins of given denominations.
