# Remove nodes from a BST that have keys outside a valid range

> Source: https://www.techiedelight.com/remove-nodes-bst-keys-outside-valid-range/

[BST](https://www.techiedelight.com/Category/Trees/BST/)

Given a BST and a valid range of keys, remove nodes from the BST that have keys outside the valid range.

For example, consider BST shown on the left below. It should be truncated to BST shown on the right.

> 

The idea is simple – traverse the tree in a bottom-up fashion and truncate the left and right subtree before processing a node. Since we are doing a [postorder traversal](https://techiedelight.com/postorder-tree-traversal-iterative-recursive/), the subtree rooted at the current node may be truncated, and the current node becomes a leaf node now. So, for each node, check

  * If its key falls within the valid range, nothing needs to be done.
  * If the root’s key is smaller than the minimum allowed, remove it and set the root to its right child.
  * If the root’s key is larger than the maximum allowed, remove it and set the root to its left child.

Following is a TypeScript implementation of the idea:

```ts
// A class to store a BST node
class TreeNode {
    constructor(public val: number, public left: TreeNode | null = null, public right: TreeNode | null = null) {}
}

// Recursive function to insert a key into a BST
function insert(root: TreeNode | null, key: number): TreeNode {
    // if the root is null, create a new node and return it
    if (root === null) {
        return new TreeNode(key);
    }

    // if the given key is less than the root node, recur for the left subtree
    if (key < root.val) {
        root.left = insert(root.left, key);
    }
    // if the given key is more than the root node, recur for the right subtree
    else {
        root.right = insert(root.right, key);
    }

    return root;
}

// Function to perform inorder traversal on the tree
function inorder(root: TreeNode | null): void {
    if (root === null) {
        return;
    }

    inorder(root.left);
    console.log(root.val + ' ');
    inorder(root.right);
}

// Function to truncate the BST and remove nodes having keys
// outside the valid range
function truncate(root: TreeNode | null, low: number, high: number): TreeNode | null {
    // base case
    if (root === null) {
        return root;
    }

    // recursively truncate the left and right subtree first
    root.left = truncate(root.left, low, high);
    root.right = truncate(root.right, low, high);

    // if the root's key is smaller than the minimum allowed, delete it
    if (root.val < low) {
        root = root.right;
    }
    // if the root's key is larger than the maximum allowed, delete it
    else if (root.val > high) {
        root = root.left;
    }

    return root;
}

const keys = [15, 10, 20, 8, 12, 16, 25];

/* Construct the following tree
           15
         /    \
        /      \
       10       20
      / \      /  \
     /   \    /    \
    8    12 16     25
*/

let root: TreeNode | null = null;
for (const key of keys) {
    root = insert(root, key);
}

// the valid range is 9 to 12
root = truncate(root, 9, 12);
inorder(root);
```

**Output:** 10 12



The time complexity of the above solution is O(n), where `n` is the size of the BST, and requires space proportional to the tree’s height for the call stack.

Also See:

> [Count nodes in a BST that lies within a given range](https://www.techiedelight.com/count-nodes-bst-that-lies-within-given-range/ "Count nodes in a BST that lies within a given range")

> [Count subtrees in a BST whose nodes lie within a given range](https://www.techiedelight.com/count-subtrees-bst-whose-nodes-within-range/ "Count subtrees in a BST whose nodes lie within a given range")

> [Construct a balanced BST from the given keys](https://www.techiedelight.com/construct-balanced-bst-given-keys/ "Construct a balanced BST from the given keys")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.59/5. Vote count: 170

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Depth-first search](https://www.techiedelight.com/Tags/DFS/), [Medium](https://www.techiedelight.com/Tags/medium/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
