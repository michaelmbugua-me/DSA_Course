# Determine whether a given binary tree is a BST or not

> Source: https://www.techiedelight.com/determine-given-binary-tree-is-a-bst-or-not/

Given a binary tree, determine whether it is a BST.

> 

This problem has a simple recursive solution. The BST property “ _every node on the right subtree has to be larger than the current node and every node on the left subtree has to be smaller than the current node_ ” is the key to figuring out whether a tree is a BST or not.

The [greedy algorithm](https://techiedelight.com/greedy-algorithm-problems/) – traverse the tree, at every node check whether the node contains a value larger than the value at the left child and smaller than the value on the right child – does not work for all cases. Consider the following tree:

20 / \ 10 30 / \ 5 40

In the tree above, each node meets the condition that the node contains a value larger than its left child and smaller than its right child hold, and yet it’s not a BST: the value 5 is on the right subtree of the node containing 20, a violation of the BST property.

Instead of deciding based solely on a node’s values and its children, we also need information flowing down from the parent. In the tree above, if we could remember about the node containing the value 20, we would see that the node with value 5 is violating the BST property contract.

So, the condition we need to check at each node is:

  * If the node is the left child of its parent, it must be smaller than (or equal to) the parent, and it must pass down the value from its parent to its right subtree to make sure none of the nodes in that subtree is greater than the parent.
  * If the node is the right child of its parent, it must be larger than the parent, and it must pass down the value from its parent to its left subtree to make sure none of the nodes in that subtree is lesser than the parent.

Following is the TypeScript implementation of the idea:

```ts
// A class to store a BST node
class TreeNode {
  data: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(data: number, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

// Recursive function to insert a key into a BST
function insert(root: TreeNode | null, key: number): TreeNode {
  // if the root is null, create a new node and return it
  if (root === null) {
    return new TreeNode(key);
  }

  // if the given key is less than the root node, recur for the left subtree
  if (key < root.data) {
    root.left = insert(root.left, key);
  }
  // if the given key is more than the root node, recur for the right subtree
  else {
    root.right = insert(root.right, key);
  }

  return root;
}

// Function to determine whether a given binary tree is a BST by keeping a
// valid range (starting from [-INFINITY, INFINITY]) and keep shrinking
// it down for each node as we go down recursively
function isBST(node: TreeNode | null, minKey: number, maxKey: number): boolean {
  // base case
  if (node === null) {
    return true;
  }

  // if the node's value falls outside the valid range
  if (node.data < minKey || node.data > maxKey) {
    return false;
  }

  // recursively check left and right subtrees with an updated range
  return isBST(node.left, minKey, node.data) &&
    isBST(node.right, node.data, maxKey);
}

// Function to determine whether a given binary tree is a BST
function checkForBST(root: TreeNode | null): void {
  if (isBST(root, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER)) {
    console.log("The tree is a BST.");
  } else {
    console.log("The tree is not a BST!");
  }
}

function swap(root: TreeNode): void {
  const left = root.left;
  root.left = root.right;
  root.right = left;
}

const keys = [15, 10, 20, 8, 12, 16, 25];

let root: TreeNode | null = null;
for (const key of keys) {
  root = insert(root, key);
}

// swap left and right nodes
if (root !== null) {
  swap(root);
  checkForBST(root);
}
```

**Output:** The tree is not a BST!

The time complexity of the above solution is O(n), where `n` is the size of the BST, and requires space proportional to the tree’s height for the call stack.

Another approach:

We know that an [inorder traversal](https://techiedelight.com/inorder-tree-traversal-iterative-recursive/) of a binary search tree returns the nodes in sorted order. To determine whether a given binary tree is a BST, keep track of the last visited node while traversing the tree. Then for each encountered node in the inorder traversal, check whether the last visited node is smaller (or smaller/equal, if duplicates are to be allowed in the tree) compared to the current node.

Following is the TypeScript implementation of the idea:

```ts
// A class to store a BST node
class TreeNode {
  data: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(data: number, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

// Recursive function to insert a key into a BST
function insert(root: TreeNode | null, key: number): TreeNode {
  // if the root is null, create a new node and return it
  if (root === null) {
    return new TreeNode(key);
  }

  // if the given key is less than the root node, recur for the left subtree
  if (key < root.data) {
    root.left = insert(root.left, key);
  }

  // if the given key is more than the root node, recur for the right subtree
  else {
    root.right = insert(root.right, key);
  }

  return root;
}

// Function to perform inorder traversal on the given binary tree and
// check if it is a BST or not. Here, `prev` is the previously processed node
function isBST(root: TreeNode | null, prev: TreeNode): boolean {
  // base case: empty tree is a BST
  if (root === null) {
    return true;
  }

  // check if the left subtree is BST or not
  const left = isBST(root.left, prev);

  // value of the current node should be more than that of the previous node
  if (root.data <= prev.data) {
    return false;
  }

  // update previous node data and check if the right subtree is BST or not
  prev.data = root.data;

  return left && isBST(root.right, prev);
}

// Function to determine whether a given binary tree is a BST
function checkForBST(node: TreeNode | null): void {
  // pointer to store previously processed node in the inorder traversal
  const prev = new TreeNode(Number.MIN_SAFE_INTEGER);

  // check if nodes are processed in sorted order
  if (isBST(node, prev)) {
    console.log("The tree is a BST!");
  } else {
    console.log("The tree is not a BST!");
  }
}

function swap(root: TreeNode): void {
  const left = root.left;
  root.left = root.right;
  root.right = left;
}

const keys = [15, 10, 20, 8, 12, 16, 25];

let root: TreeNode | null = null;
for (const key of keys) {
  root = insert(root, key);
}

// swap nodes
if (root !== null) {
  swap(root);
  checkForBST(root);
}
```

**Output:** The tree is not a BST!

The time complexity of the above solution is O(n), where `n` is the size of the BST, and requires space proportional to the tree’s height for the call stack.

**References:** <https://en.wikipedia.org/wiki/Binary_search_tree>
