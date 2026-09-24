# Find maximum cost path in a graph from a given source to a given destination

> Source: https://www.techiedelight.com/maximum-cost-path-graph-source-destination/

Given a weighted undirected graph, find the maximum cost path from a given source to any other vertex in the graph which is greater than a given cost. The path should not contain any cycles.

For example, consider the following graph,

Let `source = 0` and `cost = 50`.

The maximum cost route from source vertex 0 is `0—6—7—1—2—5—3—4`, having cost `51`, which is more than cost `50`. The solution should return `51`.

> 

The idea is to do a [Breadth–first search (BFS)](https://techiedelight.com/breadth-first-search/) traversal. BFS is generally used to find the shortest paths in graphs/matrices, but we can modify normal BFS to meet our requirements. By modifying BFS, we don’t mean using a [priority queue](https://techiedelight.com/introduction-priority-queues-using-binary-heaps/) that picks up the maximum weighted edge at every step, as that approach will fail. A low-weight edge can also be involved in the maximum cost path as there might be higher weight edges connected through it.

So, how can we use BFS?

Usually, BFS doesn’t explore already discovered vertices again, but here we do the opposite. To cover all possible paths from a given source, remove this check from BFS. But if the graph contains a [cycle](https://techiedelight.com/check-undirected-graph-contains-cycle-not/), removing this check will cause the program to go into an infinite loop. We can easily handle that if we maintain a list of nodes visited so far in the current path for a node in a queue. Basically, we maintain three things in the BFS queue node:

  * The current vertex number.
  * The cost of the current path chosen so far.
  * The set of nodes visited so far in the current path.

Whenever we encounter any node whose cost of a path is more, update the result. The BFS will terminate when we have explored every path that doesn’t result in a cycle.

This is demonstrated below in C++, Java, and Python:

```cpp
#include <iostream>
#include <queue>
#include <vector>
#include <set>
#include <climits>
using namespace std;

// Data structure to store a graph edge
struct Edge {
    int src, dest, weight;
};

// A class to represent a graph object
class Graph
{
public:
    // a vector of vectors of `Edge` to represent an adjacency list
    vector<vector<Edge>> adjList;

    // Constructor
    Graph(vector<Edge> const &edges, int n)
    {
        // resize the vector to hold `n` elements of type vector<Edge>
        adjList.resize(n);

        // add edges to the undirected graph
        for (auto &edge: edges)
        {
            int src = edge.src;
            int dest = edge.dest;
            int weight = edge.weight;

            adjList[src].push_back({src, dest, weight});
            adjList[dest].push_back({dest, src, weight});
        }
    }
};

// A BFS Node
struct Node
{
    // current vertex number and cost of the current path
    int vertex, weight;

    // set of nodes visited so far in the current path
    set<int> s;
};

// Perform BFS on graph `graph` starting from vertex `v`
int findMaxCost(Graph const &graph, int src, int k)
{
    // create a queue for doing BFS
    queue<Node> q;

    // add source vertex to set and enqueue it
    set<int> vertices;
    vertices.insert(src);
    q.push({src, 0, vertices});

    // stores maximum cost of a path from the source
    int maxCost = INT_MIN;

    // loop till queue is empty
    while (!q.empty())
    {
        // dequeue front node
        Node node = q.front();
        q.pop();

        int v = node.vertex;
        int cost = node.weight;
        vertices = node.s;

        // if the destination is reached and BFS depth is equal to `m`,
        // update the minimum cost calculated so far
        if (cost > k) {
            maxCost = max(maxCost, cost);
        }

        // do for every adjacent edge of `v`
        for (Edge edge: graph.adjList[v])
        {
            // check for a cycle
            if (vertices.find(edge.dest) == vertices.end())
            {
                // add current node to the path
                set<int> s = vertices;
                s.insert(edge.dest);

                // push every vertex (discovered or undiscovered) into
                // the queue with a cost equal to the
                // parent's cost plus the current edge's weight
                q.push({edge.dest, cost + edge.weight, s});
            }
        }
    }

    // return max-cost
    return maxCost;
}

int main()
{
    // vector of graph edges as per the above diagram
    vector<Edge> edges =
    {
        {0, 6, 11}, {0, 1, 5}, {1, 6, 3}, {1, 5, 5}, {1, 2, 7},
        {2, 3, -8}, {3, 4, 10}, {5, 2, -1}, {5, 3, 9}, {5, 4, 1},
        {6, 5, 2}, {7, 6, 9}, {7, 1, 6}
    };

    // total number of nodes in the graph (labelled from 0 to 7)
    int n = 8;

    // build a graph from the given edges
    Graph graph(edges, n);

    int src = 0;
    int cost = 50;

    // Start modified BFS traversal from source vertex `src`
    int maxCost = findMaxCost(graph, src, cost);

    if (maxCost != INT_MIN) {
        cout << maxCost;
    }
    else {
        cout << "All paths from source have their costs < " << cost;
    }

    return 0;
}
```

**Output:** 51

##

```java
import java.util.*;

// A class to store a graph edge
class Edge
{
    public final int src, dest, weight;

    private Edge(int src, int dest, int weight)
    {
        this.src = src;
        this.dest = dest;
        this.weight = weight;
    }

    // Factory method for creating an immutable instance of `Edge`
    public static Edge of(int a, int b, int c) {
        return new Edge(a, b, c);        // calls private constructor
    }
}

// A BFS Node
class Node
{
    // current vertex number and cost of the current path
    int vertex, weight;

    // set of nodes visited so far in the current path
    Set<Integer> s;

    Node(int vertex, int weight, Set<Integer> s)
    {
        this.vertex = vertex;
        this.weight = weight;
        this.s = s;
    }
}

// A class to represent a graph object
class Graph
{
    // A list of lists to represent an adjacency list
    List<List<Edge>> adjList = new ArrayList<>();

    // Graph Constructor
    public Graph(List<Edge> edges, int n)
    {
        // resize the list to `n` elements of type `List<Edge>`
        for (int i = 0; i < n; i++) {
            adjList.add(new ArrayList<>());
        }

        // add edges to the undirected graph
        for (Edge e: edges)
        {
            adjList.get(e.src).add(Edge.of(e.src, e.dest, e.weight));
            adjList.get(e.dest).add(Edge.of(e.dest, e.src, e.weight));
        }
    }
}

class Main
{
    // Perform BFS on graph `graph` starting from vertex `v`
    public static int findMaxCost(Graph graph, int src, int k)
    {
        // create a queue for doing BFS
        Queue<Node> q = new ArrayDeque<>();

        // add source vertex to set and enqueue it
        Set<Integer> vertices = new HashSet<>();
        vertices.add(src);
        q.add(new Node(src, 0, vertices));

        // stores maximum cost of a path from the source
        int maxCost = Integer.MIN_VALUE;

        // loop till queue is empty
        while (!q.isEmpty())
        {
            // dequeue front node
            Node node = q.poll();

            int v = node.vertex;
            int cost = node.weight;
            vertices = new HashSet<>(node.s);

            // if the destination is reached and BFS depth is equal to `m`,
            // update the minimum cost calculated so far
            if (cost > k) {
                maxCost = Math.max(maxCost, cost);
            }

            // do for every adjacent edge of `v`
            for (Edge edge: graph.adjList.get(v))
            {
                // check for a cycle
                if (!vertices.contains(edge.dest))
                {
                    // add current node to the path
                    Set<Integer> s = new HashSet<>(vertices);
                    s.add(edge.dest);

                    // push every vertex (discovered or undiscovered) into
                    // the queue with a cost equal to the
                    // parent's cost plus the current edge's weight
                    q.add(new Node(edge.dest, cost + edge.weight, s));
                }
            }
        }

        // return max-cost
        return maxCost;
    }

    public static void main(String[] args)
    {
        // List of graph edges as per the above diagram
        List<Edge> edges = Arrays.asList(Edge.of(0, 6, 11), Edge.of(0, 1, 5),
                                Edge.of(1, 6, 3), Edge.of(1, 5, 5), Edge.of(1, 2, 7),
                                Edge.of(2, 3, -8), Edge.of(3, 4, 10), Edge.of(5, 2, -1),
                                Edge.of(5, 3, 9), Edge.of(5, 4, 1), Edge.of(6, 5, 2),
                                Edge.of(7, 6, 9), Edge.of(7, 1, 6));

        // total number of nodes in the graph (labelled from 0 to 7)
        int n = 8;

        // build a graph from the given edges
        Graph graph = new Graph(edges, n);

        int src = 0;
        int cost = 50;

        // Start modified BFS traversal from source vertex `src`
        int maxCost = findMaxCost(graph, src, cost);

        if (maxCost != Integer.MIN_VALUE) {
            System.out.println(maxCost);
        }
        else {
            System.out.println("All paths from source have their costs < " + cost);
        }
    }
}
```

##

```python3
import sys
from collections import deque

# A class to represent a graph object
class Graph:
    # Graph Constructor
    def __init__(self, edges, n):

        # resize the list to `n` elements
        self.adjList = [[] for _ in range(n)]

        # add edges to the undirected graph
        for (src, dest, weight) in edges:
            self.adjList[src].append((dest, weight))
            self.adjList[dest].append((src, weight))

# Perform BFS on graph `graph` starting from vertex `v`
def findMaxCost(graph, src, k):

    # create a queue for doing BFS
    q = deque()

    # add source vertex to set and enqueue it
    vertices = set([src])

    # (current vertex, current path cost, set of nodes visited so far in
    # the current path)
    q.append((src, 0, vertices))

    # stores maximum cost of a path from the source
    maxcost = -sys.maxsize

    # loop till queue is empty
    while q:

        # dequeue front node
        v, cost, vertices = q.popleft()

        # if the destination is reached and BFS depth is equal to `m`,
        # update the minimum cost calculated so far
        if cost > k:
            maxcost = max(maxcost, cost)

        # do for every adjacent edge of `v`
        for (dest, weight) in graph.adjList[v]:

            # check for a cycle
            if not dest in vertices:

                # add current node to the path
                s = set(vertices)
                s.add(dest)

                # push every vertex (discovered or undiscovered) into
                # the queue with a cost equal to the
                # parent's cost plus the current edge's weight
                q.append((dest, cost + weight, s))

    # return max-cost
    return maxcost

if __name__ == '__main__':

    # List of graph edges as per the above diagram
    edges = [
        (0, 6, 11), (0, 1, 5), (1, 6, 3), (1, 5, 5), (1, 2, 7), (2, 3, -8), (3, 4, 10),
        (5, 2, -1), (5, 3, 9), (5, 4, 1), (6, 5, 2), (7, 6, 9), (7, 1, 6)
    ]

    # total number of nodes in the graph (labelled from 0 to 7)
    n = 8

    # build a graph from the given edges
    graph = Graph(edges, n)

    src = 0
    cost = 50

    # Start modified BFS traversal from source vertex `src`
    max_cost = findMaxCost(graph, src, cost)

    if max_cost != -sys.maxsize:
        print(max_cost)
    else:
        print(f'All paths from source have their costs < {cost}')
```

The time complexity of the above solution is O(V.E), where `V` and `E` are the total number of vertices and edges in the graph, respectively.

**Exercise:** Extend the solution to print the maximum cost path from source to destination.

Also See:

> [Least cost path in a digraph from a given source to a destination having exactly `m` edges](https://www.techiedelight.com/least-cost-path-digraph-source-destination-m-edges/ "Least cost path in a digraph from a given source to a destination having exactly `m` edges")

> [Compute the least cost path in a weighted digraph using BFS](https://www.techiedelight.com/least-cost-path-weighted-digraph-using-bfs/ "Compute the least cost path in a weighted digraph using BFS")

> [Total paths in a digraph from a given source to a destination having exactly `m` edges](https://www.techiedelight.com/total-paths-in-digraph-from-source-to-destination-m-edges/ "Total paths in a digraph from a given source to a destination having exactly `m` edges")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.57/5. Vote count: 283

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Breadth-first search](https://www.techiedelight.com/Tags/BFS/), [FIFO](https://www.techiedelight.com/Tags/FIFO/), [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
