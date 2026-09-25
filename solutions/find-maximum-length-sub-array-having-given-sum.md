# Find maximum length subarray having a given sum

> Source: https://www.techiedelight.com/find-maximum-length-sub-array-having-given-sum/

[Array](https://www.techiedelight.com/Category/Array/)

Given an integer array, find the maximum length subarray having a given sum.

For example, consider the following array:

nums[] = { 5, 6, -5, 5, 3, 5, 3, -2, 0 } target = 8 Subarrays with sum 8 are { -5, 5, 3, 5 } { 3, 5 } { 5, 3 } The longest subarray is { -5, 5, 3, 5 } having length 4

> 

The problem differs from the problem of finding the maximum length subsequence with given sum. Unlike subsequences, [subarrays](https://techiedelight.com/difference-between-subarray-subsequence-subset/#subarray) are required to occupy consecutive positions within the original array.

A naive solution is to consider all subarrays and find their sum. If the subarray sum is equal to the given sum, update the maximum length subarray. The time complexity of the naive solution is O(n3) as there are `n2` subarrays in an array of size `n`, and it takes O(n) time to find the sum of its elements. We can optimize the method to run in O(n2) time by calculating the subarray sum in constant time.

Following is a TypeScript implementation based on the above idea:

```ts
// Naive function to find the maximum length subarray with sum `S` present
// in a given array
function findMaxLenSubarray(nums: number[], S: number): void {

    // `len` stores the maximum length of subarray with sum `S`
    let len = 0;

    // stores ending index of the maximum length subarray having sum `S`
    let ending_index = -1;

    // consider all subarrays starting from i
    for (let i = 0; i < nums.length; i++) {

        let target = 0;

        // consider all subarrays ending at `j`
        for (let j = i; j < nums.length; j++) {

            // target of elements in the current subarray
            target += nums[j];

            // if we have found a subarray with sum `S`
            if (target === S) {
                // update length and ending index of maximum length subarray
                if (len < j - i + 1) {
                    len = j - i + 1;
                    ending_index = j;
                }
            }
        }
    }

    // print the subarray
    console.log(`[${ending_index - len + 1}, ${ending_index}]`);
}

const nums = [5, 6, -5, 5, 3, 5, 3, -2, 0];
const target = 8;

findMaxLenSubarray(nums, target);
```

**Output:** [2, 5]

We can use a map to solve this problem in linear time. The idea is to create an empty map to store the first subarray’s ending index, having a given sum. We traverse the given array and maintain the sum of elements seen so far.

  * If the `target` is seen for the first time, insert the sum with its index into the map.
  * If `target-S` is seen before, there is a subarray with the given sum that ends at the current index, and we update the maximum length subarray having sum `S` if the current subarray has more length.

The algorithm can be implemented as follows in TypeScript:

```ts
// Function to find the maximum length subarray with sum `S` present
// in a given array
function findMaxLenSubarray(nums: number[], S: number): void {

    // create an empty map to store the ending index of the first subarray
    // having some sum
    const map = new Map<number, number>();

    // insert (0, -1) pair into the set to handle the case when a
    // subarray with sum `S` starts from index 0
    map.set(0, -1);

    let target = 0;

    // `len` stores the maximum length of subarray with sum `S`
    let len = 0;

    // stores ending index of the maximum length subarray having sum `S`
    let ending_index = -1;

    // traverse the given array
    for (let i = 0; i < nums.length; i++) {

        // sum of elements so far
        target += nums[i];

        // if the sum is seen for the first time, insert the sum with its
        // into the map
        if (!map.has(target)) {
            map.set(target, i);
        }

        // update length and ending index of the maximum length subarray
        // having sum `S`
        const firstIndex = map.get(target - S);
        if (firstIndex !== undefined && len < i - firstIndex) {
            len = i - firstIndex;
            ending_index = i;
        }
    }

    // print the subarray
    console.log(`[${ending_index - len + 1}, ${ending_index}]`);
}

const nums = [5, 6, -5, 5, 3, 5, 3, -2, 0];
const target = 8;

findMaxLenSubarray(nums, target);
```

**Output:** [2, 5]

The time complexity of the above solution O(n) and requires O(n) extra space, where `n` is the size of the input.
