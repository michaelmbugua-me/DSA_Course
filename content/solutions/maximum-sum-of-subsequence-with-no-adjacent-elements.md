# Find the maximum sum of a subsequence with no adjacent elements

> Source: https://www.techiedelight.com/maximum-sum-of-subsequence-with-no-adjacent-elements/

Given an integer array, find the maximum sum of subsequence where the subsequence contains no element at adjacent positions.

Please note that the problem specifically targets [subsequences](https://techiedelight.com/difference-between-subarray-subsequence-subset/#subsequence) that need not be contiguous, i.e., subsequences are not required to occupy consecutive positions within the original sequences.

For example,

**Input:** { 1, 2, 9, 4, 5, 0, 4, 11, 6 } **Output:** The maximum sum is 26 The maximum sum is formed by subsequence { 1, 9, 5, 11 }

> 

The problem is similar to the [0/1 Knapsack problem](https://techiedelight.com/0-1-knapsack-problem/), where for every item, we have two choices – to include that element in the solution or exclude that element from the solution. We can solve this problem by following the same logic. The only difference is that we include the current element only if it’s not adjacent to the previous element considered.

The algorithm can be implemented as follows in TypeScript:

```ts
// Function to calculate the maximum sum in a given list
// with no adjacent elements considered
// `i` ——> index of the current element
// `prev` ——> index of the previous element included in the sum
function findMaxSumSubsequence(nums: number[], i: number, n: number,
                            prev: number = Number.NEGATIVE_INFINITY): number {

    // base case: all elements are processed
    if (i === n) {
        return 0;
    }

    // recur by excluding the current element
    const excl = findMaxSumSubsequence(nums, i + 1, n, prev);

    let incl = 0;

    // include current element only if it's not adjacent to
    // the previous element
    if (prev + 1 !== i) {
        incl = findMaxSumSubsequence(nums, i + 1, n, i) + nums[i];
    }

    // return maximum sum we get by including or excluding
    // current item
    return Math.max(incl, excl);
}

const nums = [1, 2, 9, 4, 5, 0, 4, 11, 6];
console.log(`The maximum sum is ${findMaxSumSubsequence(nums, 0, nums.length)}`);
```

**Output:** The maximum sum is 26

Note that the above solution only works for positive numbers.

We can also solve this problem in a [bottom-up fashion](https://techiedelight.com/introduction-dynamic-programming/#bottom-up) using [dynamic programming](https://techiedelight.com/dynamic-programming-interview-questions/) (Tabulation). In the bottom-up approach, we solve smaller subproblems first, then solve larger subproblems from them. The idea is to create an auxiliary array `lookup[]` to store the solution of subproblems. For each index `i`, lookup[i] stores the maximum value that can be attained till index `i`. It uses the value of smaller values `i` already computed. It has the same asymptotic runtime as Memoization but no recursion overhead.

This approach is demonstrated below in TypeScript:

```ts
// DP solution to calculate the maximum sum in a given list
// with no adjacent elements considered (function uses an extra space)
function findMaxSumSubsequence(nums: number[]): number {

    const n = nums.length;

    // base case
    if (n === 0) {
        return 0;
    }

    // base case
    if (n === 1) {
        return nums[0];
    }

    // create an auxiliary space to store solutions to subproblems
    const lookup: number[] = Array(n).fill(0);

    // lookup[i] stores the maximum sum possible till index `i`

    // trivial case
    lookup[0] = nums[0];
    lookup[1] = Math.max(nums[0], nums[1]);

    // traverse list from index 2
    for (let i = 2; i < n; i++) {

        // lookup[i] stores the maximum sum we get by

        // 1. Excluding the current element and take maximum sum until index `i-1`
        // 2. Including the current element nums[i] and take the maximum sum until
        //    index `i-2`
        lookup[i] = Math.max(lookup[i - 1], lookup[i - 2] + nums[i]);

        // if the current element is more than the maximum sum until the current
        // element
        lookup[i] = Math.max(lookup[i], nums[i]);
    }

    // return maximum sum
    return lookup[n - 1];
}

const nums = [1, 2, 9, 4, 5, 0, 4, 11, 6];
console.log(`The maximum sum is ${findMaxSumSubsequence(nums)}`);
```

The time complexity of the above solution is O(n) and requires O(n) extra space, where `n` is the size of the given sequence.

The above solution uses extra space. We can also solve this problem without using any extra space. If we analyze the solution, we can see that the maximum sum until any index `i` can be found by knowing the maximum sum of the previous index `i-1` and index `i-2`. Instead of storing the complete array, we can maintain two variables that store the maximum sum until the previous index and before the previous index.

Following is a TypeScript implementation based on the above idea:

```ts
// Constant space DP-solution to calculate the maximum sum in a given
// array with no adjacent elements considered
function findMaxSumSubsequence(nums: number[]): number {

    const n = nums.length;

    // base case
    if (n === 0) {
        return 0;
    }

    // base case
    if (n === 1) {
        return nums[0];
    }

    // store maximum sum until index `i-2`
    let prev_prev = nums[0];

    // stores maximum sum until index `i-1`
    let prev = Math.max(nums[0], nums[1]);

    // start from index 2
    for (let i = 2; i < n; i++)
    {
        // `curr` stores the maximum sum until index `i`
        const curr = Math.max(nums[i], Math.max(prev, prev_prev + nums[i]));
        prev_prev = prev;
        prev = curr;
    }

    // return maximum sum
    return prev;
}

const nums = [1, 2, 9, 4, 5, 0, 4, 11, 6];

console.log(`The maximum sum is ${findMaxSumSubsequence(nums)}`);
```

**Output:** The maximum sum is 26
