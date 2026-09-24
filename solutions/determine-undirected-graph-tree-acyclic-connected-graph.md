# Determine whether an undirected graph is a tree (Acyclic Connected Graph)

> Source: https://www.techiedelight.com/determine-undirected-graph-tree-acyclic-connected-graph/

[Graph](https://www.techiedelight.com/Category/Graphs/)

Given an undirected graph, check if it is a tree or not. In other words, check if a given undirected graph is an Acyclic Connected Graph or not.

For example, the graph shown on the right is a tree, and the graph on the left is not a tree as it contains a [cycle](https://techiedelight.com/check-undirected-graph-contains-cycle-not/) `0—1—2—3—4—5—0`.

> 

**Recommended Read:**

> [Types of edges involved in DFS and relation between them](https://techiedelight.com/types-edges-involved-dfs-relation/)

> [Check if an undirected graph contains a cycle or not](https://techiedelight.com/check-undirected-graph-contains-cycle-not/)

A tree is an undirected graph in which any two vertices are connected by exactly one path. In other words, any acyclic connected graph is a tree. We can easily determine the acyclic connected graph by doing a [DFS traversal](https://techiedelight.com/depth-first-search/) on the graph. When we do a DFS from any vertex `v` in an undirected graph, we may encounter a back-edge that points to one of the ancestors of the current vertex `v` in the DFS tree. Each “back edge” defines a cycle in an undirected graph. If the back edge is `x —> y`, then since `y` is the ancestor of node `x`, we have a path from `y` to `x`. So, we can say that the path `y ~~ x ~ y` forms a cycle. (Here, `~~` represents one more edge in the path, and `~` represents a direct edge) and is not a tree.

The algorithm can be implemented as follows in C++, Java, and Python:

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

// Perform DFS on the graph and returns true if any back-edge
// is found in the graph
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
            if (!DFS(graph, w, discovered, v)) {
                return false;
            }
        }

        // if `w` is discovered, and `w` is not a parent
        else if (w != parent)
        {
            // we found a back-edge (cycle)
            return false;
        }
    }

    // no back-edges were found in the graph
    return true;
}

// Check if the given undirected graph is a tree
bool isTree(Graph const &graph, int n)
{
    // to keep track of whether a vertex is discovered or not
    vector<bool> discovered(n);

    // boolean flag to store if the graph is tree or not
    bool isTree = true;

    // Perform DFS traversal from the first vertex
    isTree = DFS(graph, 0, discovered, -1);

    for (int i = 0; isTree && i < n; i++)
    {
        // any undiscovered vertex means the graph is disconnected
        if (!discovered[i]) {
            isTree = false;
        }
    }

    return isTree;
}

int main()
{
    // initialize edges as per the above diagram
    vector<Edge> edges =
    {
        {0, 1}, {1, 2}, {2, 3}, {3, 4}, {4, 5}, {5, 0}
        // edge (5, 0) introduces a cycle in the graph
    };

    // total number of nodes in the graph (0 to 5)
    int n = 6;

    // build a graph from the given edges
    Graph graph(edges, n);

    if (isTree(graph, n)) {
        cout << "The graph is a tree";
    }
    else {
        cout << "The graph is not a tree";
    }

    return 0;
}
```

**Output:** The graph is not a tree

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
    // Perform DFS on the graph and returns true if any back-edge
    // is found in the graph
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
                if (!DFS(graph, w, discovered, v)) {
                    return false;
                }
            }

            // if `w` is discovered, and `w` is not a parent
            else if (w != parent)
            {
                // we found a back-edge (cycle)
                return false;
            }
        }

        // no back-edges were found in the graph
        return true;
    }

    // Check if the given undirected graph is a tree
    public static boolean isTree(Graph graph, int n)
    {
        // to keep track of whether a vertex is discovered or not
        boolean[] discovered = new boolean[n];

        // Perform DFS traversal from the first vertex
        boolean isTree = DFS(graph, 0, discovered, -1);

        for (int i = 0; isTree && i < n; i++)
        {
            // any undiscovered vertex means the graph is disconnected
            if (!discovered[i]) {
                isTree = false;
            }
        }

        return isTree;
    }

    public static void main(String[] args)
    {
        // List of graph edges as per the above diagram
        List<Edge> edges = Arrays.asList(
                new Edge(0, 1), new Edge(1, 2), new Edge(2, 3),
                new Edge(3, 4), new Edge(4, 5), new Edge(5, 0)
                // edge (5, 0) introduces a cycle in the graph
        );

        // total number of nodes in the graph (0 to 5)
        int n = 6;

        // construct graph
        Graph graph = new Graph(edges, n);

        if (isTree(graph, n)) {
            System.out.println("The graph is a tree");
        }
        else {
            System.out.println("The graph is not a tree");
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

# Perform DFS on the graph and returns true if any back-edge
# is found in the graph
def DFS(graph, v, discovered, parent):

    # mark the current node as discovered
    discovered[v] = True

    # do for every edge (v, w)
    for w in graph.adjList[v]:

        # if `w` is not discovered
        if not discovered[w]:
            if not DFS(graph, w, discovered, v):
                return False

        # if `w` is discovered, and `w` is not a parent
        elif w != parent:
            # we found a back-edge (cycle)
            return False

    # no back-edges were found in the graph
    return True

# Check if the given undirected graph is a tree
def isTree(graph, n):

    # to keep track of whether a vertex is discovered or not
    discovered = [False] * n

    # flag to store if the graph is tree or not
    isTree = True

    # Perform DFS traversal from the first vertex
    isTree = DFS(graph, 0, discovered, -1)

    for i in range(n):
        # any undiscovered vertex means the graph is disconnected
        if not discovered[i]:
            return False

    return isTree

if __name__ == '__main__':

    # List of graph edges as per the above diagram.
    # Note edge (5, 0) introduces a cycle in the graph
    edges = [(0, 1), (1, 2), (2, 3), (3, 4), (4, 5), (5, 0)]

    # total number of nodes in the graph (0 to 5)
    n = 6

    # construct graph
    graph = Graph(edges, n)

    if isTree(graph, n):
        print('The graph is a tree')
    else:
        print('The graph is not a tree')
```

The time complexity of the above solution is O(V + E), where `V` and `E` are the total number of vertices and edges in the graph, respectively.

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.78/5. Vote count: 194

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Depth-first search](https://www.techiedelight.com/Tags/DFS/), [Medium](https://www.techiedelight.com/Tags/medium/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
