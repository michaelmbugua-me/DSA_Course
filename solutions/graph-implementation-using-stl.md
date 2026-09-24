# Graph Implementation in C++ using STL

> Source: https://www.techiedelight.com/graph-implementation-using-stl/

Given an undirected or a directed graph, implement a graph data structure in C++ using STL. Implement for both weighted and unweighted graphs using the adjacency list representation of the graph.

**Prerequisite:**

> [Terminology and Representations of Graphs](https://techiedelight.com/terminology-and-representations-of-graphs/)

As we already know, the adjacency list associates each vertex in the graph with the collection of its neighboring vertices or edges, i.e., every vertex stores a list of adjacent vertices. There are many variations of adjacency list representation depending upon the implementation.

For example, below is the adjacency list representation of the above graph:

The above representation allows the storage of additional data on the vertices but is practically very efficient when the graph contains only a few edges. We will use the STL vector class to implement the adjacency list representation of a graph.

## 1\. Directed Graph Implementation using STL

```
#include <iostream>
#include <vector>
using namespace std;

// Data structure to store a graph edge
struct Edge {
    int src, dest;
};

// A class to represent a graph object
class Graph
{
public:
    // a vector of vectors to represent an adjacency list
    vector<vector<int>> adjList;

    // Graph Constructor
    Graph(vector<Edge> const &edges, int n)
    {
        // resize the vector to hold `n` elements of type `vector<int>`
        adjList.resize(n);

        // add edges to the directed graph
        for (auto &edge: edges)
        {
            // insert at the end
            adjList[edge.src].push_back(edge.dest);

            // uncomment the following code for undirected graph
            // adjList[edge.dest].push_back(edge.src);
        }
    }
};

// Function to print adjacency list representation of a graph
void printGraph(Graph const &graph, int n)
{
    for (int i = 0; i < n; i++)
    {
        // print the current vertex number
        cout << i << " ——> ";

        // print all neighboring vertices of a vertex `i`
        for (int v: graph.adjList[i]) {
            cout << v << " ";
        }
        cout << endl;
    }
}

// Graph Implementation using STL
int main()
{
    // vector of graph edges as per the above diagram.
    // Please note that the initialization vector in the below format will
    // work fine in C++11, C++14, C++17 but will fail in C++98.
    vector<Edge> edges =
    {
        {0, 1}, {1, 2}, {2, 0}, {2, 1}, {3, 2}, {4, 5}, {5, 4}
    };

    // total number of nodes in the graph (labelled from 0 to 5)
    int n = 6;

    // construct graph
    Graph graph(edges, n);

    // print adjacency list representation of a graph
    printGraph(graph, n);

    return 0;
}
```

**Output:** 0 ——> 1 1 ——> 2 2 ——> 0 1 3 ——> 2 4 ——> 5 5 ——> 4

## 2\. Weighted Directed Graph Implementation using STL

We know that in a weighted graph, every edge will have a weight or cost associated with it, as shown below:

Following is the C++ implementation of a weighted directed graph using STL. The implementation is similar to the above implementation of the unweighted directed graph, except here, we will also store the weight of every edge in the adjacency list.

```
#include <iostream>
#include <vector>
using namespace std;

// Data structure to store a graph edge
struct Edge {
    int src, dest, weight;
};

typedef pair<int, int> Pair;

// A class to represent a graph object
class Graph
{
public:
    // a vector of vectors of Pairs to represent an adjacency list
    vector<vector<Pair>> adjList;

    // Graph Constructor
    Graph(vector<Edge> const &edges, int n)
    {
        // resize the vector to hold `n` elements of type vector<Edge>
        adjList.resize(n);

        // add edges to the directed graph
        for (auto &edge: edges)
        {
            int src = edge.src;
            int dest = edge.dest;
            int weight = edge.weight;

            // insert at the end
            adjList[src].push_back(make_pair(dest, weight));

            // uncomment the following code for undirected graph
            // adjList[dest].push_back(make_pair(src, weight));
        }
    }
};

// Function to print adjacency list representation of a graph
void printGraph(Graph const &graph, int n)
{
    for (int i = 0; i < n; i++)
    {
        // Function to print all neighboring vertices of a given vertex
        for (Pair v: graph.adjList[i]) {
            cout << "(" << i << ", " << v.first << ", " << v.second << ") ";
        }
        cout << endl;
    }
}

// Graph Implementation using STL
int main()
{
    // vector of graph edges as per the above diagram.
    // Please note that the initialization vector in the below format will
    // work fine in C++11, C++14, C++17 but will fail in C++98.
    vector<Edge> edges =
    {
        // (x, y, w) —> edge from `x` to `y` having weight `w`
        {0, 1, 6}, {1, 2, 7}, {2, 0, 5}, {2, 1, 4}, {3, 2, 10}, {5, 4, 1}, {4, 5, 3}
    };

    // total number of nodes in the graph (labelled from 0 to 5)
    int n = 6;

    // construct graph
    Graph graph(edges, n);

    // print adjacency list representation of a graph
    printGraph(graph, n);

    return 0;
}
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
