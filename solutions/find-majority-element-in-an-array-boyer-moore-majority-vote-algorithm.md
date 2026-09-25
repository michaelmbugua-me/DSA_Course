# Find majority element (Boyer–Moore Majority Vote Algorithm)

> Source: https://www.techiedelight.com/find-majority-element-in-an-array-boyer-moore-majority-vote-algorithm/

[Array](https://www.techiedelight.com/Category/Array/)

Given an integer array containing duplicates, return the majority element if present. A majority element appears more than `n/2` times, where `n` is the array size.

For example, the majority element is 2 in array `{2, 8, 7, 2, 2, 5, 2, 3, 1, 2, 2}`.

> 

## 1\. Brute-Force Solution

A naive solution is to count each element’s frequency in the first half of the array to check if it is the majority element. Following is a TypeScript implementation of the idea:

```ts
function findMajorityElementNaive(nums: number[]): number {
    const n = nums.length;
    // check whether `nums[i]` is a majority element or not
    for (let i = 0; n && i <= n / 2; i++) {
        let count = 1;
        for (let j = i + 1; j < n; j++) {
            if (nums[j] === nums[i]) {
                count++;
            }
        }

        if (count > n / 2) {
            return nums[i];
        }
    }

    return -1;
}
```

The time complexity of the above solution is O(n2), where `n` is the size of the input.

We can improve worst-case time complexity to O(n.log(n)) by [sorting the array](https://techiedelight.com/quicksort/) and then perform a [binary search](https://techiedelight.com/binary-search/) for each element’s first and last occurrence. If the difference between first and last occurrence is more than `n/2`, the The majority element is found.

## 2\. Linear-time Solution

We can use [hashing](https://techiedelight.com/hashing-in-data-structure/) to solve this problem in linear time. The idea is to store each element’s frequency in a map and return it if its frequency becomes more than `n/2`. If no such element is present, then the The majority element doesn’t exist in the array, and return `-1`.

Following is a TypeScript implementation based on the above idea:

```ts
// Function to find the majority element present in a given list
function findMajorityElement(nums: number[]): number {

    // create an empty `HashMap`
    const d = new Map<number, number>();

    // store each element's frequency in a dictionary
    for (const i of nums) {
        d.set(i, (d.get(i) || 0) + 1);
    }

    // return the element if its count is more than `n/2`
    for (const [key, value] of d) {
        if (value > nums.length / 2) {
            return key;
        }
    }

    // no majority element is present
    return -1;
}

// assumption: valid input (majority element is present)
const nums = [1, 8, 7, 4, 1, 2, 2, 2, 2, 2, 2];

const result = findMajorityElement(nums);
if (result !== -1) {
    console.log('The majority element is', result);
}
else {
    console.log(`The majority element doesn't exist`);
}
```

The time complexity of the above solution is O(n) and requires O(n) extra space.

## 3\. Boyer–Moore majority vote algorithm

We can find the majority element using linear time and constant space using the Boyer–Moore majority vote algorithm. The algorithm can be expressed in pseudocode as the following steps:

Initialize an element m and a counter i = 0 for each element x of the input sequence: if i = 0, then assign m = x and i = 1 else if m = x, then assign i = i + 1 else assign i = i – 1 return m

The algorithm processes each element of the sequence, one at a time. When processing an element `x`,

  1. If the counter is 0, set the current candidate to `x`, and set the counter to 1.
  2. If the counter is non-zero, increment or decrement it according to whether `x` is a current candidate.

At the end of this process, if the sequence has a majority, it will be the element stored by the algorithm. If there is no majority element, the algorithm will not detect that fact and may output the wrong element. In other words, the **Boyer–Moore majority vote algorithm produces correct results only when the majority element is present in the input.**

The algorithm can be implemented as follows in TypeScript. It is recommended to modify the algorithm to verify if the returned element is, in fact, a majority element or not.

```ts
// Function to find the majority element present in a given list
function findMajorityElement(nums: number[]): number {

    // `m` stores the majority element (if present)
    let m = -1;

    // initialize counter `i` with 0
    let i = 0;

    // do for each element `nums[j]` in the list
    for (let j = 0; j < nums.length; j++) {

        // if counter `i` becomes 0
        if (i === 0) {

            // set the current candidate to `nums[j]`
            m = nums[j];

            // reset the counter to 1
            i = 1;
        }

        // otherwise, increment the counter if `nums[j]` is a current candidate
        else if (m === nums[j]) {
            i = i + 1;
        }

        // otherwise, decrement the counter if `nums[j]` is a current candidate
        else {
            i = i - 1;
        }
    }

    return m;
}

// assumption: valid input (majority element is present)
const nums = [1, 8, 7, 4, 1, 2, 2, 2, 2, 2, 2];

console.log('The majority element is', findMajorityElement(nums));
```

**Output:** The majority element is 2

**References:** [Boyer–Moore majority vote algorithm – Wikipedia](https://en.wikipedia.org/wiki/Boyer%E2%80%93Moore_majority_vote_algorithm)
