# Replace every array element with the product of every other element without using a division operator

> Source: https://www.techiedelight.com/replace-element-array-product-every-element-without-using-division-operator/

[Array](https://www.techiedelight.com/Category/Array/)

Given an integer array, replace each element with the product of every other element without using the division operator.

For example,

**Input:** { 1, 2, 3, 4, 5 } **Output:** { 120, 60, 40, 30, 24 } **Input:** { 5, 3, 4, 2, 6, 8 } **Output:** { 1152, 1920, 1440, 2880, 960, 720 }

> 

A naive solution would be to calculate the product of all elements in the left and right subarray for each array element. The time complexity of this approach is O(n2), where `n` is the size of the input.

We can solve this problem in linear time by using two auxiliary arrays, `left[]` and `right[]`, where `left[i]` stores the product of all elements in subarray `A[0…i-1]` and `right[i]` stores the product of all elements in subarray `A[i+1…n-1]`. Now for each element `A[i]`, replace it with the product of its left-subarray and right-subarray (i.e., `A[i] = left[i] × right[i])`.

The algorithm can be implemented as follows in TypeScript:

```ts
// Function to replace each array element with every other
// element's product without using the division operator
function findProduct(A: number[]): void {
    // get length of the array
    const n = A.length;

    // base case
    if (n === 0) {
        return;
    }

    // use two auxiliary arrays
    const left: number[] = new Array(n);
    const right: number[] = new Array(n);

    // `left[i]` stores the product of all elements in subarray[0…i-1]
    left[0] = 1;
    for (let i = 1; i < n; i++) {
        left[i] = A[i - 1] * left[i - 1];
    }

    // `right[i]` stores the product of all elements in subarray[i+1…n-1]
    right[n - 1] = 1;
    for (let j = n - 2; j >= 0; j--) {
        right[j] = A[j + 1] * right[j + 1];
    }

    // replace each element with the product of its left and right subarray
    for (let i = 0; i < n; i++) {
        A[i] = left[i] * right[i];
    }
}

const A = [5, 3, 4, 2, 6, 8];

findProduct(A);

// print the modified array
console.log(A);
```

**Output:** 1152 1920 1440 2880 960 720



The time complexity of the above solution is O(n) and requires O(n) extra space.

We can use [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/) to solve this problem in linear time and constant space. The idea is to recursively calculate all elements’ products in the right subarray and pass the left-subarray product in [function arguments](https://techiedelight.com/difference-between-argument-parameter/#Argument). Following is a TypeScript program that demonstrates it:

```ts
// Recursive function to replace each element in the array with the product
// of every other element without using the division operator
function findProduct(A: number[], n: number, left: number, i: number): number {
    // base case: no elements left on the right
    if (i === n) {
        return 1;
    }

    // take backup of the current element
    const curr = A[i];

    // calculate the product of the right subarray
    const right = findProduct(A, n, left * A[i], i + 1);

    // replace the current element with the product of the left and right subarray
    A[i] = left * right;

    // return product of right the subarray, including the current element
    return curr * right;
}

const A = [5, 3, 4, 2, 6, 8];

findProduct(A, A.length, 1, 0);

// print the modified array
console.log(A);
```

**Output:** 1152 1920 1440 2880 960 720



The time complexity of the above solution is O(n) and requires O(n) implicit space for the call stack.
