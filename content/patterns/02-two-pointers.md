# Pattern 2: Two Pointers

> From [14 Patterns to Ace Any Coding Interview Question](https://hackernoon.com/14-patterns-to-ace-any-coding-interview-question-c5bb3357f6ed) by Fahim ul Haq, extended with templates, complexity analysis and practice problems from this repo.

## Overview

Two pointers iterate through a data structure in tandem until one or both hit a condition. Far better than repeatedly looping back with a single pointer (O(n²)): on a **sorted** structure, one pointer at each end lets you shrink the search space by one element per step → O(n).

Common variants:
- **Opposite ends** — start/end pointers moving inward (pair-sum, palindrome check)
- **Same direction (read/write)** — slow pointer writes, fast pointer reads (remove duplicates, in-place partition)
- **Parallel arrays** — one pointer per array (merging sorted arrays)

## Recognition cues

- Sorted array (or linked list) + "find a **pair/triplet/set** that satisfies X"
- Need to compare elements while scanning in both directions
- Asked to do something **in-place** with O(1) space (segregate, remove, dedupe)

## Template (TypeScript)

```ts
function twoPointers(nums: number[], target: number): [number, number] | null { // sorted nums
  let left = 0;
  let right = nums.length - 1;
  while (left < right) {
    const s = nums[left] + nums[right];
    if (s === target) return [left, right];
    if (s < target) {
      left++;       // need a bigger sum
    } else {
      right--;      // need a smaller sum
    }
  }
  return null;
}
```

## Complexity

- Time: O(n) for pairs; O(n²) overall for 3-sum/4-sum (sort + two-pointer inside a loop)
- Space: O(1)

## Common pitfalls

- Applying it to an **unsorted** array (pair-sum there needs a hash map instead)
- Not skipping duplicates for "all unique triplets" style problems
- Moving both pointers when you should move only one

## Practice problems in this repo

- [Find pair with given sum in the array](../solutions/find-pair-with-given-sum-array.md)
- [Find Triplet with given sum in an array](../solutions/find-triplet-given-with-given-sum.md)
- [4 sum problem | Quadruplets with given sum](../solutions/4-sum-problem.md)
- [Print all quadruplets with given sum | 4-sum problem extended](../solutions/print-all-quadruplets-with-given-sum-4-sum-problem-extended.md)
- [Find pair in an array having minimum absolute sum](../solutions/find-pair-array-minimum-absolute-sum.md)
- [Find two non-overlapping pairs having same sum in an array](../solutions/find-two-non-overlapping-pairs-sum-array.md)
- [Print all Triplets in an array with sum less than or equal to given number](../solutions/print-triplets-array-sum-less-equal-given-number.md)
- [Merge two arrays by satisfying given constraints](../solutions/merge-two-arrays-satisfying-given-constraints.md)
- [In place merge two sorted arrays](../solutions/inplace-merge-two-sorted-arrays.md)
- [Check if given string is a rotated palindrome or not](../solutions/check-given-string-rotated-palindrome-not.md) — expand around center variant
- [Determine if a given string is palindrome or not](../solutions/determine-given-string-is-palindrome-not.md)
