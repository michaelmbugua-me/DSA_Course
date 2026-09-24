# Pattern 12: Top K Elements

> From [14 Patterns to Ace Any Coding Interview Question](https://hackernoon.com/14-patterns-to-ace-any-coding-interview-question-c5bb3357f6ed) by Fahim ul Haq, extended with templates, complexity analysis and practice problems from this repo.

## Overview

Any problem asking for the **top / smallest / most frequent / closest 'K' elements** of a set. A heap of size K tracks the current winners: insert K elements, then scan the rest — if a new element beats the heap's "gatekeeper" (its root), replace it. No full sort needed: O(n log k) beats O(n log n), and for streaming data it's the only sensible option.

Rule of thumb: for **K largest** keep a **min-heap** of size K (its root is the gatekeeper); for **K smallest** use a max-heap; for **K most frequent** use a min-heap keyed on frequency.

## Recognition cues

- "Top / largest / smallest / closest / most frequent K elements"
- Asked to sort "just enough" to identify a specific element
- Streaming / large data where you can't hold everything sorted

## Template (Python)

```python3
import heapq

def k_largest(nums, k):
    heap = nums[:k]
    heapq.heapify(heap)              # min-heap gatekeeper
    for num in nums[k:]:
        if num > heap[0]:
            heapq.heapreplace(heap, num)
    return heap
```

## Complexity

- Time: O(n log k) — heap ops are log k, not log n
- Space: O(k)
- Alternative: Quickselect gives O(n) average / O(n²) worst if sorting isn't needed and data fits in memory

## Common pitfalls

- Wrong heap direction (max-heap for "K largest" → gatekeeper logic breaks)
- Forgetting to bound the heap at size K → it becomes plain sorting
- "K most frequent" needs a counter pass first (hash map), then a heap — don't skip the counting
- Stability/ties: decide whether equal-frequency elements have an order

## Practice problems in this repo

- [Find K'th largest element in an array](../solutions/find-kth-largest-element-array.md)
- [Find K'th smallest element in an array](../solutions/find-kth-smallest-element-array.md)
- [Sort a K-Sorted Array](../solutions/sort-k-sorted-array.md)
- [Find first k maximum occurring words in given set of strings](../solutions/find-first-k-maximum-occurring-words-given-set-strings.md)
- [Find maximum sum of subsequence with no adjacent elements](../solutions/maximum-sum-of-subsequence-with-no-adjacent-elements.md)
- [Merge M sorted lists each containing N elements](../solutions/merge-m-sorted-lists-containing-n-elements.md)
