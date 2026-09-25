# Find the maximum product of two integers in an array

> Source: https://www.techiedelight.com/find-maximum-product-two-integers-array/

Given an integer array, find the maximum product of two integers in it.

For example, consider array `{-10, -3, 5, 6, -2}`. The maximum product is the `(-10, -3)` or `(5, 6)` pair.

> 

A naive solution is to consider every pair of elements and calculate their product. Update the maximum product found so far if the product of the current pair is greater. Finally, print the elements involved in the maximum product. This is demonstrated below in TypeScript:

**Output:** Pair is (-10, -3)

```ts
// A naive solution to finding the maximum product of two integers in an array
function findMaximumProduct(A: number[]): void {

    // base case
    if (A.length < 2) {
        return;
    }

    let max_product = -Infinity;
    let max_i = -1, max_j = -1;

    // consider every pair of elements
    for (let i = 0; i < A.length - 1; i++) {
        for (let j = i + 1; j < A.length; j++) {
            // update the maximum product if required
            if (max_product < A[i] * A[j]) {
                max_product = A[i] * A[j];
                [max_i, max_j] = [i, j];
            }
        }
    }

    console.log(`Pair is (${A[max_i]}, ${A[max_j]})`);
}

const A = [-10, -3, 5, 6, -2];
findMaximumProduct(A);
```

The time complexity of the above solution is O(n2) and doesn’t require any extra space, where `n` is the size of the input.

The time complexity can be improved by sorting the array. Then the result is the maximum of the following:

  1. The product of maximum and second maximum integer in the array (i.e., the last two elements in a sorted array).
  2. The product of minimum and second minimum integers in the array (i.e., the first two elements in the sorted array).

Following is a TypeScript implementation of the above algorithm:

**Output:** Pair is (-20, -10)

```ts
// Function to find the maximum product of two integers in an array
function findMaximumProduct(A: number[]): void {

    // `n` is the length of the array
    const n = A.length;

    // base case
    if (n < 2) {
        return;
    }

    // sort array in ascending order
    A.sort((x, y) => x - y);

    // choose the maximum of the following:
    // 1. Product of the first two elements or
    // 2. Product of the last two elements.

    if ((A[0] * A[1]) > (A[n - 1] * A[n - 2])) {
        console.log(`Pair is (${A[0]}, ${A[1]})`);
    } else {
        console.log(`Pair is (${A[n - 1]}, ${A[n - 2]})`);
    }
}

const A = [-10, -3, 5, 6, -20];

findMaximumProduct(A);
```

The time complexity of the above solution is O(n.log(n)) and doesn’t require any extra space.

We can solve this problem in linear time as we need the only maximum, second maximum, minimum, and second minimum elements to solve this problem. We can compute all these in only a single traversal of the array, which accounts for O(n) time complexity. This approach is demonstrated below in TypeScript:

```ts
// Function to find the maximum product of two integers in an array
function findMaximumProduct(arr: number[]): void {
    const n = arr.length;

    // for storing the maximum and second maximum element in an array
    let max1 = arr[0], max2 = -Infinity;

    // for storing the minimum and second minimum element in an array
    let min1 = arr[0], min2 = Infinity;

    for (let i = 1; i < n; i++)
    {
        // if the current element is more than the maximum element,
        // update the maximum and second maximum element
        if (arr[i] > max1)
        {
            max2 = max1;
            max1 = arr[i];
        }

        // if the current element is less than the maximum but greater than the
        // second maximum element, update the second maximum element
        else if (arr[i] > max2) {
            max2 = arr[i];
        }

        // if the current element is less than the minimum element,
        // update the minimum and the second minimum
        if (arr[i] < min1)
        {
            min2 = min1;
            min1 = arr[i];
        }

        // if the current element is more than the minimum but less than the
        // second minimum element, update the second minimum element
        else if (arr[i] < min2) {
            min2 = arr[i];
        }

        // otherwise, ignore the element
    }

    // choose the maximum of the following:
    // 1. Product of the maximum and second maximum element or
    // 2. Product of the minimum and second minimum element
    if (max1 * max2 > min1 * min2) {
        console.log(`Pair is (${max1}, ${max2})`);
    }
    else {
        console.log(`Pair is (${min1}, ${min2})`);
    }
}

const arr = [-10, -3, 5, 6, -2];

findMaximumProduct(arr);
```

**Output:** Pair is (-10, -3)
