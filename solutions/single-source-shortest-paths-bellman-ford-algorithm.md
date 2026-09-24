# Single-Source Shortest Paths – Bellman–Ford Algorithm

> Source: https://www.techiedelight.com/single-source-shortest-paths-bellman-ford-algorithm/

Given a source vertex `s` from a set of vertices `V` in a weighted directed graph where its edge weights `w(u, v)` can be negative, find the shortest path weights `d(s, v)` from source `s` for all vertices `v` present in the graph. If the graph contains a negative-weight cycle, report it.

For example, consider the following graph:

Let source vertex = 0, The distance of vertex 1 from vertex 0 is -1. Its path is [0 —> 1] The distance of vertex 2 from vertex 0 is 2. Its path is [0 —> 1 —> 2] The distance of vertex 3 from vertex 0 is -2. Its path is [0 —> 1 —> 4 —> 3] The distance of vertex 4 from vertex 0 is 1. Its path is [0 —> 1 —> 4]

> 

The idea is to use the [Bellman–Ford algorithm](https://en.wikipedia.org/wiki/Bellman%E2%80%93Ford_algorithm) to compute the shortest paths from a single source vertex to all the other vertices in a given weighted digraph. Bellman–Ford algorithm is slower than [Dijkstra’s Algorithm](https://techiedelight.com/single-source-shortest-paths-dijkstras-algorithm/), but it can handle negative weights edges in the graph, unlike Dijkstra’s.

If a graph contains a “negative cycle” (i.e., a cycle whose edges sum to a negative value) that is reachable from the source, then there is no shortest path. Any path that has a point on the negative cycle can be made cheaper by one more walk around the negative cycle. Bellman–Ford algorithm can easily detect any negative cycles in the graph.

The algorithm initializes the distance to the source to `0` and all other nodes to `INFINITY`. Then for all edges, if the distance to the destination can be shortened by taking the edge, the distance is updated to the new lower value. At each iteration `i` that the edges are scanned, the algorithm finds all shortest paths of at most length `i` edges. Since the longest possible path without a cycle can be `V-1` edges, the edges must be scanned `V-1` times to ensure that the shortest path has been found for all nodes. A final scan of all the edges is performed, and if any distance is updated, then a path of length `|V|` edges have been found, which can only occur if at least one negative cycle exists in the graph.

Following is the pseudocode for Bellman–Ford as per [Wikipedia](https://en.wikipedia.org/wiki/Bellman%E2%80%93Ford_algorithm). The implementation takes a graph, represented as lists of vertices and edges, and fills `distance[]` and `parent[]` with the shortest path (least cost/path) information:

function BellmanFord(list vertices, list edges, vertex source, distance[], parent[]) // Step 1 – initialize the graph. In the beginning, all vertices weight of // INFINITY and a null parent, except for the source, where the weight is 0 for each vertex v in vertices distance[v] = INFINITY parent[v] = NULL distance[source] = 0 // Step 2 – relax edges repeatedly for i = 1 to V-1 // V – number of vertices for each edge (u, v) with weight w if (distance[u] + w) is less than distance[v] distance[v] = distance[u] + w parent[v] = u // Step 3 – check for negative-weight cycles for each edge (u, v) with weight w if (distance[u] + w) is less than distance[v] return “Graph contains a negative-weight cycle” return distance[], parent[]

The following slideshow illustrates the working of the Bellman–Ford algorithm. The images are taken from [MIT 6.046J/18.401J Introduction to Algorithms (Lecture 18 by Prof. Erik Demaine)](https://ocw.mit.edu/courses/6-046j-introduction-to-algorithms-sma-5503-fall-2005/resources/lecture-18-shortest-paths-ii-bellman-ford-linear-programming-difference-constraints/).

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
#include <iomanip>
#include <climits>
using namespace std;

// Data structure to store a graph edge
struct Edge {
    int source, dest, weight;
};

// Recursive function to print the path of a given vertex from source vertex
void printPath(vector<int> const &parent, int vertex, int source)
{
    if (vertex < 0) {
        return;
    }

    printPath(parent, parent[vertex], source);
    if (vertex != source) {
        cout << ", ";
    }
    cout << vertex;
}

// Function to run the Bellman–Ford algorithm from a given source
void bellmanFord(vector<Edge> const &edges, int source, int n)
{
    // distance[] and parent[] stores the shortest path (least cost/path)
    // information. Initially, all vertices except the source vertex
    // weight INFINITY and no parent

    vector<int> distance (n, INT_MAX);
    distance[source] = 0;

    vector<int> parent (n, -1);

    int u, v, w, k = n;

    // relaxation step (run V-1 times)
    while (--k)
    {
        for (Edge edge: edges)
        {
            // edge from `u` to `v` having weight `w`
            u = edge.source;
            v = edge.dest;
            w = edge.weight;

            // if the distance to destination `v` can be
            // shortened by taking edge (u, v)
            if (distance[u] != INT_MAX && distance[u] + w < distance[v])
            {
                // update distance to the new lower value
                distance[v] = distance[u] + w;

                // set v's parent as `u`
                parent[v] = u;
            }
        }
    }

    // run relaxation step once more for n'th time to check for negative-weight cycles
    for (Edge edge: edges)
    {
        // edge from `u` to `v` having weight `w`
        u = edge.source;
        v = edge.dest;
        w = edge.weight;

        // if the distance to destination `u` can be shortened by taking edge (u, v)
        if (distance[u] != INT_MAX && distance[u] + w < distance[v])
        {
            cout << "Negative-weight cycle is found!!";
            return;
        }
    }

    for (int i = 0; i < n; i++)
    {
        if (i != source && distance[i] < INT_MAX)
        {
            cout << "The distance of vertex " << i << " from the source is "
                 << setw(2) << distance[i] << ". Its path is [";
            printPath(parent, i, source); cout << "]" << endl;
        }
    }
}

int main()
{
    // vector of graph edges as per the above diagram
    vector<Edge> edges =
    {
        // (x, y, w) —> edge from `x` to `y` having weight `w`
        {0, 1, -1}, {0, 2, 4}, {1, 2, 3}, {1, 3, 2},
        {1, 4, 2}, {3, 2, 5}, {3, 1, 1}, {4, 3, -3}
    };

    // set the maximum number of nodes in the graph
    int n = 5;

    // run the Bellman–Ford algorithm from every node
    for (int source = 0; source < n; source++) {
        bellmanFord(edges, source, n);
    }

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
    int source, dest, weight;

    public Edge(int source, int dest, int weight)
    {
        this.source = source;
        this.dest = dest;
        this.weight = weight;
    }
}

class Main
{
    // Recursive function to print the path of a given vertex from source vertex
    static void getPath(int parent[], int vertex, List<Integer> path)
    {
        if (vertex < 0) {
            return;
        }

        getPath(parent, parent[vertex], path);
        path.add(vertex);
    }

    // Function to run the Bellman–Ford algorithm from a given source
    public static void bellmanFord(List<Edge> edges, int source, int n)
    {
        // distance[] and parent[] stores the shortest path
        // (least cost/path) information
        int distance[] = new int[n];
        int parent[] = new int[n];

        // initialize `distance[]` and `parent[]`. Initially, all vertices
        // except source vertex weight INFINITY and no parent
        Arrays.fill(distance, Integer.MAX_VALUE);
        distance[source] = 0;

        Arrays.fill(parent, -1);

        // relaxation step (run V-1 times)
        for (int i = 0; i < n - 1; i++)
        {
            for (Edge edge: edges)
            {
                // edge from `u` to `v` having weight `w`
                int u = edge.source;
                int v = edge.dest;
                int w = edge.weight;

                // if the distance to destination `v` can be
                // shortened by taking edge (u, v)
                if (distance[u] != Integer.MAX_VALUE && distance[u] + w < distance[v])
                {
                    // update distance to the new lower value
                    distance[v] = distance[u] + w;

                    // set v's parent as `u`
                    parent[v] = u;
                }
            }
        }

        // run relaxation step once more for n'th time to
        // check for negative-weight cycles
        for (Edge edge: edges)
        {
            // edge from `u` to `v` having weight `w`
            int u = edge.source;
            int v = edge.dest;
            int w = edge.weight;

            // if the distance to destination `u` can be
            // shortened by taking edge (u, v)
            if (distance[u] != Integer.MAX_VALUE && distance[u] + w < distance[v])
            {
                System.out.println("Negative-weight cycle is found!!");
                return;
            }
        }

        for (int i = 0; i < n; i++)
        {
            if (i != source && distance[i] < Integer.MAX_VALUE) {
                List<Integer> path = new ArrayList<>();
                getPath(parent, i, path);
                System.out.println("The distance of vertex " + i + " from vertex " +
                        source + " is " + distance[i] + ". Its path is " + path);
            }
        }
    }

    public static void main(String[] args)
    {
        // List of graph edges as per the above diagram
        List<Edge> edges = Arrays.asList(
                // (x, y, w) —> edge from `x` to `y` having weight `w`
                new Edge(0, 1, -1), new Edge(0, 2, 4), new Edge(1, 2, 3),
                new Edge(1, 3, 2), new Edge(1, 4, 2), new Edge(3, 2, 5),
                new Edge(3, 1, 1), new Edge(4, 3, -3 )
        );

        // set the maximum number of nodes in the graph
        int n = 5;

        // run the Bellman–Ford algorithm from every node
        for (int source = 0; source < n; source++) {
            bellmanFord(edges, source, n);
        }
    }
}
```

##

```python3
import sys

# Recursive function to print the path of a given vertex from source vertex
def getPath(parent, vertex):
    if vertex < 0:
        return []
    return getPath(parent, parent[vertex]) + [vertex]

# Function to run the Bellman–Ford algorithm from a given source
def bellmanFord(edges, source, n):
    # distance[] and parent[] stores the shortest path (least cost/path) info
    distance = [sys.maxsize] * n
    parent = [-1] * n

    # Initially, all vertices except source vertex weight INFINITY and no parent
    distance[source] = 0

    # relaxation step (run V-1 times)
    for k in range(n - 1):
        # edge from `u` to `v` having weight `w`
        for (u, v, w) in edges:
            # if the distance to destination `v` can be shortened by taking edge (u, v)
            if distance[u] != sys.maxsize and distance[u] + w < distance[v]:
                # update distance to the new lower value
                distance[v] = distance[u] + w
                # set v's parent as `u`
                parent[v] = u

    # run relaxation step once more for n'th time to check for negative-weight cycles
    for (u, v, w) in edges:  # edge from `u` to `v` having weight `w`
        # if the distance to destination `u` can be shortened by taking edge (u, v)
        if distance[u] != sys.maxsize and distance[u] + w < distance[v]:
            print('Negative-weight cycle is found!!')
            return

    for i in range(n):
        if i != source and distance[i] < sys.maxsize:
            print(f'The distance of vertex {i} from vertex {source} is {distance[i]}. '
                  f'Its path is', getPath(parent, i))

if __name__ == '__main__':

    # of graph edges as per the above diagram
    edges = [
        # (x, y, w) —> edge from `x` to `y` having weight `w`
        (0, 1, -1), (0, 2, 4), (1, 2, 3), (1, 3, 2),
        (1, 4, 2), (3, 2, 5), (3, 1, 1), (4, 3, -3)
    ]

    # set the maximum number of nodes in the graph
    n = 5

    # run the Bellman–Ford algorithm from every node
    for source in range(n):
        bellmanFord(edges, source, n)
```

**Output:** The distance of vertex 1 from vertex 0 is -1. Its path is [0, 1] The distance of vertex 2 from vertex 0 is 2. Its path is [0, 1, 2] The distance of vertex 3 from vertex 0 is -2. Its path is [0, 1, 4, 3] The distance of vertex 4 from vertex 0 is 1. Its path is [0, 1, 4] The distance of vertex 2 from vertex 1 is 3. Its path is [1, 2] The distance of vertex 3 from vertex 1 is -1. Its path is [1, 4, 3] The distance of vertex 4 from vertex 1 is 2. Its path is [1, 4] The distance of vertex 1 from vertex 3 is 1. Its path is [3, 1] The distance of vertex 2 from vertex 3 is 4. Its path is [3, 1, 2] The distance of vertex 4 from vertex 3 is 3. Its path is [3, 1, 4] The distance of vertex 1 from vertex 4 is -2. Its path is [4, 3, 1] The distance of vertex 2 from vertex 4 is 1. Its path is [4, 3, 1, 2] The distance of vertex 3 from vertex 4 is -3. Its path is [4, 3]

The time complexity of the Bellman–Ford algorithm is O(V × E), where `V` and `E` are the total number of vertices and edges in the graph, respectively.

**References:**

1\. <https://en.wikipedia.org/wiki/Bellman%E2%80%93Ford_algorithm>

2\. [MIT. Introduction to Algorithms 6.046J/18.401J/SMA5503 Lecture 18 Prof. Erik Demaine](https://www.youtube.com/watch?v=Ttezuzs39nk)

Also See:

> [All-Pairs Shortest Paths – Floyd Warshall Algorithm](https://www.techiedelight.com/pairs-shortest-paths-floyd-warshall-algorithm/ "All-Pairs Shortest Paths – Floyd Warshall Algorithm")

> [Find the cost of the shortest path in DAG using one pass of Bellman–Ford](https://www.techiedelight.com/cost-of-shortest-path-in-dag-using-one-pass-of-bellman-ford/ "Find the cost of the shortest path in DAG using one pass of Bellman–Ford")

> [Single-Source Shortest Paths – Dijkstra’s Algorithm](https://www.techiedelight.com/single-source-shortest-paths-dijkstras-algorithm/ "Single-Source Shortest Paths – Dijkstra’s Algorithm")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.91/5. Vote count: 168

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Algorithm](https://www.techiedelight.com/Tags/Algorithm/), [Bottom-up](https://www.techiedelight.com/Tags/Tabulation/), [Medium](https://www.techiedelight.com/Tags/medium/), [Must Know](https://www.techiedelight.com/Tags/Must-Know/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
