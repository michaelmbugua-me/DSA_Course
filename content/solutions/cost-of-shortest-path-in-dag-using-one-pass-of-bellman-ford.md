# Find the cost of the shortest path in DAG using one pass of Bellman–Ford

> Source: https://www.techiedelight.com/cost-of-shortest-path-in-dag-using-one-pass-of-bellman-ford/

[Graph](https://www.techiedelight.com/Category/Graphs/)

Given a weighted directed acyclic graph (DAG) and a source vertex, find the shortest path’s cost from the source vertex to all other vertices present in the graph. If the vertex can’t be reached from the given source vertex, return its distance as infinity.

For example, consider the following DAG,

The shortest distance of source vertex 7 to every other vertex is:

dist(7, 0) = 6 **(7 — > 0)** dist(7, 1) = -2 **(7 — > 5 —> 1)** dist(7, 2) = -6 **(7 — > 5 —> 1 —> 2)** dist(7, 3) = 4 **(7 — > 3)** dist(7, 4) = -1 **(7 — > 5 —> 1 —> 4)** dist(7, 5) = -4 **(7 — > 5)** dist(7, 6) = 6 **(7 — > 5 —> 1 —> 6)**

> 

We know that a [Topological sort](https://techiedelight.com/topological-sorting-dag/) of a directed acyclic graph is a linear ordering of its vertices such that for every directed edge `uv` from vertex `u` to vertex `v`, `u` comes before `v` in the ordering.

We can use a topological sort to solve this problem. When we consider a vertex `u` in topological order, it is guaranteed that we have considered every incoming edge to it. Now for each vertex `v` of the DAG in the topological order, we [relax the cost of its outgoing edges](https://techiedelight.com/single-source-shortest-paths-bellman-ford-algorithm/) (update the shortest path information). In order words, since we have already found the shortest path to vertex `v`, we can use that info to update the shortest path of all its adjacent vertices, i.e.,

for each vertex `u` in topological order for each edge (u, v) with weight w if (distance[u] + w < distance[v]) distance[v] = distance[u] + w

The algorithm can be implemented as follows in TypeScript:

```ts
// A class to represent a graph object
class Graph {
    // A list of lists to represent an adjacency list
    adjList: [number, number][][];

    // Constructor
    constructor(edges: number[][], n: number) {
        // A list of lists to represent an adjacency list
        this.adjList = Array.from({ length: n }, () => []);

        // add edges to the directed graph
        for (const [source, dest, weight] of edges) {
            this.adjList[source].push([dest, weight]);
        }
    }
}

// Perform DFS on the graph and set the departure time of all vertices of the graph
function DFS(graph: Graph, v: number, discovered: boolean[], departure: number[], time: number): number {
    // mark the current node as discovered
    discovered[v] = true;

    // set arrival time – not needed
    // time = time + 1

    // do for every edge (v, u)
    for (const [u, w] of graph.adjList[v]) {
        // if `u` is not yet discovered
        if (!discovered[u]) {
            time = DFS(graph, u, discovered, departure, time);
        }
    }

    // ready to backtrack
    // set departure time of vertex `v`
    departure[time] = v;

    time = time + 1;
    return time;
}

// The function performs the topological sort on a given DAG and then finds
// the longest distance of all vertices from a given source by running one pass
// of the Bellman–Ford algorithm on edges of vertices in topological order
function findShortestDistance(graph: Graph, source: number, n: number): void {
    // `departure` stores the vertex number using departure time as an index
    const departure = new Array(n).fill(-1);

    // to keep track of whether a vertex is discovered or not
    const discovered = new Array(n).fill(false);
    let time = 0;

    // perform DFS on all undiscovered vertices
    for (let i = 0; i < n; i++) {
        if (!discovered[i]) {
            time = DFS(graph, i, discovered, departure, time);
        }
    }

    const cost = new Array(n).fill(Number.MAX_VALUE);
    cost[source] = 0;

    // Process the vertices in topological order, i.e., in order
    // of their decreasing departure time in DFS
    for (let i = n - 1; i >= 0; i--) {
        // for each vertex in topological order, relax the cost of its adjacent vertices
        const v = departure[i];

        // edge from `v` to `u` having weight `w`
        for (const [u, w] of graph.adjList[v]) {
            // if the distance to destination `u` can be shortened by
            // taking edge (v, u), update cost to the new lower value
            if (cost[v] !== Number.MAX_VALUE && cost[v] + w < cost[u]) {
                cost[u] = cost[v] + w;
            }
        }
    }

    // print shortest paths
    for (let i = 0; i < n; i++) {
        console.log(`dist(${source}, ${i}) = ${cost[i]}`);
    }
}

// List of graph edges as per the above diagram
const edges = [
    [0, 6, 2], [1, 2, -4], [1, 4, 1], [1, 6, 8], [3, 0, 3], [3, 4, 5],
    [5, 1, 2], [7, 0, 6], [7, 1, -1], [7, 3, 4], [7, 5, -4]
];

// total number of nodes in the graph (labelled from 0 to 7)
const n = 8;

// build a graph from the given edges
const graph = new Graph(edges, n);

// source vertex
const source = 7;

// find the shortest distance of all vertices from the given source
findShortestDistance(graph, source, n);
```

**Output:** dist(7, 0) = 6 dist(7, 1) = -2 dist(7, 2) = -6 dist(7, 3) = 4 dist(7, 4) = -1 dist(7, 5) = -4 dist(7, 6) = 6 dist(7, 7) = 0

The time complexity of the above solution is O(V + E), where `V` and `E` are the total number of vertices and edges in the graph, respectively.

The related problem is to find the longest paths from the given source vertex to all other vertices present in the graph. The implementation can be seen below:

> [Find the longest path in a Directed Acyclic Graph (DAG)](https://techiedelight.com/find-cost-longest-path-dag/)

**References:** <https://en.wikipedia.org/wiki/Topological_sorting#Application_to_shortest_path_finding>

Also See:

> [Find the longest path in a Directed Acyclic Graph (DAG)](https://www.techiedelight.com/find-cost-longest-path-dag/ "Find the longest path in a Directed Acyclic Graph \(DAG\)")

> [Topological Sort Algorithm for DAG](https://www.techiedelight.com/topological-sorting-dag/ "Topological Sort Algorithm for DAG")

> [Arrival and departure time of vertices in DFS](https://www.techiedelight.com/arrival-departure-time-vertices-dfs/ "Arrival and departure time of vertices in DFS")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.56/5. Vote count: 160

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Depth-first search](https://www.techiedelight.com/Tags/DFS/), [Medium](https://www.techiedelight.com/Tags/medium/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
