# Merge Sort Algorithm – C++, Java, and Python Implementation

> Source: https://www.techiedelight.com/merge-sort/

Given an integer array, sort it using the merge sort algorithm.

## Merge sort Overview

Merge sort is an efficient sorting algorithm that produces a stable sort, which means that if two elements have the same value, they hold the same relative position in the sorted sequence as they did in the input. In other words, the relative order of elements with equal values is preserved in the sorted sequence. Merge sort is a comparison sort, which means that it can sort any input for which a _less-than_ relation is defined.

## How Merge sort works?

Merge sort is a [Divide and Conquer](https://techiedelight.com/divide-and-conquer-interview-questions/) algorithm. Like all divide-and-conquer algorithms, merge sort divides a large array into two smaller subarrays and then recursively sort the subarrays. Basically, two steps are involved in the whole process:

  1. Divide the unsorted array into `n` subarrays, each of size `1` (an array of size `1` is considered sorted).
  2. Repeatedly merge subarrays to produce new sorted subarrays until only `1` subarray is left, which would be our sorted array.

The [following diagram](https://en.wikipedia.org/wiki/File:Merge_sort_algorithm_diagram.svg) represents a top-down view of the recursive merge sort algorithm used to sort an `7`-element integer array:

> [Practice this algorithm](https://techiedelight.com/?problem=SortArray)

Following is a TypeScript implementation of the merge sort algorithm:

```ts
// Merge two sorted sublists `A[low … mid]` and `A[mid+1 … high]`
function merge(A: number[], aux: number[], low: number, mid: number, high: number): void {

    let k = low;
    let i = low;
    let j = mid + 1;

    // while there are elements in the left and right runs
    while (i <= mid && j <= high) {

        if (A[i] <= A[j]) {
            aux[k++] = A[i++];
        }
        else {
            aux[k++] = A[j++];
        }
    }

    // copy remaining elements
    while (i <= mid) {
        aux[k++] = A[i++];
    }

    // No need to copy the second half (since the remaining items
    // are already in their correct position in the auxiliary array)

    // copy back to the original list to reflect sorted order
    for (let i = low; i <= high; i++) {
        A[i] = aux[i];
    }
}

// Sort list `A[low…high]` using auxiliary list aux
function mergesort(A: number[], aux: number[], low: number, high: number): void {

    // base case
    if (high <= low) {                     // if run size <= 1
        return;
    }

    // find midpoint
    const mid = (low + ((high - low) >> 1));

    // recursively split runs into two halves until run size <= 1,
    // then merge them and return up the call chain

    mergesort(A, aux, low, mid);         // split/merge left half
    mergesort(A, aux, mid + 1, high);    // split/merge right half

    merge(A, aux, low, mid, high);       // merge the two half runs
}

// Function to check if `A` is sorted in ascending order or not
function isSorted(A: number[]): boolean {

    let prev = A[0];
    for (let i = 1; i < A.length; i++) {
        if (prev > A[i]) {
            console.log('MergeSort Fails!!');
            return false;
        }

        prev = A[i];
    }

    return true;
}

// Implementation of merge sort algorithm in TypeScript
const A = [12, 3, 18, 24, 0, 5, -2];
const aux = A.slice();

// sort list `A` using auxiliary list `aux`
mergesort(A, aux, 0, A.length - 1);

if (isSorted(A)) {
    console.log(A.join(' '));
}
```

**Output:** -50 -41 -34 -23 -21 -11 5 9 10 19 26 33 35 40 49

## Merge Sort Performance

The worst-case time complexity of merge sort is O(n.log(n)), where `n` is the size of the input. The recurrence relation is:

`T(n) = 2T(n/2) + cn = O(n.log(n))`

The recurrence basically summarizes the merge sort algorithm – Sort two lists of half the original list’s size and add the `n` steps taken to merge the resulting two lists.

The auxiliary space required by the merge sort algorithm is O(n) for the call stack.

**Also See:**

> [Iterative Merge Sort Algorithm (Bottom-up Merge Sort)](https://techiedelight.com/iterative-merge-sort-algorithm-bottom-up/)

> [External Merge Sort Algorithm](https://techiedelight.com/external-merge-sort/)

**References:** <https://en.wikipedia.org/wiki/Merge_sort>

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.77/5. Vote count: 229

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Algorithm](https://www.techiedelight.com/Tags/Algorithm/), [Easy](https://www.techiedelight.com/Tags/easy/), [Must Know](https://www.techiedelight.com/Tags/Must-Know/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
