# Total possible solutions to a linear equation of `k` variables

> Source: https://www.techiedelight.com/total-possible-solutions-linear-equation-k-variables/

[Dynamic Programming](https://www.techiedelight.com/Category/Dynamic-Programming/)

Given a linear equation of `k` variables, count the total number of possible solutions to it.

For example,

**Input:** coeff = {1, 3, 5, 7}, rhs = 8 **Output:** The total number of solutions is 6 Above input represents the equation a + 3b + 5c + 7d = 8. ( a = 1, b = 0, c = 0, d = 1 ) ( a = 0, b = 1, c = 1, d = 0 ) ( a = 2, b = 2, c = 0, d = 0 ) ( a = 3, b = 0, c = 1, d = 0 ) ( a = 5, b = 1, c = 0, d = 0 ) ( a = 8, b = 0, c = 0, d = 0 ) **Input:** coeff = {1, 2, 3}, rhs = 4 **Output:** The total number of solutions is 4 Above input represents the equation x + 2y + 3z = 4. ( x = 1, y = 0, z = 1 ) ( x = 0, y = 2, z = 0 ) ( x = 2, y = 1, z = 0 ) ( x = 4, y = 0, z = 0 )

> 

The problem is similar to finding the [total number of ways to get the denomination of coins](https://techiedelight.com/coin-change-problem-find-total-number-ways-get-denomination-coins/). Here, coefficients of an equation can be considered coins denominations, and the RHS of an equation can be considered the desired change. Let’s begin by recursively defining the problem:

count(coeff, k, rhs) = count(coeff, k, rhs-coeff[k]) + count(coeff, k-1, rhs);

That is, for each coefficient of a variable.

  * Include current coefficient `coeff[k]` in solution and recur with remaining value `rhs-coeff[k]`.
  * Exclude current coefficient `coeff[k]` from the solution and recur for remaining coefficients `k-1`.

Finally, return total ways by including or excluding the current coefficient. The recursion’s base case is when the solution is found (i.e., rhs becomes 0), or the solution doesn’t exist (when no coefficients are left, or rhs becomes negative).

The algorithm can be implemented as follows in TypeScript:

```ts
// Function to count the total number of possible solutions to a
// linear equation of `k` variables
function count(coeff: number[], k: number, rhs: number): number {
    // if rhs become 0, a solution is found
    if (rhs === 0) {
        return 1;
    }

    // return 0 if rhs becomes negative or no coefficient is left
    if (rhs < 0 || k < 0) {
        return 0;
    }

    // Case 1. Include current coefficient `coeff[k]` in solution and
    // recur with remaining value `rhs-coeff[k]`
    const include = count(coeff, k, rhs - coeff[k]);

    // Case 2. Exclude current coefficient `coeff[k]` from solution and
    // recur for remaining coefficients `k-1`
    const exclude = count(coeff, k - 1, rhs);

    // return total ways by including or excluding the current coefficient
    return include + exclude;
}

// `k` coefficients of the given equation
const coeff = [1, 2, 3];
const k = coeff.length;

const rhs = 4;
console.log('The total number of solutions is', count(coeff, k - 1, rhs));
```

The time complexity of the above solution is exponential and occupies space in the call stack.

The above solution has an [optimal substructure](https://techiedelight.com/introduction-dynamic-programming/#optimal-substructure) as it can be broken down into smaller subproblems. It also clearly displays [overlapping subproblems](https://techiedelight.com/introduction-dynamic-programming/#overlapping-subproblems), and we might end up solving the same subproblem repeatedly. The repeated subproblems can be seen by drawing the recursion tree for higher values of the desired change.

The problems having optimal substructure and overlapping subproblem can be solved using dynamic programming in which subproblem solutions are _memo_ ized rather than computed repeatedly. Following is a TypeScript program that demonstrates it:

```ts
// Function to count the total number of possible solutions to a
// linear equation of `k` variables
function count(coeff: number[], k: number, rhs: number, lookup: Map<string, number>): number {
    // if rhs become 0, a solution is found
    if (rhs === 0) {
        return 1;
    }

    // return 0 if rhs becomes negative or no coefficient is left
    if (rhs < 0 || k < 0) {
        return 0;
    }

    // construct a unique key from dynamic elements of the input
    const key = `${k}|${rhs}`;

    // if the subproblem is seen for the first time, solve it and
    // store its result in a map
    const cached = lookup.get(key);
    if (cached !== undefined) {
        return cached;
    }

    const include = count(coeff, k, rhs - coeff[k], lookup);  // Case 1
    const exclude = count(coeff, k - 1, rhs, lookup);         // Case 2

    // return total ways by including or excluding the current coefficient
    const result = include + exclude;
    lookup.set(key, result);
    return result;
}

// `k` coefficients of the given equation
const coeff = [1, 2, 3];
const k = coeff.length;

const rhs = 4;

// create a map to store solutions to a subproblem
const lookup = new Map<string, number>();

console.log('The total number of solutions is', count(coeff, k - 1, rhs, lookup));
```

The time complexity of the above solution is O(k × rhs), and the auxiliary space used by the program is O(k × rhs).

We can even write a bottom-up version of the above memoized solution. The following code shows how to implement this in TypeScript:

```ts
function count(coeff: number[], k: number, rhs: number): number {
    const T: number[][] = Array.from({ length: k + 1 }, () => new Array(rhs + 1));

    for (let i = 0; i <= k; i++) {
        for (let j = 0; j <= rhs; j++) {
            if (i === 0) {
                T[i][j] = 0;
            } else if (j === 0) {
                T[i][j] = 1;
            } else if (coeff[i - 1] > j) {
                T[i][j] = T[i - 1][j];
            } else {
                T[i][j] = T[i - 1][j] + T[i][j - coeff[i - 1]];
            }
        }
    }

    return T[k][rhs];
}

const coeff = [1, 3, 5, 7];
const rhs = 8;

const k = coeff.length;

console.log(`The total number of solutions is ${count(coeff, k, rhs)}`);
```

**Output:** The total number of solutions is 6
