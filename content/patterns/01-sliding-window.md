# Pattern 1: Sliding Window

> From [14 Patterns to Ace Any Coding Interview Question](https://hackernoon.com/14-patterns-to-ace-any-coding-interview-question-c5bb3357f6ed) by Fahim ul Haq, extended with templates, complexity analysis and practice problems from this repo.

## Overview

Perform an operation over a variable (or fixed) size "window" of an array, string, or linked list. The window starts at the first element and slides right one element at a time; instead of re-computing each window from scratch, you **add the element entering the window and remove the element leaving it** — turning O(n·k) into O(n).

## Recognition cues

- Input is a linear data structure (array, string, linked list)
- Asked for longest/shortest/maximum/minimum **substring, subarray, or window**
- Key phrases: "contiguous", "subarray of size K", "at most K distinct", "no repeats"
- Brute force would enumerate all subarrays/substrings → think window

## Template (TypeScript)

```ts
function slidingWindow(s: string): number {
  let left = 0;
  const windowState = new Map<string, number>();   // e.g. char counts, running sum
  let best = 0;
  for (let right = 0; right < s.length; right++) {
    // 1. add s[right] to window_state
    // 2. while window is INVALID: shrink from left
    //    left += 1 ; remove s[left] from state
    // 3. window [left..right] is valid: update best
    // TODO
  }
  return best;
}
```

Two variants:
- **Fixed size K**: slide `left` and `right` together, one step each
- **Variable size**: expand `right`, shrink `left` until the window is valid again

## Complexity

- Time: O(n) — each element enters and leaves the window at most once
- Space: O(k) for the window state (often a hash map of counts)

## Common pitfalls

- Forgetting to shrink the window → wrong counts / O(n²) behaviour
- Updating `best` while the window is still invalid
- Off-by-one when the window is fixed-size (`right - left + 1 == k`)
- Negative numbers break many sum-window assumptions — use prefix sums instead

## Practice problems in this repo

- [Find minimum sum subarray of given size k](../solutions/find-minimum-sum-subarray-given-size-k.md)
- [Maximum Sum Subarray Problem (Kadane's Algorithm)](../solutions/maximum-subarray-problem-kadanes-algorithm.md) — degenerate window: full array
- [Maximum Sum Circular Subarray](../solutions/maximum-sum-circular-subarray.md)
- [Find subarray having given sum in given array of integers](../solutions/find-subarray-having-given-sum-given-array.md)
- [Find the length of smallest subarray whose sum of elements is greater than the given number](../solutions/length-of-smallest-subarray-with-sum-greater-number.md)
- [Find count of distinct elements in every sub-array of size k](../solutions/count-distinct-elements-every-sub-array-size-k-array.md)
- [Find subarrays with given sum in an array](../solutions/find-subarrays-given-sum-array.md)
- [Longest Alternating Subarray Problem](../solutions/longest-alternating-subarray-problem.md)
- [Find the longest substring of given string containing k distinct characters](../solutions/find-longest-substring-containing-k-distinct-characters.md)
- [Find the longest substring of given string containing all distinct characters](../solutions/find-longest-substring-given-string-containing-distinct-characters.md)
- [Find all substrings of a string that are permutation of a given string](../solutions/find-substrings-string-permutation-given-string.md)
