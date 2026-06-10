# Determine whether a graph is Bipartite using DFS

> Source: https://www.techiedelight.com/determine-given-graph-bipartite-graph-using-dfs/

[Graph](https://www.techiedelight.com/Category/Graphs/)

Given an undirected graph, determine whether it is bipartite using DFS. A bipartite graph (or bigraph) is a graph whose vertices can be divided into two disjoint sets `U` and `V` such that every edge connects a vertex in `U` to one in `V`.

The following is a bipartite graph as we can divide it into two sets, `U` and `V`, with every edge having one endpoint in set `U` and the other in set `V`:

> 

It is possible to test whether a graph is bipartite or not using a [Depth–first search (DFS)](https://techiedelight.com/depth-first-search/) algorithm. There are two ways to check for bipartite graphs:

  1. A graph is bipartite if and only if it is 2–colorable.
  2. A graph is bipartite if and only if it does not contain an odd [cycle](https://techiedelight.com/check-undirected-graph-contains-cycle-not/).

In the [previous post](https://techiedelight.com/bipartite-graph/), we have checked if the graph contains an odd cycle or not using [BFS](https://techiedelight.com/breadth-first-search/). Now using DFS, we will determine if the graph is **2–colorable** or not.

The main idea is to assign each vertex a color that differs from its parent’s color in the [depth–first search](https://techiedelight.com/depth-first-search/) tree. If there exists an edge connecting the current vertex to a previously colored vertex with the same color, then we can say that the graph is not bipartite.

This approach is demonstrated below in TypeScript:

```ts
// A class to represent a graph object
class Graph {
  // Total number of nodes in the graph
  n: number;

  // A list of lists to represent an adjacency list
  adjList: number[][];

  // Constructor
  constructor(edges: [number, number][] = [], n = 0) {
    // Total number of nodes in the graph
    this.n = n;

    // A list of lists to represent an adjacency list
    this.adjList = Array.from({ length: n }, () => []);

    // add edges to the undirected graph
    for (const [src, dest] of edges) {
      this.adjList[src].push(dest);
      this.adjList[dest].push(src);
    }
  }
}

// Perform DFS on the graph starting from vertex `v`
function DFS(graph: Graph, v: number, discovered: boolean[], color: boolean[]): boolean {
  // do for every edge (v, u)
  for (const u of graph.adjList[v]) {
    // if vertex `u` is explored for the first time
    if (!discovered[u]) {
      // mark the current node as discovered
      discovered[u] = true;

      // current node has the opposite color of that its parent
      color[u] = !color[v];

      // if DFS on any subtree rooted at `v` returns false
      if (!DFS(graph, u, discovered, color)) {
        return false;
      }
    }

    // if the vertex has already been discovered and the color of
    // vertex `u` and `v` are the same, then the graph is not bipartite
    else if (color[v] === color[u]) {
      return false;
    }
  }

  return true;
}

// Function to check if a graph is Bipartite using DFS
function isBipartite(graph: Graph): boolean {
  // to keep track of whether a vertex is discovered or not
  const discovered: boolean[] = new Array(graph.n).fill(false);

  // keep track of the color assigned (0 or 1) to each vertex in DFS
  const color: boolean[] = new Array(graph.n).fill(false);

  // start from any node as the graph is connected and undirected
  const src = 0;

  // mark the source vertex as discovered and set its color to 0 (false)
  discovered[src] = true;
  color[src] = false;

  // call DFS procedure
  return DFS(graph, src, discovered, color);
}

// List of graph edges
const edges: [number, number][] = [
  [0, 1], [1, 2], [1, 7], [2, 3], [3, 5], [4, 6], [4, 8], [7, 8], [1, 3]
  // if we remove (1, 3) edge, the graph becomes bipartite
];

// total number of nodes in the graph (0 to 8)
const n = 9;

// build a graph from the given edges
const graph = new Graph(edges, n);

if (isBipartite(graph)) {
  console.log("Graph is bipartite");
} else {
  console.log("Graph is not bipartite");
}
```

The time complexity of the above solution is O(V + E), where `V` and `E` are the total number of vertices and edges in the graph, respectively. Please note that O(E) may vary between O(1) and O(V2), depending on how dense the graph is.

**References:** [Bipartite graph – Wikipedia](https://en.wikipedia.org/wiki/Bipartite_graph)

Also See:

> [Bipartite Graph](https://www.techiedelight.com/bipartite-graph/ "Bipartite Graph")

> [Determine whether an undirected graph is a tree (Acyclic Connected Graph)](https://www.techiedelight.com/determine-undirected-graph-tree-acyclic-connected-graph/ "Determine whether an undirected graph is a tree \(Acyclic Connected Graph\)")

> [Construct a directed graph from an undirected graph that satisfies given constraints](https://www.techiedelight.com/construct-directed-graph-from-undirected-graph/ "Construct a directed graph from an undirected graph that satisfies given constraints")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.86/5. Vote count: 264

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Depth-first search](https://www.techiedelight.com/Tags/DFS/), [Medium](https://www.techiedelight.com/Tags/medium/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
