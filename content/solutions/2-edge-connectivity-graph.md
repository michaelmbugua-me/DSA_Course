# 2–Edge Connectivity in a graph

> Source: https://www.techiedelight.com/2-edge-connectivity-graph/

[Graph](https://www.techiedelight.com/Category/Graphs/)

Given an undirected connected graph, check if the graph is 2–edge connected and return the bridges (if any).

A connected graph is 2–edge connected if it remains connected whenever any edges are removed. A bridge (or cut arc) is an edge of a graph whose deletion increases its number of connected components, i.e., an edge whose removal disconnects the graph. So if any such bridge exists, the graph is not 2–edge connected.

For example, the following graph has 6 vertices and 3 bridges (highlighted in red):

> 

**Prerequisite:**

> [Types of edges involved in DFS and relation between them](https://techiedelight.com/types-edges-involved-dfs-relation/)

> [Arrival and departure time of vertices in DFS](https://techiedelight.com/arrival-departure-time-vertices-dfs/)

A simple approach would be to remove each edge from the graph one by one and run [Depth–first search (DFS)](https://techiedelight.com/depth-first-search/) or [Breadth–first search (BFS)](https://techiedelight.com/breadth-first-search/) starting from any vertex. If the DFS or BFS covers all nodes in the graph, then the removed edge cannot be a bridge. If not, that edge is a bridge. The time complexity of this solution is O(E × (V + E)), where `V` and `E` are the total number of vertices and edges in the graph, respectively.

We can solve this problem efficiently in one pass of DFS. When we do a DFS from vertex `v` in an undirected graph, there could be edges going out of the subtree, i.e., back edges. We can say that the graph is 2–edge connected if and only if for every edge `u —> v` in the graph, there is at least one back-edge that is going out of a subtree rooted at `v` to some ancestor of `u`. When we say subtree rooted at `v`, we mean all of `v's` descendants, including the vertex itself.

In other words, when we backtrack from a vertex `v`, we need to ensure that there is some back-edge from some descendant of `v` (including `v`) to some proper ancestor (parent or above) of `v`.

How can we modify DFS so that we can check if there is a back-edge going out of every subtree?

We can modify DFS such that `DFS(v)` returns the smallest arrival time to which there is a back edge from the subtree rooted at `v`. For example, let `arrival(v)` be the arrival time of vertex `v` in the DFS. If there is a back edge out of the subtree rooted at `v`, it is to something visited before `v`, and therefore with a smaller arrival value. Remember for a back edge `u —> v` in a graph, `arrival[u] > arrival[v]`.

Suppose four edges are going out of a subtree rooted at `v` to vertex `a`, `b`, `c` and `d`, with arrival time `A(a)`, `A(b)`, `A(c)` and `A(d)`, respectively. We look at their four arrival times and consider the smallest among them, that will be the value returned by `DFS(v)`, i.e., `DFS(v)` returns the minimum `min` of `A(a)`, `A(b)`, `A(c)`, and `A(d)`. But before returning, we have to check that `min` is less than the `A(v)`. If `min` is less than the `A(v)`, then that means that at least one back-edge is going out of the subtree rooted at `v`. If not, we can say that `(parent[v], v)` is a bridge.

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

// Perform DFS on the graph starting from vertex `v` and find
// all bridges in the process
function DFS(graph: Graph, v: number, visited: boolean[], arrival: number[],
    parent: number, time: number, bridges: Set<string>): number {
    // set the arrival time of vertex `v`
    time = time + 1;
    arrival[v] = time;

    // mark vertex as visited
    visited[v] = true;

    // initialize `t` with the arrival time of vertex `v`
    let t = arrival[v];

    // (v, w) forms an edge
    for (const w of graph.adjList[v]) {
        // if `w` is not visited
        if (!visited[w]) {
            t = Math.min(t, DFS(graph, w, visited, arrival, v, time, bridges));
        }
        // if `w` is visited, and `w` is not a parent of `v`
        else if (w !== parent) {
            // If vertex `w` is already visited, there
            // is a back edge starting from `v`. Note that as `visited[u]`
            // is already true, arrival[u] is already defined
            t = Math.min(t, arrival[w]);
        }
    }

    // if the value of `t` remains unchanged, i.e., it is equal
    // to the arrival time of vertex `v`, and if `v` is not the root node,
    // then (parent[v] —> v) forms a bridge
    if (t === arrival[v] && parent !== -1) {
        bridges.add(`(${parent}, ${v})`);
    }

    // return the minimum arrival time
    return t;
}

function findBridges(graph: Graph, n: number): Set<string> {
    // to keep track of whether a vertex is visited or not
    const visited: boolean[] = new Array(n).fill(false);

    // stores arrival time of a node in DFS
    const arrival: number[] = new Array(n).fill(0);

    const start = 0;
    const parent = -1;
    const time = 0;

    const bridges = new Set<string>();

    // As the given graph is connected, DFS will cover every node
    DFS(graph, start, visited, arrival, parent, time, bridges);

    return bridges;
}

// (u, v) triplet represent undirected edge from vertex `u` to vertex `v`
const edges: [number, number][] = [[0, 2], [1, 2], [2, 3], [2, 4], [3, 4], [3, 5]];

// total number of nodes in the graph (0 to 6)
const n = 6;

// construct graph
const graph = new Graph(edges, n);

const bridges = findBridges(graph, n);
if (bridges.size !== 0) {
    console.log(`Bridges are ${[...bridges].join(' ')}`);
} else {
    console.log('Graph is 2–Edge Connected');
}
```

**Output:** Bridges are (0, 2) (2, 1) (3, 5)

The time complexity of the above solution is O(V + E), where `V` and `E` are the total number of vertices and edges in the graph, respectively.

**Reference:** [Dr. Naveen Garg, IIT–D (Lecture – 28 Applications of DFS)](https://www.youtube.com/watch?v=bmyyxNyZKzI)

**Image credits:** <http://mathworld.wolfram.com/GraphBridge.html>

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.62/5. Vote count: 191

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Algorithm](https://www.techiedelight.com/Tags/Algorithm/), [Depth-first search](https://www.techiedelight.com/Tags/DFS/), [Hard](https://www.techiedelight.com/Tags/hard/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
