# Pattern 14: Topological Sort (Kahn's Algorithm)

> From [14 Patterns to Ace Any Coding Interview Question](https://hackernoon.com/14-patterns-to-ace-any-coding-interview-question-c5bb3357f6ed) by Fahim ul Haq, extended with templates, complexity analysis and practice problems from this repo.

## Overview

Find a linear ordering of elements with dependencies on each other (a DAG): if B depends on A, A comes first. Kahn's algorithm: build the graph + in-degree counts, collect all zero-in-degree "source" nodes in a queue, then repeatedly pop a source, append it to the order, and decrement its children's in-degrees — enqueueing any child that hits zero. If the final order is shorter than the node count, the graph has a cycle (that's the cycle-detection bonus).

## Recognition cues

- "Task scheduling", "course prerequisites", "build order", "dependency resolution"
- Asked to order objects such that dependencies come first
- Verifying an order is valid / counting distinct valid orders
- Graph must be **directed** and acyclic for a total order to exist

## Template (TypeScript)

```ts
function topologicalSort<V>(vertices: V[], edges: [V, V][]): V[] {
  const graph = new Map<V, V[]>(vertices.map((v) => [v, []]));
  const inDegree = new Map<V, number>(vertices.map((v) => [v, 0]));
  for (const [parent, child] of edges) {
    // parent must come before child
    graph.get(parent)!.push(child);
    inDegree.set(child, inDegree.get(child)! + 1);
  }

  // deque as a plain array (shift/push)
  const sources: V[] = vertices.filter((v) => inDegree.get(v) === 0);
  const order: V[] = [];
  while (sources.length > 0) {
    const v = sources.shift()!;
    order.push(v);
    for (const child of graph.get(v)!) {
      inDegree.set(child, inDegree.get(child)! - 1);
      if (inDegree.get(child) === 0) {
        sources.push(child);
      }
    }
  }

  return order.length === vertices.length ? order : []; // [] => cycle
}
```

## Complexity

- Time: O(V + E) — every vertex and edge is touched once
- Space: O(V + E) for the graph, plus O(V) for the queue

## Common pitfalls

- Forgetting the cycle check (order length < V) — course-schedule problems hinge on it
- Mutating the in-degree map incorrectly, e.g. double-decrementing
- Assuming alphabetical tie-breaking unless asked — DFS-based topo sort gives a different (also valid) order
- Undirected or cyclic inputs need different patterns (Union-Find, cycle detection)

## Practice problems in this repo

- [Topological Sorting in a DAG](../solutions/topological-sorting-dag.md)
- [Kahn's Topological Sort Algorithm](../solutions/kahn-topological-sort-algorithm.md)
- [Find all Possible Topological Orderings of a DAG](../solutions/find-all-possible-topological-orderings-of-dag.md)
- [Check if given digraph is a DAG (Directed Acyclic Graph) or not](../solutions/check-given-digraph-dag-directed-acyclic-graph-not.md)
- [Total paths in given digraph from given source to destination having exactly m edges](../solutions/total-paths-in-digraph-from-source-to-destination-m-edges.md)
- [Snake and Ladder Problem](../solutions/min-throws-required-to-win-snake-and-ladder-game.md) — shortest path with implicit dependencies
