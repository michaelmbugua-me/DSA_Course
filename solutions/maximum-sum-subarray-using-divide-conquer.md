# Maximum Subarray Sum using Divide and Conquer

> Source: https://www.techiedelight.com/maximum-sum-subarray-using-divide-conquer/

Given an integer array, find the maximum sum among all subarrays possible.

The problem differs from the problem of finding the maximum subsequence sum. Unlike subsequences, [subarrays](https://techiedelight.com/difference-between-subarray-subsequence-subset/#subarray) are required to occupy consecutive positions within the original array.

For example,

**Input:** nums[] = [2, -4, **1, 9, -6, 7** , -3] **Output:** The maximum sum of the subarray is 11 (Marked in **Green**)

> 

A naive solution is to consider every possible subarray, find the sum, and take the maximum. The problem with this approach is that its worst-case time complexity is O(n2), where `n` is the size of the input.

Following is a TypeScript program that demonstrates it:

```ts
// Naive solution to find maximum sublist sum using divide-and-conquer
function findMaximumSum(nums: number[]): number {

    let maxSum = Number.NEGATIVE_INFINITY;

    // do for each sublist starting with `i`
    for (let i = 0; i < nums.length; i++) {

        // calculate the sum of sublist `nums[i…j]`

        let total = 0;        // reset sum

        // do for each sublist ending at `j`
        for (let j = i; j < nums.length; j++) {
            total += nums[j];

            // if the current sublist sum is greater than the maximum sum
            // calculated so far, update the maximum sum
            if (total > maxSum) {
                maxSum = total;
            }
        }
    }

    return maxSum;
}

const nums = [2, -4, 1, 9, -6, 7, -3];
console.log(`The Maximum sum of the sublist is ${findMaximumSum(nums)}`);
```

How can we perform better?

The idea is to use [Divide and Conquer](https://techiedelight.com/divide-and-conquer-interview-questions/) technique to find the maximum subarray sum. The algorithm works as follows:

  * Divide the array into two equal subarrays.
  * Recursively calculate the maximum subarray sum for the left subarray,
  * Recursively calculate the maximum subarray sum for the right subarray,
  * Find the maximum subarray sum that crosses the middle element.
  * Return the maximum of the above three sums.

The algorithm can be implemented as follows in TypeScript:

```ts
// Function to find the maximum sublist sum using divide-and-conquer
function findMaximumSum(nums: number[], left = 0, right = nums.length - 1): number {

    // base case
    if (!nums.length) {
        return 0;
    }

    // If the list contains 0 or 1 element
    if (right === left) {
        return nums[left];
    }

    // Find the middle element in the list
    const mid = (left + right) / 2;

    // Find maximum sublist sum for the left sublist,
    // including the middle element
    let leftMax = Number.NEGATIVE_INFINITY;
    let total = 0;
    for (let i = mid; i >= left; i--) {
        total += nums[i];
        if (total > leftMax) {
            leftMax = total;
        }
    }

    // Find maximum sublist sum for the right sublist,
    // excluding the middle element
    let rightMax = Number.NEGATIVE_INFINITY;
    total = 0;        // reset sum to 0

    for (let i = mid + 1; i <= right; i++) {
        total += nums[i];
        if (total > rightMax) {
            rightMax = total;
        }
    }

    // Recursively find the maximum sublist sum for the left
    // and right sublist, and take maximum
    const maxLeftRight = Math.max(findMaximumSum(nums, left, mid),
                    findMaximumSum(nums, mid + 1, right));

    // return the maximum of the three
    return Math.max(maxLeftRight, leftMax + rightMax);
}

const nums = [2, -4, 1, 9, -6, 7, -3];
console.log(`The Maximum sum of the sublist is ${findMaximumSum(nums)}`);
```

**Output:** The maximum sum of the subarray is 11

The time complexity of the above divide-and-conquer solution is O(n.log(n)) as for the given array of size `n`, we make two recursive calls on input size `n/2` and finding the maximum subarray crosses midpoint takes O(n) time in the worst case. Therefore,

T(n) = 2T(n/2) + O(n) = O(n.log(n))

We can also solve this problem in O(n) time using [Kadane’s algorithm](https://techiedelight.com/maximum-subarray-problem-kadanes-algorithm/).
