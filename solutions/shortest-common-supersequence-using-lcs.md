# Shortest Common Supersequence Problem using LCS

> Source: https://www.techiedelight.com/shortest-common-supersequence-using-lcs/

The Shortest Common Supersequence (SCS) is finding the shortest supersequence `Z` of given sequences `X` and `Y` such that both `X` and `Y` are subsequences of `Z`.

For example,

Consider the two following sequences, X and Y: X: ABCBDAB Y: BDCABA The length of the SCS is 9 SCS are ABCBDCABA, ABDCABDAB, and ABDCBDABA

> 

## 1\. Finding Length of Shortest Common Supersequence

The shortest common supersequence problem is closely related to the [Longest Common Subsequence (LCS)](https://techiedelight.com/longest-common-subsequence/) problem. The length of the shortest common supersequence of two subsequences can be easily derived from the length of their longest common subsequence. For given two sequences `X` and `Y` of length `m` and `n`, respectively, the relation is:

SCSLength(X, Y) = m + n – LCSLength(X, Y)

This relation works as LCS detects common characters present in the string, and in order for a common supersequence to be of minimal length, the common characters should be present in it only once. So, the length of SCS is equal to the sum of both strings minus their LCS length. This is demonstrated below in TypeScript:

```ts
// Function to find the length of LCS of substring `X[0…m-1]` and `Y[0…n-1]`
function LCSLength(X: string, Y: string, m: number, n: number, lookup: Map<string, number>): number {
    // return if the end of either string is reached
    if (m === 0 || n === 0) {
        return 0;
    }

    // construct a unique key from dynamic elements of the input
    const key = `${m}|${n}`;

    // if the subproblem is seen for the first time, solve it and
    // store its result in a map
    if (!lookup.has(key)) {
        // if the last character of `X` and `Y` matches
        if (X[m - 1] === Y[n - 1]) {
            lookup.set(key, LCSLength(X, Y, m - 1, n - 1, lookup) + 1);
        } else {
            // otherwise, if the last character of `X` and `Y` don't match
            lookup.set(key, Math.max(LCSLength(X, Y, m, n - 1, lookup),
                            LCSLength(X, Y, m - 1, n, lookup)));
        }
    }

    // return the subproblem solution from the map
    return lookup.get(key)!;
}

// demo
const X = 'ABCBDAB';
const Y = 'BDCABA';

const m = X.length;
const n = Y.length;

// create a map to store solutions to subproblems
const lookup = new Map<string, number>();

// find the length of the longest common subsequence (LCS)
const length = LCSLength(X, Y, m, n, lookup);

// length of the shortest common supersequence of two strings
// is equal to the sum of both strings minus the length of
// their longest common subsequence

console.log('The length of the shortest common supersequence is', m + n - length);
```

## 2\. Finding the Shortest Common Supersequence

For two input sequences, an SCS can be easily formed from the [Longest Common Subsequence (LCS)](https://techiedelight.com/longest-common-subsequence-finding-lcs/) problem. The idea is to construct an SCS by considering the non-lcs characters while preserving the character order.

For example, consider two sequences `abcbdab` and `bdcaba` having LCS equal to `bcba`. By inserting the non-lcs characters and preserving the character order, we get the string `abdcabdab`, our SCS.

### How can we achieve this?

The idea is to fill the lookup table of LCS by finding the length of LCS of given sequences, `X[0…m-1]` and `Y[0…n-1]` in a [bottom-up manner](https://techiedelight.com/introduction-dynamic-programming/#bottom-up). Then recursively find the SCS in a top-down manner using values in the lookup table, i.e., follow the path from the bottom-right corner of the lookup table to its top-left corner when reading out an SCS.

  * If the current characters of `X` and `Y` are equal, they are part of the SCS, and we move diagonally in the lookup table (i.e., recur to find SCS of sequence `X[0…m-2]`, `Y[0…n-2]`).
  * If the current characters of `X` and `Y` are different, go up or left, depending on which cell has a higher number.
    1. If a top cell of the current cell has more value than the left cell, include the current character of sequence `X` in SCS and recur to find SCS of sequence `X[0…m-2]`, `Y[0…n-1]`.
    2. If a left cell of the current cell has more value than the top cell, include the current character of sequence `Y` in SCS and recur to find SCS of sequence `X[0…m-1]`, `Y[0…n-2]`.
  * If the end of either sequence is reached, then the other sequence forms part of the SCS.

Following is a TypeScript implementation of the above approach:

```ts
// Function to return shortest common supersequence (SCS)
// of substrings `X[0…m-1]`, `Y[0…n-1]`
function SCS(X: string, Y: string, m: number, n: number, lookup: number[][]): string {
    // if the end of the first string is reached,
    // return the second string
    if (m === 0) {
        return Y.slice(0, n);
    }

    // if the end of the second string is reached,
    // return the first string
    else if (n === 0) {
        return X.slice(0, m);
    }

    // if the last character of `X` and `Y` matches, include it in SSC
    // and recur to find SCS of substring `X[0…m-2]` and `Y[0…n-1]`
    if (X[m - 1] === Y[n - 1]) {
        return SCS(X, Y, m - 1, n - 1, lookup) + X[m - 1];
    }

    // if the last character of `X` and `Y` don't match
    else {
        // if a top cell of the current cell has more value than the left
        // cell, then include the current character of string `X` in SCS
        // and find SCS of substring `X[0…m-2]` and `Y[0…n-1]`

        if (lookup[m - 1][n] > lookup[m][n - 1]) {
            return SCS(X, Y, m - 1, n, lookup) + X[m - 1];
        }

        // if a left cell of the current cell has more value than the top
        // cell, then include the current character of string `Y` in SCS
        // and find SCS of substring `X[0…m-1]` and `Y[0…n-2]`
        else {
            return SCS(X, Y, m, n - 1, lookup) + Y[n - 1];
        }
    }
}

// Function to fill the lookup table by finding the length of LCS
// of substring `X[0…m-1]` and `Y[0…n-1]`
function LCS(X: string, Y: string, m: number, n: number, lookup: number[][]): void {
    // Fill the lookup table in a bottom-up manner.
    // the first row and first column of the lookup table are already 0.
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            // if the current character of `X` and `Y` matches
            if (X[i - 1] === Y[j - 1]) {
                lookup[i][j] = lookup[i - 1][j - 1] + 1;
            }
            // otherwise, if the current character of `X` and `Y` don't match
            else {
                lookup[i][j] = Math.max(lookup[i - 1][j], lookup[i][j - 1]);
            }
        }
    }
}

// demo
const X = 'ABCBDAB';
const Y = 'BDCABA';

const m = X.length;
const n = Y.length;

// `lookup[i][j]` stores the length of LCS of substring `X[0…i-1]` and `Y[0…j-1]`
const lookup: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

// fill the lookup table by finding LCS of `X` and `Y`
LCS(X, Y, m, n, lookup);

// find the shortest common supersequence by reading the lookup
// table of LCS in a top-down manner
console.log(`The shortest common supersequence of ${X} and ${Y} is`,
        SCS(X, Y, m, n, lookup));
```

The time complexity of the above solution is O(m.n) and requires O(m.n) extra space, where `m` is the length of the first string and `n` is the length of the second string.

## 3\. Finding All Shortest Common Supersequence

The shortest common supersequence for two strings is not unique, and the above code doesn’t generate all SCS of the given sequences. It will always print one SCS. The problem with the above code is when the last characters of `X` and `Y` are different, we either go up or left in the lookup table depending upon which side has a larger value.

### How can we modify the code so it prints all possible SCS?

The idea remains the same except if the top cell is equal to the left cell, consider both top and left directions; otherwise, go in the direction of greater value.

In other words, if the last characters of `X` and `Y` are not the same, then SCS can be constructed from either the top side or from the left side of the lookup table, depending upon which side has a larger value. If both the values are equal, then SCS can be constructed from both directions in the lookup table. So, we go in the direction of a larger value or go in both directions if the values are equal.

Following is a TypeScript implementation based on the above idea:

```ts
// Function to return all SCS of substrings `X[0…m-1]`, `Y[0…n-1]`
function SCS(X: string, Y: string, m: number, n: number, lookup: number[][]): Set<string> {
    // if the end of the first string is reached, create a set
    // containing the second substring and return
    if (m === 0) {
        return new Set([Y.slice(0, n)]);
    }

    // if the end of the second string is reached, create a set
    // containing the first substring and return
    else if (n === 0) {
        return new Set([X.slice(0, m)]);
    }

    // if the last character of `X` and `Y` is the same, it should occur
    // only one time in SSC
    if (X[m - 1] === Y[n - 1]) {
        // find all SCS of substring `X[0…m-2]` and `Y[0…n-2]`
        // and append the current character `X[m-1]` or `Y[n-1]` to all SCS of
        // substring `X[0…m-2]` and `Y[0…n-2]`

        const scs = SCS(X, Y, m - 1, n - 1, lookup);
        return new Set([...scs].map(s => s + X[m - 1]));
    }

    // we reach here when the last character of `X` and `Y` don't match

    // if a top cell of the current cell has more value than the left cell,
    // then append the current character of string `X` to all SCS of
    // substring `X[0…m-2]`, `Y[0…n-1]`

    if (lookup[m - 1][n] > lookup[m][n - 1]) {
        const scs = SCS(X, Y, m - 1, n, lookup);
        return new Set([...scs].map(s => s + X[m - 1]));
    }

    // if a left cell of the current cell has more value than the top cell,
    // then append the current character of string `Y` to all SCS of
    // substring `X[0…m-1]`, `Y[0…n-2]`

    if (lookup[m][n - 1] > lookup[m - 1][n]) {
        const scs = SCS(X, Y, m, n - 1, lookup);
        return new Set([...scs].map(s => s + Y[n - 1]));
    }

    // if the top cell value is the same as the left cell, then go in both
    // top and left directions

    // append the current character of string `X` to all SCS of
    // substring `X[0…m-2]`, `Y[0…n-1]`
    const top = SCS(X, Y, m - 1, n, lookup);

    // append the current character of string `Y` to all SCS of
    // substring `X[0…m-1]`, `Y[0…n-2]`
    const left = SCS(X, Y, m, n - 1, lookup);

    // merge both sets and return
    return new Set([...top].map(s => s + X[m - 1])
        .concat([...left].map(s => s + Y[n - 1])));
}

// Function to fill the lookup table by finding the length of LCS
// of substring `X[0…m-1]` and `Y[0…n-1]`
function LCS(X: string, Y: string, m: number, n: number, lookup: number[][]): void {
    // first row and first column of the lookup table are already 0

    // fill the lookup table in a bottom-up manner
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            // if the current character of `X` and `Y` matches
            if (X[i - 1] === Y[j - 1]) {
                lookup[i][j] = lookup[i - 1][j - 1] + 1;
            }
            // otherwise, if the current character of `X` and `Y` don't match
            else {
                lookup[i][j] = Math.max(lookup[i - 1][j], lookup[i][j - 1]);
            }
        }
    }
}

// Function to find all shortest common supersequence of string `X` and `Y`
function findAllSCS(X: string, Y: string): Set<string> {
    const m = X.length;
    const n = Y.length;

    // `lookup[i][j]` stores the length of LCS of substring `X[0…i-1]` and `Y[0…j-1]`
    const lookup: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

    // fill lookup table
    LCS(X, Y, m, n, lookup);

    // find and return all the shortest common supersequences
    return SCS(X, Y, m, n, lookup);
}

// demo
const X = 'ABCBDAB';
const Y = 'BDCABA';

// Find all shortest common supersequence of string `X` and `Y`
const scs = findAllSCS(X, Y);

console.log(`All shortest common supersequence of ${X} and ${Y} are:\n`);

// print all SCS present in the set
for (const str of scs) {
    console.log(str);
}
```

**Output:** All shortest common supersequence of ABCBDAB and BDCABA are: ABCBDCABA ABDCABDAB ABDCBDABA
