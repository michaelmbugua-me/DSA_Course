# Pattern 9: Two Heaps

> From [14 Patterns to Ace Any Coding Interview Question](https://hackernoon.com/14-patterns-to-ace-any-coding-interview-question-c5bb3357f6ed) by Fahim ul Haq, extended with templates, complexity analysis and practice problems from this repo.

## Overview

When a set of numbers can be split into two halves and you need the **smallest of one half plus the biggest of the other** (the classic case: a running median), use two heaps:

- **Max Heap** holds the smaller half → its top is the median candidate from below
- **Min Heap** holds the larger half → its top is the median candidate from above

Keep the sizes balanced (max-heap allowed one extra element). The median is then computable in O(1) from the two tops, and each insertion is O(log n).

## Recognition cues

- "Median of a stream / running median" — the flagship use
- Any problem splitting a set into two halves needing min of one and max of the other
- Scheduling where you pair the most-demanding task with the most available resource
- Sliding-window variants: "median of every window of size k"

## Template (TypeScript)

```ts
// JS has no builtin heap: use a min-heap helper for larger_half,
// and a max-heap helper (or negated values) for smaller_half
const smallerHalf: number[] = []; // max-heap
const largerHalf: number[] = [];  // min-heap

function add(num: number): void {
    maxHeapPush(smallerHalf, num);
    // balance: move the max of the small half to the large half
    minHeapPush(largerHalf, maxHeapPop(smallerHalf));
    // keep |smaller| >= |larger|, differing by at most 1
    if (largerHalf.length > smallerHalf.length) {
        maxHeapPush(smallerHalf, minHeapPop(largerHalf));
    }
}

function median(): number {
    if (smallerHalf.length > largerHalf.length) {
        return smallerHalf[0];
    }
    return (smallerHalf[0] + largerHalf[0]) / 2;
}
```

## Complexity

- Time: O(log n) per insertion, O(1) median query
- Space: O(n)

## Common pitfalls

- Getting the balance rule backwards (which heap may hold the extra element)
- Forgetting to invert the comparison for the max-heap (JS has no builtin heap — see the helpers above)
- Rebalancing only in one direction — you need the "move if size violated" step after every insert
- Float vs int division when the count is even

## Practice problems in this repo

- [Find K'th smallest element in an array](../solutions/find-kth-smallest-element-array.md) — heap sibling pattern
- [Find K'th largest element in an array](../solutions/find-kth-largest-element-array.md)
- [Sort a K-Sorted Array](../solutions/sort-k-sorted-array.md)
- [Introduction to Priority Queues using Binary Heaps](../solutions/introduction-priority-queues-using-binary-heaps.md)
- [Min Heap and Max Heap Implementation — C++](../solutions/min-heap-max-heap-implementation-c.md), [Java](../solutions/min-heap-max-heap-implementation-in-java.md)
