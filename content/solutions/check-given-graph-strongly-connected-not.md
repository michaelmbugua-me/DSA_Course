# Check if a graph is strongly connected or not

> Source: https://www.techiedelight.com/check-given-graph-strongly-connected-not/

[Graph](https://www.techiedelight.com/Category/Graphs/)

Given a directed graph, check if it is strongly connected or not. A directed graph is said to be strongly connected if every vertex is reachable from every other vertex.

For example, the following graph is strongly connected as a path exists between all pairs of vertices:

> 

A simple solution is to perform [Depth–first search (DFS)](https://techiedelight.com/depth-first-search/) or [Breadth–first search (BFS)](https://techiedelight.com/breadth-first-search/) starting from every vertex in the graph. If each DFS/BFS call visits every other vertex in the graph, then the graph is strongly connected.

The algorithm can be implemented as follows in TypeScript:

```ts
// A class to represent a graph object
class Graph {
    // A list of lists to represent an adjacency list
    adjList: number[][];

    // Constructor
    constructor(edges: [number, number][], n: number) {
        this.adjList = Array.from({ length: n }, () => []);

        // add edges to the directed graph
        for (const [src, dest] of edges) {
            this.adjList[src].push(dest);
        }
    }
}

// Function to perform DFS traversal on the graph on a graph
const DFS = (graph: Graph, v: number, visited: boolean[]): void => {

    // mark current node as visited
    visited[v] = true;

    // do for every edge (v, u)
    for (const u of graph.adjList[v]) {
        // `u` is not visited
        if (!visited[u]) {
            DFS(graph, u, visited);
        }
    }
};

// Check if the graph is strongly connected or not
const isStronglyConnected = (graph: Graph, n: number): boolean => {

    // do for every vertex
    for (let i = 0; i < n; i++) {

        // to keep track of whether a vertex is visited or not
        const visited: boolean[] = new Array(n).fill(false);

        // start DFS from the first vertex
        DFS(graph, i, visited);

        // If DFS traversal doesn't visit all vertices,
        // then the graph is not strongly connected
        for (const b of visited) {
            if (!b) {
                return false;
            }
        }
    }

    return true;
};

// List of graph edges as per the above diagram
const edges: [number, number][] = [
    [0, 4], [1, 0], [1, 2], [2, 1], [2, 4], [3, 1], [3, 2], [4, 3]
];

// total number of nodes in the graph
const n = 5;

// construct graph
const graph = new Graph(edges, n);

// check if the graph is not strongly connected or not
if (isStronglyConnected(graph, n)) {
    console.log('The graph is strongly connected');
}
else {
    console.log('The graph is not strongly connected');
}
```

**Output:** The graph is strongly connected

The time complexity of the above solution is O(n × (n + m)), where `n` is the total number of vertices and `m` is the total number of edges in the graph.

Can we do better?

We can say that G is strongly connected if:

  1. `DFS(G, v)` visits all vertices in the graph `G`, then there exists a path from `v` to every other vertex in `G`, and
  2. There exists a path from every other vertex in `G` to `v`.

Proof:

For `G` to be strongly connected, a path from `x —> y` and `y —> x` should exist for any pair of vertices `(x, y)` in the graph.

If points 1 and 2 are true, we can reach `x —> y` by going from vertex `x` to vertex `v` (from pt. 2), and then from vertex `v` to vertex `y` (from pt. 1).

Similarly, we can reach `y —> x` by going from vertex `y` to vertex `v` (from pt. 2), and then from vertex `v` to vertex `x` (from pt. 1).

Complete Algorithm:

  1. Start `DFS(G, v)` from a random vertex `v` of the graph `G`. If `DFS(G, v)` fails to reach every other vertex in the graph `G`, then there is some vertex `u`, such that there is no directed path from `v` to `u`. Thus, `G` is not strongly connected. If it does reach every vertex, then there is a directed path from `v` to every other vertex in the graph `G`.
  2. Reverse the direction of all edges in the directed graph `G`.
  3. Again, run a DFS starting from vertex `v`. If the DFS fails to reach every vertex, then there is some vertex `u`, such that in the original graph, there is no directed path from `u` to `v`. On the other hand, if it does reach every vertex, then there is a directed path from every vertex `u` to `v` in the original graph.

If `G` passes both DFS, it is strongly connected. The algorithm can be implemented as follows in TypeScript:

```ts
// A class to represent a graph object
class Graph {
    // A list of lists to represent an adjacency list
    adjList: number[][];

    // Constructor
    constructor(edges: [number, number][], n: number) {
        this.adjList = Array.from({ length: n }, () => []);

        // add edges to the directed graph
        for (const [src, dest] of edges) {
            this.adjList[src].push(dest);
        }
    }
}

// Function to perform DFS traversal on the graph on a graph
const DFS = (graph: Graph, v: number, visited: boolean[]): void => {

    // mark current node as visited
    visited[v] = true;

    // do for every edge (v, u)
    for (const u of graph.adjList[v]) {
        // `u` is not visited
        if (!visited[u]) {
            DFS(graph, u, visited);
        }
    }
};

// Function to check if the graph is strongly connected or not
const isStronglyConnected = (graph: Graph, n: number): boolean => {

    // to keep track of whether a vertex is visited or not
    const visited: boolean[] = new Array(n).fill(false);

    // choose a random starting point
    const v = 0;

    // run a DFS starting at `v`
    DFS(graph, v, visited);

    // If DFS traversal doesn't visit all vertices,
    // then the graph is not strongly connected
    for (const b of visited) {
        if (!b) {
            return false;
        }
    }

    // reset visited list
    const resetVisited: boolean[] = new Array(n).fill(false);

    // Reverse the direction of all edges in the
    // directed graph
    const reversedEdges: [number, number][] = [];
    for (let i = 0; i < n; i++) {
        for (const j of graph.adjList[i]) {
            reversedEdges.push([j, i]);
        }
    }

    // Create a graph from reversed edges
    const gr = new Graph(reversedEdges, n);

    // Again run a DFS starting at `v`
    DFS(gr, v, resetVisited);

    // If DFS traversal doesn't visit all vertices,
    // then the graph is not strongly connected
    for (const b of resetVisited) {
        if (!b) {
            return false;
        }
    }

    // if the graph "passes" both DFSs, it is strongly connected
    return true;
};

// List of graph edges as per the above diagram
const edges: [number, number][] = [
    [0, 4], [1, 0], [1, 2], [2, 1], [2, 4], [3, 1], [3, 2], [4, 3]
];

// total number of nodes in the graph
const n = 5;

// construct graph
const graph = new Graph(edges, n);

// check if the graph is not strongly connected or not
if (isStronglyConnected(graph, n)) {
    console.log('The graph is strongly connected');
}
else {
    console.log('The graph is not strongly connected');
}
```

**Output:** The graph is strongly connected

The time complexity of the above solution is O(V + E), where `V` and `E` are the total number of vertices and edges in the graph, respectively. Please note that O(E) may vary between O(1) and O(V2), depending on how dense the graph is.

**Reference:** [Dr. Naveen Garg, IIT–D (Lecture – 30 Applications of DFS in Directed Graphs)](https://www.youtube.com/watch?v=o6YWEsLslKs)
