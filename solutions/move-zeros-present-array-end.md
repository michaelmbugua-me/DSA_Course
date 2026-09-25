# Move all zeros present in an array to the end

> Source: https://www.techiedelight.com/move-zeros-present-array-end/

Given an integer array, move all zeros present in it to the end. The solution should maintain the relative order of items in the array and should not use constant space.

For example,

**Input:** { 6, 0, 8, 2, 3, 0, 4, 0, 1 } **Output:** { 6, 8, 2, 3, 4, 1, 0, 0, 0 }

> 

The idea is simple – if the current element is non-zero, place the element at the next available position in the array. After all elements in the array are processed, fill all remaining indices by 0. This approach is demonstrated below in TypeScript:

```ts
// Function to move all zeros present in the array to the end
function reorder(A: number[]): void {

    // `k` stores the index of the next available position
    let k = 0;

    // do for each element
    for (const i of A) {
        // if the current element is non-zero, put the element at the
        // next free position in the array
        if (i !== 0) {
            A[k++] = i;
        }
    }

    // move all 0's to the end of the array (remaining indices)
    for (let i = k; i < A.length; i++) {
        A[i] = 0;
    }
}

const A = [6, 0, 8, 2, 3, 0, 4, 0, 1];

reorder(A);
console.log(A);
```

**Output:** 6 8 2 3 4 1 0 0 0

The time complexity of the above solution is O(n), where `n` is the size of the input.

## Using partitioning logic of Quicksort

We can also solve this problem in one scan of the array by modifying [Quicksort’s partitioning logic](https://techiedelight.com/quicksort/). The idea is to use 0 as a pivot element and make one pass of the partition process. The partitioning logic reads all elements and swap every non-pivot element with the first occurrence of the pivot.

Following is the implementation in TypeScript based on the above idea:

```ts
function swap(A: number[], i: number, j: number): void {
    const temp = A[i];
    A[i] = A[j];
    A[j] = temp;
}

// Function to move all zeros present in the array to the end
function partition(A: number[]): void {
    let j = 0;

    // each time we encounter a non-zero, `j` is incremented, and
    // the element is placed before the pivot
    for (let i = 0; i < A.length; i++) {
        if (A[i] !== 0) {       // pivot is 0
            swap(A, i, j);
            j++;
        }
    }
}

const A = [6, 0, 8, 2, 3, 0, 4, 0, 1];

partition(A);
console.log(A);
```

**Output:** 6 8 2 3 4 1 0 0 0

The time complexity of the above solution is O(n), where `n` is the size of the input.

**Exercise:** Modify the solution so that all `1's` would come first.
