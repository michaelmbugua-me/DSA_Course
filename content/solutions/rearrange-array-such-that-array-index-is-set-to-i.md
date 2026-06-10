# Rearrange array such that `A[A[i]]` is set to `i` for every element `A[i]`

> Source: https://www.techiedelight.com/rearrange-array-such-that-array-index-is-set-to-i/

[Array](https://www.techiedelight.com/Category/Array/)

Given an unsorted integer array `A` of size `n`, whose elements lie in the range 0 to `n-1`, rearrange the array such that `A[A[i]]` is set to `i` for every array element `A[i]`. Do this in linear time and without using any extra constant space.

For example,

**Input:** {1, 3, 4, 2, 0} **Output:** {4, 0, 3, 1, 2} **Explanation:** A[0] = 1, A[1] becomes 0 A[1] = 3, A[3] becomes 1 A[2] = 4, A[4] becomes 2 A[3] = 2, A[2] becomes 3 A[4] = 0, A[0] becomes 4

> 

A simple solution is to create an auxiliary array of size `n`, and for each element `A[i]` of the input array, set a value `i` at index `A[i]` in the auxiliary array. This approach is demonstrated below in TypeScript:

```ts
// Function to rearrange a list such that `A[A[i]]` is set to `i`
// for every element `A[i]`
function rearrange(A: number[]): void {

    // create an auxiliary array of the same size as `A[]`
    const aux: number[] = new Array(A.length).fill(null);

    // for each element `A[i]`, set value `i` at index `A[i]`
    // in the auxiliary array
    for (let i = 0; i < A.length; i++) {
        aux[A[i]] = i;
    }

    // update original array with auxiliary array elements
    for (let i = 0; i < A.length; i++) {
        A[i] = aux[i];
    }
    console.log(A);
}

const A = [1, 3, 4, 2, 0];
rearrange(A);
```

**Output:** [4, 0, 3, 1, 2]

The time complexity of the above solution is O(n) and requires O(n) extra space, where `n` is the size of the input.

The above solution uses extra space that violates the problem constraints. We can solve this problem without using any extra space by taking advantage of the fact that array elements lie in range 0 to `n-1`. For each element `A[i]` present in the array, increment value present at index `A[i] % n` by `i × n`. Finally, traverse the modified array and set `A[i] = A[i] / n`. For example, consider array `{1, 3, 4, 2, 0}`. After incrementing value present at index `A[i] % n` for each element `A[i]` by `i × n`, the array becomes:

`{1 + 5 × 4, 3, 4 + 5 × 3, 2 + 5 × 1, 0 + 5 × 2}` = `{21, 3, 19, 7, 10}`.

Now if we take `A[i] / n` for each index `i`, we get `{4, 0, 3, 1, 2}`. Following is a TypeScript implementation based on this idea:

```ts
// Function to rearrange a list such that `A[A[i]]` is set to `i`
// for every element `A[i]`
function rearrange(A: number[]): void {

    const n = A.length;

    // for each element `A[i]`, increment value present at index
    // `(A[i] % n)` by `i×n`
    for (let i = 0; i < n; i++) {
        A[A[i] % n] += i * n;
    }

    // traverse the modified list and set `A[i] = A[i] / n`
    for (let i = 0; i < n; i++) {
        A[i] = Math.floor(A[i] / n);
    }
}

const A = [1, 3, 4, 2, 0];

rearrange(A);
console.log(A);
```

**Output:** [4, 0, 3, 1, 2]

The time complexity of the above solution is O(n) and doesn’t require any extra space.
