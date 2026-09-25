# Graph Implementation in C++ using STL

> Source: https://www.techiedelight.com/graph-implementation-using-stl/

Given an undirected or a directed graph, implement a graph data structure in C++ using STL. Implement for both weighted and unweighted graphs using the adjacency list representation of the graph.

**Prerequisite:**

> [Terminology and Representations of Graphs](https://techiedelight.com/terminology-and-representations-of-graphs/)

As we already know, the adjacency list associates each vertex in the graph with the collection of its neighboring vertices or edges, i.e., every vertex stores a list of adjacent vertices. There are many variations of adjacency list representation depending upon the implementation.

For example, below is the adjacency list representation of the above graph:

The above representation allows the storage of additional data on the vertices but is practically very efficient when the graph contains only a few edges. We will use the array-based adjacency list representation of a graph.

## 1\. Directed Graph Implementation using STL

```ts
// Data structure to store a graph edge
class Edge {
    constructor(public src: number, public dest: number) {}
}

// A class to represent a graph object
class Graph {
    // an array of arrays to represent an adjacency list
    adjList: number[][];

    // Graph Constructor
    constructor(edges: Edge[], n: number) {
        // resize the array to hold `n` elements of type `number[]`
        this.adjList = Array.from({ length: n }, () => []);

        // add edges to the directed graph
        for (const edge of edges) {
            // insert at the end
            this.adjList[edge.src].push(edge.dest);

            // uncomment the following code for undirected graph
            // this.adjList[edge.dest].push(edge.src);
        }
    }
}

// Function to print adjacency list representation of a graph
function printGraph(graph: Graph, n: number): void {
    for (let i = 0; i < n; i++) {
        // print the current vertex number
        process.stdout.write(`${i} ——> `);

        // print all neighboring vertices of a vertex `i`
        for (const v of graph.adjList[i]) {
            process.stdout.write(`${v} `);
        }
        console.log();
    }
}

(function main() {
    // list of graph edges as per the above diagram
    const edges = [
        new Edge(0, 1), new Edge(1, 2), new Edge(2, 0), new Edge(2, 1),
        new Edge(3, 2), new Edge(4, 5), new Edge(5, 4)
    ];

    // total number of nodes in the graph (labelled from 0 to 5)
    const n = 6;

    // construct graph
    const graph = new Graph(edges, n);

    // print adjacency list representation of a graph
    printGraph(graph, n);
})();
```

**Output:** 0 ——> 1 1 ——> 2 2 ——> 0 1 3 ——> 2 4 ——> 5 5 ——> 4

## 2\. Weighted Directed Graph Implementation using STL

We know that in a weighted graph, every edge will have a weight or cost associated with it, as shown below:

Following is the TypeScript implementation of a weighted directed graph using an adjacency list. The implementation is similar to the above implementation of the unweighted directed graph, except here, we will also store the weight of every edge in the adjacency list.

```ts
// Data structure to store a graph edge
class Edge {
    constructor(public src: number, public dest: number, public weight: number) {}
}

// A class to represent a graph object
class Graph {
    // an array of arrays of Pairs to represent an adjacency list
    adjList: [number, number][][];

    // Graph Constructor
    constructor(edges: Edge[], n: number) {
        // resize the array to hold `n` elements of type Edge
        this.adjList = Array.from({ length: n }, () => []);

        // add edges to the directed graph
        for (const edge of edges) {
            const { src, dest, weight } = edge;

            // insert at the end
            this.adjList[src].push([dest, weight]);

            // uncomment the following code for undirected graph
            // this.adjList[dest].push([src, weight]);
        }
    }
}

// Function to print adjacency list representation of a graph
function printGraph(graph: Graph, n: number): void {
    for (let i = 0; i < n; i++) {
        // Function to print all neighboring vertices of a given vertex
        for (const [dest, weight] of graph.adjList[i]) {
            process.stdout.write(`(${i}, ${dest}, ${weight}) `);
        }
        console.log();
    }
}

(function main() {
    // list of graph edges as per the above diagram
    const edges = [
        // (x, y, w) —> edge from `x` to `y` having weight `w`
        new Edge(0, 1, 6), new Edge(1, 2, 7), new Edge(2, 0, 5), new Edge(2, 1, 4),
        new Edge(3, 2, 10), new Edge(5, 4, 1), new Edge(4, 5, 3)
    ];

    // total number of nodes in the graph (labelled from 0 to 5)
    const n = 6;

    // construct graph
    const graph = new Graph(edges, n);

    // print adjacency list representation of a graph
    printGraph(graph, n);
})();
```

**Output:** (0, 1, 6) (1, 2, 7) (2, 0, 5) (2, 1, 4) (3, 2, 10) (4, 5, 3) (5, 4, 1)

**Note: We will follow the above STL representation of a graph as standard for all graph-related problems.**

**See more:**

> [Implement Graph Data Structure in C](https://techiedelight.com/implement-graph-data-structure-c/)

> [Graph Implementation in C++ (without using STL)](https://techiedelight.com/graph-implementation-c-without-using-stl/)

> [Graph Implementation in Java using Collections](https://techiedelight.com/graph-implementation-java-using-collections/)

> [Graph Implementation in Python](https://techiedelight.com/graph-implementation-python/)

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.83/5. Vote count: 170

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Beginner](https://www.techiedelight.com/Tags/Beginner/), [Must Know](https://www.techiedelight.com/Tags/Must-Know/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
