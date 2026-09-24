# Pots of Gold Game Problem using Dynamic Programming

> Source: https://www.techiedelight.com/pots-gold-game-dynamic-programming/

[Dynamic Programming](https://www.techiedelight.com/Category/Dynamic-Programming/)

There are two players, `A` and `B`, in Pots of gold game, and pots of gold arranged in a line, each containing some gold coins. The players can see how many coins are there in each gold pot, and each player gets alternating turns in which the player can pick a pot from either end of the line. The winner is the player who has a higher number of coins at the end. The objective is to “maximize” the number of coins collected by `A`, assuming `B` also plays “optimally”, and `A` starts the game.

For example,

**Player Opponent** 4, 6, 2, 3 3 4, 6, 2 4 6, 2 6 2 2 **9 coins 6 coins**

**Player Opponent** 6, 1, 4, 9, 8, 5 6 1, 4, 9, 8, 5 5 1, 4, 9, 8 8 1, 4, 9 9 1, 4 4 1 1 **18 coins 15 coins**

> 

The idea is to find an optimal strategy that makes the player wins, knowing that an opponent is playing optimally. The player has two choices for coin`[i…j]`, where `i` and `j` denote the front and rear of the line, respectively.

1\. If the player chooses the front pot `i`, the opponent is left to choose from [i+1, j].

  * If the opponent chooses front pot `i+1`, recur for [i+2, j].
  * If the opponent chooses rear pot `j`, recur for [i+1, j-1].

2\. If the player chooses rear pot `j`, the opponent is left to choose from [i, j-1].

  * If the opponent chooses front pot `i`, recur for [i+1, j-1].
  * If the opponent chooses rear pot `j-1`, recur for [i, j-2].

Since the opponent is playing optimally, he will try to minimize the player’s points, i.e., the opponent will make a choice that will leave the player with minimum coins. So, we can recursively define the problem as:

| coin[i]  _(if i = j)_  _optimalStrategy_(i, j) = | max(coin[i], coin[j])  _(if i + 1 = j)_ | max (coin[i] + min(_optimalStrategy_(coin, i + 2, j),  _optimalStrategy_(coin, i + 1, j – 1)), coin[j] + min(_optimalStrategy_(coin, i + 1, j – 1),  _optimalStrategy_(coin, i, j – 2)))

Following is the C++, Java, and Python implementation of the above approach:

```cpp
#include <iostream>
#include <string>
using namespace std;

// Recursive function to maximize the number of coins collected by a player,
// assuming that the opponent also plays optimally
int findMaxCoins(int coin[], int i, int j)
{
    // base case: one pot left, only one choice possible
    if (i == j) {
        return coin[i];
    }

    // if we are left with only two pots, choose one with maximum coins
    if (i + 1 == j) {
        return max(coin[i], coin[j]);
    }

    // if a player chooses the front pot `i`, the opponent is left to choose
    // from [i+1, j].
    // 1. If the opponent chooses front pot `i+1`, recur for [i+2, j]
    // 2. If the opponent chooses rear pot `j`, recur for [i+1, j-1]

    int start = coin[i] + min(findMaxCoins(coin, i + 2, j),
                            findMaxCoins(coin, i + 1, j - 1));

    // if a player chooses rear pot `j`, the opponent is left to choose
    // from [i, j-1].
    // 1. If the opponent chooses front pot `i`, recur for [i+1, j-1]
    // 2. If the opponent chooses rear pot `j-1`, recur for [i, j-2]

    int end = coin[j] + min(findMaxCoins(coin, i + 1, j - 1),
                    findMaxCoins(coin, i, j - 2));

    // return the maximum of two choices
    return max(start, end);
}

// Pots of gold game using dynamic programming
int main()
{
    // pots of gold arranged in a line
    int coin[] = { 4, 6, 2, 3 };

    // total number of pots (`n` is even)
    int n = sizeof(coin) / sizeof(coin[0]);

    cout << "The Maximum coins collected by player is "
         << findMaxCoins(coin, 0, n - 1);

    return 0;
}
```

**Output:** The maximum coins collected by the player is 9

##

```java
class Main
{
    // Recursive function to maximize the number of coins collected by a player,
    // assuming that the opponent also plays optimally
    public static int findMaxCoins(int[] coin, int i, int j)
    {
        // base case: one pot left, only one choice possible
        if (i == j) {
            return coin[i];
        }

        // if we are left with only two pots, choose one with maximum coins
        if (i + 1 == j) {
            return Integer.max(coin[i], coin[j]);
        }

        // if a player chooses the front pot `i`, the opponent is left to choose
        // from [i+1, j].
        // 1. If the opponent chooses front pot `i+1`, recur for [i+2, j]
        // 2. If the opponent chooses rear pot `j`, recur for [i+1, j-1]

        int start = coin[i] + Integer.min(findMaxCoins(coin, i + 2, j),
                                        findMaxCoins(coin, i + 1, j - 1));

        // if a player chooses rear pot `j`, the opponent is left to choose
        // from [i, j-1].
        // 1. If the opponent chooses front pot `i`, recur for [i+1, j-1]
        // 2. If the opponent chooses rear pot `j-1`, recur for [i, j-2]

        int end = coin[j] + Integer.min(findMaxCoins(coin, i + 1, j - 1),
                                        findMaxCoins(coin, i, j - 2));

        // return the maximum of two choices
        return Integer.max(start, end);
    }

    // Pots of gold game using dynamic programming
    public static void main(String[] args)
    {
        // pots of gold (even number) arranged in a line
        int[] coin = { 4, 6, 2, 3 };

        System.out.print("The maximum coins collected by player is "
                        + findMaxCoins(coin, 0, coin.length - 1));
    }
}
```

##

```python3
# Recursive function to maximize the number of coins collected by a player,
# assuming that the opponent also plays optimally
def findMaxCoins(coin, i, j):

    # base case: one pot left, only one choice possible
    if i == j:
        return coin[i]

    # if we are left with only two pots, choose one with maximum coins
    if i + 1 == j:
        return max(coin[i], coin[j])

    # if a player chooses front pot `i`, the opponent is left to choose from [i+1, j]
    # 1. If the opponent chooses front pot `i+1`, recur for [i+2, j]
    # 2. If the opponent chooses rear pot `j`, recur for [i+1, j-1]

    start = coin[i] + min(findMaxCoins(coin, i + 2, j),
                        findMaxCoins(coin, i + 1, j - 1))

    # if a player chooses rear pot `j`, the opponent is left to choose from [i, j-1]
    # 1. If the opponent chooses front pot `i`, recur for [i+1, j-1]
    # 2. If the opponent chooses rear pot `j-1`, recur for [i, j-2]

    end = coin[j] + min(findMaxCoins(coin, i + 1, j - 1),
                        findMaxCoins(coin, i, j - 2))

    # return the maximum of two choices
    return max(start, end)

# Pots of gold game using dynamic programming
if __name__ == '__main__':

    # pots of gold (even number) arranged in a line
    coin = [4, 6, 2, 3]

    print('The maximum coins collected by player is',
        findMaxCoins(coin, 0, len(coin) - 1))
```

The time complexity of the above solution is exponential and occupies space in the call stack.

The problem has [optimal substructure](https://techiedelight.com/introduction-dynamic-programming/#optimal-substructure). We have seen that the problem can be broken down into smaller subproblems, which can further be broken down into yet smaller subproblems, and so on. The problem also exhibits [overlapping subproblems](https://techiedelight.com/introduction-dynamic-programming/#overlapping-subproblems), so we will end up solving the same subproblem over and over again. We know that problems with optimal substructure and overlapping subproblems can be solved by dynamic programming, where subproblem solutions are _memo_ ized rather than computed and again.

Following is the C++, Java, and Python program that demonstrates it:

```cpp
#include <iostream>
#include <vector>
#include <string>
using namespace std;

// Function to maximize the number of coins collected by a player,
// assuming that the opponent also plays optimally
int findMaxCoins(vector<int> const &coin, int i, int j, auto &lookup)
{
    // base case: one pot left, only one choice possible
    if (i == j) {
        return coin[i];
    }

    // if we are left with only two pots, choose one with maximum coins
    if (i + 1 == j) {
        return max(coin[i], coin[j]);
    }

    // if the subproblem is seen for the first time, solve it and
    // store its result in a lookup table
    if (lookup[i][j] == 0)
    {
        // if a player chooses the front pot `i`, the opponent is left to choose
        // from [i+1, j].
        // 1. If the opponent chooses front pot `i+1`, recur for [i+2, j]
        // 2. If the opponent chooses rear pot `j`, recur for [i+1, j-1]

        int start = coin[i] + min(findMaxCoins(coin, i + 2, j, lookup),
                                findMaxCoins(coin, i + 1, j - 1, lookup));

        // if a player chooses rear pot `j`, the opponent is left to choose
        // from [i, j-1].
        // 1. If the opponent chooses front pot `i`, recur for [i+1, j-1]
        // 2. If the opponent chooses rear pot `j-1`, recur for [i, j-2]

        int end = coin[j] + min(findMaxCoins(coin, i + 1, j - 1, lookup),
                        findMaxCoins(coin, i, j - 2, lookup));

        // assign a maximum of two choices
        lookup[i][j] = max(start, end);
    }

    // return the subproblem solution from the map
    return lookup[i][j];
}

// Pots of gold game using dynamic programming
int main()
{
    // pots of gold arranged in a line
    vector<int> coin = { 4, 6, 2, 3 };

    // total number of pots (`n` is even)
    int n = coin.size();

    // Create a table to store solutions to subproblems
    vector<vector<int>> lookup(n + 1, vector<int>(n + 1));

    cout << "The Maximum coins collected by player is "
         << findMaxCoins(coin, 0, n - 1, lookup);

    return 0;
}
```

**Output:** The maximum coins collected by the player is 9

##

```java
class Main
{
    // Function to maximize the number of coins collected by a player,
    // assuming that the opponent also plays optimally
    public static int findMaxCoins(int[] coin, int i, int j, int[][] lookup)
    {
        // base case: one pot left, only one choice possible
        if (i == j) {
            return coin[i];
        }

        // if we are left with only two pots, choose one with maximum coins
        if (i + 1 == j) {
            return Integer.max(coin[i], coin[j]);
        }

        // if the subproblem is seen for the first time, solve it and
        // store its result in a lookup table
        if (lookup[i][j] == 0)
        {
            // if a player chooses the front pot `i`, the opponent is left to choose
            // from [i+1, j].
            // 1. If the opponent chooses front pot `i+1`, recur for [i+2, j]
            // 2. If the opponent chooses rear pot `j`, recur for [i+1, j-1]

            int start = coin[i] + Integer.min(findMaxCoins(coin, i + 2, j, lookup),
                            findMaxCoins(coin, i + 1, j - 1, lookup));

            // if a player chooses rear pot `j`, the opponent is left to choose
            // from [i, j-1].
            // 1. If the opponent chooses front pot `i`, recur for [i+1, j-1]
            // 2. If the opponent chooses rear pot `j-1`, recur for [i, j-2]

            int end = coin[j] + Integer.min(findMaxCoins(coin, i + 1, j - 1, lookup),
                            findMaxCoins(coin, i, j - 2, lookup));

            // assign a maximum of two choices
            lookup[i][j] = Integer.max(start, end);
        }

        // return the subproblem solution from the map
        return lookup[i][j];
    }

    public static void main(String[] args)
    {
        // pots of gold arranged in a line
        int[] coin = { 4, 6, 2, 3 };

        // create a table to store solutions to subproblems
        int[][] lookup = new int[coin.length][coin.length];

        System.out.println("The maximum coins collected by player is "
                + findMaxCoins(coin, 0, coin.length - 1, lookup));
    }
}
```

##

```python3
# Function to maximize the number of coins collected by a player,
# assuming that the opponent also plays optimally
def findMaxCoins(coin, i, j, lookup):

    # base case: one pot left, only one choice possible
    if i == j:
        return coin[i]

    # if we are left with only two pots, choose one with maximum coins
    if i + 1 == j:
        return max(coin[i], coin[j])

    # if the subproblem is seen for the first time, solve it and
    # store its result in a lookup table
    if lookup[i][j] == 0:
        # if the player chooses front pot `i`, the opponent is left to choose
        # from [i+1, j].
        # 1. If the opponent chooses front pot `i+1`, recur for [i+2, j]
        # 2. If the opponent chooses rear pot `j`, recur for [i+1, j-1]

        start = coin[i] + min(findMaxCoins(coin, i + 2, j, lookup),
                            findMaxCoins(coin, i + 1, j - 1, lookup))

        # if a player chooses rear pot `j`, the opponent is left to choose
        # from [i, j-1].
        # 1. If the opponent chooses front pot `i`, recur for [i+1, j-1]
        # 2. If the opponent chooses rear pot `j-1`, recur for [i, j-2]

        end = coin[j] + min(findMaxCoins(coin, i + 1, j - 1, lookup),
                            findMaxCoins(coin, i, j - 2, lookup))

        # assign a maximum of two choices
        lookup[i][j] = max(start, end)

    # return the subproblem solution from the dictionary
    return lookup[i][j]

if __name__ == '__main__':

    # pots of gold arranged in a line
    coin = [4, 6, 2, 3]

    # Create a table to store solutions to subproblems
    lookup = [[0 for x in range(len(coin))] for y in range(len(coin))]

    print('The maximum coins collected by player is',
        findMaxCoins(coin, 0, len(coin) - 1, lookup))
```

The time complexity of the above top-down solution is O(n2) and requires O(n2) extra space, where `n` is the total number of gold pots.

Following is a bottom-up version of the above approach in C++, Java, and Python:

```cpp
#include <iostream>
#include <string>
#include <cstdlib>
using namespace std;

int calculate(int **T, int i, int j)
{
    if (i <= j) {
        return T[i][j];
    }

    return 0;
}

// Iterative function to maximize the number of coins collected by a player,
// assuming that the opponent also plays optimally
int findMaxCoins(int* coin, int n)
{
    // base case: one pot left, only one choice possible
    if (n == 1) {
        return coin[0];
    }

    // if we are left with only two pots, choose one with maximum coins
    if (n == 2) {
        return max(coin[0], coin[1]);
    }

    // create a dynamic 2D matrix to store subproblem solutions
    int** T = new int*[n];
    for (int i = 0; i < n; i++) {
        T[i] = new int[n];
    }

    // Fill the matrix in a diagonal manner, as shown below
    // Iteration 0: Fill T[][] from T[0][0] to T[n-1][n-1]
    // Iteration 1: Fill T[][] from T[0][1] to T[n-2][n-1]
    // Iteration 2: Fill T[][] from T[0][2] to T[n-3][n-1]
    // …
    // Iteration n-2: Fill T[][] from T[0][n-2] to T[1][n-1]
    // Iteration n-1: Fill T[][] from T[0][n-1] to T[0][n-1]
    for (int iteration = 0; iteration < n; iteration++)
    {
        for (int i = 0, j = iteration; j < n; i++, j++)
        {
            // if a player chooses the front pot `i`, the opponent is left to choose
            // from [i+1, j].
            // 1. If the opponent chooses front pot `i+1`, recur for [i+2, j]
            // 2. If the opponent chooses rear pot `j`, recur for [i+1, j-1]

            int start = coin[i] + min(calculate(T, i + 2, j),
                                    calculate(T, i + 1, j - 1));

            // if a player chooses rear pot `j`, the opponent is left to choose
            // from [i, j-1].
            // 1. If the opponent chooses front pot `i`, recur for [i+1, j-1]
            // 2. If the opponent chooses rear pot `j-1`, recur for [i, j-2]

            int end = coin[j] + min(calculate(T, i + 1, j - 1),
                                    calculate(T, i, j - 2));

            T[i][j] = max(start, end);
        }
    }

    int result = T[0][n - 1];

    // deallocate memory before returning using the `delete[]` operator
    for (int i = 0; i < n; i++) {
        delete[] T[i];
    }
    delete[] T;

    return result;
}

// Pots of gold game using dynamic programming
int main()
{
    // pots of gold arranged in a line
    int coin[] = { 4, 6, 2, 3 };

    // total number of pots (`n` is even)
    int n = sizeof(coin) / sizeof(coin[0]);

    cout << "The Maximum coins collected by player is "
         << findMaxCoins(coin, n);

    return 0;
}
```

**Output:** The maximum coins collected by the player is 9
