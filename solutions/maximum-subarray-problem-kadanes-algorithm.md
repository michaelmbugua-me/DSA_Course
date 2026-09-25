# Maximum Sum Subarray Problem (Kadane’s Algorithm)

> Source: https://www.techiedelight.com/maximum-subarray-problem-kadanes-algorithm/

Given an integer array, find a contiguous subarray within it that has the largest sum.

For example,

**Input:** {-2, 1, -3, 4, -1, 2, 1, -5, 4} **Output:** Subarray with the largest sum is {4, -1, 2, 1} with sum 6.

> 

The problem differs from the problem of finding the maximum sum subsequence. Unlike subsequences, [subarrays](https://techiedelight.com/difference-between-subarray-subsequence-subset/#subarray) are required to occupy consecutive positions within the original array.

We can easily solve this problem in linear time using [Kadane’s algorithm](https://techiedelight.com/maximum-subarray-problem-kadanes-algorithm/). The idea is to maintain a maximum (positive-sum) subarray “ending” at each index of the given array. This subarray is either empty (in which case its sum is zero) or consists of one more element than the maximum subarray ending at the previous index.

The algorithm can be implemented as follows in TypeScript:

```ts
// Function to find the maximum sum of a contiguous subarray
// in a given integer array
function kadane(arr: number[]): number {

    // stores the maximum sum sublist found so far
    let max_so_far = 0;

    // stores the maximum sum of sublist ending at the current position
    let max_ending_here = 0;

    // traverse the given list
    for (const i of arr) {
        // update the maximum sum of sublist "ending" at index 'i' (by adding the
        // current element to maximum sum ending at previous index 'i-1')
        max_ending_here = max_ending_here + i;

        // if the maximum sum is negative, set it to 0 (which represents
        // an empty sublist)
        max_ending_here = Math.max(max_ending_here, 0);

        // update the result if the current sublist sum is found to be greater
        max_so_far = Math.max(max_so_far, max_ending_here);
    }

    return max_so_far;
}

const arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4];

console.log(`The sum of contiguous sublist with the largest sum is ${kadane(arr)}`);
```

**Output:** The maximum sum of a contiguous subarray is 6

The time complexity of the above solution is O(n) and doesn’t require any extra space, where `n` is the size of the input.

The above code doesn’t handle the case when all the array elements are negative. If the array contains all negative values, the answer is the maximum element. We can easily place this check before continuing to the algorithm. The implementation can be seen below in TypeScript:

```ts
// Function to find the maximum sum of a contiguous subarray
// in a given integer array
function kadane(arr: number[]): number {

    // find the maximum element present in a given list
    const maximum = Math.max(...arr);

    // if the list contains all negative values, return the maximum element
    if (maximum < 0) {
        return maximum;
    }

    // stores the maximum sum sublist found so far
    let max_so_far = 0;

    // stores the maximum sum of sublist ending at the current position
    let max_ending_here = 0;

    // do for each element of a given list
    for (const i of arr) {

        // update the maximum sum of sublist "ending" at index 'i' (by adding the
        // current element to maximum sum ending at previous index 'i-1')
        max_ending_here = max_ending_here + i;

        // if the maximum sum is negative, set it to 0 (which represents
        // an empty sublist)
        max_ending_here = Math.max(max_ending_here, 0);

        // update the result if the current sublist sum is found to be greater
        max_so_far = Math.max(max_so_far, max_ending_here);
    }

    return max_so_far;
}

const arr = [-8, -3, -6, -2, -5, -4];
console.log(`The sum of contiguous sublist with the largest sum is ${kadane(arr)}`);
```

```ts
// Function to find the maximum sum of a contiguous subarray
// in a given integer array (handles negative numbers as well)
function kadaneNeg(arr: number[]): number {

    // stores the maximum sum subarray found so far
    let max_so_far = Number.NEGATIVE_INFINITY;

    // stores the maximum sum of subarray ending at the current position
    let max_ending_here = 0;

    // traverse the given array
    for (let i = 1; i < arr.length; i++)
    {
        // update the maximum sum of subarray "ending" at index 'i' (by adding the
        // current element to maximum sum ending at previous index 'i-1')
        max_ending_here = max_ending_here + arr[i];

        // maximum sum should be more than the current element
        max_ending_here = Math.max(max_ending_here, arr[i]);

        // update the result if the current subarray sum is found to be greater
        max_so_far = Math.max(max_so_far, max_ending_here);
    }

    return max_so_far;
}

const arr = [-8, -3, -6, -2, -5, -4];

console.log(`The maximum sum of a contiguous subarray is ${kadaneNeg(arr)}`);
```

**Output:** The maximum sum of a contiguous subarray is -2
