# Longest Increasing Subsequence using LCS

> Source: https://www.techiedelight.com/longest-increasing-subsequence-using-lcs/

The longest increasing subsequence problem is to find a subsequence of a given sequence in which the subsequence’s elements are in sorted order, lowest to highest, and in which the subsequence is as long as possible. This subsequence is not necessarily contiguous or unique.

For example, the longest increasing subsequence is `[0, 2, 6, 9, 11, 15]` in the following subsequence:

`[0, 8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11, 7, 15]`

This subsequence has length 6; the input sequence has no 7–member increasing subsequences. The longest increasing subsequence in this example is not unique. For instance, `[0, 4, 6, 9, 11, 15]` or `[0, 4, 6, 9, 13, 15]` are other increasing subsequences of equal length in the same input sequence.

> 

We have discussed a [dynamic programming](https://techiedelight.com/introduction-dynamic-programming/) solution to solve the longest increasing subsequence problem in the [previous post](https://techiedelight.com/longest-increasing-subsequence-using-dynamic-programming/). In this post, another interesting DP solution is discussed in which we reduce the Longest Increasing Subsequence (LIS) to the [Longest Common Subsequence (LCS)](https://techiedelight.com/longest-common-subsequence/). Following is the complete algorithm:

  * Create a copy of the original array.
  * Sort the copy of the original array.
  * Remove all the duplicates from the copy.
  * Perform LCS of original sequence with its modified copy.

The algorithm can be implemented as follows in TypeScript:

```ts
// Function to find the length of the longest common subsequence of
// list `X[0…m-1]` and `Y[0…n-1]`
function LCSLength(X: number[], Y: number[], m: number, n: number, lookup: Map<string, number>): number {
  // return if the end of either list is reached
  if (m === 0 || n === 0) {
    return 0;
  }

  // construct a unique map key from dynamic elements of the input
  const key = `${m}|${n}`;

  // if the subproblem is seen for the first time, solve it and
  // store its result in a map
  if (!lookup.has(key)) {
    // if the last element of `X` and `Y` matches
    if (X[m - 1] === Y[n - 1]) {
      lookup.set(key, LCSLength(X, Y, m - 1, n - 1, lookup) + 1);
    }
    // otherwise, if the last element of `X` and `Y` don't match
    else {
      lookup.set(key, Math.max(LCSLength(X, Y, m, n - 1, lookup),
        LCSLength(X, Y, m - 1, n, lookup)));
    }
  }

  // return the subproblem solution from the map
  return lookup.get(key)!;
}

// Function to remove duplicates from a sorted list
function removeDuplicates(Y: number[]): number {
  let k = 0;
  for (let i = 1; i < Y.length; i++) {
    if (Y[i] !== Y[k]) {
      k = k + 1;
      Y[k] = Y[i];
    }
  }

  // return length of sublist containing all distinct characters
  return k + 1;
}

// Iterative function to find the length of the longest increasing subsequence (LIS)
// of a given list using the longest common subsequence (LCS)
function findLIS(X: number[]): number {
  // base case
  if (!X || X.length === 0) {
    return 0;
  }

  // create a copy of the original list and sort it
  const Y = [...X].sort((a, b) => a - b);

  const n = X.length;
  const m = removeDuplicates(Y);    // remove all the duplicates from `Y`

  // create a map to store solutions to subproblems
  const lookup = new Map<string, number>();

  // return LCS of both
  return LCSLength(X, Y, n, m, lookup);
}

const X = [0, 8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11, 7, 15];
console.log('The length of the LIS is', findLIS(X));
```

**Output:** The length of the LIS is 6

How to read out an LIS?

The idea is to read the LCS lookup table and follow the path from the bottom-right to the top-left corner of the table. If the current element in `X` and `Y` are equal, they are part of the LIS, and we move diagonally. If the current element in `X` and `Y` are different, we go up or left, depending on which cell has a higher number.

Following is the implementation in TypeScript based on the above idea:

```ts
// Function to find LCS of array `X[0…m-1]` and `Y[0…n-1]`
function LCS(X: number[], Y: number[], m: number, n: number, lookup: number[][]): void {
  // return if the end of either array is reached
  if (m === 0 || n === 0) {
    return;
  }

  // if the last element of `X` and `Y` matches
  if (X[m - 1] === Y[n - 1]) {
    LCS(X, Y, m - 1, n - 1, lookup);
    process.stdout.write(`${X[m - 1]} `);
    return;
  }

  // otherwise, if the last element of `X` and `Y` don't match

  if (lookup[m - 1][n] > lookup[m][n - 1]) {
    LCS(X, Y, m - 1, n, lookup);
  } else {
    LCS(X, Y, m, n - 1, lookup);
  }
}

// Function to find the length of the longest common subsequence of
// array `X[0…m-1]` and `Y[0…n-1]`
function findLCS(X: number[], Y: number[], m: number, n: number): void {
  // `lookup[i][j]` stores the length of LCS of subarray `X[0…i-1]` and
  // `Y[0…j-1]`
  const lookup: number[][] = Array.from({ length: X.length + 1 }, () =>
    Array(X.length + 1).fill(0));

  // Fill the lookup table in a bottom-up manner.
  // The first row and first column of the lookup table are already 0.
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      // if the current element of `X` and `Y` matches
      if (X[i - 1] === Y[j - 1]) {
        lookup[i][j] = lookup[i - 1][j - 1] + 1;
      }
      // otherwise, if the current element of `X` and `Y` don't match
      else {
        lookup[i][j] = Math.max(lookup[i - 1][j], lookup[i][j - 1]);
      }
    }
  }

  // find the longest common sequence
  LCS(X, Y, m, n, lookup);
}

// Function to remove duplicates from a sorted array
function removeDuplicates(Y: number[]): number {
  let k = 0;
  for (let i = 1; i < Y.length; i++) {
    if (Y[i] !== Y[k]) {
      k = k + 1;
      Y[k] = Y[i];
    }
  }

  // return length of subarray containing all distinct characters
  return k + 1;
}

// Iterative function to find the length of the longest increasing subsequence (LIS)
// of a given array using the longest common subsequence (LCS)
function findLIS(X: number[]): void {
  // base case
  if (!X || X.length === 0) {
    return;
  }

  // create a sorted copy of the original array
  const Y = [...X].sort((a, b) => a - b);

  const n = X.length;
  const m = removeDuplicates(Y);    // remove all the duplicates from `Y`

  // return LCS of both
  findLCS(X, Y, n, m);
}

const X = [0, 8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11, 7, 15];

process.stdout.write('The LIS is ');
findLIS(X);
console.log();
```

**Output:** The LIS is 0 2 6 9 11 15

The time complexity of the above solution is O(n2) and requires O(n2) extra space, where `n` is the size of the given sequence.
