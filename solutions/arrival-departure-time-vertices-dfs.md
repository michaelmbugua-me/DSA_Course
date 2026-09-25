# Arrival and departure time of vertices in DFS

> Source: https://www.techiedelight.com/arrival-departure-time-vertices-dfs/

[Graph](https://www.techiedelight.com/Category/Graphs/)

Given a graph, find the arrival and departure time of its vertices in DFS. The arrival time is the time at which the vertex was explored for the first time in the DFS, and departure time is the time at which we have explored all the neighbors of the vertex, and we are ready to backtrack.

The following directed graph has two connected components. The right-hand side shows the arrival and departure time of vertices when DFS starts from vertex 0.

The idea is to run [Depth–first search (DFS)](https://techiedelight.com/depth-first-search/). Before exploring any adjacent nodes of any vertex in DFS, note the vertex’s arrival time. After exploring all adjacent nodes of the vertex, note its departure time. After the DFS call is over (i.e., all the graph vertices are discovered), print the vertices’ arrival and departure time.

Please note that the arrival and departure time of vertices may vary depending upon the insertion order of edges in the graph and starting node of DFS. Following is the implementation in TypeScript based on the above idea:

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
function DFS(graph: Graph, v: number, discovered: boolean[], arrival: number[],
    departure: number[], time: number): number {

    time = time + 1;

    // set the arrival time of vertex `v`
    arrival[v] = time;

    // mark vertex as discovered
    discovered[v] = true;

    for (const i of graph.adjList[v]) {
        if (!discovered[i]) {
            time = DFS(graph, i, discovered, arrival, departure, time);
        }
    }

    time = time + 1;

    // set departure time of vertex `v`
    departure[v] = time;

    return time;
}

// List of graph edges as per the above diagram
const edges: [number, number][] = [
    [0, 1], [0, 2], [2, 3], [2, 4], [3, 1], [3, 5], [4, 5], [6, 7]
];

// total number of nodes in the graph (labelled from 0 to 7)
const n = 8;

// build a graph from the given edges
const graph = new Graph(edges, n);

// list to store the arrival time of vertex
const arrival: number[] = new Array(n).fill(0);

// list to store the departure time of vertex
const departure: number[] = new Array(n).fill(0);

// mark all the vertices as not discovered
const discovered: boolean[] = new Array(n).fill(false);
let time = -1;

// Perform DFS traversal from all undiscovered nodes to
// cover all unconnected components of a graph
for (let i = 0; i < n; i++) {
    if (!discovered[i]) {
        time = DFS(graph, i, discovered, arrival, departure, time);
    }
}

// print arrival and departure time of each vertex in DFS
for (let i = 0; i < n; i++) {
    console.log(`Vertex ${i} (${arrival[i]}, ${departure[i]})`);
}
```

**Output:** Vertex 0 (0, 11) Vertex 1 (1, 2) Vertex 2 (3, 10) Vertex 3 (4, 7) Vertex 4 (8, 9) Vertex 5 (5, 6) Vertex 6 (12, 15) Vertex 7 (13, 14)

The time complexity of DFS traversal is O(V + E), where `V` and `E` are the total number of vertices and edges in the graph, respectively. Please note that O(E) may vary between O(1) and O(V2), depending on how dense the graph is.

Applications of finding Arrival and Departure Time:

  * [Topological sorting](https://techiedelight.com/topological-sorting-dag/) in a DAG(Directed Acyclic Graph).
  * Finding 2/3–(edge or vertex)–connected components.
  * Finding [bridges in graphs](https://techiedelight.com/2-edge-connectivity-graph/).
  * Finding biconnectivity in graphs.
  * Detecting cycle in directed graphs.
  * Tarjan’s algorithm to find [strongly connected components](https://techiedelight.com/check-graph-strongly-connected-one-dfs-traversal/), and many more…

We have covered all these topics in separate posts.

Also See:

> [Check if a graph is strongly connected or not using one DFS Traversal](https://www.techiedelight.com/check-graph-strongly-connected-one-dfs-traversal/ "Check if a graph is strongly connected or not using one DFS Traversal")

> [Types of edges involved in DFS and relation between them](https://www.techiedelight.com/types-edges-involved-dfs-relation/ "Types of edges involved in DFS and relation between them")

> [Check if a digraph is a DAG (Directed Acyclic Graph) or not](https://www.techiedelight.com/check-given-digraph-dag-directed-acyclic-graph-not/ "Check if a digraph is a DAG \(Directed Acyclic Graph\) or not")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.86/5. Vote count: 144

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Depth-first search](https://www.techiedelight.com/Tags/DFS/), [Easy](https://www.techiedelight.com/Tags/easy/), [Must Know](https://www.techiedelight.com/Tags/Must-Know/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
