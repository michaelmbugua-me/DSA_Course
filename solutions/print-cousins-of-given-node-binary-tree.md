# Print cousins of a given node in a binary tree

> Source: https://www.techiedelight.com/print-cousins-of-given-node-binary-tree/

[Binary Tree](https://www.techiedelight.com/Category/Trees/Binary-Tree/)

Given a binary tree, print all cousins of a given node. Two nodes of a binary tree are cousins of each other only if they have different parents, but they are at the same level.

For example, consider the following tree:

6, 7 are cousins of node 4 or 5 4, 5 are cousins of node 6 or 7

> 

The idea is to find the level of the given node in the binary tree by doing a [preorder traversal](https://techiedelight.com/preorder-tree-traversal-iterative-recursive/) on it. Once the level is found, print all nodes present in that level, which is not a sibling of the node or the node itself. Following is the implementation of the above approach in TypeScript:

```ts
// A class to store a binary tree node
class TreeNode {
    key: number;
    left: TreeNode | null = null;
    right: TreeNode | null = null;
    constructor(key: number, left: TreeNode | null = null, right: TreeNode | null = null) {
        this.key = key;
        this.left = left;
        this.right = right;
    }
}

// Function to find the level of the given node `x`
function findLevel(root: TreeNode | null, x: TreeNode, index = 1, level = 0): number {

    // return if the tree is empty or level is already found
    if (root === null || level !== 0) {
        return level;
    }

    // if the given node is found, update its level
    if (root === x) {
        level = index;
    }

    // recur for the left and right subtree
    level = findLevel(root.left, x, index + 1, level);
    level = findLevel(root.right, x, index + 1, level);

    return level;
}

function printLevel(root: TreeNode | null, node: TreeNode, level: number): void {

    // base case
    if (root === null) {
        return;
    }

    // print cousins
    if (level === 1) {
        process.stdout.write(root.key + ' ');
        return;
    }

    // recur for the left and right subtree if the given node
    // is not a child of the root
    if (!((root.left !== null && root.left === node) ||
            (root.right !== null && root.right === node))) {
        printLevel(root.left, node, level - 1);
        printLevel(root.right, node, level - 1);
    }
}

// Function to print all cousins of a given node
function printAllCousins(root: TreeNode | null, node: TreeNode): void {

    // base case
    if (root === null || root === node) {
        return;
    }

    // find the level of the given node
    const level = findLevel(root, node);

    // print all cousins of the given node using its level number
    printLevel(root, node, level);
}

/* Construct the following tree
         1
       /   \
      2     3
     / \   / \
    4   5 6   7
*/

const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);
root.right.left = new TreeNode(6);
root.right.right = new TreeNode(7);

printAllCousins(root, root.right.left);
```

**Output:** 4 5

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the binary tree. The program requires O(h) extra space for the call stack, where `h` is the height of the tree.

Also See:

> [Determine whether the given binary tree nodes are cousins of each other](https://www.techiedelight.com/determine-two-nodes-are-cousins/ "Determine whether the given binary tree nodes are cousins of each other")

> [Find distance between given pairs of nodes in a binary tree](https://www.techiedelight.com/distance-between-given-pairs-of-nodes-binary-tree/ "Find distance between given pairs of nodes in a binary tree")

> [Level order traversal of a binary tree](https://www.techiedelight.com/level-order-traversal-binary-tree/ "Level order traversal of a binary tree")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.9/5. Vote count: 170

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Depth-first search](https://www.techiedelight.com/Tags/DFS/), [Medium](https://www.techiedelight.com/Tags/medium/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
