# 2–Vertex Connectivity in a graph

> Source: https://www.techiedelight.com/2-vertex-connectivity-graph/

[Graph](https://www.techiedelight.com/Category/Graphs/)

Given an undirected connected graph, check if the graph is 2–vertex connected or not.

A connected graph `G` is said to be 2–vertex connected (or 2–connected) if it has more than 2 vertices and remains connected on the removal of any vertices. Any such vertex whose removal will disconnect the graph is called the Articulation point.

Consider the connected graph on the left below; if we remove vertex 3 or vertex 4 from the graph, the graph will be disconnected into two connected components. We can say that 3 and 4 are the Articulation points and the graph is not 2–vertex connected. If we add edges `(0 —> 1)`, `(0 —> 5)` and `(2 —> 4)` to the graph, it will become 2–vertex connected (check graph on the right).

We can find Articulation points in a graph using [Depth–first search (DFS)](https://techiedelight.com/depth-first-search/). We can say that the graph is 2–vertex connected if and only if **for every vertex`u` in the graph, there is at least one back-edge that is going out of the subtree rooted at `u` to some ancestor of `u`.** When we say subtree rooted at `u`, we mean all `u's` descendants (excluding vertex `u`). In other words, when we backtrack from a vertex `u`, we need to ensure that there is some back-edge from some descendant (children) of `u` to some ancestor (parent or above) of `u`. There is an exception to this rule for the root of the tree. If the root has more than one child, then it is an articulation point; otherwise, not.

**Please note that vertex`u` and `v` might be confusing to readers in this post. So please read the post carefully and remember that for an edge `u —> v`, to check whether `u` is articulation point or not we run DFS on `v`, not on `u`.**

How can we modify DFS so that we can check if there is a back-edge going out of every subtree rooted at u?

We can modify DFS such that `DFS(v)` returns the smallest arrival time to which there is a back edge from the subtree rooted at `v` (including `v`) to some ancestor of vertex `u`. For example, let `arrival(v)` be the arrival time of vertex `v` in the DFS. If there is a back out of the subtree rooted at `v`, it is to something visited before `v` and therefore with a smaller arrival value. Remember for a back edge `u —> v` in a graph, `arrival[u] > arrival[v]`.

Suppose four edges are going out of a subtree rooted at `v` to vertex `a`, `b`, `c`, and `d` and with arrival time `A(a), A(b), A(c)` and `A(d)`, respectively. We look at their four arrival times and consider the smallest among them, keeping in mind that the back-edge goes to an ancestor of vertex `u` (and not to vertex `u` itself), and that will be the value returned by `DFS(v)`. But before returning, check if `min(A(a), A(b), A(c), A(d))` is more than the `A(u)`. If yes, then that means that no back-edge is going out of the subtree rooted at `v`, and `u` is an articulation point.

The time complexity of this solution will be O(V + E), where `V` and `E` are the total number of vertices and edges in the graph, respectively.

Applications:

To check if the graph is biconnected or not. A biconnected graph is a connected graph on two or more vertices having no articulation vertices.

Also See:

> [2–Edge Connectivity in a graph](https://www.techiedelight.com/2-edge-connectivity-graph/ "2–Edge Connectivity in a graph")

> [Check if a graph is strongly connected or not using one DFS Traversal](https://www.techiedelight.com/check-graph-strongly-connected-one-dfs-traversal/ "Check if a graph is strongly connected or not using one DFS Traversal")

> [Types of edges involved in DFS and relation between them](https://www.techiedelight.com/types-edges-involved-dfs-relation/ "Types of edges involved in DFS and relation between them")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.65/5. Vote count: 114

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Depth-first search](https://www.techiedelight.com/Tags/DFS/), [Hard](https://www.techiedelight.com/Tags/hard/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
