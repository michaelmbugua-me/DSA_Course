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

Following is a TypeScript implementation of the above approach:

```ts
// Recursive function to maximize the number of coins collected by a player,
// assuming that the opponent also plays optimally
function findMaxCoins(coin: number[], i: number, j: number): number {

    // base case: one pot left, only one choice possible
    if (i === j) {
        return coin[i];
    }

    // if we are left with only two pots, choose one with maximum coins
    if (i + 1 === j) {
        return Math.max(coin[i], coin[j]);
    }

    // if a player chooses front pot `i`, the opponent is left to choose from [i+1, j]
    // 1. If the opponent chooses front pot `i+1`, recur for [i+2, j]
    // 2. If the opponent chooses rear pot `j`, recur for [i+1, j-1]

    const start = coin[i] + Math.min(findMaxCoins(coin, i + 2, j),
                    findMaxCoins(coin, i + 1, j - 1));

    // if a player chooses rear pot `j`, the opponent is left to choose from [i, j-1]
    // 1. If the opponent chooses front pot `i`, recur for [i+1, j-1]
    // 2. If the opponent chooses rear pot `j-1`, recur for [i, j-2]

    const end = coin[j] + Math.min(findMaxCoins(coin, i + 1, j - 1),
                findMaxCoins(coin, i, j - 2));

    // return the maximum of two choices
    return Math.max(start, end);
}

// Pots of gold game using dynamic programming

// pots of gold (even number) arranged in a line
const coin = [4, 6, 2, 3];

console.log(`The maximum coins collected by player is ${findMaxCoins(coin, 0, coin.length - 1)}`);
```

**Output:** The maximum coins collected by the player is 9

The time complexity of the above solution is exponential and occupies space in the call stack.

The problem has [optimal substructure](https://techiedelight.com/introduction-dynamic-programming/#optimal-substructure). We have seen that the problem can be broken down into smaller subproblems, which can further be broken down into yet smaller subproblems, and so on. The problem also exhibits [overlapping subproblems](https://techiedelight.com/introduction-dynamic-programming/#overlapping-subproblems), so we will end up solving the same subproblem over and over again. We know that problems with optimal substructure and overlapping subproblems can be solved by dynamic programming, where subproblem solutions are _memo_ ized rather than computed and again.

Following is the TypeScript program that demonstrates it:

```ts
// Function to maximize the number of coins collected by a player,
// assuming that the opponent also plays optimally
function findMaxCoins(coin: number[], i: number, j: number,
                  lookup: number[][]): number {

    // base case: one pot left, only one choice possible
    if (i === j) {
        return coin[i];
    }

    // if we are left with only two pots, choose one with maximum coins
    if (i + 1 === j) {
        return Math.max(coin[i], coin[j]);
    }

    // if the subproblem is seen for the first time, solve it and
    // store its result in a lookup table
    if (lookup[i][j] === 0) {
        // if the player chooses front pot `i`, the opponent is left to choose
        // from [i+1, j].
        // 1. If the opponent chooses front pot `i+1`, recur for [i+2, j]
        // 2. If the opponent chooses rear pot `j`, recur for [i+1, j-1]

        const start = coin[i] + Math.min(findMaxCoins(coin, i + 2, j, lookup),
                        findMaxCoins(coin, i + 1, j - 1, lookup));

        // if a player chooses rear pot `j`, the opponent is left to choose
        // from [i, j-1].
        // 1. If the opponent chooses front pot `i`, recur for [i+1, j-1]
        // 2. If the opponent chooses rear pot `j-1`, recur for [i, j-2]

        const end = coin[j] + Math.min(findMaxCoins(coin, i + 1, j - 1, lookup),
                    findMaxCoins(coin, i, j - 2, lookup));

        // assign a maximum of two choices
        lookup[i][j] = Math.max(start, end);
    }

    // return the subproblem solution from the table
    return lookup[i][j];
}

// pots of gold arranged in a line
const coin = [4, 6, 2, 3];

// create a table to store solutions to subproblems
const lookup = Array.from({ length: coin.length }, () => new Array(coin.length).fill(0));

console.log(`The maximum coins collected by player is ${findMaxCoins(coin, 0, coin.length - 1, lookup)}`);
```

The time complexity of the above top-down solution is O(n2) and requires O(n2) extra space, where `n` is the total number of gold pots.

Following is a bottom-up version of the above approach in TypeScript:

```ts
function calculate(T: number[][], i: number, j: number): number {
    if (i <= j) {
        return T[i][j];
    }

    return 0;
}

// Iterative function to maximize the number of coins collected by a player,
// assuming that the opponent also plays optimally
function findMaxCoins(coin: number[], n: number): number {

    // base case: one pot left, only one choice possible
    if (n === 1) {
        return coin[0];
    }

    // if we are left with only two pots, choose one with maximum coins
    if (n === 2) {
        return Math.max(coin[0], coin[1]);
    }

    // create a 2D matrix to store subproblem solutions
    const T: number[][] = Array.from({ length: n }, () => new Array(n).fill(0));

    // Fill the matrix in a diagonal manner, as shown below
    // Iteration 0: Fill T[][] from T[0][0] to T[n-1][n-1]
    // Iteration 1: Fill T[][] from T[0][1] to T[n-2][n-1]
    // Iteration 2: Fill T[][] from T[0][2] to T[n-3][n-1]
    // …
    // Iteration n-2: Fill T[][] from T[0][n-2] to T[1][n-1]
    // Iteration n-1: Fill T[][] from T[0][n-1] to T[0][n-1]
    for (let iteration = 0; iteration < n; iteration++) {
        for (let i = 0, j = iteration; j < n; i++, j++) {
            // if a player chooses the front pot `i`, the opponent is left to choose
            // from [i+1, j].
            // 1. If the opponent chooses front pot `i+1`, recur for [i+2, j]
            // 2. If the opponent chooses rear pot `j`, recur for [i+1, j-1]

            const start = coin[i] + Math.min(calculate(T, i + 2, j),
                            calculate(T, i + 1, j - 1));

            // if a player chooses rear pot `j`, the opponent is left to choose
            // from [i, j-1].
            // 1. If the opponent chooses front pot `i`, recur for [i+1, j-1]
            // 2. If the opponent chooses rear pot `j-1`, recur for [i, j-2]

            const end = coin[j] + Math.min(calculate(T, i + 1, j - 1),
                        calculate(T, i, j - 2));

            T[i][j] = Math.max(start, end);
        }
    }

    return T[0][n - 1];
}

// Pots of gold game using dynamic programming

// pots of gold arranged in a line
const coin = [4, 6, 2, 3];

// total number of pots (`n` is even)
const n = coin.length;

console.log(`The Maximum coins collected by player is ${findMaxCoins(coin, n)}`);
```

**Output:** The maximum coins collected by the player is 9
