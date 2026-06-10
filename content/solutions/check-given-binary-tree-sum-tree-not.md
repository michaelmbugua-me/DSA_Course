# Check if a binary tree is a sum tree or not

> Source: https://www.techiedelight.com/check-given-binary-tree-sum-tree-not/

[Binary Tree](https://www.techiedelight.com/Category/Trees/Binary-Tree/)

Given a binary tree, check if it is a sum tree or not. In a sum tree, each non-leaf node’s value is equal to the sum of all elements present in its left and right subtree. The value of a leaf node can be anything and the value of an empty child node is considered to be 0.

For example, the following binary tree is a sum tree.

> 

We can easily solve this problem by using [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/). The idea is to traverse the tree in a [postorder fashion](https://techiedelight.com/postorder-tree-traversal-iterative-recursive/). For each non-leaf node, check if the node’s value is equal to the sum of all elements present in its left and right subtree. If this relation does not hold for any node, then the given binary tree cannot be a sum tree.

The algorithm can be implemented as follows in TypeScript:

```ts
// A class to store a binary tree node
class TreeNode {
    key: number;
    left: TreeNode | null;
    right: TreeNode | null;
    constructor(key: number, left: TreeNode | null = null, right: TreeNode | null = null) {
        this.key = key;
        this.left = left;
        this.right = right;
    }
}

// Recursive function to check if a given binary tree is a sum tree or not
const isSumTree = (root: TreeNode | null): number => {

    // base case: empty tree
    if (root === null) {
        return 0;
    }

    // special case: leaf node
    if (root.left === null && root.right === null) {
        return root.key;
    }

    const left = isSumTree(root.left);
    const right = isSumTree(root.right);

    // if the root's value is equal to the sum of all elements present in its
    // left and right subtree
    if (left !== Number.MIN_SAFE_INTEGER && right !== Number.MIN_SAFE_INTEGER &&
            root.key === left + right) {
        return 2 * root.key;
    }

    return Number.MIN_SAFE_INTEGER;
};

/* Construct the following tree
         44
        /  \
       /    \
      9     13
     / \    / \
    4   5  6   7
*/

const root = new TreeNode(44);
root.left = new TreeNode(9);
root.right = new TreeNode(13);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);
root.right.left = new TreeNode(6);
root.right.right = new TreeNode(7);

if (isSumTree(root) !== Number.MIN_SAFE_INTEGER) {
    console.log('Binary tree is a sum tree');
}
else {
    console.log('Binary tree is not a sum tree');
}
```

**Output:** Binary tree is a sum tree

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the binary tree. The program requires O(h) extra space for the call stack, where `h` is the height of the tree.

Also See:

> [Check children-sum property in a binary tree](https://www.techiedelight.com/check-children-sum-property-binary-tree/ "Check children-sum property in a binary tree")

> [Find maximum sum root to leaf path in a binary tree](https://www.techiedelight.com/find-maximum-sum-root-to-leaf-path-binary-tree/ "Find maximum sum root to leaf path in a binary tree")

> [Truncate a binary tree to remove nodes that lie on a path having a sum less than `k`](https://www.techiedelight.com/truncate-given-binary-tree-remove-nodes-lie-path-sum-less-k/ "Truncate a binary tree to remove nodes that lie on a path having a sum less than `k`")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.73/5. Vote count: 267

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Depth-first search](https://www.techiedelight.com/Tags/DFS/), [Medium](https://www.techiedelight.com/Tags/medium/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
