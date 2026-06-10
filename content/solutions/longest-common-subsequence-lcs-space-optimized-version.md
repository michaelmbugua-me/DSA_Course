# Longest Common Subsequence (LCS) | Space optimized version

> Source: https://www.techiedelight.com/longest-common-subsequence-lcs-space-optimized-version/

Write a space-optimized version of the LCS problem.

We have already discussed an [iterative DP version of the LCS problem ](https://techiedelight.com/longest-common-subsequence/) that uses O(m.n) space where `m` and `n` are the length of given strings `X` and `Y`, respectively. If only the length of the LCS is required, the space complexity of the solution can be improved up to O(min(m, n)) since we are only reading from the previous row of the current row.

> 

## Approach 1: (Using two arrays)

The space-optimized algorithm can be implemented as follows in TypeScript, using two arrays:

```ts
// Space optimized function to find the length of the longest common subsequence
// of substring `X[0…m-1]` and `Y[0…n-1]`
function LCSLength(X: string, Y: string): number {
  const m = X.length, n = Y.length;

  // allocate storage for one-dimensional arrays, `curr` and `prev`
  const curr: number[] = Array(n + 1).fill(0);
  let prev: number[] = Array(n + 1).fill(0);

  // fill the lookup table in a bottom-up manner
  for (let i = 0; i <= m; i++) {
    for (let j = 0; j <= n; j++) {
      if (i > 0 && j > 0) {
        // if the current character of `X` and `Y` matches
        if (X[i - 1] === Y[j - 1]) {
          curr[j] = prev[j - 1] + 1;
        }
        // otherwise, if the current character of `X` and `Y` don't match
        else {
          curr[j] = Math.max(prev[j], curr[j - 1]);
        }
      }
    }

    // replace contents of the previous array with the current array
    prev = [...curr];
  }

  // LCS will be the last entry in the lookup table
  return curr[n];
}

const X = 'XMJYAUZ';
const Y = 'MZJAWXU';

console.log('The length of the LCS is', LCSLength(X, Y));
```

**Output:** The length of the LCS is 4

The time complexity of the above solution is O(m.n), where `m` and `n` are the length of given strings `X` and `Y`, respectively. The auxiliary space required by the program is O(n), which is independent of the length of the first string `m`. However, if the second string’s length is much larger than the first string’s length, then the space complexity would be huge. We can optimize the space complexity to O(min(m, n)) by creating a wrapper that always passes a smaller string as a second argument to the `LCSLength` function.

```ts
function LCSLength(X: string, Y: string): number {
    const m: number = X.length;
    const n: number = Y.length;
    const curr: number[] = Array(n + 1).fill(0);
    let previousDiagonal: number = 0;

    for (let i = 1; i <= m; i++) {
        previousDiagonal = 0;
        for (let j = 1; j <= n; j++) {
            const oldValue: number = curr[j];
            if (X[i - 1] === Y[j - 1]) {
                curr[j] = previousDiagonal + 1;
            } else {
                curr[j] = Math.max(curr[j], curr[j - 1]);
            }
            previousDiagonal = oldValue;
        }
    }

    return curr[n];
}

const X = 'XMJYAUZ', Y = 'MZJAWXU';

// pass smaller string as a second argument to `LCSLength()`
if (X.length > Y.length) {
  console.log('The length of the LCS is', LCSLength(X, Y));
} else {
  console.log('The length of the LCS is', LCSLength(Y, X));
}
```

The program’s auxiliary space now is `2 x min(m, n)`.

## Approach 2: (Using one array)

The above solution uses two arrays. We can further optimize the code to use only a single array and a temporary variable. The implementation can be seen below in TypeScript:

```ts
// Space optimized function to find the length of the longest common subsequence
// of substring `X[0…m-1]` and `Y[0…n-1]`
function LCSLength(X: string, Y: string): number {
  const m = X.length, n = Y.length;

  // allocate storage for one-dimensional array `curr`
  const curr: number[] = Array(n + 1).fill(0);

  // fill the lookup table in a bottom-up manner
  for (let i = 0; i <= m; i++) {
    let prev = curr[0];
    for (let j = 0; j <= n; j++) {
      const backup = curr[j];
      if (i === 0 || j === 0) {
        curr[j] = 0;
      } else {
        // if the current character of `X` and `Y` matches
        if (X[i - 1] === Y[j - 1]) {
          curr[j] = prev + 1;
        }
        // otherwise, if the current character of `X` and `Y` don't match
        else {
          curr[j] = Math.max(curr[j], curr[j - 1]);
        }
      }

      prev = backup;
    }
  }

  // LCS will be the last entry in the lookup table
  return curr[n];
}

const X = 'XMJYAUZ';
const Y = 'MZJAWXU';

// pass smaller string as a second argument to `LCSLength()`
if (X.length > Y.length) {
  console.log('The length of the LCS is', LCSLength(X, Y));
} else {
  console.log('The length of the LCS is', LCSLength(Y, X));
}
```

**Output:** The length of the LCS is 4
