# Find the first or last occurrence of a given number in a sorted array

> Source: https://www.techiedelight.com/find-first-or-last-occurrence-of-a-given-number-sorted-array/

Given a sorted integer array, find the index of a given number’s first or last occurrence. If the element is not present in the array, report that as well.

For example,

**Input:** nums = [2, 5, 5, 5, 6, 6, 8, 9, 9, 9] target = 5 **Output:** The first occurrence of element 5 is located at index 1 The last occurrence of element 5 is located at index 3 **Input:** nums = [2, 5, 5, 5, 6, 6, 8, 9, 9, 9] target = 4 **Output:** Element not found in the array

> 

A simple solution would be to run a linear search on the array and return the given element’s first or last occurrence. The problem with this approach is that its worst-case time complexity is O(n), where `n` is the size of the input. This solution also does not take advantage of the fact that the input is sorted. We can easily solve this problem in O(log(n)) time by modifying the [binary search algorithm](https://techiedelight.com/binary-search/).

## Finding first occurrence of the element

The standard binary search terminates as soon as any occurrence of the given target element is found. To find the given element’s first occurrence, modify the binary search to continue searching even on finding the target element. Instead, update the result to `mid` and search towards the left (towards lower indices), i.e., modify our search space by adjusting high to `mid-1` on finding the target at mid-index.

Following is a TypeScript program that demonstrates it:

```ts
// Function to find the first occurrence of a given number
// in a sorted integer array
function findFirstOccurrence(nums: number[], target: number): number {

    // search space is nums[left…right]
    let left = 0;
    let right = nums.length - 1;

    // initialize the result by -1
    let result = -1;

    // loop till the search space is exhausted
    while (left <= right) {

        // find the mid-value in the search space and compares it with the target
        const mid = (left + right) / 2 | 0;

        // if the target is located, update the result and
        // search towards the left (lower indices)
        if (target === nums[mid]) {
            result = mid;
            right = mid - 1;
        }

        // if the target is less than the middle element, discard the right half
        else if (target < nums[mid]) {
            right = mid - 1;
        }

        // if the target is more than the middle element, discard the left half
        else {
            left = mid + 1;
        }
    }

    // return the leftmost index, or -1 if the element is not found
    return result;
}

const nums = [2, 5, 5, 5, 6, 6, 8, 9, 9, 9];
const target = 5;

const index = findFirstOccurrence(nums, target);

if (index !== -1) {
    console.log(`The first occurrence of element ${target} is located at index ${index}`);
}
else {
    console.log('Element not found in the array');
}
```

**Output:** The first occurrence of element 5 is located at index 1

## Finding last occurrence of the element

To find the element’s last occurrence, modify the standard binary search to continue searching even on finding the target. Instead, update the result to `mid` and go on searching towards the right (towards higher indices), i.e., modify our search space by adjusting low to `mid+1` on finding the target at mid-index.

Following is a TypeScript implementation based on the above idea:

```ts
// Function to find the last occurrence of a given number
// in a sorted integer array
function findLastOccurrence(nums: number[], target: number): number {

    // search space is nums[left…right]
    let left = 0;
    let right = nums.length - 1;

    // initialize the result by -1
    let result = -1;

    // loop till the search space is exhausted
    while (left <= right) {

        // find the mid-value in the search space and compares it with the target
        const mid = (left + right) / 2 | 0;

        // if the target is located, update the result and
        // search towards the right (higher indices)
        if (target === nums[mid]) {
            result = mid;
            left = mid + 1;
        }

        // if the target is less than the middle element, discard the right half
        else if (target < nums[mid]) {
            right = mid - 1;
        }

        // if the target is more than the middle element, discard the left half
        else {
            left = mid + 1;
        }
    }

    // return the leftmost index, or -1 if the element is not found
    return result;
}

const nums = [2, 5, 5, 5, 6, 6, 8, 9, 9, 9];
const target = 5;

const index = findLastOccurrence(nums, target);

if (index !== -1) {
    console.log(`The last occurrence of element ${target} is located at index ${index}`);
}
else {
    console.log('Element not found in the array');
}
```

**Output:** The last occurrence of element 5 is located at index 3

The time complexity of the above solutions is O(log(n)) and doesn’t require any extra space.

**Exercise:**

1\. Write a recursive version of the above solutions.

2\. Check if the given integer appears more than `n/2` times in a sorted array.
