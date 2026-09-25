# Truncate a binary tree to remove nodes that lie on a path having a sum less than `k`

> Source: https://www.techiedelight.com/truncate-given-binary-tree-remove-nodes-lie-path-sum-less-k/

[Binary Tree](https://www.techiedelight.com/Category/Trees/Binary-Tree/)

Given a binary tree and a number `k`, remove nodes from the tree which lie on a complete path having a sum less than `k`. A complete path in a binary tree is defined as a path from the root to a leaf. The sum of all nodes on that path is defined as the sum of that path.

A node can be part of multiple paths. So, we have to delete it only if all paths from it have a sum less than `k`. For example, consider the binary tree shown on the left below. Convert it into the binary tree shown on the right. Note that the deletion should be done in a bottom-up manner until the path has a root-to-leaf sum greater than or equal to `k`.

> 

The problem might look complex at first look, but its solution is simple. The idea is to traverse the tree in a [bottom-up fashion](https://techiedelight.com/postorder-tree-traversal-iterative-recursive/) and truncate the left and right subtree before processing its parent. Since we are doing a postorder traversal, the subtree rooted at the current node may be truncated, and the current node becomes a leaf node now. So, for each node, check

  * If the sum of nodes in the path from the root node to the current node is more than or equal to `k`, nothing needs to be done.
  * If it is a leaf node and its path from the root node has a sum less than `k`, remove it.

Following is a TypeScript implementation based on the above idea:

```ts
// A class to store a binary tree node
class TreeNode {
    data: number;
    left: TreeNode | null = null;
    right: TreeNode | null = null;
    constructor(data: number, left: TreeNode | null = null, right: TreeNode | null = null) {}
}

// Function to perform inorder traversal on the tree
function inorder(root: TreeNode | null): void {
    if (root === null) {
        return;
    }

    inorder(root.left);
    process.stdout.write(root.data + ' ');
    inorder(root.right);
}

// Function to check if a given node is a leaf node or not
function isLeaf(node: TreeNode): boolean {
    return node.left === null && node.right === null;
}

// Function to truncate a given binary tree to remove nodes which lie on
// a path having sum less than `k`
function truncate(curr: TreeNode | null, k: number, target = 0): TreeNode | null {
    // base case: empty tree
    if (curr === null) {
        return null;
    }

    // update sum of nodes in the path from the root node to the current node
    target = target + curr.data;

    // Recursively truncate left and right subtrees
    curr.left = truncate(curr.left, k, target);
    curr.right = truncate(curr.right, k, target);

    // Since we are doing postorder traversal, the subtree rooted at the current
    // node may be already truncated, and the current node is a leaf

    // if the current node is a leaf node and its path from the root node has a sum
    // less than the required sum, remove it
    if (target < k && isLeaf(curr)) {
        // set current node as null
        return null;
    }

    return curr;
}

/*
 Construct the following tree
          6
        /   \
       /     \
      3       8
            /   \
           /     \
          4       2
        /   \      \
       /     \      \
      1       7      3
 */

let root: TreeNode | null = new TreeNode(6);
root.left = new TreeNode(3);
root.right = new TreeNode(8);
root.right.left = new TreeNode(4);
root.right.right = new TreeNode(2);
root.right.left.left = new TreeNode(1);
root.right.left.right = new TreeNode(7);
root.right.right.right = new TreeNode(3);

const k = 20;
root = truncate(root, k);
inorder(root);
```

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the binary tree. The program requires O(h) extra space for the call stack, where `h` is the height of the tree.

Also See:

> [Convert a binary tree to a full tree by removing half nodes](https://www.techiedelight.com/convert-given-binary-tree-to-full-tree-removing-half-nodes/ "Convert a binary tree to a full tree by removing half nodes")

> [Find maximum sum root to leaf path in a binary tree](https://www.techiedelight.com/find-maximum-sum-root-to-leaf-path-binary-tree/ "Find maximum sum root to leaf path in a binary tree")

> [Set next pointer to the inorder successor of all nodes in a binary tree](https://www.techiedelight.com/set-next-pointer-inorder-successor-binary-tree/ "Set next pointer to the inorder successor of all nodes in a binary tree")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.89/5. Vote count: 227

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Depth-first search](https://www.techiedelight.com/Tags/DFS/), [Medium](https://www.techiedelight.com/Tags/medium/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
