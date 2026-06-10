# Insertion Sort Algorithm – Iterative & Recursive

> Source: https://www.techiedelight.com/insertion-sort-iterative-recursive/

Given an integer array, sort it using the insertion sort algorithm.

## Insertion Sort Overview

Insertion sort is a stable, [in-place sorting algorithm](https://techiedelight.com/in-place-vs-out-of-place-algorithms/) that builds the final sorted array one item at a time. It is not the very best in terms of performance but more efficient traditionally than most other simple O(n2) algorithms such as [selection sort](https://techiedelight.com/selection-sort-iterative-recursive/) or [bubble sort](https://techiedelight.com/bubble-sort-iterative-recursive/). Insertion sort is also used in [Hybrid sort](https://techiedelight.com/hybrid-quicksort/), which combines different sorting algorithms to improve performance.

It is also a well known online algorithm since it can sort a list as it receives it. In all other algorithms, we need all elements to be provided to the sorting algorithm before applying it. But an insertion sort allows us to start with a partial set of elements, sorts it (called a partially sorted set). If we want, we can insert more elements (these are the new set of elements that were not in memory when the sorting started) and sorts them. In the real world, data to be sorted is usually not static, rather dynamic. If even one additional element is inserted during the sorting process, other algorithms don’t respond easily. But only insertion sort algorithm is not interrupted and can respond well with the additional element.

## How Insertion Sort works?

The idea is to divide the array into two subsets – sorted subset and unsorted subset. Initially, a sorted subset consists of only one first element at index `0`. Then for each iteration, insertion sort removes the next element from the unsorted subset, finds the location it belongs within the sorted subset and inserts it there. It repeats until no input elements remain. The following example explains it all:

**_i = 1 _[ 3 8 5 4 1 9 -2 ]** **_i = 2 _[ 3 8 5 4 1 9 -2 ] ** **_i = 3 _[ 3 5 8 4 1 9 -2 ] ** **_i = 4 _[ 3 4 5 8 1 9 -2 ]** **_i = 5 _[ 1 3 4 5 8 9 -2 ]** **_i = 6 _[ 1 3 4 5 8 9 -2 ]** **_ _[ -2 1 3 4 5 8 9 ]**

> [Practice this algorithm](https://techiedelight.com/?problem=SortArray)

## Insertion Sort Implementation

Following is an iterative implementation of the insertion sort algorithm in TypeScript:

```ts
// Function to perform insertion sort on an array
function insertionSort(A: number[]): void {

    // Start from the second element
    // (the element at index 0 is already sorted)
    for (let i = 1; i < A.length; i++) {

        const value = A[i];
        let j = i;

        // find index `j` within the sorted subset `A[0…i-1]`
        // where element `A[i]` belongs
        while (j > 0 && A[j - 1] > value) {
            A[j] = A[j - 1];
            j = j - 1;
        }

        // Note that sublist `A[j…i-1]`is shifted to
        // the right by one position, i.e., `A[j+1…i]`

        A[j] = value;
    }
}

const A = [3, 8, 5, 4, 1, 9, -2];

insertionSort(A);

// print the sorted list
console.log(A);
```

**Output:** -2 1 3 4 5 8 9

We can implement the insertion sort algorithm recursively. Following is the recursive implementation of the insertion sort algorithm in TypeScript:

```ts
// Recursive function to perform insertion sort on sublist `A[i…n]`
function insertionSort(A: number[], i: number, n: number): void {

    const value = A[i];
    let j = i;

    // find index `j` within the sorted subset `A[0…i-1]`
    // where element `A[i]` belongs
    while (j > 0 && A[j - 1] > value) {
        A[j] = A[j - 1];
        j = j - 1;
    }

    A[j] = value;

    // Note that sublist `A[j…i-1]`is shifted to
    // the right by one position, i.e., `A[j+1…i]`

    if (i + 1 <= n) {
        insertionSort(A, i + 1, n);
    }
}

const A = [3, 8, 5, 4, 1, 9, -2];

// start from the second element (the element at index 0 is already sorted)
insertionSort(A, 1, A.length - 1);

// print the sorted list
console.log(A);
```

**Output:** -2 1 3 4 5 8 9

## Insertion Sort Performance

The worst-case time complexity of insertion sort is O(n2), where `n` is the size of the input. The worst case happens when the array is reverse sorted. The best-case time complexity of insertion sort is O(n). The best case happens when the array is already sorted.

The auxiliary space used by the iterative version is O(1) and O(n) by the recursive version for the call stack.
