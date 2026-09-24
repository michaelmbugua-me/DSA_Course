# Pattern 11: Modified Binary Search

> From [14 Patterns to Ace Any Coding Interview Question](https://hackernoon.com/14-patterns-to-ace-any-coding-interview-question-c5bb3357f6ed) by Fahim ul Haq, extended with templates, complexity analysis and practice problems from this repo.

## Overview

Whenever data is **sorted** (array, list, matrix) and you search for a target or boundary, binary search is the base algorithm — and interview problems are almost always a *twist* on it: rotated arrays, nearly sorted arrays, infinite arrays, first/last occurrence, peak elements. The modification is always the same skeleton with a different **condition to discard half** of the search space.

## Recognition cues

- Input sorted (or a sorted thing that was rotated / perturbed)
- "Find in O(log n)" — explicitly or implied by huge input sizes
- Monotonic predicate: a yes/no question whose answer switches from no→yes at exactly one point ("minimum capacity to ship in D days" style problems are hidden binary searches)

## Template (Python)

```python3
def search(lo, hi, predicate):
    # find the first index where predicate flips from False to True
    while lo < hi:
        mid = lo + (hi - lo) // 2    # avoids integer overflow
        if predicate(mid):
            hi = mid                 # keep mid: answer may be here
        else:
            lo = mid + 1
    return lo
```

Rotated-array twist: determine which half `[lo..mid]` or `[mid..hi]` is still sorted, then check whether the target lies inside that half.

## Complexity

- Time: O(log n) — the invariant is halving the search space, whatever the twist
- Space: O(1) iterative, O(log n) recursive

## Common pitfalls

- `mid = (lo + hi) / 2` overflow — use `lo + (hi - lo) // 2`
- Infinite loops when `hi = mid` but the loop condition is `lo < hi` with `lo = mid` — always ensure progress
- Off-by-one in `lo <= hi` vs `lo < hi` variants; pick one convention per problem and be consistent
- For rotated arrays: handle the two-element window and the equal-mid-edge cases explicitly

## Practice problems in this repo

- [Search an element in a circular sorted array](../solutions/search-element-circular-sorted-array.md)
- [Find number of rotations in a circularly sorted array](../solutions/find-number-rotations-circularly-sorted-array.md)
- [Search in a nearly sorted array in logarithmic time](../solutions/search-nearly-sorted-array-ologn-time.md)
- [Find Floor and Ceil of a number in a sorted array](../solutions/find-floor-ceil-number-sorted-array.md)
- [Find the peak element in an array](../solutions/find-peak-element-array.md)
- [Find smallest missing element from a sorted array](../solutions/find-smallest-missing-element-sorted-array.md)
- [Count occurrences of a number in a sorted array with duplicates](../solutions/count-occurrences-number-sorted-array-duplicates.md)
- [Find first or last occurrence of a given number in a sorted array](../solutions/find-first-or-last-occurrence-of-a-given-number-sorted-array.md)
- [Find Missing Term in a Sequence in Logarithmic time](../solutions/find-missing-term-sequence-ologn-time.md)
- [Floor and Ceil in a Binary Search Tree](../solutions/floor-ceil-bst-iterative-recursive.md) — same pattern on trees
- [Find K'th smallest element in the array (Quickselect alternative)](../solutions/find-kth-smallest-element-array.md)
