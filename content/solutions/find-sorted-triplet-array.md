# Find the sorted triplet in an array

> Source: https://www.techiedelight.com/find-sorted-triplet-array/

[Array](https://www.techiedelight.com/Category/Array/)

Given an integer array `A`, efficiently find a sorted triplet such that `A[i] < A[j] < A[k]` and `0 <= i < j < k < n`, where `n` is the array size.

For example,

**Input:** A[] = { 5, 4, 3, 7, 6, 1, 9 } **Output:** Any one of the following triplets: (5, 7, 9) (4, 7, 9) (3, 7, 9) (5, 6, 9) (4, 6, 9) (3, 6, 9)

> 

A simple solution would be to traverse the array and, for each index, check if at least one smaller and one larger element exists on its left and right, respectively. If any such index exists, we have found our triplet. The time complexity of this approach is O(n2) since, for each array element, we might end up traversing the whole array again.

We can easily solve this problem in linear time using some extra space. The idea is to create two auxiliary arrays where each index in the first array stores the smaller element’s index to the left, and each index in the second array stores the larger element’s index to the right. After filling up both arrays, find an index with a smaller value present to its left and a higher value to its right. If any such index exists, the triplet is found.

The algorithm can be implemented as follows in TypeScript:

```ts
// Find a sorted triplet in a given array
function findTriplet(A: number[]): [number, number, number] | null {

    // size of the input array
    const n = A.length;

    // a sorted triplet is not possible on input having less than 3 elements
    if (n < 3) {
        return null;
    }

    // `min[i] = j`, when `0 <= j < i` and `A[j] < A[i]`
    // `min[i] = -1` when `A[j] > A[i]` for every index `j < i`
    const min: number[] = new Array(n).fill(-1);

    // keep an index to the minimum element found so far
    // while traversing the array from left to right
    let min_index_so_far = 0;

    // start from the 1st index as `min[0]` would be -1
    for (let i = 1; i < n; i++) {
        // update `min_index_so_far` if the current index has less value;
        // otherwise, update `min[i]` with the smallest index to its left
        if (A[i] < A[min_index_so_far]) {
            min_index_so_far = i;
        } else if (A[i] > A[min_index_so_far]) {
            min[i] = min_index_so_far;
        }
    }

    // `max[i] = j`, when `i < j < n` and `A[i] < A[j]`
    // `max[i] = -1` when `A[j] < A[i]` for every index `j > i`
    const max: number[] = new Array(n).fill(-1);

    // keep an index to the maximum element found so far
    // while traversing the array from right to left
    let max_index_so_far = n - 1;

    // start from the second last index as `max[n-1]` would be `-1`
    for (let i = n - 2; i >= 0; i--) {

        // update `max_index_so_far` if the current index has more value;
        // otherwise, update `max[i]` with the greatest index to its right
        if (A[i] > A[max_index_so_far]) {
            max_index_so_far = i;
        } else if (A[i] < A[max_index_so_far]) {
            max[i] = max_index_so_far;
        }
    }

    // traverse the array again and find an index with both a min
    // element on its left and a max element on its right
    for (let i = 0; i < n; i++) {
        if (min[i] !== -1 && max[i] !== -1) {
            // create a tuple of the found triplet and returns true
            return [min[i], i, max[i]];
        }
    }

    // no triplet found
    return null;
}

// input array
const input = [5, 4, 3, 7, 6, 1, 9];

// find triplet
const triplet = findTriplet(input);

if (triplet) {
    console.log(`Triplet found: (${input[triplet[0]]}, ${input[triplet[1]]}, ${input[triplet[2]]})`);
} else {
    console.log('Triplet not found');
}
```

**Output:** Triplet found: (3, 7, 9)

The time complexity of the above solution is O(n) since the solution iterates over the whole array of size `n` thrice. The extra space required by the solution is O(n) for storing the auxiliary arrays.

We can even solve this problem in linear time and constant extra space. The idea is to traverse the array from left to right and keep track of the minimum element found so far. Maintain two variables, `low` and `mid`, for storing the indices of the first two elements of the triplet. For the first element, which is more than the current minimum, initialize the `low` and `mid` index with the current minimum and current element indices. If we see a better candidate for the middle element, update the `mid` and `low` index. If at any point a value is encountered that is more than the `mid` value, the triplet is located, and we are done.

Following is the implementation in TypeScript based on the above idea:

```ts
// Find a sorted triplet in a given array
function findTriplet(A: number[]): [number, number, number] | null {

    // size of the input array
    const n = A.length;

    // a sorted triplet is not possible on input having less than 3 elements
    if (n < 3) {
        return null;
    }

    // keep an index to the minimum element found so far
    // while traversing the array from left to right
    let min_index = 0;

    // stores the index of the first two items in the sorted subsequence
    let low = 0, mid = -1;

    // traverse the array from left to right starting from the 1st index
    for (let i = 1; i < n; i++) {

        // if the current element is less than the minimum element found so far
        if (A[i] <= A[min_index]) {
            min_index = i;
        }

        // initialize `low` and `mid` index since `A[i] > A[min_index]`
        else if (mid === -1) {
            low = min_index;
            mid = i;
        }

        // a smaller candidate is found for the middle element
        else if (A[i] <= A[mid]) {
            low = min_index;
            mid = i;
        }

        // triplet is found since `A[low] < A[mid] < A[i]`
        else {
            // create a tuple of the found triplet and returns true
            return [A[low], A[mid], A[i]];
        }
    }

    // no triplet found
    return null;
}

// input array
const input = [5, 4, 3, 7, 6, 1, 9];

// store the triplet
const triplet = findTriplet(input);

// find triplet
if (triplet !== null && triplet.length === 3) {
    const [first, second, third] = triplet;
    console.log(`Triplet found: (${first}, ${second}, ${third})`);
} else {
    console.log('Triplet not found');
}
```
