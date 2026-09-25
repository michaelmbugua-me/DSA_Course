# Find all nodes at a given distance from leaf nodes in a binary tree

> Source: https://www.techiedelight.com/find-all-nodes-at-given-distance-from-leaf-nodes-in-a-binary-tree/

[Binary Tree](https://www.techiedelight.com/Category/Trees/Binary-Tree/)

Given a binary tree, write an efficient algorithm to find all nodes present at a given distance from any leaf node. We need to find only those nodes that are present in the root-to-leaf path for that leaf.

For example, consider the following binary tree:

The nodes present at a distance of 1 from any leaf node are 10, 16, 20 The nodes present at a distance of 2 from any leaf node are 15, 20 The nodes present at a distance of 3 from any leaf node is 15

> 

The idea is to traverse the tree in a [preorder fashion](https://techiedelight.com/preorder-tree-traversal-iterative-recursive/) and use a list to store the current node’s ancestors in the preorder traversal. If we encounter a leaf node, print the ancestor present at a given distance from it. To avoid printing duplicates, insert the nodes into a set and print it later.

Following is the implementation of the idea in TypeScript:

```ts
// A class to store a binary tree node
class TreeNode {
    constructor(public val: number, public left: TreeNode | null = null, public right: TreeNode | null = null) {}
}

// Function to check if a given node is a leaf node or not
function isLeaf(node: TreeNode): boolean {
    return node.left === null && node.right === null;
}

// Recursive function to find all nodes at a given distance from leaf nodes
function leafNodeDistance(node: TreeNode | null, path: TreeNode[], set: Set<TreeNode>, dist: number): void {

    // base case: empty tree
    if (node === null) {
        return;
    }

    // if a leaf node is found, insert the node at a distance `dist` from the
    // leaf node into the set
    if (isLeaf(node) && path.length >= dist) {
        set.add(path[path.length - dist]);
        return;
    }

    // include the current node in the current path
    path.push(node);

    // recur for the left and right subtree
    leafNodeDistance(node.left, path, set, dist);
    leafNodeDistance(node.right, path, set, dist);

    // remove the current node from the current path
    const idx = path.indexOf(node);
    path.splice(idx, 1);
}

// Find all distinct nodes at a given distance from leaf nodes
function printLeafNodeDistance(node: TreeNode | null, dist: number): void {

    // list to store root-to-leaf path
    const path: TreeNode[] = [];

    // create an empty set to store distinct nodes at a given
    // distance from leaf nodes
    const s = new Set<TreeNode>();

    // find all nodes
    leafNodeDistance(node, path, s, dist);

    // print output
    console.log([...s].map((e) => e.val));
}

/* Construct the following tree
          15
        /    \
       /      \
      10       20
     / \      /  \
    8   12   16  25
            /
           18
*/

const root = new TreeNode(15);
root.left = new TreeNode(10);
root.right = new TreeNode(20);
root.left.left = new TreeNode(8);
root.left.right = new TreeNode(12);
root.right.left = new TreeNode(16);
root.right.right = new TreeNode(25);
root.right.left.left = new TreeNode(18);

const dist = 1;
printLeafNodeDistance(root, dist);
```

**Output:** 10 16 20

The time complexity of the above solution is O(n) and requires O(n) extra space, where `n` is the size of the binary tree.

Also See:

> [Print all paths from leaf to root node of a binary tree](https://www.techiedelight.com/print-all-paths-from-leaf-to-root-binary-tree/ "Print all paths from leaf to root node of a binary tree")

> [Find distance between given pairs of nodes in a binary tree](https://www.techiedelight.com/distance-between-given-pairs-of-nodes-binary-tree/ "Find distance between given pairs of nodes in a binary tree")

> [Print all paths from the root to leaf nodes of a binary tree](https://www.techiedelight.com/print-all-paths-from-root-to-leaf-nodes-binary-tree/ "Print all paths from the root to leaf nodes of a binary tree")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.81/5. Vote count: 154

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Depth-first search](https://www.techiedelight.com/Tags/DFS/), [Hard](https://www.techiedelight.com/Tags/hard/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
