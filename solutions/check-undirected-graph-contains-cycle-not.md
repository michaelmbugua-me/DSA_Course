# Check if an undirected graph contains a cycle or not

> Source: https://www.techiedelight.com/check-undirected-graph-contains-cycle-not/

Given a connected undirected graph, check if it contains any cycle or not.

For example, the following graph contains a cycle `2–5–10–6–2`:

[](https://commons.wikimedia.org/wiki/File%3ABreadth-first-tree.svg "By Alexander Drichel \(Own work\) \[GFDL \(http://www.gnu.org/copyleft/fdl.html\) or CC BY 3.0 \(https://creativecommons.org/licenses/by/3.0/\)\], via Wikimedia Commons")

> 

**Recommended Read:**

> [Types of edges involved in DFS and relation between them](https://techiedelight.com/types-edges-involved-dfs-relation/)

## 1\. Using BFS

When we do a [Breadth–first search (BFS)](https://techiedelight.com/breadth-first-search/) from any vertex `v` in an undirected graph, we may encounter **a cross-edge** that points to a previously discovered vertex that is neither an ancestor nor a descendant of the current vertex. Each “cross edge” defines a cycle in an undirected graph. If the cross edge is `x —> y`, then since `y` is already discovered, we have a path from `v` to `y` (or from `y` to `v` since the graph is undirected), where `v` is the starting vertex of BFS. So, we can say that we have a path `v ~~ x ~ y ~~ v` that forms a cycle. (Here, `~~` represents one more edge in the path, and `~` represents a direct edge).

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
        for (auto &edge: edges)
        {
            adjList[edge.src].push_back(edge.dest);
            adjList[edge.dest].push_back(edge.src);
        }
    }
};

// Node to store vertex and its parent info in BFS
struct Node {
    int v, parent;
};

// Perform BFS on the graph starting from vertex `src` and
// return true if a cycle is found in the graph
bool BFS(Graph const &graph, int src, int n)
{
    // to keep track of whether a vertex is discovered or not
    vector<bool> discovered(n);

    // mark the source vertex as discovered
    discovered[src] = true;

    // create a queue for doing BFS and
    // enqueue source vertex
    queue<Node> q;
    q.push({src, -1});

    // loop till queue is empty
    while (!q.empty())
    {
        // dequeue front node and print it
        Node node = q.front();
        q.pop();

        // do for every edge (v, u)
        for (int u: graph.adjList[node.v])
        {
            if (!discovered[u])
            {
                // mark it as discovered
                discovered[u] = true;

                // construct the queue node containing info
                // about vertex and enqueue it
                q.push({ u, node.v });
            }

            // `u` is discovered, and `u` is not a parent
            else if (u != node.parent)
            {
                // we found a cross-edge, i.e., the cycle is found
                return true;
            }
        }
    }

    // no cross-edges were found in the graph
    return false;
}

int main()
{
    // initialize edges
    vector<Edge> edges =
    {
        {0, 1}, {0, 2}, {0, 3}, {1, 4}, {1, 5}, {4, 8},
        {4, 9}, {3, 6}, {3, 7}, {6, 10}, {6, 11}, {5, 9}
        // edge {5, 9} introduces a cycle in the graph
    };

    // total number of nodes in the graph (0 to 11)
    int n = 12;

    // build a graph from the given edges
    Graph graph(edges, n);

    // Perform BFS traversal in connected components of a graph
    if (BFS(graph, 0, n)) {
        cout << "The graph contains a cycle";
    }
    else {
        cout << "The graph doesn't contain any cycle";
    }

    return 0;
}
```

**Output:** The graph contains a cycle

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

// Node to store vertex and its parent info in BFS
class Node
{
    int v, parent;

    Node(int v, int parent)
    {
        this.v = v;
        this.parent = parent;
    }
}

class Main
{
    // Perform BFS on the graph starting from vertex `src` and
    // return true if a cycle is found in the graph
    public static boolean BFS(Graph graph, int src, int n)
    {
        // to keep track of whether a vertex is discovered or not
        boolean[] discovered = new boolean[n];

        // mark the source vertex as discovered
        discovered[src] = true;

        // create a queue for doing BFS and
        // enqueue source vertex
        Queue<Node> q = new ArrayDeque<>();
        q.add(new Node(src, -1));

        // loop till queue is empty
        while (!q.isEmpty())
        {
            // dequeue front node and print it
            Node node = q.poll();

            // do for every edge (v, u)
            for (int u: graph.adjList.get(node.v))
            {
                if (!discovered[u])
                {
                    // mark it as discovered
                    discovered[u] = true;

                    // construct the queue node containing info
                    // about vertex and enqueue it
                    q.add(new Node(u, node.v));
                }

                // `u` is discovered, and `u` is not a parent
                else if (u != node.parent)
                {
                    // we found a cross-edge, i.e., the cycle is found
                    return true;
                }
            }
        }

        // no cross-edges were found in the graph
        return false;
    }

    public static void main(String[] args)
    {
        // List of graph edges
        List<Edge> edges = Arrays.asList(
                                new Edge(0, 1), new Edge(0, 2), new Edge(0, 3),
                                new Edge(1, 4), new Edge(1, 5), new Edge(4, 8),
                                new Edge(4, 9), new Edge(3, 6), new Edge(3, 7),
                                new Edge(6, 10), new Edge(6, 11), new Edge(5, 9)
                                // edge (5, 9) introduces a cycle in the graph
                            );

        // total number of nodes in the graph (0 to 11)
        int n = 12;

        // build a graph from the given edges
        Graph graph = new Graph(edges, n);

        // Perform BFS traversal in connected components of a graph
        if (BFS(graph, 0, n)) {
            System.out.println("The graph contains a cycle");
        }
        else {
            System.out.println("The graph doesn't contain any cycle");
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

# Perform BFS on the graph starting from vertex `src` and
# return true if a cycle is found in the graph
def BFS(graph, src, n):

    # to keep track of whether a vertex is discovered or not
    discovered = [False] * n

    # mark the source vertex as discovered
    discovered[src] = True

    # create a queue for doing BFS
    q = deque()

    # enqueue source vertex and its parent info
    q.append((src, -1))

    # loop till queue is empty
    while q:

        # dequeue front node and print it
        (v, parent) = q.popleft()

        # do for every edge (v, u)
        for u in graph.adjList[v]:
            if not discovered[u]:
                # mark it as discovered
                discovered[u] = True

                # construct the queue node containing info
                # about vertex and enqueue it
                q.append((u, v))

            # `u` is discovered, and `u` is not a parent
            elif u != parent:
                # we found a cross-edge, i.e., the cycle is found
                return True

    # no cross-edges were found in the graph
    return False

if __name__ == '__main__':

    # List of graph edges
    edges = [
        (0, 1), (0, 2), (0, 3), (1, 4), (1, 5), (4, 8),
        (4, 9), (3, 6), (3, 7), (6, 10), (6, 11), (5, 9)
        # edge (5, 9) introduces a cycle in the graph
    ]

    # total number of nodes in the graph (0 to 11)
    n = 12

    # build a graph from the given edges
    graph = Graph(edges, n)

    # Perform BFS traversal in connected components of a graph
    if BFS(graph, 0, n):
        print('The graph contains a cycle')
    else:
        print('The graph doesn\'t contain any cycle')
```

## 2\. Using DFS

The following graph contains a cycle `8—9—11—12—8`:

[](https://commons.wikimedia.org/wiki/File%3ADepth-first-tree.svg "By Alexander Drichel \(Own work\) \[GFDL \(http://www.gnu.org/copyleft/fdl.html\) or CC BY-SA 3.0 \(https://creativecommons.org/licenses/by-sa/3.0/\)\], via Wikimedia Commons")

When we do a [Depth–first search (DFS)](https://techiedelight.com/depth-first-search/) from any vertex `v` in an undirected graph, we may encounter a **back-edge** that points to one of the ancestors of the current vertex `v` in the DFS tree. Each “back edge” defines a cycle in an undirected graph. If the back edge is `x —> y`, then since `y` is the ancestor of node `x`, we have a path from `y` to `x`. So, we can say that we have a path `y ~~ x ~ y` that forms a cycle. (Here, `~~` represents one more edge in the path, and `~` represents a direct edge).

Following is the implementation in C++, Java, and Python based on the above idea:

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
        for (auto &edge: edges)
        {
            adjList[edge.src].push_back(edge.dest);
            adjList[edge.dest].push_back(edge.src);
        }
    }
};

// Perform DFS on the graph and returns true if any back-edge is found in the graph
bool DFS(Graph const &graph, int v, vector<bool> &discovered, int parent)
{
    // mark the current node as discovered
    discovered[v] = true;

    // do for every edge (v, w)
    for (int w: graph.adjList[v])
    {
        // if `w` is not discovered
        if (!discovered[w])
        {
            if (DFS(graph, w, discovered, v)) {
                return true;
            }
        }

        // if `w` is discovered, and `w` is not a parent
        else if (w != parent)
        {
            // we found a back-edge (cycle)
            return true;
        }
    }

    // No back-edges were found in the graph
    return false;
}

int main()
{
    // initialize edges
    vector<Edge> edges =
    {
        {0, 1}, {0, 6}, {0, 7}, {1, 2}, {1, 5}, {2, 3},
        {2, 4}, {7, 8}, {7, 11}, {8, 9}, {8, 10}, {10, 11}
        // edge (10, 11) introduces a cycle in the graph
    };

    // total number of nodes in the graph (0 to 11)
    int n = 12;

    // build a graph from the given edges
    Graph graph(edges, n);

    // to keep track of whether a vertex is discovered or not
    vector<bool> discovered(n);

    // Perform DFS traversal from the first vertex
    if (DFS(graph, 0, discovered, -1)) {
        cout << "The graph contains a cycle";
    }
    else {
        cout << "The graph doesn't contain any cycle";
    }

    return 0;
}
```

**Output:** The graph contains a cycle

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
        adjList = new ArrayList<>(n);

        for (int i = 0; i < n; i++) {
            adjList.add(i, new ArrayList<>());
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
    // Function to perform DFS traversal on the graph on a graph
    public static boolean DFS(Graph graph, int v, boolean[] discovered, int parent)
    {
        // mark the current node as discovered
        discovered[v] = true;

        // do for every edge (v, w)
        for (int w: graph.adjList.get(v))
        {
            // if `w` is not discovered
            if (!discovered[w])
            {
                if (DFS(graph, w, discovered, v)) {
                    return true;
                }
            }

            // if `w` is discovered, and `w` is not a parent
            else if (w != parent)
            {
                // we found a back-edge (cycle)
                return true;
            }
        }

        // No back-edges were found in the graph
        return false;
    }

    public static void main(String[] args)
    {
        // List of graph edges
        List<Edge> edges = Arrays.asList(
                        new Edge(0, 1), new Edge(0, 6), new Edge(0, 7),
                        new Edge(1, 2), new Edge(1, 5), new Edge(2, 3),
                        new Edge(2, 4), new Edge(7, 8), new Edge(7, 11),
                        new Edge(8, 9), new Edge(8, 10), new Edge(10, 11)
                        // edge (10, 11) introduces a cycle in the graph
                    );

        // total number of nodes in the graph (0 to 11)
        int n = 12;

        // build a graph from the given edges
        Graph graph = new Graph(edges, n);

        // to keep track of whether a vertex is discovered or not
        boolean[] discovered = new boolean[n];

        // Perform DFS traversal from the first vertex
        if (DFS(graph, 0, discovered, -1)) {
            System.out.println("The graph contains a cycle");
        }
        else {
            System.out.println("The graph doesn't contain any cycle");
        }
    }
}
```

##

```python3
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

# Function to perform DFS traversal on the graph on a graph
def DFS(graph, v, discovered, parent=-1):

    # mark the current node as discovered
    discovered[v] = True

    # do for every edge (v, w)
    for w in graph.adjList[v]:

        # if `w` is not discovered
        if not discovered[w]:
            if DFS(graph, w, discovered, v):
                return True

        # if `w` is discovered, and `w` is not a parent
        elif w != parent:
            # we found a back-edge (cycle)
            return True

    # No back-edges were found in the graph
    return False

if __name__ == '__main__':

    # List of graph edges
    edges = [
        (0, 1), (0, 6), (0, 7), (1, 2), (1, 5), (2, 3),
        (2, 4), (7, 8), (7, 11), (8, 9), (8, 10), (10, 11)
        # edge (10, 11) introduces a cycle in the graph
    ]

    # total number of nodes in the graph (0 to 11)
    n = 12

    # build a graph from the given edges
    graph = Graph(edges, n)

    # to keep track of whether a vertex is discovered or not
    discovered = [False] * n

    # Perform DFS traversal from the first vertex
    if DFS(graph, 0, discovered):
        print('The graph contains a cycle')
    else:
        print('The graph doesn\'t contain any cycle')
```

The time complexity of the above solutions is O(V + E), where `V` and `E` are the total number of vertices and edges in the graph, respectively.
