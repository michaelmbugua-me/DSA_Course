# Transitive closure of a graph

> Source: https://www.techiedelight.com/transitive-closure-graph/

The transitive closure for a digraph `G` is a digraph `G’` with an edge `(i, j)` corresponding to each directed path from `i` to `j` in `G`. The resultant digraph `G’` representation in the form of the adjacency matrix is called the connectivity matrix.

For example, consider the following directed graph:

**Its connectivity matrix C is** 1 0 1 0 1 1 1 0 0 0 1 0 1 1 1 1

The value of `C[i][j]` is `1` only if a directed path exists from vertex `i` to vertex `j`. Note that all diagonal elements in the connectivity matrix are `1` since a path exists from every vertex to itself.

> 

## Method 1

As discussed in the previous post, we can use the [Floyd–Warshall algorithm](https://techiedelight.com/pairs-shortest-paths-floyd-warshall-algorithm/) to find the **transitive closure** of a graph with `V` vertices in O(V3) time. The algorithm returns the shortest paths between each of the vertices in the graph. We can easily modify the algorithm to return 1/0 depending upon path exists between a pair of vertices or not. The implementation can be seen [here](https://techiedelight.com/compiler/?run=IvbJo6).

## Method 2: (Commonly used)

**Warshall’s algorithm** is commonly used to construct transitive closures. It is very identical to [Floyd’s all-pairs shortest path algorithm](https://techiedelight.com/pairs-shortest-paths-floyd-warshall-algorithm/). The core idea behind Warshall’s algorithm is that a path exists between two pairs of vertices `i`, `j` if and only if there is an edge from `i` to `j`, or any of the following conditions is true:

  * There is a path from `i` to `j` going through vertex `1`.
  * There is a path from `i` to `j` going through vertex `1` and/or `2`.
  * There is a path from `i` to `j` going through vertex `1`, `2`, and/or `3`.
  * There is a path from `i` to `j` going through any other vertices.

The time complexity of this algorithm is the same as that of Floyd–Warshall algorithm, i.e., O(V3), but it reduces storage by retaining only one bit for each matrix element (e.g., we can use bool data type instead of int). The implementation can be seen [here](https://techiedelight.com/compiler/?run=2amhxU).

## Method 3: (For dense graphs)

We know that all pairs of vertices are reachable from each other in each [strongly connected component](https://techiedelight.com/check-given-graph-strongly-connected-not/) of a graph. We also know that the strongly connected components of the graph can be computed in linear time. The idea is to exploit this fact to compute the transitive closure of the graph. Further, if `(x, y)` is an edge between two vertices in different strongly connected components, every vertex in `y's` component is reachable from each vertex in `x's` component. Thus, the problem reduces finding the transitive closure on a graph of strongly connected components, which should have considerably fewer edges and vertices than the given graph.

## Method 4: (For sparse graphs)

We know that we can find all vertices reachable from a vertex `v` by calling [Depth–first search (DFS)](https://techiedelight.com/depth-first-search/) on the vertex `v`. If we do the same for all vertices present in the graph and store the path information in a matrix, we will get transitive closure of the graph. The total time complexity will also reduce to O(V × (V + E)), where `V` and `E` are the total number of vertices and edges in the graph, respectively. This is equal to O(V3) only if the graph is dense (remember `E = V2` for a dense graph). We can also use [BFS](https://techiedelight.com/breadth-first-search/) instead of DFS.

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
#include <cstring>
#include <iomanip>
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

    // Constructor
    Graph(vector<Edge> const &edges, int n)
    {
        adjList.resize(n);

        // add edges to the directed graph
        for (Edge edge: edges)
        {
            int src = edge.src;
            int dest = edge.dest;

            adjList[src].push_back(dest);
        }
    }
};

// `C` is a connectivity matrix and stores transitive closure of a graph
// `root` is the topmost node in DFS tree (it is the starting vertex of DFS)
// `descendant` is current vertex to be explored in DFS.
// Invariant: A path already exists in the graph from `root` to `descendant`
void DFS(Graph const &graph, vector<vector<bool>> &C, int root, int descendant)
{
    for (int child: graph.adjList[descendant])
    {
        // if `child` is an adjacent vertex of descendant, we have
        // found a path from root->child
        if (!C[root][child])
        {
            C[root][child] = true;
            DFS(graph, C, root, child);
        }
    }
}

int main()
{
    // an array of graph edges as per the above diagram
    vector<Edge> edges = {
        {0, 2}, {1, 0}, {3, 1}
    };

    // total number of nodes in the graph (labelled from 0 to 3)
    int n = 4;

    // build a graph from the given edges
    Graph graph(edges, n);

    // `C` is a connectivity matrix and stores the transitive closure
    // of the graph. The value of `C[i][j]` is 1 only if a directed
    // path exists from vertex `i` to vertex `j`.
    vector<vector<bool>> C(n, vector<bool>(n, false));

    // consider each vertex and start DFS from it
    for (int v = 0; v < n; v++)
    {
        C[v][v] = true;
        DFS(graph, C, v, v);

        // print path info for vertex `v`
        for (int u = 0; u < n; u++) {
            cout << left << setw(4) << C[v][u];
        }
        cout << endl;
    }

    return 0;
}
```

**Output:** 1 0 1 0 1 1 1 0 0 0 1 0 1 1 1 1

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

        // add edges to the directed graph
        for (Edge edge: edges)
        {
            int src = edge.source;
            int dest = edge.dest;

            adjList.get(src).add(dest);
        }
    }
}

class Main
{
    // `C` is a connectivity matrix and stores transitive closure of a graph
    // `root` is the topmost node in DFS tree (it is the starting vertex of DFS)
    // `descendant` is current vertex to be explored in DFS.
    // Invariant: A path already exists in the graph from `root` to `descendant`
    public static void DFS(Graph graph, byte[][] C, int root, int descendant)
    {
        for (int child: graph.adjList.get(descendant))
        {
            // if `child` is an adjacent vertex of descendant, we have
            // found a path from root->child
            if (C[root][child] == 0)
            {
                C[root][child] = 1;
                DFS(graph, C, root, child);
            }
        }
    }

    public static void main(String[] args)
    {
        // List of graph edges as per the above diagram
        List<Edge> edges = Arrays.asList(
                new Edge(0, 2), new Edge(1, 0), new Edge(3, 1)
        );

        // total number of nodes in the graph (labelled from 0 to 3)
        int n = 4;

        // build a graph from the given edges
        Graph graph = new Graph(edges, n);

        // `C` is a connectivity matrix and stores the transitive closure
        // of the graph. The value of `C[i][j]` is 1 only if a directed
        // path exists from vertex `i` to vertex `j`.
        byte C[][] = new byte[n][n];

        // consider each vertex and start DFS from it
        for (int v = 0; v < n; v++)
        {
            C[v][v] = 1;
            DFS(graph, C, v, v);

            // print path info for vertex `v`
            System.out.println(Arrays.toString(C[v]));
        }
    }
}
```

##

```python3
# A class to represent a graph object
class Graph:
    def __init__(self, edges, n):

        # A list of lists to represent an adjacency list
        self.adjList = [[] for _ in range(n)]

        # add edges to the directed graph
        for (src, dest) in edges:
            self.adjList[src].append(dest)

# `C` is a connectivity matrix and stores transitive closure of a graph
# `root` is the topmost node in DFS tree (it is the starting vertex of DFS)
# `descendant` is current vertex to be explored in DFS.
# Invariant: A path already exists in the graph from `root` to `descendant`
def DFS(graph, C, root, descendant):

    for child in graph.adjList[descendant]:
        # if `child` is an adjacent vertex of descendant, we have
        # found a path from root->child
        if C[root][child] == 0:
            C[root][child] = 1
            DFS(graph, C, root, child)

if __name__ == '__main__':

    # List of graph edges as per the above diagram
    edges = [(0, 2), (1, 0), (3, 1)]

    # total number of nodes in the graph (labelled from 0 to 3)
    n = 4

    # build a graph from the given edges
    graph = Graph(edges, n)

    # `C` is a connectivity matrix and stores the transitive closure
    # of the graph. The value of `C[i][j]` is 1 only if a directed
    # path exists from vertex `i` to vertex `j`.
    C = [[0 for x in range(n)] for y in range(n)]

    # consider each vertex and start DFS from it
    for v in range(n):
        C[v][v] = 1
        DFS(graph, C, v, v)

        # print path info for vertex `v`
        print(C[v])
```

Transitive closure is used to answer reachability queries (can we get to `x` from `y`?) efficiently in constant time after preprocessing of constructing the transitive closure.

## Transitive Reduction

Transitive reduction (also known as minimum equivalent digraph) reduces the total number of edges while maintaining identical reachability properties, i.e., the transitive closure of `G` is similar to the transitive closure of the transitive reduction of `G`. The primary application of transitive reduction is space minimization by eliminating redundant edges from `G` that do not affect reachability.

**References:**

1\. [Transitive Closure and Reduction](https://www8.cs.umu.se/kurser/TDBA77/VT06/algorithms/BOOK/BOOK4/NODE163.HTM) 2\. [CS 440 Theory of Algorithms – Dynamic Programming Part II](https://cs.winona.edu/lin/cs440/ch08-2.pdf)

Also See:

> [2–Vertex Connectivity in a graph](https://www.techiedelight.com/2-vertex-connectivity-graph/ "2–Vertex Connectivity in a graph")

> [Find root vertex of a graph](https://www.techiedelight.com/root-vertex-graph/ "Find root vertex of a graph")

> [Find the path between given vertices in a directed graph](https://www.techiedelight.com/find-path-between-vertices-directed-graph/ "Find the path between given vertices in a directed graph")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.82/5. Vote count: 166

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Algorithm](https://www.techiedelight.com/Tags/Algorithm/), [Breadth-first search](https://www.techiedelight.com/Tags/BFS/), [Depth-first search](https://www.techiedelight.com/Tags/DFS/), [Easy](https://www.techiedelight.com/Tags/easy/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
