# Problems solved using partitioning logic of Quicksort

> Source: https://www.techiedelight.com/problems-solved-using-partitioning-logic-quicksort/

This post will discuss a few problems that can be easily solved in linear time and constant space by modifying the [partitioning logic of the Quicksort algorithm](https://techiedelight.com/quicksort/).

## Problem #1

Given a binary array, sort it in linear time and constant space. The output should print all zeros, followed by all ones.

For example,

**Input:** { 1, 0, 1, 0, 1, 0, 0, 1 } **Output:** { 0, 0, 0, 0, 1, 1, 1, 1 }

The idea is to use 1 as a pivot element and make one pass of the partition process. The resultant array will be sorted. The following TypeScript program demonstrates it:

```ts
// Function to sort a binary array in linear time
function partition(nums: number[]): void {
    const pivot = 1;
    let j = 0;

    // each time we encounter a 0, `j` is incremented, and
    // 0 is placed before the pivot
    for (let i = 0; i < nums.length; i++)
    {
        if (nums[i] < pivot)
        {
            [nums[i], nums[j]] = [nums[j], nums[i]];
            j++;
        }
    }
}

const nums = [1, 0, 0, 0, 1, 0, 1, 1];

partition(nums);

// print the rearranged array
for (const i of nums) {
    console.log(i + " ");
}
```

**Output:** 0 0 0 0 1 1 1 1

## Problem #2

Given an array of positive and negative integers, segregate them in linear time and constant space. The output should print all negative numbers, followed by all positive numbers.

For example,

**Input:**[9, -3, 5, -2, -8, -6, 1, 3] **Output:** [-3, -2, -8, -6, 5, 9, 1, 3 ]

The idea is to use 0 as a pivot element and make one pass of the partition process. The resultant array will satisfy the given constraints. This approach is demonstrated below in TypeScript:

```ts
function partition(nums: number[], start: number, end: number): void {
    let pIndex = start;

    // each time we find a negative number, `pIndex` is incremented,
    // and that element would be placed before the pivot
    for (let i = start; i <= end; i++)
    {
        if (nums[i] < 0)    // pivot is 0
        {
            [nums[i], nums[pIndex]] = [nums[pIndex], nums[i]];
            pIndex++;
        }
    }
}

const nums = [9, -3, 5, -2, -8, -6, 1, 3];
const n = nums.length;

partition(nums, 0, n - 1);

// print the rearranged array
for (const i of nums) {
    console.log(i + " ");
}
```

3

**Output:** -3 -2 -8 -6 5 9 1 3

## Problem #3

Given an integer array, rearrange it such that it contains positive and negative numbers at alternate positions. If the array contains more positive or negative elements, move them to the end of the array.

For example,

**Input:**{ 9, -3, 5, -2, -8, -6, 1, 3 } **Output:** { 5, -2, 9, -6, 1, -8, 3, -3 }

The idea is to use 0 as a pivot element and make one pass of the partition process. The resultant array will contain all positive integers to the end of the array and all negative integers at the beginning. Then swap alternate negative elements from the next available positive element until the end of the array is reached, or all negative or positive integers are exhausted.

Following is a TypeScript implementation of the idea:

```ts
// Partitioning routine of Quicksort
function partition(nums: number[]): number {
    let j = 0;
    const pivot = 0;    // consider 0 as a pivot

    // each time we find a negative number, `j` is incremented,
    // and a negative element would be placed before the pivot
    for (let i = 0; i < nums.length; i++)
    {
        if (nums[i] < pivot)
        {
            [nums[i], nums[j]] = [nums[j], nums[i]];
            j++;
        }
    }

    // `j` holds the index of the first positive element
    return j;
}

// Function to rearrange given array such that it contains positive
// and negative numbers at alternate positions
function rearrange(nums: number[]): void {
    // partition given array such that all positive elements move
    // to the end of the array
    let p = partition(nums);

    // swap alternate negative elements from the next available positive
    // element till the end of the array is reached, or all negative or
    // positive elements are exhausted.
    for (let n = 0; p < nums.length && n < p; p++, n += 2) {
        [nums[n], nums[p]] = [nums[p], nums[n]];
    }
}

const nums = [9, -3, 5, -2, -8, -6, 1, 3];

rearrange(nums);

// print the rearranged array
for (const i of nums) {
    console.log(`${i}`.padStart(3));
}
```

**Output:** 5 -2 9 -6 1 -8 3 -3

## Problem #4

Given an integer array, move all zeros present in it to the end. The solution should maintain the relative order of items in the array.

For example,

**Input:** { 6, 0, 8, 2, 3, 0, 4, 0, 1 } **Output:** { 6, 8, 2, 3, 4, 1, 0, 0, 0 }

The idea is to use 0 as a pivot element and make one pass of the partition process. The partitioning logic will read all elements, and each time we encounter a non-pivot element, swap it with the first occurrence of the pivot.

The implementation can be seen below in TypeScript:

```ts
// Function to move all zeros present in an array to the end
function partition(nums: number[]): void {
    let j = 0;

    // each time we encounter a non-zero, `j` is incremented, and
    // the element is placed before the pivot
    for (let i = 0; i < nums.length; i++)
    {
        if (nums[i] !== 0)        // pivot is 0
        {
            [nums[i], nums[j]] = [nums[j], nums[i]];
            j++;
        }
    }
}

const nums = [6, 0, 8, 2, 3, 0, 4, 0, 1];

partition(nums);

for (const i of nums) {
    console.log(i + " ");
}
```

**Output:** 6 8 2 3 4 1 0 0 0

Also See:

> [Quicksort using Dutch National Flag Algorithm](https://www.techiedelight.com/quicksort-using-dutch-national-flag-algorithm/ "Quicksort using Dutch National Flag Algorithm")

> [Quicksort algorithm using Hoare’s partitioning scheme](https://www.techiedelight.com/quick-sort-using-hoares-partitioning-scheme/ "Quicksort algorithm using Hoare’s partitioning scheme")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.81/5. Vote count: 203

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Easy](https://www.techiedelight.com/Tags/easy/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
