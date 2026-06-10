# Bubble Sort Algorithm – Iterative & Recursive | TypeScript

> Source: https://www.techiedelight.com/bubble-sort-iterative-recursive/

Given an integer array, sort it using the bubble sort algorithm.

## Bubble Sort Overview

Bubble sort is a stable, [in-place sorting algorithm](https://techiedelight.com/in-place-vs-out-of-place-algorithms/) named for smaller or larger elements “bubble” to the top of the list. Although the algorithm is simple, it is too slow and impractical for most problems even compared to [insertion sort](https://techiedelight.com/insertion-sort-iterative-recursive/), and is not recommended for large input.

The only significant advantage that bubble sort has over most other implementations, even [Quicksort](https://techiedelight.com/quicksort/), but not insertion sort, is the ability to detect if the list is already sorted. When the list is already sorted (best-case), bubble sort runs in linear time.

## How Bubble Sort works?

Each pass of bubble sort steps through the list to be sorted compares each pair of adjacent items and swaps them if they are in the wrong order. _At the end of each pass, the next largest element will “Bubble” up to its correct position._ These passes through the list are repeated until no swaps are needed, which indicates that the list is sorted. In the worst-case, we might end up making an `n-1` pass, where `n` is the input size.

**__ 3 5 8 4 1 9 -2 ** **_pass 1_ 3 5 4 1 8 -2 9** **_pass 2_ 3 4 1 5 -2 8 9** **_pass 3_ 3 1 4 -2 5 8 9** **_pass 4_ 1 3 -2 4 5 8 9** **_pass 5_ 1 -2 3 4 5 8 9** **_pass 6_ -2  1 3 4 5 8 9**

A detailed illustration of how each pass works can be seen [here](https://en.wikipedia.org/wiki/Bubble_sort#Step-by-step_example).

> [Practice this algorithm](https://techiedelight.com/?problem=SortArray)

## Insertion Sort Implementation

Following is an iterative implementation of the bubble sort algorithm in TypeScript. The implementation can be easily optimized by observing that the `n'th` pass finds the `n'th` largest element and puts it in its final place. So, the inner loop can avoid looking at the last `n-1` items when running for the `n'th` time. Another optimization is to stop the algorithm when the inner loop didn’t do any swap.

```ts
// Utility function to swap values at two indices in the list
const swap = (A: number[], i: number, j: number): void => {
    const temp = A[i];
    A[i] = A[j];
    A[j] = temp;
}

// Function to perform bubble sort on a list
const bubbleSort = (A: number[]): void => {

    // `A.length-1` passes
    for (let k = 0; k < A.length - 1; k++) {

        // last `k` items are already sorted, so the inner loop can
        // avoid looking at the last `k` items
        for (let i = 0; i < A.length - 1 - k; i++) {
            if (A[i] > A[i + 1]) {
                swap(A, i, i + 1);
            }
        }

        // the algorithm can be terminated if the inner loop didn't do any swap
    }
}

const A = [3, 5, 8, 4, 1, 9, -2];

bubbleSort(A);

// print the sorted list
console.log(A);
```

The bubble sort algorithm can be implemented recursively as well. Following is the recursive implementation of the bubble sort algorithm in TypeScript:

```ts
// Utility function to swap values at two indices in the list
const swap = (A: number[], i: number, j: number): void => {
    const temp = A[i];
    A[i] = A[j];
    A[j] = temp;
}

// Recursive function to perform bubble sort on sublist `A[i…n]`
const bubbleSort = (A: number[], n: number): void => {

    for (let i = 0; i < n - 1; i++) {
        if (A[i] > A[i + 1]) {
            swap(A, i, i + 1);
        }
    }

    if (n - 1 > 1) {
        bubbleSort(A, n - 1);
    }
}

const A = [3, 5, 8, 4, 1, 9, -2];

bubbleSort(A, A.length);

// print the sorted list
console.log(A);
```

## Insertion Sort Performance

The worst-case time complexity of bubble sort is O(n2), where `n` is the size of the input. The worst case happens when the array is reverse sorted. The best-case time complexity of bubble sort is O(n). The best case happens when the array is already sorted, and the algorithm is modified to stop running when the inner loop didn’t do any swap. The optimized implementation can be seen [here](https://techiedelight.com/compiler/?run=KekcmH).

The auxiliary space used by the iterative version is O(1) and O(n) by the recursive version for the call stack.

**References:** <https://en.wikipedia.org/wiki/Bubble_sort>
