# Efficiently calculate the frequency of all elements present in a limited range array

> Source: https://www.techiedelight.com/calculate-frequency-elements-present-array-specified-range/

[Array](https://www.techiedelight.com/Category/Array/)

Given an unsorted integer array whose elements lie in the range 0 to `n-1` where `n` is the array size, calculate the frequency of all array elements in linear time and using constant space.

For example,

**Input:** { 2, 3, 3, 2, 1 } **Output:** Element 1 appears once. Element 2 appears twice. Element 3 appears twice.

> 

A simple solution is to use a count array. We traverse through the given array and update the frequency of each element in the count array. Finally, after all the array elements are processed, iterate through the count array to print frequencies. We can also use a map instead of a count array but using a map does not take advantage of the fact that array elements lie between 0 and `n-1`.

Following is a TypeScript implementation based on the above idea:

```ts
// Function to calculate the frequency of all the list elements
const findFrequency = (A: number[]): void => {

    // create a count list of size `n` to store the count of all list elements
    const freq: number[] = new Array(A.length).fill(0);

    // update frequency of each element
    for (const e of A) {
        freq[e] = freq[e] + 1;
    }

    // iterate through the list to print frequencies
    for (let i = 0; i < A.length; i++) {
        if (freq[i] > 0) {
            console.log(`${i} appears ${freq[i]} times`);
        }
    }
};

const A = [2, 3, 3, 2, 1];
findFrequency(A);
```

**Output:** Element 1 appears 1 times Element 2 appears 2 times Element 3 appears 2 times

The time complexity of the above solution is O(n) and requires O(n) extra space, where `n` is the size of the input.

We can also solve this problem without using any extra space by taking advantage of the fact that array elements lie in range 0 to `n-1`. For each element `A[i]` present in the array, increment the value present at index `(A[i] % n)` by `n`. Then, traverse the modified array, and if `A[i]` is more than or equal to `n`, then `i` appears in array `(A[i]/n)` times.

For example, consider array `{2, 3, 3, 2, 1}`. After incrementing value present at index `(A[i] % n)` for each element `A[i]` by `n`, the array becomes `{2, 8, 13, 12, 1}`. Now if we take `(arr[i]/n)` for each array index `i`, we get `{0, 1, 2, 2, 0}`. Here, `A[i]` denotes the frequency of index `i`.

The algorithm can be implemented as follows in TypeScript:

```ts
// Function to calculate the frequency of all the list elements
// in linear time and without extra space
const findFrequency = (A: number[]): void => {

    const n = A.length;

    // For each element `A[i]`, increment the value present at index
    // `(A[i] % n)` by `n`
    for (let i = 0; i < n; i++) {
        A[A[i] % n] += n;
    }

    // Traverse the modified list and print their frequencies.
    // If `A[i] > n`, then `i` appears in list `A[i]/n` times.
    for (let i = 0; i < n; i++) {
        if (Math.floor(A[i] / n)) {
            console.log(`${i} appears ${Math.floor(A[i] / n)} times`);
        }
    }

    // Restore the list
    for (let i = 0; i < n; i++) {
        A[i] = A[i] % n;
    }
};

const A = [2, 3, 3, 2, 1];
findFrequency(A);
```

**Output:** Element 1 appears 1 times Element 2 appears 2 times Element 3 appears 2 times

The time complexity of the above solution is O(n) and doesn’t require any extra space.

**Exercise:** Modify the program for array elements lying in range 1 to `n`.
