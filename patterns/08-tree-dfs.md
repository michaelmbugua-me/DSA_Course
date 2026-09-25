# Pattern 8: Tree DFS (Depth-first Traversal)

> From [14 Patterns to Ace Any Coding Interview Question](https://hackernoon.com/14-patterns-to-ace-any-coding-interview-question-c5bb3357f6ed) by Fahim ul Haq, extended with templates, complexity analysis and practice problems from this repo.

## Overview

Traverse a tree branch by branch, using recursion (or an explicit stack). The decision at each node is **when** to process it: before the children (pre-order), between them (in-order), or after (post-order). Most "root-to-leaf", "path", "subtree", and "sum along path" problems are post-order DFS: gather results from children, combine at the parent.

## Recognition cues

- "In-order / pre-order / post-order traversal"
- "Path from root to leaf", "path with sum X", "all paths"
- Answer is about nodes **closer to the leaves**; or "for each leaf/each path..."
- Subtree comparisons (is T2 a subtree of T1, identical trees, symmetric trees)

## Template (TypeScript)

```ts
function dfs(root: TreeNode | null): T {
    if (!root) return baseValue; // e.g. 0 or true
    const left = dfs(root.left);
    const right = dfs(root.right);
    // combine children's answers with the current node
    return combine(left, right, root.val);
}
```

With a running path (root→leaf problems): carry a list/path down the recursion and pop (backtrack) on the way up.

## Complexity

- Time: O(n) — each node is visited once
- Space: O(h) recursion stack, h = tree height — O(log n) balanced, O(n) skewed

## Common pitfalls

- Confusing in-order with pre-order when reconstructing trees
- Not handling the empty subtree base case → NoneType errors
- Sharing a mutable path/accumulator across recursion branches without backtracking
- Global maxima (diameter, max path sum) that mix "path through node" with "path ending at node" — keep them in separate variables

## Practice problems in this repo

- [Inorder Tree Traversal](../solutions/inorder-tree-traversal-iterative-recursive.md)
- [Preorder Tree Traversal](../solutions/preorder-tree-traversal-iterative-recursive.md)
- [Postorder Tree Traversal](../solutions/postorder-tree-traversal-iterative-recursive.md)
- [Print all paths from root to leaf nodes in a binary tree](../solutions/print-all-paths-from-root-to-leaf-nodes-binary-tree.md)
- [Find maximum sum root-to-leaf path in a binary tree](../solutions/find-maximum-sum-root-to-leaf-path-binary-tree.md)
- [Find ancestors of given node in a Binary Tree](../solutions/find-ancestors-of-given-node-binary-tree.md)
- [Find Lowest Common Ancestor (LCA) of two nodes in a binary tree](../solutions/find-lowest-common-ancestor-lca-two-nodes-binary-tree.md)
- [Check if two given binary trees are identical or not](../solutions/check-if-two-binary-trees-are-identical-not-iterative-recursive.md)
- [Truncate given binary tree to remove nodes which lie on a path having sum less than K](../solutions/truncate-given-binary-tree-remove-nodes-lie-path-sum-less-k.md)
- [Find maximum sum path between two leaves in a binary tree](../solutions/find-maximum-sum-path-between-two-leaves-in-a-binary-tree.md) — post-order combine
- [Calculate height of a binary tree](../solutions/calculate-height-binary-tree-iterative-recursive.md)
- [Depth First Search (DFS) Algorithm](../solutions/depth-first-search.md)
