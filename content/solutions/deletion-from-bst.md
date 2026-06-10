# Deletion from BST (Binary Search Tree)

> Source: https://www.techiedelight.com/deletion-from-bst/

[BST](https://www.techiedelight.com/Category/Trees/BST/)

Given a BST, write an efficient function to delete a given key in it.

> 

There are three possible cases to consider deleting a node from BST:

**Case 1:** Deleting a node with no children: remove the node from the tree.

**Case 2:** Deleting a node with two children: call the node to be deleted `N`. Do not delete `N`. Instead, choose either its [inorder _successor_](https://techiedelight.com/find-inorder-successor-given-key-bst/) node or its inorder _predecessor_ node, `R`. Copy the value of `R` to `N`, then recursively call delete on `R` until reaching one of the first two cases. If we choose the inorder successor of a node, as the right subtree is not NULL (our present case is a node with 2 children), then its inorder successor is a node with the least value in its right subtree, which will have at a maximum of 1 subtree, so deleting it would fall in one of the first 2 cases.

**Case 3:** Deleting a node with one child: remove the node and replace it with its child.

Broadly speaking, nodes with children are harder to delete. As with all binary trees, a node’s inorder successor is its right subtree’s leftmost child, and a node’s inorder predecessor is the left subtree’s rightmost child. In either case, this node will have zero or one child. Delete it according to one of the two simpler cases above.

The algorithm can be implemented as follows in TypeScript:

```ts
// A class to store a BST node
class TreeNode {
  data: number;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(data: number, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

// Function to perform inorder traversal on the BST
function inorder(root: TreeNode | null): void {
  if (root === null) {
    return;
  }

  inorder(root.left);
  console.log(root.data);
  inorder(root.right);
}

// Helper function to find minimum value node in the subtree rooted at `curr`
function getMinimumKey(curr: TreeNode): TreeNode {
  while (curr.left !== null) {
    curr = curr.left;
  }
  return curr;
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

// Function to delete a node from a BST
function deleteNode(root: TreeNode | null, key: number): TreeNode | null {
  // pointer to store the parent of the current node
  let parent: TreeNode | null = null;

  // start with the root node
  let curr: TreeNode | null = root;

  // search key in the BST and set its parent pointer
  while (curr !== null && curr.data !== key) {
    // update the parent to the current node
    parent = curr;

    // if the given key is less than the current node, go to the left subtree;
    // otherwise, go to the right subtree
    if (key < curr.data) {
      curr = curr.left;
    } else {
      curr = curr.right;
    }
  }

  // return if the key is not found in the tree
  if (curr === null) {
    return root;
  }

  // Case 1: node to be deleted has no children, i.e., it is a leaf node
  if (curr.left === null && curr.right === null) {
    // if the node to be deleted is not a root node, then set its
    // parent left/right child to null
    if (curr !== root) {
      if (parent === null) {
        return root;
      }
      if (parent.left === curr) {
        parent.left = null;
      } else {
        parent.right = null;
      }
    }
    // if the tree has only a root node, set it to null
    else {
      root = null;
    }
  }

  // Case 2: node to be deleted has two children
  else if (curr.left !== null && curr.right !== null) {
    // find its inorder successor node
    const successor = getMinimumKey(curr.right);

    // store successor value
    const val = successor.data;

    // recursively delete the successor. Note that the successor
    // will have at most one child (right child)
    deleteNode(root, successor.data);

    // copy value of the successor to the current node
    curr.data = val;
  }

  // Case 3: node to be deleted has only one child
  else {
    // choose a child node
    let child: TreeNode | null;
    if (curr.left) {
      child = curr.left;
    } else {
      child = curr.right;
    }

    // if the node to be deleted is not a root node, set its parent
    // to its child
    if (curr !== root) {
      if (parent === null) {
        return root;
      }
      if (curr === parent.left) {
        parent.left = child;
      } else {
        parent.right = child;
      }
    }

    // if the node to be deleted is a root node, then set the root to the child
    else {
      root = child;
    }
  }

  return root;
}

const keys = [15, 10, 20, 8, 12, 16];

let root: TreeNode | null = null;
for (const key of keys) {
  root = insert(root, key);
}

root = deleteNode(root, 16);
inorder(root);
```

**Output:** 8 10 12 15 20

The time complexity of the above solution is O(n), where `n` is the size of the BST. The auxiliary space required by the program is O(n) for recursion (call stack).

The above solution initially searches the key in the BST and also find its parent pointer. We can easily modify the code to recursively search the key in the deletion procedure itself and let recursion take care of updating the parent pointer.

```ts
// A class to store a BST node
class TreeNode {
  data: number;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(data: number, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

// Function to perform inorder traversal on the BST
function inorder(root: TreeNode | null): void {
  if (root === null) {
    return;
  }
  inorder(root.left);
  console.log(root.data);
  inorder(root.right);
}

// Function to find the maximum value node in the subtree rooted at `ptr`
function findMaximumKey(ptr: TreeNode): TreeNode {
  while (ptr.right !== null) {
    ptr = ptr.right;
  }
  return ptr;
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

// Function to delete a node from a BST
function deleteNode(root: TreeNode | null, key: number): TreeNode | null {
  // base case: the key is not found in the tree
  if (root === null) {
    return root;
  }

  // if the given key is less than the root node, recur for the left subtree
  if (key < root.data) {
    root.left = deleteNode(root.left, key);
  }

  // if the given key is more than the root node, recur for the right subtree
  else if (key > root.data) {
    root.right = deleteNode(root.right, key);
  }

  // key found
  else {
    // Case 1: node to be deleted has no children (it is a leaf node)
    if (root.left === null && root.right === null) {
      // update root to null
      return null;
    }

    // Case 2: node to be deleted has two children
    else if (root.left !== null && root.right !== null) {
      // find its inorder predecessor node
      const predecessor = findMaximumKey(root.left);

      // copy value of the predecessor to the current node
      root.data = predecessor.data;

      // recursively delete the predecessor. Note that the
      // predecessor will have at most one child (left child)
      root.left = deleteNode(root.left, predecessor.data);
    }

    // Case 3: node to be deleted has only one child
    else {
      // choose a child node
      const child = root.left ? root.left : root.right;
      root = child;
    }
  }

  return root;
}

const keys = [15, 10, 20, 8, 12, 25];

let root: TreeNode | null = null;
for (const key of keys) {
  root = insert(root, key);
}

root = deleteNode(root, 12);
inorder(root);
```

The time complexity of the above solution is O(n), where `n` is the size of the BST. The auxiliary space required by the program is O(n) for recursion (call stack).

The above solution initially searches the key in the BST and also find its parent pointer. We can easily modify the code to recursively search the key in the deletion procedure itself and let recursion take care of updating the parent pointer.

```ts
// A class to store a BST node
class TreeNode {
  data: number;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(data: number, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

// Function to perform inorder traversal on the BST
function inorder(root: TreeNode | null): void {
  if (root === null) {
    return;
  }
  inorder(root.left);
  console.log(root.data);
  inorder(root.right);
}

// Function to find the maximum value node in the subtree rooted at `ptr`
function findMaximumKey(ptr: TreeNode): TreeNode {
  while (ptr.right !== null) {
    ptr = ptr.right;
  }
  return ptr;
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

// Function to delete a node from a BST
function deleteNode(root: TreeNode | null, key: number): TreeNode | null {
  // base case: the key is not found in the tree
  if (root === null) {
    return root;
  }

  // if the given key is less than the root node, recur for the left subtree
  if (key < root.data) {
    root.left = deleteNode(root.left, key);
  }

  // if the given key is more than the root node, recur for the right subtree
  else if (key > root.data) {
    root.right = deleteNode(root.right, key);
  }

  // key found
  else {
    // Case 1: node to be deleted has no children (it is a leaf node)
    if (root.left === null && root.right === null) {
      // update root to null
      return null;
    }

    // Case 2: node to be deleted has two children
    else if (root.left !== null && root.right !== null) {
      // find its inorder predecessor node
      const predecessor = findMaximumKey(root.left);

      // copy value of the predecessor to the current node
      root.data = predecessor.data;

      // recursively delete the predecessor. Note that the
      // predecessor will have at most one child (left child)
      root.left = deleteNode(root.left, predecessor.data);
    }

    // Case 3: node to be deleted has only one child
    else {
      // choose a child node
      const child = root.left ? root.left : root.right;
      root = child;
    }
  }

  return root;
}

const keys = [15, 10, 20, 8, 12, 25];

let root: TreeNode | null = null;
for (const key of keys) {
  root = insert(root, key);
}

root = deleteNode(root, 12);
inorder(root);
```

**Output:** 8 10 15 20 25

The time complexity of the above solution is O(n), where `n` is the size of the BST, and requires space proportional to the tree’s height for the call stack.

**Also See:**

> [Insertion in a BST – Iterative and Recursive Solution](https://techiedelight.com/insertion-in-bst/)

> [Search a given key in BST – Iterative and Recursive Solution](https://techiedelight.com/search-given-key-in-bst/)

**References:** <https://en.wikipedia.org/wiki/Binary_search_tree>
