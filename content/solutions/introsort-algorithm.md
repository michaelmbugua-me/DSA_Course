# Introsort Algorithm – Overview and TypeScript Implementation

> Source: https://www.techiedelight.com/introsort-algorithm/

Given an integer array, sort it using introsort sorting algorithm.

## Introsort Overview

Introsort is an efficient [in-place sorting algorithm](https://techiedelight.com/in-place-vs-out-of-place-algorithms/), which usually beats all other sorting algorithms in terms of performance. Due to its high performance, it is used in several standard library sort functions, including some [C++ sort implementations](https://techiedelight.com/sort-vector-cpp/).

Introsort is a comparison sort, meaning that it can sort items of any type for which a _less-than_ relation is defined. It is usually not a stable sort, which means that if two elements have the same value, they might not hold the same relative position in the output as they did in the input.

## Introsort Implementation

Introsort is a hybrid of [Quicksort](https://techiedelight.com/quicksort/) and [heapsort algorithm](https://techiedelight.com/heap-sort-place-place-implementation-c-c/). A [hybrid algorithm](https://techiedelight.com/hybrid-quicksort/) combines two or more other algorithms that solve the same problem such that the resulting algorithm is better than the individual algorithms. Introsort begins with Quicksort and switches to heapsort when the recursion depth exceeds a level based on (the logarithm of) the total number of elements being sorted. When the total number of elements is below some threshold, introsort can switch to a non-recursive sorting algorithm such as [insertion sort](https://techiedelight.com/insertion-sort-iterative-recursive/) that performs fewer swaps, comparisons or other operations on such small arrays.

> [Practice this algorithm](https://techiedelight.com/?problem=SortArray)

Following is the TypeScript implementation of the introsort algorithm, similar to the GNU Standard C++ library. It uses introsort with a maximum depth of `2.log2(n)`, followed by an insertion sort on partitions smaller than 16. The Quicksort algorithm is optimized by [better pivot selection](https://techiedelight.com/boost-quicksort-performance/).

```ts
// Function to swap two elements in the array
const swap = (a: number[], i: number, j: number): void => {
    const temp = a[i];
    a[i] = a[j];
    a[j] = temp;
};

// Function to perform insertion sort on subarray `a[low…high]`
function insertionsort(a: number[], low: number, high: number): void {
    // start from the second element in the subarray
    // (the element at index `low` is already sorted)
    for (let i = low + 1; i <= high; i++) {
        const value = a[i];
        let j = i;

        // find index `j` within the sorted subset a[0…i-1]
        // where element a[i] belongs
        while (j > low && a[j - 1] > value) {
            a[j] = a[j - 1];
            j--;
        }

        // Note that the subarray `a[j…i-1]` is shifted to
        // the right by one position, i.e., `a[j+1…i]`

        a[j] = value;
    }
}

// Function to partition the array using Lomuto partition scheme
function partition(a: number[], low: number, high: number): number {
    // Pick the rightmost element as a pivot from the array
    const pivot = a[high];

    // elements less than the pivot will be pushed to the left of `pIndex`
    // elements more than the pivot will be pushed to the right of `pIndex`
    // equal elements can go either way
    let pIndex = low;

    // each time we find an element less than or equal to the pivot, `pIndex`
    // is incremented, and that element would be placed before the pivot.
    for (let i = low; i < high; i++) {
        if (a[i] <= pivot) {
            swap(a, i, pIndex);
            pIndex++;
        }
    }

    // swap `pIndex` with pivot
    swap(a, pIndex, high);

    // return `pIndex` (index of the pivot element)
    return pIndex;
}

// Quicksort randomized partition to rearrange elements across pivot
function randPartition(a: number[], low: number, high: number): number {
    // choose a random index between `[low, high]`
    const pivotIndex = Math.floor(Math.random() * (high - low + 1)) + low;

    // swap the end element with the element present at a random index
    swap(a, pivotIndex, high);

    // call the partition procedure
    return partition(a, low, high);
}

// Function to sift a heap rooted at index `i` (heapify-down)
// max-heap built with plain array ops (JS has no builtin heap)
function heapify(a: number[], i: number, size: number, offset: number): void {
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    let largest = i;

    if (left < size && a[offset + left] > a[offset + largest]) {
        largest = left;
    }
    if (right < size && a[offset + right] > a[offset + largest]) {
        largest = right;
    }
    if (largest !== i) {
        swap(a, offset + i, offset + largest);
        heapify(a, largest, size, offset);
    }
}

// Function to perform heapsort on the given range of elements
function heapsort(a: number[], low: number, high: number): void {
    const size = high - low + 1;

    // build a max-heap
    for (let i = Math.floor(size / 2) - 1; i >= 0; i--) {
        heapify(a, i, size, low);
    }

    // repeatedly extract the max element
    for (let i = size - 1; i > 0; i--) {
        swap(a, low, low + i);
        heapify(a, 0, i, low);
    }
}

// Function to perform introsort on the given array
function introsort(a: number[], low: number, high: number, maxdepth: number): void {
    // perform insertion sort if partition size is 16 or smaller
    if ((high - low) < 16) {
        insertionsort(a, low, high);
    }
    // perform heapsort if the maximum depth is 0
    else if (maxdepth === 0) {
        heapsort(a, low, high);
    }
    else {
        // otherwise, perform Quicksort
        const pivot = randPartition(a, low, high);
        introsort(a, low, pivot - 1, maxdepth - 1);
        introsort(a, pivot + 1, high, maxdepth - 1);
    }
}

(function main() {
    const a = [5, 7, -8, 9, 10, 4, -7, 0, -12, 1, 6, 2, 3, -4, -15, 12];
    const n = a.length;

    // get the maximum depth
    const maxdepth = Math.floor(Math.log(n) * 2);

    // sort the array using introsort the algorithm
    introsort(a, 0, n - 1, maxdepth);

    // print the sorted array
    for (const x of a) {
        process.stdout.write(`${x} `);
    }
})();
```

**Output:** -15 -12 -8 -7 -4 0 1 2 3 4 5 6 7 9 10 12

## Introsort Performance

Introsort sorting algorithm provides both fast average performance and (asymptotically) optimal worst-case performance. Both the average-case and worst-case time complexity of introsort are O(n.log(n)), where `n` is the size of the input.

The auxiliary space required by the introsort algorithm is O(n) for the call stack when the naive Quicksort algorithm is used. To keep the stack depth bounded by O(log(n)), recur first into the partition’s smaller side, then use a [tail call](https://en.wikipedia.org/wiki/Tail_recursion) to recur into the other.

**References:** <https://en.wikipedia.org/wiki/Introsort>

Also See:

> [Hybrid QuickSort Algorithm](https://www.techiedelight.com/hybrid-quicksort/ "Hybrid QuickSort Algorithm")

> [Quicksort Algorithm – C++, Java, and Python Implementation](https://www.techiedelight.com/quicksort/ "Quicksort Algorithm – C++, Java, and Python Implementation")

> [Quicksort algorithm using Hoare’s partitioning scheme](https://www.techiedelight.com/quick-sort-using-hoares-partitioning-scheme/ "Quicksort algorithm using Hoare’s partitioning scheme")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.79/5. Vote count: 73

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Algorithm](https://www.techiedelight.com/Tags/Algorithm/), [Hard](https://www.techiedelight.com/Tags/hard/), [Priority Queue](https://www.techiedelight.com/Tags/Priority-Queue/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
