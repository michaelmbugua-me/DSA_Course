# Find difference between sum of all nodes present at odd and even levels in a binary tree

> Source: https://www.techiedelight.com/difference-between-sum-nodes-odd-even-levels/

[Binary Tree](https://www.techiedelight.com/Category/Trees/Binary-Tree/)

Given a binary tree, calculate the difference between the sum of all nodes present at odd levels and the sum of all nodes present at even level.

For example, consider the following binary tree. The required difference is:

`(1 + 4 + 5 + 6) - (2 + 3 + 7 + 8) = -4`

> 

The idea is to traverse the tree and pass the level of each node in recursion. We also pass a variable to store the required difference. If the node’s level is odd, increase the difference by the node’s value; otherwise, decrease the difference by the same amount. At the end of the recursion, the variable will contain the required difference.

Following is a TypeScript program that demonstrates it:

```ts
// A class to store a binary tree node
class TreeNode {
    constructor(public val: number, public left: TreeNode | null = null, public right: TreeNode | null = null) {}
}

// Function to calculate the difference between the sum of all nodes present
// at odd levels and the sum of all nodes present at even level
function findDiff(root: TreeNode | null, diff = 0, level = 1): number {

    // base case
    if (root === null) {
        return diff;
    }

    // if the current level is odd
    if (level % 2 === 1) {
        diff = diff + root.val;
    }
    // if the current level is even
    else {
        diff = diff - root.val;
    }

    // recur for the left and right subtree
    diff = findDiff(root.left, diff, level + 1);
    diff = findDiff(root.right, diff, level + 1);

    return diff;
}

/* Construct the following tree
          1
        /   \
       /     \
      2       3
     /      /  \
    /      /    \
   4      5      6
         / \
        /   \
       7     8
*/

const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.right.left = new TreeNode(5);
root.right.right = new TreeNode(6);
root.right.left.left = new TreeNode(7);
root.right.left.right = new TreeNode(8);

console.log(findDiff(root));
```

**Output:** -4

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the binary tree. The auxiliary space required by the program is O(h) for the call stack, where `h` is the height of the tree.

Also See:

> [Efficiently print all nodes between two given levels in a binary tree](https://www.techiedelight.com/print-nodes-between-two-levels-binary-tree/ "Efficiently print all nodes between two given levels in a binary tree")

> [Find the maximum difference between a node and its descendants in a binary tree](https://www.techiedelight.com/find-maximum-difference-node-descendants/ "Find the maximum difference between a node and its descendants in a binary tree")

> [Fix children-sum property in a binary tree](https://www.techiedelight.com/fix-children-sum-property-binary-tree/ "Fix children-sum property in a binary tree")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.83/5. Vote count: 186

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Easy](https://www.techiedelight.com/Tags/easy/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
