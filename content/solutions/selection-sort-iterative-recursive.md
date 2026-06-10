# Selection Sort Algorithm – Iterative & Recursive | TypeScript

> Source: https://www.techiedelight.com/selection-sort-iterative-recursive/

Given an integer array, sort it using the selection sort algorithm.

## Selection Sort Overview

Selection sort is an unstable, [in-place sorting algorithm](https://techiedelight.com/in-place-vs-out-of-place-algorithms/) known for its simplicity. It has performance advantages over more complicated algorithms in certain situations, particularly where the auxiliary memory is limited. It can be implemented as a stable sort and requires O(n2) time to sort `n` items, making it inefficient to use on large lists. Among simple average-case O(n2) algorithms, selection sort almost always outperforms [bubble sort](https://techiedelight.com/bubble-sort-iterative-recursive/) and generally performs worse than the [insertion sort](https://techiedelight.com/insertion-sort-iterative-recursive/).

The biggest advantage of using a selection sort is that it does a maximum of `n` swaps (memory write). The insertion sort, on the other hand, does O(n2) number of writes. This can be critical if memory-write operation is significantly more expensive than memory-read operation, such as flash memory, where every write lessens the memory’s lifespan.

## How Selection Sort works?

The idea is to divide the array into two subsets – sorted subset and unsorted subset. Initially, the sorted subset is empty, and the unsorted subset is the entire input list. The algorithm proceeds by finding the smallest _(or largest, depending on sorting order)_ element in the unsorted subset, swapping it with the leftmost unsorted element _(putting it in sorted order)_ , and moving the subset boundaries one element to the right. The following example explains it all:

** 3 5 8 4 1 9 -2** **_i = 0_ -2 5 8 4 1 9 3** **_i = 1_ -2 1 8 4 5 9 3** **_i = 2_ -2 1 3 4 5 9 8** **_i = 3_ -2 1 3 4 5 9 8** **_i = 4_ -2 1 3 4 5 9 8** **_i = 5_ -2 1 3 4 5 8 9**

> [Practice this algorithm](https://techiedelight.com/?problem=SortArray)

Following is an iterative implementation of the selection sort algorithm in TypeScript:

```ts
// Utility function to swap values at two indices in the array
function swap(A: number[], i: number, j: number): void {
    const temp = A[i];
    A[i] = A[j];
    A[j] = temp;
}

// Function to perform selection sort on an array
function selectionSort(A: number[]): void {
    for (let i = 0; i < A.length - 1; i++) {
        // find the minimum element in the unsorted subarray `A[i…n-1]`
        // and swap it with `A[i]`
        let min = i;

        for (let j = i + 1; j < A.length; j++) {
            // if the `A[j]` element is less, then it is the new minimum
            if (A[j] < A[min]) {
                min = j;        // update the index of minimum element
            }
        }

        // swap the minimum element in subarray `A[i…n-1]` with `A[i]`
        swap(A, min, i);
    }
}

// demo
const A = [3, 5, 8, 4, 1, 9, -2];

selectionSort(A);

// print the sorted array
console.log(A);
```

Both the worst-case and best-case time complexity of selection sort is O(n2), where `n` is the input size, and it doesn’t require any extra space.

The selection sort algorithm can be implemented recursively. Following is the recursive implementation of the selection sort algorithm in TypeScript:

```ts
// Utility function to swap values at two indices in the array
function swap(A: number[], i: number, j: number): void {
    const temp = A[i];
    A[i] = A[j];
    A[j] = temp;
}

// Recursive function to perform selection sort on subarray `A[i…n-1]`
function selectionSort(A: number[], i: number, n: number): void {
    // find the minimum element in the unsorted subarray `A[i…n-1]`
    // and swap it with `A[i]`
    let min = i;
    for (let j = i + 1; j < n; j++) {
        // if the `A[j]` element is less, then it is the new minimum
        if (A[j] < A[min]) {
            min = j;            // update the index of minimum element
        }
    }

    // swap the minimum element in subarray `A[i…n-1]` with `A[i]`
    swap(A, min, i);

    if (i + 1 < n) {
        selectionSort(A, i + 1, n);
    }
}

// demo
const A = [3, 5, 8, 4, 1, 9, -2];

selectionSort(A, 0, A.length);

// print the sorted array
console.log(A);
```

The time complexity of the selection sort recursive algorithm remains the same as the iterative version. However, the auxiliary space used by the recursive version is O(n) for the call stack.

**References:** <https://en.wikipedia.org/wiki/Selection_sort>
