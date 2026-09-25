# Find the maximum absolute difference between the sum of two non-overlapping subarrays

> Source: https://www.techiedelight.com/find-maximum-absolute-difference-subarrays/

[Array](https://www.techiedelight.com/Category/Array/)

Given an array, find the maximum absolute difference between the sum of elements of two non-overlapping subarrays in linear time.

Please note that the problem specifically targets [subarrays](https://techiedelight.com/difference-between-subarray-subsequence-subset/#subarray) that are contiguous (i.e., occupy consecutive positions) and inherently maintains the order of elements.

For example,

**Input:** A[] = { -3, -2, 6, -3, 5, -9, 3, 4, -1, -8, 2 } **Output:** The maximum absolute difference is 19. The two subarrays are { 6, -3, 5 }, { -9, 3, 4, -1, -8 } whose sum of elements are 8 and -11, respectively. So, abs(8-(-11)) or abs(-11-8) = 19.

> 

The idea is to calculate the maximum and minimum sum of subarrays ending and starting at any index `i` in the array. Then for each index `i`, consider the maximum absolute value of the following:

  * Maximum subarray sum in subarray ending at index `i` – Minimum subarray sum in subarray starting at index `i+1`
  * Minimum subarray sum in subarray ending at index `i` – Maximum subarray sum in subarray starting at index `i+1`

If [Kadane’s algorithm](https://techiedelight.com/maximum-subarray-problem-kadanes-algorithm/) is used, the time complexity of this solution is O(n2), where `n` is the size of the input.

We can solve this problem in O(n) by using extra space. The idea is to create four auxiliary arrays, `left_min[i]`, `left_max[]`, `right_min[]`, `right_min[]`, such that:

  * `left_max[i]` stores the maximum sum of subarray in `A(0, i)`
  * `right_max[i]` stores the maximum sum of subarray in `A(i, n-1)`
  * `left_min[i]` stores the minimum sum of subarray in `A(0, i)`
  * `right_min[i]` stores the minimum sum of subarray in `A(i, n-1)`

To fill `left_max[]` and `right_max[]` arrays in linear time, we can use the standard [Kadane’s algorithm](https://techiedelight.com/maximum-subarray-problem-kadanes-algorithm/) for finding the maximum sum of a subarray.

To fill `left_min[]` and `right_min[]` arrays, we can still use Kadane’s algorithm by transforming the array so that each element’s sign is reversed. Then find the maximum sum of subarray for each index and invert its sign to get the minimum subarray sum.

The algorithm can be implemented as follows in TypeScript:

```ts
// `diff` ——> counter for loop from `i` to `j` in `A[]` (`diff` can be `+1` or `-1`)
// If the `diff` is 1, fill `aux[k]` with the maximum sum of subarray `A[0, k]`
// If the `diff` is -1, fill `aux[k]` with the maximum sum of subarray `A[k, n-1]`
// using Kadane’s algorithm

function findMaxSumSubarray(A: number[], aux: number[], i: number, j: number, diff: number): void {

    let max_so_far = A[i];
    let max_ending_here = A[i];
    aux[i] = A[i];

    for (let k = i + diff; k !== j; k += diff) {
        // update the maximum sum of subarray "ending" or "starting" at index `k`
        max_ending_here = Math.max(A[k], max_ending_here + A[k]);

        // update the result if the current subarray sum is found to be greater
        max_so_far = Math.max(max_so_far, max_ending_here);
        aux[k] = max_so_far;
    }
}

function fillArrays(A: number[], left_max: number[], right_max: number[],
                    left_min: number[], right_min: number[], n: number): void {

    findMaxSumSubarray(A, left_max, 0, n - 1, 1);
    findMaxSumSubarray(A, right_max, n - 1, 0, -1);

    // negate `A[]` for finding the minimum sum of subarrays using
    // the same logic for finding the maximum sum of subarrays
    for (let i = 0; i < n; i++) {
        A[i] = -A[i];
    }

    findMaxSumSubarray(A, left_min, 0, n - 1, 1);
    findMaxSumSubarray(A, right_min, n - 1, 0, -1);

    // negate `left_min[]` and `right_min[]` to get the minimum sum of subarrays
    for (let i = 0; i < n; i++) {
        left_min[i] = -left_min[i];
    }

    for (let i = 0; i < n; i++) {
        right_min[i] = -right_min[i];
    }

    // restore the sign of `A[]`
    for (let i = 0; i < n; i++) {
        A[i] = -A[i];
    }
}

// Find the maximum absolute difference between the sum of elements of
// two non-overlapping subarrays in a given array
function findMaxAbsDiff(A: number[]): number {

    const n = A.length;

    // base case
    if (n === 0) {
        return 0;
    }

    // base case
    if (n === 1) {
        return A[0];
    }

    // `left_max[i]` stores maximum sum of subarray in `A(0, i)`
    const left_max: number[] = new Array(n).fill(Number.MIN_SAFE_INTEGER);

    // `right_max[i]` stores maximum sum of subarray in `A(i, n-1)`
    const right_max: number[] = new Array(n).fill(Number.MIN_SAFE_INTEGER);

    // `left_min[i]` stores minimum sum of subarray in `A(0, i)`
    const left_min: number[] = new Array(n).fill(Number.MAX_SAFE_INTEGER);

    // `right_min[i]` stores minimum sum of subarray in `A(i, n-1)`
    const right_min: number[] = new Array(n).fill(Number.MAX_SAFE_INTEGER);

    fillArrays(A, left_max, right_max, left_min, right_min, n);

    // stores the maximum absolute difference
    let max_abs_diff = Number.MIN_SAFE_INTEGER;

    // do for each index `i` in the array
    for (let i = 0; i < n - 1; i++) {
        const abs_diff = Math.max(Math.abs(left_max[i] - right_min[i + 1]),
                    Math.abs(left_min[i] - right_max[i + 1]));
        max_abs_diff = Math.max(max_abs_diff, abs_diff);
    }

    return max_abs_diff;
}

const A = [-3, -2, 6, -3, 5, -9, 3, 4, -1, -8, 2];

console.log('The maximum absolute difference is', findMaxAbsDiff(A));
```

**Output:** The maximum absolute difference is 19

Also See:

Also See:

> [Maximum Sum Circular Subarray](https://www.techiedelight.com/maximum-sum-circular-subarray/ "Maximum Sum Circular Subarray")

> [Find minimum product among all combinations of triplets in an array](https://www.techiedelight.com/find-minimum-product-triplets-array/ "Find minimum product among all combinations of triplets in an array")

> [Maximum Sum Subarray Problem (Kadane’s Algorithm)](https://www.techiedelight.com/maximum-subarray-problem-kadanes-algorithm/ "Maximum Sum Subarray Problem \(Kadane’s Algorithm\)")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.87/5. Vote count: 131

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hard](https://www.techiedelight.com/Tags/hard/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
