# Sink nodes containing zero to the bottom of a binary tree

> Source: https://www.techiedelight.com/sink-nodes-containing-zero-bottom-binary-tree/

[Binary Tree](https://www.techiedelight.com/Category/Trees/Binary-Tree/)

Given a binary tree containing many zero nodes, sink nodes having zero value at the bottom of the subtree rooted at that node. In other words, the output binary tree should not contain any node having zero value that is the parent of the node having a non-zero value.

For example, a binary tree shown on the left can be converted into a binary tree shown on the right.

> 

The idea is to process the tree nodes in a [postorder manner](https://techiedelight.com/postorder-tree-traversal-iterative-recursive/), i.e., after fixing the left and right subtrees of a node, fix the node if it is zero. To fix a node, do something similar to the [Heapify procedure](https://techiedelight.com/introduction-priority-queues-using-binary-heaps/#Heapify) of [Heapsort algorithm](https://techiedelight.com/heap-sort-place-place-implementation-c-c/). As the left and right subtree are already fixed, we can fix the binary tree rooted at the current node by moving the current node (containing zero) down the tree. We do so by comparing the node with its left and right child, swapping it with the non-zero child, and then recursively calling the procedure on the corresponding child. Repeat the process until a leaf node is reached or the subtree rooted at the current node contains all zeros.

The algorithm can be implemented as follows in TypeScript. As several binary trees can be constructed from one input, the solution would construct anyone.

```ts
// A class to store a binary tree node
class TreeNode {
    constructor(public data: number,
                public left: TreeNode | null = null,
                public right: TreeNode | null = null) {}
}

// Function to perform inorder traversal on a given binary tree
function inorder(root: TreeNode | null): void {

    if (root === null) {
        return;
    }

    inorder(root.left);
    process.stdout.write(`${root.data} `);
    inorder(root.right);
}

// Function to sink root node having value 0 at the bottom of the tree.
// The left and right subtree (if any) of the root node are already sinked
function sink(root: TreeNode | null): void {

    // base case: tree is empty
    if (root === null) {
        return;
    }

    // if the left child exists and has a non-zero value
    if (root.left !== null && root.left.data !== 0) {

        // swap the current node data with its left child
        [root.data, root.left.data] = [root.left.data, root.data];

        // recur for the left subtree
        sink(root.left);
    }

    // if the right child exists and has a non-zero value
    else if (root.right !== null && root.right.data !== 0) {

        // swap the current node data with its right child
        [root.data, root.right.data] = [root.right.data, root.data];

        // recur for the right subtree
        sink(root.right);
    }
}

// The main function to sink nodes having zero value at the bottom
// of the binary tree
function sinkNodes(root: TreeNode | null): void {

    // base case: tree is empty
    if (root === null) {
        return;
    }

    // fix left and right subtree first
    sinkNodes(root.left);
    sinkNodes(root.right);

    // sink the current node if it has a value of 0
    if (root.data === 0) {
        sink(root);
    }
}

/* Construct the following tree
          0
        /   \
       /     \
      1       0
            /   \
           /     \
          0       2
        /   \
       /     \
      3       4
*/

const root = new TreeNode(0);
root.left = new TreeNode(1);
root.right = new TreeNode(0);
root.right.left = new TreeNode(0);
root.right.right = new TreeNode(2);
root.right.left.left = new TreeNode(3);
root.right.left.right = new TreeNode(4);

sinkNodes(root);
inorder(root);
```

**Output:** 0 1 0 4 0 3 2

The time complexity of the above solution is O(n2), where `n` is the total number of nodes in the binary tree. The program requires O(h) extra space for the call stack, where `h` is the height of the tree.

Also See:

> [Convert a binary tree to a full tree by removing half nodes](https://www.techiedelight.com/convert-given-binary-tree-to-full-tree-removing-half-nodes/ "Convert a binary tree to a full tree by removing half nodes")

> [Set next pointer to the inorder successor of all nodes in a binary tree](https://www.techiedelight.com/set-next-pointer-inorder-successor-binary-tree/ "Set next pointer to the inorder successor of all nodes in a binary tree")

> [Fix a binary tree that is only one swap away from becoming a BST](https://www.techiedelight.com/fix-binary-tree-one-swap-bst/ "Fix a binary tree that is only one swap away from becoming a BST")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.89/5. Vote count: 194

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Depth-first search](https://www.techiedelight.com/Tags/DFS/), [Hard](https://www.techiedelight.com/Tags/hard/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
