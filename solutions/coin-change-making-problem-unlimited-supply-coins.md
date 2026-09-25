# Coin change-making problem

> Source: https://www.techiedelight.com/coin-change-making-problem-unlimited-supply-coins/

Given an unlimited supply of coins of given denominations, find the minimum number of coins required to get the desired change.

For example, consider `S = { 1, 3, 5, 7 }`.

If the desired change is 15, the minimum number of coins required is 3 (7 + 7 + 1) or (5 + 5 + 5) or (3 + 5 + 7) If the desired change is 18, the minimum number of coins required is 4 (7 + 7 + 3 + 1) or (5 + 5 + 5 + 3) or (7 + 5 + 5 + 1)

> 

The idea is to use [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/) to solve this problem. We recur to see if the total can be reached by including the coin or not for each coin of given denominations. If choosing the current coin resulted in the solution, update the minimum number of coins needed. Finally, return the minimum value we get after exhausting all combinations.

Following is a TypeScript implementation of the idea:

```ts
// Function to find the minimum number of coins required
// to get a total of `target` from set `S`
function findMinCoins(S: number[], target: number): number {
    // if the total is 0, no coins are needed
    if (target === 0) {
        return 0;
    }

    // return infinity if total becomes negative
    if (target < 0) {
        return Infinity;
    }

    // initialize the minimum number of coins needed to infinity
    let coins = Infinity;

    // do for each coin
    for (const c of S) {
        // recur to see if total can be reached by including current coin `c`
        const result = findMinCoins(S, target - c);

        // update the minimum number of coins needed if choosing the current
        // coin resulted in a solution
        if (result !== Infinity) {
            coins = Math.min(coins, result + 1);
        }
    }

    // return the minimum number of coins needed
    return coins;
}

// coins of given denominations
const S = [1, 3, 5, 7];

// total change required
const target = 18;

const coins = findMinCoins(S, target);
if (coins !== Infinity) {
    console.log('The minimum number of coins required to get the desired change is', coins);
}
```

**Output:** The minimum number of coins required to get the desired change is 4



The time complexity of the above solution is exponential as each recursive call is making `n` recursive calls.

The problem has an [optimal substructure](https://techiedelight.com/introduction-dynamic-programming/#optimal-substructure) as the problem can be broken down into smaller subproblems, which can further be broken down into yet smaller subproblems, and so on. The problem also clearly exhibits [overlapping subproblems](https://techiedelight.com/introduction-dynamic-programming/#overlapping-subproblems), so we will end up solving the same subproblem over and over again. The repeated subproblems can be seen by drawing a recursion tree for higher values of `n`. We know that problems having optimal substructure and overlapping subproblems can be solved by dynamic programming, in which subproblem solutions are saved rather than computed repeatedly.

In the method is demonstrated below in TypeScript, we use a bottom-up approach, i.e., we solve smaller subproblems first, then solve larger subproblems from them. It computes `T[i]` for each `1 <= i <= target`, which stores the minimum number of coins needed to get a total of `i`. It makes use of smaller values of `i` already computed and has the same asymptotic runtime as _Memo_ ization but no recursion overhead.

```ts
// Function to find the minimum number of coins required
// to get a total of `target` from set `S`
function findMinCoins(S: number[], target: number): number {
    // `T[i]` stores the minimum number of coins needed to get a total of `i`
    const T: number[] = new Array(target + 1).fill(0);

    for (let i = 1; i <= target; i++) {
        // initialize the minimum number of coins needed to infinity
        T[i] = Infinity;

        // do for each coin
        for (const c of S) {
            // check if the index doesn't become negative by including
            // current coin `c`
            if (i - c >= 0) {
                const result = T[i - c];

                // if total can be reached by including current coin `c`,
                // update the minimum number of coins needed `T[i]`
                if (result !== Infinity) {
                    T[i] = Math.min(T[i], result + 1);
                }
            }
        }
    }

    // `T[target]` stores the minimum number of coins needed to get a total of `target`
    return T[target];
}

// coins of given denominations
const S = [1, 2, 3, 4];

// total change required
const target = 15;

const coins = findMinCoins(S, target);
if (coins !== Infinity) {
    console.log('The minimum number of coins required to get the desired change is', coins);
}
```

**Output:** The minimum number of coins required to get the desired change is 4



The time complexity of the above solution is O(n.target), where `n` is the total number of coins and `target` is the total change required. The auxiliary space required by the program is O(target).

**Exercise:** Find a minimum number of coins required to get the desired change from a limited supply of coins of given denominations.
