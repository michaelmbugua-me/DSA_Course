# Pattern 17: Union-Find / Disjoint Set (bonus)

> Extension to the 14 Patterns article — the fastest way to answer "are these connected?" queries.

## Overview

Maintain a collection of disjoint sets with two operations, both near-O(1) amortized: `find(x)` (which set does x belong to?) and `union(x, y)` (merge the sets). Implemented as a forest of parent pointers with two optimizations — **union by rank/size** (attach the smaller tree under the larger) and **path compression** (flatten on find). Together they give the inverse-Ackermann complexity, effectively constant.

Use cases: connected components, cycle detection in undirected graphs, Kruskal's MST, dynamic connectivity, "accounts merge"-style grouping.

## Recognition cues

- "Are A and B connected?", "count the number of groups/components"
- Adding edges/relations incrementally and querying connectivity along the way
- Merging entities that share a common attribute (people with same email, islands joining)
- Undirected cycle detection without DFS recursion

## Template (Python)

```python3
class DSU:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n

    def find(self, x):
        while self.parent[x] != x:
            self.parent[x] = self.parent[self.parent[x]]  # path halving
            x = self.parent[x]
        return x

    def union(self, x, y):
        rx, ry = self.find(x), self.find(y)
        if rx == ry:
            return False               # already connected (cycle!)
        if self.rank[rx] < self.rank[ry]:
            rx, ry = ry, rx
        self.parent[ry] = rx
        if self.rank[rx] == self.rank[ry]:
            self.rank[rx] += 1
        return True
```

## Complexity

- Time: O(α(n)) per operation amortized — α is inverse Ackermann, ≤ 4 for any real input
- Space: O(n)

## Common pitfalls

- Skipping both optimizations (plain union-find degrades to O(n) chains)
- Comparing roots but forgetting union returns "already connected" → free cycle detection
- Path compression in a loop without halving → subtle performance bugs
- 2D grids: encode cell (r, c) as `r * cols + c` before unioning

## Practice problems in this repo

- [Disjoint-set Data Structure (Union-Find Algorithm)](../solutions/disjoint-set-data-structure-union-find-algorithm.md)
- [Union-Find Algorithm for Cycle Detection in undirected graph](../solutions/union-find-algorithm-cycle-detection-graph.md)
- [Check if an undirected graph contains cycle or not](../solutions/check-undirected-graph-contains-cycle-not.md)
- [Count the number of islands](../solutions/count-the-number-of-islands.md) — can also be solved with DSU flood merging
- [Kruskal's Algorithm for finding Minimum Spanning Tree](../solutions/kruskals-algorithm-for-finding-minimum-spanning-tree.md)
