# Check if an array represents a min-heap or not

> Source: https://www.techiedelight.com/check-given-array-represents-min-heap-not/

Given an integer array, check if it represents [min-heap](https://techiedelight.com/introduction-priority-queues-using-binary-heaps/#Heap) or not.

For example, the first array represents a min-heap, but the second array isn’t as it violate the heap property.

> 

Since the input is an array, the heap’s structural property (_all levels except the last level are full_) cannot be violated. We only have to worry about the Min Heap Property (_the priority of a node is at least as large as that of its parent_) for a given problem.

Since array indexing begins from `0`, for a given index `i` of an array of size `n`, if `2×i + 2 > n` is true then `A[i]` represents a leaf node. Otherwise, when `2×i + 2 <= n` is true, `A[i]` represents internal heap node.

For instance, consider array `[2, 3, 4, 5, 10, 15]` of size `n = 6`. Here, `[2, 3, 4]` are internal nodes as `2×i + 2 <= 6` is true and `[5, 10, 15]` are leaf nodes as `2×i + 2 > 6` is true.

Now that we know how to differentiate between a leaf node and an internal node based on the given array index and the total number of nodes, let’s return to the given problem.

## Recursive Solution

We can efficiently solve this problem by using [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/). The idea is to start from the root node (at index 0) and check if the left and right child (if any) of the root node is greater than the root node or not. If true, recursively call the procedure for both its children; otherwise, return false from the function. Following is the complete algorithm:

  * If the current node is a leaf node, return true as every leaf node is a heap.
  * If the current node is an internal node,
    * Recursively check if the left child is min-heap or not.
    * Recursively check if the right child is min-heap or not (if it exists).
    * Return true if both left and right child are min-heap; otherwise, return false.

The algorithm can be implemented as follows in TypeScript:

```ts
// Function to check if the given list represents min-heap or not
const checkMinHeap = (A: number[], i: number): boolean => {

    // if `i` is a leaf node, return true as every leaf node is a heap
    if (2 * i + 2 > A.length) {
        return true;
    }

    // if `i` is an internal node

    // recursively check if the left child is a heap
    const left = (A[i] <= A[2 * i + 1]) && checkMinHeap(A, 2 * i + 1);

    // recursively check if the right child is a heap (to avoid the list index out
    // of bounds, first check if the right child exists or not)
    const right = (2 * i + 2 === A.length) ||
            (A[i] <= A[2 * i + 2] && checkMinHeap(A, 2 * i + 2));

    // return true if both left and right child are heaps
    return left && right;
};

const A = [1, 2, 3, 4, 5, 6];

// start with index 0 (the root of the heap)
const index = 0;

if (checkMinHeap(A, index)) {
    console.log('The given list is a min-heap');
}
else {
    console.log('The given list is not a min-heap');
}
```

**Output:** The given array is a min-heap

## Iterative Solution

As recursion is costly, we can easily convert the above recursive function into an iterative one. The implementation can be seen below in TypeScript:

```ts
// Iterative function to check if a given list represents a min-heap or not
const checkMinHeap = (A: number[]): boolean => {

    // base case
    if (A.length <= 1) {
        return true;
    }

    // check for all internal nodes that their left child and
    // right child (if present) holds min-heap property or not

    // start with index 0 (the root of the heap)
    for (let i = 0; i <= Math.floor((A.length - 2) / 2); i++) {
        if (A[i] > A[2 * i + 1] || (2 * i + 2 !== A.length && A[i] > A[2 * i + 2])) {
            return false;
        }
    }

    return true;
};

const A = [1, 2, 3, 4, 5, 6];

if (checkMinHeap(A)) {
    console.log('The given list is a min-heap');
}
else {
    console.log('The given list is not a min-heap');
}
```

**Output:** The given array is a min-heap

The time complexity of the above solution is O(n) and doesn’t require any extra space, where `n` is the size of the input.

**Exercise:** Given an integer array, check if it represents max-heap or not.
