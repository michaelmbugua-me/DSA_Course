# Print all Hamiltonian paths present in a graph

> Source: https://www.techiedelight.com/print-all-hamiltonian-path-present-in-a-graph/

Given an undirected graph, print all Hamiltonian paths present in it. The Hamiltonian path in an undirected or directed graph is a path that visits each vertex exactly once.

For example, the following graph shows a Hamiltonian Path marked in red:

[](https://commons.wikimedia.org/wiki/File%3AHamiltonian_path.svg "By Christoph Sommer \(Own work\) \[GFDL \(http://www.gnu.org/copyleft/fdl.html\), CC-BY-SA-3.0 \(https://creativecommons.org/licenses/by-sa/3.0//\) or CC BY-SA 2.5-2.0-1.0 \(https://creativecommons.org/licenses/by-sa/2.5/deed.en\)\], via Wikimedia Commons")

> 

The idea is to use [backtracking](https://techiedelight.com/backtracking-interview-questions/). We check if every edge starting from an unvisited vertex leads to a solution or not. As a Hamiltonian path visits each vertex exactly once, we take the help of the `visited[]` array in the proposed solution to process only unvisited vertices. Also, we use the `path[]` array to store vertices covered in the current path. If all the vertices are visited, then a Hamiltonian path exists in the graph, and we print the complete path stored in the `path[]` array.

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

function hamiltonianPaths(graph: Graph, v: number, visited: boolean[], path: number[], n: number): void {

    // if all the vertices are visited, then the Hamiltonian path exists
    if (path.length === n) {
        // print the Hamiltonian path
        console.log(path);
        return;
    }

    // Check if every edge starting from vertex `v` leads to a solution or not
    for (const w of graph.adjList[v]) {

        // process only unvisited vertices as the Hamiltonian
        // path visit each vertex exactly once
        if (!visited[w]) {
            visited[w] = true;
            path.push(w);

            // check if adding vertex `w` to the path leads to the solution or not
            hamiltonianPaths(graph, w, visited, path, n);

            // backtrack
            visited[w] = false;
            path.pop();
        }
    }
}

function findHamiltonianPaths(graph: Graph, n: number): void {

    // start with every node
    for (let start = 0; start < n; start++) {

        // add starting node to the path
        const path: number[] = [start];

        // mark the start node as visited
        const visited: boolean[] = new Array(n).fill(false);
        visited[start] = true;

        hamiltonianPaths(graph, start, visited, path, n);
    }
}

// consider a complete graph having 4 vertices
const edges: [number, number][] = [[0, 1], [0, 2], [0, 3], [1, 2], [1, 3], [2, 3]];

// total number of nodes in the graph (labelled from 0 to 3)
const n = 4;

// build a graph from the given edges
const graph = new Graph(edges, n);

findHamiltonianPaths(graph, n);
```

**Output:** 0 1 2 3 0 1 3 2 0 2 1 3 0 2 3 1 0 3 1 2 0 3 2 1 1 0 2 3 1 0 3 2 1 2 0 3 1 2 3 0 1 3 0 2 1 3 2 0 2 0 1 3 2 0 3 1 2 1 0 3 2 1 3 0 2 3 0 1 2 3 1 0 3 0 1 2 3 0 2 1 3 1 0 2 3 1 2 0 3 2 0 1 3 2 1 0

The time complexity of the above solution is exponential and requires additional space for the recursion (call stack).

Also See:

> [Construct a directed graph from an undirected graph that satisfies given constraints](https://www.techiedelight.com/construct-directed-graph-from-undirected-graph/ "Construct a directed graph from an undirected graph that satisfies given constraints")

> [Check whether an undirected graph is Eulerian](https://www.techiedelight.com/eulerian-path-undirected-graph/ "Check whether an undirected graph is Eulerian")

> [Determine whether an undirected graph is a tree (Acyclic Connected Graph)](https://www.techiedelight.com/determine-undirected-graph-tree-acyclic-connected-graph/ "Determine whether an undirected graph is a tree \(Acyclic Connected Graph\)")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.88/5. Vote count: 165

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hard](https://www.techiedelight.com/Tags/hard/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
