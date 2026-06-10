# Convert max heap to min heap in linear time

> Source: https://www.techiedelight.com/convert-max-heap-min-heap-linear-time/

Given an array representing a max-heap, [in-place](https://techiedelight.com/in-place-vs-out-of-place-algorithms/) convert it into the min-heap in linear time.

> 

The idea is simple and efficient and inspired by the [Heapsort algorithm](https://techiedelight.com/heap-sort-place-place-implementation-c-c/). The idea is to build the min-heap in-place using an array representing the max-heap. In other words, this is a trick question!! We should not be bothered about whether the given array is max-heap or not. The problem is the same as [building a min-heap from an unsorted array](https://techiedelight.com/min-heap-max-heap-implementation-c/).

This approach is demonstrated below in TypeScript:

```ts
// return the left child of `A[i]`
const LEFT = (i: number): number => 2 * i + 1;

// return the right child of `A[i]`
const RIGHT = (i: number): number => 2 * i + 2;

// Recursive function to implement the heapify-down algorithm.
// The node at index `i` and its two direct children
// violates the heap property
function heapify(A: number[], i: number, size: number): void {
    // get the left and right child of node at index `i`
    const left = LEFT(i);
    const right = RIGHT(i);

    let smallest = i;

    // compare `A[i]` with its left and right child
    // and find the smallest value
    if (left < size && A[left] < A[i]) {
        smallest = left;
    }

    if (right < size && A[right] < A[smallest]) {
        smallest = right;
    }

    // swap with a child having lesser value and
    // call heapify-down on the child
    if (smallest !== i) {
        swap(A, i, smallest);
        heapify(A, smallest, size);
    }
}

// Utility function to swap two indices in an array
function swap(A: number[], i: number, j: number): void {
    const temp = A[i];
    A[i] = A[j];
    A[j] = temp;
}

// Function to convert a max-heap into a min-heap
function convertToMinHeap(A: number[]): void {
    // Build-Heap: Call heapify starting from the last internal
    // node all the way up to the root node
    let i = Math.floor((A.length - 2) / 2);
    while (i >= 0) {
        heapify(A, i, A.length);
        i = i - 1;
    }
}

/*
           9
         /   \
        /     \
       4       7
      / \     / \
     /   \   /   \
    1    -2 6     5

*/

// an array representing the max-heap
const A = [9, 4, 7, 1, -2, 6, 5];

// convert the max-heap into a min-heap
convertToMinHeap(A);

// print the min-heap
/*
           -2
         /    \
        /      \
       1        5
      / \      / \
     /   \    /   \
    9     4  6     7
*/

console.log(A.join(' '));
```

**Output:** -2 1 5 9 4 6 7

The time complexity of the above solution is the same as the building of a heap, i.e., O(n) for an input containing `n` items. It also requires O(n) implicit space for the call stack.

**Exercise:** [Convert min-heap into max-heap in O(n) time](https://techiedelight.com/convert-min-heap-to-max-heap-linear-time/)

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.86/5. Vote count: 162

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Easy](https://www.techiedelight.com/Tags/easy/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
