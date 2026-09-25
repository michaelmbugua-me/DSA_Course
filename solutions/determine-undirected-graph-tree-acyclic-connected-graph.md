# Determine whether an undirected graph is a tree (Acyclic Connected Graph)

> Source: https://www.techiedelight.com/determine-undirected-graph-tree-acyclic-connected-graph/

[Graph](https://www.techiedelight.com/Category/Graphs/)

Given an undirected graph, check if it is a tree or not. In other words, check if a given undirected graph is an Acyclic Connected Graph or not.

For example, the graph shown on the right is a tree, and the graph on the left is not a tree as it contains a [cycle](https://techiedelight.com/check-undirected-graph-contains-cycle-not/) `0—1—2—3—4—5—0`.

> 

**Recommended Read:**

> [Types of edges involved in DFS and relation between them](https://techiedelight.com/types-edges-involved-dfs-relation/)

> [Check if an undirected graph contains a cycle or not](https://techiedelight.com/check-undirected-graph-contains-cycle-not/)

A tree is an undirected graph in which any two vertices are connected by exactly one path. In other words, any acyclic connected graph is a tree. We can easily determine the acyclic connected graph by doing a [DFS traversal](https://techiedelight.com/depth-first-search/) on the graph. When we do a DFS from any vertex `v` in an undirected graph, we may encounter a back-edge that points to one of the ancestors of the current vertex `v` in the DFS tree. Each “back edge” defines a cycle in an undirected graph. If the back edge is `x —> y`, then since `y` is the ancestor of node `x`, we have a path from `y` to `x`. So, we can say that the path `y ~~ x ~ y` forms a cycle. (Here, `~~` represents one more edge in the path, and `~` represents a direct edge) and is not a tree.

The algorithm can be implemented as follows in TypeScript:

```ts
// A class to represent a graph object
class Graph {
  // A list of lists to represent an adjacency list
  adjList: number[][];

  // Constructor
  constructor(edges: [number, number][], n: number) {
    // A list of lists to represent an adjacency list
    this.adjList = Array.from({ length: n }, () => []);

    // add edges to the undirected graph
    for (const [src, dest] of edges) {
      this.adjList[src].push(dest);
      this.adjList[dest].push(src);
    }
  }
}

// Perform DFS on the graph and returns true if any back-edge
// is found in the graph
function DFS(graph: Graph, v: number, discovered: boolean[], parent: number): boolean {
  // mark the current node as discovered
  discovered[v] = true;

  // do for every edge (v, w)
  for (const w of graph.adjList[v]) {
    // if `w` is not discovered
    if (!discovered[w]) {
      if (!DFS(graph, w, discovered, v)) {
        return false;
      }
    }

    // if `w` is discovered, and `w` is not a parent
    else if (w !== parent) {
      // we found a back-edge (cycle)
      return false;
    }
  }

  // no back-edges were found in the graph
  return true;
}

// Check if the given undirected graph is a tree
function isTree(graph: Graph, n: number): boolean {
  // to keep track of whether a vertex is discovered or not
  const discovered: boolean[] = new Array(n).fill(false);

  // flag to store if the graph is tree or not
  let isTree = true;

  // Perform DFS traversal from the first vertex
  isTree = DFS(graph, 0, discovered, -1);

  for (let i = 0; i < n; i++) {
    // any undiscovered vertex means the graph is disconnected
    if (!discovered[i]) {
      return false;
    }
  }

  return isTree;
}

// List of graph edges as per the above diagram.
// Note edge (5, 0) introduces a cycle in the graph
const edges: [number, number][] = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0]];

// total number of nodes in the graph (0 to 5)
const n = 6;

// construct graph
const graph = new Graph(edges, n);

if (isTree(graph, n)) {
  console.log("The graph is a tree");
} else {
  console.log("The graph is not a tree");
}
```

The time complexity of the above solution is O(V + E), where `V` and `E` are the total number of vertices and edges in the graph, respectively.

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.78/5. Vote count: 194

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Depth-first search](https://www.techiedelight.com/Tags/DFS/), [Medium](https://www.techiedelight.com/Tags/medium/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
