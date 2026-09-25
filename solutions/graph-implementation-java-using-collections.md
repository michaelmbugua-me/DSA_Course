# Graph Implementation in Java using Collections

> Source: https://www.techiedelight.com/graph-implementation-java-using-collections/

This post will cover graph implementation in TypeScript using built-in collections for weighted and unweighted, graph, and digraph.

We know that in an [adjacency list representation of the graph](https://techiedelight.com/terminology-and-representations-of-graphs/#Adjacency-List), each vertex in the graph is associated with its neighboring vertices or edges. In other words, every vertex stores a list of adjacent vertices.

For example, below is the pictorial representation for the corresponding adjacency list for the above graph:

## 1\. Directed Graph (Digraph) Implementation

Following is the TypeScript implementation of a digraph using an adjacency list:

```ts
// A class to store a graph edge
class Edge
{
    constructor(public src: number, public dest: number) {}
}

// A class to represent a graph object
class Graph
{
    // A list of lists to represent an adjacency list
    adjList: number[][] = [];

    // Constructor to construct a graph
    constructor(edges: Edge[])
    {
        // find the maximum numbered vertex
        let n = 0;
        for (const e of edges) {
            n = Math.max(n, e.src, e.dest);
        }

        // allocate memory for the adjacency list
        for (let i = 0; i <= n; i++) {
            this.adjList.push([]);
        }

        // add edges to the directed graph
        for (const current of edges)
        {
            // allocate new node in adjacency list from src to dest
            this.adjList[current.src].push(current.dest);

            // uncomment below line for undirected graph

            // allocate new node in adjacency list from dest to src
            // this.adjList[current.dest].push(current.src);
        }
    }

    // Function to print adjacency list representation of a graph
    static printGraph(graph: Graph): void
    {
        let src = 0;
        const n = graph.adjList.length;

        while (src < n)
        {
            // print current vertex and all its neighboring vertices
            let line = '';
            for (const dest of graph.adjList[src]) {
                line += `(${src} ——> ${dest})\t`;
            }
            console.log(line);
            src++;
        }
    }
}

// Input: List of edges in a digraph (as per the above diagram)
const edges = [
    new Edge(0, 1), new Edge(1, 2), new Edge(2, 0), new Edge(2, 1),
    new Edge(3, 2), new Edge(4, 5), new Edge(5, 4)
];

// construct a graph from the given list of edges
const graph = new Graph(edges);

// print adjacency list representation of the graph
Graph.printGraph(graph);
```

**Output:** (0 ——> 1) (1 ——> 2) (2 ——> 0) (2 ——> 1) (3 ——> 2) (4 ——> 5) (5 ——> 4)

As evident from the above code, an edge is created from `src` to `dest` in the adjacency list in a digraph, and if the graph is undirected, additionally construct an edge from `dest` to `src` in the adjacency list.

## 2\. Weighted Digraph Implementation

We know that in a weighted graph, every edge will have a weight or cost associated with it, as shown below:

Following is the TypeScript implementation of a weighted digraph using an adjacency list. The implementation is similar to that of an unweighted digraph, except storing the weight information in an adjacency list with every edge.

```ts
// A class to store a graph edge
class Edge
{
    constructor(public src: number, public dest: number, public weight: number) {}
}

// A class to store adjacency list nodes
class Node
{
    constructor(public value: number, public weight: number) {}

    toString(): string {
        return `${this.value} (${this.weight})`;
    }
}

// A class to represent a graph object
class Graph
{
    // A list of lists to represent an adjacency list
    adjList: Node[][] = [];

    // Constructor to construct a graph
    constructor(edges: Edge[])
    {
        // find the maximum numbered vertex
        let n = 0;
        for (const e of edges) {
            n = Math.max(n, e.src, e.dest);
        }

        // allocate memory for the adjacency list
        for (let i = 0; i <= n; i++) {
            this.adjList.push([]);
        }

        // add edges to the directed graph
        for (const e of edges)
        {
            // allocate new node in adjacency list from src to dest
            this.adjList[e.src].push(new Node(e.dest, e.weight));

            // uncomment below line for undirected graph

            // allocate new node in adjacency list from dest to src
            // this.adjList[e.dest].push(new Node(e.src, e.weight));
        }
    }

    // Function to print adjacency list representation of a graph
    static printGraph(graph: Graph): void
    {
        let src = 0;
        const n = graph.adjList.length;

        while (src < n)
        {
            // print current vertex and all its neighboring vertices
            let line = '';
            for (const edge of graph.adjList[src]) {
                line += `${src} ——> ${edge}\t`;
            }
            console.log(line);
            src++;
        }
    }
}

// Input: List of edges in a weighted digraph (as per the above diagram)
// tuple `(x, y, w)` represents an edge from `x` to `y` having weight `w`
const edges = [
    new Edge(0, 1, 6), new Edge(1, 2, 7), new Edge(2, 0, 5),
    new Edge(2, 1, 4), new Edge(3, 2, 10), new Edge(4, 5, 1),
    new Edge(5, 4, 3)
];

// construct a graph from the given list of edges
const graph = new Graph(edges);

// print adjacency list representation of the graph
Graph.printGraph(graph);
```

**Output:** 0 ——> 1 (6) 1 ——> 2 (7) 2 ——> 0 (5) 2 ——> 1 (4) 3 ——> 2 (10) 4 ——> 5 (1) 5 ——> 4 (3)

**Also see:**

> [Implement Graph Data Structure in C](https://techiedelight.com/implement-graph-data-structure-c/)

> [Graph Implementation in C++ using STL](https://techiedelight.com/graph-implementation-using-stl/)

> [Graph Implementation in Python](https://techiedelight.com/graph-implementation-python/)

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.85/5. Vote count: 160

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Beginner](https://www.techiedelight.com/Tags/Beginner/), [Must Know](https://www.techiedelight.com/Tags/Must-Know/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
