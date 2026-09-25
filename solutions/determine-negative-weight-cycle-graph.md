# Determine a negative-weight cycle in a graph

> Source: https://www.techiedelight.com/determine-negative-weight-cycle-graph/

Given a directed weighted graph, report a negative-weight cycle in the graph, if any. A negative-weight cycle is a cycle in a graph whose edges sum to a negative value.

For example, consider the following graph:

It has one negative-weight cycle, `1—2—3—1` with sum `-2`.

> 

## Approach 1: Using Bellman–Ford algorithm

[Bellman–Ford algorithm](https://techiedelight.com/single-source-shortest-paths-bellman-ford-algorithm/) is used to compute the shortest paths from a single source vertex to all the other vertices in a given weighted digraph. It can be modified to report any negative-weight cycle in the graph.

To check if the graph contains a negative-weight cycle, run Bellman–Ford once from each vertex. After running the relaxation step in Bellman–Ford `V-1` times, the idea is to perform a final scan of all the edges. If any distance is updated, then a path of length `|V|` edges have been found, which can only occur if at least one negative cycle exists in the graph.

The time complexity of this approach will be O(V2 × E), where `V` and `E` are the total number of vertices and edges in the graph, respectively. If the graph is dense, i.e., `E = V2`, then the time complexity becomes O(V4).

This is demonstrated below in TypeScript:

```ts
// define infinity as the maximum safe integer value
const INF = Number.MAX_SAFE_INTEGER;

// A class to store a graph edge
class Edge {
  constructor(public source: number, public dest: number, public weight: number) {}
}

// Function to run the Bellman–Ford algorithm from a given source
function bellmanFord(edges: Edge[], source: number, n: number): boolean {
  // cost[] stores shortest path information
  const cost: number[] = new Array(n).fill(INF);

  // Initially, all vertices except the source vertex weight infinity
  cost[source] = 0;

  // Relaxation step (run V-1 times)
  for (let k = 1; k < n; k++) {
    // consider all edges from `u` to `v` having weight `w`
    for (const e of edges) {
      // edge from `u` to `v` having weight `w`
      const u = e.source;
      const v = e.dest;
      const w = e.weight;

      // if the cost to destination `u` can be shortened by taking edge (u, v)
      if (cost[u] !== INF && cost[u] + w < cost[v]) {
        // update cost to the new lower value
        cost[v] = cost[u] + w;
      }
    }
  }

  // Run relaxation step once more for n'th time to check for negative-weight cycles
  for (const e of edges) {
    // edge from `u` to `v` having weight `w`
    const u = e.source;
    const v = e.dest;
    const w = e.weight;

    // if the cost to destination `u` can be shortened by taking edge (u, v)
    if (cost[u] !== INF && cost[u] + w < cost[v]) {
      return true;
    }
  }

  return false;
}

function hasNegativeWeightCycle(adjMatrix: number[][]): boolean {
  // base case
  if (adjMatrix.length === 0) {
    return false;
  }

  // create a list to store graph edges
  const edges: Edge[] = [];

  // total number of nodes in the graph
  const n = adjMatrix.length;

  for (let v = 0; v < n; v++) {
    for (let u = 0; u < n; u++) {
      if (adjMatrix[v][u] !== 0 && adjMatrix[v][u] !== INF) {
        // edge from source `v` to dest `u` having specified weight
        edges.push(new Edge(v, u, adjMatrix[v][u]));
      }
    }
  }

  // Run Bellman–Ford algorithm from each vertex as the source
  // and check for any negative-weight cycle
  for (let i = 0; i < n; i++) {
    if (bellmanFord(edges, i, n)) {
      return true;
    }
  }

  return false;
}

// given adjacency representation of the matrix
const adjMatrix: number[][] = [
  [0,   INF, -2,  INF],
  [4,   0,   -3,  INF],
  [INF, INF, 0,   2],
  [INF, -1,  INF, 0]
];

const result = hasNegativeWeightCycle(adjMatrix);
if (result) {
  console.log("Negative-weight cycle found");
} else {
  console.log("Negative-weight cycle doesn't exist");
}
```

## Approach 2: Using Floyd–Warshall Algorithm

[Floyd–Warshall algorithm](https://techiedelight.com/pairs-shortest-paths-floyd-warshall-algorithm/) is an algorithm for finding the shortest paths in a weighted graph with positive or negative edge weights. It can easily be modified to report any negative-weight cycle in the graph.

To detect negative cycles using the Floyd–Warshall algorithm, check the cost matrix’s diagonal for any negative number as it indicates that the graph contains at least one negative cycle. The Floyd–Warshall algorithm iteratively revises path lengths between all pairs of vertices `(i, j)`, including where `i = j`. Initially, the length of the path `(i, i)` is zero. A path `[i, k…i]` can only improve upon this if it has a length less than zero, i.e., denotes a negative cycle. Thus, `(i, i)` will be negative if there exists a negative-length path from `i` back to `i`. The time complexity of this approach is O(V3), where `V` is the total number of vertices in the graph.

This is demonstrated below in TypeScript:

```ts
// define infinity as the maximum safe integer value
const INF = Number.MAX_SAFE_INTEGER;

// Function to run the Floyd–Warshall algorithm
function floydWarshall(adjMatrix: number[][]): void {
  // base case
  if (adjMatrix.length === 0) {
    return;
  }

  // total number of vertices in the adjacency matrix
  const n = adjMatrix.length;

  // cost[] stores shortest path information
  const cost: number[][] = Array.from({ length: n }, () => new Array(n));

  // initialize `cost[]` matrix
  for (let v = 0; v < n; v++) {
    for (let u = 0; u < n; u++) {
      // Initially, the cost would be the same as the weight of the edge
      cost[v][u] = adjMatrix[v][u];
    }
  }

  // Run Floyd–Warshall
  for (let k = 0; k < n; k++) {
    for (let v = 0; v < n; v++) {
      for (let u = 0; u < n; u++) {
        // If vertex `k` is on the shortest path from `v` to `u`,
        // then update the value of cost[v][u]
        if (cost[v][k] !== INF && cost[k][u] !== INF &&
          cost[v][k] + cost[k][u] < cost[v][u]) {
          cost[v][u] = cost[v][k] + cost[k][u];
        }
      }

      // If diagonal elements become negative, the
      // graph contains a negative-weight cycle
      if (cost[v][v] < 0) {
        console.log("Negative-weight cycle found");
        return;
      }
    }
  }

  console.log("Negative-weight cycle doesn't exist");
}

// given adjacency representation of the matrix
const adjMatrix: number[][] = [
  [0,   INF, -2,  INF],
  [4,   0,   -3,  INF],
  [INF, INF, 0,   2],
  [INF, -1,  INF, 0]
];

// Run Floyd–Warshall algorithm
floydWarshall(adjMatrix);
```
