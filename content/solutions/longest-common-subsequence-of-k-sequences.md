# Longest Common Subsequence of k–sequences

> Source: https://www.techiedelight.com/longest-common-subsequence-of-k-sequences/

The Longest Common Subsequence (LCS) problem is finding the longest subsequence present in given two sequences in the same order, i.e., find the longest sequence which can be obtained from the first original sequence by deleting some items and from the second original sequence by deleting other items.

The problem differs from the problem of finding the [longest common substring](https://techiedelight.com/longest-common-substring-problem/). Unlike substrings, [subsequences](https://techiedelight.com/difference-between-subarray-subsequence-subset/#subsequence) are not required to occupy consecutive positions within the original string.

**Prerequisite:**

> [Longest Common Subsequence Problem](https://techiedelight.com/longest-common-subsequence/)

In the [previous post](https://techiedelight.com/longest-common-subsequence/), we have discussed the longest common subsequence of two sequences. In this post, we will extend the solution to three sequences. The proposed solution can be easily generalized to handle more than three sequences as well.

For example, consider the three following sequences `X`, `Y`, and `Z`:

X: ABCBDAB Y: BDCABA Z: BADACB The length of the LCS is 4, and the LCS is BDAB.

> 

We have seen in the previous post, LCS problem has an [optimal substructure](https://techiedelight.com/introduction-dynamic-programming/#optimal-substructure), which means that the main problem can be broken down into smaller, simple “subproblems”, which can further be divided into yet simpler subproblems.

1\. Let’s consider given sequences `X`, `Y`, and `Z` of length `i`, `j`, and `k` that both end in the same element. To find their LCS, shorten each sequence by removing the last element, find the LCS of the shortened sequences, and to that LCS append the removed element. So, if `X[i] = Y[j] = Z[k]`, we can say that,

LCS(X[1…i], Y[1…j], Z[1…k]) = LCS(X[1…i-1], Y[1…j-1], Z[1…k-1]) + X[i]

2\. Now, suppose that the given sequences do not end in the same symbol. Then the LCS of `X`, `Y`, and `Z` is the longest of the given sequences.

LCS(X[1…i-1], Y[1…j], Z[1…k]), LCS(X[1…i], Y[1…j-1], Z[1…k]), and LCS(X[1…i], Y[1…j], Z[1…k-1])

The following solution in TypeScript finds the length of LCS of sequences `X[0…m-1], Y[0…n-1]`, and `Z[0…o-1]` recursively by using the optimal substructure property of LCS problem:

```ts
// Function to find the length of the longest common subsequence of
// sequences X[0…m-1], Y[0…n-1], and Z[0…o-1]
function LCSLength(X: string, Y: string, Z: string, m: number, n: number, o: number): number {
  // return if the end of either sequence is reached
  if (m === 0 || n === 0 || o === 0) {
    return 0;
  }

  // if the last character of `X`, `Y`, and `Z` matches
  if (X[m - 1] === Y[n - 1] && Y[n - 1] === Z[o - 1]) {
    return LCSLength(X, Y, Z, m - 1, n - 1, o - 1) + 1;
  }

  // otherwise, if the last character of `X`, `Y` and `Z` doesn't match
  return Math.max(LCSLength(X, Y, Z, m - 1, n, o),
    LCSLength(X, Y, Z, m, n - 1, o),
    LCSLength(X, Y, Z, m, n, o - 1));
}

const X = 'ABCBDAB';
const Y = 'BDCABA';
const Z = 'BADACB';

console.log('The length of the LCS is', LCSLength(X, Y, Z, X.length, Y.length, Z.length));
```

**Output:** The length of the LCS is 4

The worst-case time complexity of the above solution is O(3(m+n+o)), where `m`, `n`, and `o` is the length of `X`, `Y`, and `Z`, respectively. The worst case happens when there is no common subsequence present in `X`, `Y`, `Z` (i.e., LCS length is 0), and each recursive call ends up in three recursive calls.

The LCS problem exhibits [overlapping subproblems](https://techiedelight.com/introduction-dynamic-programming/#overlapping-subproblems). A problem is said to have overlapping subproblems if the recursive algorithm for the problem solves the same subproblem repeatedly rather than generating new subproblems. We know that problems having optimal substructure and overlapping subproblems can be solved by dynamic programming, in which subproblem solutions are memoized rather than computed repeatedly. This method can be implemented as follows in TypeScript:

Following is the memoized implementation in TypeScript:

```ts
// Function to find the length of the longest common subsequence of
// sequences X[0…m-1], Y[0…n-1], and Z[0…o-1]
function LCSLength(
  X: string, Y: string, Z: string,
  m: number, n: number, o: number,
  lookup: Map<string, number>
): number {
  // return if the end of either sequence is reached
  if (m === 0 || n === 0 || o === 0) {
    return 0;
  }

  // construct a unique map key from dynamic elements of the input
  const key = `${m}|${n}|${o}`;

  // if the subproblem is seen for the first time, solve it and
  // store its result in a map
  if (!lookup.has(key)) {
    // if the last character of `X`, `Y`, and `Z` matches
    if (X[m - 1] === Y[n - 1] && Y[n - 1] === Z[o - 1]) {
      lookup.set(key, LCSLength(X, Y, Z, m - 1, n - 1, o - 1, lookup) + 1);
    } else {
      // otherwise, if the last character of `X`, `Y` and `Z` doesn't match
      lookup.set(key, Math.max(LCSLength(X, Y, Z, m - 1, n, o, lookup),
        LCSLength(X, Y, Z, m, n - 1, o, lookup),
        LCSLength(X, Y, Z, m, n, o - 1, lookup)));
    }
  }

  // return the subproblem solution from the map
  return lookup.get(key)!;
}

const X = 'ABCBDAB';
const Y = 'BDCABA';
const Z = 'BADACB';

// create a map to store solutions to subproblems
const lookup = new Map<string, number>();

console.log('The length of the LCS is',
  LCSLength(X, Y, Z, X.length, Y.length, Z.length, lookup));
```

**Output:** The length of the LCS is 4

The time complexity of the above top-down solution is O(m.n.o) and requires O(m.n.o) extra space, where `m`, `n`, and `o` is the length of `X`, `Y`, and `Z`, respectively.

The above _memo_ ized version follows the top-down approach since we first break the problem into subproblems and then calculate and store values. We can also solve this problem in a bottom-up manner. In the bottom-up approach, calculate the smaller values of `LCS(i, j, k)` first, then build larger values from them.

| 0 if i == 0 or j == 0 or k == 0 LCS[i][j][k] = | LCS[i-1][j-1][k-1] + 1 if X[i-1] == Y[j-1] == Z[k-1] | longest(LCS[i-1][j][k], otherwise LCS[i][j-1][k], LCS[i][j][k-1])

Following is a TypeScript implementation of the idea:

```ts
// Function to find the length of the longest common subsequence of
// sequences X[0…m-1], Y[0…n-1], and Z[0…o-1]
function LCSLength(X: string, Y: string, Z: string): number {
  const m = X.length, n = Y.length, o = Z.length;

  // lookup table stores solution to already computed subproblems;
  // i.e., `lookup[i][j][k]` stores the length of LCS of substring
  // X[0…i-1], Y[0…j-1] and Z[0…k-1]
  const lookup: number[][][] = Array.from({ length: m + 1 }, () =>
    Array.from({ length: n + 1 }, () => Array(o + 1).fill(0)));

  // fill the lookup table in a bottom-up manner
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      for (let k = 1; k <= o; k++) {
        // if the current character of `X`, `Y`, and `Z` matches
        if (X[i - 1] === Y[j - 1] && Y[j - 1] === Z[k - 1]) {
          lookup[i][j][k] = lookup[i - 1][j - 1][k - 1] + 1;
        }
        // otherwise, if the current character of `X`, `Y`, and `Z`
        // doesn't match
        else {
          lookup[i][j][k] = Math.max(lookup[i - 1][j][k],
            lookup[i][j - 1][k],
            lookup[i][j][k - 1]);
        }
      }
    }
  }

  // LCS will be the last entry in the lookup table
  return lookup[m][n][o];
}

const X = 'ABCBDAB', Y = 'BDCABA', Z = 'BADACB';

console.log('The length of the LCS is', LCSLength(X, Y, Z));
```

**Output:** The length of the LCS is 4
