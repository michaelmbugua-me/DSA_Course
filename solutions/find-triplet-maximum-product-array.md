# Find a triplet having the maximum product in an array

> Source: https://www.techiedelight.com/find-triplet-maximum-product-array/

Given an integer array, find a triplet having the maximum product.

For example,

**Input:** { -4, 1, -8, 9, 6 } **Output:** The triplet having the maximum product is (-4, -8, 9) **Input:** { 1, 7, 2, -2, 5 } **Output:** The triplet having the maximum product is (7, 2, 5)

> 

A naive solution would be to consider every triplet present in the array and compute the product of its elements. Finally, after processing all triplets, print the triplet having the maximum product. The time complexity of this solution would be O(n3), where `n` is the size of the input.

A better approach involves sorting the array. Then the triplet having the maximum product can be one of the two:

  1. The last three elements of the sorted array.
  2. First two elements and the last element of the sorted array (as the multiplication of two negative numbers results in a positive number).

The algorithm can be implemented as follows in TypeScript:

```ts
// Find a triplet having the maximum product in a given list
const findTriplet = (A: number[]): void => {
    // sort the given list in a natural order
    A.sort((a, b) => a - b);

    const n = A.length;

    // invalid input
    if (n <= 2) {
        console.log('No triplet exists. The array has less than 3 elements.');
    }

    // consider a maximum of the last three elements or
    // the first two elements and last element
    if (A[n - 1] * A[n - 2] * A[n - 3] > A[0] * A[1] * A[n - 1]) {
        console.log(`Triplet is (${A[n - 1]}, ${A[n - 2]}, ${A[n - 3]})`);
    } else {
        console.log(`Triplet is (${A[0]}, ${A[1]}, ${A[n - 1]})`);
    }
};

const A = [-4, 1, -8, 9, 6];
findTriplet(A);
```

**Output:** Triplet is (-8, -4, 9)

The time complexity of the above solution is O(n.log(n)), which is better than the brute-force approach but is still costly for large input. The solution also modifies the input array, which might not be permitted.

Can we do better?

If we carefully analyze the above solution, we can see that it only uses the last three and the initial two sorted array elements. We can avoid that by finding the largest, second largest, third largest element, and the smallest, second smallest array element in linear time, as demonstrated below in TypeScript:

```ts
// Find a triplet having the maximum product in a list
const printTriplet = (A: number[]): void => {

    const n = A.length;

    if (n <= 2) {        // invalid input
        console.log('No triplet exists. The array has less than 3 elements.');
    }

    // 1. Find the index of the largest, second largest, and third largest
    // element in the list
    let max_index1 = 0;
    let max_index2 = -1;
    let max_index3 = -1;

    for (let i = 1; i < n; i++) {
        // if the current element is less than the largest element found so far
        if (A[i] > A[max_index1]) {
            max_index3 = max_index2;
            max_index2 = max_index1;
            max_index1 = i;
        }

        // if the current element is less than the second largest element
        // found so far
        else if (max_index2 === -1 || A[i] > A[max_index2]) {
            max_index3 = max_index2;
            max_index2 = i;
        }

        // if the current element is less than the third largest element
        // found so far
        else if (max_index3 === -1 || A[i] > A[max_index3]) {
            max_index3 = i;
        }
    }

    // 2. Find the index of the smallest and second smallest element in the list
    let min_index1 = 0;
    let min_index2 = -1;
    for (let i = 1; i < n; i++) {
        // if the current element is more than the smallest element found so far
        if (A[i] < A[min_index1]) {
            min_index2 = min_index1;
            min_index1 = i;
        }

        // if the current element is more than the second smallest element
        // found so far
        else if (min_index2 === -1 || A[i] < A[min_index2]) {
            min_index2 = i;
        }
    }

    if (A[max_index1] * A[max_index2] * A[max_index3] >
            A[min_index1] * A[min_index2] * A[max_index1]) {
        console.log(`Triplet is (${A[max_index1]}, ${A[max_index2]}, ${A[max_index3]})`);
    } else {
        console.log(`Triplet is (${A[min_index1]}, ${A[min_index2]}, ${A[max_index1]})`);
    }
};

const A = [-4, 1, -8, 9, 6];
printTriplet(A);
```

**Output:** Triplet is (-8, -4, 9)
