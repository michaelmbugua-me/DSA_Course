# Check if a digraph is a DAG (Directed Acyclic Graph) or not

> Source: https://www.techiedelight.com/check-given-digraph-dag-directed-acyclic-graph-not/

[Graph](https://www.techiedelight.com/Category/Graphs/)

Given a directed graph, check if it is a DAG (Directed Acyclic Graph) or not. A DAG is a digraph (directed graph) that contains no cycles.

The following graph contains a cycle `0—1—3—0`, so it’s not DAG. If we remove edge `3–0` from it, it will become a DAG.

[](http://www.cs.cornell.edu/courses/cs2112/2012sp/lectures/lec24/lec24-12sp.html)

> 

**Recommended Read:**

> [Types of edges involved in DFS and relation between them](https://techiedelight.com/types-edges-involved-dfs-relation/)

> [Arrival and departure time of vertices in DFS](https://techiedelight.com/arrival-departure-time-vertices-dfs/)

We can use [Depth–first search (DFS)](https://techiedelight.com/depth-first-search/) to solve this problem. The idea is to find if any back-edge is present in the graph or not. A digraph is a DAG if there is no back-edge present in the graph. Recall that a back-edge is an edge from a vertex to one of its ancestors in the DFS tree.

**Fact** : For an edge `u —> v` in a directed graph, an edge is a back edge if `departure[u] < departure[v]`.

**Proof:** We have already discussed the relationship between all four types of edges involved in the DFS in the [previous post](https://techiedelight.com/types-edges-involved-dfs-relation/). Following are the relationships we have seen between the departure time for different types of edges involved in a DFS of a directed graph:

**Tree edge (u, v):** departure[u] > departure[v] **Back edge (u, v):** `departure[u] < departure[v]` **Forward edge (u, v):** departure[u] > departure[v] **Cross edge (u, v):** departure[u] > departure[v]

Note that for tree edge, forward edge and cross edge, `departure[u] > departure[v]`. But only for the back edge, the relationship `departure[u] < departure[v]` holds true. So, it is guaranteed that an edge `(u, v)` is a back-edge, not some other edge if `departure[u] < departure[v]`.

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

// Perform DFS on the graph and set the departure time of all vertices of the graph
const DFS = (graph: Graph, v: number, discovered: boolean[], departure: (number | null)[], time: number): number => {

    // mark the current node as discovered
    discovered[v] = true;

    // do for every edge (v, u)
    for (const u of graph.adjList[v]) {
        // if `u` is not yet discovered
        if (!discovered[u]) {
            time = DFS(graph, u, discovered, departure, time);
        }
    }

    // ready to backtrack
    // set departure time of vertex `v`
    departure[v] = time;
    time = time + 1;

    return time;
};

// Returns true if the given directed graph is DAG
const isDAG = (graph: Graph, n: number): boolean => {

    // keep track of whether a vertex is discovered or not
    const discovered: boolean[] = new Array(n).fill(false);

    // keep track of the departure time of a vertex in DFS
    const departure: (number | null)[] = new Array(n).fill(null);

    let time = 0;

    // Perform DFS traversal from all undiscovered vertices
    // to visit all connected components of a graph
    for (let i = 0; i < n; i++) {
        if (!discovered[i]) {
            time = DFS(graph, i, discovered, departure, time);
        }
    }

    // check if the given directed graph is DAG or not
    for (let u = 0; u < n; u++) {

        // check if (u, v) forms a back-edge.
        for (const v of graph.adjList[u]) {

            // If the departure time of vertex `v` is greater than equal
            // to the departure time of `u`, they form a back edge.

            // Note that `departure[u]` will be equal to `departure[v]`
            // only if `u = v`, i.e., vertex contain an edge to itself
            if (departure[u]! <= departure[v]!) {
                return false;
            }
        }
    }

    // no back edges
    return true;
};

// List of graph edges as per the above diagram
const edges: [number, number][] = [
    [0, 1], [0, 3], [1, 2], [1, 3], [3, 2], [3, 4], [3, 0], [5, 6], [6, 3]
];

// total number of nodes in the graph (labelled from 0 to 6)
const n = 7;

// build a graph from the given edges
const graph = new Graph(edges, n);

// check if the given directed graph is DAG or not
if (isDAG(graph, n)) {
    console.log('The graph is a DAG');
}
else {
    console.log('The graph is not a DAG');
}
```

**Output:** The graph is not a DAG

The time complexity of the above solutions is O(V + E), where `V` and `E` are the total number of vertices and edges in the graph, respectively.

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.87/5. Vote count: 162

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Depth-first search](https://www.techiedelight.com/Tags/DFS/), [Medium](https://www.techiedelight.com/Tags/medium/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
