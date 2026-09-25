# Iterative Implementation of Quicksort

> Source: https://www.techiedelight.com/iterative-implementation-of-quicksort/

Write an iterative version of the recursive Quicksort algorithm.

In the [previous post](https://techiedelight.com/quicksort/), we have discussed the recursive implementation of the Quicksort algorithm. We have seen that the Quicksort recursion stack can be optimized using tail recursion to minimize the recursive depth. Tail recursion makes sure that at most O(log(n)) space is used by recursing first into the smaller side of the partition of size `n`, then using a tail call to recur into the other. Tail recursion should be recognized by the compiler and optimized to its iterative counterpart.

We have also talked about another recursive stack space optimization. The idea was that when the total number of elements in the subarray is below some threshold `k` (perhaps ten elements), switch to a non-recursive sorting algorithm such as [insertion sort](https://techiedelight.com/insertion-sort-iterative-recursive/) or stop processing the subarray and later perform insertion sort on it (in O(k.n) time), as each element will be at most `k` positions away from its final sorted position.

But despite these performance boosts, the algorithm remains recursive. How can we convert the algorithm into an iterative one? This post discusses its iterative implementation.

Instead of using recursion, the idea is to use a stack to store subarray’s starting and ending index for later processing. Note that the partitioning logic would remain the same.

> [Practice this algorithm](https://techiedelight.com/?problem=SortArray)

The iterative Quicksort implementation can be seen below in TypeScript:

```ts
function swap(A: number[], i: number, j: number): void {
    const temp = A[i];
    A[i] = A[j];
    A[j] = temp;
}

function partition(a: number[], start: number, end: number): number {

    // Pick the rightmost element as a pivot from the array
    const pivot = a[end];

    // elements less than the pivot will go to the left of `pIndex`
    // elements more than the pivot will go to the right of `pIndex`
    // equal elements can go either way
    let pIndex = start;

    // each time we find an element less than or equal to the pivot,
    // `pIndex` is incremented, and that element would be placed
    // before the pivot.
    for (let i = start; i < end; i++) {
        if (a[i] <= pivot) {
            swap(a, i, pIndex);
            pIndex = pIndex + 1;
        }
    }

    // swap `pIndex` with pivot
    swap(a, pIndex, end);

    // return `pIndex` (index of the pivot element)
    return pIndex;
}

// Iterative Quicksort routine
function iterativeQuicksort(a: number[]): void {

    // create a stack for storing sublist start and end index
    const stack: number[][] = [];

    // get the starting and ending index of a given array
    let start = 0;
    let end = a.length - 1;

    // push the start and end index of the array into the stack
    stack.push([start, end]);

    // loop till stack is empty
    while (stack.length > 0) {

        // remove top pair from the list and get sublist starting
        // and ending indices
        [start, end] = stack.pop()!;

        // rearrange elements across pivot
        const pivot = partition(a, start, end);

        // push sublist indices containing elements that are
        // less than the current pivot to stack
        if (pivot - 1 > start) {
            stack.push([start, pivot - 1]);
        }

        // push sublist indices containing elements that are
        // more than the current pivot to stack
        if (pivot + 1 < end) {
            stack.push([pivot + 1, end]);
        }
    }
}

// Iterative Implementation of Quicksort
const a = [9, -3, 5, 2, 6, 8, -6, 1, 3];

iterativeQuicksort(a);

// print the sorted list
console.log(a);
```

**Exercise:** Modify above code to print in descending order.

Also See:

> [Quicksort Algorithm – C++, Java, and Python Implementation](https://www.techiedelight.com/quicksort/ "Quicksort Algorithm – C++, Java, and Python Implementation")

> [Hybrid QuickSort Algorithm](https://www.techiedelight.com/hybrid-quicksort/ "Hybrid QuickSort Algorithm")

> [Introsort Algorithm – Overview and C++ Implementation](https://www.techiedelight.com/introsort-algorithm/ "Introsort Algorithm – Overview and C++ Implementation")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.81/5. Vote count: 150

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [LIFO](https://www.techiedelight.com/Tags/LIFO/), [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
