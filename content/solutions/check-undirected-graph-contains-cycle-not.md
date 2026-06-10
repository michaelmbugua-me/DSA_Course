# Check if an undirected graph contains a cycle or not

> Source: https://www.techiedelight.com/check-undirected-graph-contains-cycle-not/

Given a connected undirected graph, check if it contains any cycle or not.

For example, the following graph contains a cycle `2–5–10–6–2`:

[](https://commons.wikimedia.org/wiki/File%3ABreadth-first-tree.svg "By Alexander Drichel \(Own work\) \[GFDL \(http://www.gnu.org/copyleft/fdl.html\) or CC BY 3.0 \(https://creativecommons.org/licenses/by/3.0/\)\], via Wikimedia Commons")

> 

**Recommended Read:**

> [Types of edges involved in DFS and relation between them](https://techiedelight.com/types-edges-involved-dfs-relation/)

## 1\. Using BFS

When we do a [Breadth–first search (BFS)](https://techiedelight.com/breadth-first-search/) from any vertex `v` in an undirected graph, we may encounter **a cross-edge** that points to a previously discovered vertex that is neither an ancestor nor a descendant of the current vertex. Each “cross edge” defines a cycle in an undirected graph. If the cross edge is `x —> y`, then since `y` is already discovered, we have a path from `v` to `y` (or from `y` to `v` since the graph is undirected), where `v` is the starting vertex of BFS. So, we can say that we have a path `v ~~ x ~ y ~~ v` that forms a cycle. (Here, `~~` represents one more edge in the path, and `~` represents a direct edge).

Following is a TypeScript program that demonstrates it:

```ts
// A class to represent a graph object
class Graph {
    // A list of lists to represent an adjacency list
    adjList: number[][];

    // Constructor
    constructor(edges: number[][], n: number) {
        // A list of lists to represent an adjacency list
        this.adjList = Array.from({ length: n }, () => []);

        // add edges to the undirected graph
        for (const [src, dest] of edges) {
            this.adjList[src].push(dest);
            this.adjList[dest].push(src);
        }
    }
}

// Perform BFS on the graph starting from vertex `src` and
// return true if a cycle is found in the graph
const BFS = (graph: Graph, src: number, n: number): boolean => {

    // to keep track of whether a vertex is discovered or not
    const discovered: boolean[] = Array(n).fill(false);

    // mark the source vertex as discovered
    discovered[src] = true;

    // create a queue for doing BFS
    const q: [number, number][] = [];

    // enqueue source vertex and its parent info
    q.push([src, -1]);

    // loop till queue is empty
    while (q.length > 0) {

        // dequeue front node and print it
        const [v, parent] = q.shift()!;

        // do for every edge (v, u)
        for (const u of graph.adjList[v]) {
            if (!discovered[u]) {
                // mark it as discovered
                discovered[u] = true;

                // construct the queue node containing info
                // about vertex and enqueue it
                q.push([u, v]);
            }

            // `u` is discovered, and `u` is not a parent
            else if (u !== parent) {
                // we found a cross-edge, i.e., the cycle is found
                return true;
            }
        }
    }

    // no cross-edges were found in the graph
    return false;
};

// demo

// List of graph edges
const edges = [
    [0, 1], [0, 2], [0, 3], [1, 4], [1, 5], [4, 8],
    [4, 9], [3, 6], [3, 7], [6, 10], [6, 11], [5, 9]
    // edge (5, 9) introduces a cycle in the graph
];

// total number of nodes in the graph (0 to 11)
const n = 12;

// build a graph from the given edges
const graph = new Graph(edges, n);

// Perform BFS traversal in connected components of a graph
if (BFS(graph, 0, n)) {
    console.log('The graph contains a cycle');
} else {
    console.log("The graph doesn't contain any cycle");
}
```

**Output:** The graph contains a cycle

## 2\. Using DFS

The following graph contains a cycle `8—9—11—12—8`:

[](https://commons.wikimedia.org/wiki/File%3ADepth-first-tree.svg "By Alexander Drichel \(Own work\) \[GFDL \(http://www.gnu.org/copyleft/fdl.html\) or CC BY-SA 3.0 \(https://creativecommons.org/licenses/by-sa/3.0/\)\], via Wikimedia Commons")

When we do a [Depth–first search (DFS)](https://techiedelight.com/depth-first-search/) from any vertex `v` in an undirected graph, we may encounter a **back-edge** that points to one of the ancestors of the current vertex `v` in the DFS tree. Each “back edge” defines a cycle in an undirected graph. If the back edge is `x —> y`, then since `y` is the ancestor of node `x`, we have a path from `y` to `x`. So, we can say that we have a path `y ~~ x ~ y` that forms a cycle. (Here, `~~` represents one more edge in the path, and `~` represents a direct edge).

Following is a TypeScript implementation based on the above idea:

```ts
// A class to represent a graph object
class Graph {
    // A list of lists to represent an adjacency list
    adjList: number[][];

    // Constructor
    constructor(edges: number[][], n: number) {
        // A list of lists to represent an adjacency list
        this.adjList = Array.from({ length: n }, () => []);

        // add edges to the undirected graph
        for (const [src, dest] of edges) {
            this.adjList[src].push(dest);
            this.adjList[dest].push(src);
        }
    }
}

// Function to perform DFS traversal on the graph on a graph
const DFS = (graph: Graph, v: number, discovered: boolean[], parent = -1): boolean => {

    // mark the current node as discovered
    discovered[v] = true;

    // do for every edge (v, w)
    for (const w of graph.adjList[v]) {

        // if `w` is not discovered
        if (!discovered[w]) {
            if (DFS(graph, w, discovered, v)) {
                return true;
            }
        }

        // if `w` is discovered, and `w` is not a parent
        else if (w !== parent) {
            // we found a back-edge (cycle)
            return true;
        }
    }

    // No back-edges were found in the graph
    return false;
};

// demo

// List of graph edges
const edges = [
    [0, 1], [0, 6], [0, 7], [1, 2], [1, 5], [2, 3],
    [2, 4], [7, 8], [7, 11], [8, 9], [8, 10], [10, 11]
    // edge (10, 11) introduces a cycle in the graph
];

// total number of nodes in the graph (0 to 11)
const n = 12;

// build a graph from the given edges
const graph = new Graph(edges, n);

// to keep track of whether a vertex is discovered or not
const discovered: boolean[] = Array(n).fill(false);

// Perform DFS traversal from the first vertex
if (DFS(graph, 0, discovered)) {
    console.log('The graph contains a cycle');
} else {
    console.log("The graph doesn't contain any cycle");
}
```

The time complexity of the above solutions is O(V + E), where `V` and `E` are the total number of vertices and edges in the graph, respectively.
