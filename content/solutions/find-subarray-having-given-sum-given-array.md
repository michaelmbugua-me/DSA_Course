# Find a subarray having the given sum in an integer array

> Source: https://www.techiedelight.com/find-subarray-having-given-sum-given-array/

[Array](https://www.techiedelight.com/Category/Array/)

Given an integer array, find a subarray having a given sum in it.

For example,

**Input:** nums[] = {2, 6, 0, 9, 7, 3, 1, 4, 1, 10}, target = 15 **Output:** {6, 0, 9} **Input:** nums[] = {0, 5, -7, 1, -4, 7, 6, 1, 4, 1, 10}, target = 15 **Output:** {1, -4, 7, 6, 1, 4} or {4, 1, 10} **Input:** nums[] = {0, 5, -7, 1, -4, 7, 6, 1, 4, 1, 10}, target = -3 **Output:** {1, -4} or {-7, 1, -4, 7}

> 

## 1\. Using Sliding Window

We can solve this problem by using a [sliding window](https://techiedelight.com/sliding-window-problems/). The idea is to maintain a window that starts from the current element, and the sum of its elements is more than or equal to the given sum. If the current window’s sum becomes less than the given sum, then the window is unstable, and we keep on adding elements to the current window from its right till the window becomes stable again. Print the window if its sum is equal to the given sum at any point. Note this approach will only work with an array of **positive integers**.

The algorithm can be implemented as follows in TypeScript:

```ts
// Function to print sublist having a given sum using
// sliding window technique
const findSublist = (nums: number[], target: number): void => {
    // maintains the sum of the current window
    let windowSum = 0;

    // maintain a window [low, high-1]
    let high = 0;

    // consider every sublist starting from `low` index
    for (let low = 0; low < nums.length; low++) {
        // if the current window's sum is less than the given sum,
        // then add elements to the current window from the right
        while (windowSum < target && high < nums.length) {
            windowSum += nums[high];
            high = high + 1;
        }

        // if the current window's sum is equal to the given sum
        if (windowSum === target) {
            console.log(`Sublist found (${low}, ${high - 1})`);
            return;
        }

        // At this point, the current window's sum is more than the given sum.
        // Remove the current element (leftmost element) from the window
        windowSum -= nums[low];
    }
};

// a list of positive integers
const nums = [2, 6, 0, 9, 7, 3, 1, 4, 1, 10];
const target = 15;
findSublist(nums, target);
```

**Output:** Subarray found [1–3]

The time complexity of the above solution is O(n) and doesn’t require any extra space, where `n` is the size of the input.

## 2\. Using Hashing

The above solution will fail for negative numbers. We can use [hashing](https://techiedelight.com/hashing-in-data-structure/) to check if a subarray with the given sum exists in the array or not. The idea is to traverse the given array and maintain the sum of elements seen so far. If the difference between the current sum and the given sum is seen before (i.e., the difference exists in the set), return true as there is at least one subarray with the given sum that ends at the current index; otherwise, insert the sum into the set.

Following is the implementation of the above algorithm in TypeScript:

```ts
// Function to check if a sublist with the given sum exists in the list or not
const findSublist = (nums: number[], target: number): boolean => {
    // create an empty set
    const s = new Set<number>();

    // insert number 0 into the set to handle the case when a
    // sublist with the given sum starts from index 0
    s.add(0);

    // keep track of the sum of elements so far
    let sum_so_far = 0;

    // traverse the given list
    for (const i of nums) {
        // update sum_so_far
        sum_so_far += i;

        // if `sum_so_far - target` is seen before, we have found
        // the sublist with sum equal to `target`
        if (s.has(sum_so_far - target)) {
            return true;
        }

        // otherwise, add the sum of elements so far in the set
        s.add(sum_so_far);
    }

    // we reach here when no sublist exists
    return false;
};

// a list of integers
const nums = [0, 5, -7, 1, -4, 7, 6, 1, 4, 1, 10];
const target = -3;

if (findSublist(nums, target)) {
    console.log('Sublist with the given sum exists');
} else {
    console.log('Sublist with the given sum does not exist');
}
```

We can also print the subarray using hashing. The idea is to use a map instead of a set that stores the ending index of the subarray and its sum.

```ts
// Function to print subarray having a given sum using hashing
const findSubarray = (nums: number[], target: number): void => {
    // create an empty map
    const map = new Map<number, number>();

    // insert (0, -1) pair into the set to handle the case when a
    // subarray with the given sum starts from index 0
    map.set(0, -1);

    // keep track of the sum of elements so far
    let sum_so_far = 0;

    // traverse the given array
    for (let i = 0; i < nums.length; i++) {
        // update `sum_so_far`
        sum_so_far += nums[i];

        // if `sum_so_far - target` is seen before, we have found
        // the subarray with sum equal to `target`
        if (map.has(sum_so_far - target)) {
            console.log(`Subarray found [${map.get(sum_so_far - target)! + 1}–${i}]`);
            return;
        }

        // insert (current sum, current index) pair into the map
        map.set(sum_so_far, i);
    }
};

// an integer array
const nums = [0, 5, -7, 1, -4, 7, 6, 1, 4, 1, 10];
const target = 15;
findSubarray(nums, target);
```

**Output:** Subarray found [3–8]
