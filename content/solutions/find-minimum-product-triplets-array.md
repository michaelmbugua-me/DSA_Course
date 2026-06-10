# Find minimum product among all combinations of triplets in an array

> Source: https://www.techiedelight.com/find-minimum-product-triplets-array/

Given an integer array, find the minimum product among all combinations of triplets in the array.

For example,

**Input:** { 4, -1, 3, 5, 9 } **Output:** The minimum product is -45 (-1, 5, 9) **Input:** { 1, 4, 10, -2, 4 } **Output:** The minimum product is -80 (10, 4, -2) **Input:** { 3, 4, 1, 2, 5 } **Output:** The minimum product is 6 (3, 1, 2)

> 

A naive solution would be to consider every combination of triplets present in the array and calculate their product. The idea is to maintain the maximum product found so far in a variable and update it if the product of the current triplet is greater. The implementation can be seen [here](https://techiedelight.com/compiler/?run=pTN62Q) and runs in O(n3) time, where `n` is the size of the input.

## 1\. Using Sorting

A better approach, that takes O(n.log(n)) time, is to [sort the array](https://techiedelight.com/sort-array-ascending-order-cpp/) and return the minimum among its first three elements and the product of the first element with its last two items. This logic works as the multiplication of two negative numbers results in a positive number. The multiplication of a large positive number with a negative number results in a large negative number.

Following is the implementation of the above approach in TypeScript:

```ts
// Find the minimum product among all combinations of triplets in an array
const findMinTripletProduct = (A: number[]): number => {

    const n = A.length;
    if (n <= 2) {
        return Number.MAX_SAFE_INTEGER;
    }

    // sort the given array in a natural order
    A.sort((a, b) => a - b);

    // consider the minimum among the product of the first three elements and
    // the product of the first element with the last two
    return Math.min(A[n - 1] * A[n - 2] * A[0], A[0] * A[1] * A[2]);
};

const A = [4, -1, 3, 5, 9];

const min = findMinTripletProduct(A);

if (min === Number.MAX_SAFE_INTEGER) {
    console.log('No triplet exists since the list has less than 3 elements');
}
else {
    console.log(`The minimum product is ${min}`);
}
```

**Output:** The minimum product is -45

## 2\. Linear time solution

The following approach runs in O(n) time but takes O(n) extra space. The idea is to take the help of four auxiliary arrays, `left_min[]`, `left_max[]`, `right_min[]`, and `right_max[]` of the same size as the input array, where:

  * `left_min[i]` contains the minimum element to the left of `A[i]`.
  * `left_max[i]` contains the maximum element to the left of `A[i]`.
  * `right_min[i]` contains the minimum element to the right of `A[i]`.
  * `right_max[i]` contains the maximum element to the right of `A[i]`.

After the arrays’ construction, we can get minimum and maximum elements on the left or right side for any array index in constant time. So, consider every array element as the middle element of the triplet, except the first and last element, and find the minimum by considering all possible combinations. This approach is demonstrated below in TypeScript:

```ts
// Find the minimum product among all combinations of triplets in an array
const findMinTripletProduct = (A: number[]): number => {

    // get array size
    const n = A.length;

    // Take four auxiliary arrays of size `n`

    // `left_min[i]` contains the minimum element to the left of `A[i]`
    const left_min: number[] = new Array(n);

    // `left_max[i]` contains the maximum element to the left of `A[i]`
    const left_max: number[] = new Array(n);

    // `right_min[i]` contains the minimum element to the right of `A[i]`
    const right_min: number[] = new Array(n);

    // `right_max[i]` contains the maximum element to the right of `A[i]`
    const right_max: number[] = new Array(n);

    // fill `left_min` and `left_max`
    let min_so_far = Number.MAX_SAFE_INTEGER;
    let max_so_far = Number.MIN_SAFE_INTEGER;

    for (let i = 0; i < n; i++) {
        left_min[i] = min_so_far;
        left_max[i] = max_so_far;

        min_so_far = Math.min(min_so_far, A[i]);
        max_so_far = Math.max(max_so_far, A[i]);
    }

    // fill `right_min` and `right_max`
    min_so_far = Number.MAX_SAFE_INTEGER;
    max_so_far = Number.MIN_SAFE_INTEGER;

    for (let i = n - 1; i >= 0; i--) {
        right_min[i] = min_so_far;
        right_max[i] = max_so_far;

        min_so_far = Math.min(min_so_far, A[i]);
        max_so_far = Math.max(max_so_far, A[i]);
    }

    // consider each array element (except first and last) as the triplet's
    // middle element and find the minimum by considering all combinations
    let result = Number.MAX_SAFE_INTEGER;
    for (let i = 1; i < n - 1; i++) {
        result = Math.min(result, Math.min(A[i] * left_min[i] * right_min[i],
                                A[i] * left_min[i] * right_max[i],
                                A[i] * left_max[i] * right_min[i],
                                A[i] * left_max[i] * right_max[i]));
    }

    return result;
};

const A = [4, -1, 3, 5, 9];

const min = findMinTripletProduct(A);

console.log(`The minimum product is ${min}`);
```

**Output:** The minimum product is -45

## 3\. Linear time and constant space solution

We have seen that the sorting solution only uses the first three and last two array elements but sorts the whole array, which modifies the input array and is also costly for large inputs. This can be avoided by finding the smallest, the second smallest, and the third smallest element, along with the largest and the second largest array element in linear time. Then like the sorting solution, return the minimum among the product of the smallest, second smallest, third smallest elements in the array and product of the smallest, largest, second largest elements in the array.

Following is the TypeScript program that demonstrates it:

```ts
// Find the minimum product among all combinations of triplets in an array
const findMinTripletProduct = (A: number[]): number => {
    const n = A.length;

    // explicitly handle the wrong input
    if (n <= 2) {
        return Number.MAX_SAFE_INTEGER;
    }

    // 1. Find the smallest, second smallest, and third smallest element
    // in the array
    let min1 = A[0], min2 = Number.MAX_SAFE_INTEGER, min3 = Number.MAX_SAFE_INTEGER;
    for (let i = 1; i < n; i++)
    {
        // if the current element is less than the smallest element found so far
        if (A[i] < min1)
        {
            min3 = min2;
            min2 = min1;
            min1 = A[i];
        }
        // if the current element is less than the second smallest element
        else if (A[i] < min2)
        {
            min3 = min2;
            min2 = A[i];
        }
        // if the current element is less than the third smallest element
        else if (A[i] < min3) {
            min3 = A[i];
        }
    }

    // 2. Find the largest and second largest array element
    let max1 = A[0], max2 = Number.MIN_SAFE_INTEGER;
    for (let i = 1; i < n; i++)
    {
        // if the current element is more than the largest element found so far
        if (A[i] > max1)
        {
            max2 = max1;
            max1 = A[i];
        }
        // if the current element is more than the second largest element
        else if (A[i] > max2) {
            max2 = A[i];
        }
    }

    return Math.min(min1 * min2 * min3, max1 * max2 * min1);
};

const A = [4, -1, 3, 5, 9];

const min = findMinTripletProduct(A);

if (min === Number.MAX_SAFE_INTEGER) {
    console.log('No triplet exists since the array has less than 3 elements');
}
else {
    console.log(`The minimum product is ${min}`);
}
```

**Output:** The minimum product is -45
