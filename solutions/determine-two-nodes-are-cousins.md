# Determine whether the given binary tree nodes are cousins of each other

> Source: https://www.techiedelight.com/determine-two-nodes-are-cousins/

[Binary Tree](https://www.techiedelight.com/Category/Trees/Binary-Tree/)

Given a binary tree, determine if two given nodes are cousins of each other or not. Two nodes of a binary tree are cousins of each other only if they have different parents, but they are at the same level.

For example, consider the following tree:

(4, 6), (4, 7), (5, 6) and (5, 7) are cousins of each other. (2, 3), (4, 5), (6, 7), (4, 3), etc., are not cousins of each other.

> 

The idea is to search for given nodes in a binary tree by doing [inorder traversal](https://techiedelight.com/inorder-tree-traversal-iterative-recursive/) on the tree and store their level and parent node. If both nodes are present at the same level and have different parents, they are cousins. If their level is different, or they are a sibling, they cannot be cousins.

The algorithm can be implemented as follows in TypeScript:

```ts
// A class to store a binary tree node
class TreeNode {
  constructor(public key: number, public left: TreeNode | null = null, public right: TreeNode | null = null) {}
}

// A class to store a binary tree node along with its level and parent information
class NodeInfo {
  constructor(public node: TreeNode | null, public level: number, public parent: TreeNode | null) {}
}

// Perform inorder traversal on a given binary tree and update 'x' and 'y'
function updateLevelandParent(root: TreeNode | null, x: NodeInfo, y: NodeInfo, parent: TreeNode | null = null, level = 1): void {
  // base case: tree is empty
  if (root === null) {
    return;
  }

  // traverse left subtree
  updateLevelandParent(root.left, x, y, root, level + 1);

  // if the first element is found, save its level and parent node
  if (root === x.node) {
    x.level = level;
    x.parent = parent;
  }

  // if the second element is found, save its level and parent node
  if (root === y.node) {
    y.level = level;
    y.parent = parent;
  }

  // traverse right subtree
  updateLevelandParent(root.right, x, y, root, level + 1);
}

// Function to determine if two given nodes are cousins of each other
function checkCousins(root: TreeNode | null, node1: TreeNode | null, node2: TreeNode | null): boolean {
  // return if the tree is empty
  if (root === null) {
    return false;
  }

  const level = 1;          // level of the root is 1
  const parent: TreeNode | null = null;   // parent of the root is null

  const x = new NodeInfo(node1, level, parent);
  const y = new NodeInfo(node2, level, parent);

  // perform inorder traversal on the list and update 'x' and 'y'
  updateLevelandParent(root, x, y);

  // return true if 'x' and 'y' are at the same level, but different parent
  return x.level === y.level && x.parent !== y.parent;
}

const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);
root.right.left = new TreeNode(6);
root.right.right = new TreeNode(7);

if (checkCousins(root, root.left.right, root.right.left)) {
  console.log("Nodes are cousins of each other");
} else {
  console.log("Nodes are not cousins of each other");
}
```

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the binary tree. The program requires O(h) extra space for the call stack, where `h` is the height of the tree.

Also See:

> [Print cousins of a given node in a binary tree](https://www.techiedelight.com/print-cousins-of-given-node-binary-tree/ "Print cousins of a given node in a binary tree")

> [Construct a binary tree from inorder and level order sequence](https://www.techiedelight.com/construct-binary-tree-from-inorder-level-order-traversals/ "Construct a binary tree from inorder and level order sequence")

> [Convert a binary tree to a full tree by removing half nodes](https://www.techiedelight.com/convert-given-binary-tree-to-full-tree-removing-half-nodes/ "Convert a binary tree to a full tree by removing half nodes")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.89/5. Vote count: 174

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Depth-first search](https://www.techiedelight.com/Tags/DFS/), [Medium](https://www.techiedelight.com/Tags/medium/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
