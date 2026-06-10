# Print all subarrays with 0 sum

> Source: https://www.techiedelight.com/find-sub-array-with-0-sum/

[Array](https://www.techiedelight.com/Category/Array/)

Given an integer array, print all subarrays with zero-sum.

For example,

**Input:** { 4, 2, -3, -1, 0, 4 } Subarrays with zero-sum are { -3, -1, 0, 4 } { 0 } **Input:** { 3, 4, -7, 3, 1, 3, 1, -4, -2, -2 } Subarrays with zero-sum are { 3, 4, -7 } { 4, -7, 3 } { -7, 3, 1, 3 } { 3, 1, -4 } { 3, 1, 3, 1, -4, -2, -2 } { 3, 4, -7, 3, 1, 3, 1, -4, -2, -2 }

Note that the problem deals with [subarrays](https://techiedelight.com/difference-between-subarray-subsequence-subset/#subarray) that are contiguous, i.e., whose elements occupy consecutive positions in the array.

> 

## Approach 1: Using Brute-Force

A naive solution is to consider all subarrays and find their sum. If the subarray sum is equal to 0, print it. The time complexity of the naive solution is O(n3) as there are `n2` subarrays in an array of size `n`, and it takes O(n) time to find the sum of its elements. We can optimize the method to run in O(n2) time by calculating the subarray sum in constant time.

Following is a TypeScript implementation of the idea:

```ts
// Function to print all sublists with a zero-sum present in a given list
const printAllSublists = (nums: number[]): void => {
    // consider all sublists starting from `i`
    for (let i = 0; i < nums.length; i++) {
        let total = 0;
        // consider all sublists ending at `j`
        for (let j = i; j < nums.length; j++) {
            // sum of elements so far
            total += nums[j];
            // if the sum is seen before, we have found a sublist with zero-sum
            if (total === 0) {
                console.log(`Sublist (${i}, ${j})`);
            }
        }
    }
};

const nums = [3, 4, -7, 3, 1, 3, 1, -4, -2, -2];
printAllSublists(nums);
```

## Approach 2: Using multimap to print all subarrays

We can use [multimap](https://techiedelight.com/implement-multimap-java/) to print all subarrays with a zero-sum present in the given array. The idea is to create an empty multimap to store all subarrays’ ending index having a given sum. Traverse the array and maintain the sum of elements seen so far. If the sum is seen before, at least one subarray has zero-sum, which ends at the current index. Finally, print all such subarrays.

The algorithm can be implemented as follows in TypeScript:

```ts
// Utility function to insert <key, value> into the map
// (if the key is seen for the first time, initialize the list)
const insert = (map: Map<number, number[]>, key: number, value: number): void => {
    if (!map.has(key)) {
        map.set(key, []);
    }
    map.get(key)!.push(value);
};

// Function to print all sublists with a zero-sum present in a given list
const printallSublists = (nums: number[]): void => {
    // create an empty dictionary to store the ending index of all
    // sublists having the same sum
    const d = new Map<number, number[]>();

    // insert (0, -1) pair into the dictionary to handle the case when
    // sublist with zero-sum starts from index 0
    insert(d, 0, -1);

    let total = 0;

    // traverse the given list
    for (let i = 0; i < nums.length; i++) {
        // sum of elements so far
        total += nums[i];

        // if the sum is seen before, there exists at least one
        // sublist with zero-sum
        if (d.has(total)) {
            // find all sublists with the same sum
            for (const value of d.get(total)!) {
                console.log(`Sublist is (${value + 1}, ${i})`);
            }
        }

        // insert (sum so far, current index) pair into the dictionary
        insert(d, total, i);
    }
};

const nums = [3, 4, -7, 3, 1, 3, 1, -4, -2, -2];
printallSublists(nums);
```

**Exercise:** [Extend the solution for a non-zero sum of the subarray](https://techiedelight.com/find-subarrays-given-sum-array/)

**Related Post:**

> [Check if a subarray with 0 sum exists or not](https://techiedelight.com/check-subarray-with-0-sum-exists-not/)
