# Determine the minimal adjustment cost of an array

> Source: https://www.techiedelight.com/determine-minimal-adjustment-cost-array/

[Dynamic Programming](https://www.techiedelight.com/Category/Dynamic-Programming/)

Write an algorithm to replace each element in an array of positive integers such that the difference between adjacent elements in the array is less than or equal to a given target. The goal is to minimize the adjustment cost, which is the sum of differences between new and old values.

In other words, minimize `∑|A[i] - Anew[i]|`, where `0 <= i <= n-1`, `n` is the size of `A[]` and `Anew[]` is the array with adjacent difference less than or equal to target.

For example,

**Input:** A = [1, 3, 0, 3], target = 1 **Output:** Minimum adjustment cost is 3 One of the possible solutions is [2, 3, 2, 3] **Input:** A = [55, 77, 52, 61, 39, 6, 25, 60, 49, 47], target = 10 **Output:** Minimum adjustment cost is 75 One of the possible solutions is [55, 62, 52, 49, 39, 29, 30, 40, 49, 47] **Input:** A = [2, 3, 2, 3], target = 1 **Output:** Minimum adjustment cost is 0 All adjacent elements in the input array are already less than equal to the given target.

To minimize the adjustment cost `∑|A[i] - Anew[i]|` for all index `i` in the array, `|A[i] - Anew[i]|` should be as close to 0 as possible. Also, `|A[i] - Anew[i+1] ]| <= Target`.

We can use [dynamic programming](https://techiedelight.com/introduction-dynamic-programming/) to solve this problem. Let `T[i][j]` defines minimal adjustment cost on changing A[i] to j, then the DP relation is defined by:

`T[i][j] = min{T[i - 1][k]} + |j - A[i]|` for all `k's` such that `|k - j| <= target`

Here, `0 <= i < n` and `0 <= j <= M`, where `n` is the total number of elements in the array. We have to consider all `k` such that `max(j - target, 0) <= k <= min(M, j + target)`. Finally, the minimum adjustment cost of the array will be `min{T[n - 1][j]}` for all `0 <= j <= M`.

The algorithm can be implemented as follows in TypeScript:

```ts
const M = 100;

// Find the minimum adjustment cost of an array
function findMinAdjustmentCost(A: number[], target: number): number {
  // base case
  if (A.length === 0) {
    return 0;
  }

  // T[i][j] stores the minimal adjustment cost on changing A[i] to j
  const T: number[][] = Array.from({ length: A.length }, () => new Array(M + 1).fill(0));

  // do for each array element
  for (let i = 0; i < A.length; i++) {
    // replace A[i] to `j` and calculate minimal adjustment cost T[i][j]
    for (let j = 0; j <= M; j++) {
      // separately handle the first array element
      if (i === 0) {
        T[i][j] = Math.abs(j - A[i]);
      } else {
        // initialize minimal adjustment cost with infinity
        T[i][j] = Number.MAX_SAFE_INTEGER;

        // consider all `k` such that k >= max(j - target, 0) and
        // k <= min(M, j + target) and take minimum
        for (let k = Math.max(j - target, 0); k <= Math.min(M, j + target); k++) {
          T[i][j] = Math.min(T[i][j], T[i - 1][k] + Math.abs(A[i] - j));
        }
      }
    }
  }

  // return minimum value from the last row of T[][]
  let result = Number.MAX_SAFE_INTEGER;
  for (let j = 0; j <= M; j++) {
    result = Math.min(result, T[A.length - 1][j]);
  }

  return result;
}

const A = [55, 77, 52, 61, 39, 6, 25, 60, 49, 47];
const target = 10;

console.log(`The minimal adjustment cost is ${findMinAdjustmentCost(A, target)}`);
```

**Author:** Aditya Goel

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.58/5. Vote count: 154

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Bottom-up](https://www.techiedelight.com/Tags/Tabulation/), [Hard](https://www.techiedelight.com/Tags/hard/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
