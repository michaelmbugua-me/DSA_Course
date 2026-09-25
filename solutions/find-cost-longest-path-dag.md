# Find the longest path in a Directed Acyclic Graph (DAG)

> Source: https://www.techiedelight.com/find-cost-longest-path-dag/

[Graph](https://www.techiedelight.com/Category/Graphs/)

Given a weighted directed acyclic graph (DAG) and a source vertex, find the cost of the longest path from the source vertex to all other vertices present in the graph. If the vertex can’t be reached from the given source vertex, print its distance as infinity.

For example, consider the following DAG,

The longest distance of source vertex 7 to every other vertex is:

dist(7, 0) = 7 **(7 — > 3 —> 0)** dist(7, 1) = -1 **(7 — > 1)** dist(7, 2) = -5 **(7 — > 1 —> 2)** dist(7, 3) = 4 **(7 — > 3)** dist(7, 4) = 9 **(7 — > 3 —> 4)** dist(7, 5) = -4 **(7 — > 5)** dist(7, 6) = 9 **(7 — > 3 —> 0 —> 6)**

> 

**Prerequisite:**

> [Find the cost of the shortest path in DAG using one pass of Bellman–Ford](https://techiedelight.com/cost-of-shortest-path-in-dag-using-one-pass-of-bellman-ford/)

We can easily solve this problem by following the above logic as well. The idea is to consider the edges’ negative weights and find the longest path from a given source in the graph. The cost of the longest path is just negative of its cost of the shortest path for any given vertex.

Here’s what [Wikipedia](https://en.wikipedia.org/wiki/Longest_path_problem) has to say for Acyclic graphs:

_The longest path between two given vertices`s` and `t` in a weighted graph `G` is the same thing as the shortest path in a graph `-G` derived from `G` by changing every weight to its negation. Therefore, if shortest paths can be found in `-G`, then longest paths can also be found in `G`. For most graphs, this transformation is not useful because it creates cycles of negative length in `-G`. But if `G` is a directed acyclic graph, then no negative cycles can be created, and the longest path in `G` can be found in linear time by applying a linear time algorithm for shortest paths in `-G`, which is also a directed acyclic graph._

The algorithm can be implemented as follows in TypeScript:

```ts
// A class to represent a graph object
class Graph {
    adjList: Map<number, number[]>[];

    constructor(edges: [number, number, number][], n: number) {
        // A list of lists to represent an adjacency list
        this.adjList = Array.from({ length: n }, () => []);

        // add edges to the directed graph
        for (const [source, dest, weight] of edges) {
            this.adjList[source].push(dest, weight);
        }
    }
}

// Perform DFS on the graph and set the departure time of all
// vertices of the graph
function DFS(graph: Graph, v: number, discovered: boolean[], departure: number[], time: number): number {

    // mark the current node as discovered
    discovered[v] = true;

    // set arrival time – not needed
    // time = time + 1

    // do for every edge (v, u)
    for (let idx = 0; idx < graph.adjList[v].length; idx += 2) {
        const u = graph.adjList[v][idx];
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
// the longest distance of all vertices from a given source by running
// one pass of the Bellman–Ford algorithm
function findLongestDistance(graph: Graph, source: number, n: number): void {

    // `departure` stores vertex number having its departure
    // time equal to the index of it
    const departure = new Array(n).fill(-1);

    // to keep track of whether a vertex is discovered or not
    const discovered: boolean[] = new Array(n).fill(false);
    let time = 0;

    // perform DFS on all undiscovered vertices
    for (let i = 0; i < n; i++) {
        if (!discovered[i]) {
            time = DFS(graph, i, discovered, departure, time);
        }
    }

    const cost: number[] = new Array(n).fill(Number.MAX_SAFE_INTEGER);
    cost[source] = 0;

    // Process the vertices in topological order, i.e., in order
    // of their decreasing departure time in DFS
    for (let i = n - 1; i >= 0; i--) {

        // for each vertex in topological order,
        // relax the cost of its adjacent vertices
        const v = departure[i];

        // edge from `v` to `u` having weight `w`
        for (let idx = 0; idx < graph.adjList[v].length; idx += 2) {
            const u = graph.adjList[v][idx];
            let w = graph.adjList[v][idx + 1];
            w = -w;     // make edge weight negative

            // if the distance to destination `u` can be shortened by
            // taking edge (v, u), then update cost to the new lower value
            if (cost[v] !== Number.MAX_SAFE_INTEGER && cost[v] + w < cost[u]) {
                cost[u] = cost[v] + w;
            }
        }
    }

    // print the longest paths
    for (let i = 0; i < n; i++) {
        console.log(`dist (${source}, ${i}) = ${-cost[i]}`);
    }
}

// List of graph edges as per the above diagram
const edges: [number, number, number][] = [
    [0, 6, 2], [1, 2, -4], [1, 4, 1], [1, 6, 8], [3, 0, 3], [3, 4, 5],
    [5, 1, 2], [7, 0, 6], [7, 1, -1], [7, 3, 4], [7, 5, -4]
];

// total number of nodes in the graph (labelled from 0 to 7)
const n = 8;

// build a graph from the given edges
const graph = new Graph(edges, n);

// source vertex
const source = 7;

// find the longest distance of all vertices from a given source
findLongestDistance(graph, source, n);
```

**Output:** dist(7, 0) = 7 dist(7, 1) = -1 dist(7, 2) = -5 dist(7, 3) = 4 dist(7, 4) = 9 dist(7, 5) = -4 dist(7, 6) = 9 dist(7, 7) = 0

The time complexity of the above solution is O(V + E), where `V` and `E` are the total number of vertices and edges in the graph, respectively.

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.49/5. Vote count: 167

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Depth-first search](https://www.techiedelight.com/Tags/DFS/), [Hard](https://www.techiedelight.com/Tags/hard/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
