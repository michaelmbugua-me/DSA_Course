# Check if a binary tree is symmetric or not

> Source: https://www.techiedelight.com/check-given-binary-tree-symmetric-structure-not/

[Binary Tree](https://www.techiedelight.com/Category/Trees/Binary-Tree/)

Given a binary tree, write an efficient algorithm to check if it has a symmetric structure or not, i.e., left and right subtree mirror each other.

For example, the following are some binary trees that have a symmetric structure:

> 

The tree has a symmetric structure if the left and right subtree mirror each other. Two trees mirror each other if all the following conditions are satisfied:

  * Both trees are empty, or both are non-empty.
  * The left subtree is the mirror of the right subtree.
  * The right subtree is the mirror of the left subtree.

We can quickly check this using recursion. Following is a TypeScript implementation of the idea:

```ts
// A class to store a binary tree node
class TreeNode {
    data: number;
    left: TreeNode | null = null;
    right: TreeNode | null = null;
    constructor(data: number, left: TreeNode | null = null, right: TreeNode | null = null) {}
}

// Function to check if subtree rooted at `X` and `Y` mirror each other
const isMirror = (X: TreeNode | null, Y: TreeNode | null): boolean => {

    // base case: if both trees are empty
    if (X === null && Y === null) {
        return true;
    }

    // return true if
    // 1. Both trees are non-empty, and
    // 2. The left subtree is the mirror of the right subtree, and
    // 3. The right subtree is the mirror of the left subtree
    return (X !== null && Y !== null) &&
        isMirror(X.left, Y.right) &&
        isMirror(X.right, Y.left);
};

// Function to check if a given binary tree has a symmetric structure or not
const isSymmetricTree = (root: TreeNode | null): boolean => {

    // base case
    if (root === null) {
        return true;
    }

    // return true if left and right subtree mirror each other
    return isMirror(root.left, root.right);
};

/* Construct the following tree
      1
    /   \
   /     \
  2       3
   \     /
    5   6
*/

const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.right = new TreeNode(4);
root.right.left = new TreeNode(5);

if (isSymmetricTree(root)) {
    console.log('The binary tree is symmetric');
}
else {
    console.log('The binary tree is not symmetric');
}
```

**Output:** The binary tree is symmetric

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the binary tree. The program requires O(h) extra space for the call stack, where `h` is the height of the tree.

### Alternate Approach

We can also check for symmetric structure by converting either the left subtree or the right subtree to their mirror and then check if both left and right subtrees have identical structures or not. The time complexity of this approach remains O(n), but it modifies the tree structure. We can restore the tree to its original structure by again taking a mirror of the corresponding left or right subtree.

**Exercise:** Extend the solution to check for symmetric content along with symmetric structure.

Also See:

> [Convert a binary tree to its mirror](https://www.techiedelight.com/convert-binary-tree-to-its-mirror/ "Convert a binary tree to its mirror")

> [Check if a binary tree is a sum tree or not](https://www.techiedelight.com/check-given-binary-tree-sum-tree-not/ "Check if a binary tree is a sum tree or not")

> [Check children-sum property in a binary tree](https://www.techiedelight.com/check-children-sum-property-binary-tree/ "Check children-sum property in a binary tree")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.86/5. Vote count: 164

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Easy](https://www.techiedelight.com/Tags/easy/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
