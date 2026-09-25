# Convert binary tree to Left-child right-sibling binary tree

> Source: https://www.techiedelight.com/convert-normal-binary-tree-left-child-right-sibling-binary-tree/

[Binary Tree](https://www.techiedelight.com/Category/Trees/Binary-Tree/)

Given a [normal binary tree](https://techiedelight.com/binary-tree-interview-questions/), convert it into a Left–child right–sibling (LC–RS) binary tree.

Each node in the LC–RS binary tree has two pointers: one to the node’s left child and one to its next sibling in the original binary tree. So starting with the root, each node’s leftmost child in the original tree is made its left child in the LC–RS binary tree, and its nearest sibling to the right in the original tree is made its right child in the binary tree. For example, we have a binary tree below:

(a) Processing binary tree to LC–RS binary tree, every node is linked and aligned with the left child, and the next nearest is a sibling.

(b) We can rewrite the binary tree shown by putting the left child node to one level below its parents and by placing the sibling next to the left child at the same level.

(c) We can transform this tree into a LC-RS binary tree by turning each sibling 45° clockwise.

> 

The idea is to traverse the tree in a [postorder fashion](https://techiedelight.com/postorder-tree-traversal-iterative-recursive/) and for every node,

  * If its left child is empty, then make its right child as left’s and set right to null.
  * If the left child already exists, then make the right child of its left child point to its right child and set the right child to null.

The algorithm can be implemented as follows in TypeScript:

```ts
# A class to store a binary tree node
class Node {
    constructor(public key: number, public left: Node | null = null, public right: Node | null = null) {}
}

// Function to perform preorder traversal on a given binary tree.
function preorder(root: Node | null): void {
    if (root === null) {
        return;
    }
    process.stdout.write(`${root.key} `);
    preorder(root.left);
    preorder(root.right);
}

// Function to convert a normal binary tree into a Left–child
// right–sibling (LC–RS) binary tree
function convert(root: Node | null): void {
    // base case: empty tree
    if (root === null) {
        return;
    }

    // recursively convert the left and right subtree first
    convert(root.left);
    convert(root.right);

    // if the left child is empty, point it to the right child
    // and set the right child to null
    if (root.left === null) {
        root.left = root.right;
        root.right = null;
    }
    // if the left child already exists, then make its right child
    // point to the current node's right child and
    // set the right child as null
    else {
        root.left.right = root.right;
        root.right = null;
    }
}

/* Construct the following tree
          1
        /  \
       /    \
      2      3
     / \    /
    4   5  6
          / \
         7   8
*/

let root = new Node(1);
root.left = new Node(2);
root.right = new Node(3);
root.left!.left = new Node(4);
root.left!.right = new Node(5);
root.right!.left = new Node(6);
root.right!.left!.left = new Node(7);
root.right!.left!.right = new Node(8);

convert(root);
preorder(root);
```

**Output:** 1 2 4 5 3 6 7 8

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the binary tree. The auxiliary space required by the program is O(h) for call stack, where `h` is the height of the tree.

**References:** [Left–child right–sibling binary tree – Wikipedia](https://en.wikipedia.org/wiki/Left-child_right-sibling_binary_tree)

Also See:

> [Convert a binary tree to its mirror](https://www.techiedelight.com/convert-binary-tree-to-its-mirror/ "Convert a binary tree to its mirror")

> [Convert a binary tree to a full tree by removing half nodes](https://www.techiedelight.com/convert-given-binary-tree-to-full-tree-removing-half-nodes/ "Convert a binary tree to a full tree by removing half nodes")

> [Print cousins of a given node in a binary tree](https://www.techiedelight.com/print-cousins-of-given-node-binary-tree/ "Print cousins of a given node in a binary tree")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.84/5. Vote count: 164

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Depth-first search](https://www.techiedelight.com/Tags/DFS/), [Medium](https://www.techiedelight.com/Tags/medium/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
