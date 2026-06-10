# Graph Coloring Problem

> Source: https://www.techiedelight.com/greedy-coloring-graph/

[Graph](https://www.techiedelight.com/Category/Graphs/)

Graph coloring (also called vertex coloring) is a way of coloring a graph’s vertices such that no two adjacent vertices share the same color. This post will discuss a greedy algorithm for graph coloring and minimize the total number of colors used.

For example, consider the following graph:

We can color it in many ways by using the minimum of 3 colors.

Please note that we can’t color the above graph using two colors.

Before discussing the [greedy algorithm](https://techiedelight.com/greedy-algorithm-problems/) to color graphs, let’s talk about basic graph coloring terminology.

K–colorable graph:

A coloring using at most `k` colors is called a (proper) _k_ –coloring, and a graph that can be assigned a (proper) _k_ –coloring is _k_ –colorable.

K–chromatic graph:

The smallest number of colors needed to color a graph `G` is called its chromatic number, and a graph that is _k_ –chromatic if its chromatic number is exactly `k`.

Brooks’ theorem:

[Brooks’ theorem](https://en.wikipedia.org/wiki/Brooks%27_theorem) states that a connected graph can be colored with only `x` colors, where `x` is the maximum degree of any vertex in the graph except for complete graphs and graphs containing an odd length cycle, which requires `x+1` colors.

Greedy coloring _considers the vertices of the graph in sequence and assigns each vertex its first available color_ , i.e., vertices are considered in a specific order `v1`, `v2`, … `vn`, and `vi` and assigned the smallest available color which is not used by any of `vi`’s neighbors.

**Greedy coloring doesn’t always use the minimum number of colors possible to color a graph.** For a graph of maximum degree `x`, greedy coloring will use at most `x+1` color. Greedy coloring can be arbitrarily bad; for example, the following crown graph (a complete bipartite graph), having `n` vertices, can be 2–colored (refer left image), but greedy coloring resulted in `n/2` colors (refer right image).

The algorithm can be implemented as follows in TypeScript:

```ts
// A class to represent a graph object
class Graph {
    // adjacency list
    adjList: number[][];

    constructor(edges: [number, number][], n: number) {
        this.adjList = Array.from({ length: n }, () => []);

        // add edges to the undirected graph
        for (const [src, dest] of edges) {
            this.adjList[src].push(dest);
            this.adjList[dest].push(src);
        }
    }
}

// Function to assign colors to vertices of a graph
function colorGraph(graph: Graph, n: number, colors: string[]): void {

    // keep track of the color assigned to each vertex
    const result = new Map<number, number>();

    // assign a color to vertex one by one
    for (let u = 0; u < n; u++) {

        // check colors of adjacent vertices of `u` and store them in a set
        const assigned = new Set<number>(
            graph.adjList[u].filter(i => result.has(i)).map(i => result.get(i)!)
        );

        // check for the first free color
        let color = 1;
        for (const c of Array.from(assigned).sort((a, b) => a - b)) {
            if (color !== c) {
                break;
            }
            color = color + 1;
        }

        // assign vertex `u` the first available color
        result.set(u, color);
    }

    for (let v = 0; v < n; v++) {
        console.log(`The color assigned to vertex ${v} is ${colors[result.get(v)!]}`);
    }
}

// Greedy coloring of a graph

// Add more colors for graphs with many more vertices
const colors = ['', 'BLUE', 'GREEN', 'RED', 'YELLOW', 'ORANGE', 'PINK',
    'BLACK', 'BROWN', 'WHITE', 'PURPLE', 'VOILET'];

// List of graph edges as per the above diagram
const edges: [number, number][] = [
    [0, 1], [0, 4], [0, 5], [4, 5], [1, 4], [1, 3], [2, 3], [2, 4]
];

// total number of nodes in the graph (labelled from 0 to 5)
const n = 6;

// build a graph from the given edges
const graph = new Graph(edges, n);

// color graph using the greedy algorithm
colorGraph(graph, n, colors);
```

**Output:** The color assigned to vertex 0 is BLUE The color assigned to vertex 1 is GREEN The color assigned to vertex 2 is BLUE The color assigned to vertex 3 is RED The color assigned to vertex 4 is RED The color assigned to vertex 5 is GREEN

The time complexity of the above solution is O(V × E), where `V` and `E` are the total number of vertices and edges in the graph, respectively.

Applications of graph coloring:

The problem of coloring a graph arises in many practical areas such as pattern matching, designing seating plans, scheduling exam timetable, solving Sudoku puzzles, etc.

**References:**

1\. <https://en.wikipedia.org/wiki/Greedy_coloring>

2\. <https://en.wikipedia.org/wiki/Graph_coloring>

Also See:

> [Print all k–colorable configurations of a graph (Vertex coloring of a graph)](https://www.techiedelight.com/print-k-colorable-configurations-graph-vertex-coloring-graph/ "Print all k–colorable configurations of a graph \(Vertex coloring of a graph\)")

> [Determine whether a graph is Bipartite using DFS](https://www.techiedelight.com/determine-given-graph-bipartite-graph-using-dfs/ "Determine whether a graph is Bipartite using DFS")

> [Graph Implementation in C++ using STL](https://www.techiedelight.com/graph-implementation-using-stl/ "Graph Implementation in C++ using STL")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.84/5. Vote count: 177

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Algorithm](https://www.techiedelight.com/Tags/Algorithm/), [Greedy](https://www.techiedelight.com/Tags/Greedy/), [Hashing](https://www.techiedelight.com/Tags/Hashing/), [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
