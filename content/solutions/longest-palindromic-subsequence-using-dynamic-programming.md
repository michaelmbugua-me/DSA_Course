# Longest Palindromic Subsequence using Dynamic Programming

> Source: https://www.techiedelight.com/longest-palindromic-subsequence-using-dynamic-programming/

The Longest Palindromic Subsequence (LPS) problem is finding the longest subsequences of a string that is also a palindrome.

The problem differs from the problem of finding the [longest palindromic substring](https://techiedelight.com/longest-palindromic-substring-non-dp-space-optimized-solution/). Unlike substrings, [subsequences](https://techiedelight.com/difference-between-subarray-subsequence-subset/#subsequence) are not required to occupy consecutive positions within the original string.

For example, consider the sequence `ABBDCACB`.

The length of the longest palindromic subsequence is 5 The longest palindromic subsequence is BCACB

> 

The idea is to use [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/) to solve this problem. The idea is to compare the last character of the string `X[i…j]` with its first character. There are two possibilities:

  1. If the string’s last character is the same as the first character, include the first and last characters in palindrome and recur for the remaining substring `X[i+1, j-1]`.
  2. If the last character of the string is different from the first character, return the maximum of the two values we get by
     * Removing the last character and recursing for the remaining substring `X[i, j-1]`.
     * Removing the first character and recursing for the remaining substring `X[i+1, j]`.

This yields the following recursive relation to finding the length of the longest repeated subsequence of a sequence `X`:

| 1 (if i = j) LPS[i…j] = | LPS[i+1…j-1] + 2 (if X[i] = X[j]) | max (LPS[i+1…j], LPS[i…j-1]) (if X[i] != X[j])

The algorithm can be implemented as follows in TypeScript. The solution finds the length of the longest repeated subsequence of sequence `X` recursively using the above relations.

```ts
// Function to find the length of the longest palindromic subsequence
// of substring `X[i…j]`
function findLongestPalindrome(X: string, i: number, j: number): number {
    // Base condition
    if (i > j) {
        return 0;
    }

    // If the string `X` has only one character, it is a palindrome
    if (i === j) {
        return 1;
    }

    // If the last character of the string is the same as the first character,
    if (X[i] === X[j])
    {
        // include the first and last characters in palindrome
        // and recur for the remaining substring `X[i+1, j-1]`
        return findLongestPalindrome(X, i + 1, j - 1) + 2;
    }

    /*
      If the last character of the string is different from the first character
        1. Remove the last character and recur for the remaining substring
           `X[i, j-1]`
        2. Remove the first character and recur for the remaining substring
           `X[i+1, j]`
    */

    // Return the maximum of the two values
    return Math.max(findLongestPalindrome(X, i, j - 1), findLongestPalindrome(X, i + 1, j));
}

const X = 'ABBDCACB';
const n = X.length;

console.log(`The length of the longest palindromic subsequence is ${findLongestPalindrome(X, 0, n - 1)}`);
```

The worst-case time complexity of the above solution is exponential O(2n), where `n` is the length of the input string. The worst case happens when there is no repeated character present in `X` (i.e., LPS length is 1), and each recursive call will end up in two recursive calls. This also requires additional space for the call stack.

The LPS problem has an [optimal substructure](https://techiedelight.com/introduction-dynamic-programming/#optimal-substructure) and also exhibits [overlapping subproblems](https://techiedelight.com/introduction-dynamic-programming/#overlapping-subproblems). Let’s consider the recursion tree for a sequence of length 6 having all distinct characters, say `ABCDEF`, whose LPS length is 1.

As we can see, the same subproblems (highlighted in the same color) are getting computed repeatedly. We know that problems with optimal substructure and overlapping subproblems can be solved by dynamic programming, where subproblem solutions are _memo_ ized rather than computed and again. This method is demonstrated below in TypeScript:

```ts
// Function to find the length of the longest palindromic subsequence
// of substring `X[i…j]`
function findLongestPalindrome(X: string, i: number, j: number, lookup: Map<string, number>): number {
    // Base condition
    if (i > j) {
        return 0;
    }

    // If the string `X` has only one character, it is a palindrome
    if (i === j) {
        return 1;
    }

    // Construct a unique map key from dynamic elements of the input
    const key = `${i}|${j}`;

    // If the subproblem is seen for the first time, solve it and
    // store its result in a map
    if (!lookup.has(key))
    {
        /* If the last character of the string is the same as the first character,
           include the first and last characters in palindrome and recur
           for the remaining substring `X[i+1, j-1]` */

        if (X[i] === X[j]) {
            lookup.set(key, findLongestPalindrome(X, i + 1, j - 1, lookup) + 2);
        }
        else {

            /* If the last character of the string is different from the first
                character
                1. Remove the last character and recur for the remaining substring
                   `X[i, j-1]`
                2. Remove the first character and recur for the remaining substring
                   `X[i+1, j]`
                3. Return the maximum of the two values */

            lookup.set(key, Math.max(findLongestPalindrome(X, i, j - 1, lookup),
                        findLongestPalindrome(X, i + 1, j, lookup)));
        }
    }

    // Return the subproblem solution from the map
    return lookup.get(key)!;
}

const X = 'ABBDCACB';

// Create a map to store solutions to subproblems
const lookup = new Map<string, number>();

console.log(`The length of the longest palindromic subsequence is ${findLongestPalindrome(X, 0, X.length - 1, lookup)}`);
```

**Output:** The length of the longest palindromic subsequence is 5

The time complexity of the above solution is O(n2) and requires O(n2) extra space, where `n` is the length of the input string.

However, both the above-discussed methods only find the longest palindromic subsequence length but does not print the longest palindromic subsequence itself.

How can we print Longest Palindromic subsequence?

The longest palindromic subsequence problem is a classic variation of the [Longest Common Subsequence (LCS)](https://techiedelight.com/longest-common-subsequence-finding-lcs/) problem. The idea is to find LCS of the given string with its reverse, i.e., call `LCS(X, reverse(X))` and the longest common subsequence will be the longest palindromic subsequence.

Following is a TypeScript program that demonstrates it:

```ts
// Function to find LCS of string `X[0…m-1]` and `Y[0…n-1]`
function findLongestPalindrome(X: string, Y: string, m: number, n: number, lookup: number[][]): string {
    // return an empty string if the end of either sequence is reached
    if (m === 0 || n === 0) {
        return '';
    }

    // If the last character of `X` and `Y` matches
    if (X[m - 1] === Y[n - 1])
    {
        // append current character (`X[m-1]` or `Y[n-1]`) to LCS of
        // substring `X[0…m-2]` and `Y[0…n-2]`
        return findLongestPalindrome(X, Y, m - 1, n - 1, lookup) + X[m - 1];
    }

    // otherwise, if the last character of `X` and `Y` are different

    // if a top cell of the current cell has more value than the left
    // cell, then drop the current character of string `X` and find LCS
    // of substring `X[0…m-2]`, `Y[0…n-1]`

    if (lookup[m - 1][n] > lookup[m][n - 1]) {
        return findLongestPalindrome(X, Y, m - 1, n, lookup);
    }

    // if a left cell of the current cell has more value than the top
    // cell, then drop the current character of string `Y` and find LCS
    // of substring `X[0…m-1]`, `Y[0…n-2]`

    return findLongestPalindrome(X, Y, m, n - 1, lookup);
}

// Function to find the length of LCS of substring `X[0…n-1]` and `Y[0…n-1]`
function LCSLength(X: string, Y: string, n: number, lookup: number[][]): number {
    // first row and first column of the lookup table are already 0

    // fill the lookup table in a bottom-up manner
    for (let i = 1; i <= n; i++)
    {
        for (let j = 1; j <= n; j++)
        {
            // if current character of `X` and `Y` matches
            if (X[i - 1] === Y[j - 1]) {
                lookup[i][j] = lookup[i - 1][j - 1] + 1;
            }
            // otherwise, if the current character of `X` and `Y` don't match
            else {
                lookup[i][j] = Math.max(lookup[i - 1][j], lookup[i][j - 1]);
            }
        }
    }

    return lookup[n][n];
}

const X = 'ABBDCACB';

const m = X.length;

// lookup[i][j] stores the length of LCS of substring `X[0…i-1]` and `Y[0…j-1]`
const lookup: number[][] = Array.from({ length: m + 1 }, () => Array(m + 1).fill(0));

// string `Y` is a reverse of `X`
const Y = X.split('').reverse().join('');

// find the length of the LPS using LCS
console.log(`The length of the longest palindromic subsequence is ${LCSLength(X, Y, m, lookup)}`);

// print the LPS using a lookup table
console.log(`The longest palindromic subsequence is ${findLongestPalindrome(X, Y, m, m, lookup)}`);
```
