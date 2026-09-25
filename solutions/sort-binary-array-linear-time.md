# Sort binary array in linear time

> Source: https://www.techiedelight.com/sort-binary-array-linear-time/

Given a binary array, sort it in linear time and constant space. The output should print all zeros, followed by all ones.

For example,

**Input:** { 1, 0, 1, 0, 1, 0, 0, 1 } **Output:** { 0, 0, 0, 0, 1, 1, 1, 1 }

> 

A simple solution would be to count the total number of 0’s present in the array, say `k`, and fill the first `k` indices in the array by 0 and all remaining indices by 1.

Alternatively, we can count the total number of 1’s present in the array `k` and fill the last `k` indices in the array by 1 and all remaining indices by 0. This approach is demonstrated below in TypeScript:

```ts
// Function to sort a binary array in linear time
function sort(A: number[]): void {

    // count number of 0's
    let zeros = A.filter(x => x === 0).length;

    // put 0's at the beginning
    let k = 0;
    while (zeros) {
        A[k] = 0;
        zeros = zeros - 1;
        k = k + 1;
    }

    // fill all remaining elements by 1
    for (let i = k; i < A.length; i++) {
        A[i] = 1;
    }
}

const A = [0, 0, 1, 0, 1, 1, 0, 1, 0, 0];

sort(A);

// print the rearranged array
console.log(A);
```

**Output:** [0, 0, 0, 0, 0, 0, 1, 1, 1, 1]

The time complexity of the above solution is O(n) and doesn’t require any extra space, where `n` is the size of the input.

Instead of counting the total number of zeros, if the current element is 0, we can place 0 at the next available position in the array. After all elements in the array are processed, we fill all remaining indices by 1. Following is a TypeScript program that demonstrates it:

```ts
// Function to sort a binary array in linear time
function sort(A: number[]): void {

    // `k` stores index of next available position
    let k = 0;

    // do for each element
    for (let i = 0; i < A.length; i++) {
        // if the current element is zero, put 0 at the next free
        // position in the array
        if (A[i] === 0) {
            A[k++] = 0;
        }
    }

    // fill all remaining indices by 1
    for (let i = k; i < A.length; i++) {
        A[k++] = 1;
    }
}

const A = [0, 0, 1, 0, 1, 1, 0, 1, 0, 0];

sort(A);

// print the rearranged array
console.log(A);
```

**Output:** [0, 0, 0, 0, 0, 0, 1, 1, 1, 1]

The time complexity of the above solution is O(n) and doesn’t require any extra space, where `n` is the size of the input.

We can also solve this problem in linear time by using the [partitioning logic of Quicksort](https://techiedelight.com/quicksort/). The idea is to use 1 as a pivot element and make one pass of the partition process. The resultant array will be sorted. The implementation can be seen below in TypeScript:

```ts
// Utility function to swap elements `A[i]` and `A[j]` in an array
function swap(A: number[], i: number, j: number): void {
    [A[i], A[j]] = [A[j], A[i]];
}

// Function to sort a binary array in linear time
function partition(A: number[]): void {
    const pivot = 1;
    let j = 0;

    // each time we encounter a 0, `j` is incremented, and
    // 0 is placed before the pivot
    for (let i = 0; i < A.length; i++) {
        if (A[i] < pivot) {
            swap(A, i, j);
            j++;
        }
    }
}

const A = [1, 0, 0, 0, 1, 0, 1, 1];

partition(A);

// print the rearranged array
console.log(A);
```

**Output:** [0, 0, 0, 0, 1, 1, 1, 1]
