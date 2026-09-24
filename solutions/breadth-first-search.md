# Breadth-First Search (BFS) – Iterative and Recursive Implementation

> Source: https://www.techiedelight.com/breadth-first-search/

Breadth–first search (BFS) is an algorithm for traversing or searching tree or graph data structures. It starts at the tree root (or some arbitrary node of a graph, sometimes referred to as a ‘search key’) and explores the neighbor nodes first before moving to the next-level neighbors.

The following graph shows the order in which the nodes are discovered in BFS:

[](https://commons.wikimedia.org/wiki/File%3ABreadth-first-tree.svg "By Alexander Drichel \(Own work\) \[GFDL \(http://www.gnu.org/copyleft/fdl.html\) or CC BY 3.0 \(https://creativecommons.org/licenses/by/3.0/\)\], via Wikimedia Commons")

[Breadth–first search (BFS)](https://techiedelight.com/bfs-interview-questions/) is a graph traversal algorithm that explores vertices in the order of their distance from the source vertex, where distance is the minimum length of a path from the source vertex to the node as evident from the above example.

## Applications of BFS

  * Copying garbage collection, Cheney’s algorithm.
  * Finding the shortest path between two nodes `u` and `v`, with path length measured by the total number of edges (an advantage over depth–first search).
  * Testing a graph for bipartiteness.
  * Minimum Spanning Tree for an unweighted graph.
  * Web crawler.
  * Finding nodes in any connected component of a graph.
  * Ford–Fulkerson method for computing the maximum flow in a flow network.
  * Serialization/Deserialization of a [binary tree](https://techiedelight.com/binary-tree-interview-questions/) vs. serialization in sorted order allows the tree to be reconstructed efficiently.

## Iterative Implementation of BFS

The non-recursive implementation of BFS is similar to the [non-recursive implementation of DFS](https://techiedelight.com/depth-first-search/#iterative) but differs from it in two ways:

  * It uses a [queue](https://techiedelight.com/circular-queue-implementation-c/) instead of a [stack](https://techiedelight.com/stack-implementation/).
  * It checks whether a vertex has been discovered before pushing the vertex rather than delaying this check until the vertex is dequeued.

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <queue>
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

        // add edges to the undirected graph
        for (auto &edge: edges)
        {
            adjList[edge.src].push_back(edge.dest);
            adjList[edge.dest].push_back(edge.src);
        }
    }
};

// Perform BFS on the graph starting from vertex `v`
void BFS(Graph const &graph, int v, vector<bool> &discovered)
{
    // create a queue for doing BFS
    queue<int> q;

    // mark the source vertex as discovered
    discovered[v] = true;

    // enqueue source vertex
    q.push(v);

    // loop till queue is empty
    while (!q.empty())
    {
        // dequeue front node and print it
        v = q.front();
        q.pop();
        cout << v << " ";

        // do for every edge (v, u)
        for (int u: graph.adjList[v])
        {
            if (!discovered[u])
            {
                // mark it as discovered and enqueue it
                discovered[u] = true;
                q.push(u);
            }
        }
    }
}

int main()
{
    // vector of graph edges as per the above diagram
    vector<Edge> edges = {
        {1, 2}, {1, 3}, {1, 4}, {2, 5}, {2, 6}, {5, 9},
        {5, 10}, {4, 7}, {4, 8}, {7, 11}, {7, 12}
        // vertex 0, 13, and 14 are single nodes
    };

    // total number of nodes in the graph (labelled from 0 to 14)
    int n = 15;

    // build a graph from the given edges
    Graph graph(edges, n);

    // to keep track of whether a vertex is discovered or not
    vector<bool> discovered(n, false);

    // Perform BFS traversal from all undiscovered nodes to
    // cover all connected components of a graph
    for (int i = 0; i < n; i++)
    {
        if (discovered[i] == false)
        {
            // start BFS traversal from vertex `i`
            BFS(graph, i, discovered);
        }
    }

    return 0;
}
```

**Output:** 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14

##

```java
import java.util.*;

// A class to store a graph edge
class Edge
{
    int source, dest;

    public Edge(int source, int dest)
    {
        this.source = source;
        this.dest = dest;
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
    // Perform BFS on the graph starting from vertex `v`
    public static void BFS(Graph graph, int v, boolean[] discovered)
    {
        // create a queue for doing BFS
        Queue<Integer> q = new ArrayDeque<>();

        // mark the source vertex as discovered
        discovered[v] = true;

        // enqueue source vertex
        q.add(v);

        // loop till queue is empty
        while (!q.isEmpty())
        {
            // dequeue front node and print it
            v = q.poll();
            System.out.print(v + " ");

            // do for every edge (v, u)
            for (int u: graph.adjList.get(v))
            {
                if (!discovered[u])
                {
                    // mark it as discovered and enqueue it
                    discovered[u] = true;
                    q.add(u);
                }
            }
        }
    }

    public static void main(String[] args)
    {
        // List of graph edges as per the above diagram
        List<Edge> edges = Arrays.asList(
                new Edge(1, 2), new Edge(1, 3), new Edge(1, 4), new Edge(2, 5),
                new Edge(2, 6), new Edge(5, 9), new Edge(5, 10), new Edge(4, 7),
                new Edge(4, 8), new Edge(7, 11), new Edge(7, 12)
                // vertex 0, 13, and 14 are single nodes
        );

        // total number of nodes in the graph (labelled from 0 to 14)
        int n = 15;

        // build a graph from the given edges
        Graph graph = new Graph(edges, n);

        // to keep track of whether a vertex is discovered or not
        boolean[] discovered = new boolean[n];

        // Perform BFS traversal from all undiscovered nodes to
        // cover all connected components of a graph
        for (int i = 0; i < n; i++)
        {
            if (discovered[i] == false)
            {
                // start BFS traversal from vertex `i`
                BFS(graph, i, discovered);
            }
        }
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

# Perform BFS on the graph starting from vertex `v`
def BFS(graph, v, discovered):

    # create a queue for doing BFS
    q = deque()

    # mark the source vertex as discovered
    discovered[v] = True

    # enqueue source vertex
    q.append(v)

    # loop till queue is empty
    while q:

        # dequeue front node and print it
        v = q.popleft()
        print(v, end=' ')

        # do for every edge (v, u)
        for u in graph.adjList[v]:
            if not discovered[u]:
                # mark it as discovered and enqueue it
                discovered[u] = True
                q.append(u)

if __name__ == '__main__':

    # List of graph edges as per the above diagram
    edges = [
        (1, 2), (1, 3), (1, 4), (2, 5), (2, 6), (5, 9),
        (5, 10), (4, 7), (4, 8), (7, 11), (7, 12)
        # vertex 0, 13, and 14 are single nodes
    ]

    # total number of nodes in the graph (labelled from 0 to 14)
    n = 15

    # build a graph from the given edges
    graph = Graph(edges, n)

    # to keep track of whether a vertex is discovered or not
    discovered = [False] * n

    # Perform BFS traversal from all undiscovered nodes to
    # cover all connected components of a graph
    for i in range(n):
        if not discovered[i]:
            # start BFS traversal from vertex i
            BFS(graph, i, discovered)
```

## Recursive Implementation of BFS

The recursive algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <queue>
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

        // add edges to the undirected graph
        for (auto &edge: edges)
        {
            adjList[edge.src].push_back(edge.dest);
            adjList[edge.dest].push_back(edge.src);
        }
    }
};

// Perform BFS recursively on the graph
void recursiveBFS(Graph const &graph, queue<int> &q, vector<bool> &discovered)
{
    if (q.empty()) {
        return;
    }

    // dequeue front node and print it
    int v = q.front();
    q.pop();
    cout << v << " ";

    // do for every edge (v, u)
    for (int u: graph.adjList[v])
    {
        if (!discovered[u])
        {
            // mark it as discovered and enqueue it
            discovered[u] = true;
            q.push(u);
        }
    }

    recursiveBFS(graph, q, discovered);
}

int main()
{
    // vector of graph edges as per the above diagram
    vector<Edge> edges = {
        {1, 2}, {1, 3}, {1, 4}, {2, 5}, {2, 6}, {5, 9},
        {5, 10}, {4, 7}, {4, 8}, {7, 11}, {7, 12}
        // vertex 0, 13, and 14 are single nodes
    };

    // total number of nodes in the graph (labelled from 0 to 14)
    int n = 15;

    // build a graph from the given edges
    Graph graph(edges, n);

    // to keep track of whether a vertex is discovered or not
    vector<bool> discovered(n, false);

    // create a queue for doing BFS
    queue<int> q;

    // Perform BFS traversal from all undiscovered nodes to
    // cover all connected components of a graph
    for (int i = 0; i < n; i++)
    {
        if (discovered[i] == false)
        {
            // mark the source vertex as discovered
            discovered[i] = true;

            // enqueue source vertex
            q.push(i);

            // start BFS traversal from vertex `i`
            recursiveBFS(graph, q, discovered);
        }
    }

    return 0;
}
```

**Output:** 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14

##

```java
import java.util.*;

// A class to store a graph edge
class Edge
{
    int source, dest;

    public Edge(int source, int dest)
    {
        this.source = source;
        this.dest = dest;
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
    // Perform BFS recursively on the graph
    public static void recursiveBFS(Graph graph, Queue<Integer> q,
                                    boolean[] discovered)
    {
        if (q.isEmpty()) {
            return;
        }

        // dequeue front node and print it
        int v = q.poll();
        System.out.print(v + " ");

        // do for every edge (v, u)
        for (int u: graph.adjList.get(v))
        {
            if (!discovered[u])
            {
                // mark it as discovered and enqueue it
                discovered[u] = true;
                q.add(u);
            }
        }

        recursiveBFS(graph, q, discovered);
    }

    public static void main(String[] args)
    {
        // List of graph edges as per the above diagram
        List<Edge> edges = Arrays.asList(
                new Edge(1, 2), new Edge(1, 3), new Edge(1, 4), new Edge(2, 5),
                new Edge(2, 6), new Edge(5, 9), new Edge(5, 10), new Edge(4, 7),
                new Edge(4, 8), new Edge(7, 11), new Edge(7, 12)
                // vertex 0, 13, and 14 are single nodes
        );

        // total number of nodes in the graph (labelled from 0 to 14)
        int n = 15;

        // build a graph from the given edges
        Graph graph = new Graph(edges, n);

        // to keep track of whether a vertex is discovered or not
        boolean[] discovered = new boolean[n];

        // create a queue for doing BFS
        Queue<Integer> q = new ArrayDeque<>();

        // Perform BFS traversal from all undiscovered nodes to
        // cover all connected components of a graph
        for (int i = 0; i < n; i++)
        {
            if (discovered[i] == false)
            {
                // mark the source vertex as discovered
                discovered[i] = true;

                // enqueue source vertex
                q.add(i);

                // start BFS traversal from vertex `i`
                recursiveBFS(graph, q, discovered);
            }
        }
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

# Perform BFS recursively on the graph
def recursiveBFS(graph, q, discovered):

    if not q:
        return

    # dequeue front node and print it
    v = q.popleft()
    print(v, end=' ')

    # do for every edge (v, u)
    for u in graph.adjList[v]:
        if not discovered[u]:
            # mark it as discovered and enqueue it
            discovered[u] = True
            q.append(u)

    recursiveBFS(graph, q, discovered)

if __name__ == '__main__':

    # List of graph edges as per the above diagram
    edges = [
        (1, 2), (1, 3), (1, 4), (2, 5), (2, 6), (5, 9),
        (5, 10), (4, 7), (4, 8), (7, 11), (7, 12)
        # vertex 0, 13, and 14 are single nodes
    ]

    # total number of nodes in the graph (labelled from 0 to 14)
    n = 15

    # build a graph from the given edges
    graph = Graph(edges, n)

    # to keep track of whether a vertex is discovered or not
    discovered = [False] * n

    # create a queue for doing BFS
    q = deque()

    # Perform BFS traversal from all undiscovered nodes to
    # cover all connected components of a graph
    for i in range(n):
        if not discovered[i]:
            # mark the source vertex as discovered
            discovered[i] = True

            # enqueue source vertex
            q.append(i)

            # start BFS traversal from vertex i
            recursiveBFS(graph, q, discovered)
```

The time complexity of BFS traversal is O(V + E), where `V` and `E` are the total number of vertices and edges in the graph, respectively. Please note that O(E) may vary between O(1) and O(V2), depending on how dense the graph is.

**Also See:**

> [Breadth First Search (BFS) – Interview Questions & Practice Problems](https://techiedelight.com/bfs-interview-questions/)
