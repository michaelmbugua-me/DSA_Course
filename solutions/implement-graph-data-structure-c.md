# Implement Graph Data Structure in C

> Source: https://www.techiedelight.com/implement-graph-data-structure-c/

This post will cover [graph data structure](https://techiedelight.com/terminology-and-representations-of-graphs/) implementation in C using an adjacency list. The post will cover both weighted and unweighted implementation of directed and undirected graphs.

In the graph’s adjacency list representation, each vertex in the graph is associated with the collection of its neighboring vertices or edges, i.e., every vertex stores a list of adjacent vertices.

For example, for the above graph, below is its adjacency list pictorial representation:

## 1\. Directed Graph Implementation

Following is the C implementation of a directed graph using an adjacency list:

```
#include <stdio.h>
#include <stdlib.h>

// Define the maximum number of vertices in the graph
#define N 6

// Data structure to store a graph object
struct Graph
{
    // An array of pointers to Node to represent an adjacency list
    struct Node* head[N];
};

// Data structure to store adjacency list nodes of the graph
struct Node
{
    int dest;
    struct Node* next;
};

// Data structure to store a graph edge
struct Edge {
    int src, dest;
};

// Function to create an adjacency list from specified edges
struct Graph* createGraph(struct Edge edges[], int n)
{
    // allocate storage for the graph data structure
    struct Graph* graph = (struct Graph*)malloc(sizeof(struct Graph));

    // initialize head pointer for all vertices
    for (int i = 0; i < N; i++) {
        graph->head[i] = NULL;
    }

    // add edges to the directed graph one by one
    for (int i = 0; i < n; i++)
    {
        // get the source and destination vertex
        int src = edges[i].src;
        int dest = edges[i].dest;

        // allocate a new node of adjacency list from src to dest
        struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
        newNode->dest = dest;

        // point new node to the current head
        newNode->next = graph->head[src];

        // point head pointer to the new node
        graph->head[src] = newNode;
    }

    return graph;
}

// Function to print adjacency list representation of a graph
void printGraph(struct Graph* graph)
{
    for (int i = 0; i < N; i++)
    {
        // print current vertex and all its neighbors
        struct Node* ptr = graph->head[i];
        while (ptr != NULL)
        {
            printf("(%d —> %d)\t", i, ptr->dest);
            ptr = ptr->next;
        }

        printf("\n");
    }
}

// Directed graph implementation in C
int main(void)
{
    // input array containing edges of the graph (as per the above diagram)
    // (x, y) pair in the array represents an edge from x to y
    struct Edge edges[] =
    {
        {0, 1}, {1, 2}, {2, 0}, {2, 1}, {3, 2}, {4, 5}, {5, 4}
    };

    // calculate the total number of edges
    int n = sizeof(edges)/sizeof(edges[0]);

    // construct a graph from the given edges
    struct Graph *graph = createGraph(edges, n);

    // Function to print adjacency list representation of a graph
    printGraph(graph);

    return 0;
}
```

**Output:** (0 —> 1) (1 —> 2) (2 —> 1) (2 —> 0) (3 —> 2) (4 —> 5) (5 —> 4)

As evident from the above code, in a directed graph, we only create an edge from `src` to `dest` in the adjacency list. Now, if the graph is undirected, we also need to create an edge from `dest` to `src` in the adjacency list, as shown below:

```
#include <stdio.h>
#include <stdlib.h>

// Define the maximum number of vertices in the graph
#define N 6

// Data structure to store a graph object
struct Graph
{
    // An array of pointers to Node to represent an adjacency list
    struct Node* head[N];
};

// Data structure to store adjacency list nodes of the graph
struct Node
{
    int dest;
    struct Node* next;
};

// Data structure to store a graph edge
struct Edge {
    int src, dest;
};

// Function to create an adjacency list from specified edges
struct Graph* createGraph(struct Edge edges[], int n)
{
    // allocate storage for the graph data structure
    struct Graph* graph = (struct Graph*)malloc(sizeof(struct Graph));

    // initialize head pointer for all vertices
    for (int i = 0; i < N; i++) {
        graph->head[i] = NULL;
    }

    // add edges to the directed graph one by one
    for (int i = 0; i < n; i++)
    {
        // get the source and destination vertex
        int src = edges[i].src;
        int dest = edges[i].dest;

        // 1. allocate a new node of adjacency list from src to dest

        struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
        newNode->dest = dest;

        // point new node to the current head
        newNode->next = graph->head[src];

        // point head pointer to the new node
        graph->head[src] = newNode;

        // 2. allocate a new node of adjacency list from `dest` to `src`

        newNode = (struct Node*)malloc(sizeof(struct Node));
        newNode->dest = src;

        // point new node to the current head
        newNode->next = graph->head[dest];

        // change head pointer to point to the new node
        graph->head[dest] = newNode;
    }

    return graph;
}

// Function to print adjacency list representation of a graph
void printGraph(struct Graph* graph)
{
    for (int i = 0; i < N; i++)
    {
        // print current vertex and all its neighbors
        struct Node* ptr = graph->head[i];
        while (ptr != NULL)
        {
            printf("(%d —> %d)\t", i, ptr->dest);
            ptr = ptr->next;
        }

        printf("\n");
    }
}

// Directed graph implementation in C
int main(void)
{
    // input array containing edges of the graph (as per the above diagram)
    // (x, y) pair in the array represents an edge from x to y
    struct Edge edges[] =
    {
        {0, 1}, {1, 2}, {2, 0}, {2, 1}, {3, 2}, {4, 5}, {5, 4}
    };

    // calculate the total number of edges
    int n = sizeof(edges)/sizeof(edges[0]);

    // construct a graph from the given edges
    struct Graph *graph = createGraph(edges, n);

    // Function to print adjacency list representation of a graph
    printGraph(graph);

    return 0;
}
```

**Output:** (0 —> 2) (0 —> 1) (1 —> 2) (1 —> 2) (1 —> 0) (2 —> 3) (2 —> 1) (2 —> 0) (2 —> 1) (3 —> 2) (4 —> 5) (4 —> 5) (5 —> 4) (5 —> 4)

## 2\. Weighted Directed Graph Implementation

In a weighted graph, each edge will have weight (or cost) associated with it, as shown below:

Following is the implementation of a weighted directed graph in C using the adjacency list. The implementation is similar to that of an unweighted directed graph, except we are also storing weight info along with every edge.

```
#include <stdio.h>
#include <stdlib.h>

// Define the maximum number of vertices in the graph
#define N 6

// Data structure to store a graph object
struct Graph
{
    // An array of pointers to Node to represent an adjacency list
    struct Node* head[N];
};

// Data structure to store adjacency list nodes of the graph
struct Node
{
    int dest, weight;
    struct Node* next;
};

// Data structure to store a graph edge
struct Edge {
    int src, dest, weight;
};

// Function to create an adjacency list from specified edges
struct Graph* createGraph(struct Edge edges[], int n)
{
    // allocate storage for the graph data structure
    struct Graph* graph = (struct Graph*)malloc(sizeof(struct Graph));

    // initialize head pointer for all vertices
    for (int i = 0; i < N; i++) {
        graph->head[i] = NULL;
    }

    // add edges to the directed graph one by one
    for (int i = 0; i < n; i++)
    {
        // get the source and destination vertex
        int src = edges[i].src;
        int dest = edges[i].dest;
        int weight = edges[i].weight;

        // allocate a new node of adjacency list from src to dest
        struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
        newNode->dest = dest;
        newNode->weight = weight;

        // point new node to the current head
        newNode->next = graph->head[src];

        // point head pointer to the new node
        graph->head[src] = newNode;
    }

    return graph;
}

// Function to print adjacency list representation of a graph
void printGraph(struct Graph* graph)
{
    for (int i = 0; i < N; i++)
    {
        // print current vertex and all its neighbors
        struct Node* ptr = graph->head[i];
        while (ptr != NULL)
        {
            printf("%d —> %d (%d)\t", i, ptr->dest, ptr->weight);
            ptr = ptr->next;
        }

        printf("\n");
    }
}

// Weighted Directed graph implementation in C
int main(void)
{
    // input array containing edges of the graph (as per the above diagram)
    // (x, y, w) tuple represents an edge from x to y having weight `w`
    struct Edge edges[] =
    {
        {0, 1, 6}, {1, 2, 7}, {2, 0, 5}, {2, 1, 4}, {3, 2, 10}, {4, 5, 1}, {5, 4, 3}
    };

    // calculate the total number of edges
    int n = sizeof(edges)/sizeof(edges[0]);

    // construct a graph from the given edges
    struct Graph *graph = createGraph(edges, n);

    // Function to print adjacency list representation of a graph
    printGraph(graph);

    return 0;
}
```

**Output:** 0 —> 1 (6) 1 —> 2 (7) 2 —> 1 (4) 2 —> 0 (5) 3 —> 2 (10) 4 —> 5 (1) 5 —> 4 (3)

For weighted undirected graphs (as seen before for unweighted undirected graphs), create a path from `dest` to `src` as well in the adjacency list. The complete implementation can be seen [here](https://techiedelight.com/compiler/?run=fSq47Y).

**Also see:**

> [Graph Implementation in C++ (without using STL)](https://techiedelight.com/graph-implementation-c-without-using-stl/)

> [Graph Implementation in C++ using STL](https://techiedelight.com/graph-implementation-using-stl/)

> [Graph Implementation in Java using Collections](https://techiedelight.com/graph-implementation-java-using-collections/)

> [Graph Implementation in Python](https://techiedelight.com/graph-implementation-python/)

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.72/5. Vote count: 281

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Beginner](https://www.techiedelight.com/Tags/Beginner/), [Must Know](https://www.techiedelight.com/Tags/Must-Know/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
