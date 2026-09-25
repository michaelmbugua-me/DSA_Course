# Pattern 13: K-way Merge

> From [14 Patterns to Ace Any Coding Interview Question](https://hackernoon.com/14-patterns-to-ace-any-coding-interview-question-c5bb3357f6ed) by Fahim ul Haq, extended with templates, complexity analysis and practice problems from this repo.

## Overview

Given **K sorted lists** (or a sorted matrix), merge them or traverse them in sorted order using a **min-heap of size K**: push the first element of each list, repeatedly pop the global minimum, and push the *next element from the same list* it came from. That "remember which list it came from" step is the whole trick.

## Recognition cues

- Multiple **sorted** inputs: arrays, linked lists, matrix rows/columns
- "Merge K sorted lists", "K-th smallest in a sorted matrix", "smallest range covering K lists"
- External sorting (data too big for memory, sorted in chunks)

## Template (TypeScript)

```ts
type Entry = [number, number, number]; // (value, list_index, element_index)

// JS has no builtin heap: use min-heap helpers (minHeapify, minHeapPush, minHeapPop)
function mergeKSorted(lists: number[][]): number[] {
  const heap: Entry[] = [];
  for (let i = 0; i < lists.length; i++) {
    if (lists[i].length > 0) heap.push([lists[i][0], i, 0]);
  }
  minHeapify(heap);
  const merged: number[] = [];
  while (heap.length > 0) {
    const [val, li, ei] = minHeapPop(heap);
    merged.push(val);
    if (ei + 1 < lists[li].length) {
      minHeapPush(heap, [lists[li][ei + 1], li, ei + 1]);
    }
  }
  return merged;
}
```

## Complexity

- Time: O(N log K) where N = total elements across all lists — not O(N log N)
- Space: O(K) for the heap

## Common pitfalls

- Pushing elements into the heap without knowing their source list — you can't fetch the next element
- Comparing tuples when values are equal and it falls through to index comparison (usually harmless, but know it)
- For matrix variants: only push the first row or first column initially
- k-th smallest in a sorted matrix: grow the heap with right/down neighbours only

## Practice problems in this repo

- [Merge K sorted linked lists](../solutions/efficiently-merge-k-sorted-linked-lists.md)
- [Merge M sorted lists of variable length](../solutions/merge-m-sorted-lists-variable-length.md)
- [Merge M sorted lists each containing N elements](../solutions/merge-m-sorted-lists-containing-n-elements.md)
- [Find smallest range with at-least one element from each of the given lists](../solutions/find-smallest-range-least-one-element-given-lists.md) — heap traversal of K lists
- [Merge two sorted linked lists into one](../solutions/merge-given-sorted-linked-lists-into-one.md) — the K=2 special case
- [Sort a K-Sorted Array](../solutions/sort-k-sorted-array.md)
- [External merge sort](../solutions/external-merge-sort.md)
- [Merge two BSTs into a doubly linked list in sorted order](../solutions/merge-two-bsts-into-doubly-linked-list-sorted-order.md)
