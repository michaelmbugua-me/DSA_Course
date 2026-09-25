# Convert a binary tree to a full tree by removing half nodes

> Source: https://www.techiedelight.com/convert-given-binary-tree-to-full-tree-removing-half-nodes/

[Binary Tree](https://www.techiedelight.com/Category/Trees/Binary-Tree/)

Given a binary tree, convert it into a full tree by removing half nodes (remove nodes having one child). A full binary tree is a tree in which every node other than the leaves has two children.

For example, the binary tree shown on the left should be converted into the binary tree shown on the right.

> 

The idea is to traverse the tree in a [bottom-up fashion](https://techiedelight.com/postorder-tree-traversal-iterative-recursive/) and convert the left and right subtree before processing a node. Then for each node,

  * If it has two children or a leaf node, nothing needs to be done.
  * If it has exactly one child, delete it and replace the node with the child node.

The algorithm can be implemented as follows in TypeScript:

```ts
// A class to store a binary tree node
class Node {
    constructor(public data: number,
                public left: Node | null = null,
                public right: Node | null = null) {}
}

// Function to perform inorder traversal on the tree
function inorder(root: Node | null, output: number[] = []): void {

    if (root === null) {
        return;
    }

    inorder(root.left, output);
    output.push(root.data);
    inorder(root.right, output);
}

// Function to check if a given node is a leaf node or not
function isLeaf(node: Node): boolean {
    return node.left === null && node.right === null;
}

// Function to convert a binary tree into a full tree by removing half nodes
function truncate(root: Node | null): Node | null {

    // base case: empty tree
    if (root === null) {
        return null;
    }

    // recursively truncate the left subtree and subtree first
    root.left = truncate(root.left);
    root.right = truncate(root.right);

    // do nothing if the current node is a leaf node or has two children
    if ((root.left && root.right) || isLeaf(root)) {
        return root;
    }

    // if the current node has exactly one child, delete it and replace
    // it with the child node
    const child = root.left ? root.left : root.right;
    return child;
}

/* Construct the following tree
             0
           /   \
          /     \
         1       2
        /       /
       /       /
      3       4
     /       / \
    /       /   \
   5       6     7
*/

let root: Node | null = new Node(0);
root.left = new Node(1);
root.right = new Node(2);
root.left!.left = new Node(3);
root.right!.left = new Node(4);
root.left!.left!.left = new Node(5);
root.right!.left!.left = new Node(6);
root.right!.left!.right = new Node(7);

root = truncate(root);
const output: number[] = [];
inorder(root, output);
console.log(output.join(' '));
```

**Output:** 5 0 6 4 7

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the binary tree. The program requires O(h) extra space for the call stack, where `h` is the height of the tree.

Also See:

> [Truncate a binary tree to remove nodes that lie on a path having a sum less than `k`](https://www.techiedelight.com/truncate-given-binary-tree-remove-nodes-lie-path-sum-less-k/ "Truncate a binary tree to remove nodes that lie on a path having a sum less than `k`")

> [Perform boundary traversal on a binary tree](https://www.techiedelight.com/boundary-traversal-binary-tree/ "Perform boundary traversal on a binary tree")

> [Sink nodes containing zero to the bottom of a binary tree](https://www.techiedelight.com/sink-nodes-containing-zero-bottom-binary-tree/ "Sink nodes containing zero to the bottom of a binary tree")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.76/5. Vote count: 168

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Depth-first search](https://www.techiedelight.com/Tags/DFS/), [Medium](https://www.techiedelight.com/Tags/medium/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
