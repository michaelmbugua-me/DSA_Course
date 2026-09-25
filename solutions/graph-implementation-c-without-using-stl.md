# Graph Implementation in C++ (without using STL)

> Source: https://www.techiedelight.com/graph-implementation-c-without-using-stl/

Given an undirected or a directed graph, implement the graph data structure without using any container provided by any programming language library (e.g., STL in C++ or Collections in Java, etc.). Implement for both weighted and unweighted graphs using the adjacency list representation.

**Prerequisite:**

> [Terminology and Representations of Graphs](https://techiedelight.com/terminology-and-representations-of-graphs/)

As we already know, the adjacency list associates each vertex in the graph with the collection of its neighboring vertices or edges, i.e., every vertex stores a list of adjacent vertices. There are many variations of adjacency list representation depending upon the implementation.

For example, below is the adjacency list representation of the above graph:

The adjacency list representation of graphs also allows additional data storage on the vertices but is practically very efficient when it contains only a few edges.

## 1\. Directed Graph implementation in C++

```ts
// Data structure to store adjacency list nodes
class Node
{
    constructor(public val: number, public next: Node | null = null) {}
}

// Data structure to store a graph edge
class Edge {
    constructor(public src: number, public dest: number) {}
}

class Graph
{
    // An array of pointers to Node to represent the
    // adjacency list
    head: (Node | null)[];

    N: number;    // total number of nodes in the graph

    // Function to allocate a new node for the adjacency list
    private getAdjListNode(dest: number, head: Node | null): Node
    {
        // point new node to the current head
        return new Node(dest, head);
    }

    // Constructor
    constructor(edges: Edge[], n: number, N: number)
    {
        // allocate memory
        this.head = new Array<Node | null>(N).fill(null);
        this.N = N;

        // add edges to the directed graph
        for (let i = 0; i < n; i++)
        {
            const src = edges[i].src;
            const dest = edges[i].dest;

            // insert at the beginning
            const newNode = this.getAdjListNode(dest, this.head[src]);

            // point head pointer to the new node
            this.head[src] = newNode;

            // uncomment the following code for undirected graph

            /*
            const newNode2 = this.getAdjListNode(src, this.head[dest]);

            // change head pointer to point to the new node
            this.head[dest] = newNode2;
            */
        }
    }
}

// Function to print all neighboring vertices of a given vertex
function printList(ptr: Node | null): string
{
    let line = '';
    while (ptr !== null)
    {
        line += ` —> ${ptr.val}`;
        ptr = ptr.next;
    }
    return line;
}

// Graph implementation in TypeScript without using built-in containers

// an array of graph edges as per the above diagram
const edges: Edge[] = [
    // pair {x, y} represents an edge from `x` to `y`
    new Edge(0, 1), new Edge(1, 2), new Edge(2, 0), new Edge(2, 1),
    new Edge(3, 2), new Edge(4, 5), new Edge(5, 4)
];

// total number of nodes in the graph (labelled from 0 to 5)
const N = 6;

// calculate the total number of edges
const n = edges.length;

// construct graph
const graph = new Graph(edges, n, N);

// print adjacency list representation of a graph
for (let i = 0; i < N; i++)
{
    // print given vertex
    let line = String(i);

    // print all its neighboring vertices
    line += printList(graph.head[i]);

    console.log(line);
}
```

**Output:** 0 —> 1 1 —> 2 2 —> 1 —> 0 3 —> 2 4 —> 5 5 —> 4

## 2\. Weighted Directed Graph implementation in C++

We know that in a weighted graph, every edge will have a weight or cost associated with it, as shown below:

Following is the TypeScript implementation of a directed weighted graph. The implementation is similar to the above implementation of unweighted graphs, except we will also store every edge’s weight in the adjacency list.

```ts
// Data structure to store adjacency list nodes
class Node
{
    constructor(public val: number, public cost: number, public next: Node | null = null) {}
}

// Data structure to store a graph edge
class Edge {
    constructor(public src: number, public dest: number, public weight: number) {}
}

class Graph
{
    // An array of pointers to Node to represent the
    // adjacency list
    head: (Node | null)[];

    N: number;    // total number of nodes in the graph

    // Function to allocate a new node for the adjacency list
    private getAdjListNode(value: number, weight: number, head: Node | null): Node
    {
        // point new node to the current head
        return new Node(value, weight, head);
    }

    // Constructor
    constructor(edges: Edge[], n: number, N: number)
    {
        // allocate memory
        this.head = new Array<Node | null>(N).fill(null);
        this.N = N;

        // add edges to the directed graph
        for (let i = 0; i < n; i++)
        {
            const src = edges[i].src;
            const dest = edges[i].dest;
            const weight = edges[i].weight;

            // insert at the beginning
            const newNode = this.getAdjListNode(dest, weight, this.head[src]);

            // point head pointer to the new node
            this.head[src] = newNode;

            // uncomment the following code for undirected graph

            /*
            const newNode2 = this.getAdjListNode(src, weight, this.head[dest]);

            // change head pointer to point to the new node
            this.head[dest] = newNode2;
            */
        }
    }
}

// Function to print all neighboring vertices of a given vertex
function printList(ptr: Node | null, i: number): string
{
    let line = '';
    while (ptr !== null)
    {
        line += `(${i}, ${ptr.val}, ${ptr.cost}) `;
        ptr = ptr.next;
    }
    return line;
}

// Graph implementation in TypeScript without using built-in containers

// an array of graph edges as per the above diagram
const edges: Edge[] = [
    // (x, y, w) —> edge from `x` to `y` having weight `w`
    new Edge(0, 1, 6), new Edge(1, 2, 7), new Edge(2, 0, 5), new Edge(2, 1, 4),
    new Edge(3, 2, 10), new Edge(4, 5, 1), new Edge(5, 4, 3)
];

// total number of nodes in the graph (labelled from 0 to 5)
const N = 6;

// calculate the total number of edges
const n = edges.length;

// construct graph
const graph = new Graph(edges, n, N);

// print adjacency list representation of a graph
for (let i = 0; i < N; i++)
{
    // print all neighboring vertices of a vertex `i`
    console.log(printList(graph.head[i], i).trimEnd());
}
```

**Output:** (0, 1, 6) (1, 2, 7) (2, 1, 4) (2, 0, 5) (3, 2, 10) (4, 5, 1) (5, 4, 3)

**See more:**

> [Graph Implementation in C++ using STL](https://techiedelight.com/graph-implementation-using-stl/)

> [Implement Graph Data Structure in C](https://techiedelight.com/implement-graph-data-structure-c/)

> [Graph Implementation in Java using Collections](https://techiedelight.com/graph-implementation-java-using-collections/)

> [Graph Implementation in Python](https://techiedelight.com/graph-implementation-python/)

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.61/5. Vote count: 168

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Beginner](https://www.techiedelight.com/Tags/Beginner/), [Must Know](https://www.techiedelight.com/Tags/Must-Know/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
