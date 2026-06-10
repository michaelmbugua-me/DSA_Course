# Find all Possible Topological Orderings of a DAG

> Source: https://www.techiedelight.com/find-all-possible-topological-orderings-of-dag/

Given a Directed Acyclic Graph (DAG), print all its topological orderings.

A [Topological ordering](https://techiedelight.com/topological-sorting-dag/) of a directed graph `G` is a linear ordering of the nodes as `v1, v2 , … , vn` such that all edges point _forward_ : for every edge `(vi, vj)`, we have `i < j`. Moreover, the first node in a topological ordering must have no edge coming into it. Analogously, the last node must be one that has no edge leaving it. Topological order is only possible when the graph has no directed cycles, i.e. if the graph is DAG.

For example, consider the following graph:

The above graph has many valid topological ordering of vertices like,

7 5 3 1 4 2 0 6 7 5 1 2 3 4 0 6 5 7 3 1 0 2 6 4 3 5 7 0 1 2 6 4 5 7 3 0 1 4 6 2 7 5 1 3 4 0 6 2 5 7 1 2 3 0 6 4 3 7 0 5 1 4 2 6 … and many more

Note that for every directed edge `u —> v`, `u` comes before `v` in the ordering. For example, the pictorial representation of the topological order `{7, 5, 3, 1, 4, 2, 0, 6}` is:

In the [previous post](https://techiedelight.com/topological-sorting-dag/), we have seen how to print the topological order of a graph using the [Depth–first search (DFS)](https://techiedelight.com/depth-first-search/) algorithm. We have also seen [Kahn’s topological sort algorithm](https://techiedelight.com/kahn-topological-sort-algorithm/), which provides an efficient way to print the topological order. In this post, we will see how to print all possible topological orderings of a DAG.

> 

The idea remains similar to Kahn’s topological sort, where we find vertices with no incoming edges and removing all outgoing edges from these vertices. We build all possible orderings from left to right, where the vertices with in-degree zero become candidates for the next vertex. We can do this using [backtracking](https://techiedelight.com/backtracking-interview-questions/), where the graph state is restored after processing the selected vertex.

The algorithm can be implemented as follows in TypeScript:

```ts
// A class to represent a graph object
class Graph {
    adjList: number[][];
    indegree: number[];

    constructor(edges: [number, number][], n: number) {
        // A list of lists to represent an adjacency list
        this.adjList = Array.from({ length: n }, () => []);

        // stores in-degree of a vertex
        // initialize in-degree of each vertex by 0
        this.indegree = new Array(n).fill(0);

        // add edges to the directed graph
        for (const [src, dest] of edges) {
            // add an edge from source to destination
            this.adjList[src].push(dest);

            // increment in-degree of destination vertex by 1
            this.indegree[dest] = this.indegree[dest] + 1;
        }
    }
}

// Recursive function to find all topological orderings of a given DAG
function findAllTopologicalOrderings(graph: Graph, path: number[], discovered: boolean[], n: number): void {

    // do for every vertex
    for (let v = 0; v < n; v++) {

        // proceed only if the current node's in-degree is 0 and
        // the current node is not processed yet
        if (graph.indegree[v] === 0 && !discovered[v]) {

            // for every adjacent vertex `u` of `v`, reduce the in-degree of `u` by 1
            for (const u of graph.adjList[v]) {
                graph.indegree[u] = graph.indegree[u] - 1;
            }

            // include the current node in the path and mark it as discovered
            path.push(v);
            discovered[v] = true;

            // recur
            findAllTopologicalOrderings(graph, path, discovered, n);

            // backtrack: reset in-degree information for the current node
            for (const u of graph.adjList[v]) {
                graph.indegree[u] = graph.indegree[u] + 1;
            }

            // backtrack: remove the current node from the path and
            // mark it as undiscovered
            path.pop();
            discovered[v] = false;
        }
    }

    // print the topological order if all vertices are included in the path
    if (path.length === n) {
        console.log(path);
    }
}

// Print all topological orderings of a given DAG
function printAllTopologicalOrders(graph: Graph): void {

    // get the total number of nodes in the graph
    const n = graph.adjList.length;

    // create an auxiliary space to keep track of whether the vertex is discovered
    const discovered: boolean[] = new Array(n).fill(false);

    // list to store the topological order
    const path: number[] = [];

    // find all topological ordering and print them
    findAllTopologicalOrderings(graph, path, discovered, n);
}

// List of graph edges as per the above diagram
const edges: [number, number][] = [
    [0, 6], [1, 2], [1, 4], [1, 6], [3, 0], [3, 4], [5, 1], [7, 0], [7, 1]
];

// total number of nodes in the graph (labelled from 0 to 7)
const n = 8;

// build a graph from the given edges
const graph = new Graph(edges, n);

// print all topological ordering of the graph
printAllTopologicalOrders(graph);
```

**Output:** [3, 5, 7, 0, 1, 2, 4, 6] [3, 5, 7, 0, 1, 2, 6, 4] [3, 5, 7, 0, 1, 4, 2, 6] [3, 5, 7, 0, 1, 4, 6, 2] [3, 5, 7, 0, 1, 6, 2, 4] [3, 5, 7, 0, 1, 6, 4, 2] [3, 5, 7, 1, 0, 2, 4, 6] [3, 5, 7, 1, 0, 2, 6, 4] …

The time complexity of the above solution is exponential and requires additional space for the recursion (call stack).

Also See:

> [Kahn’s Topological Sort Algorithm](https://www.techiedelight.com/kahn-topological-sort-algorithm/ "Kahn’s Topological Sort Algorithm")

> [Topological Sort Algorithm for DAG](https://www.techiedelight.com/topological-sorting-dag/ "Topological Sort Algorithm for DAG")

> [Find the cost of the shortest path in DAG using one pass of Bellman–Ford](https://www.techiedelight.com/cost-of-shortest-path-in-dag-using-one-pass-of-bellman-ford/ "Find the cost of the shortest path in DAG using one pass of Bellman–Ford")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.74/5. Vote count: 196

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hard](https://www.techiedelight.com/Tags/hard/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
