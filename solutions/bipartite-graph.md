# Bipartite Graph

> Source: https://www.techiedelight.com/bipartite-graph/

Given an undirected graph, check if it is bipartite or not. A bipartite graph (or bigraph) is a graph whose vertices can be divided into two disjoint sets `U` and `V` such that every edge connects a vertex in `U` to one in `V`.

The following graph is bipartite as we can divide it into two sets, `U` and `V`, with every edge having one endpoint in set `U` and the other in set `V`:

> 

It is possible to test whether a graph is bipartite or not using a [Breadth–first search (BFS)](https://techiedelight.com/breadth-first-search/) algorithm. There are two ways to check for a bipartite graph:

1\. A graph is a bipartite graph if and only if it is 2–colorable.

While doing BFS traversal, each node in the BFS tree is given its parent’s opposite color. If there exists an edge connecting the current vertex to a previously colored vertex with the same color, then we can safely conclude that the graph is not bipartite.

2\. A graph is a bipartite graph if and only if it does not contain an odd cycle.

If a graph contains an odd [cycle](https://techiedelight.com/check-undirected-graph-contains-cycle-not/), we cannot divide the graph such that every adjacent vertex has a different color. To check if a given graph contains an odd-cycle or not, do a breadth–first search starting from an arbitrary vertex `v`. If in the BFS, we find an edge, both of whose endpoints are at the same level, then the graph is not Bipartite, and an odd-cycle is found. Here, the vertex level is its minimum distance from the starting vertex `v`. So, the odd-level vertices will form one set, and the even-level vertices will form another.

Please note that if the graph has many connected components and each component is bipartite, then the graph is bipartite. The following code assumes that the given graph is connected and checks if the graph contains an odd cycle or not:

The algorithm can be implemented as follows in C++, Java, and Python:

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
    // A vector of vectors to represent an adjacency list
    vector<vector<int>> adjList;

    // Total number of nodes in the graph
    int n;

    // Graph Constructor
    Graph(vector<Edge> const &edges, int n)
    {
        // resize the vector to hold `n` elements of type `vector<int>`
        this->n = n;
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
bool isBipartite(Graph const &graph)
{
    // get total number of nodes in the graph
    int n = graph.n;

    // start from any node as the graph is connected and undirected
    int v = 0;

    // to keep track of whether a vertex is discovered or not
    vector<bool> discovered(n);

    // stores the level of each vertex in BFS
    vector<int> level(n);

    // mark the source vertex as discovered and set its level to 0
    discovered[v] = true, level[v] = 0;

    // create a queue to do BFS and enqueue source vertex in it
    queue<int> q;
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
            // if vertex `u` is explored for the first time
            if (!discovered[u])
            {
                // mark it as discovered
                discovered[u] = true;

                // set level one more than the level of the parent node
                level[u] = level[v] + 1;

                // enqueue vertex
                q.push(u);
            }
            // if the vertex has already been discovered and the
            // level of vertex `u` and `v` are the same, then the
            // graph contains an odd-cycle and is not bipartite
            else if (level[v] == level[u]) {
                return false;
            }
        }
    }

    return true;
}

int main()
{
    // vector of graph edges
    vector<Edge> edges = {
        {0, 1}, {1, 2}, {1, 7}, {2, 3}, {3, 5}, {4, 6}, {4, 8}, {7, 8}
        // if we add edge (1, 3), the graph becomes non-bipartite
    };

    // total number of nodes in the graph (0 to 8)
    int n = 9;

    // build a graph from the given edges
    Graph graph(edges, n);

    if (isBipartite(graph)) {
        cout << "Graph is bipartite";
    }
    else {
        cout << "Graph is not bipartite";
    }

    return 0;
}
```

**Output:** Graph is bipartite

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

    // Total number of nodes in the graph
    int n;

    // Constructor
    Graph(List<Edge> edges, int n)
    {
        this.adjList = new ArrayList<>();
        this.n = n;

        for (int i = 0; i < n; i++) {
            adjList.add(new ArrayList<>());
        }

        // add edges to the undirected graph
        for (Edge edge: edges)
        {
            int src = edge.source;
            int dest = edge.dest;

            // add an edge from source to destination
            adjList.get(src).add(dest);

            // add an edge from destination to source
            adjList.get(dest).add(src);
        }
    }
}

class Main
{
    // Perform BFS on the graph starting from vertex `v`
    public static boolean isBipartite(Graph graph)
    {
        // get total number of nodes in the graph
        int n = graph.n;

        // start from any node as the graph is connected and undirected
        int v = 0;

        // to keep track of whether a vertex is discovered or not
        boolean[] discovered = new boolean[n];

        // stores the level of each vertex in BFS
        int[] level = new int[n];

        // mark the source vertex as discovered and
        // set its level to 0
        discovered[v] = true;
        level[v] = 0;

        // create a queue to do BFS and enqueue
        // source vertex in it
        Queue<Integer> q = new ArrayDeque<>();
        q.add(v);

        // loop till queue is empty
        while (!q.isEmpty())
        {
            // dequeue front node and print it
            v = q.poll();

            // do for every edge (v, u)
            for (int u: graph.adjList.get(v))
            {
                // if vertex `u` is explored for the first time
                if (!discovered[u])
                {
                    // mark it as discovered
                    discovered[u] = true;

                    // set level one more than the level of the parent node
                    level[u] = level[v] + 1;

                    // enqueue vertex
                    q.add(u);
                }
                // if the vertex has already been discovered and the
                // level of vertex `u` and `v` are the same, then the
                // graph contains an odd-cycle and is not bipartite
                else if (level[v] == level[u]) {
                    return false;
                }
            }
        }

        return true;
    }

    public static void main(String[] args)
    {
        // List of graph edges
        List<Edge> edges = Arrays.asList(
                    new Edge(0, 1), new Edge(1, 2), new Edge(1, 7), new Edge(2, 3),
                    new Edge(3, 5), new Edge(4, 6), new Edge(4, 8), new Edge(7, 8)
                    // if we add edge (1, 3), the graph becomes non-bipartite
                );

        // total number of nodes in the graph (0 to 8)
        int n = 9;

        // build a graph from the given edges
        Graph graph = new Graph(edges, n);

        if (isBipartite(graph)) {
            System.out.println("Graph is bipartite");
        }
        else {
            System.out.println("Graph is not bipartite");
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
    def __init__(self, edges=None, n=0):

        # Total number of nodes in the graph
        self.n = n

        # A list of lists to represent an adjacency list
        self.adjList = [[] for _ in range(n)]

        # add edges to the undirected graph
        for (src, dest) in edges:

            # add an edge from source to destination
            self.adjList[src].append(dest)

            # add an edge from destination to source
            self.adjList[dest].append(src)

# Perform BFS on a graph starting from vertex `v`
def isBipartite(graph):

    # start from any node as the graph is connected and undirected
    v = 0

    # to keep track of whether a vertex is discovered or not
    discovered = [False] * graph.n

    # stores the level of each vertex in BFS
    level = [None] * graph.n

    # mark the source vertex as discovered and set its level to 0
    discovered[v] = True
    level[v] = 0

    # create a queue to do BFS and enqueue source vertex
    q = deque()
    q.append(v)

    # loop till queue is empty
    while q:

        # dequeue front node and print it
        v = q.popleft()

        # do for every edge (v, u)
        for u in graph.adjList[v]:
            # if vertex `u` is explored for the first time
            if not discovered[u]:
                # mark it as discovered
                discovered[u] = True

                # set level one more than the level of the parent node
                level[u] = level[v] + 1

                # enqueue vertex
                q.append(u)

            # if the vertex has already been discovered and the
            # level of vertex `u` and `v` are the same, then the
            # graph contains an odd-cycle and is not bipartite
            elif level[v] == level[u]:
                return False

    return True

if __name__ == '__main__':

    # List of graph edges
    # Note that if we add edge (1, 3), the graph becomes non-bipartite
    edges = [(0, 1), (1, 2), (1, 7), (2, 3), (3, 5), (4, 6), (4, 8), (7, 8)]

    # total number of nodes in the graph (0 to 8)
    n = 9

    # build a graph from the given edges
    graph = Graph(edges, n)

    if isBipartite(graph):
        print('Graph is bipartite')
    else:
        print('Graph is not bipartite')
```

The time complexity of the above solution is O(V + E), where `V` and `E` are the total number of vertices and edges in the graph, respectively. Please note that O(E) may vary between O(1) and O(V2), depending on how dense the graph is.

**References:** <https://en.wikipedia.org/wiki/Bipartite_graph>

Also See:

> [Determine whether a graph is Bipartite using DFS](https://www.techiedelight.com/determine-given-graph-bipartite-graph-using-dfs/ "Determine whether a graph is Bipartite using DFS")

> [Construct a directed graph from an undirected graph that satisfies given constraints](https://www.techiedelight.com/construct-directed-graph-from-undirected-graph/ "Construct a directed graph from an undirected graph that satisfies given constraints")

> [Check whether an undirected graph is Eulerian](https://www.techiedelight.com/eulerian-path-undirected-graph/ "Check whether an undirected graph is Eulerian")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.86/5. Vote count: 231

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Algorithm](https://www.techiedelight.com/Tags/Algorithm/), [Breadth-first search](https://www.techiedelight.com/Tags/BFS/), [FIFO](https://www.techiedelight.com/Tags/FIFO/), [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
