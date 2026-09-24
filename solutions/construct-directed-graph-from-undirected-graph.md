# Construct a directed graph from an undirected graph that satisfies given constraints

> Source: https://www.techiedelight.com/construct-directed-graph-from-undirected-graph/

Given a connected undirected graph and a vertex in the graph, construct a directed graph such that any path in the directed graph leads to that particular vertex.

Consider the above connected undirected graph. Let the input vertex be 1. The goal is to convert the above graph to a directed graph such that any path in the directed graph leads to vertex 1. Below is one such graph.

The idea is to perform [Breadth–first search (BFS)](https://techiedelight.com/breadth-first-search/) or [Depth–first search (DFS)](https://techiedelight.com/depth-first-search/) on the undirected graph starting from the given vertex and add edges to the directed graph in the direction of the scan. A BFS Tree for the above graph that starts from vertex 1 would look like this.

After all the vertices are processed in our BFS or DFS, reverse all the directed graphs’ edges to have a path from every vertex in the directed graph to the input vertex. Please note that we can save reversing all edges if edges are added in reverse order in the directed graph.

Following is the C++, Java, and Python program that demonstrates it:

```cpp
#include <iostream>
#include <vector>
#include <queue>
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

        // add edges to the undirected graph
        for (const Edge &edge: edges)
        {
            adjList[edge.src].push_back(edge.dest);
            adjList[edge.dest].push_back(edge.src);
        }
    }
};

// Perform BFS on the graph starting from vertex 'v'
vector<Edge> BFS(Graph const &graph, int n, int v)
{
    // stores directed graph edges
    vector<Edge> edges;

    // to keep track of whether a vertex is discovered or not
    vector<bool> discovered(n);

    // mark the source vertex as discovered
    discovered[v] = true;

    // create a queue for doing BFS
    queue<int> q;

    // enqueue source vertex
    q.push(v);

    // loop till queue is empty
    while (!q.empty())
    {
        // dequeue front node
        v = q.front();
        q.pop();

        // do for every edge (v, u)
        for (int u: graph.adjList[v])
        {
            if (!discovered[u])
            {
                // mark it as discovered and enqueue it
                discovered[u] = true;

                // add an edge from 'u' to 'v' to the directed graph
                edges.push_back({u, v});

                q.push(u);
            }
        }
    }

    return edges;
}

int main()
{
    // vector of graph edges as per the above diagram
    vector<Edge> edges = {
        {0, 1}, {0, 2}, {1, 3}, {2, 3}, {2, 4}, {3, 4}, {3, 5}
    };

    // total number of nodes in the graph (labelled from 0 to 5)
    int n = 6;

    // create an undirected graph from the above edges
    Graph graph(edges, n);

    // given vertex
    int vertex = 0;

    edges = BFS(graph, n, vertex);

    // create a new directed graph
    Graph digraph(edges, n);

    return 0;
}
```

##

```java
import java.util.*;

// A class to store a graph edge
class Edge
{
    public final int source, dest;

    private Edge(int source, int dest)
    {
        this.source = source;
        this.dest = dest;
    }

    // Factory method for creating an immutable instance of Edge
    public static Edge of(int a, int b) {
        return new Edge(a, b);        // calls private constructor
    }
}

// A class to represent a graph object
class Graph
{
    // A list of lists to represent an adjacency list
    List<List<Integer>> adjList = null;

    // Constructor
    Graph(List<Edge> edges, int n)
    {
        adjList = new ArrayList<>();

        for (int i = 0; i < n; i++) {
            adjList.add(new ArrayList<>());
        }

        // add edges to the undirected graph
        for (Edge edge: edges)
        {
            int src = edge.source;
            int dest = edge.dest;

            adjList.get(src).add(dest);
            adjList.get(dest).add(src);
        }
    }
}

class Main
{
    // Perform BFS on the graph starting from vertex 'v'
    public static List<Edge> BFS(Graph graph, int n, int v)
    {
        // stores directed graph edges
        List<Edge> edges = new ArrayList<>();

        // to keep track of whether a vertex is discovered or not
        boolean[] discovered = new boolean[n];

        // mark the source vertex as discovered
        discovered[v] = true;

        // create a queue for doing BFS
        Queue<Integer> q = new ArrayDeque<>();

        // enqueue source vertex
        q.add(v);

        // loop till queue is empty
        while (!q.isEmpty())
        {
            // dequeue front node
            v = q.poll();

            // do for every edge (v, u)
            for (int u: graph.adjList.get(v))
            {
                if (!discovered[u])
                {
                    // mark it as discovered and enqueue it
                    discovered[u] = true;

                    // add an edge from 'u' to 'v' to the directed graph
                    edges.add(Edge.of(u, v));

                    q.add(u);
                }
            }
        }

        return edges;
    }

    public static void main(String[] args)
    {
        // List of graph edges as per the above diagram
        List<Edge> edges = Arrays.asList(Edge.of(0, 1), Edge.of(0, 2),
                            Edge.of(1, 3), Edge.of(2, 3), Edge.of(2, 4),
                            Edge.of(3, 4), Edge.of(3, 5));

        // total number of nodes in the graph (labelled from 0 to 5)
        int n = 6;

        // create an undirected graph from the above edges
        Graph graph = new Graph(edges, n);

        // given vertex
        int vertex = 0;

        edges = BFS(graph, n, vertex);

        // create a new directed graph
        Graph digraph = new Graph(edges, n);
    }
}
```

##

```python3
from collections import deque

# A class to represent a graph object
class Graph:
    # Constructor
    def __init__(self, edges, n):

        # A list of lists to represent an adjacency list
        self.adjList = [[] for _ in range(n)]

        # add edges to the undirected graph
        for (src, dest) in edges:
            self.adjList[src].append(dest)
            self.adjList[dest].append(src)

# Perform BFS on a graph starting from vertex 'v'
def BFS(graph, n, v):

    # stores directed graph edges
    edges = []

    # to keep track of whether a vertex is discovered or not
    discovered = [False] * n

    # mark the source vertex as discovered
    discovered[v] = True

    # create a queue for doing BFS
    q = deque()

    # enqueue source vertex
    q.append(v)

    # loop till queue is empty
    while q:

        # dequeue front node
        v = q.popleft()

        # do for every edge (v, u)
        for u in graph.adjList[v]:
            if not discovered[u]:
                # mark it as discovered and enqueue it
                discovered[u] = True

                # add an edge from 'u' to 'v' to the directed graph
                edges.append((u, v))
                q.append(u)

    return edges

if __name__ == '__main__':

    # List of graph edges as per the above diagram
    edges = [(0, 1), (0, 2), (1, 3), (2, 3), (2, 4), (3, 4), (3, 5)]

    # total number of nodes in the graph (labelled from 0 to 5)
    n = 6

    # create an undirected graph from the above edges
    graph = Graph(edges, n)

    # given vertex
    vertex = 0

    edges = BFS(graph, n, vertex)

    # create a new directed graph
    digraph = Graph(edges, n)
```

The time complexity of the above solution is the same as that of BFS, i.e., O(V + E), where `V` and `E` are the total number of vertices and edges in the graph, respectively.

Also See:

> [Check if an undirected graph contains a cycle or not](https://www.techiedelight.com/check-undirected-graph-contains-cycle-not/ "Check if an undirected graph contains a cycle or not")

> [Find the path between given vertices in a directed graph](https://www.techiedelight.com/find-path-between-vertices-directed-graph/ "Find the path between given vertices in a directed graph")

> [Bipartite Graph](https://www.techiedelight.com/bipartite-graph/ "Bipartite Graph")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.59/5. Vote count: 155

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Breadth-first search](https://www.techiedelight.com/Tags/BFS/), [Depth-first search](https://www.techiedelight.com/Tags/DFS/), [FIFO](https://www.techiedelight.com/Tags/FIFO/), [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
