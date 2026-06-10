# Longest Repeated Subsequence Problem

> Source: https://www.techiedelight.com/longest-repeated-subsequence-problem/

The Longest Repeating Subsequence (LRS) problem is finding the longest subsequences of a string that occurs at least twice.

The problem differs from the problem of finding the longest repeating substring. Unlike substrings, [subsequences](https://techiedelight.com/difference-between-subarray-subsequence-subset/#subsequence) are not required to occupy consecutive positions within the original string.

For example, consider the sequence `ATACTCGGA`.

The length of the longest repeating subsequence is 4 The longest repeating subsequence is ATCG **A T** A **C** T C **G** G A A T **A** C **T C** G **G** A **Note that repeated characters holds a different index in the input string.**

> 

The longest repeating subsequence problem is a classic variation of the [Longest Common Subsequence (LCS)](https://techiedelight.com/longest-common-subsequence/) problem. The idea is to find the LCS of the given string with itself, i.e., call `LCS(X, X)` and exclude the cases when indexes are the same `(i = j)` since repeated characters hold a different index in the input string.

The LRS problem has [optimal substructure](https://techiedelight.com/introduction-dynamic-programming/#optimal-substructure). We can recursively define the problem as:

| 0 (if i = 0 or j = 0) LRS[i][j] = | LRS[i-1][j-1] + 1 (if X[i-1] = X[j-1] & i!=j) | max (LRS[i-1][j], LRS[i][j-1]) (if X[i-1] != X[j-1])

The following implementation in TypeScript recursively finds the length of the longest repeated subsequence of a sequence using the optimal substructure property of the LRS problem:

```ts
// Function to find the length of the longest repeated subsequence
// of substring `X[0…m-1]` and `X[0…n-1]`
function LRSLength(X: string, m: number, n: number): number {

    // return if the end of either string is reached
    if (m === 0 || n === 0) {
        return 0;
    }

    // if characters at index `m` and `n` matches and the index are different
    if (X[m - 1] === X[n - 1] && m !== n) {
        return LRSLength(X, m - 1, n - 1) + 1;
    }

    // otherwise, if characters at index `m` and `n` don't match
    return Math.max(LRSLength(X, m, n - 1), LRSLength(X, m - 1, n));
}

const X = 'ATACTCGGA';
const m = X.length;

console.log(`The length of the longest repeating subsequence is ${LRSLength(X, m, m)}`);
```

**Output:** The length of the longest repeating subsequence is 4

The worst-case time complexity of the above solution is O(2n) and occupies space in the call stack, where `n` is the length of the input string. The worst case happens when there is no repeated character present in `X` (i.e., LRS length is 0), and each recursive call will end up in two recursive calls.

The LRS problem also exhibits [overlapping subproblems](https://techiedelight.com/introduction-dynamic-programming/#overlapping-subproblems). Let’s consider the recursion tree for a sequence of length 5 having all distinct characters whose LRS length is 0.

As we can see above, the same subproblems (highlighted in the same color) are getting computed repeatedly. Since both optimal substructure and overlapping subproblems properties of dynamic programming are satisfied, we can save subproblem solutions in memory rather than computed them repeatedly.

The algorithm can be implemented as follows in TypeScript:

```ts
// Function to find the length of the longest repeated subsequence
// of substring `X[0…m-1]` and `X[0…n-1]`
function LRSLength(X: string, m: number, n: number, lookup: Map<string, number>): number {

    // return if the end of either string is reached
    if (m === 0 || n === 0) {
        return 0;
    }

    // construct a unique map key from dynamic elements of the input
    const key = `${m}|${n}`;

    // if the subproblem is seen for the first time, solve it and
    // store its result in a map
    if (!lookup.has(key))
    {
        // if characters at index `m` and `n` matches and the index are different
        if (X[m - 1] === X[n - 1] && m !== n) {
            lookup.set(key, LRSLength(X, m - 1, n - 1, lookup) + 1);
        }
        else {
            // otherwise, if characters at index `m` and `n` don't match
            lookup.set(key, Math.max(LRSLength(X, m, n - 1, lookup),
                            LRSLength(X, m - 1, n, lookup)));
        }
    }

    // return the subproblem solution from the map
    return lookup.get(key)!;
}

const X = 'ATACTCGGA';
const m = X.length;

// create a map to store solutions to subproblems
const lookup = new Map<string, number>();

console.log(`The length of the longest repeating subsequence is ${LRSLength(X, m, m, lookup)}`);
```

**Output:** The length of the longest repeating subsequence is 4

The time complexity of the above top-down solution is O(n2) and requires O(n2) extra space, where `n` is the length of the input string.

The above _memo_ ized version follows the top-down approach since we first break the problem into subproblems and then calculate and store values. We can also solve this problem in a bottom-up manner by calculating the smaller values of `LRS(i, j)` first and then building larger values from them. This is demonstrated below in TypeScript:

```ts
// Function to find the length of the longest repeated subsequence
// of substring `X[0…n-1]`
function LRSLength(X: string, n: number): number {
    // lookup table stores solution to already computed subproblems;
    // i.e., lookup[i][j] stores the length of LRS of substring
    // `X[0…i-1]` and `X[0…j-1]`
    const lookup: number[][] = Array.from({ length: n + 1 }, () => Array(n + 1).fill(0));

    // fill the lookup table in a bottom-up manner
    for (let i = 1; i <= n; i++)
    {
        for (let j = 1; j <= n; j++)
        {
            // if characters at index `i` and `j` matches
            // and the index are different
            if (X[i - 1] === X[j - 1] && i !== j) {
                lookup[i][j] = lookup[i - 1][j - 1] + 1;
            }
            // otherwise, if characters at index `i` and `j` are different
            else {
                lookup[i][j] = Math.max(lookup[i - 1][j], lookup[i][j - 1]);
            }
        }
    }

    // LRS will be the last entry in the lookup table
    return lookup[n][n];
}

const X = 'ATACTCGGA';

const n = X.length;

console.log(`The length of the longest repeating subsequence is ${LRSLength(X, n)}`);
```

**Output:** The length of the longest repeating subsequence is 4
