# Check if a binary tree is height-balanced or not

> Source: https://www.techiedelight.com/check-given-binary-tree-is-height-balanced-not/

[Binary Tree](https://www.techiedelight.com/Category/Trees/Binary-Tree/)

Given a binary tree, write an efficient algorithm to check if it is height-balanced or not. In a height-balanced tree, the absolute difference between the height of the left and right subtree for every node is 0 or 1.

For example,

> 

A simple solution would be to calculate the height of the left and right subtree for each node in the tree. If for any node, the absolute difference between the height of its left and right subtree is more than 1, the tree is unbalanced. The time complexity of this solution is O(n2) as there are `n` nodes in the tree, and for every node, we are calculating the height of its left and right subtree that takes O(n) time.

We can solve this problem in linear time by doing a [postorder traversal](https://techiedelight.com/postorder-tree-traversal-iterative-recursive/) on the tree. Instead of calculating the height of the left and right subtree for every tree node, we can get the height in constant time. The idea is to start from the bottom of the tree and return the height of the subtree rooted at the given node to its parent. The height of a subtree rooted at any node is one more than the maximum height of the left subtree or the right subtree.

The algorithm can be implemented as follows in TypeScript:

```ts
// A class to store a binary tree node
class TreeNode {
    key: number;
    left: TreeNode | null = null;
    right: TreeNode | null = null;
    constructor(key: number, left: TreeNode | null = null, right: TreeNode | null = null) {}
}

// Recursive function to check if a given binary tree is height-balanced or not
const isHeightBalanced = (root: TreeNode | null, isBalanced: { value: boolean }): number => {

    // base case: tree is empty or not balanced
    if (root === null || !isBalanced.value) {
        return 0;
    }

    // get the height of the left subtree
    const left_height = isHeightBalanced(root.left, isBalanced);

    // get the height of the right subtree
    const right_height = isHeightBalanced(root.right, isBalanced);

    // tree is unbalanced if the absolute difference between the height of
    // its left and right subtree is more than 1
    if (Math.abs(left_height - right_height) > 1) {
        isBalanced.value = false;
    }

    // return height of subtree rooted at the current node
    return Math.max(left_height, right_height) + 1;
};

// The main function to check if a given binary tree is height-balanced or not
const checkHeightBalanced = (root: TreeNode | null): boolean => {
    const isBalanced = { value: true };
    isHeightBalanced(root, isBalanced);

    return isBalanced.value;
};

/* Construct the following tree
          1
        /   \
       /     \
      2       3
     / \     /
    4   5   6
*/

const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);
root.right.left = new TreeNode(6);

if (checkHeightBalanced(root)) {
    console.log('Binary tree is balanced');
}
else {
    console.log('Binary tree is not balanced');
}
```

**Output:** Binary tree is balanced

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the binary tree. The auxiliary space required by the program is O(h) for call stack, where `h` is the height of the tree.

Also See:

> [Determine if a binary tree satisfies the height-balanced property of a red–black tree](https://www.techiedelight.com/determine-binary-tree-satisfy-height-balanced-property-red-black-tree/ "Determine if a binary tree satisfies the height-balanced property of a red–black tree")

> [Find the diameter of a binary tree](https://www.techiedelight.com/find-diameter-of-a-binary-tree/ "Find the diameter of a binary tree")

> [Check if a binary tree is symmetric or not](https://www.techiedelight.com/check-given-binary-tree-symmetric-structure-not/ "Check if a binary tree is symmetric or not")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.55/5. Vote count: 178

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Depth-first search](https://www.techiedelight.com/Tags/DFS/), [Medium](https://www.techiedelight.com/Tags/medium/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
