# Find subarrays with a given sum in an array

> Source: https://www.techiedelight.com/find-subarrays-given-sum-array/

[Array](https://www.techiedelight.com/Category/Array/)

Given an integer array, find subarrays with a given sum in it.

For example,

**Input:** nums[] = { 3, 4, -7, 1, 3, 3, 1, -4 } target = 7 **Output:** Subarrays with the given sum are { 3, 4 } { 3, 4, -7, 1, 3, 3 } { 1, 3, 3 } { 3, 3, 1 }

> 

Please note that the problem specifically targets [subarrays](https://techiedelight.com/difference-between-subarray-subsequence-subset/#subarray) that are contiguous (i.e., occupy consecutive positions) and inherently maintains the order of elements.

## 1\. Brute-Force Solution

A simple solution is to consider all subarrays and calculate the sum of their elements. If the sum of the subarray is equal to the given sum, print it. This approach is demonstrated below in TypeScript:

```ts
// Function to find sublists with the given sum in a list
const findSublists = (nums: number[], target: number): void => {
    for (let i = 0; i < nums.length; i++) {
        let sum_so_far = 0;
        // consider all sublists starting from `i` and ending at `j`
        for (let j = i; j < nums.length; j++) {
            // sum of elements so far
            sum_so_far += nums[j];
            // if the sum so far is equal to the given sum
            if (sum_so_far === target) {
                // print sublist `nums[i, j]`
                console.log(nums.slice(i, j + 1));
            }
        }
    }
};

const nums = [3, 4, -7, 1, 3, 3, 1, -4];
const target = 7;
findSublists(nums, target);
```

**Output:** [0…1] —— { 3 4 } [0…5] —— { 3 4 -7 1 3 3 } [3…5] —— { 1 3 3 } [4…6] —— { 3 3 1 }

This approach takes O(n3) time as the subarray sum is calculated in O(1) time for each of `n2` subarrays of an array of size `n`, and it takes O(n) time to print a subarray.

## 2\. Hashing

We can also use [hashing](https://techiedelight.com/hashing-in-data-structure/) to find subarrays with the given sum in an array by using a map of lists or a [multimap](https://techiedelight.com/implement-multimap-java/) for storing the end index of all subarrays having a given sum. The idea is to traverse the given array and maintain the sum of elements seen so far. At any index, `i`, let `k` be the difference between the sum of elements seen so far and the given sum. If key `k` is present on the map, at least one subarray has the given sum ending at the current index `i`, and we print all such subarrays.

Following is the implementation of the above algorithm in TypeScript:

```ts
// Function to find sublists with the given sum in a list
const printallSublists = (nums: number[], target: number): void => {
    // create a dictionary for storing the end index of all sublists with
    // the sum of elements so far
    const d = new Map<number, number[]>();

    // To handle the case when the sublist with the given sum starts
    // from the 0th index
    d.set(0, [-1]);

    let sum_so_far = 0;

    // traverse the given list
    for (let index = 0; index < nums.length; index++) {
        // sum of elements so far
        sum_so_far += nums[index];

        // check if there exists at least one sublist with the given sum
        if (d.has(sum_so_far - target)) {
            for (const value of d.get(sum_so_far - target)!) {
                console.log(nums.slice(value + 1, index + 1));
            }
        }

        // insert (sum so far, current index) pair into the dictionary
        if (!d.has(sum_so_far)) {
            d.set(sum_so_far, []);
        }
        d.get(sum_so_far)!.push(index);
    }
};

const nums = [3, 4, -7, 1, 3, 3, 1, -4];
const target = 7;
printallSublists(nums, target);
```

**Output:** [0…1] —— { 3 4 } [0…5] —— { 3 4 -7 1 3 3 } [3…5] —— { 1 3 3 } [4…6] —— { 3 3 1 }

The time complexity of the above solution is O(n2) and requires O(n) extra space, where `n` is the size of the input.
