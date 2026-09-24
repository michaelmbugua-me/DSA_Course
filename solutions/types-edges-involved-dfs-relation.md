# Types of edges involved in DFS and relation between them

> Source: https://www.techiedelight.com/types-edges-involved-dfs-relation/

[Graph](https://www.techiedelight.com/Category/Graphs/)

This post describes the types of edges involved in [Depth–first search (DFS)](https://techiedelight.com/depth-first-search/) of a tree and directed & undirected graphs and establish the relation between them.

**Prerequisite:**

> [Arrival and departure time of vertices in DFS](https://techiedelight.com/arrival-departure-time-vertices-dfs/)

## Depth–first search in a tree

Depth–first search is a simple [preorder](https://techiedelight.com/preorder-tree-traversal-iterative-recursive/) or [postorder traversal](https://techiedelight.com/postorder-tree-traversal-iterative-recursive/) for a tree, and it contains only tree edges. If `x` is a descendant of `y`, then the relation between the arrival and departure time for tree edges of DFS is:

`arrival[y] < arrival[x] < departure[x] < departure[y]`

## Depth–first search in an undirected graph

With the graph version of DFS, only some edges will be traversed, and these edges will form a tree, called the [Depth–first search (DFS)](https://techiedelight.com/depth-first-search/) tree of the graph starting at the given root, and the edges in this tree are called **Tree Edges**. One other type of edge called **back edge** points from a node to one of its ancestors in the DFS tree.

For an edge `u —> v` in an undirected graph, the relation between the arrival and departure time for tree edges and back edges is:

**Tree edge:**

`arrival[u] < arrival[v]` `departure[u] > departure[v]`

**Back edge:**

`arrival[u] > arrival[v]` `departure[u] < departure[v]`

The code for finding arrival and departure time in an undirected graph can be seen [here](https://techiedelight.com/compiler/?run=0j3cj8).

## Depth–first search in a directed graph

There are two other categories of edges of the graph that can be found while doing DFS in a directed graph:

**Forward edges** that points from a node to one of its descendants. **Cross edges** that points from a node to a previously visited node that is neither an ancestor nor a descendant.

For an edge `u —> v` in a directed graph, an edge is a tree edge if `parent[v] = u`. For the other types of edges, we can use their arrival and departure times to tell whether `v` is an ancestor, descendant, or distant cousin of `u`. Following is the relation between the arrival and departure time for different types of edges involved in a DFS of the directed graph:

**Tree edge:**

`arrival[u] < arrival[v]` `departure[u] > departure[v]`

**Back edge:**

`arrival[u] > arrival[v]` `departure[u] < departure[v]`

**Forward edge:**

`arrival[u] < arrival[v]` `departure[u] > departure[v]`

**Cross edge:**

`arrival[u] > arrival[v]` `departure[u] > departure[v]`

For tree edge, back edge, and forward edges, the relation between the arrival and departure times of the endpoints is immediate from the tree structure. For any cross edge, `u` is neither an ancestor nor descendant of `v`, So we can say that `u` and `v` intervals does not overlap, i.e., for an edge `u —> v`,

`arrival[v] < departure[v] < arrival[u] < departure[u]`

Please note we cannot have an edge from `v —> u`. If any such edge were there, it would have formed a Tree Edge.

**References:** <http://www.cs.yale.edu/homes/aspnes/pinewiki/DepthFirstSearch.html>

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.59/5. Vote count: 122

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Beginner](https://www.techiedelight.com/Tags/Beginner/), [Depth-first search](https://www.techiedelight.com/Tags/DFS/), [Must Know](https://www.techiedelight.com/Tags/Must-Know/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
