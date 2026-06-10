# Longest Increasing Subsequence using Dynamic Programming

> Source: https://www.techiedelight.com/longest-increasing-subsequence-using-dynamic-programming/

The longest increasing subsequence problem is to find a subsequence of a given sequence in which the subsequence’s elements are in sorted order, lowest to highest, and in which the subsequence is as long as possible. This subsequence is not necessarily contiguous or unique.

Please note that the problem specifically targets [subsequences](https://techiedelight.com/difference-between-subarray-subsequence-subset/#subsequence) that need not be contiguous, i.e., subsequences are not required to occupy consecutive positions within the original sequences.

For example, the longest increasing subsequence of `[0, 8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11, 7, 15]` is `[0, 2, 6, 9, 11, 15]`.

This subsequence has length 6; the input sequence has no 7–member increasing subsequences. The longest increasing subsequence in this example is not unique.

For instance, `[0, 4, 6, 9, 11, 15]` or `[0, 4, 6, 9, 13, 15]` are other increasing subsequences of equal length in the same input sequence.

> 

The idea is to use [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/) to solve this problem. For each item, there are two possibilities:

  1. Include the current item in LIS if it is greater than the previous element in LIS and recur for the remaining items.
  2. Exclude the current item from LIS and recur for the remaining items.

Finally, return the maximum value we get by including or excluding the current item. The base case of the recursion would be when no items are left. Following is a TypeScript implementation of the idea:

```ts
// Function to find the length of the longest increasing subsequence
function LIS(arr: number[], i: number, n: number, prev: number): number {
  // Base case: nothing is remaining
  if (i === n) {
    return 0;
  }

  // case 1: exclude the current element and process the
  // remaining elements
  const excl = LIS(arr, i + 1, n, prev);

  // case 2: include the current element if it is greater
  // than the previous element in LIS
  let incl = 0;
  if (arr[i] > prev) {
    incl = 1 + LIS(arr, i + 1, n, arr[i]);
  }

  // return the maximum of the above two choices
  return Math.max(incl, excl);
}

const arr = [0, 8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11, 7, 15];

console.log('The length of the LIS is', LIS(arr, 0, arr.length, Number.MIN_VALUE));
```

**Output:** The length of the LIS is 6

The time complexity of the above solution is exponential and occupies space in the call stack.

The problem has an [optimal substructure](https://techiedelight.com/introduction-dynamic-programming/#optimal-substructure). That means the problem can be broken down into smaller, simple “subproblems”, which can further be divided into yet simpler, smaller subproblems until the solution becomes trivial. The above solution also exhibits [overlapping subproblems](https://techiedelight.com/introduction-dynamic-programming/#overlapping-subproblems). If we draw the solution’s recursion tree, we can see that the same subproblems are repeatedly computed. We know that problems with optimal substructure and overlapping subproblems can be solved using dynamic programming, where subproblem solutions are _memo_ ized rather than computed repeatedly. The _memo_ ized version follows the top-down approach since we first break the problem into subproblems and then calculate and store values.

We can also solve this problem in a bottom-up manner. In the bottom-up approach, solve smaller subproblems first, then solve larger subproblems from them. The following bottom-up approach computes `L[i]`, for each `0 <= i < n`, which stores the length of the longest increasing subsequence of subarray `arr[0…i]` that ends with `arr[i]`. To calculate `L[i]`, consider LIS of all smaller values of `i` (say `j`) already computed and pick maximum `L[j]`, where `arr[j]` is less than the current element `arr[i]`. It has the same asymptotic runtime as Memoization but no recursion overhead.

Following is a TypeScript implementation of the idea:

```ts
// Iterative function to find the length of the longest increasing subsequence
// of a given array
function LIS(arr: number[]): number {
  // base case
  if (!arr || arr.length === 0) {
    return 0;
  }

  // array to store subproblem solution. `L[i]` stores the length
  // of the longest increasing subsequence that ends with `arr[i]`
  const L: number[] = Array(arr.length).fill(0);

  // the longest increasing subsequence ending at `arr[0]` has length 1
  L[0] = 1;

  // start from the second array element
  for (let i = 1; i < arr.length; i++) {
    // do for each element in subarray `arr[0…i-1]`
    for (let j = 0; j < i; j++) {
      // find the longest increasing subsequence that ends with `arr[j]`
      // where `arr[j]` is less than the current element `arr[i]`
      if (arr[j] < arr[i] && L[j] > L[i]) {
        L[i] = L[j];
      }
    }
    // include `arr[i]` in LIS
    L[i] = L[i] + 1;
  }

  // return longest increasing subsequence (having maximum length)
  return Math.max(...L);
}

const arr = [0, 8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11, 7, 15];
console.log('The length of the LIS is', LIS(arr));
```

**Output:** The length of the LIS is 6

The time complexity of the above solution is O(n2) and requires O(n) extra space, where `n` is the size of the given sequence.

How to print LIS?

The above-discussed methods only print the length of LIS but do not print LIS itself. To print the LIS, we have to store the longest increasing subsequence in the lookup table instead of storing just the LIS length.

For example, consider array `arr = [ 0, 8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11, 7, 15]`. The longest increasing subsequence of subarray `arr[0…i]` that ends with `arr[i]` are:

LIS[0] — 0 LIS[1] — 0 8 LIS[2] — 0 4 LIS[3] — 0 8 12 LIS[4] — 0 2 LIS[5] — 0 8 10 LIS[6] — 0 4 6 LIS[7] — 0 8 12 14 LIS[8] — 0 1 LIS[9] — 0 4 6 9 LIS[10] — 0 4 5 LIS[11] — 0 4 6 9 13 LIS[12] — 0 2 3 LIS[13] — 0 4 6 9 11 LIS[14] — 0 4 6 7 LIS[15] — 0 4 6 9 13 15

Following is a TypeScript implementation of the idea:

```ts
// Iterative function to find the longest increasing subsequence
// of a given array
function findLIS(arr: number[]): void {
  const n = arr.length;

  // base case
  if (n === 0) {
    return;
  }

  // LIS[i] stores the longest increasing subsequence of subarray
  // `arr[0…i]` that ends with `arr[i]`
  const LIS: number[][] = Array.from({ length: n }, () => []);

  // LIS[0] denotes the longest increasing subsequence ending at `arr[0]`
  LIS[0].push(arr[0]);

  // start from the second array element
  for (let i = 1; i < n; i++) {
    // do for each element in subarray `arr[0…i-1]`
    for (let j = 0; j < i; j++) {
      // find the longest increasing subsequence that ends with `arr[j]`
      // where `arr[j]` is less than the current element `arr[i]`

      if (arr[j] < arr[i] && LIS[j].length > LIS[i].length) {
        LIS[i] = [...LIS[j]];
      }
    }

    // include `arr[i]` in `LIS[i]`
    LIS[i].push(arr[i]);
  }

  // `j` will store the index of LIS
  let j = 0;
  for (let i = 0; i < n; i++) {
    if (LIS[j].length < LIS[i].length) {
      j = i;
    }
  }

  // print LIS
  console.log(LIS[j].join(' '));
}

const arr = [0, 8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11, 7, 15];

findLIS(arr);
```

**Output:** 0 4 6 9 13 15
