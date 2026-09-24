# Pattern 7: Tree BFS (Level-order Traversal)

> From [14 Patterns to Ace Any Coding Interview Question](https://hackernoon.com/14-patterns-to-ace-any-coding-interview-question-c5bb3357f6ed) by Fahim ul Haq, extended with templates, complexity analysis and practice problems from this repo.

## Overview

Use a **queue** to traverse a tree (or graph) level by level: push the root, then repeatedly pop a node, "visit" it, and push all of its children. Everything asked about a tree in level-by-level terms falls to this pattern. The essential trick: know the **level boundary** by snapshotting `len(queue)` at the start of each round — that one line turns traversal into per-level problems (views, averages, zigzag, rightmost node).

## Recognition cues

- "Level by level", "level order", "zigzag", "left/right view", "per level"
- Asked for the minimum number of steps/levels to reach something (BFS = shortest path in unweighted graphs)
- "At each level/depth, do X"

## Template (Python)

```python3
from collections import deque

def bfs(root):
    if not root:
        return []
    result, queue = [], deque([root])
    while queue:
        level_size = len(queue)          # snapshot = one level
        level = []
        for _ in range(level_size):
            node = queue.popleft()
            level.append(node.val)
            for child in (node.left, node.right):
                if child:
                    queue.append(child)
        result.append(level)             # per-level processing
    return result
```

## Complexity

- Time: O(n) — every node enters and leaves the queue once
- Space: O(w) for the queue where w is the max level width (worst case O(n))

## Common pitfalls

- Not snapshotting the level size → per-level logic breaks
- Using a list with `pop(0)` (O(n) pops) instead of a deque
- Forgetting the empty-tree guard
- BFS on a grid/graph needs a visited set **at enqueue time**, not dequeue time (avoids duplicates in queue)

## Practice problems in this repo

- [Level Order Traversal of Binary Tree](../solutions/level-order-traversal-binary-tree.md)
- [Spiral Order Traversal of Binary Tree](../solutions/spiral-order-traversal-binary-tree.md) — zigzag
- [Reverse Level Order Traversal of Binary Tree](../solutions/reverse-level-order-traversal-binary-tree.md)
- [Print left view of binary tree](../solutions/print-left-view-of-binary-tree.md)
- [Print corner nodes of every level in binary tree](../solutions/print-corner-nodes-every-level-binary-tree.md)
- [Print all nodes of a given binary tree in specific order](../solutions/print-nodes-binary-tree-specific-order.md)
- [Find next node in same level for given node in a binary tree](../solutions/find-next-node-in-same-level-binary-tree.md)
- [Invert a Binary Tree](../solutions/invert-binary-tree-recursive-iterative.md)
- [Check if given binary tree is complete binary tree or not](../solutions/check-given-binary-tree-complete-binary-tree-not.md)
- [Breadth First Search (BFS) Algorithm](../solutions/breadth-first-search.md)
- [Shortest path in a Maze | Lee Algorithm](../solutions/lee-algorithm-shortest-path-in-a-maze.md) — same pattern on grids
- [Count the number of islands](../solutions/count-the-number-of-islands.md) — BFS flood-fill on a matrix
