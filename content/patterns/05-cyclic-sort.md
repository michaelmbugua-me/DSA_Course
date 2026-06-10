# Pattern 5: Cyclic Sort

> From [14 Patterns to Ace Any Coding Interview Question](https://hackernoon.com/14-patterns-to-ace-any-coding-interview-question-c5bb3357f6ed) by Fahim ul Haq, extended with templates, complexity analysis and practice problems from this repo.

## Overview

A clever O(n) time / O(1) space approach for arrays containing **numbers in a known range** (e.g. 1..n). Walk the array; whenever the current number is not at its correct index, swap it to its correct index. Each swap places at least one number permanently, so the whole array is sorted in O(n) despite the nested-looking loop. After sorting, missing/duplicate numbers become trivial to spot.

## Recognition cues

- Array contains numbers in a given range — often explicitly `1..n` or `0..n`
- Asked for the **missing / duplicate / smallest missing positive** number
- Constraint: O(1) space, no sorting allowed
- If numbers were arbitrary values, this wouldn't apply — there must be a fixed range

## Template (TypeScript)

```ts
function cyclicSort(nums: number[]): void { // nums contains 1..n
  let i = 0;
  while (i < nums.length) {
    const correct = nums[i] - 1; // index where nums[i] belongs
    if (nums[i] !== nums[correct]) {
      [nums[i], nums[correct]] = [nums[correct], nums[i]];
    } else {
      i++;
    }
  }
  // scan for anomalies: nums[i] != i+1  -> missing/duplicate found
}
```

Do **not** advance `i` after a swap — the new value at `i` may also be misplaced.

## Complexity

- Time: O(n) — each swap puts at least one element in its final position, so total swaps ≤ n
- Space: O(1)

## Common pitfalls

- Advancing `i` after every swap (misses misplaced elements)
- Off-by-one in the correct index (`0..n` vs `1..n` ranges)
- Infinite loops when the array contains values outside the range — validate first
- Mutation side effects: the input is permuted; clone it if the caller needs the original

## Practice problems in this repo

- [Find missing number in array without using extra space](../solutions/find-missing-number-array-without-extra-space.md)
- [Find missing number and duplicate elements in an array](../solutions/find-missing-number-duplicate-elements-array.md)
- [Find a duplicate element in a limited range array](../solutions/find-duplicate-element-limited-range-array.md)
- [Find two duplicate elements in a limited range array (using XOR)](../solutions/find-two-duplicate-elements-limited-range-array-using-xor.md)
- [Find all odd occurring elements in an array having limited range of elements](../solutions/find-odd-occurring-elements-array.md)
- [Find first missing positive number variants — see also](../solutions/find-smallest-missing-element-sorted-array.md)
