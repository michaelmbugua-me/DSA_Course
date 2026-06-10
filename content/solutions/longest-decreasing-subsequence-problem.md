# Longest Decreasing Subsequence Problem

> Source: https://www.techiedelight.com/longest-decreasing-subsequence-problem/

The longest decreasing subsequence problem is to find a subsequence of a given sequence in which the subsequence’s elements are in sorted order, highest to lowest, and in which the subsequence is as long as possible. This subsequence is not necessarily contiguous or unique.

Please note that the problem specifically targets [subsequences](https://techiedelight.com/difference-between-subarray-subsequence-subset/#subsequence) that need not be contiguous, i.e., subsequences are not required to occupy consecutive positions within the original sequences.

For example, consider the following subsequence:

`[0, 8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11, 7, 15]`

The longest decreasing subsequence is `[12, 10, 9, 5, 3]`, which has length 5; the input sequence has no 6–member decreasing subsequences.

The longest decreasing subsequence in this example is not unique: for instance, `[12, 10, 6, 5, 3]` is another decreasing subsequence of equal length in the same input sequence.

> 

We can use [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/) to solve this problem. For each item, there are two possibilities:

  1. Include the current item in LDS if it is smaller than the previous element in LDS and recur for the remaining items.
  2. Exclude the current item from LDS and recur for the remaining items.

Finally, return the maximum value we get by including or excluding the current item. The base case of the recursion would be when no items are left. Following is a TypeScript implementation of the idea:

```ts
// Function to find the length of the longest decreasing subsequence
// of subarray `nums[i…n)`
function LDS(nums: number[], i: number, prev: number): number {
  // Base case: nothing is remaining
  if (i === nums.length) {
    return 0;
  }

  // case 1: exclude the current element and process the
  // remaining elements
  const excl = LDS(nums, i + 1, prev);

  // case 2: include the current element if it is smaller
  // than the previous element in LDS
  let incl = 0;
  if (nums[i] < prev) {
    incl = 1 + LDS(nums, i + 1, nums[i]);
  }

  // return the maximum of the above two choices
  return Math.max(incl, excl);
}

const nums = [0, 8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11, 7, 15];

console.log('The length of the LDS is', LDS(nums, 0, Number.MAX_VALUE));
```

**Output:** The length of the LDS is 5

The time complexity of the above solution is exponential and occupies space in the call stack.

The problem has an [optimal substructure](https://techiedelight.com/introduction-dynamic-programming/#optimal-substructure). That means the problem can be broken down into smaller, simple “subproblems”, which can further be divided into yet simpler, smaller subproblems until the solution becomes trivial. The above solution also exhibits [overlapping subproblems](https://techiedelight.com/introduction-dynamic-programming/#overlapping-subproblems). If we draw the solution’s recursion tree, we can see that the same subproblems are repeatedly computed.

We know that problems with optimal substructure and overlapping subproblems can be solved using dynamic programming, where subproblem solutions are _memo_ ized rather than computed repeatedly. The _memo_ ized version follows the top-down approach since we first break the problem into subproblems and then calculate and store values.

We can also solve this problem in a bottom-up manner. In the bottom-up approach, we solve smaller subproblems first, then solve larger subproblems from them. The following bottom-up approach computes `L[i]`, for each `0 <= i < n`, which stores the length of the longest decreasing subsequence of subarray `nums[0…i]` that ends with `nums[i]`. To calculate `L[i]`, consider LDS of all smaller values of `i` (say `j`) already computed and pick the maximum `L[j]`, where `nums[j]` is more than the current element `nums[i]`. It has the same asymptotic runtime as Memoization but no recursion overhead.

Following is a TypeScript implementation of the idea:

```ts
// Iterative function to find the length of the longest decreasing subsequence
// of a given array
function LDS(nums: number[]): number {
  // base case
  if (!nums || nums.length === 0) {
    return 0;
  }

  // array to store subproblem solution. `L[i]` stores the length
  // of the longest decreasing subsequence that ends with `nums[i]`
  const L: number[] = Array(nums.length).fill(0);

  // longest decreasing subsequence ending at `nums[0]` has length 1
  L[0] = 1;

  // start from the second array element
  for (let i = 1; i < nums.length; i++) {
    // do for each element in subarray `nums[0…i-1]`
    for (let j = 0; j < i; j++) {
      // find longest decreasing subsequence that ends with `nums[j]`
      // where `nums[j]` is more than the current element `nums[i]`

      if (nums[j] > nums[i] && L[j] > L[i]) {
        L[i] = L[j];
      }
    }

    // include `nums[i]` in LDS
    L[i] = L[i] + 1;
  }

  // return longest decreasing subsequence (having maximum length)
  return Math.max(...L);
}

const nums = [0, 8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11, 7, 15];
console.log('The length of the LDS is', LDS(nums));
```

**Output:** The length of the LDS is 5

The time complexity of the above solution is O(n2) and requires O(n) extra space, where `n` is the size of the given sequence.

How to print LDS?

The above-discussed methods only print the length of LDS but do not print LDS itself. To print the LDS, we have to store the longest decreasing subsequence in the lookup table instead of storing just the LDS length.

For example, consider the following array:

nums[] = [0, 8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11, 7, 15]

The longest decreasing subsequence `LDS[i]` of subarray `nums[0…i]` that ends with `nums[i]` are:

LDS[0] — 0 LDS[1] — 8 LDS[2] — 8 4 LDS[3] — 12 LDS[4] — 8 4 2 LDS[5] — 12 10 LDS[6] — 12 10 6 LDS[7] — 14 LDS[8] — 8 4 2 1 LDS[9] — 12 10 9 LDS[10] — 12 10 6 5 LDS[11] — 14 13 LDS[12] — 12 10 6 5 3 LDS[13] — 14 13 11 LDS[14] — 12 10 9 7 LDS[15] — 15

Following is a TypeScript implementation of the idea:

```ts
// Iterative function to find the longest decreasing subsequence
// of a given array
function findLDS(nums: number[]): void {
  const n = nums.length;

  // base case
  if (n === 0) {
    return;
  }

  // `LDS[i]` stores the longest decreasing subsequence of subarray
  // `nums[0…i]` that ends with `nums[i]`
  const LDS: number[][] = Array.from({ length: n }, () => []);

  // `LDS[0]` denotes longest decreasing subsequence ending at `nums[0]`
  LDS[0].push(nums[0]);

  // start from the second array element
  for (let i = 1; i < n; i++) {
    // do for each element in subarray `nums[0…i-1]`
    for (let j = 0; j < i; j++) {
      // find longest decreasing subsequence that ends with `nums[j]`
      // where `nums[j]` is more than the current element `nums[i]`

      if (nums[j] > nums[i] && LDS[j].length > LDS[i].length) {
        LDS[i] = [...LDS[j]];
      }
    }

    // include `nums[i]` in `LDS[i]`
    LDS[i].push(nums[i]);
  }

  // `j` will contain an index of LDS
  let j = 0;
  for (let i = 0; i < n; i++) {
    if (LDS[j].length < LDS[i].length) {
      j = i;
    }
  }

  // print LDS
  console.log(LDS[j].join(' '));
}

const nums = [0, 8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11, 7, 15];

findLDS(nums);
```

**Output:** 12 10 6 5 3
