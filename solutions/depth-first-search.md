# Depth First Search (DFS) – Iterative and Recursive Implementation

> Source: https://www.techiedelight.com/depth-first-search/

Depth–first search (DFS) is an algorithm for traversing or searching tree or graph data structures. One starts at the root (selecting some arbitrary node as the root for a graph) and explore as far as possible along each branch before [backtracking](https://techiedelight.com/backtracking-interview-questions/).

The following graph shows the order in which the nodes are discovered in DFS:

[](https://commons.wikimedia.org/wiki/File%3ADepth-first-tree.svg "By Alexander Drichel \(Own work\) \[GFDL \(http://www.gnu.org/copyleft/fdl.html\) or CC BY-SA 3.0 \(https://creativecommons.org/licenses/by-sa/3.0/\)\], via Wikimedia Commons")

### Depth–first search in trees

A tree is an undirected graph in which any two vertices are connected by exactly one path. In other words, any acyclic connected graph is a tree. For a tree, we have the following traversal methods:

  * [Preorder](https://techiedelight.com/preorder-tree-traversal-iterative-recursive/): visit each node before its children.
  * [Postorder](https://techiedelight.com/postorder-tree-traversal-iterative-recursive/): visit each node after its children.
  * [Inorder](https://techiedelight.com/inorder-tree-traversal-iterative-recursive/) (for [binary trees](https://techiedelight.com/binary-tree-interview-questions/) only): visit left subtree, node, right subtree.

These are already covered in detail in separate posts.

### Depth–first search in Graph

A [Depth–first search (DFS)](https://techiedelight.com/depth-first-search/) is a way of traversing graphs closely related to the preorder traversal of a tree. Following is the recursive implementation of preorder traversal:

procedure preorder(treeNode v) { visit(v); for each child u of v preorder(u); }

To turn this into a graph traversal algorithm, replace “child” with “neighbor”. But to prevent infinite loops, keep track of the vertices that are already discovered and not revisit them.

procedure dfs(vertex v) { visit(v); for each neighbor u of v if u is undiscovered call dfs(u); }

The recursive algorithm can be implemented as follows in TypeScript:

```ts
// A class to represent a graph object
class Graph {
  // a list of lists to represent an adjacency list
  adjList: number[][];

  // Constructor
  constructor(edges: [number, number][], n: number) {
    // a list of lists to represent an adjacency list
    this.adjList = Array.from({ length: n }, () => []);

    // add edges to the undirected graph
    for (const [src, dest] of edges) {
      this.adjList[src].push(dest);
      this.adjList[dest].push(src);
    }
  }
}

// Function to perform DFS traversal on the graph on a graph
function DFS(graph: Graph, v: number, discovered: boolean[]): void {
  discovered[v] = true;   // mark the current node as discovered
  console.log(v);         // print the current node

  // do for every edge (v, u)
  for (const u of graph.adjList[v]) {
    if (!discovered[u]) { // if `u` is not yet discovered
      DFS(graph, u, discovered);
    }
  }
}

// List of graph edges as per the above diagram
const edges: [number, number][] = [
  // Notice that node 0 is unconnected
  [1, 2], [1, 7], [1, 8], [2, 3], [2, 6], [3, 4],
  [3, 5], [8, 9], [8, 12], [9, 10], [9, 11]
];

// total number of nodes in the graph (labelled from 0 to 12)
const n = 13;

// build a graph from the given edges
const graph = new Graph(edges, n);

// to keep track of whether a vertex is discovered or not
const discovered: boolean[] = new Array(n).fill(false);

// Perform DFS traversal from all undiscovered nodes to
// cover all connected components of a graph
for (let i = 0; i < n; i++) {
  if (!discovered[i]) {
    DFS(graph, i, discovered);
  }
}
```

**Output:** 0 1 2 3 4 5 6 7 8 9 10 11 12

The time complexity of DFS traversal is O(V + E), where `V` and `E` are the total number of vertices and edges in the graph, respectively. Please note that O(E) may vary between O(1) and O(V2), depending on how dense the graph is.

## Iterative Implementation of DFS

The non-recursive implementation of DFS is similar to the [non-recursive implementation of BFS](https://techiedelight.com/breadth-first-search/#iterative) but differs from it in two ways:

  * It uses a [stack](https://techiedelight.com/stack-implementation/) instead of a [queue](https://techiedelight.com/circular-queue-implementation-c/).
  * The DFS should mark discovered only after popping the vertex, not before pushing it.
  * It uses a reverse iterator instead of an iterator to produce the same results as recursive DFS.

Following is the TypeScript program that demonstrates it:

```ts
// A class to represent a graph object
class Graph {
  // A list of lists to represent an adjacency list
  adjList: number[][];

  // Constructor
  constructor(edges: [number, number][], n: number) {
    // A list of lists to represent an adjacency list
    this.adjList = Array.from({ length: n }, () => []);

    // add edges to the undirected graph
    for (const [src, dest] of edges) {
      this.adjList[src].push(dest);
      this.adjList[dest].push(src);
    }
  }
}

// Perform iterative DFS on graph starting from vertex `v`
function iterativeDFS(graph: Graph, v: number, discovered: boolean[]): void {
  // create a stack used to do iterative DFS
  const stack: number[] = [];

  // push the source node into the stack
  stack.push(v);

  // loop till stack is empty
  while (stack.length > 0) {
    // Pop a vertex from the stack
    v = stack.pop()!;

    // if the vertex is already discovered yet, ignore it
    if (discovered[v]) {
      continue;
    }

    // we will reach here if the popped vertex `v` is not discovered yet;
    // print `v` and process its undiscovered adjacent nodes into the stack
    discovered[v] = true;
    console.log(v);

    // do for every edge (v, u)
    const adjList = graph.adjList[v];
    for (let i = adjList.length - 1; i >= 0; i--) {
      const u = adjList[i];
      if (!discovered[u]) {
        stack.push(u);
      }
    }
  }
}

// List of graph edges as per the above diagram
const edges: [number, number][] = [
  // Notice that node 0 is unconnected
  [1, 2], [1, 7], [1, 8], [2, 3], [2, 6], [3, 4],
  [3, 5], [8, 9], [8, 12], [9, 10], [9, 11]
  // (6, 9) introduces a cycle
];

// total number of nodes in the graph (labelled from 0 to 12)
const n = 13;

// build a graph from the given edges
const graph = new Graph(edges, n);

// to keep track of whether a vertex is discovered or not
const discovered: boolean[] = new Array(n).fill(false);

// Do iterative DFS traversal from all undiscovered nodes to
// cover all connected components of a graph
for (let i = 0; i < n; i++) {
  if (!discovered[i]) {
    iterativeDFS(graph, i, discovered);
  }
}
```

**Output:** 0 1 2 3 4 5 6 7 8 9 10 11 12

## Applications of DFS

  * [Finding connected components in a graph](https://techiedelight.com/check-given-graph-strongly-connected-not/).
  * [Topological sorting](https://techiedelight.com/topological-sorting-dag/) in a DAG(Directed Acyclic Graph).
  * Finding 2/3–(edge or vertex)–connected components.
  * Finding the [bridges of a graph](https://techiedelight.com/2-edge-connectivity-graph/).
  * Finding [strongly connected components](https://techiedelight.com/check-graph-strongly-connected-one-dfs-traversal/).
  * [Solving puzzles with only one solution](https://techiedelight.com/maze-problems-in-data-structures/), such as mazes.
  * Finding biconnectivity in graphs and many more…

**Also See:**

> [Depth First Search (DFS) – Interview Questions & Practice Problems](https://techiedelight.com/dfs-interview-questions/)

**References:** <https://www.ics.uci.edu/~eppstein/161/960215.html>
