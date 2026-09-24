# Depth First Search (DFS) – Iterative and Recursive Implementation

> Source: https://www.techiedelight.com/depth-first-search/

Depth–first search (DFS) is an algorithm for traversing or searching tree or graph data structures. One starts at the root (selecting some arbitrary node as the root for a graph) and explore as far as possible along each branch before [backtracking](https://techiedelight.com/backtracking-interview-questions/).

The following graph shows the order in which the nodes are discovered in DFS:

[](https://commons.wikimedia.org/wiki/File%3ADepth-first-tree.svg "By Alexander Drichel \(Own work\) \[GFDL \(http://www.gnu.org/copyleft/fdl.html\) or CC BY-SA 3.0 \(https://creativecommons.org/licenses/by-sa/3.0/\)\], via Wikimedia Commons")

### Depth–first search in trees

A tree is an undirected graph in which any two vertices are connected by exactly one path. In other words, any acyclic connected graph is a tree. For a tree, we have the following traversal methods:

  * [Preorder](https://techiedelight.com/preorder-tree-traversal-iterative-recursive/): visit each node before its children.
  * [Postorder](https://techiedelight.com/postorder-tree-traversal-iterative-recursive/): visit each node after its children.
  * [Inorder](https://techiedelight.com/inorder-tree-traversal-iterative-recursive/) (for [binary trees](https://techiedelight.com/binary-tree-interview-questions/) only): visit left subtree, node, right subtree.

These are already covered in detail in separate posts.

### Depth–first search in Graph

A [Depth–first search (DFS)](https://techiedelight.com/depth-first-search/) is a way of traversing graphs closely related to the preorder traversal of a tree. Following is the recursive implementation of preorder traversal:

procedure preorder(treeNode v) { visit(v); for each child u of v preorder(u); }

To turn this into a graph traversal algorithm, replace “child” with “neighbor”. But to prevent infinite loops, keep track of the vertices that are already discovered and not revisit them.

procedure dfs(vertex v) { visit(v); for each neighbor u of v if u is undiscovered call dfs(u); }

The recursive algorithm can be implemented as follows in C++, Java, and Python:

```cpp
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

        // add edges to the undirected graph
        for (auto &edge: edges)
        {
            adjList[edge.src].push_back(edge.dest);
            adjList[edge.dest].push_back(edge.src);
        }
    }
};

// Function to perform DFS traversal on the graph on a graph
void DFS(Graph const &graph, int v, vector<bool> &discovered)
{
    // mark the current node as discovered
    discovered[v] = true;

    // print the current node
    cout << v << " ";

    // do for every edge (v, u)
    for (int u: graph.adjList[v])
    {
        // if `u` is not yet discovered
        if (!discovered[u]) {
            DFS(graph, u, discovered);
        }
    }
}

int main()
{
    // vector of graph edges as per the above diagram
    vector<Edge> edges = {
        // Notice that node 0 is unconnected
        {1, 2}, {1, 7}, {1, 8}, {2, 3}, {2, 6}, {3, 4},
        {3, 5}, {8, 9}, {8, 12}, {9, 10}, {9, 11}
    };

    // total number of nodes in the graph (labelled from 0 to 12)
    int n = 13;

    // build a graph from the given edges
    Graph graph(edges, n);

    // to keep track of whether a vertex is discovered or not
    vector<bool> discovered(n);

    // Perform DFS traversal from all undiscovered nodes to
    // cover all connected components of a graph
    for (int i = 0; i < n; i++)
    {
        if (discovered[i] == false) {
            DFS(graph, i, discovered);
        }
    }

    return 0;
}
```

**Output:** 0 1 2 3 4 5 6 7 8 9 10 11 12

##

```java
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

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
    // Function to perform DFS traversal on the graph on a graph
    public static void DFS(Graph graph, int v, boolean[] discovered)
    {
        // mark the current node as discovered
        discovered[v] = true;

        // print the current node
        System.out.print(v + " ");

        // do for every edge (v, u)
        for (int u: graph.adjList.get(v))
        {
            // if `u` is not yet discovered
            if (!discovered[u]) {
                DFS(graph, u, discovered);
            }
        }
    }

    public static void main(String[] args)
    {
        // List of graph edges as per the above diagram
        List<Edge> edges = Arrays.asList(
                // Notice that node 0 is unconnected
                new Edge(1, 2), new Edge(1, 7), new Edge(1, 8), new Edge(2, 3),
                new Edge(2, 6), new Edge(3, 4), new Edge(3, 5), new Edge(8, 9),
                new Edge(8, 12), new Edge(9, 10), new Edge(9, 11)
            );

        // total number of nodes in the graph (labelled from 0 to 12)
        int n = 13;

        // build a graph from the given edges
        Graph graph = new Graph(edges, n);

        // to keep track of whether a vertex is discovered or not
        boolean[] discovered = new boolean[n];

        // Perform DFS traversal from all undiscovered nodes to
        // cover all connected components of a graph
        for (int i = 0; i < n; i++)
        {
            if (!discovered[i]) {
                DFS(graph, i, discovered);
            }
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
def DFS(graph, v, discovered):

    discovered[v] = True            # mark the current node as discovered
    print(v, end=' ')               # print the current node

    # do for every edge (v, u)
    for u in graph.adjList[v]:
        if not discovered[u]:       # if `u` is not yet discovered
            DFS(graph, u, discovered)

if __name__ == '__main__':

    # List of graph edges as per the above diagram
    edges = [
        # Notice that node 0 is unconnected
        (1, 2), (1, 7), (1, 8), (2, 3), (2, 6), (3, 4),
        (3, 5), (8, 9), (8, 12), (9, 10), (9, 11)
    ]

    # total number of nodes in the graph (labelled from 0 to 12)
    n = 13

    # build a graph from the given edges
    graph = Graph(edges, n)

    # to keep track of whether a vertex is discovered or not
    discovered = [False] * n

    # Perform DFS traversal from all undiscovered nodes to
    # cover all connected components of a graph
    for i in range(n):
        if not discovered[i]:
            DFS(graph, i, discovered)
```

The time complexity of DFS traversal is O(V + E), where `V` and `E` are the total number of vertices and edges in the graph, respectively. Please note that O(E) may vary between O(1) and O(V2), depending on how dense the graph is.

## Iterative Implementation of DFS

The non-recursive implementation of DFS is similar to the [non-recursive implementation of BFS](https://techiedelight.com/breadth-first-search/#iterative) but differs from it in two ways:

  * It uses a [stack](https://techiedelight.com/stack-implementation/) instead of a [queue](https://techiedelight.com/circular-queue-implementation-c/).
  * The DFS should mark discovered only after popping the vertex, not before pushing it.
  * It uses a reverse iterator instead of an iterator to produce the same results as recursive DFS.

Following is the C++, Java, and Python program that demonstrates it:

```cpp
#include <iostream>
#include <stack>
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

// Perform iterative DFS on graph starting from vertex `v`
void iterativeDFS(Graph const &graph, int v, vector<bool> &discovered)
{
    // create a stack used to do iterative DFS
    stack<int> stack;

    // push the source node into the stack
    stack.push(v);

    // loop till stack is empty
    while (!stack.empty())
    {
        // Pop a vertex from the stack
        v = stack.top();
        stack.pop();

        // if the vertex is already discovered yet,
        // ignore it
        if (discovered[v]) {
            continue;
        }

        // we will reach here if the popped vertex `v` is not discovered yet;
        // print `v` and process its undiscovered adjacent nodes into the stack
        discovered[v] = true;
        cout << v << " ";

        // do for every edge (v, u)
        // we are using reverse iterator (Why?)
        for (auto it = graph.adjList[v].rbegin(); it != graph.adjList[v].rend(); it++)
        {
            int u = *it;
            if (!discovered[u]) {
                stack.push(u);
            }
        }
    }
}

int main()
{
    // vector of graph edges as per the above diagram
    vector<Edge> edges = {
        // Notice that node 0 is unconnected
        {1, 2}, {1, 7}, {1, 8}, {2, 3}, {2, 6}, {3, 4},
        {3, 5}, {8, 9}, {8, 12}, {9, 10}, {9, 11}
        // {6, 9} introduces a cycle
    };

    // total number of nodes in the graph (labelled from 0 to 12)
    int n = 13;

    // build a graph from the given edges
    Graph graph(edges, n);

    // to keep track of whether a vertex is discovered or not
    vector<bool> discovered(n);

    // Do iterative DFS traversal from all undiscovered nodes to
    // cover all connected components of a graph
    for (int i = 0; i < n; i++)
    {
        if (discovered[i] == false) {
            iterativeDFS(graph, i, discovered);
        }
    }

    return 0;
}
```

**Output:** 0 1 2 3 4 5 6 7 8 9 10 11 12

##

```java
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Stack;

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
    // Perform iterative DFS on graph starting from vertex `v`
    public static void iterativeDFS(Graph graph, int v, boolean[] discovered)
    {
        // create a stack used to do iterative DFS
        Stack<Integer> stack = new Stack<>();

        // push the source node into the stack
        stack.push(v);

        // loop till stack is empty
        while (!stack.empty())
        {
            // Pop a vertex from the stack
            v = stack.pop();

            // if the vertex is already discovered yet, ignore it
            if (discovered[v]) {
                continue;
            }

            // we will reach here if the popped vertex `v` is not discovered yet;
            // print `v` and process its undiscovered adjacent nodes into the stack
            discovered[v] = true;
            System.out.print(v + " ");

            // do for every edge (v, u)
            List<Integer> adjList = graph.adjList.get(v);
            for (int i = adjList.size() - 1; i >= 0; i--)
            {
                int u = adjList.get(i);
                if (!discovered[u]) {
                    stack.push(u);
                }
            }
        }
    }

    public static void main(String[] args)
    {
        // List of graph edges as per the above diagram
        List<Edge> edges = Arrays.asList(
                // Notice that node 0 is unconnected
                new Edge(1, 2), new Edge(1, 7), new Edge(1, 8), new Edge(2, 3),
                new Edge(2, 6), new Edge(3, 4), new Edge(3, 5), new Edge(8, 9),
                new Edge(8, 12), new Edge(9, 10), new Edge(9, 11)
                // (6, 9) introduces a cycle
        );

        // total number of nodes in the graph (labelled from 0 to 12)
        int n = 13;

        // build a graph from the given edges
        Graph graph = new Graph(edges, n);

        // to keep track of whether a vertex is discovered or not
        boolean[] discovered = new boolean[n];

        // Do iterative DFS traversal from all undiscovered nodes to
        // cover all connected components of a graph
        for (int i = 0; i < n; i++)
        {
            if (!discovered[i]) {
                iterativeDFS(graph, i, discovered);
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

# Perform iterative DFS on graph starting from vertex `v`
def iterativeDFS(graph, v, discovered):

    # create a stack used to do iterative DFS
    stack = deque()

    # push the source node into the stack
    stack.append(v)

    # loop till stack is empty
    while stack:

        # Pop a vertex from the stack
        v = stack.pop()

        # if the vertex is already discovered yet, ignore it
        if discovered[v]:
            continue

        # we will reach here if the popped vertex `v` is not discovered yet;
        # print `v` and process its undiscovered adjacent nodes into the stack
        discovered[v] = True
        print(v, end=' ')

        # do for every edge (v, u)
        adjList = graph.adjList[v]
        for i in reversed(range(len(adjList))):
            u = adjList[i]
            if not discovered[u]:
                stack.append(u)

if __name__ == '__main__':

    # List of graph edges as per the above diagram
    edges = [
        # Notice that node 0 is unconnected
        (1, 2), (1, 7), (1, 8), (2, 3), (2, 6), (3, 4),
        (3, 5), (8, 9), (8, 12), (9, 10), (9, 11)
        # (6, 9) introduces a cycle
    ]

    # total number of nodes in the graph (labelled from 0 to 12)
    n = 13

    # build a graph from the given edges
    graph = Graph(edges, n)

    # to keep track of whether a vertex is discovered or not
    discovered = [False] * n

    # Do iterative DFS traversal from all undiscovered nodes to
    # cover all connected components of a graph
    for i in range(n):
        if not discovered[i]:
            iterativeDFS(graph, i, discovered)
```

## Applications of DFS

  * [Finding connected components in a graph](https://techiedelight.com/check-given-graph-strongly-connected-not/).
  * [Topological sorting](https://techiedelight.com/topological-sorting-dag/) in a DAG(Directed Acyclic Graph).
  * Finding 2/3–(edge or vertex)–connected components.
  * Finding the [bridges of a graph](https://techiedelight.com/2-edge-connectivity-graph/).
  * Finding [strongly connected components](https://techiedelight.com/check-graph-strongly-connected-one-dfs-traversal/).
  * [Solving puzzles with only one solution](https://techiedelight.com/maze-problems-in-data-structures/), such as mazes.
  * Finding biconnectivity in graphs and many more…

**Also See:**

> [Depth First Search (DFS) – Interview Questions & Practice Problems](https://techiedelight.com/dfs-interview-questions/)

**References:** <https://www.ics.uci.edu/~eppstein/161/960215.html>
