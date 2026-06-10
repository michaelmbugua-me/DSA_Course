# Maximum Product Subset Problem

> Source: https://www.techiedelight.com/maximum-product-subset-problem/

Given an integer array, find the maximum product of its elements among all its subsets.

For example,

**Input:** nums[] = { -6, 4, -5, 8, -10, 0, 8 } **Output:** The maximum product of a subset is 15360 The subset with the maximum product of its elements is { -6, 4, 8, -10, 8 } **Input:** nums[] = { 4, -8, 0, 8 } **Output:** The maximum product of a subset is 32 The subset with the maximum product of its elements is { 4, 8 }

> 

## 1\. Brute-Force Solution

A naive solution is to [consider every subset](https://techiedelight.com/generate-power-set-given-set/) and find the product of their elements. Finally, return the maximum product found among all subsets. The implementation can be seen below in TypeScript:

```ts
// Function to generate the product of all elements in a given set
// and update maximum product found so far
function findMaxProduct(set: number[], maximum: number): number {

    let product = 1;

    for (const j of set) {
        product = product * j;
    }

    // if the set is not empty, then update the product
    if (set.length) {
        maximum = Math.max(maximum, product);
    }

    return maximum;
}

// Function to generate a power set of a given set `S`
function findPowerSet(S: number[], s: number[], n: number, maximum: number): number {

    // if we have considered all elements, we have generated a subset
    if (n === 0) {
        // compute its product of elements and update the maximum product found so far
        return findMaxProduct(s, maximum);
    }

    // consider the n'th element
    s.push(S[n - 1]);
    maximum = findPowerSet(S, s, n - 1, maximum);

    s.pop();            // backtrack

    // or don't consider the n'th element
    return findPowerSet(S, s, n - 1, maximum);
}

const S = [-6, 4, -5, 8, -10, 0, 8];
const n = S.length;

const s: number[] = [];
const maximum = findPowerSet(S, s, n, Number.NEGATIVE_INFINITY);

console.log(`The maximum product of a subset is ${maximum}`);
```

```ts
// Function to return the maximum product of a subset of a given array
function findMaxProduct(nums: number[], n: number): number {

    // base case
    if (n === 0) {
        return 0;
    }

    // if the array contains only one element
    if (n === 1) {
        return nums[0];
    }

    let product = 1;        // to store the maximum product subset

    // stores the negative element having a minimum absolute value in the set
    let abs_min_so_far = Number.MAX_SAFE_INTEGER;

    let negative = 0;       // maintain the count of negative elements in the set
    let positive = 0;       // maintain the count of positive elements in the set

    let contains_zero = false;

    // traverse the given array
    for (let i = 0; i < n; i++) {

        // if the current element is negative
        if (nums[i] < 0) {
            negative++;
            abs_min_so_far = Math.min(abs_min_so_far, Math.abs(nums[i]));
        }

        // if the current element is positive
        else if (nums[i] > 0) {
            positive++;
        }

        // if the current element is zero
        if (nums[i] === 0) {
            contains_zero = true;
        }
        else {
            product = product * nums[i];
        }
    }

    // if an odd number of negative elements are present, exclude the negative
    // element having a minimum absolute value from the subset
    if (negative & 1) {
        product = product / -abs_min_so_far;
    }

    // special case – set contains one negative element and one or more zeros
    if (negative === 1 && positive === 0 && contains_zero) {
        product = 0;
    }

    // special case – set contains all zeros
    if (negative === 0 && positive === 0 && contains_zero) {
        product = 0;
    }

    // return the maximum product
    return product;
}

const nums = [-6, 4, -5, 8, -10, 0, 8];
console.log(`The maximum product of a subset is ${findMaxProduct(nums, nums.length)}`);
```

**Output:** The maximum product of a subset is 15360

The time complexity of the above solution is O(n) and doesn’t require any extra space, where `n` is the size of the input.
