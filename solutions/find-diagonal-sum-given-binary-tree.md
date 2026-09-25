# Find the diagonal sum of a binary tree

> Source: https://www.techiedelight.com/find-diagonal-sum-given-binary-tree/

[Binary Tree](https://www.techiedelight.com/Category/Trees/Binary-Tree/)

Given a binary tree, calculate the sum of all nodes for each diagonal having negative slope `\`. Assume that the left and right child of a node makes a 45–degree angle with the parent.

For example, consider the following binary tree having three diagonals. The sum of diagonals is 10, 15, and 11.

> 

We can easily solve this problem with the help of [hashing](https://techiedelight.com/hashing-in-data-structure/). The idea is to create an empty map where each key in the map represents a diagonal in the binary tree, and its value maintains the sum of all nodes present in the diagonal. Then perform a [preorder traversal](https://techiedelight.com/preorder-tree-traversal-iterative-recursive/) on the tree and update the map. For each node, recur for its left subtree by increasing the diagonal by one and recur for the right subtree with the same diagonal.

This approach is demonstrated below in TypeScript:

```ts
class TreeNode {
    val: number;
    left: TreeNode | null = null;
    right: TreeNode | null = null;
    constructor(val: number, left: TreeNode | null = null, right: TreeNode | null = null) {}
}

// Recursive function to perform preorder traversal on the tree and
// fill the map with the diagonal sum of elements
function diagonalSum(root: TreeNode | null, diagonal: number, d: Map<number, number>): void {

    // base case: empty tree
    if (root === null) {
        return;
    }

    // update the current diagonal with the node's value
    d.set(diagonal, (d.get(diagonal) || 0) + root.val);

    // recur for the left subtree by increasing diagonal by 1
    diagonalSum(root.left, diagonal + 1, d);

    // recur for the right subtree with the same diagonal
    diagonalSum(root.right, diagonal, d);
}

// Function to print the diagonal sum of a given binary tree
function printDiagonalSum(root: TreeNode | null): void {

    // create an empty map to store the diagonal sum for every slope
    const d = new Map<number, number>();

    // traverse the tree in a preorder fashion and fill the map
    diagonalSum(root, 0, d);

    // print the diagonal sum
    console.log([...d.values()]);
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

printDiagonalSum(root);
```

**Output:** 10 15 11

##

The time complexity of the above solution is O(n) and requires O(n) extra space, where `n` is the size of the binary tree.

**Exercise:**

1\. [Extend the solution to print nodes of every diagonal](https://techiedelight.com/print-diagonal-traversal-binary-tree/).

2\. Modify the solution to print the diagonal sum for diagonals having a positive slope `/`.

Also See:

> [Print diagonal traversal of a binary tree](https://www.techiedelight.com/print-diagonal-traversal-binary-tree/ "Print diagonal traversal of a binary tree")

> [In-place convert a binary tree to its sum tree](https://www.techiedelight.com/inplace-convert-a-tree-sum-tree/ "In-place convert a binary tree to its sum tree")

> [Fix children-sum property in a binary tree](https://www.techiedelight.com/fix-children-sum-property-binary-tree/ "Fix children-sum property in a binary tree")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.93/5. Vote count: 179

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Depth-first search](https://www.techiedelight.com/Tags/DFS/), [Hashing](https://www.techiedelight.com/Tags/Hashing/), [Medium](https://www.techiedelight.com/Tags/medium/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
