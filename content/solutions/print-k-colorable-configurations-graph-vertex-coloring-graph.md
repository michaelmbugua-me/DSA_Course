# Print all k–colorable configurations of a graph (Vertex coloring of a graph)

> Source: https://www.techiedelight.com/print-k-colorable-configurations-graph-vertex-coloring-graph/

Given an undirected graph, check if it is k–colorable or not and print all possible configurations of assignment of colors to its vertices.

The vertex coloring is a way of coloring the vertices of a graph such that no two adjacent vertices share the same color. A coloring using at most `k` colors is called a (proper) k–coloring, and a graph that can be assigned a (proper) k–coloring is k–colorable.

For example, consider the following graph,

It can be 3–colored in several ways:

Please note that we can’t color the above graph using two colors, i.e., it’s not 2–colorable.

> 

We can use [backtracking](https://techiedelight.com/backtracking-interview-questions/) to solve this problem. The idea is to try all possible combinations of colors for the first vertex in the graph and recursively explore the remaining vertices to check if they will lead to the solution or not. If the current configuration doesn’t result in a solution, backtrack. Note that we assign any color to a vertex only if its adjacent vertices share the different colors.

The implementation can be seen below in TypeScript:

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

// A list to store colors (can handle 10–colorable graph)
const COLORS = ['', 'BLUE', 'GREEN', 'RED', 'YELLOW', 'ORANGE', 'PINK',
        'BLACK', 'BROWN', 'WHITE', 'PURPLE'];

// Function to check if it is safe to assign color `c` to vertex `v`
function isSafe(graph: Graph, color: number[], v: number, c: number): boolean {
    // check the color of every adjacent vertex of `v`
    for (const u of graph.adjList[v]) {
        if (color[u] === c) {
            return false;
        }
    }
    return true;
}

function kColorable(g: Graph, color: number[], k: number, v: number, n: number): void {

    // if all colors are assigned, print the solution
    if (v === n) {
        console.log(color.map(c => COLORS[c]));
        return;
    }

    // try all possible combinations of available colors
    for (let c = 1; c <= k; c++) {
        // if it is safe to assign color `c` to vertex `v`
        if (isSafe(g, color, v, c)) {
            // assign color `c` to vertex `v`
            color[v] = c;

            // recur for the next vertex
            kColorable(g, color, k, v + 1, n);

            // backtrack
            color[v] = 0;
        }
    }
}

// List of graph edges as per the above diagram
const edges: [number, number][] = [[0, 1], [0, 4], [0, 5], [4, 5], [1, 4], [1, 3], [2, 3], [2, 4]];

// Set number of vertices in the graph
const n = 6;

// build a graph from the given edges
const g = new Graph(edges, n);

const k = 3;

const color: number[] = Array(n).fill(0);

// print all k–colorable configurations of the graph
kColorable(g, color, k, 0, n);
```

**Output:** BLUE GREEN BLUE RED RED GREEN BLUE GREEN GREEN BLUE RED GREEN BLUE GREEN GREEN RED RED GREEN BLUE RED BLUE GREEN GREEN RED BLUE RED RED BLUE GREEN RED BLUE RED RED GREEN GREEN RED GREEN BLUE BLUE GREEN RED BLUE GREEN BLUE BLUE RED RED BLUE GREEN BLUE GREEN RED RED BLUE GREEN RED GREEN BLUE BLUE RED GREEN RED RED BLUE BLUE RED GREEN RED RED GREEN BLUE RED RED BLUE BLUE GREEN GREEN BLUE RED BLUE BLUE RED GREEN BLUE RED BLUE RED GREEN GREEN BLUE RED GREEN GREEN BLUE BLUE GREEN RED GREEN GREEN RED BLUE GREEN RED GREEN RED BLUE BLUE GREEN

The time complexity of the above solution is exponential and requires additional space for the recursion (call stack).

Also See:

> [Graph Coloring Problem](https://www.techiedelight.com/greedy-coloring-graph/ "Graph Coloring Problem")

> [Find root vertex of a graph](https://www.techiedelight.com/root-vertex-graph/ "Find root vertex of a graph")

> [Determine whether a graph is Bipartite using DFS](https://www.techiedelight.com/determine-given-graph-bipartite-graph-using-dfs/ "Determine whether a graph is Bipartite using DFS")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.47/5. Vote count: 173

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Algorithm](https://www.techiedelight.com/Tags/Algorithm/), [Medium](https://www.techiedelight.com/Tags/medium/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
