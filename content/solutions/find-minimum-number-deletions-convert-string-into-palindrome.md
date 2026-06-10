# Find the minimum number of deletions required to convert a string into a palindrome

> Source: https://www.techiedelight.com/find-minimum-number-deletions-convert-string-into-palindrome/

Given a string, find the minimum number of deletions required to convert it into a palindrome.

For example, consider string `ACBCDBAA`. The minimum number of deletions required is 3.

`**A C B C D B A A or A C B C D B A A ——> A B C B A**`

> 

The idea is to use [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/) to solve this problem. The idea is to compare the last character of the string `X[i…j]` with its first character. There are two possibilities:

  1. If the string’s last character is the same as the first character, no deletion is needed, and we recur for the remaining substring `X[i+1, j-1]`.
  2. If the last character of the string is different from the first character, return one plus the minimum of the two values we get by:
     * Deleting the last character and recursing for the remaining substring `X[i, j-1]`.
     * Deleting the first character and recursing for the remaining substring `X[i+1, j]`.

This yields the following recursive relation:

T[i…j] = | T[i+1…j-1] (if X[i] = X[j]) | 1 + min (T[i+1…j], T[i…j-1]) (if X[i] != X[j])

The algorithm can be implemented as follows in TypeScript. It finds the minimum number of deletions required to convert a sequence `X` into a palindrome recursively using the above relations.

```ts
// Function to find out the minimum number of deletions required to
// convert a given string `X[i…j]` into a palindrome
const minDeletions = (X: string, i: number, j: number): number => {

    // base condition
    if (i >= j) {
        return 0;
    }

    // if the last character of the string is the same as the first character
    if (X[i] === X[j]) {
        return minDeletions(X, i + 1, j - 1);
    }

    // otherwise, if the last character of the string is different from the
    // first character

    // 1. Remove the last character and recur for the remaining substring
    // 2. Remove the first character and recur for the remaining substring

    // return 1 (for remove operation) + minimum of the two values

    return 1 + Math.min(minDeletions(X, i, j - 1), minDeletions(X, i + 1, j));
};

const X = 'ACBCDBAA';
const n = X.length;

console.log(`The minimum number of deletions required is ${minDeletions(X, 0, n - 1)}`);
```

**Output:** The minimum number of deletions required is 3

The worst-case time complexity of the above solution is exponential (O(2n)), where `n` is the length of the input string. The worst case happens when there is no repeated character present in `X`, and each recursive call will end up in two recursive calls. It also requires additional space for the call stack.

The problem has an [optimal substructure](https://techiedelight.com/introduction-dynamic-programming/#optimal-substructure). We have seen that the problem can be broken down into smaller subproblems, which can further be broken down into yet smaller subproblems, and so on. The problem also exhibits [overlapping subproblems](https://techiedelight.com/introduction-dynamic-programming/#overlapping-subproblems), so we will end up solving the same subproblem over and over again. Let’s consider the recursion tree for a sequence of length 6 having all distinct characters, say `ABCDEF`.

As we can see, the same subproblems (highlighted in the same color) are getting computed repeatedly. We know that problems with optimal substructure and overlapping subproblems can be solved by dynamic programming, where subproblem solutions are _memo_ ized rather than computed and again. Following is the TypeScript program that demonstrates it:

```ts
// Function to find out the minimum number of deletions required to
// convert a given string `X[i…j]` into a palindrome
const minDeletions = (X: string, i: number, j: number, lookup: Map<string, number>): number => {

    // base condition
    if (i >= j) {
        return 0;
    }

    // construct a unique map key from dynamic elements of the input
    const key = `${i}|${j}`;

    // if the subproblem is seen for the first time, solve it and
    // store its result in a map
    if (!lookup.has(key)) {

        // if the last character of the string is the same as the first character
        if (X[i] === X[j]) {
            lookup.set(key, minDeletions(X, i + 1, j - 1, lookup));
        }
        else {
            // if the last character of the string is different from the first
            // character

            // 1. Remove the last character and recur for the remaining substring
            // 2. Remove the first character and recur for the remaining substring

            // return 1 (for remove operation) + minimum of the two values

            const result = 1 + Math.min(minDeletions(X, i, j - 1, lookup),
                                minDeletions(X, i + 1, j, lookup));
            lookup.set(key, result);
        }
    }

    // return the subproblem solution from the map
    return lookup.get(key) as number;
};

const X = 'ACBCDBAA';
const n = X.length;

// create a map to store solutions to subproblems
const lookup = new Map<string, number>();

console.log(`The minimum number of deletions required is ${minDeletions(X, 0, n - 1, lookup)}`);
```

**Output:** The minimum number of deletions required is 3

The time complexity of the above solution is O(n2) and requires O(n2) extra space, where `n` is the length of the input string.

This problem is also a classic variation of the [Longest Common Subsequence (LCS)](https://techiedelight.com/longest-common-subsequence/) problem. The idea is to find the [Longest Palindromic subsequence](https://techiedelight.com/longest-palindromic-subsequence-using-dynamic-programming/) of the given string. The minimum number of deletions required will be the difference in length of the string and palindromic subsequence. We can easily find the longest palindromic subsequence by taking the longest common subsequence of the given string with its reverse, i.e., call `LCS(X, reverse(X))`.

The implementation can be seen below in TypeScript:

```ts
// Function to find out the minimum number of deletions required to
// convert a given string `X[0…n-1]` into a palindrome
const minDeletions = (X: string): number => {
    // string 'Y' is a reverse of 'X'
    const Y = X.split('').reverse().join('');

    const n = X.length;

    // `lookup[i][j]` stores the length of LCS of substring `X[0…i-1]` and `Y[0…j-1]`
    const lookup: number[][] = Array.from({ length: n + 1 }, () => new Array(n + 1).fill(0));

    // fill the lookup table in a bottom-up manner
    for (let i = 1; i <= n; i++)
    {
        for (let j = 1; j <= n; j++)
        {
            // if current character of 'X' and 'Y' matches
            if (X[i - 1] === Y[j - 1]) {
                lookup[i][j] = lookup[i - 1][j - 1] + 1;
            }
            // otherwise, if the current character of 'X' and 'Y' don't match
            else {
                lookup[i][j] = Math.max(lookup[i - 1][j], lookup[i][j - 1]);
            }
        }
    }

    // Now, `lookup[n][n]` contains the size of the longest palindromic subsequence.

    // The minimum number of deletions required will be the difference in the size
    // of the string and the size of the palindromic subsequence

    return n - lookup[n][n];
};

const X = 'ACBCDBAA';

console.log(`The minimum number of deletions required is ${minDeletions(X)}`);
```

**Output:** The minimum number of deletions required is 3
