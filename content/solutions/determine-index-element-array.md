# Determine the index of an element that satisfies given constraints in an array

> Source: https://www.techiedelight.com/determine-index-element-array/

[Array](https://www.techiedelight.com/Category/Array/)

Given an integer array, determine the index of an element before which all elements are smaller and after which all are greater.

For example,

**Input:** nums[] = {4, 2, 3, 5, 1, **6** , 9, 7} **Output:** Index 5 All elements before index 5 are smaller, and all elements after index 5 are greater.

> 

A naive solution would be to traverse the array and find an index with all smaller elements to its left and all greater elements to its right. The time complexity of this solution is O(n2) for an input containing `n` elements since, for each array element, we end up traversing the whole array again.

We can easily solve this problem in linear time using some extra space. The idea is to create two auxiliary arrays where each index of the first array stores the maximum element to the left, and that of the second array stores the minimum element to the right. We find an index whose value is greater than the maximum value to its left but smaller than the minimum value to its right after filling up both arrays.

```ts
// Determine the index of an element in an array before which all elements
// are smaller and after which all are greater
function findIndex(nums: number[]): number {
  // get the length of the array
  const n = nums.length;

  // base case
  if (n <= 2) {
    return -1;
  }

  // `left[i]` stores the maximum element in subarray `nums[0…i-1]`
  const left: number[] = new Array(n);

  // initialize `left[0]` to the minimum value
  left[0] = Number.MIN_SAFE_INTEGER;

  // traverse the array from left to right and fill `left[]`
  for (let i = 1; i < n; i++) {
    left[i] = Math.max(left[i - 1], nums[i - 1]);
  }

  // `right[i]` stores the minimum element in subarray `nums[i+1, n-1]`
  const right: number[] = new Array(n);

  // initialize `right[0]` to the maximum value
  right[n - 1] = Number.MAX_SAFE_INTEGER;

  // traverse the array from right to left and fill `right[]`
  for (let i = n - 2; i >= 0; i--) {
    right[i] = Math.min(right[i + 1], nums[i + 1]);
  }

  // traverse the array and return the desired index
  for (let i = 1; i < n - 1; i++) {
    // index found
    if (left[i] < nums[i] && nums[i] < right[i]) {
      return i;
    }
  }

  // return negative index if the input is invalid
  return -1;
}

const nums = [4, 2, 3, 5, 1, 6, 9, 7];

const index = findIndex(nums);

if (index >= 0 && index < nums.length) {
  console.log(`The required index is ${index}`);
} else {
  console.log("Invalid Input");
}
```

**Output:** The required index is 5

The above solution performs three traversals of the input array and uses two auxiliary arrays. We can optimize the code to solve this problem with just two traversals of the array and one auxiliary array.

The idea is to keep track of the minimum element found so far while traversing the array from right to left and then use it to find the required index. This approach is demonstrated below in TypeScript:

```ts
// Determine the index of an element in an array before which all elements
// are smaller and after which all are greater
function findIndex(nums: number[]): number {
  // base case
  if (nums.length <= 2) {
    return -1;
  }

  // `left[i]` stores the max element in subarray `nums[0…i-1]`
  const left: number[] = new Array(nums.length);

  // initialize `left[0]` to minimum value
  left[0] = Number.MIN_SAFE_INTEGER;

  // traverse the array from left to right and fill `left[]`
  for (let i = 1; i < nums.length; i++) {
    left[i] = Math.max(left[i - 1], nums[i - 1]);
  }

  // stores minimum element found so far to the right
  let min_so_far = nums[nums.length - 1];

  // return negative index if the input is invalid
  let index = -1;

  // traverse the array from right to left
  for (let i = nums.length - 2; i > 0; i--) {
    // the desired index is found
    if (left[i] < nums[i] && nums[i] < min_so_far) {
      index = i;
    }

    // update the minimum element so far if required
    if (min_so_far > nums[i]) {
      min_so_far = nums[i];
    }
  }

  return index;
}

const nums = [4, 2, 3, 5, 1, 6, 9, 7];

const index = findIndex(nums);

if (index >= 0 && index < nums.length) {
  console.log(`The required index is ${index}`);
} else {
  console.log("Invalid Input");
}
```

**Output:** The required index is 5
