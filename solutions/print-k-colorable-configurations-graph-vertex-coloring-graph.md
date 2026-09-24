# Print all k–colorable configurations of a graph (Vertex coloring of a graph)

> Source: https://www.techiedelight.com/print-k-colorable-configurations-graph-vertex-coloring-graph/

Given an undirected graph, check if it is k–colorable or not and print all possible configurations of assignment of colors to its vertices.

The vertex coloring is a way of coloring the vertices of a graph such that no two adjacent vertices share the same color. A coloring using at most `k` colors is called a (proper) k–coloring, and a graph that can be assigned a (proper) k–coloring is k–colorable.

For example, consider the following graph,

It can be 3–colored in several ways:

Please note that we can’t color the above graph using two colors, i.e., it’s not 2–colorable.

> 

We can use [backtracking](https://techiedelight.com/backtracking-interview-questions/) to solve this problem. The idea is to try all possible combinations of colors for the first vertex in the graph and recursively explore the remaining vertices to check if they will lead to the solution or not. If the current configuration doesn’t result in a solution, backtrack. Note that we assign any color to a vertex only if its adjacent vertices share the different colors.

The implementation can be seen below in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
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
    vector<vector<int>> adj;

    // Constructor
    Graph(vector<Edge> const &edges, int n)
    {
        // resize the vector to hold `n` elements of type `vector<int>`
        adj.resize(n);

        // add edges to the undirected graph
        for (Edge edge: edges)
        {
            int src = edge.src;
            int dest = edge.dest;

            adj[src].push_back(dest);
            adj[dest].push_back(src);
        }
    }
};

// A string array to store colors (can handle 10–colorable graph)
string COLORS[] = {"", "BLUE", "GREEN", "RED", "YELLOW", "ORANGE",
                "PINK", "BLACK", "BROWN", "WHITE", "PURPLE"};

// Function to check if it is safe to assign color `c` to vertex `v`
bool isSafe(Graph const &graph, vector<int> color, int v, int c)
{
    // check the color of every adjacent vertex of `v`
    for (int u: graph.adj[v])
    {
        if (color[u] == c) {
            return false;
        }
    }

    return true;
}

void kColorable(Graph const &graph, vector<int> &color, int k, int v, int n)
{
    // if all colors are assigned, print the solution
    if (v == n)
    {
        for (int v = 0; v < n; v++) {
            cout << setw(8) << left << COLORS[color[v]];
        }
        cout << endl;

        return;
    }

    // try all possible combinations of available colors
    for (int c = 1; c <= k; c++)
    {
        // if it is safe to assign color `c` to vertex `v`
        if (isSafe(graph, color, v, c))
        {
            // assign color `c` to vertex `v`
            color[v] = c;

            // recur for the next vertex
            kColorable(graph, color, k, v + 1, n);

            // backtrack
            color[v] = 0;
        }
    }
}

