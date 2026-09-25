# Heap Sort Algorithm – Overview & C, C++, Java, and Python Implementation

> Source: https://www.techiedelight.com/heap-sort-place-place-implementation-c-c/

Given an integer array, sort it using the heapsort algorithm in TypeScript.

## Heapsort Overview

Heapsort is an [in-place](https://techiedelight.com/in-place-vs-out-of-place-algorithms/), comparison-based sorting algorithm and can be thought of as an improved [selection sort](https://techiedelight.com/selection-sort-iterative-recursive/) as it divides the input into a sorted and an unsorted region. It iteratively shrinks the unsorted region by extracting the largest/smallest element and moving that to the sorted region. The improvement consists of using a heap data structure rather than a linear-time search to find the maximum. Heapsort does not produce a stable sort, which means that the implementation does not preserve the input order of equal elements in the sorted output. It is generally slower than other O(n.log(n)) sorting algorithms like [quicksort](https://techiedelight.com/quicksort/), [merge sort](https://techiedelight.com/merge-sort/).

The heapsort algorithm can be divided into two parts:

  * In the first step, a heap is built out of the input data. We can do this in O(n) time.
  * In the second step, a sorted array is created by repeatedly removing the largest/smallest element from the heap (the root of the heap) and inserting it into the array. The heap is updated ([heapify-down](https://techiedelight.com/introduction-priority-queues-using-binary-heaps/#Heapify) is called on the root node) after each removal to maintain the heap property. Once all elements have been removed from the heap, we get a sorted array. This is done in O(n.log(n)) time since we need to pop `n` elements, where each removal involves a constant amount of work and a single heapify operation takes O(log(n)) time.

## How to build a heap?

A naive solution would be to start with an empty heap and repeatedly insert each element of the input list into it. The problem with this approach is that it runs in O(n.log(n)) time on an input containing `n` elements, as it performs `n` insertions at O(log(n)) cost each.

We can build a heap in O(n) time by arbitrarily putting the input elements into a heap array. Then starting from the last internal node of the heap (present at index `(n-2)/2` in the array), call the heapify procedure on each node up to the root node (till index `0`). _As the heapify procedure expects a node’s left and right child to be heaps, start from the last internal node (as leaf nodes are already heaps) and move up level by level._

One can argue that the basic heap operation of heapify runs in O(log(n)) time, and we call heapify roughly `n/2 times` (one for each internal node). So, the time complexity of the above solution is O(n.log(n)). However, it turns out that the analysis is _not tight_.

When heapify is called, the running time depends on how far an element might move down in the tree before the process terminates. In other words, it depends on the height of the element in a heap. In the worst-case, the element might go down to the leaf level. Let’s count the work done level by level.

  * There are `2h` nodes at the bottom-most level, but we do not call heapify on any of these, so the work is 0.
  * There are `2(h-1)` nodes at the next level, and each might move down by 1 level.
  * At the 3rd level from the bottom, there are `2(h-2)` nodes, and each might move down by 2 levels and do on…

As we can see, not all heapify operations are O(log(n)), and this is why, by doing tight analysis, we might end up getting O(n) time.

> [Practice this algorithm](https://techiedelight.com/?problem=SortArray)

## 1\. In-place Heapsort Implementation

Heapsort can be performed in place. We can do this by

  * Using a max-heap instead of min-heap _(to sort in ascending order)_ ,
  * Using an input array for constructing heap _(instead of using heap own storage)_

The idea is to split the array into two parts – the heap and the sorted array. As each pop operation free space to the end of the array in a binary heap, move the popped item to the free space. So, the first popped item (maximum element) will go to the last position in the array, the second popped item (next maximum element) will go to the second last position in the array, and so on… finally, when all items are popped from the heap, we will get an array sorted in ascending order.

```ts
// return left child of `A[i]`
function LEFT(i: number): number {
    return 2 * i + 1;
}

// return right child of `A[i]`
function RIGHT(i: number): number {
    return 2 * i + 2;
}

// Utility function to swap two indices in a list
function swap(A: number[], i: number, j: number): void {

    const temp = A[i];
    A[i] = A[j];
    A[j] = temp;
}

// Recursive heapify-down algorithm. The node at index `i` and
// its two direct children violates the heap property
function heapify(A: number[], i: number, size: number): void {

    // get left and right child of node at index `i`
    const left = LEFT(i);
    const right = RIGHT(i);

    let largest = i;

    // compare `A[i]` with its left and right child
    // and find the largest value
    if (left < size && A[left] > A[i]) {
        largest = left;
    }

    if (right < size && A[right] > A[largest]) {
        largest = right;
    }

    // swap with a child having greater value and
    // call heapify-down on the child
    if (largest !== i) {
        swap(A, i, largest);
        heapify(A, largest, size);
    }
}

// Function to remove an element with the highest priority (present at the root)
function pop(A: number[], size: number): number {

    // if the heap has no elements
    if (size <= 0) {
        return -1;
    }

    const top = A[0];

    // replace the root of the heap with the last element
    // of the list
    A[0] = A[size - 1];

    // call heapify-down on the root node
    heapify(A, 0, size - 1);

    return top;
}

// Function to perform heapsort on a list `A` of size `n`
function heapsort(A: number[]): void {

    // build a priority queue and initialize it by the given list
    let n = A.length;

    // Build-heap: Call heapify starting from the last internal
    // node all the way up to the root node
    let i = Math.floor((n - 2) / 2);
    while (i >= 0) {
        heapify(A, i, n);
        i = i - 1;
    }

    // repeatedly pop from the heap till it becomes empty
    while (n > 0) {
        A[n - 1] = pop(A, n);
        n = n - 1;
    }
}

const A = [6, 4, 7, 1, 9, -2];

// perform heapsort on the list
heapsort(A);

// print the sorted list
console.log(A);
```

The time complexity of the above algorithm is O(n.log(n)), where `n` is the input size and requires O(n) implicit space for the call stack.

## 2\. Out-of-place Heapsort Implementation

The [out-of-place](https://techiedelight.com/in-place-vs-out-of-place-algorithms/) heapsort algorithm can be implemented as follows in TypeScript:

```ts
// A class to store a min-heap node
// min-heap assumed (JS has no builtin heap)
class PriorityQueue {
    // array to store heap elements
    private A: number[];

    // stores current size of the heap
    private size: number;

    // return left child of `A[i]`
    private LEFT(i: number): number {
        return 2 * i + 1;
    }

    // return right child of `A[i]`
    private RIGHT(i: number): number {
        return 2 * i + 2;
    }

    // Utility function to swap two indices in the array
    private swap(A: number[], i: number, j: number): void {
        const temp = A[i];
        A[i] = A[j];
        A[j] = temp;
    }

    // Recursive heapify-down algorithm. The node at index `i` and
    // its two direct children violate the heap property
    private heapify(i: number): void {
        // get left and right child of node at index `i`
        const left = this.LEFT(i);
        const right = this.RIGHT(i);

        let smallest = i;

        // compare `A[i]` with its left and right child
        // and find the smallest value
        if (left < this.size && this.A[left] < this.A[i]) {
            smallest = left;
        }

        if (right < this.size && this.A[right] < this.A[smallest]) {
            smallest = right;
        }

        // swap with a child having lesser value and
        // call heapify-down on the child
        if (smallest !== i) {
            this.swap(this.A, i, smallest);
            this.heapify(smallest);
        }
    }

    // Constructor (Build-Heap)
    constructor(arr: number[]) {
        // allocate memory to the heap and initialize it by the given array
        this.A = [...arr];

        // set heap capacity equal to the array size
        this.size = arr.length;

        // call heapify starting from the last internal node all the
        // way up to the root node
        let i = Math.floor((arr.length - 2) / 2);
        while (i >= 0) {
            this.heapify(i);
            i--;
        }
    }

    // Function to check if the heap is empty or not
    empty(): boolean {
        return this.size === 0;
    }

    // Function to remove an element with the highest priority (present at the root)
    pop(): number {
        // if the heap has no elements
        if (this.size <= 0) {
            return -1;
        }

        const top = this.A[0];

        // replace the root of the heap with the last element
        // of the array
        this.A[0] = this.A[this.size - 1];

        // decrease heap size by 1
        this.size--;

        // call heapify-down on the root node
        this.heapify(0);

        return top;
    }
}

// Function to perform heapsort on array `A` of size `n`
function heapsort(A: number[]): void {
    // build a priority queue and initialize it by the given array
    const pq = new PriorityQueue(A);

    // repeatedly pop from the heap till it becomes empty
    let i = 0;
    while (!pq.empty()) {
        A[i++] = pq.pop();
    }
}

const A = [6, 4, 7, 1, 9, -2];

// perform heapsort on the array
heapsort(A);

// print the sorted array
console.log(A);
```

**Output:** -2 1 4 6 7 9

The time complexity of the above algorithm is O(n.log(n)), and the auxiliary space used by the program is O(n), where `n` is the size of the input.

**Exercise:** Sort elements in descending order using heapsort

**References:**

1\. <https://en.wikipedia.org/wiki/Heapsort>

2\. <https://stackoverflow.com/questions/9755721/how-can-building-a-heap-be-on-time-complexity>
