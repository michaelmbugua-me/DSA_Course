# Threaded Binary Tree – Overview and Implementation

> Source: https://www.techiedelight.com/threaded-binary-tree-overview-implementation/

[Binary Tree](https://www.techiedelight.com/Category/Trees/Binary-Tree/)

This post will explore a threaded binary tree and convert a [normal binary tree](https://techiedelight.com/binary-tree-interview-questions/) into a single-threaded binary tree.

We know that a [recursive inorder tree traversal algorithm](https://techiedelight.com/inorder-tree-traversal-iterative-recursive/) uses stack space proportional to a tree’s height. For a balanced tree containing `n` elements, the algorithm takes O(log(n)) space but, for a skewed tree, this goes up to O(n). The iterative algorithm for inorder traversal exists, but it also takes extra space for the stack.

One feasible solution to this problem is a [threaded binary tree](https://en.wikipedia.org/wiki/Threaded_binary_tree) that allows fast inorder tree traversal without extra space. In a single-threaded binary tree, all _null_ right child pointers in a binary tree point to the in-order successor of the node (if it exists). Now given a pointer to a node in a threaded tree, it is possible to find its inorder successor cheaply.

Please note that another variant of a threaded binary tree, called double–threaded binary tree having _null_ left child pointers pointing to the inorder predecessor of the node (if it exists) along with _null_ right child pointers pointing to the inorder successor.

> 

Convert a Binary Tree into a Threaded Binary Tree:

To convert a binary tree into a threaded binary tree, point all _null_ right child pointers to that node’s inorder successor. The idea is to perform an inorder traversal of the binary tree and pass information about the previously visited node along with the node. If the current node has a null right child, set the right child of its previous node to point to it.

Also maintain a boolean field in each Node that is true wherever the right pointer of a node points to its inorder successor. This field is useful while traversing the threaded binary tree to find an inorder successor if the current node has a threaded link.

Now let’s construct a threaded binary tree out of a normal binary tree, in TypeScript:

```ts
// Threaded binary tree node
class Node {
    left: Node | null = null;
    right: Node | null = null;
    // true if the right child of the node points to its inorder successor
    isThreaded = false;

    constructor(public data: number) {}
}

// Utility function to return the leftmost node in a given binary tree
function leftMostNode(root: Node | null): Node | null {
    let node = root;
    while (node && node.left) {
        node = node.left;
    }
    return node;
}

// Iterative function to perform inorder traversal on a threaded binary tree
function traverse(root: Node | null): void {
    // base case
    if (root === null) {
        return;
    }

    // start from the leftmost node
    let curr = leftMostNode(root);
    while (curr) {
        // print the current node
        process.stdout.write(curr.data + ' ');

        // go to the inorder successor if the current node is threaded
        if (curr.isThreaded) {
            curr = curr.right;
        }
        // otherwise, visit the leftmost child in the right subtree
        else {
            curr = leftMostNode(curr.right);
        }
    }
}

// Function to convert a binary tree into a threaded binary tree
// using inorder traversal
function populateNext(curr: Node | null, prev: Node | null): Node | null {
    // base case: empty tree
    if (curr === null) {
        return prev;
    }

    // recur for the left subtree
    prev = populateNext(curr.left, prev);

    // if the current node is not the root node of a binary tree
    // and has an empty right child
    if (prev && prev.right === null) {
        // set the right child of the previous node to point to the current node
        prev.right = curr;

        // set thread flag to true
        prev.isThreaded = true;
    }

    // update previous node
    prev = curr;

    // recur for the right subtree
    prev = populateNext(curr.right, prev);
    return prev;
}

// Convert a binary tree into a threaded binary tree
function convertToThreaded(root: Node | null): void {
    // stores previously visited node
    let prev: Node | null = null;
    populateNext(root, prev);
}

/*
 Construct the following tree
           5
         /   \
        /     \
       2       7
      / \     / \
     /   \   /   \
    1     4 6     9
         /       / \
        /       /   \
       3       8    10
 */

const root = new Node(5);
root.left = new Node(2);
root.right = new Node(7);
root.left.left = new Node(1);
root.left.right = new Node(4);
root.right.left = new Node(6);
root.right.right = new Node(9);
root.left.right.left = new Node(3);
root.right.right.left = new Node(8);
root.right.right.right = new Node(10);

convertToThreaded(root);
traverse(root);
```

Also See:

> [Set next pointer to the inorder successor of all nodes in a binary tree](https://www.techiedelight.com/set-next-pointer-inorder-successor-binary-tree/ "Set next pointer to the inorder successor of all nodes in a binary tree")

> [In-place convert a binary tree to a doubly-linked list](https://www.techiedelight.com/place-convert-given-binary-tree-to-doubly-linked-list/ "In-place convert a binary tree to a doubly-linked list")

> [Convert a binary tree to a full tree by removing half nodes](https://www.techiedelight.com/convert-given-binary-tree-to-full-tree-removing-half-nodes/ "Convert a binary tree to a full tree by removing half nodes")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.87/5. Vote count: 181

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Depth-first search](https://www.techiedelight.com/Tags/DFS/), [Medium](https://www.techiedelight.com/Tags/medium/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
