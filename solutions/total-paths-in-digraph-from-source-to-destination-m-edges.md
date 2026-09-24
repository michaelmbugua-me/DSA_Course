# Total paths in a digraph from a given source to a destination having exactly `m` edges

> Source: https://www.techiedelight.com/total-paths-in-digraph-from-source-to-destination-m-edges/

Given a digraph (directed graph), find the total number of routes to reach the destination from a given source with exactly `m` edges.

For example, consider the following graph:

Let source = 0, destination = 3, number of edges m = 4. The graph has 3 routes from source 0 to destination 3 with 4 edges. The solution should return the total number of routes 3.

0 —> 1 —> 5 —> 2 —> 3 0 —> 1 —> 6 —> 5 —> 3 0 —> 6 —> 5 —> 2 —> 3

> 

The idea is to do a [BFS traversal](https://techiedelight.com/breadth-first-search/) from the given source vertex. BFS is generally used to find the shortest paths in graphs/matrices, but we can modify normal BFS to meet our requirements. Usually, BFS doesn’t explore already discovered vertices again, but here we do the opposite. To cover all possible paths from source to destination, remove this check from BFS. But if the graph contains a [cycle](https://techiedelight.com/check-undirected-graph-contains-cycle-not/), removing this check will cause the program to go into an infinite loop. We can easily handle that if we don’t consider nodes having a BFS depth of more than `m`. Basically, we maintain two things in the BFS queue node:

  * The current vertex number.
  * The current depth of BFS (i.e., how far away from the current node is from the source?).

So, whenever the destination vertex is reached and BFS depth is equal to `m`, we update the result. The BFS will terminate when we have explored every path in the given graph or BFS depth exceeds `m`. Following is the implementation in C++, Java, and Python based on the above idea:

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

        // add edges to the directed graph
        for (auto &edge: edges) {
            adjList[edge.src].push_back(edge.dest);
        }
    }
};

// A BFS Node
struct Node
{
    // stores current vertex number and the current depth of
    // BFS (how far away from the source current node is)
    int vertex, depth;
};

// Perform BFS on graph `graph` starting from vertex `v`
int findTotalPaths(Graph const &graph, int src, int dest, int m)
{
    // create a queue for doing BFS
    queue<Node> q;

    // enqueue source vertex
    q.push({src, 0});

    // stores number of paths from source to destination having exactly `m` edges
    int count = 0;

    // loop till queue is empty
    while (!q.empty())
    {
        // dequeue front node
        Node node = q.front();
        q.pop();

        int v = node.vertex;
        int depth = node.depth;

        // if the destination is reached and BFS depth is equal to `m`, update count
        if (v == dest && depth == m) {
            count++;
        }

        // don't consider nodes having a BFS depth more than `m`.
        // This check will result in optimized code and handle cycles
        // in the graph (otherwise, the loop will never break)
        if (depth > m) {
            break;
        }

        // do for every adjacent vertex `u` of `v`
        for (int u: graph.adjList[v])
        {
            // enqueue every vertex (discovered or undiscovered)
            q.push({u, depth + 1});
        }
    }

    // return number of paths from source to destination
    return count;
}

