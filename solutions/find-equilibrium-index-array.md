# Find equilibrium index of an array

> Source: https://www.techiedelight.com/find-equilibrium-index-array/

[Array](https://www.techiedelight.com/Category/Array/)

Given an integer array, find the equilibrium index in it.

For an array `A` consisting `n` elements, index `i` is an equilibrium index if the sum of elements of subarray `A[0…i-1]` is equal to the sum of elements of subarray `A[i+1…n-1]`. i.e.

`(A[0] + A[1] + … + A[i-1]) = (A[i+1] + A[i+2] + … + A[n-1])`, where `0 < i < n-1`

Similarly, 0 is an equilibrium index if `A[1] + A[2] + … + A[n-1]` sums to 0 and `n-1` is an equilibrium index if `A[0] + A[1] + … + A[n-2]` sums to 0.

To illustrate, consider the array `{0, -3, 5, -4, -2, 3, 1, 0}`. The equilibrium index is found at index 0, 3, and 7.

> 

A naive solution would be to calculate the sum of elements to the left and the sum of elements to each array element’s right. If the left subarray sum is the same as the right subarray sum for an element, print its index. The time complexity of this solution is O(n2), where `n` is the size of the input.

## 1\. Linear-time Solution

We can solve this problem in linear time by using extra space. The idea is to create an auxiliary array `left[]`, where `left[i]` stores a sum of elements of the subarray `A[0…i-1]`. After `left[]` is filled, traverse the array from right to left and update them right subarray sum for each element encountered. Now, if the sum of elements of the left subarray `A[0…i-1]` is equal to the sum of elements of the right subarray `A[i+1…n)` for element `A[i]`, we have found the equilibrium index at `i`.

Following is an implementation of the above approach in TypeScript:

```ts
// Function to find the equilibrium index of an array
function findEquilibriumIndex(A: number[]): void {

    // `left[i]` stores the sum of elements of subarray `A[0…i-1]`
    const left: number[] = new Array(A.length).fill(0);

    // traverse the array from left to right
    for (let i = 1; i < A.length; i++) {
        left[i] = left[i - 1] + A[i - 1];
    }

    // `right` stores the sum of elements of subarray `A[i+1…n)`
    let right = 0;

    // maintain a list of indices
    const indices: number[] = [];

    // traverse the array from right to left
    for (let i = A.length - 1; i >= 0; i--) {

        /* if the sum of elements of subarray `A[0…i-1]` is equal to
           the sum of elements of subarray `A[i+1…n)` i.e.
           `(A[0] + … + A[i-1]) = (A[i+1] + A[i+2] + … + A[n-1])` */

        if (left[i] === right) {
            indices.push(i);
        }

        // new right is `A[i] + (A[i+1] + A[i+2] + … + A[n-1])`
        right += A[i];
    }

    console.log(`Equilibrium Index found at ${indices}`);
}

const A = [0, -3, 5, -4, -2, 3, 1, 0];

findEquilibriumIndex(A);
```

**Output:** Equilibrium Index found at 7 Equilibrium Index found at 3 Equilibrium Index found at 0

The time complexity of the above solution is O(n) and requires O(n) extra space.

## 2\. Optimized Solution

We can avoid using extra space. The idea is to calculate the sum of all the array elements. Then start from the last item of the array and maintain the right subarray sum. We can calculate the left subarray sum in constant time by subtracting the right subarray sum and current element from the total sum, i.e.,

Sum of left subarray A[0…i-1] = total – (A[i] + sum of right subarray A[i+1…n-1])

Following is an implementation of the above approach in TypeScript:

```ts
// Optimized method to find the equilibrium index of an array
function findEquilibriumIndex(A: number[]): void {

    // `total` stores the sum of all the array elements
    const total = A.reduce((x, y) => x + y, 0);

    // `right` stores the sum of elements of subarray `A[i+1…n)`
    let right = 0;

    // maintain a list of indices
    const indices: number[] = [];

    // traverse the array from right to left
    for (let i = A.length - 1; i >= 0; i--) {

        /* `i` is an equilibrium index if the sum of elements of subarray
        `A[0…i-1]` is equal to the sum of elements of the subarray A[i+1…n),
        i.e., (A[0] + A[1] + … + A[i-1]) = (A[i+1] + A[i+2] + … + A[n-1]) */

        // sum of elements of the left subarray `A[0…i-1]` is
        // (total - (A[i] + right))
        if (right === total - (A[i] + right)) {
            indices.push(i);
        }

        // new right is `A[i] + (A[i+1] + A[i+2] + … + A[n-1])`
        right += A[i];
    }

    console.log(`Equilibrium Index found at ${indices}`);
}

const A = [0, -3, 5, -4, -2, 3, 1, 0];

findEquilibriumIndex(A);
```

**Output:** Equilibrium Index found 7 Equilibrium Index found 3 Equilibrium Index found 0

The time complexity of the above solution is O(n) and doesn’t require any extra space.

**Exercise:** Find an array element before which all the items are smaller and after which all are greater.
