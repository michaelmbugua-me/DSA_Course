# Pattern 3: Fast & Slow Pointers (Hare & Tortoise)

> From [14 Patterns to Ace Any Coding Interview Question](https://hackernoon.com/14-patterns-to-ace-any-coding-interview-question-c5bb3357f6ed) by Fahim ul Haq, extended with templates, complexity analysis and practice problems from this repo.

## Overview

Two pointers move through a sequence at different speeds (typically 1x and 2x). If the sequence contains a **cycle**, the fast pointer is guaranteed to eventually lap the slow one and they meet inside the cycle (Floyd's algorithm). The same trick finds the middle element: when the fast pointer hits the end, the slow one is at the middle.

Why it beats Two Pointers: on a **singly linked list you can't move backwards**, and hash-based cycle detection costs O(n) space — this pattern is O(1) space.

## Recognition cues

- "Detect a loop/cycle in a linked list"
- "Find the middle element" — without knowing the length
- "Find the start of the cycle" — reset one pointer to head, move both at 1x; they meet at the cycle entry (needs the distance proof)
- Also works on sequences of numbers, e.g. happy numbers / arrays as implicit lists (i → nums[i])

## Template (Python)

```python3
def has_cycle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next          # 1x
        fast = fast.next.next     # 2x
        if slow is fast:
            return True           # or: find cycle start / middle
    return False
```

## Complexity

- Time: O(n) — before meeting, fast gains at most one node per step
- Space: O(1) — the whole point vs. a visited set

## Common pitfalls

- Off-by-one in the loop condition (`fast and fast.next` prevents a null dereference)
- Finding the cycle **start** requires the extra "reset to head" step — interviewers love this follow-up
- Comparing values instead of node identity (`is` not `==`)

## Practice problems in this repo

- [Detect Cycle in a linked list (Floyd's Cycle Detection Algorithm)](../solutions/detect-cycle-linked-list-floyds-cycle-detection-algorithm.md)
- [Check if linked list is palindrome or not](../solutions/check-if-linked-list-is-palindrome.md) — fast/slow to find middle, then reverse half
- [Determine if a given linked list is a palindrome or not](../solutions/determine-linked-list-palindrome-or-not.md)
- [Recursively check if linked list of characters is palindrome or not](../solutions/recursively-check-linked-list-characters-palindrome-or-not.md)
- [Find K'th node from the end in a linked list](../solutions/find-kth-node-from-the-end-linked-list.md) — lead/lag pointer variant
