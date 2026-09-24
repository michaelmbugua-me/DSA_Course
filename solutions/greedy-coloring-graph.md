# Graph Coloring Problem

> Source: https://www.techiedelight.com/greedy-coloring-graph/

[Graph](https://www.techiedelight.com/Category/Graphs/)

Graph coloring (also called vertex coloring) is a way of coloring a graph’s vertices such that no two adjacent vertices share the same color. This post will discuss a greedy algorithm for graph coloring and minimize the total number of colors used.

For example, consider the following graph:

We can color it in many ways by using the minimum of 3 colors.

Please note that we can’t color the above graph using two colors.

Before discussing the [greedy algorithm](https://techiedelight.com/greedy-algorithm-problems/) to color graphs, let’s talk about basic graph coloring terminology.

K–colorable graph:

A coloring using at most `k` colors is called a (proper) _k_ –coloring, and a graph that can be assigned a (proper) _k_ –coloring is _k_ –colorable.

K–chromatic graph:

The smallest number of colors needed to color a graph `G` is called its chromatic number, and a graph that is _k_ –chromatic if its chromatic number is exactly `k`.

Brooks’ theorem:

[Brooks’ theorem](https://en.wikipedia.org/wiki/Brooks%27_theorem) states that a connected graph can be colored with only `x` colors, where `x` is the maximum degree of any vertex in the graph except for complete graphs and graphs containing an odd length cycle, which requires `x+1` colors.

Greedy coloring _considers the vertices of the graph in sequence and assigns each vertex its first available color_ , i.e., vertices are considered in a specific order `v1`, `v2`, … `vn`, and `vi` and assigned the smallest available color which is not used by any of `vi`’s neighbors.

**Greedy coloring doesn’t always use the minimum number of colors possible to color a graph.** For a graph of maximum degree `x`, greedy coloring will use at most `x+1` color. Greedy coloring can be arbitrarily bad; for example, the following crown graph (a complete bipartite graph), having `n` vertices, can be 2–colored (refer left image), but greedy coloring resulted in `n/2` colors (refer right image).

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
#include <unordered_map>
#include <set>
using namespace std;

// Data structure to store a graph edge
struct Edge {
    int src, dest;
};

class Graph
{
public:
    // a vector of vectors to represent an adjacency list
    vector<vector<int>> adjList;

    // Constructor
    Graph(vector<Edge> const &edges, int n)
    {
        // resize the vector to hold `n` elements of type `vector<int>`
        adjList.resize(n);

        // add edges to the undirected graph
        for (Edge edge: edges)
        {
            int src = edge.src;
            int dest = edge.dest;

            adjList[src].push_back(dest);
            adjList[dest].push_back(src);
        }
    }
};

// Add more colors for graphs with many more vertices
string color[] =
{
    "", "BLUE", "GREEN", "RED", "YELLOW", "ORANGE", "PINK",
    "BLACK", "BROWN", "WHITE", "PURPLE", "VOILET"
};

// Function to assign colors to vertices of a graph
void colorGraph(Graph const &graph, int n)
{
    // keep track of the color assigned to each vertex
    unordered_map<int, int> result;

    // assign a color to vertex one by one
    for (int u = 0; u < n; u++)
    {
        // set to store the color of adjacent vertices of `u`
        set<int> assigned;

        // check colors of adjacent vertices of `u` and store them in a set
        for (int i: graph.adjList[u])
        {
            if (result[i]) {
                assigned.insert(result[i]);
            }
        }

        // check for the first free color
        int color = 1;
        for (auto &c: assigned )
        {
            if (color != c) {
                break;
            }
            color++;
        }

        // assign vertex `u` the first available color
        result[u] = color;
    }

    for (int v = 0; v < n; v++)
    {
        cout << "The color assigned to vertex " << v << " is "
             << color[result[v]] << endl;
    }
}

// Greedy coloring of a graph
int main()
{
    // vector of graph edges as per the above diagram
    vector<Edge> edges = {
        {0, 1}, {0, 4}, {0, 5}, {4, 5}, {1, 4}, {1, 3}, {2, 3}, {2, 4}
    };

    // total number of nodes in the graph (labelled from 0 to 5)
    int n = 6;

    // build a graph from the given edges
    Graph graph(edges, n);

    // color graph using the greedy algorithm
    colorGraph(graph, n);

    return 0;
}
```

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
    // Add more colors for graphs with many more vertices
    private static String[] color = {
            "", "BLUE", "GREEN", "RED", "YELLOW", "ORANGE", "PINK",
            "BLACK", "BROWN", "WHITE", "PURPLE", "VOILET"
    };

    // Function to assign colors to vertices of a graph
    public static void colorGraph(Graph graph, int n)
    {
        // keep track of the color assigned to each vertex
        Map<Integer, Integer> result = new HashMap<>();

        // assign a color to vertex one by one
        for (int u = 0; u < n; u++)
        {
            // set to store the color of adjacent vertices of `u`
            Set<Integer> assigned = new TreeSet<>();

            // check colors of adjacent vertices of `u` and store them in a set
            for (int i: graph.adjList.get(u))
            {
                if (result.containsKey(i)) {
                    assigned.add(result.get(i));
                }
            }

            // check for the first free color
            int color = 1;
            for (Integer c: assigned)
            {
                if (color != c) {
                    break;
                }
                color++;
            }

            // assign vertex `u` the first available color
            result.put(u, color);
        }

        for (int v = 0; v < n; v++)
        {
            System.out.println("The color assigned to vertex " + v + " is "
                    + color[result.get(v)]);
        }
    }

    // Greedy coloring of a graph
    public static void main(String[] args)
    {
        // List of graph edges as per the above diagram
        List<Edge> edges = Arrays.asList(
                new Edge(0, 1), new Edge(0, 4), new Edge(0, 5), new Edge(4, 5),
                new Edge(1, 4), new Edge(1, 3), new Edge(2, 3), new Edge(2, 4)
        );

        // total number of nodes in the graph (labelled from 0 to 5)
        int n = 6;

        // build a graph from the given edges
        Graph graph = new Graph(edges, n);

        // color graph using the greedy algorithm
        colorGraph(graph, n);
    }
}
```

##

```python3
# A class to represent a graph object
class Graph:
    def __init__(self, edges, n):
        self.adjList = [[] for _ in range(n)]

        # add edges to the undirected graph
        for (src, dest) in edges:
            self.adjList[src].append(dest)
            self.adjList[dest].append(src)

# Function to assign colors to vertices of a graph
def colorGraph(graph, n):

    # keep track of the color assigned to each vertex
    result = {}

    # assign a color to vertex one by one
    for u in range(n):

        # check colors of adjacent vertices of `u` and store them in a set
        assigned = set([result.get(i) for i in graph.adjList[u] if i in result])

        # check for the first free color
        color = 1
        for c in assigned:
            if color != c:
                break
            color = color + 1

        # assign vertex `u` the first available color
        result[u] = color

    for v in range(n):
        print(f'Color assigned to vertex {v} is {colors[result[v]]}')

# Greedy coloring of a graph
if __name__ == '__main__':

    # Add more colors for graphs with many more vertices
    colors = ['', 'BLUE', 'GREEN', 'RED', 'YELLOW', 'ORANGE', 'PINK',
            'BLACK', 'BROWN', 'WHITE', 'PURPLE', 'VOILET']

    # List of graph edges as per the above diagram
    edges = [(0, 1), (0, 4), (0, 5), (4, 5), (1, 4), (1, 3), (2, 3), (2, 4)]

    # total number of nodes in the graph (labelled from 0 to 5)
    n = 6

    # build a graph from the given edges
    graph = Graph(edges, n)

    # color graph using the greedy algorithm
    colorGraph(graph, n)
```

**Output:** The color assigned to vertex 0 is BLUE The color assigned to vertex 1 is GREEN The color assigned to vertex 2 is BLUE The color assigned to vertex 3 is RED The color assigned to vertex 4 is RED The color assigned to vertex 5 is GREEN

The time complexity of the above solution is O(V × E), where `V` and `E` are the total number of vertices and edges in the graph, respectively.

Applications of graph coloring:

The problem of coloring a graph arises in many practical areas such as pattern matching, designing seating plans, scheduling exam timetable, solving Sudoku puzzles, etc.

**References:**

1\. <https://en.wikipedia.org/wiki/Greedy_coloring>

2\. <https://en.wikipedia.org/wiki/Graph_coloring>

Also See:

> [Print all k–colorable configurations of a graph (Vertex coloring of a graph)](https://www.techiedelight.com/print-k-colorable-configurations-graph-vertex-coloring-graph/ "Print all k–colorable configurations of a graph \(Vertex coloring of a graph\)")

> [Determine whether a graph is Bipartite using DFS](https://www.techiedelight.com/determine-given-graph-bipartite-graph-using-dfs/ "Determine whether a graph is Bipartite using DFS")

> [Graph Implementation in C++ using STL](https://www.techiedelight.com/graph-implementation-using-stl/ "Graph Implementation in C++ using STL")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.84/5. Vote count: 177

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Algorithm](https://www.techiedelight.com/Tags/Algorithm/), [Greedy](https://www.techiedelight.com/Tags/Greedy/), [Hashing](https://www.techiedelight.com/Tags/Hashing/), [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
