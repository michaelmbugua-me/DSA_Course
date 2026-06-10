# Introduction to Priority Queues using Binary Heaps

> Source: https://www.techiedelight.com/introduction-priority-queues-using-binary-heaps/

This article will introduce a significant data structure, priority queue, and discuss how we can implement them using (Binary) Heaps.

## Priority Queue

A priority queue is an ADT (Abstract Data Type) for maintaining a set `S` of elements, with each element having a “priority” associated with it. In a priority queue, an element with high priority is served before an element with low priority and vice versa. If two elements have the same priority, they are served according to their order in the queue. It basically supports the following operations:

  1. `push(x):` inserts an element `x` in set `S` – usually an O(log(n)) operation.
  2. `top()` or `peek():` returns the element of `S` with highest (or lowest) priority (but does not modify the queue) – O(1) operation.
  3. `pop():` returns and removes the element of `S` with highest (or lowest) priority – usually an O(log(n)) operation.

## Heap Data Structure

Heap data structure can be used to implement a priority queue. _A heap data structure should not be confused with the heap, a pool of memory used for dynamic memory allocation._ A common implementation of a heap is the binary heap, which is defined as a [binary tree](https://techiedelight.com/binary-tree-interview-questions/) with two additional properties:

  * Structural property: A binary heap is a complete binary tree, i.e., _all levels of the tree, except possibly the last one (deepest) are fully filled, and, if the last level of the tree is not complete, the nodes of that level are filled from left to right._
  * Heap Property: The key stored in each node is either “greater than or equal to” or “less than or equal to” the keys in the node’s children.

## Min Heap and Max Heap

A heap can be classified further as either a “max-heap” or a “min-heap”.

  * In a max-heap, the keys of parent nodes are always greater than or equal to those of the children, and the highest key is in the root node.
  * In a min-heap, the keys of parent nodes are less than or equal to those of the children, and the lowest key is in the root node.

The highest (or lowest) priority element is always stored at the root in the binary heap. Binary heaps have the smallest possible height of log(n), where `n` is the total number of nodes in a heap.

## Operations on Heap

A binary heap is a complete binary tree, but we usually never use a binary tree for implementing heaps. We store keys in an array and use their relative positions within that array to represent child-parent relationships. The following diagram shows an array representing a min-heap:

The complete binary tree maps the binary tree structure into the array indices, where each array index represents a node. The index of the left or the right child of the parent node is simple expressions. For a zero-based array, the root node is stored at index 0. If `i` is the index of the current node, then,

PARENT(i) = floor((i – 1)/2) LEFT-CHILD(i) = 2×i + 1 RIGHT_CHILD(i) = 2×i + 2 Min Heap Property: A[PARENT[i]] <= A[i] Max Heap Property: A[PARENT[i]] >= A[i]

## Heapify operation

Heapify operation forms the crux of all major heap operations. It can be implemented as _heapify-up_ and _heapify-down_.

`heapify-down(i)` can be invoked if element `A[i]` violates the heap property with its two direct children. It converts the binary tree rooted at `index i` into a heap by moving `A[i]` down the tree.

It does so by comparing `A[i]` with its left & right child and swapping `A[i]` with the smaller child for min-heaps & the larger child for max-heaps, and then calling _heapify-down_ on the corresponding child, i.e., `heapify-down(LEFT_CHILD(i))` or `heapify-down(RIGHT_CHILD(i))`. The process is repeated till the heap property is fixed. The complexity of the _heapify-down_ operation is O(log(n)).

_heapify-down_ is used in `pop()` operation of the binary heap. The idea is to replace the heap’s root with the last element on the last level and call _heapify-down_ on the root. The following diagram illustrates the process:

`heapify-up(i)` can be invoked if the parent of an element `A[i]` violates the heap property. It converts the binary tree into a heap by moving `A[i]` up the tree.

It does so by comparing `A[i]` with its parent and swapping the two if the heap property is violated. We then call _heapify-up_ on the parent, i.e., `heapify-up(PARENT(i))`. The process is repeated till the heap property is fixed. The complexity of the _heapify-up_ operation is O(log(n)).

_heapify-up_ is used in `push()` operation of the binary heap. The idea is to add the new element to the heap’s bottom level and call _heapify-up_ on the last node. The following diagram illustrates the process:

## Applications of Heap

Heaps are crucial in several efficient [graph](https://techiedelight.com/terminology-and-representations-of-graphs/) algorithms, such as [Dijkstra’s shortest path algorithm](https://techiedelight.com/single-source-shortest-paths-dijkstras-algorithm/) and Prim’s algorithm for minimum spanning tree. They are also used in the [Heapsort sorting algorithm](https://techiedelight.com/heap-sort-place-place-implementation-c-c/) and [Huffman coding](https://techiedelight.com/huffman-coding/) (A Data Compression technique).

**Also See:**

> [Min Heap and Max Heap Implementation in C++](https://techiedelight.com/min-heap-max-heap-implementation-c/)

> [Min Heap and Max Heap Implementation in Java](https://techiedelight.com/min-heap-max-heap-implementation-in-java/)

**References:**

1\. <https://en.wikipedia.org/wiki/Priority_queue> 2\. <https://en.wikipedia.org/wiki/Heap_(data_structure)> 3\. <https://en.wikipedia.org/wiki/Binary_heap>

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.57/5. Vote count: 106

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Beginner](https://www.techiedelight.com/Tags/Beginner/), [Must Know](https://www.techiedelight.com/Tags/Must-Know/), [Priority Queue](https://www.techiedelight.com/Tags/Priority-Queue/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
