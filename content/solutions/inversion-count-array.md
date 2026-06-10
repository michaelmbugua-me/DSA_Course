# Inversion count of an array

> Source: https://www.techiedelight.com/inversion-count-array/

Given an array, find the total number of inversions of it. If `(i < j)` and `(A[i] > A[j])`, then pair `(i, j)` is called an inversion of an array `A`. We need to count all such pairs in the array.

For example,

**Input:** A[] = [1, 9, 6, 4, 5] **Output:** The inversion count is 5 There are 5 inversions in the array: (9, 6), (9, 4), (9, 5), (6, 4), (6, 5)

> 

## 1\. Brute-Force Solution

A simple solution would be for each array element count all elements less than it to its right and add the count to output. The complexity of this solution is O(n2), where `n` is the size of the input.

```ts
// Function to find inversion count of a given array
function findInversionCount(A: number[]): number {

    let inversionCount = 0;
    for (let i = 0; i < A.length - 1; i++) {
        for (let j = i + 1; j < A.length; j++) {
            if (A[i] > A[j]) {
                inversionCount = inversionCount + 1;
            }
        }
    }

    return inversionCount;
}

const A = [1, 9, 6, 4, 5];
console.log('Inversion count is', findInversionCount(A));
```

**Output:** The inversion count is 5

## 2\. Using Merge Sort

This is a classic problem that can be solved by [merge sort algorithm](https://techiedelight.com/merge-sort/). Basically, for each array element, count all elements more than it to its left and add the count to the output. This whole magic happens inside the merge function of merge sort.

Let’s consider two subarrays involved in the merge process:

The implementation can be seen below in TypeScript:

```ts
// Merge two sorted subarrays `A[low … mid]` and `A[mid+1 … high]`
function merge(A: number[], aux: number[], low: number, mid: number, high: number): number {

    let k = low;
    let i = low;
    let j = mid + 1;
    let inversionCount = 0;

    // while there are elements in the left and right runs
    while (i <= mid && j <= high) {
        if (A[i] <= A[j]) {
            aux[k] = A[i];
            i = i + 1;
        } else {
            aux[k] = A[j];
            j = j + 1;
            inversionCount += (mid - i + 1);        // NOTE
        }

        k = k + 1;
    }

    // copy remaining elements
    while (i <= mid) {
        aux[k] = A[i];
        k = k + 1;
        i = i + 1;
    }

    /* no need to copy the second half (since the remaining items
       are already in their correct position in the temporary array) */

    // copy back to the original array to reflect sorted order
    for (let i = low; i <= high; i++) {
        A[i] = aux[i];
    }

    return inversionCount;
}

// Sort array `A[low…high]` using auxiliary array `aux`
function mergesort(A: number[], aux: number[], low: number, high: number): number {

    // base case
    if (high <= low) {        // if run size <= 1
        return 0;
    }

    // find midpoint
    const mid = low + ((high - low) >> 1);
    let inversionCount = 0;

    // recursively split runs into two halves until run size <= 1,
    // then merges them and return up the call chain

    inversionCount += mergesort(A, aux, low, mid);      // split/merge left half
    inversionCount += mergesort(A, aux, mid + 1, high); // split/merge right half
    inversionCount += merge(A, aux, low, mid, high);    // merge the two half runs

    return inversionCount;
}

const A = [1, 9, 6, 4, 5];
const aux = A.slice();

// get the inversion count by performing merge sort on an array
console.log('Inversion count is', mergesort(A, aux, 0, A.length - 1));
```

**Output:** The inversion count is 5

The time complexity of the above solution is O(n.log(n)) (same as that of merge sort algorithm), and the auxiliary space used by the program is O(n).