int main()
{
    // vector of graph edges as per the above diagram
    vector<Edge> edges = {
        {0, 1}, {0, 4}, {0, 5}, {4, 5}, {1, 4}, {1, 3}, {2, 3}, {2, 4}
    };

    // total number of nodes in the graph
    int n = 6;

    // build a graph from the given edges
    Graph g(edges, n);

    int k = 3;

    vector<int> color(n, 0);

    // print all k–colorable configurations of the graph
    kColorable(g, color, k, 0, n);

    return 0;
}
```

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
    // A string array to store colors (can handle 10–colorable graph)
    private static String COLORS[] = {"", "BLUE", "GREEN", "RED", "YELLOW",
            "ORANGE", "PINK", "BLACK", "BROWN", "WHITE", "PURPLE"};

    // Function to check if it is safe to assign color `c` to vertex `v`
    private static boolean isSafe(Graph graph, int[] color, int v, int c)
    {
        // check the color of every adjacent vertex of `v`
        for (int u: graph.adjList.get(v)) {
            if (color[u] == c) {
                return false;
            }
        }
        return true;
    }

    public static void kColorable(Graph g, int[] color, int k, int v, int n)
    {
        // if all colors are assigned, print the solution
        if (v == n)
        {
            for (v = 0; v < n; v++) {
                System.out.printf("%-8s" , COLORS[color[v]]);
            }

            System.out.println();

            return;
        }

        // try all possible combinations of available colors
        for (int c = 1; c <= k; c++)
        {
            // if it is safe to assign color `c` to vertex `v`
            if (isSafe(g, color, v, c))
            {
                // assign color `c` to vertex `v`
                color[v] = c;

                // recur for the next vertex
                kColorable(g, color, k, v + 1, n);

                // backtrack
                color[v] = 0;
            }
        }
    }

    public static void main(String[] args)
    {
        // List of graph edges as per the above diagram
        List<Edge> edges = Arrays.asList(
                new Edge(0, 1), new Edge(0, 4), new Edge(0, 5), new Edge(4, 5),
                new Edge(1, 4), new Edge(1, 3), new Edge(2, 3), new Edge(2, 4)
        );

        // Set number of vertices in the graph
        int n = 6;

        // build a graph from the given edges
        Graph g = new Graph(edges, n);

        int k = 3;

        int[] color = new int[n];

        // print all k–colorable configurations of the graph
        kColorable(g, color, k, 0, n);
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

# Function to check if it is safe to assign color `c` to vertex `v`
def isSafe(graph, color, v, c):
    # check the color of every adjacent vertex of `v`
    for u in graph.adjList[v]:
        if color[u] == c:
            return False
    return True

def kColorable(g, color, k, v, n):

    # if all colors are assigned, print the solution
    if v == n:
        print([COLORS[color[v]] for v in range(n)])
        return

    # try all possible combinations of available colors
    for c in range(1, k + 1):
        # if it is safe to assign color `c` to vertex `v`
        if isSafe(g, color, v, c):
            # assign color `c` to vertex `v`
            color[v] = c

            # recur for the next vertex
            kColorable(g, color, k, v + 1, n)

            # backtrack
            color[v] = 0

if __name__ == '__main__':

    # List of graph edges as per the above diagram
    edges = [(0, 1), (0, 4), (0, 5), (4, 5), (1, 4), (1, 3), (2, 3), (2, 4)]

    # A list to store colors (can handle 10–colorable graph)
    COLORS = ['', 'BLUE', 'GREEN', 'RED', 'YELLOW', 'ORANGE', 'PINK',
            'BLACK', 'BROWN', 'WHITE', 'PURPLE']

    # Set number of vertices in the graph
    n = 6

    # build a graph from the given edges
    g = Graph(edges, n)

    k = 3

    color = [None] * n

    # print all k–colorable configurations of the graph
    kColorable(g, color, k, 0, n)
```

**Output:** BLUE GREEN BLUE RED RED GREEN BLUE GREEN GREEN BLUE RED GREEN BLUE GREEN GREEN RED RED GREEN BLUE RED BLUE GREEN GREEN RED BLUE RED RED BLUE GREEN RED BLUE RED RED GREEN GREEN RED GREEN BLUE BLUE GREEN RED BLUE GREEN BLUE BLUE RED RED BLUE GREEN BLUE GREEN RED RED BLUE GREEN RED GREEN BLUE BLUE RED GREEN RED RED BLUE BLUE RED GREEN RED RED GREEN BLUE RED RED BLUE BLUE GREEN GREEN BLUE RED BLUE BLUE RED GREEN BLUE RED BLUE RED GREEN GREEN BLUE RED GREEN GREEN BLUE BLUE GREEN RED GREEN GREEN RED BLUE GREEN RED GREEN RED BLUE BLUE GREEN

The time complexity of the above solution is exponential and requires additional space for the recursion (call stack).

Also See:

> [Graph Coloring Problem](https://www.techiedelight.com/greedy-coloring-graph/ "Graph Coloring Problem")

> [Find root vertex of a graph](https://www.techiedelight.com/root-vertex-graph/ "Find root vertex of a graph")

> [Determine whether a graph is Bipartite using DFS](https://www.techiedelight.com/determine-given-graph-bipartite-graph-using-dfs/ "Determine whether a graph is Bipartite using DFS")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.47/5. Vote count: 173

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Algorithm](https://www.techiedelight.com/Tags/Algorithm/), [Medium](https://www.techiedelight.com/Tags/medium/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
