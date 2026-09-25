# Find maximum sum root to leaf path in a binary tree

> Source: https://www.techiedelight.com/find-maximum-sum-root-to-leaf-path-binary-tree/

[Binary Tree](https://www.techiedelight.com/Category/Trees/Binary-Tree/)

Given a binary tree, write an efficient algorithm to find the maximum sum root-to-leaf path, i.e., the maximum sum path from the root node to any leaf node in it.

For example, consider the following tree. The maximum sum is 18, and the maximum sum path is `[1, 3, 5, 9]`.

> 

The problem can be divided further into two subproblems:

  1. Calculate the maximum sum from the root node to any leaf node in a binary tree.
  2. Print root-to-leaf path having maximum sum in a binary tree.

We can solve both problems in linear time by traversing the tree in a bottom-up manner ([postorder fashion](https://techiedelight.com/postorder-tree-traversal-iterative-recursive/)). Following is a simple TypeScript implementation based on the idea:

**Output:** The maximum sum is 18 The maximum sum path is 9 5 3 1

```ts
// A class to store a binary tree node
class TreeNode {
    constructor(public data: number,
                public left: TreeNode | null = null,
                public right: TreeNode | null = null) {}
}

// Function to print the root-to-leaf path with a given sum in a binary tree
function printPath(root: TreeNode | null, total: number): boolean {

    // base case
    if (total === 0 && root === null) {
        return true;
    }

    // base case
    if (root === null) {
        return false;
    }

    // recur for the left and right subtree with reduced sum
    const left = printPath(root.left, total - root.data);

    let right = false;
    if (!left) {
        right = printPath(root.right, total - root.data);
    }

    // print the current node if it lies on a path with a given sum
    if (left || right) {
        process.stdout.write(`${root.data} `);
    }

    return left || right;
}

// Function to calculate the maximum root-to-leaf sum in a binary tree
function getRootToLeafSum(root: TreeNode | null): number {

    // base case: tree is empty
    if (root === null) {
        return -Infinity;
    }

    // base case: current node is a leaf node
    if (root.left === null && root.right === null) {
        return root.data;
    }

    // calculate the maximum node-to-leaf sum for the left child
    const left = getRootToLeafSum(root.left);

    // calculate the maximum node-to-leaf sum for the right child
    const right = getRootToLeafSum(root.right);

    // consider the maximum sum child
    return (left > right ? left : right) + root.data;
}

// Function to print maximum sum root-to-leaf path in a given binary tree
function findMaxSumPath(root: TreeNode | null): void {

    const total = getRootToLeafSum(root);
    console.log(`The maximum sum is ${total}`);
    process.stdout.write('The maximum sum path is ');

    printPath(root, total);
}

/* Construct the following tree
          1
        /   \
       /     \
      2       3
     / \     / \
    8   4   5   6
       /   / \   \
     10   7   9   5
*/

const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(8);
root.left.right = new TreeNode(4);
root.right.left = new TreeNode(5);
root.right.right = new TreeNode(6);
root.left.right.left = new TreeNode(10);
root.right.left.left = new TreeNode(7);
root.right.left.right = new TreeNode(9);
root.right.right.right = new TreeNode(5);

findMaxSumPath(root);
```

The time complexity of the above solution is O(n) and requires O(n) extra space, where `n` is the size of the binary tree.

Also See:

> [Find the maximum sum path between two leaves in a binary tree](https://www.techiedelight.com/find-maximum-sum-path-between-two-leaves-in-a-binary-tree/ "Find the maximum sum path between two leaves in a binary tree")

> [Maximum path sum in a binary tree](https://www.techiedelight.com/maximum-path-sum-binary-tree/ "Maximum path sum in a binary tree")

> [Calculate sum of root to leaf digits in a binary tree](https://www.techiedelight.com/calculate-sum-root-to-leaf-digits/ "Calculate sum of root to leaf digits in a binary tree")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.65/5. Vote count: 168

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Depth-first search](https://www.techiedelight.com/Tags/DFS/), [Medium](https://www.techiedelight.com/Tags/medium/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
