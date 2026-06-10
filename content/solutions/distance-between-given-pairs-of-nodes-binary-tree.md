# Find distance between given pairs of nodes in a binary tree

> Source: https://www.techiedelight.com/distance-between-given-pairs-of-nodes-binary-tree/

[Binary Tree](https://www.techiedelight.com/Category/Trees/Binary-Tree/)

Given a binary tree, determine the distance between given pairs of nodes in it. The distance between two nodes is defined as the total number of edges in the shortest path from one node to other.

For example, consider the binary tree. The distance between node 7 and node 6 is 3.

> 

This problem is a standard application of the [lowest common ancestor](https://techiedelight.com/find-lowest-common-ancestor-lca-two-nodes-binary-tree/) of given nodes. The distance from `v` to `w` can be computed as the distance from the root to `v`, plus the distance from the root to `w`, minus twice the distance from the root to their lowest common ancestor.

The algorithm can be implemented as follows in TypeScript:

```ts
// A class to store a binary tree node
class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
    constructor(val: number, left: TreeNode | null = null, right: TreeNode | null = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

const INT_MIN = Number.MIN_SAFE_INTEGER;

// Function to check if a given node is present in a binary tree or not
function isNodePresent(root: TreeNode | null, node: TreeNode): boolean {

    // base case
    if (root === null) {
        return false;
    }

    // if the node is found, return true
    if (root === node) {
        return true;
    }

    // return true if the node is found in the left or right subtree
    return isNodePresent(root.left, node) || isNodePresent(root.right, node);
}

// Function to find the level of a given node present in a binary tree
function findLevel(root: TreeNode | null, node: TreeNode, level: number): number {

    // base case
    if (root === null) {
        return INT_MIN;
    }

    // return level if the node is found
    if (root === node) {
        return level;
    }

    // search node in the left subtree
    const left = findLevel(root.left, node, level + 1);

    // if the node is found in the left subtree, return the left child
    if (left !== INT_MIN) {
        return left;
    }

    // otherwise, continue the search in the right subtree
    return findLevel(root.right, node, level + 1);
}

// Function to find the lowest common ancestor of given nodes `x` and `y`,
// where both `x` and `y` are present in a binary tree.
function findLCA(root: TreeNode | null, x: TreeNode, y: TreeNode): TreeNode | null {

    // base case 1: if the tree is empty
    if (root === null) {
        return null;
    }

    // base case 2: if either `x` or `y` is found
    if (root === x || root === y) {
        return root;
    }

    // recursively check if `x` or `y` exists in the left subtree
    const left = findLCA(root.left, x, y);

    // recursively check if `x` or `y` exists in the right subtree
    const right = findLCA(root.right, x, y);

    // if `x` is found in one subtree and `y` is found in the other subtree,
    // update lca to the current node
    if (left && right) {
        return root;
    }

    // if `x` and `y` exist in the left subtree
    if (left) {
        return left;
    }

    // if `x` and `y` exist in the right subtree
    if (right) {
        return right;
    }

    return null;
}

// Function to find the distance between node `x` and node `y` in a
// given binary tree rooted at `root` node
function findDistance(root: TreeNode | null, x: TreeNode, y: TreeNode): number {

    // `lca` stores the lowest common ancestor of `x` and `y`
    let lca: TreeNode | null = null;

    // call LCA procedure only if both `x` and `y` are present in the tree
    if (isNodePresent(root, y) && isNodePresent(root, x)) {
        lca = findLCA(root, x, y);
    }
    else {
        return INT_MIN;
    }

    // return distance of `x` from lca + distance of `y` from lca
    return findLevel(lca, x, 0) + findLevel(lca, y, 0);

    /*
        The above statement is equivalent to the following:

        return findLevel(root, x, 0) + findLevel(root, y, 0) -
                2*findLevel(root, lca, 0);

        We can avoid calling the `isNodePresent()` function by using
        return values of the `findLevel()` function to check if
        `x` and `y` are present in the tree or not.
    */
}

/* Construct the following tree
      1
    /   \
   /     \
  2       3
   \     / \
    4   5   6
       /     \
      7       8
*/

const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.right = new TreeNode(4);
root.right.left = new TreeNode(5);
root.right.right = new TreeNode(6);
root.right.left.left = new TreeNode(7);
root.right.right.right = new TreeNode(8);

// find the distance between node 7 and node 6
console.log(findDistance(root, root.right.left.left, root.right.right));
```

**Output:** 3

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the binary tree. The program requires O(h) extra space for the call stack, where `h` is the height of the tree.

Also See:

> [Find the Lowest Common Ancestor (LCA) of two nodes in a binary tree](https://www.techiedelight.com/find-lowest-common-ancestor-lca-two-nodes-binary-tree/ "Find the Lowest Common Ancestor \(LCA\) of two nodes in a binary tree")

> [Print cousins of a given node in a binary tree](https://www.techiedelight.com/print-cousins-of-given-node-binary-tree/ "Print cousins of a given node in a binary tree")

> [Find all nodes at a given distance from leaf nodes in a binary tree](https://www.techiedelight.com/find-all-nodes-at-given-distance-from-leaf-nodes-in-a-binary-tree/ "Find all nodes at a given distance from leaf nodes in a binary tree")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.78/5. Vote count: 163

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hard](https://www.techiedelight.com/Tags/hard/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
