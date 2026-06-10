# Construct a directed graph from an undirected graph that satisfies given constraints

> Source: https://www.techiedelight.com/construct-directed-graph-from-undirected-graph/

Given a connected undirected graph and a vertex in the graph, construct a directed graph such that any path in the directed graph leads to that particular vertex.

Consider the above connected undirected graph. Let the input vertex be 1. The goal is to convert the above graph to a directed graph such that any path in the directed graph leads to vertex 1. Below is one such graph.

The idea is to perform [Breadth–first search (BFS)](https://techiedelight.com/breadth-first-search/) or [Depth–first search (DFS)](https://techiedelight.com/depth-first-search/) on the undirected graph starting from the given vertex and add edges to the directed graph in the direction of the scan. A BFS Tree for the above graph that starts from vertex 1 would look like this.

After all the vertices are processed in our BFS or DFS, reverse all the directed graphs’ edges to have a path from every vertex in the directed graph to the input vertex. Please note that we can save reversing all edges if edges are added in reverse order in the directed graph.

Following is a TypeScript program that demonstrates it:

```ts
// A class to represent a graph object
class Graph {
    // A list of lists to represent an adjacency list
    public adjList: number[][];

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

// Perform BFS on a graph starting from vertex 'v'
function BFS(graph: Graph, n: number, v: number): [number, number][] {

    // stores directed graph edges
    const edges: [number, number][] = [];

    // to keep track of whether a vertex is discovered or not
    const discovered: boolean[] = new Array(n).fill(false);

    // mark the source vertex as discovered
    discovered[v] = true;

    // create a queue for doing BFS
    const q: number[] = [];

    // enqueue source vertex
    q.push(v);

    // loop till queue is empty
    while (q.length > 0) {

        // dequeue front node
        v = q.shift()!;

        // do for every edge (v, u)
        for (const u of graph.adjList[v]) {
            if (!discovered[u]) {
                // mark it as discovered and enqueue it
                discovered[u] = true;

                // add an edge from 'u' to 'v' to the directed graph
                edges.push([u, v]);
                q.push(u);
            }
        }
    }

    return edges;
}

// List of graph edges as per the above diagram
let edges: [number, number][] = [[0, 1], [0, 2], [1, 3], [2, 3], [2, 4], [3, 4], [3, 5]];

// total number of nodes in the graph (labelled from 0 to 5)
const n = 6;

// create an undirected graph from the above edges
const graph = new Graph(edges, n);

// given vertex
const vertex = 0;

edges = BFS(graph, n, vertex);

// create a new directed graph
const digraph = new Graph(edges, n);
```

The time complexity of the above solution is the same as that of BFS, i.e., O(V + E), where `V` and `E` are the total number of vertices and edges in the graph, respectively.

Also See:

> [Check if an undirected graph contains a cycle or not](https://www.techiedelight.com/check-undirected-graph-contains-cycle-not/ "Check if an undirected graph contains a cycle or not")

> [Find the path between given vertices in a directed graph](https://www.techiedelight.com/find-path-between-vertices-directed-graph/ "Find the path between given vertices in a directed graph")

> [Bipartite Graph](https://www.techiedelight.com/bipartite-graph/ "Bipartite Graph")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.59/5. Vote count: 155

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Breadth-first search](https://www.techiedelight.com/Tags/BFS/), [Depth-first search](https://www.techiedelight.com/Tags/DFS/), [FIFO](https://www.techiedelight.com/Tags/FIFO/), [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
