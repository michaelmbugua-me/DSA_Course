# Longest Common Subsequence | Finding all LCS

> Source: https://www.techiedelight.com/longest-common-subsequence-finding-lcs/

Given two sequences, print all the possible longest common subsequences present in them.

For example,

**Input:** X = XMJYAUZ, Y = MZJAWXU **Output:** MJAU **Input:** X = ABCBDAB, Y = BDCABA **Output:** BCAB, BCBA, BDAB

> 

In the [previous post](https://techiedelight.com/longest-common-subsequence/), we have discussed how to find the length of the longest common subsequence. This post will discuss how to print the longest common subsequence itself.

Let `X` be `XMJYAUZ` and `Y` be `MZJAWXU`. The longest common subsequence between `X` and `Y` is `MJAU`. The table below shows the lengths of the longest common subsequences between prefixes of `X` and `Y`. The `i'th` row and `j'th` column show the LCS’s length of substring `X[0…i-1]` and `Y[0…j-1]`.

The highlighted numbers show the path one should follow from the bottom-right to the top-left corner when reading an LCS. If the current characters in `X` and `Y` are equal (shown in bold), they are part of the LCS, and we move diagonally. If the current characters in `X` and `Y` are different, we go up or left, depending on which cell has a higher number. This corresponds to either taking the LCS between `X[0…i-2], Y[0…j-1]`, or `X[0…i-1], Y[0…j-2]`.

Following is a TypeScript implementation that fills the lookup table in a [bottom-up manner](https://techiedelight.com/introduction-dynamic-programming/#bottom-up) and then recursively finds LCS in a [top-down](https://techiedelight.com/introduction-dynamic-programming/#top-down) manner using values in the lookup table:

```ts
// Function to find the longest common subsequence of string `X[0…m-1]` and `Y[0…n-1]`
function LCS(X: string, Y: string, m: number, n: number, lookup: number[][]): string {
  // return an empty string if the end of either sequence is reached
  if (m === 0 || n === 0) {
    return '';
  }

  // if the last character of `X` and `Y` matches
  if (X[m - 1] === Y[n - 1]) {
    // append current character (`X[m-1]` or `Y[n-1]`) to LCS of
    // substring `X[0…m-2]` and `Y[0…n-2]`
    return LCS(X, Y, m - 1, n - 1, lookup) + X[m - 1];
  }

  // otherwise, if the last character of `X` and `Y` are different

  // if a top cell of the current cell has more value than the left
  // cell, then drop the current character of string `X` and find LCS
  // of substring `X[0…m-2]`, `Y[0…n-1]`

  if (lookup[m - 1][n] > lookup[m][n - 1]) {
    return LCS(X, Y, m - 1, n, lookup);
  } else {
    // if a left cell of the current cell has more value than the top
    // cell, then drop the current character of string `Y` and find LCS
    // of substring `X[0…m-1]`, `Y[0…n-2]`
    return LCS(X, Y, m, n - 1, lookup);
  }
}

// Function to fill the lookup table by finding the length of LCS
// of substring `X[0…m-1]` and `Y[0…n-1]`
function LCSLength(X: string, Y: string, m: number, n: number, lookup: number[][]): void {
  // fill the lookup table in a bottom-up manner
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
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
}

const X = 'XMJYAUZ';
const Y = 'MZJAWXU';

const m = X.length, n = Y.length;

// lookup[i][j] stores the length of LCS of substring `X[0…i-1]` and `Y[0…j-1]`
const lookup: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

// fill lookup table
LCSLength(X, Y, m, n, lookup);

// find the longest common subsequence
console.log(LCS(X, Y, m, n, lookup));
```

**Output:** MJAU

How can we modify the code so it prints all possible LCS?

The above code doesn’t generate all the longest common subsequences of given sequences. It will always print one LCS. The problem with the above code is when the last character of `X` and `Y` are different, it discards either the last character of `X` or the last character of `Y` based on the top or left cell’s value to the current cell. But what if LCS is also possible with the discarded character?

The idea remains the same except if the top cell is equal to the left cell, consider both characters; otherwise, go in the direction of greater value. Following is a TypeScript implementation of the idea:

```ts
// Function to return all LCS of substrings `X[0…m-1]`, `Y[0…n-1]`
function LCS(X: string, Y: string, m: number, n: number, lookup: number[][]): string[] {
  // if the end of either sequence is reached
  if (m === 0 || n === 0) {
    // create a list with one empty string and return
    return [''];
  }

  // if the last character of `X` and `Y` matches
  if (X[m - 1] === Y[n - 1]) {
    // ignore the last characters of `X` and `Y` and find all LCS of substring
    // `X[0…m-2]`, `Y[0…n-2]` and store it in a list
    const lcs = LCS(X, Y, m - 1, n - 1, lookup);

    // append current character `X[m-1]` or `Y[n-1]`
    // to all LCS of substring `X[0…m-2]` and `Y[0…n-2]`
    for (let i = 0; i < lcs.length; i++) {
      lcs[i] = lcs[i] + X[m - 1];
    }

    return lcs;
  }

  // we reach here when the last character of `X` and `Y` don't match

  // if a top cell of the current cell has more value than the left cell,
  // then ignore the current character of string `X` and find all LCS of
  // substring `X[0…m-2]`, `Y[0…n-1]`
  if (lookup[m - 1][n] > lookup[m][n - 1]) {
    return LCS(X, Y, m - 1, n, lookup);
  }

  // if a left cell of the current cell has more value than the top cell,
  // then ignore the current character of string `Y` and find all LCS of
  // substring `X[0…m-1]`, `Y[0…n-2]`
  if (lookup[m][n - 1] > lookup[m - 1][n]) {
    return LCS(X, Y, m, n - 1, lookup);
  }

  // if the top cell has equal value to the left cell, then consider both characters

  const top = LCS(X, Y, m - 1, n, lookup);
  const left = LCS(X, Y, m, n - 1, lookup);

  // merge two lists and return
  return top.concat(left);
}

// Function to fill the lookup table by finding the length of LCS
// of substring `X` and `Y`
function LCSLength(X: string, Y: string, lookup: number[][]): void {
  // fill the lookup table in a bottom-up manner
  for (let i = 1; i <= X.length; i++) {
    for (let j = 1; j <= Y.length; j++) {
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
}

// Function to find all LCS of string `X[0…m-1]` and `Y[0…n-1]`
function findLCS(X: string, Y: string): Set<string> {
  // lookup[i][j] stores the length of LCS of substring `X[0…i-1]` and `Y[0…j-1]`
  const lookup: number[][] = Array.from({ length: X.length + 1 }, () =>
    Array(Y.length + 1).fill(0));

  // fill lookup table
  LCSLength(X, Y, lookup);

  // find all the longest common subsequences
  const lcs = LCS(X, Y, X.length, Y.length, lookup);

  // since a list can contain duplicates, "convert" it to a set and return
  return new Set(lcs);
}

const X = 'ABCBDAB';
const Y = 'BDCABA';

const lcs = findLCS(X, Y);
console.log(lcs);
```

**Output:** BCAB BCBA BDAB

**References:** <https://en.wikipedia.org/wiki/Longest_common_subsequence_problem>
