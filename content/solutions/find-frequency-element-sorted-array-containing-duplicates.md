# Find the frequency of each element in a sorted array containing duplicates

> Source: https://www.techiedelight.com/find-frequency-element-sorted-array-containing-duplicates/

Given a sorted array containing duplicates, efficiently find each element’s frequency without traversing the whole array.

For example,

**Input:** [2, 2, 2, 4, 4, 4, 5, 5, 6, 8, 8, 9] Output: {2: 3, 4: 3, 5: 2, 6: 1, 8: 2, 9: 1} **Explanation:** 2 and 4 occurs thrice 5 and 8 occurs twice 6 and 9 occurs once

> 

A simple solution would be to run a linear search on the array and count the number of occurrences of each element and finally print them. The problem with this approach is that its worst-case time complexity is O(n), where `n` is the input size, and we are scanning the whole array (violating problem constraints).

We can easily solve this problem in O(m.log(n)) time by taking advantage of the fact that the input is sorted and contains duplicates. Here `m` is the total number of distinct elements in the array, and `n` is the input size.

## 1\. Recursive Implementation

The idea is to split the array into two halves and with [recur](https://techiedelight.com/recursion-practice-problems-with-solutions/) for both halves. The base condition checks if the last element of the subarray is the same as its first element. If both are equal, then that implies that all subarray items are similar (since the array is sorted), and we update the element count by the total number of elements in the subarray (in constant time).

The algorithm can be implemented as follows in TypeScript:

```ts
// Function to find the frequency of each element in a sorted array
function findFrequency(nums: number[], left: number, right: number, freq: Map<number, number>): void {

    if (left > right) {
        return;
    }

    // if every element in subarray nums[left…right] is equal,
    // then increment the element's count by `n`
    if (nums[left] === nums[right]) {

        const count = freq.get(nums[left]) || 0;

        freq.set(nums[left], count + (right - left + 1));
        return;
    }

    const mid = (left + right) / 2 | 0;

    // divide the array into left and right subarray and recur
    findFrequency(nums, left, mid, freq);
    findFrequency(nums, mid + 1, right, freq);
}

const nums = [2, 2, 2, 4, 4, 4, 5, 5, 6, 8, 8, 9];

// find the frequency of each element in the array and store it in a map
const freq = new Map<number, number>();
findFrequency(nums, 0, nums.length - 1, freq);
console.log(freq);
```

**Output:** 9 occurs 1 times 8 occurs 2 times 2 occurs 3 times 4 occurs 3 times 5 occurs 2 times 6 occurs 1 times

## 2\. Iterative Implementation

Following is the iterative implementation of the algorithm in TypeScript. The implementation updates the frequency of each distinct array element one at a time and grow/shrink the collection dynamically to consider each item.

```ts
// Function to find the frequency of each element in a sorted array
function findFrequency(nums: number[]): Map<number, number> {

    // map to store the frequency of each element in the array
    const freq = new Map<number, number>();

    // search space is nums[left…right]
    let left = 0;
    let right = nums.length - 1;

    // loop till the search space is exhausted
    while (left <= right) {

        // if nums[left…right] consists of only one element, update its count
        if (nums[left] === nums[right]) {
            freq.set(nums[left], (freq.get(nums[left]) || 0) + (right - left + 1));

            // now discard nums[left…right] and continue searching in
            // nums[right+1… n-1] for nums[left]
            left = right + 1;
            right = nums.length - 1;
        }
        else {
            // reduce the search space
            right = (left + right) / 2 | 0;
        }
    }

    return freq;
}

const nums = [2, 2, 2, 4, 4, 4, 5, 5, 6, 8, 8, 9];
console.log(findFrequency(nums));
```

**Output:**

## 3\. STL’s Implementation

We can easily solve this problem using [binary search algorithm](https://techiedelight.com/binary-search/) as well. The idea is to find the index of the first and last occurrence of every distinct number in the array and update the difference between two indices in a map. In the following solution, we use binary search helpers to find the first and last occurrence of each element.

```ts
// binary search helpers to find the first and last occurrence of a value
function lowerBound(nums: number[], x: number): number {
    let low = 0, high = nums.length - 1, result = nums.length;
    while (low <= high) {
        const mid = (low + high) / 2 | 0;
        if (nums[mid] >= x) {
            result = mid;
            high = mid - 1;
        }
        else {
            low = mid + 1;
        }
    }
    return result;
}

function upperBound(nums: number[], x: number): number {
    let low = 0, high = nums.length - 1, result = nums.length;
    while (low <= high) {
        const mid = (low + high) / 2 | 0;
        if (nums[mid] > x) {
            result = mid;
            high = mid - 1;
        }
        else {
            low = mid + 1;
        }
    }
    return result;
}

// Function to find the frequency of each element in a sorted array
function findFrequency(nums: number[]): Map<number, number> {

    // map to store the frequency of each array element
    const freq = new Map<number, number>();

    // do for every distinct array element
    let it = 0;
    while (it < nums.length)
    {
        const val = nums[it];

        // find the first occurrence
        const low = lowerBound(nums, val);

        // find the last occurrence
        const high = upperBound(nums, val);

        // update the difference in the map
        freq.set(val, high - low);

        // it is important to move to the next element in the array
        // (not the immediate next)
        it = it + (freq.get(val) as number);
    }

    // return the map
    return freq;
}

const nums = [2, 2, 2, 4, 4, 4, 5, 5, 6, 8, 8, 9];

const freq = findFrequency(nums);

for (const [key, value] of freq) {
    console.log(`${key} occurs ${value} times`);
}
```

**Output:** 9 occurs 1 times 8 occurs 2 times 2 occurs 3 times 4 occurs 3 times 5 occurs 2 times 6 occurs 1 times
