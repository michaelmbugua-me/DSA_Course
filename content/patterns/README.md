# The 14 Patterns — Cheat Sheet & Repo Map

> Based on [14 Patterns to Ace Any Coding Interview Question](https://hackernoon.com/14-patterns-to-ace-any-coding-interview-question-c5bb3357f6ed) by Fahim ul Haq (HackerNoon, 2019), expanded into full study cards with templates, complexities, pitfalls, and practice problems from this repo.

Read the raw article backup in [raw-article.md](raw-article.md). Each pattern has its own card below.

## The cheat sheet

| # | Pattern | Trigger phrases | Core data structure | Time | Card |
|---|---------|-----------------|--------------------|------|------|
| 1 | Sliding Window | longest/shortest **contiguous** subarray/substring | hash map of window state | O(n) | [card](01-sliding-window.md) |
| 2 | Two Pointers | sorted input, find pair/triplet/set | two indices | O(n) | [card](02-two-pointers.md) |
| 3 | Fast & Slow Pointers | cycle in linked list, middle element | two pointers at 1x/2x | O(n), O(1) space | [card](03-fast-slow-pointers.md) |
| 4 | Merge Intervals | overlapping ranges, meetings, schedules | sort + sweep | O(n log n) | [card](04-merge-intervals.md) |
| 5 | Cyclic Sort | numbers in range 1..n, find missing/duplicate | index-as-hash swaps | O(n), O(1) space | [card](05-cyclic-sort.md) |
| 6 | In-place Linked List Reversal | reverse list/sub-list, no extra memory | prev/curr/next | O(n) | [card](06-inplace-reversal-linked-list.md) |
| 7 | Tree BFS | level-by-level, views, zigzag, shortest unweighted path | queue | O(n) | [card](07-tree-bfs.md) |
| 8 | Tree DFS | root-to-leaf paths, subtree checks, path sums | recursion/stack | O(n) | [card](08-tree-dfs.md) |
| 9 | Two Heaps | running median, min of one half + max of other | max-heap + min-heap | O(log n) insert | [card](09-two-heaps.md) |
| 10 | Subsets | all subsets/permutations/combinations | BFS doubling / backtracking | O(2^n), O(n·n!) | [card](10-subsets.md) |
| 11 | Modified Binary Search | sorted (maybe rotated/perturbed), O(log n) | binary search skeleton | O(log n) | [card](11-modified-binary-search.md) |
| 12 | Top K Elements | top/smallest/most-frequent K elements | heap of size K | O(n log k) | [card](12-top-k-elements.md) |
| 13 | K-way Merge | K sorted lists/matrix | min-heap of K heads | O(N log K) | [card](13-k-way-merge.md) |
| 14 | Topological Sort | dependencies, prerequisites, ordering | in-degree + queue (Kahn's) | O(V+E) | [card](14-topological-sort.md) |

## Pattern → repo category map

| Pattern | Where to drill in this repo |
|---------|------------------------------|
| Sliding Window | [Array](../problems/array.md), [String](../problems/string.md) |
| Two Pointers | [Array](../problems/array.md), [String](../problems/string.md) |
| Fast & Slow Pointers | [Linked List](../problems/linked-list.md) |
| Merge Intervals | [Array](../problems/array.md), [Greedy](../problems/greedy.md), [Queue](../problems/queue.md) |
| Cyclic Sort | [Array](../problems/array.md) |
| In-place Reversal | [Linked List](../problems/linked-list.md) |
| Tree BFS | [Binary Tree](../problems/binary-tree.md), [Queue](../problems/queue.md), [Matrix](../problems/matrix.md) |
| Tree DFS | [Binary Tree](../problems/binary-tree.md), [Stack](../problems/stack.md) |
| Two Heaps | [Heap](../problems/heap.md) |
| Subsets | [Backtracking](../problems/backtracking.md), [Array](../problems/array.md), [String](../problems/string.md) |
| Modified Binary Search | [Array](../problems/array.md), [BST](../problems/bst.md) |
| Top K Elements | [Heap](../problems/heap.md), [Array](../problems/array.md) |
| K-way Merge | [Heap](../problems/heap.md), [Linked List](../problems/linked-list.md), [Matrix](../problems/matrix.md) |
| Topological Sort | [Graph](../problems/graph.md) |

## Patterns the article didn't call out (but interviewers do)

The article's list is good but incomplete. These come up just as often and are already covered by problems in this repo:

| Pattern | Trigger | Core technique | Drill in | Card |
|---------|---------|----------------|----------|------|
| 15. Dynamic Programming | "maximum/minimum/ways to...", overlapping subproblems | memo table + recurrence | [Dynamic Programming](../problems/dynamic-programming.md) | [card](15-dynamic-programming.md) |
| 16. Backtracking | "all solutions satisfying constraints", undo choices | choose → explore → un-choose | [Backtracking](../problems/backtracking.md) | [card](16-backtracking.md) |
| 17. Union-Find | connectivity, grouping, cycle detection in undirected graphs | parent/rank trees + path compression | [Graph](../problems/graph.md) | [card](17-union-find.md) |
| 18. Trie (Prefix Tree) | prefixes, dictionaries, word games | character-node tree | [Trie](../problems/trie.md) | [card](18-trie.md) |
| 19. Greedy + proof | "maximum jobs / minimum cost" with a provable swap argument | sort by greedy key | [Greedy](../problems/greedy.md) | [card](19-greedy.md) |

## How to study with this repo

1. **Read one pattern card per session** — template + pitfalls first.
2. **Do 3–5 linked problems** from the card before moving on; re-derive the template from memory before looking.
3. When solving any new question, run the **recognition cues** like a checklist — if 2+ cues match a pattern, try it before anything else.
4. If stuck: identify the data structure (array/list/tree/graph) + the ask (search? order? partition?) — that usually determines the pattern, not the surface story.

## Decision flow (quick version)

```
Sorted data?                    -> Modified Binary Search (11)
Contiguous window/substring?    -> Sliding Window (1)
Pairs/triplets in sorted data?  -> Two Pointers (2)
Linked list cycle/middle?       -> Fast & Slow (3)
Overlapping ranges/schedule?    -> Merge Intervals (4)
Numbers in range 1..n?          -> Cyclic Sort (5)
Reverse a list (in place)?      -> In-place Reversal (6)
Tree, level by level?           -> Tree BFS (7)
Tree, paths/subtrees?           -> Tree DFS (8)
Running median?                 -> Two Heaps (9)
All subsets/permutations?       -> Subsets (10)
Top/first K elements?           -> Top K (12)
K sorted lists?                 -> K-way Merge (13)
Dependencies/ordering?          -> Topological Sort (14)
"Maximum/ways to" + subproblems -> Dynamic Programming (15)
"Try all, undo choices"         -> Backtracking (16)
Connectivity/grouping           -> Union-Find (17)
Prefixes/dictionary words       -> Trie (18)
Provable greedy exchange        -> Greedy (19)
```
