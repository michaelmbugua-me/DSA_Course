# Quicksort Algorithm – TypeScript Implementation

> Source: https://www.techiedelight.com/quicksort/

Given an integer array, sort it using the Quicksort algorithm.

## Quicksort Overview

Quicksort is an efficient [in-place sorting algorithm](https://techiedelight.com/in-place-vs-out-of-place-algorithms/), which usually performs about two to three times faster than [merge sort](https://techiedelight.com/merge-sort/) and [heapsort](https://techiedelight.com/heap-sort-place-place-implementation-c-c/) when implemented well. Quicksort is a comparison sort, meaning that it can sort items of any type for which a _less-than_ relation is defined. In efficient implementations, it is usually not a stable sort.

Quicksort, on average, makes O(n.log(n)) comparisons to sort `n` items. In the worst-case, it makes O(n2) comparisons, though this behavior is very rare.

## How Quicksort Works?

Quicksort is a [Divide and Conquer](https://techiedelight.com/divide-and-conquer-interview-questions/) algorithm. Like all divide-and-conquer algorithms, it first divides a large array into two smaller subarrays and then recursively sort the subarrays. Basically, three steps are involved in the whole process:

  * **Pivot selection:** Pick an element, called a pivot, from the array (usually the leftmost or the rightmost element of the partition).
  * **Partitioning:** Reorder the array such that all elements with values less than the pivot come before the pivot. In contrast, all elements with values greater than the pivot come after it. The equal values can go either way. After this partitioning, the pivot is in its final position.
  * **Recur:** Recursively apply the above steps to the subarray of elements with smaller values than the pivot and separately to the subarray of elements with greater values than the pivot.

The base case of the recursion is arrays of size `1`, which never need to be sorted. The following diagram shows how we choose the leftmost element as pivot at each step of the Quicksort algorithm, partition the array across the pivot, and recur on two subarrays we get after the partition process:

Please note that the pivot selection and partitioning steps can be made in several ways, and the choice of specific implementation schemes significantly affects the algorithm’s performance. We will discuss all that in detail later, but let’s now get to the coding part.

> [Practice this algorithm](https://techiedelight.com/?problem=SortArray)

Following is the TypeScript implementation of the Quicksort algorithm:

```ts
function swap(A: number[], i: number, j: number): void {

    const temp = A[i];
    A[i] = A[j];
    A[j] = temp;
}

// Partition using the Lomuto partition scheme
function partition(a: number[], start: number, end: number): number {

    // Pick the rightmost element as a pivot from the list
    const pivot = a[end];

    // elements less than the pivot will be pushed to the left of `pIndex`
    // elements more than the pivot will be pushed to the right of `pIndex`
    // equal elements can go either way
    let pIndex = start;

    // each time we find an element less than or equal to the pivot,
    // `pIndex` is incremented, and that element would be placed
    // before the pivot.
    for (let i = start; i < end; i++) {
        if (a[i] <= pivot) {
            swap(a, i, pIndex);
            pIndex = pIndex + 1;
        }
    }

    // swap `pIndex` with pivot
    swap(a, end, pIndex);

    // return `pIndex` (index of the pivot element)
    return pIndex;
}

// Quicksort routine
function quicksort(a: number[], start: number, end: number): void {

    // base condition
    if (start >= end) {
        return;
    }

    // rearrange elements across pivot
    const pivot = partition(a, start, end);

    // recur on sublist containing elements less than the pivot
    quicksort(a, start, pivot - 1);

    // recur on sublist containing elements more than the pivot
    quicksort(a, pivot + 1, end);
}

// TypeScript implementation of the Quicksort algorithm
const a = [9, -3, 5, 2, 6, 8, -6, 1, 3];

quicksort(a, 0, a.length - 1);

// print the sorted list
console.log(a);
```

**Output:** -6 -3 1 2 3 5 6 8 9

## Quicksort Performance

The worst-case time complexity of Quicksort is O(n2), where `n` is the size of the input. The worst case happens when the pivot happens to be the smallest or largest element in the list or when all the array elements are equal. This will result in the most unbalanced partition as the pivot divides the array into two subarrays of sizes 0 and `n-1`. If this repeatedly happens in every partition (say, we have sorted array), then each recursive call processes a list of size one less than the previous list, resulting in O(n2) time.

`T(n) = T(n-1) + cn = O(n²)`

(Note – partition takes O(n) time that accounts for `cn`)

The best-case time complexity of Quicksort is O(n.log(n)). The best case happens when the pivot divides the array into two nearly equal pieces. Now each recursive call processes a list of half the size.

`T(n) = 2 T(n/2) + cn = O(n.log(n))`

The auxiliary space required by the Quicksort algorithm is O(n) for the call stack.

**Must Read:**

> [How to Boost QuickSort Performance?](https://techiedelight.com/boost-quicksort-performance/)

**References:** <https://en.wikipedia.org/wiki/Quicksort>

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.67/5. Vote count: 190

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Algorithm](https://www.techiedelight.com/Tags/Algorithm/), [Medium](https://www.techiedelight.com/Tags/medium/), [Must Know](https://www.techiedelight.com/Tags/Must-Know/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
