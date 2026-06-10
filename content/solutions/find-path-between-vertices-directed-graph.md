# Find the path between given vertices in a directed graph

> Source: https://www.techiedelight.com/find-path-between-vertices-directed-graph/

Given a directed graph and two vertices (say source and destination vertex), determine if the destination vertex is reachable from the source vertex or not. If a path exists from the source vertex to the destination vertex, print it.

For example, there exist two paths `[0—3—4—6—7]` and `[0—3—5—6—7]` from vertex `0` to vertex `7` in the following graph. In contrast, there is no path from vertex `7` to any other vertex.

> 

We can use the [Breadth–first search (BFS)](https://techiedelight.com/breadth-first-search/) algorithm to check the connectivity between any two vertices in the graph efficiently. The idea is to start the BFS routine from the source vertex and check if the destination vertex is reached during the traversal. If the destination vertex is not encountered at any point, we can say that it’s not reachable from the source vertex.

This approach is demonstrated below in TypeScript:

```ts
// A class to represent a graph object
class Graph {
    // A list of lists to represent an adjacency list
    adjList: number[][];

    // Constructor
    constructor(edges: [number, number][], n: number) {
        this.adjList = [];

        for (let i = 0; i < n; i++) {
            this.adjList.push([]);
        }

        // add edges to the directed graph
        for (const [src, dest] of edges) {
            this.adjList[src].push(dest);
        }
    }
}

// Function to perform BFS traversal from a given source vertex in a graph to
// determine if a destination vertex is reachable from the source or not
function isReachable(graph: Graph, src: number, dest: number): boolean {

    // get the total number of nodes in the graph
    const n = graph.adjList.length;

    // to keep track of whether a vertex is discovered or not
    const discovered = new Array<boolean>(n).fill(false);

    // create a queue for doing BFS
    const q: number[] = [];

    // mark the source vertex as discovered
    discovered[src] = true;

    // enqueue source vertex
    q.push(src);

    // loop till queue is empty
    while (q.length) {

        // dequeue front node and print it
        const v = q.shift();
        if (v === undefined) {
            break;
        }

        // if destination vertex is found
        if (v === dest) {
            return true;
        }

        // do for every edge (v, u)
        for (const u of graph.adjList[v]) {
            if (!discovered[u]) {
                // mark it as discovered and enqueue it
                discovered[u] = true;
                q.push(u);
            }
        }
    }

    return false;
}

// List of graph edges as per the above diagram
const edges: [number, number][] = [
    [0, 3], [1, 0], [1, 2], [1, 4], [2, 7], [3, 4],
    [3, 5], [4, 3], [4, 6], [5, 6], [6, 7]
];

// total number of nodes in the graph (labeled from 0 to 7)
const n = 8;

// build a graph from the given edges
const graph = new Graph(edges, n);

// source and destination vertex
const src = 0, dest = 7;

// perform BFS traversal from the source vertex to check the connectivity
if (isReachable(graph, src, dest)) {
    console.log(`Path exists from vertex ${src} to vertex ${dest}`);
} else {
    console.log(`No path exists between vertices ${src} and ${dest}`);
}
```

**Output:** Path exists from vertex 0 to vertex 7

How to print the complete path?

The idea is to store the complete path between the source and destination vertex in an array using [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/). We can easily achieve this if using [Depth–first search (DFS)](https://techiedelight.com/depth-first-search/) to determine the path between the vertices. This is demonstrated below in TypeScript:

```ts
// A class to represent a graph object
class Graph {
    // A list of lists to represent an adjacency list
    adjList: number[][];

    // Constructor
    constructor(edges: [number, number][], n: number) {
        this.adjList = [];

        for (let i = 0; i < n; i++) {
            this.adjList.push([]);
        }

        // add edges to the directed graph
        for (const [src, dest] of edges) {
            this.adjList[src].push(dest);
        }
    }
}

// Function to perform DFS traversal in a directed graph to find the
// complete path between source and destination vertices
function isReachable(graph: Graph, src: number, dest: number,
        discovered: boolean[], path: number[]): boolean {

    // mark the current node as discovered
    discovered[src] = true;

    // include the current node in the path
    path.push(src);

    // if destination vertex is found
    if (src === dest) {
        return true;
    }

    // do for every edge (src, i)
    for (const i of graph.adjList[src]) {

        // if `u` is not yet discovered
        if (!discovered[i]) {
            // return true if the destination is found
            if (isReachable(graph, i, dest, discovered, path)) {
                return true;
            }
        }
    }

    // backtrack: remove the current node from the path
    path.pop();

    // return false if destination vertex is not reachable from src
    return false;
}

// List of graph edges as per the above diagram
const edges: [number, number][] = [
    [0, 3], [1, 0], [1, 2], [1, 4], [2, 7], [3, 4],
    [3, 5], [4, 3], [4, 6], [5, 6], [6, 7]
];

// total number of nodes in the graph (labeled from 0 to 7)
const n = 8;

// build a graph from the given edges
const graph = new Graph(edges, n);

// to keep track of whether a vertex is discovered or not
const discovered = new Array<boolean>(n).fill(false);

// source and destination vertex
const src = 0, dest = 7;

// List to store the complete path between source and destination
const path: number[] = [];

// perform DFS traversal from the source vertex to check the connectivity
// and store path from the source vertex to the destination vertex
if (isReachable(graph, src, dest, discovered, path)) {
    console.log(`Path exists from vertex ${src} to vertex ${dest}`);
    console.log('The complete path is', path);
} else {
    console.log(`No path exists between vertices ${src} and ${dest}`);
}
```

**Output:** Path exists from vertex 0 to vertex 7 The complete path is 0 3 4 6 7

The time complexity of the above solutions is O(V + E), where `V` and `E` are the total number of vertices and edges in the graph, respectively.

**Exercise:** Extend the solution to print all paths between given vertices [(solution link)](https://techiedelight.com/compiler/?run=RfcWg8)
