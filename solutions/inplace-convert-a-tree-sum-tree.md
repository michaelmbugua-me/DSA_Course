# In-place convert a binary tree to its sum tree

> Source: https://www.techiedelight.com/inplace-convert-a-tree-sum-tree/

[Binary Tree](https://www.techiedelight.com/Category/Trees/Binary-Tree/)

Given a binary tree, [in-place](https://techiedelight.com/in-place-vs-out-of-place-algorithms/) replace each node’s value to the sum of all elements present in its left and right subtree. You may assume the value of an empty child node to be 0.

For example,

> 

We can easily solve this problem by using [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/). The idea is to recursively convert the left and right subtree before processing a node by traversing the tree in a [postorder fashion](https://techiedelight.com/postorder-tree-traversal-iterative-recursive/). Then for each node, update the node’s value to the sum of all elements present in its left and right subtree and return the sum of all elements present in the subtree rooted at the node from the function. The value is calculated at a constant time for each node using the left and right subtree’s return values.

The algorithm can be implemented as follows in TypeScript:

```ts
// A class to store a binary tree node
class TreeNode {
    val: number;
    left: TreeNode | null = null;
    right: TreeNode | null = null;
    constructor(val: number, left: TreeNode | null = null, right: TreeNode | null = null) {}
}

// Function to print preorder traversal of a given tree
function preorder(root: TreeNode | null): void {

    if (root === null) {
        return;
    }

    process.stdout.write(root.val + ' ');
    preorder(root.left);
    preorder(root.right);
}

// Recursive function to in-place convert the given binary tree
// by traversing the tree in a postorder manner
function transform(root: TreeNode | null): number {

    // base case: empty tree
    if (root === null) {
        return 0;
    }

    // recursively convert the left and right subtree first before
    // processing the root node
    const left = transform(root.left);
    const right = transform(root.right);

    // stores the current value of the root node
    const old = root.val;

    // update root to the sum of left and right subtree
    root.val = left + right;

    // return the updated value + the old value (sum of the tree rooted at
    // the root node)
    return root.val + old;
}

const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.right = new TreeNode(4);
root.right.left = new TreeNode(5);
root.right.right = new TreeNode(6);
root.right.left.left = new TreeNode(7);
root.right.left.right = new TreeNode(8);

transform(root);
preorder(root);
```

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the binary tree. The program requires O(h) extra space for the call stack, where `h` is the height of the tree.

Also See:

> [Convert binary tree to Left-child right-sibling binary tree](https://www.techiedelight.com/convert-normal-binary-tree-left-child-right-sibling-binary-tree/ "Convert binary tree to Left-child right-sibling binary tree")

> [Convert a binary tree to its mirror](https://www.techiedelight.com/convert-binary-tree-to-its-mirror/ "Convert a binary tree to its mirror")

> [Find the diagonal sum of a binary tree](https://www.techiedelight.com/find-diagonal-sum-given-binary-tree/ "Find the diagonal sum of a binary tree")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.69/5. Vote count: 174

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Depth-first search](https://www.techiedelight.com/Tags/DFS/), [Easy](https://www.techiedelight.com/Tags/easy/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
