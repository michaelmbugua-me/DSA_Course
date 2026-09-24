# Pattern 10: Subsets (BFS Generation of Permutations & Combinations)

> From [14 Patterns to Ace Any Coding Interview Question](https://hackernoon.com/14-patterns-to-ace-any-coding-interview-question-c5bb3357f6ed) by Fahim ul Haq, extended with templates, complexity analysis and practice problems from this repo.

## Overview

Problems asking for **all subsets / permutations / combinations** of a set. The BFS-style generation: start with the empty set, then for each new element, **copy every existing subset and add the element to the copies**. For `[1, 5, 3]`: `[[]]` → `[[], [1]]` → `[[], [1], [5], [1,5]]` → 8 subsets. Alternatively, generate recursively with include/exclude decisions (backtracking) — same tree, same complexity.

## Recognition cues

- "All subsets / permutations / combinations of ..."
- "Power set"
- Counting arrangements that satisfy constraints (often combined with backtracking)
- Input has no duplicates but output must avoid duplicate sets → dedupe step

## Template (Python)

```python3
def subsets(nums):
    result = [[]]
    for num in nums:                 # BFS expansion
        result += [subset + [num] for subset in result]
    return result

# backtracking alternative (also handles 'combinations of size k'):
def backtrack(start, path):
    result.append(path[:])
    for i in range(start, len(nums)):
        path.append(nums[i])
        backtrack(i + 1, path)
        path.pop()                   # undo choice
```

## Complexity

- Time & space: O(2^n) for subsets, O(n · n!) for permutations — the output itself is exponential, so "slow" is expected; aim for no *wasted* work
- Dedup with sorted input: skip equal neighbours (`if i > start and nums[i] == nums[i-1]: continue`)

## Common pitfalls

- Mutating the shared list instead of copying (`path[:]`)
- Permutations vs combinations confusion: permutations advance from 0, combinations from `start` (no reuse, no order swaps)
- Missing the empty subset in the answer
- Forgetting to handle duplicates in the input

## Practice problems in this repo

- [Print all distinct subsets of a given set](../solutions/print-distinct-subsets-given-set.md)
- [Generate power set of a given set](../solutions/generate-power-set-given-set.md)
- [Find all Permutations of a given string](../solutions/find-permutations-given-string.md)
- [Find all distinct combinations of given length — I](../solutions/find-distinct-combinations-of-given-length.md)
- [Find all distinct combinations of given length with repetition allowed](../solutions/find-distinct-combinations-given-length-repetition-allowed.md)
- [All combinations of elements satisfying given constraints](../solutions/find-combinations-of-elements-satisfies-given-constraints.md)
- [Print all combinations of positive integers in increasing order that sum to a given number](../solutions/print-combinations-integers-sum-given-number.md)
- [K-Partition Problem | Printing all Partitions](../solutions/k-partition-problem-print-all-subsets.md)
- [Subset sum Problem](../solutions/subset-sum-problem.md)
- [Combinations of words formed by replacing given numbers with corresponding alphabets](../solutions/combinations-of-words-formed-replacing-given-numbers-corresponding-english-alphabet.md)
