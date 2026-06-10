# Breadth-First Search (BFS) – Iterative and Recursive Implementation

> Source: https://www.techiedelight.com/breadth-first-search/

Breadth–first search (BFS) is an algorithm for traversing or searching tree or graph data structures. It starts at the tree root (or some arbitrary node of a graph, sometimes referred to as a ‘search key’) and explores the neighbor nodes first before moving to the next-level neighbors.

The following graph shows the order in which the nodes are discovered in BFS:

[](https://commons.wikimedia.org/wiki/File%3ABreadth-first-tree.svg "By Alexander Drichel \(Own work\) \[GFDL \(http://www.gnu.org/copyleft/fdl.html\) or CC BY 3.0 \(https://creativecommons.org/licenses/by/3.0/\)\], via Wikimedia Commons")

[Breadth–first search (BFS)](https://techiedelight.com/bfs-interview-questions/) is a graph traversal algorithm that explores vertices in the order of their distance from the source vertex, where distance is the minimum length of a path from the source vertex to the node as evident from the above example.

## Applications of BFS

  * Copying garbage collection, Cheney’s algorithm.
  * Finding the shortest path between two nodes `u` and `v`, with path length measured by the total number of edges (an advantage over depth–first search).
  * Testing a graph for bipartiteness.
  * Minimum Spanning Tree for an unweighted graph.
  * Web crawler.
  * Finding nodes in any connected component of a graph.
  * Ford–Fulkerson method for computing the maximum flow in a flow network.
  * Serialization/Deserialization of a [binary tree](https://techiedelight.com/binary-tree-interview-questions/) vs. serialization in sorted order allows the tree to be reconstructed efficiently.

## Iterative Implementation of BFS

The non-recursive implementation of BFS is similar to the [non-recursive implementation of DFS](https://techiedelight.com/depth-first-search/#iterative) but differs from it in two ways:

  * It uses a [queue](https://techiedelight.com/circular-queue-implementation-c/) instead of a [stack](https://techiedelight.com/stack-implementation/).
  * It checks whether a vertex has been discovered before pushing the vertex rather than delaying this check until the vertex is dequeued.

The algorithm can be implemented as follows in TypeScript:

```ts
// A class to represent a graph object
class Graph {
    // A list of lists to represent an adjacency list
    adjList: number[][];

    // Constructor
    constructor(edges: [number, number][], n: number) {
        this.adjList = Array.from({ length: n }, () => []);

        // add edges to the undirected graph
        for (const [src, dest] of edges) {
            this.adjList[src].push(dest);
            this.adjList[dest].push(src);
        }
    }
}

// Perform BFS on the graph starting from vertex `v`
function BFS(graph: Graph, v: number, discovered: boolean[]): void {

    // create a queue for doing BFS
    const q: number[] = [];

    // mark the source vertex as discovered
    discovered[v] = true;

    // enqueue source vertex
    q.push(v);

    // loop till queue is empty
    while (q.length) {

        // dequeue front node and print it
        v = q.shift()!;
        process.stdout.write(`${v} `);

        // do for every edge (v, u)
        for (const u of graph.adjList[v]) {
            if (!discovered[u]) {
                // mark it as discovered and enqueue it
                discovered[u] = true;
                q.push(u);
            }
        }
    }
}

// List of graph edges as per the above diagram
const edges: [number, number][] = [
    [1, 2], [1, 3], [1, 4], [2, 5], [2, 6], [5, 9],
    [5, 10], [4, 7], [4, 8], [7, 11], [7, 12]
    // vertex 0, 13, and 14 are single nodes
];

// total number of nodes in the graph (labelled from 0 to 14)
const n = 15;

// build a graph from the given edges
const graph = new Graph(edges, n);

// to keep track of whether a vertex is discovered or not
const discovered: boolean[] = new Array(n).fill(false);

// Perform BFS traversal from all undiscovered nodes to
// cover all connected components of a graph
for (let i = 0; i < n; i++) {
    if (!discovered[i]) {
        // start BFS traversal from vertex i
        BFS(graph, i, discovered);
    }
}
```

**Output:** 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14


## Recursive Implementation of BFS

The recursive algorithm can be implemented as follows in TypeScript:

```ts
// A class to represent a graph object
class Graph {
    // A list of lists to represent an adjacency list
    adjList: number[][];

    // Constructor
    constructor(edges: [number, number][], n: number) {
        this.adjList = Array.from({ length: n }, () => []);

        // add edges to the undirected graph
        for (const [src, dest] of edges) {
            this.adjList[src].push(dest);
            this.adjList[dest].push(src);
        }
    }
}

// Perform BFS recursively on the graph
function recursiveBFS(graph: Graph, q: number[], discovered: boolean[]): void {

    if (!q.length) {
        return;
    }

    // dequeue front node and print it
    const v = q.shift()!;
    process.stdout.write(`${v} `);

    // do for every edge (v, u)
    for (const u of graph.adjList[v]) {
        if (!discovered[u]) {
            // mark it as discovered and enqueue it
            discovered[u] = true;
            q.push(u);
        }
    }

    recursiveBFS(graph, q, discovered);
}

// List of graph edges as per the above diagram
const edges: [number, number][] = [
    [1, 2], [1, 3], [1, 4], [2, 5], [2, 6], [5, 9],
    [5, 10], [4, 7], [4, 8], [7, 11], [7, 12]
    // vertex 0, 13, and 14 are single nodes
];

// total number of nodes in the graph (labelled from 0 to 14)
const n = 15;

// build a graph from the given edges
const graph = new Graph(edges, n);

// to keep track of whether a vertex is discovered or not
const discovered: boolean[] = new Array(n).fill(false);

// create a queue for doing BFS
const q: number[] = [];

// Perform BFS traversal from all undiscovered nodes to
// cover all connected components of a graph
for (let i = 0; i < n; i++) {
    if (!discovered[i]) {
        // mark the source vertex as discovered
        discovered[i] = true;

        // enqueue source vertex
        q.push(i);

        // start BFS traversal from vertex i
        recursiveBFS(graph, q, discovered);
    }
}
```

**Output:** 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14

The time complexity of BFS traversal is O(V + E), where `V` and `E` are the total number of vertices and edges in the graph, respectively. Please note that O(E) may vary between O(1) and O(V2), depending on how dense the graph is.

**Also See:**

> [Breadth First Search (BFS) – Interview Questions & Practice Problems](https://techiedelight.com/bfs-interview-questions/)
