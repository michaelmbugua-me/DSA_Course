# Determine whether a binary tree is a subtree of another binary tree

> Source: https://www.techiedelight.com/determine-given-binary-tree-is-subtree-of-another-binary-tree-not/

[Binary Tree](https://www.techiedelight.com/Category/Trees/Binary-Tree/)

Given a binary tree, determine whether it is a subtree of another binary tree. A subtree of a tree `T` is a tree consisting of a node in `T` and all of its descendants in `T`.

For example, the second tree is a subtree of the first tree.

> 

A naive solution would be to check if every subtree rooted at every node in the first tree is identical to the second tree or not. The time complexity of this solution is O(m.n), where `n` is the size of the first tree and `m` is the size of the second tree.

Also, we know that [inorder](https://techiedelight.com/inorder-tree-traversal-iterative-recursive/) and [preorder](https://techiedelight.com/preorder-tree-traversal-iterative-recursive/) traversal, or inorder and [postorder](https://techiedelight.com/postorder-tree-traversal-iterative-recursive/) traversal identify a tree uniquely. The idea is to store inorder and postorder traversal of both trees in separate arrays. Then for a given binary tree `X` to be a subset of another binary tree `Y`, the inorder traversal of `X` should be a subset of the inorder traversal of `Y`. Similarly, the postorder traversal of `X` should be a subset of the postorder traversal of `Y`. We can also perform preorder instead of the postorder traversal. For example, consider the above trees:

inorder(X) = {4, 2, 5, 1, 6, 3, 7} inorder(Y) = {6, 3, 7} postorder(X) = {4, 5, 2, 6, 7, 3, 1} postorder(Y) = {6, 7, 3}

Since `inorder(Y)` is a subset of `inorder(X)`, and `postorder(Y)` is a subset of `postorder(X)`, we can say that `Y` is a subtree of `X`. The algorithm can be implemented as follows in TypeScript:

```ts
// A class to store a binary tree node
class TreeNode {
  data: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(data: number, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.data = data;
  }
}

// Function to store inorder traversal on the tree in a list
function inorder(node: TreeNode | null, list: number[]): void {
  if (node === null) {
    return;
  }

  inorder(node.left, list);
  list.push(node.data);
  inorder(node.right, list);
}

// Function to store postorder traversal on the tree in a list
function postorder(node: TreeNode | null, list: number[]): void {
  if (node === null) {
    return;
  }

  postorder(node.left, list);
  postorder(node.right, list);
  list.push(node.data);
}

// Utility function to check if y is sublist of x or not
function isSublist(x: number[], y: number[]): boolean {
  for (let i = 0; i <= x.length - y.length; i++) {
    if (JSON.stringify(x.slice(i, i + y.length)) === JSON.stringify(y)) {
      return true;
    }
  }
  return false;
}

// Function to check if a given binary tree is a subtree of another
// binary tree or not
function checkSubtree(tree: TreeNode | null, subtree: TreeNode | null): boolean {
  // base case: both trees are the same
  if (tree === subtree) {
    return true;
  }

  // base case: if the first tree is empty but the second tree is non-empty
  if (tree === null) {
    return false;
  }

  // store the inorder traversal of both trees in `first` and `second`, respectively
  let first: number[] = [];
  let second: number[] = [];

  inorder(tree, first);
  inorder(subtree, second);

  // return false if the second list is not a sublist of the first list
  if (!isSublist(first, second)) {
    return false;
  }

  // reset both lists
  first = [];
  second = [];

  // Now store postorder traversal of both trees in `first` and `second`, respectively
  postorder(tree, first);
  postorder(subtree, second);

  // return false if the second list is not a sublist of the first list
  if (!isSublist(first, second)) {
    return false;
  }

  return true;
}

/* Construct the following tree
          1
        /   \
       /     \
      2       3
     / \     / \
    4   5   6   7
*/

const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);
root.right.left = new TreeNode(6);
root.right.right = new TreeNode(7);

if (checkSubtree(root, root.right)) {
  console.log("Yes");
} else {
  console.log("No");
}
```

The time complexity of the above solution is O(n2), where `n` is the total number of nodes in the binary tree. The auxiliary space required by the program is O(n).

Also See:

> [Convert a binary tree to a full tree by removing half nodes](https://www.techiedelight.com/convert-given-binary-tree-to-full-tree-removing-half-nodes/ "Convert a binary tree to a full tree by removing half nodes")

> [Construct a full binary tree from a preorder and postorder sequence](https://www.techiedelight.com/construct-full-binary-tree-from-preorder-postorder-sequence/ "Construct a full binary tree from a preorder and postorder sequence")

> [Determine whether the given binary tree nodes are cousins of each other](https://www.techiedelight.com/determine-two-nodes-are-cousins/ "Determine whether the given binary tree nodes are cousins of each other")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.85/5. Vote count: 178

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Depth-first search](https://www.techiedelight.com/Tags/DFS/), [Medium](https://www.techiedelight.com/Tags/medium/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