int main()
{
    // vector of graph edges as per the above diagram
    vector<Edge> edges =
    {
        {0, 6}, {0, 1}, {1, 6}, {1, 5}, {1, 2}, {2, 3}, {3, 4},
        {5, 2}, {5, 3}, {5, 4}, {6, 5}, {7, 6}, {7, 1}
    };

    // total number of nodes in the graph
    int n = 8;

    // build a graph from the given edges
    Graph graph(edges, n);

    int src = 0, dest = 3, m = 4;

    // Do modified BFS traversal from the source vertex src
    cout << findTotalPaths(graph, src, dest, m);

    return 0;
}
```

**Output:** 3

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

// A BFS Node
class Node
{
    // stores current vertex number and the current depth of
    // BFS (how far away from source current node is)
    int vertex, depth;

    public Node(int vertex, int depth)
    {
        this.vertex = vertex;
        this.depth = depth;
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
        for (Edge edge: edges) {
            adjList.get(edge.source).add(edge.dest);
        }
    }
}

class Main
{
    // Perform BFS on graph `graph` starting from vertex `v`
    public static int findTotalPaths(Graph graph, int src, int dest, int m)
    {
        // create a queue for doing BFS
        Queue<Node> q = new ArrayDeque<>();

        // enqueue source vertex
        q.add(new Node(src, 0));

        // stores number of paths from source to destination
        // having exactly `m` edges
        int count = 0;

        // loop till queue is empty
        while (!q.isEmpty())
        {
            // dequeue front node
            Node node = q.poll();

            int v = node.vertex;
            int depth = node.depth;

            // if the destination is reached and BFS depth is equal to `m`,
            // update count
            if (v == dest && depth == m) {
                count++;
            }

            // don't consider nodes having a BFS depth more than `m`.
            // This check will result in optimized code and handle cycles
            // in the graph (otherwise, the loop will never break)
            if (depth > m) {
                break;
            }

            // do for every adjacent vertex `u` of `v`
            for (int u: graph.adjList.get(v))
            {
                // push every vertex (discovered or undiscovered) into the queue
                q.add(new Node(u, depth + 1));
            }
        }

        // return number of paths from source to destination
        return count;
    }

    public static void main(String[] args)
    {
        // List of graph edges as per the above diagram
        List<Edge> edges = Arrays.asList(
                new Edge(0, 6), new Edge(0, 1), new Edge(1, 6), new Edge(1, 5),
                new Edge(1, 2), new Edge(2, 3), new Edge(3, 4), new Edge(5, 2),
                new Edge(5, 3), new Edge(5, 4), new Edge(6, 5), new Edge(7, 6),
                new Edge(7, 1));

        // total number of nodes in the graph
        int n = 8;

        // construct graph
        Graph graph = new Graph(edges, n);

        int src = 0, dest = 3, m = 4;

        // Do modified BFS traversal from the source vertex src
        System.out.println(findTotalPaths(graph, src, dest, m));
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

        # add edges to the directed graph
        for (src, dest) in edges:
            self.adjList[src].append(dest)

# Perform BFS on graph `graph` starting from vertex `v`
def findTotalPaths(graph, src, dest, m):

    # create a queue for doing BFS
    q = deque()

    # enqueue current vertex and the current depth of BFS
    # (how far away the current node is from the source)
    q.append((src, 0))

    # stores number of paths from source to destination having exactly `m` edges
    count = 0

    # loop till queue is empty
    while q:

        # dequeue front node
        vertex, depth = q.popleft()

        # if the destination is reached and BFS depth is equal to `m`, update count
        if vertex == dest and depth == m:
            count = count + 1

        # don't consider nodes having a BFS depth more than `m`.
        # This check will result in optimized code and handle cycles
        # in the graph (otherwise, the loop will never break)
        if depth > m:
            break

        # do for every adjacent vertex `u` of `v`
        for u in graph.adjList[vertex]:
            # enqueue every vertex (discovered or undiscovered)
            q.append((u, depth + 1))

    # return number of paths from source to destination
    return count

if __name__ == '__main__':

    # List of graph edges as per the above diagram
    edges = [
        (0, 6), (0, 1), (1, 6), (1, 5), (1, 2), (2, 3), (3, 4),
        (5, 2), (5, 3), (5, 4), (6, 5), (7, 6), (7, 1)
    ]

    # total number of nodes in the graph
    n = 8

    # construct graph
    graph = Graph(edges, n)

    src, dest = 0, 3
    m = 4

    # Do modified BFS traversal from the source vertex src
    print(findTotalPaths(graph, src, dest, m))
```

The time complexity of the above solution is O(V.E), where `V` and `E` are the total number of vertices and edges in the graph, respectively.

Also See:

> [Least cost path in a digraph from a given source to a destination having exactly `m` edges](https://www.techiedelight.com/least-cost-path-digraph-source-destination-m-edges/ "Least cost path in a digraph from a given source to a destination having exactly `m` edges")

> [Find maximum cost path in a graph from a given source to a given destination](https://www.techiedelight.com/maximum-cost-path-graph-source-destination/ "Find maximum cost path in a graph from a given source to a given destination")

> [Construct a directed graph from an undirected graph that satisfies given constraints](https://www.techiedelight.com/construct-directed-graph-from-undirected-graph/ "Construct a directed graph from an undirected graph that satisfies given constraints")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.64/5. Vote count: 183

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Breadth-first search](https://www.techiedelight.com/Tags/BFS/), [FIFO](https://www.techiedelight.com/Tags/FIFO/), [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
