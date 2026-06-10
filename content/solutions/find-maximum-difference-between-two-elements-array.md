# Find the maximum difference between two array elements that satisfies the given constraints

> Source: https://www.techiedelight.com/find-maximum-difference-between-two-elements-array/

[Array](https://www.techiedelight.com/Category/Array/)

Given an integer array, find the maximum difference between two elements in it such that the smaller element appears before the larger element.

For example,

**Input:** { 2, 7, 9, 5, 1, 3, 5 } **Output:** The maximum difference is 7. The pair is (2, 9)

> 

A naive solution is to consider every pair present in the array and keep track of the maximum difference found so far. Following is a TypeScript program that demonstrates it:

```ts
// Naive function to find the maximum difference between two elements in
// a list such that the smaller element appears before the larger element
function getMaxDiff(A: number[]): number {

    let diff = Number.MIN_SAFE_INTEGER;

    const n = A.length;
    if (n === 0) {
        return diff;
    }

    for (let i = 0; i < n - 1; i++) {
        for (let j = i + 1; j < n; j++) {
            if (A[j] > A[i]) {
                diff = Math.max(diff, A[j] - A[i]);
            }
        }
    }

    return diff;
}

const A = [2, 7, 9, 5, 1, 3, 5];

const diff = getMaxDiff(A);
if (diff !== Number.MIN_SAFE_INTEGER) {
    console.log('The maximum difference is', diff);
}
```

**Output:** The maximum difference is 7

The time complexity of the above solution is O(n2) and doesn’t require any extra space, where `n` is the size of the input.

We can solve this problem in linear time. The idea is to traverse the array from the right and keep track of the maximum difference found so far. If the current element is less than the maximum element found so far and their difference is more than the maximum difference found so far, update the maximum difference with the current difference.

The algorithm can be implemented as follows in TypeScript:

```ts
// Function to calculate the maximum difference between two elements in a
// list such that a smaller element appears before a larger element
function getMaxDiff(A: number[]): number {

    let diff = Number.MIN_SAFE_INTEGER;
    const n = A.length;
    if (n === 0) {
        return diff;
    }

    let max_so_far = A[n - 1];

    // traverse the list from the right and keep track of the maximum element
    for (let i = n - 2; i >= 0; i--) {

        // update `max_so_far` if the current element is greater than the
        // maximum element
        if (A[i] >= max_so_far) {
            max_so_far = A[i];
        }

        // if the current element is less than the maximum element,
        // then update the difference if required
        else {
            diff = Math.max(diff, max_so_far - A[i]);
        }
    }

    // return difference
    return diff;
}

const A = [2, 7, 9, 5, 1, 3, 5];
const diff = getMaxDiff(A);
if (diff !== Number.MIN_SAFE_INTEGER) {
    console.log('The maximum difference is', diff);
}
```

The time complexity of the above solution is O(n) and doesn’t require any extra space. The primary application of this problem is calculating the maximum profit by buying and selling a share at most once.

**Exercise:** Extend the second solution to print pair having maximum difference.
