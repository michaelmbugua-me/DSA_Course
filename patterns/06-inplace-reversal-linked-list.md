# Pattern 6: In-place Reversal of Linked List

> From [14 Patterns to Ace Any Coding Interview Question](https://hackernoon.com/14-patterns-to-ace-any-coding-interview-question-c5bb3357f6ed) by Fahim ul Haq, extended with templates, complexity analysis and practice problems from this repo.

## Overview

Reverse the links between a set of nodes of a linked list **in place** — reusing the existing node objects, no extra memory. Keep three pointers: `prev` (already-processed part), `curr` (node being flipped), and `next` (saved so you don't lose the rest of the list). Flip `curr.next = prev`, then advance all three. Master this on a sub-list and every variant (every K nodes, alternate K nodes, specified portion) is a bookkeeping exercise on boundaries.

## Recognition cues

- "Reverse a linked list / sub-list / every K nodes"
- Constraint of in-place, O(1) space
- Problems needing the middle of a list flipped while the ends stay put (pairs with Fast & Slow)

## Template (Python)

```python3
def reverse(head, prev=None):
    curr = head
    while curr:
        nxt = curr.next   # save
        curr.next = prev  # flip
        prev = curr       # advance
        curr = nxt
    return prev           # new head
```

For "reverse every K nodes": reverse group 1..K, then **recursively/iteratively** reverse the rest and attach; remember the group head (now tail) to splice.

## Complexity

- Time: O(n) — each node is visited and relinked once
- Space: O(1) iterative; O(n/k) stack if recursive on groups

## Common pitfalls

- Losing the rest of the list by not saving `next` before flipping
- Wrong boundary handling in K-group problems (new head, junction nodes, tail reconnection)
- Returning the wrong node as head (`prev`, not `curr`)
- Off-by-one on "reverse nodes m..n" — use a dummy head to normalize edge cases

## Practice problems in this repo

- [Reverse Linked List (Iterative Solution)](../solutions/reverse-linked-list-part-1-iterative-solution.md)
- [Reverse Linked List (Recursive Solution)](../solutions/reverse-linked-list-part-2-recursive-solution.md)
- [Reverse every group of k nodes in given linked list](../solutions/reverse-every-k-nodes-of-a-linked-list.md)
- [Reverse every alternate group of k nodes in a linked list](../solutions/reverse-alternate-group-k-nodes-linked-list.md)
- [Reverse specified portion of a Linked List](../solutions/reverse-specified-portion-linked-list.md)
- [Reverse a Doubly Linked List](../solutions/reverse-doubly-linked-list.md)
- [Pairwise swap adjacent nodes of a linked list](../solutions/pairwise-swap-adjacent-nodes-linked-list.md) — reversal in groups of 2
- [Sort a Doubly Linked List using Merge Sort](../solutions/sort-doubly-linked-list-merge-sort.md) — uses reversal-adjacent pointer surgery
