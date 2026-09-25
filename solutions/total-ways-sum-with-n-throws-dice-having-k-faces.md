# Find total ways to achieve a given sum with `n` throws of dice having `k` faces

> Source: https://www.techiedelight.com/total-ways-sum-with-n-throws-dice-having-k-faces/

[Dynamic Programming](https://www.techiedelight.com/Category/Dynamic-Programming/)

Calculate the total number of ways to achieve a given sum with `n` throws of dice having `k` faces.

For example,

**Input:** The total number of throws `n` is 2 The total number of faces `k` is 6 (i.e., each dice has values from 1 to 6) The desired sum is 10 **Output:** The total number of ways is 3. The possible throws are (6, 4), (4, 6), (5, 5)

> 

The problem has an [optimal substructure](https://techiedelight.com/introduction-dynamic-programming/#optimal-substructure) as the problem can be broken down into smaller subproblems, which can further be broken down into yet smaller subproblems, and so on.

The idea is to use [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/) to solve this problem. We reduce the desired sum by values between 1 and `k` and recur for the remaining sum with throws left for each throw. If the expected sum is reached with `n` dices, we have found a way.

The algorithm can be implemented as follows in TypeScript:

```ts
// Function to calculate the total number of ways to achieve a given
// sum with `n` throws of dice having `k` faces
function count(n: number, k: number, target: number): number {
    // if the desired sum is reached with `n` dices
    if (n === 0) {
        return target === 0 ? 1 : 0;
    }

    // the desired sum can't be reached with the current configuration
    if (target < 0 || k * n < target || n > target) {
        return 0;
    }

    let result = 0;

    // recur for all possible solutions
    for (let i = 1; i <= k; i++) {
        result += count(n - 1, k, target - i);
    }

    return result;
}

const n = 4;      // n throws
const k = 6;      // values 1 to 6

const target = 15;   // desired sum

console.log('The total number of ways is', count(n, k, target));
```

The time complexity of the above solution is exponential and occupies space in the call stack.

The above solution exhibits [overlapping subproblems](https://techiedelight.com/introduction-dynamic-programming/#overlapping-subproblems). If we draw the solution’s recursion tree, we can see that the same subproblems are getting computed repeatedly. We know that problems with optimal substructure and overlapping subproblems can be solved using dynamic programming, in which subproblem solutions are memoized rather than computed again and again. The _memo_ ized version follows the top-down approach since we first break the problem into subproblems and then calculate and store values.

The approach is demonstrated below in TypeScript:

```ts
// Function to calculate the total number of ways to achieve a given
// sum with `n` throws of dice having `k` faces
function count(n: number, k: number, target: number, lookup: number[][]): number {
    // if the desired sum is reached with `n` dices
    if (n === 0) {
        return target === 0 ? 1 : 0;
    }

    // the desired sum can't be reached with the current configuration
    if (target < 0 || k * n < target || n > target) {
        return 0;
    }

    // if the subproblem is seen for the first time, solve it and
    // store its result
    if (lookup[n][target] === 0) {
        // recur for all possible solutions
        for (let i = 1; i <= k; i++) {
            lookup[n][target] += count(n - 1, k, target - i, lookup);
        }
    }

    // return solution to the current subproblem
    return lookup[n][target];
}

const n = 4;      // n throws
const k = 6;      // values 1 to 6

const target = 15;   // desired sum

// create a lookup table to store solutions to subproblems
// lookup[i][j] stores the total number of ways to achieve sum `j`
// with `i` throws of given dice.
const lookup: number[][] = Array.from({ length: n + 1 }, () => new Array(target + 1).fill(0));

console.log('The total number of ways is', count(n, k, target, lookup));
```

The time complexity of the above solution is O(n × k × target), and the auxiliary space used by the program is O(n × target).

We can also solve this problem in a bottom-up manner. In the bottom-up approach, we solve smaller subproblems first, then solve larger subproblems from them.

**Exercise:** Write bottom-up version of above solution.
