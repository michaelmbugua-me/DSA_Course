# Snake and Ladder Problem

> Source: https://www.techiedelight.com/min-throws-required-to-win-snake-and-ladder-game/

Find the minimum number of throws required to win a given Snakes and Ladders board game.

For example, the following game requires at least 7 dice throws to win:

[](https://www.shutterstock.com/image-vector/snakes-ladders-board-game-start-finish-163384724)

> 

The idea is to consider the snakes and ladders board as a directed graph and run [Breadth–first search (BFS)](https://techiedelight.com/breadth-first-search/) from the starting node, vertex 0, as per game rules. We construct a directed graph, keeping in mind the following conditions:

  1. For any vertex in graph `v`, we have an edge from `v` to `v+1`, `v+2`, `v+3`, `v+4`, `v+5`, `v+6` as we can reach any of these nodes in one throw of dice from node `v`.
  2. If any of these neighbors of `v` has a ladder or snake, which takes us to position `x`, then `x` becomes the neighbor instead of the base of the ladder or head of the snake.

Now the problem is reduced to finding the shortest path between two nodes in a directed graph problem. We represent the snakes and ladders board using a map.

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <queue>
#include <unordered_map>
using namespace std;

// Total number of vertices in the graph
// 10 x 10 board
#define N 100

// Data structure to store a graph edge
struct Edge {
    int src, dest;
};

// A class to represent a graph object
class Graph
{
public:
    // a vector of vectors to represent an adjacency list
    vector<int> adjList[N + 1];

    // Constructor
    Graph(vector<Edge> const &edges)
    {
        // add edges to the graph
        for (Edge edge: edges)
        {
            // Please note that the graph is directed
            adjList[edge.src].push_back(edge.dest);
        }
    }
};

// A queue node
struct Node
{
    // stores number associated with graph node
    int ver;

    // `min_dist` stores the minimum distance of a node from the starting vertex
    int min_dist;
};

// Perform BFS on graph `g` starting from a given source vertex
int BFS(Graph const &g, int source)
{
    // create a queue for doing BFS
    queue<Node> q;

    // to keep track of whether a vertex is discovered or not
    vector<bool> discovered(N + 1);

    // mark the source vertex as discovered
    discovered[source] = true;

    // assign the minimum distance of the source vertex as 0 and
    // enqueue it
    Node node = { source, 0 };
    q.push(node);

    // loop till queue is empty
    while (!q.empty())
    {
        // dequeue front node
        node = q.front();
        q.pop();

        // Stop BFS if the last node is reached
        if (node.ver == N) {
            return node.min_dist;
        }

        // do for every adjacent node of the current node
        for (int u: g.adjList[node.ver])
        {
            if (!discovered[u])
            {
                // mark it as discovered and enqueue it
                discovered[u] = true;

                // assign the minimum distance of the current node
                // one more than the minimum distance of the parent node
                Node n = {u, node.min_dist + 1};
                q.push(n);
            }
        }
    }
}

int findMinimumMoves(unordered_map<int, int> &ladder, unordered_map<int, int> &snake)
{
    // find all edges involved and store them in a vector
    vector<Edge> edges;
    for (int i = 0; i < N; i++)
    {
        for (int j = 1; j <= 6 && i + j <= N; j++)
        {
            int src = i;

            // update destination if there is any ladder
            // or snake from the current position.
            int dest = (ladder[i + j] || snake[i + j]) ?
                (ladder[i + j] + snake[i + j]) : (i + j);

            // add an edge from src to dest
            Edge e = { src, dest };
            edges.push_back(e);
        }
    }

    // construct a directed graph
    Graph g(edges);

    // Find the shortest path between 1 and 100 using BFS
    return BFS(g, 0);
}

int main()
{
    // snakes and ladders are represented using a map
    unordered_map<int, int> ladder, snake;

    // insert ladders into the map
    ladder[1] = 38;
    ladder[4] = 14;
    ladder[9] = 31;
    ladder[21] = 42;
    ladder[28] = 84;
    ladder[51] = 67;
    ladder[72] = 91;
    ladder[80] = 99;

    // insert snakes into the map
    snake[17] = 7;
    snake[54] = 34;
    snake[62] = 19;
    snake[64] = 60;
    snake[87] = 36;
    snake[93] = 73;
    snake[95] = 75;
    snake[98] = 79;

    cout << findMinimumMoves(ladder, snake);

    return 0;
}
```

**Output:** 7

##

```java
import java.util.*;

// A class to store a graph edge
class Edge
{
    int src, dest;

    public Edge(int src, int dest)
    {
        this.src = src;
        this.dest = dest;
    }
}

// A queue node
class Node
{
    // stores number associated with graph node
    int ver;

    // `min_dist` stores the minimum distance of a node from the starting vertex
    int min_dist;

    public Node(int ver, int min_dist)
    {
        this.ver = ver;
        this.min_dist = min_dist;
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

        // add edges to the graph
        for (Edge edge: edges)
        {
            // Please note that the graph is directed
            adjList.get(edge.src).add(edge.dest);
        }
    }
}

class Main
{
    // Perform BFS on graph `g` starting from a given source vertex
    public static int BFS(Graph g, int source, int n)
    {
        // create a queue for doing BFS
        Queue<Node> q = new ArrayDeque<>();

        // to keep track of whether a vertex is discovered or not
        boolean[] discovered = new boolean[n + 1];

        // mark the source vertex as discovered
        discovered[source] = true;

        // assign the minimum distance of the source vertex as 0 and
        // enqueue it
        Node node = new Node(source, 0);
        q.add(node);

        // loop till queue is empty
        while (!q.isEmpty())
        {
            // dequeue front node
            node = q.poll();

            // Stop BFS if the last node is reached
            if (node.ver == n) {
                return node.min_dist;
            }

            // do for every adjacent node of the current node
            for (int u: g.adjList.get(node.ver))
            {
                if (!discovered[u])
                {
                    // mark it as discovered and enqueue it
                    discovered[u] = true;

                    // assign the minimum distance of the current node
                    // one more than the minimum distance of the parent node
                    q.add(new Node(u, node.min_dist + 1));
                }
            }
        }

        return -1;
    }

    public static int findMinimumMoves(Map<Integer, Integer> ladder,
                                    Map<Integer, Integer> snake)
    {
        // total number of nodes in the graph
        int n = 10*10;

        // find all edges involved and store them in a list
        List<Edge> edges = new ArrayList<>();
        for (int i = 0; i < n; i++)
        {
            for (int j = 1; j <= 6 && i + j <= n; j++)
            {
                int src = i;

                // update destination if there is any ladder
                // or snake from the current position.
                int dest;

                int _ladder = (ladder.get(i + j) != null) ? ladder.get(i + j): 0;
                int _snake = (snake.get(i + j) != null) ? snake.get(i + j): 0;

                if (_ladder != 0 || _snake != 0) {
                    dest = _ladder + _snake;
                }
                else {
                    dest = i + j;
                }

                // add an edge from src to dest
                edges.add(new Edge(src, dest));
            }
        }

        // construct a directed graph
        Graph g = new Graph(edges, n);

        // Find the shortest path between 1 and 100 using BFS
        return BFS(g, 0, n);
    }

    public static void main(String[] args)
    {
        // snakes and ladders are represented using a map.
        Map<Integer, Integer> ladder = new HashMap<>();
        Map<Integer, Integer> snake = new HashMap<>();

        // insert ladders into the map
        ladder.put(1, 38);
        ladder.put(4, 14);
        ladder.put(9, 31);
        ladder.put(21, 42);
        ladder.put(28, 84);
        ladder.put(51, 67);
        ladder.put(72, 91);
        ladder.put(80, 99);

        // insert snakes into the map
        snake.put(17, 7);
        snake.put(54, 34);
        snake.put(62, 19);
        snake.put(64, 60);
        snake.put(87, 36);
        snake.put(93, 73);
        snake.put(95, 75);
        snake.put(98, 79);

        System.out.println(findMinimumMoves(ladder, snake));
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

        # add edges to the graph
        for (src, dest) in edges:
            # Please note that the graph is directed
            self.adjList[src].append(dest)

# Perform BFS on graph `g` starting from a given source vertex
def BFS(g, source, n):

    # create a queue for doing BFS
    q = deque()

    # to keep track of whether a vertex is discovered or not
    discovered = [False] * (n + 1)

    # mark the source vertex as discovered
    discovered[source] = True

    # assign the minimum distance of the source vertex as 0 and
    # enqueue it
    q.append((source, 0))

    # loop till queue is empty
    while q:

        # dequeue front node
        vertex, min_dist = q.popleft()

        # `vertex` stores the number associated with the graph node
        # `min_dist` stores the minimum distance of a node from the starting vertex

        # Stop BFS if the last node is reached
        if vertex == n:
            return min_dist

        # do for every adjacent node of the current node
        for u in g.adjList[vertex]:
            if not discovered[u]:
                # mark it as discovered and enqueue it
                discovered[u] = True

                # assign the minimum distance of the current node
                # one more than the minimum distance of the parent node
                q.append((u, min_dist + 1))

def findMinimumMoves(ladder, snake):

    # total number of nodes in the graph
    n = 10 * 10

    # find all edges involved and store them in a list
    edges = []
    for i in range(n):

        j = 1
        while j <= 6 and i + j <= n:
            src = i

            # update destination if there is any ladder
            # or snake from the current position.

            _ladder = ladder.get(i + j) if (ladder.get(i + j)) else 0
            _snake = snake.get(i + j) if (snake.get(i + j)) else 0

            if _ladder or _snake:
                dest = _ladder + _snake
            else:
                dest = i + j

            # add an edge from src to dest
            edges.append((src, dest))

            j = j + 1

    # construct a directed graph
    g = Graph(edges, n)

    # Find the shortest path between 1 and 100 using BFS
    return BFS(g, 0, n)

if __name__ == '__main__':

    # snakes and ladders are represented using a dictionary.
    ladder = {}
    snake = {}

    # insert ladders into the dictionary
    ladder[1] = 38
    ladder[4] = 14
    ladder[9] = 31
    ladder[21] = 42
    ladder[28] = 84
    ladder[51] = 67
    ladder[72] = 91
    ladder[80] = 99

    # insert snakes into the dictionary
    snake[17] = 7
    snake[54] = 34
    snake[62] = 19
    snake[64] = 60
    snake[87] = 36
    snake[93] = 73
    snake[95] = 75
    snake[98] = 79

    print(findMinimumMoves(ladder, snake))
```

Also See:

> [Construct a directed graph from an undirected graph that satisfies given constraints](https://www.techiedelight.com/construct-directed-graph-from-undirected-graph/ "Construct a directed graph from an undirected graph that satisfies given constraints")

> [Total paths in a digraph from a given source to a destination having exactly `m` edges](https://www.techiedelight.com/total-paths-in-digraph-from-source-to-destination-m-edges/ "Total paths in a digraph from a given source to a destination having exactly `m` edges")

> [Bipartite Graph](https://www.techiedelight.com/bipartite-graph/ "Bipartite Graph")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.92/5. Vote count: 275

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Algorithm](https://www.techiedelight.com/Tags/Algorithm/), [Breadth-first search](https://www.techiedelight.com/Tags/BFS/), [FIFO](https://www.techiedelight.com/Tags/FIFO/), [Hard](https://www.techiedelight.com/Tags/hard/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
