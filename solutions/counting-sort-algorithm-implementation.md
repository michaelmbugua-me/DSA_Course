# Counting Sort Algorithm – C, Java, and Python Implementation

> Source: https://www.techiedelight.com/counting-sort-algorithm-implementation/

Given a collection of `n` items, each of which has a non-negative integer key whose maximum value is at most `k`, effectively sort it using the counting sort algorithm.

> [Practice this algorithm](https://techiedelight.com/?problem=CountingSort)

## Overview

Counting sort is an integer-based sorting algorithm for sorting an array whose keys lie between a specific range. It counts the total number of elements with each distinct key value and then uses those counts to determine the positions of each key value in the output.

We can use counting sort to find the most frequent letter in a file or sort a limited range array efficiently. It is often used as a subroutine in the radix sorting algorithm, and because of this, counting sort needs to be a stable sort.

## Algorithm

The algorithm loops over the items, computing a histogram of each key’s number of times within the input collection. It then performs a prefix sum computation to determine, for each key, the starting position in the output array of the items having that key. Finally, it loops over the items again, moving each item into its sorted position in the output array.

The algorithm can be implemented as below in TypeScript. In the below code:

  1. After the first for-loop, `freq[i]` stores the total number of items with a key equal to `i`.
  2. After the second for-loop, it instead stores the total number of items with a key less than `i`, which is the same as the first index at which an item with key `i` should be stored in the output array.
  3. Throughout the third loop, `freq[i]` always stores the next position in the output array into which an item with key `i` should be stored, so each item is moved to its correct position in the output array.

```ts
/*
 `A` ——> the input list of integers to be sorted
 `k` ——> a number such that all integers are in range `0…k-1`
*/
function countsort(A: number[], k: number): void {
    // create an integer array of size `n` to store the sorted array
    const output = new Array(A.length).fill(0);

    // create an integer array of size `k + 1`, initialized by all zero
    const freq = new Array(k + 1).fill(0);

    // using the value of each item in the input list as an index,
    // store each integer's count in `freq[]`
    for (const i of A) {
        freq[i] = freq[i] + 1;
    }

    // calculate the starting index for each integer
    let total = 0;
    for (let i = 0; i < k + 1; i++) {
        const oldCount = freq[i];
        freq[i] = total;
        total += oldCount;
    }

    // copy to the output list, preserving the order of inputs with equal keys
    for (const i of A) {
        output[freq[i]] = i;
        freq[i] = freq[i] + 1;
    }

    // copy the output list back to the input list
    for (let i = 0; i < A.length; i++) {
        A[i] = output[i];
    }
}

const A = [4, 2, 10, 10, 1, 4, 2, 1, 10];

// range of list elements
const k = 10;

countsort(A, k);
console.log(A);
```

**Output:** 1 1 2 2 4 4 10 10 10

Unlike other sorting algorithms like [Insertion sort](https://techiedelight.com/insertion-sort-iterative-recursive/), [Selection sort](https://techiedelight.com/selection-sort-iterative-recursive/), [Merge sort](https://techiedelight.com/merge-sort/), [Quicksort](https://techiedelight.com/quicksort/), etc., Counting sort is not a comparison sort. It uses key values as indices into an array, as evident from the above code.

Following is the simpler version of counting sort that doesn’t produce a stable sort, i.e., the relative order of items with equal keys is not preserved anymore.

```ts
/*
 `A` ——> the input list of integers to be sorted
 `k` ——> a number such that all integers are in range `0…k-1`
*/
function countsort(A: number[], k: number): void {
    // create an integer array of size `k + 1` to store each integer's count
    // in the input list
    const freq = new Array(k + 1).fill(0);

    // using the value of each item in the input list as an index,
    // store each integer's count in `freq[]`
    for (const i of A) {
        freq[i] += 1;
    }

    // overwrite the input list with sorted order
    let index = 0;
    for (let i = 0; i < k + 1; i++) {
        while (freq[i] > 0) {
            A[index] = i;
            index += 1;
            freq[i] -= 1;
        }
    }
}

const A = [4, 2, 10, 10, 1, 4, 2, 1, 10];

// range of list elements
const k = 10;

countsort(A, k);
console.log(A);
```

**Output:** 1 1 2 2 4 4 10 10 10

## Performance

The time complexity of the counting sort is O(n + k), where `n` is the size of the input and `k` is the input range. Since it uses arrays of length `k+1` and `n`, the total space used by the algorithm is also O(n + k). Counting sort can be highly space-efficient when the range of keys `k` is significantly less than the total number of items `n`, but when variation in keys is significantly greater than the total number of items `k >> n`, counting sort consumes a lot of space.

**Exercise:**

1\. Extend the solution to handle negative integers.

2\. Provide the exact range of keys by calculating the maximum and minimum key values’ difference.

**References:** <https://en.wikipedia.org/wiki/Counting_sort>
