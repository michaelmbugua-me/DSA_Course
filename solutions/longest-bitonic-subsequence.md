# Longest Bitonic Subsequence

> Source: https://www.techiedelight.com/longest-bitonic-subsequence/

The longest bitonic subsequence problem is to find a subsequence of a given sequence in which the subsequence’s elements are first sorted in increasing order, then in decreasing order, and the subsequence is as long as possible.

For example, the longest bitonic subsequence of a sequence `[4, 2, 5, 9, 7, 6, 10, 3, 1]` is `[4, 5, 9, 7, 6, 3, 1]`.

For sequences sorted in increasing or decreasing order, the output is the same as the input sequence, i.e.,

[1, 2, 3, 4, 5] ——> [1, 2, 3, 4, 5] [5, 4, 3, 2, 1] ——> [5, 4, 3, 2, 1]

The problem differs from the problem of finding the [longest bitonic subarray](https://techiedelight.com/find-longest-bitonic-subarray-array/). Unlike subarrays, [subsequences](https://techiedelight.com/difference-between-subarray-subsequence-subset/#subsequence) are not required to occupy consecutive positions within the original array.

> 

The idea is to maintain two arrays, `I[]` and `D[]`:

  * `I[i]` store the length of the [longest increasing subsequence](https://techiedelight.com/longest-increasing-subsequence-using-dynamic-programming/), ending at `nums[i]`.
  * `D[i]` stores the length of the [longest decreasing subsequence](https://techiedelight.com/longest-decreasing-subsequence), starting from `nums[i]`.

Finally, the length of longest bitonic subsequence is maximum among all `I[i] + D[i] - 1`. For example, consider the sequence `[4, 2, 5, 9, 7, 6, 10, 3, 1]`. The contents of the LIS and LDS array are:

| I[i] | D[i] | (i = 0) | 1 | 3 | (i = 1) | 1 | 2 | (i = 2) | 2 | 3 |**(i = 3) | 3 | 5 |** (i = 4) | 3 | 4 | (i = 5) | 3 | 3 | (i = 6) | 4 | 3 | (i = 7) | 2 | 3 | (i = 8) | 1 | 1 |

The longest bitonic subsequence length is 7 `[4, 5, 9, 7, 6, 3, 1]`. The longest bitonic subsequence is formed by `I[3] + D[3] - 1`.

Following is a TypeScript implementation of the idea:

```ts
// Function to find the longest bitonic subsequence in an array
function calculateLBS(nums: number[]): number {
  const n = nums.length;

  // base case
  if (n === 0) {
    return 0;
  }

  // `I[i]` store the length of the longest increasing subsequence,
  // ending at `nums[i]`
  const I: number[] = Array(n).fill(0);

  // `D[i]` stores the length of the longest decreasing subsequence,
  // starting with `nums[i]`
  const D: number[] = Array(n).fill(0);

  I[0] = 1;
  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i] && I[j] > I[i]) {
        I[i] = I[j];
      }
    }
    I[i] = I[i] + 1;
  }

  D[n - 1] = 1;
  for (let i = n - 2; i >= 0; i--) {
    for (let j = n - 1; j > i; j--) {
      if (nums[j] < nums[i] && D[j] > D[i]) {
        D[i] = D[j];
      }
    }
    D[i] = D[i] + 1;
  }

  // consider each element as a peak and calculate LBS
  let lbs = 1;
  for (let i = 0; i < n; i++) {
    lbs = Math.max(lbs, I[i] + D[i] - 1);
  }

  return lbs;
}

const nums = [4, 2, 5, 9, 7, 6, 10, 3, 1];
console.log('The length of the longest bitonic subsequence is', calculateLBS(nums));
```

**Output:** The length of the longest bitonic subsequence is 7

How to print LBS?

The idea remains the same, except instead of storing the length of the LIS and LDS, we store LIS and LDS itself. For example, consider the sequence `[4, 2, 5, 9, 7, 6, 10, 3, 1]`. The contents of the LIS and LDS list are:

| I[i] | D[i] (i = 0) | 4 | 4 3 1 (i = 1) | 2 | 2 1 (i = 2) | 4 5 | 5 3 1**(i = 3) | 4 5 9 | 9 7 6 3 1** (i = 4) | 4 5 7 | 7 6 3 1 (i = 5) | 4 5 6 | 6 3 1 (i = 6) | 4 5 9 10 | 10 3 1 (i = 7) | 2 3 | 3 1 (i = 8) | 1 | 1

The longest bitonic subsequence is `[4, 5, 9, 7, 6, 3, 1]` and is formed by `I[3] + D[3]`. Following is a TypeScript implementation of the idea:

```ts
// Function to find the longest bitonic subsequence in an array
function LBS(nums: number[]): void {
  const n = nums.length;

  // base case
  if (n === 0) {
    return;
  }

  // `I[i]` store the longest increasing subsequence, ending at `nums[i]`
  const I: number[][] = Array.from({ length: n }, () => []);
  I[0].push(nums[0]);

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (I[i].length < I[j].length && nums[i] > nums[j]) {
        I[i] = [...I[j]];
      }
    }
    I[i].push(nums[i]);
  }

  // `D[i]` stores the longest decreasing subsequence, starting from `nums[i]`
  const D: number[][] = Array.from({ length: n }, () => []);
  D[n - 1].unshift(nums[n - 1]);

  for (let i = n - 2; i >= 0; i--) {
    for (let j = n - 1; j > i; j--) {
      if (D[i].length < D[j].length && nums[i] > nums[j]) {
        D[i] = [...D[j]];
      }
    }
    D[i].unshift(nums[i]);
  }

  // find the peak element index
  let peak = 0;
  for (let i = 1; i < n; i++) {
    if (I[i].length + D[i].length > I[peak].length + D[peak].length) {
      peak = i;
    }
  }

  process.stdout.write('The longest bitonic subsequence is ');

  // print longest increasing subsequence ending at peak element
  process.stdout.write(String(I[peak]));

  // pop the front element of LDS as it points to the same element as the rear of LIS
  D[peak].shift();

  // print longest decreasing subsequence starting from the peak element
  console.log(D[peak]);
}

const nums = [4, 2, 5, 9, 7, 6, 10, 3, 1];
LBS(nums);
```

**Output:** The longest bitonic subsequence is 4 5 9 7 6 3 1

The time complexity of the above solution is O(n2) and requires O(n2) extra space, where `n` is the size of the given sequence.
