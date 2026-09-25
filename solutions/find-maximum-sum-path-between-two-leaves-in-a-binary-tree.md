# Find the maximum sum path between two leaves in a binary tree

> Source: https://www.techiedelight.com/find-maximum-sum-path-between-two-leaves-in-a-binary-tree/

[Binary Tree](https://www.techiedelight.com/Category/Trees/Binary-Tree/)

Given a binary tree, write an efficient algorithm to find the maximum sum of a path between any two leaves in it. Assume that the binary tree is not skewed and contains at-least two nodes.

For example, the maximum sum path in the following binary tree is 22:

> 

A simple solution would be to calculate the maximum sum node-to-leaf path from the left and right child for every node in the tree. The maximum sum path between two leaves that passes through a node has a value equal to the maximum sum node-to-leaf path of its left and right child plus the node’s value. Finally, consider the maximum value among all maximum sum paths found for every node in the tree.

The time complexity of this solution is O(n2) as there are `n` nodes in the tree, and for every node, we are calculating the maximum sum node-to-leaf path of its left and right subtree that takes O(n) time.

We can solve this problem in linear time by traversing the tree in a bottom-up manner. Instead of calculating the maximum sum node-to-leaf path of the left and right child for every node in the tree, calculate the maximum sum path between two leaves that passes through a node in constant time. The idea is to start from the bottom of the tree and return the maximum sum node-to-leaf path for each node to its parent.

The algorithm can be implemented as follows in TypeScript. Here, we pass the maximum sum path by reference to the function (instead of returning it) and update its value within the function itself using the return value of the left and right subtrees.

**Output:** 22

```ts
// A class to store a binary tree node
class TreeNode {
    data: number;
    left: TreeNode | null = null;
    right: TreeNode | null = null;
    constructor(data: number, left: TreeNode | null = null, right: TreeNode | null = null) {}
}

// Recursive function to find the maximum sum path between two leaves
// in a binary tree
function findMaxSumPath(root: TreeNode | null, max_sum: { value: number }): number {

    // base case: empty tree
    if (root === null) {
        return 0;
    }

    // find the maximum sum node-to-leaf path starting from the left child
    const left = findMaxSumPath(root.left, max_sum);

    // find the maximum sum node-to-leaf path starting from the right child
    const right = findMaxSumPath(root.right, max_sum);

    // it is important to return the maximum sum node-to-leaf path starting from the
    // current node

    // case 1: left child is null
    if (root.left === null) {
        return right + root.data;
    }

    // case 2: right child is null
    if (root.right === null) {
        return left + root.data;
    }

    // find the maximum sum path "through" the current node
    const cur_sum = left + right + root.data;

    // update the maximum sum path found so far (Note that maximum sum path
    // "excluding" the current node in the subtree rooted at the current node
    // is already updated as we are doing postorder traversal)

    max_sum.value = Math.max(cur_sum, max_sum.value);

    // case 3: both left and right child exists
    return Math.max(left, right) + root.data;
}

/* Construct the following tree
      1
    /   \
   /     \
  2       3
   \     / \
   -4   5   6
       / \
      7   8
*/

const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.right = new TreeNode(-4);
root.right.left = new TreeNode(5);
root.right.right = new TreeNode(6);
root.right.left.left = new TreeNode(7);
root.right.left.right = new TreeNode(8);

const max_sum = { value: -Infinity };
findMaxSumPath(root, max_sum);
console.log(max_sum.value);
```

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the binary tree. The program requires O(h) extra space for the call stack, where `h` is the height of the tree.

Also See:

> [Find maximum sum root to leaf path in a binary tree](https://www.techiedelight.com/find-maximum-sum-root-to-leaf-path-binary-tree/ "Find maximum sum root to leaf path in a binary tree")

> [Maximum path sum in a binary tree](https://www.techiedelight.com/maximum-path-sum-binary-tree/ "Maximum path sum in a binary tree")

> [Truncate a binary tree to remove nodes that lie on a path having a sum less than `k`](https://www.techiedelight.com/truncate-given-binary-tree-remove-nodes-lie-path-sum-less-k/ "Truncate a binary tree to remove nodes that lie on a path having a sum less than `k`")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.74/5. Vote count: 65

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hard](https://www.techiedelight.com/Tags/hard/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
