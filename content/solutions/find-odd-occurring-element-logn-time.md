# Find the odd occurring element in an array in logarithmic time

> Source: https://www.techiedelight.com/find-odd-occurring-element-logn-time/

Given an integer array where every element appears an even number of times, except one element which appears an odd number of times. If the identical elements appear in pairs in the array and there cannot be more than two consecutive occurrences of an element, find the odd occurring element in logarithmic time and constant space.

For instance, both these arrays are invalid – `{1, 2, 1}` and `{1, 1, 2, 2, 2, 3, 3}`. The first one doesn’t have identical elements appear in pairs, and the second one contains three consecutive instances of an element. On the other hand, the array `{2, 2, 3, 3, 2, 2, 4, 4, 3, 1, 1}` is valid, and the odd occurring element present in it is 3.

> 

A naive solution is to [sort the array](https://techiedelight.com/sort-array-ascending-order-cpp/) and count each element’s occurrence by traversing the sorted array. We return the element with the odd count. The time complexity of this solution is O(n.log(n)), where `n` is the size of the input.

The above approach is demonstrated below in TypeScript:

```ts
// Function to find an odd occurring element in a given array
const findOddOccuring = (nums: number[]): number => {

    // sort the array
    nums.sort((a, b) => a - b);

    // traverse the array from the beginning
    let i = 0;
    while (i < nums.length) {

        // store the current element
        const curr = nums[i];

        // find the count of the current element
        let count = 0;
        while (i < nums.length && nums[i] === curr) {
            count = count + 1;
            i = i + 1;
        }

        // if the count of the current element is odd, return it
        if (count % 2 === 1) {
            return curr;
        }
    }

    // invalid input
    return -1;
};

const nums = [2, 2, 1, 1, 3, 3, 2, 2, 4, 4, 3, 1, 1];
console.log(`The odd occurring element is ${findOddOccuring(nums)}`);
```

**Output:** The odd occurring element is 3

We can solve this problem in linear time [using the XOR operator](https://techiedelight.com/find-odd-occurring-element-array-single-traversal/). The idea is to take XOR of all array elements. The even occurring elements will cancel each other, and only the odd occurring elements are left. This approach is demonstrated below in TypeScript:

```ts
// Function to find an odd occurring element in a given array
const findOddOccuring = (nums: number[]): number => {
    let xor = 0;
    for (const i of nums) {
        xor = xor ^ i;
    }

    return xor;
};

const nums = [2, 2, 1, 1, 3, 3, 2, 2, 4, 4, 3, 1, 1];

console.log(`The odd occurring element is ${findOddOccuring(nums)}`);
```

**Output:** The odd occurring element is 3

We can even solve this problem in O(log(n)) time.

As per problem constraints, identical elements appear in pairs in the array, and there cannot be more than two consecutive occurrences of any element. So, there must be a single occurrence of the odd element somewhere in the array. We can find this odd occurrence using the [binary search algorithm](https://techiedelight.com/binary-search/).

Consider the following array with their positions:

```
nums[] = { 2, 2, 1, 1, 3, 3, 2, 2, 4, 4, 3, 1, 1 }
pos[] = { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 }
```

If we carefully observe, each pair of the element before the odd occurring element has the first occurrence at an even index and the second occurrence at an odd index. And, each pair of the element after the odd occurrence has the first occurrence at the odd index and the second occurrence at the even index.

We can use the above observation to determine which side of the mid-index the odd occurring element lies. Now, two cases arise:

  1. The mid-index is odd: If the element before the mid-index is the same as the middle element, the odd element lies on the right side; otherwise, it lies on the left side.
  2. The mid-index is even: If the element next to the mid-index is the same as the middle element, the odd element lies on the right side; otherwise, it lies on the left side.

The algorithm can be implemented as follows in TypeScript:

```ts
// Recursive function to find an odd occurring element in an array
// using binary search. This function assumes the input is valid.
const findOddOccuring = (nums: number[], low: number, high: number): number => {

    // base case
    if (low === high) {
        return low;
    }

    // find the middle index
    const mid = (low + high) / 2;

    // if `mid` is odd
    if (mid & 1) {
        // if the element before `mid` is the same as the middle element, the odd
        // element lies on the right side; otherwise, it lies on the left side
        if (nums[mid] === nums[mid - 1]) {
            return findOddOccuring(nums, mid + 1, high);
        }
        else {
            return findOddOccuring(nums, low, mid - 1);
        }
    }

    // `mid` is even
    else {
        // if the element next to `mid` is the same as the middle element, the odd
        // element lies on the right side; otherwise, it lies on the left side
        if (nums[mid] === nums[mid + 1]) {
            return findOddOccuring(nums, mid + 2, high);
        }
        else {
            return findOddOccuring(nums, low, mid);
        }
    }
};

const nums = [2, 2, 1, 1, 3, 3, 2, 2, 4, 4, 3, 1, 1];

const index = findOddOccuring(nums, 0, nums.length - 1);
console.log(`The odd occurring element is ${nums[index]}`);
```

**Output:** The odd occurring element is 3
