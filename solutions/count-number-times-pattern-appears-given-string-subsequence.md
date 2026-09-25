# Count the number of times a pattern appears in a given string as a subsequence

> Source: https://www.techiedelight.com/count-number-times-pattern-appears-given-string-subsequence/

Given a string, count the number of times a given pattern appears in it as a subsequence.

Please note that the problem specifically targets [subsequences](https://techiedelight.com/difference-between-subarray-subsequence-subset/#subsequence) that need not be contiguous, i.e., subsequences are not required to occupy consecutive positions within the original sequences.

For example,

**Input:** string = “subsequence” pattern = “sue” **Output:** 7 subsequence subsequence subsequence subsequence subsequence subsequence subsequence

> 

The idea is to use [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/) to solve this problem. If we compare the last character of the string `X[0…m]` with the last character of pattern `Y[0…n]`, there are two possibilities:

  1. If the string’s last character is the same as the last character of the pattern, recur for the remaining substring `X[0…m-1] and Y[0…n-1]`. Since we want all possible combinations, also consider the case when the string’s current character does not form part of the solution, i.e., ignore the last character of the string and recur for the remaining substring `X[0…m-1]`.
  2. If the last character of the string is different from the last character of the pattern, ignore the last character of the string and recur for the remaining substring `X[0…m-1]`.

The algorithm can be implemented as follows in TypeScript:

```ts
// Function to count the number of times pattern `Y[0…n)`
// appears in a given string `X[0…m)` as a subsequence
function count(X: string, Y: string, m: number, n: number): number {
    // Base case 1: if only one character is left
    if (m === 1 && n === 1) {
        return X[0] === Y[0] ? 1 : 0;
    }

    // Base case 2: if the input string `X` reaches its end
    if (m === 0) {
        return 0;
    }

    // Base case 3: if pattern `Y` reaches its end, we have found subsequence
    if (n === 0) {
        return 1;
    }

    // Optimization: the solution is not possible if the number of characters
    // in the string is less than the number of characters in the pattern
    if (n > m) {
        return 0;
    }

    /*
      If the last character of both string and pattern matches,
        1. Exclude the last character from both string and pattern
        2. Exclude only the last character from the string.

      Otherwise, if the last character of the string and pattern do not match,
      recur by excluding only the last character in the string
    */
    return (X[m - 1] === Y[n - 1] ? count(X, Y, m - 1, n - 1) : 0)
        + count(X, Y, m - 1, n);
}

const X = 'subsequence';   // Input string
const Y = 'sue';           // Pattern
console.log(count(X, Y, X.length, Y.length));
```

**Output:** 7

The time complexity of the above solution is exponential and occupies space in the call stack.

The idea is to use dynamic programming to solve this problem. The problem has an [optimal substructure](https://techiedelight.com/introduction-dynamic-programming/#optimal-substructure) and exhibits [overlapping subproblems](https://techiedelight.com/introduction-dynamic-programming/#overlapping-subproblems). If we draw the recursion tree of the solution, we can see that the same subproblems are getting computed repeatedly.

We know that problems with optimal substructure and overlapping subproblems can be solved using dynamic programming, in which subproblem solutions are memoized rather than computed repeatedly. The _memo_ ized version follows the top-down approach since we first break the problem into subproblems and then calculate and store values. We can also solve this problem in a bottom-up manner. In the bottom-up approach, we solve smaller subproblems first, then solve larger subproblems from them.

The algorithm can be implemented as follows in TypeScript, where `T[][]` is filled in a bottom-up fashion.

```ts
// Function to count the number of times pattern `Y[0…n)`
// appears in a given string `X[0…m)` as a subsequence
function count(X: string, Y: string): number {
    const [m, n] = [X.length, Y.length];

    // `T[i][j]` stores number of times pattern `Y[0…j)`
    // appears in a given string `X[0…i)` as a subsequence
    const T: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

    // if pattern `Y` is empty, we have found subsequence
    for (let i = 0; i <= m; i++) {
        T[i][0] = 1;
    }

    /*
      If the current character of both string and pattern matches,
        1. Exclude current character from both string and pattern
        2. Exclude only the current character from the string

      Otherwise, if the current character of the string and pattern do not match,
      exclude the current character from the string
    */
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            T[i][j] = (X[i - 1] === Y[j - 1] ? T[i - 1][j - 1] : 0) + T[i - 1][j];
        }
    }

    // return last entry in the lookup table
    return T[m][n];
}

const X = 'subsequence';   // Input string
const Y = 'sue';           // Pattern
console.log(count(X, Y));
```

**Output:** 7

The time complexity of the above solution is O(m.n) and requires O(m.n) extra space, where `m` is the length of the first string and `n` is the length of the second string.
