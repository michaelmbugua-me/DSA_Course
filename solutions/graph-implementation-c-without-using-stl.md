# Graph Implementation in C++ (without using STL)

> Source: https://www.techiedelight.com/graph-implementation-c-without-using-stl/

Given an undirected or a directed graph, implement the graph data structure without using any container provided by any programming language library (e.g., STL in C++ or Collections in Java, etc.). Implement for both weighted and unweighted graphs using the adjacency list representation.

**Prerequisite:**

> [Terminology and Representations of Graphs](https://techiedelight.com/terminology-and-representations-of-graphs/)

As we already know, the adjacency list associates each vertex in the graph with the collection of its neighboring vertices or edges, i.e., every vertex stores a list of adjacent vertices. There are many variations of adjacency list representation depending upon the implementation.

For example, below is the adjacency list representation of the above graph:

The adjacency list representation of graphs also allows additional data storage on the vertices but is practically very efficient when it contains only a few edges.

## 1\. Directed Graph implementation in C++

```
#include <iostream>
using namespace std;

// Data structure to store adjacency list nodes
struct Node
{
    int val;
    Node* next;
};

// Data structure to store a graph edge
struct Edge {
    int src, dest;
};

class Graph
{
    // Function to allocate a new node for the adjacency list
    Node* getAdjListNode(int dest, Node* head)
    {
        Node* newNode = new Node;
        newNode->val = dest;

        // point new node to the current head
        newNode->next = head;

        return newNode;
    }

    int N;    // total number of nodes in the graph

public:

    // An array of pointers to Node to represent the
    // adjacency list
    Node **head;

    // Constructor
    Graph(Edge edges[], int n, int N)
    {
        // allocate memory
        head = new Node*[N]();
        this->N = N;

        // initialize head pointer for all vertices
        for (int i = 0; i < N; i++) {
            head[i] = nullptr;
        }

        // add edges to the directed graph
        for (unsigned i = 0; i < n; i++)
        {
            int src = edges[i].src;
            int dest = edges[i].dest;

            // insert at the beginning
            Node* newNode = getAdjListNode(dest, head[src]);

            // point head pointer to the new node
            head[src] = newNode;

            // uncomment the following code for undirected graph

            /*
            newNode = getAdjListNode(src, head[dest]);

            // change head pointer to point to the new node
            head[dest] = newNode;
            */
        }
    }

    // Destructor
    ~Graph() {
        for (int i = 0; i < N; i++) {
            delete[] head[i];
        }

        delete[] head;
    }
};

// Function to print all neighboring vertices of a given vertex
void printList(Node* ptr)
{
    while (ptr != nullptr)
    {
        cout << " —> " << ptr->val;
        ptr = ptr->next;
    }
    cout << endl;
}

// Graph implementation in C++ without using STL
int main()
{
    // an array of graph edges as per the above diagram
    Edge edges[] =
    {
        // pair {x, y} represents an edge from `x` to `y`
        {0, 1}, {1, 2}, {2, 0}, {2, 1}, {3, 2}, {4, 5}, {5, 4}
    };

    // total number of nodes in the graph (labelled from 0 to 5)
    int N = 6;

    // calculate the total number of edges
    int n = sizeof(edges)/sizeof(edges[0]);

    // construct graph
    Graph graph(edges, n, N);

    // print adjacency list representation of a graph
    for (int i = 0; i < N; i++)
    {
        // print given vertex
        cout << i;

        // print all its neighboring vertices
        printList(graph.head[i]);
    }

    return 0;
}
```

**Output:** 0 —> 1 1 —> 2 2 —> 1 —> 0 3 —> 2 4 —> 5 5 —> 4

## 2\. Weighted Directed Graph implementation in C++

We know that in a weighted graph, every edge will have a weight or cost associated with it, as shown below:

Following is the C++ implementation of a directed weighted graph. The implementation is similar to the above implementation of unweighted graphs, except we will also store every edge’s weight in the adjacency list.

```
#include <iostream>
using namespace std;

// Data structure to store adjacency list nodes
struct Node
{
    int val, cost;
    Node* next;
};

// Data structure to store a graph edge
struct Edge {
    int src, dest, weight;
};

class Graph
{
    // Function to allocate a new node for the adjacency list
    Node* getAdjListNode(int value, int weight, Node* head)
    {
        Node* newNode = new Node;
        newNode->val = value;
        newNode->cost = weight;

        // point new node to the current head
        newNode->next = head;

        return newNode;
    }

    int N;    // total number of nodes in the graph

public:

    // An array of pointers to Node to represent the
    // adjacency list
    Node **head;

    // Constructor
    Graph(Edge edges[], int n, int N)
    {
        // allocate memory
        head = new Node*[N]();
        this->N = N;

        // initialize head pointer for all vertices
        for (int i = 0; i < N; i++) {
            head[i] = nullptr;
        }

        // add edges to the directed graph
        for (unsigned i = 0; i < n; i++)
        {
            int src = edges[i].src;
            int dest = edges[i].dest;
            int weight = edges[i].weight;

            // insert at the beginning
            Node* newNode = getAdjListNode(dest, weight, head[src]);

            // point head pointer to the new node
            head[src] = newNode;

            // uncomment the following code for undirected graph

            /*
            newNode = getAdjListNode(src, weight, head[dest]);

            // change head pointer to point to the new node
            head[dest] = newNode;
            */
        }
    }

    // Destructor
    ~Graph() {
        for (int i = 0; i < N; i++) {
            delete[] head[i];
        }

        delete[] head;
    }
};

// Function to print all neighboring vertices of a given vertex
void printList(Node* ptr, int i)
{
    while (ptr != nullptr)
    {
        cout << "(" << i << ", " << ptr->val << ", " << ptr->cost << ") ";
        ptr = ptr->next;
    }
    cout << endl;
}

// Graph implementation in C++ without using STL
int main()
{
    // an array of graph edges as per the above diagram
    Edge edges[] =
    {
        // (x, y, w) —> edge from `x` to `y` having weight `w`
        {0, 1, 6}, {1, 2, 7}, {2, 0, 5}, {2, 1, 4}, {3, 2, 10}, {4, 5, 1}, {5, 4, 3}
    };

    // total number of nodes in the graph (labelled from 0 to 5)
    int N = 6;

    // calculate the total number of edges
    int n = sizeof(edges)/sizeof(edges[0]);

    // construct graph
    Graph graph(edges, n, N);

    // print adjacency list representation of a graph
    for (int i = 0; i < N; i++)
    {
        // print all neighboring vertices of a vertex `i`
        printList(graph.head[i], i);
    }

    return 0;
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
