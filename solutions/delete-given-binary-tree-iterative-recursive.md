# Delete a binary tree – Iterative and Recursive

> Source: https://www.techiedelight.com/delete-given-binary-tree-iterative-recursive/

Given a binary tree, write an efficient algorithm to delete the entire binary tree. The algorithm should deallocate every single node present in the tree, not just change the root node’s reference to null.

## Recursive Solution

The idea is to traverse the tree in a [postorder fashion](https://techiedelight.com/postorder-tree-traversal-iterative-recursive/) and delete the left and right subtree of a node before deleting the node itself. Note that we cannot traverse a tree in [preorder](https://techiedelight.com/preorder-tree-traversal-iterative-recursive/) or inorder fashion as we can’t delete a parent before deleting its children.

Following is a TypeScript program that demonstrates it:

```ts
// Data structure to store a binary tree node
class TreeNode {
  constructor(public key: number, public left: TreeNode | null = null, public right: TreeNode | null = null) {}
}

// Recursive function to delete a given binary tree
function deleteBinaryTree(root: TreeNode | null): TreeNode | null {
  // Base case: empty tree
  if (root === null) {
    return null;
  }

  // delete left and right subtree first (Postorder)
  deleteBinaryTree(root.left);
  deleteBinaryTree(root.right);

  // delete the current node after deleting its left and right subtree
  // (garbage collection handles deallocation in JS/TS)

  // set root as null before returning
  return null;
}

const root = new TreeNode(15);
root.left = new TreeNode(10);
root.right = new TreeNode(20);
root.left.left = new TreeNode(8);
root.left.right = new TreeNode(12);
root.right.left = new TreeNode(16);
root.right.right = new TreeNode(25);

// delete the entire tree
const deleted = deleteBinaryTree(root);

if (deleted === null) {
  console.log("Tree Successfully Deleted");
}
```

The time complexity of the above recursive solution is O(n), where `n` is the total number of nodes in the binary tree. The auxiliary space required by the program is O(h) for the call stack, where `h` is the height of the tree.

## Iterative Solution

In the iterative version, perform a [level order traversal](https://techiedelight.com/level-order-traversal-binary-tree/) on the tree. The idea is to delete each node in the [queue](https://techiedelight.com/circular-queue-implementation-c/), one by one, after enqueuing their children. Note that the parent is deleted before deleting its children as we are enqueuing them, and they will be processed and deleted afterward.

This is demonstrated below in TypeScript:

```ts
// Data structure to store a binary tree node
class TreeNode {
  constructor(public key: number, public left: TreeNode | null = null, public right: TreeNode | null = null) {}
}

// Iterative function to delete a given binary tree
function deleteBinaryTree(root: TreeNode | null): TreeNode | null {
  // empty tree
  if (root === null) {
    return null;
  }

  // create an empty queue and enqueue the root node
  const queue: TreeNode[] = [];
  queue.push(root);

  let front: TreeNode | null = null;

  // loop till queue is empty
  while (queue.length > 0) {
    // delete each node in the queue one by one after pushing their
    // non-empty left and right child to the queue
    front = queue.shift()!;

    if (front.left) {
      queue.push(front.left);
    }

    if (front.right) {
      queue.push(front.right);
    }
  }

  // set root as null before returning
  return null;
}

const root = new TreeNode(15);
root.left = new TreeNode(10);
root.right = new TreeNode(20);
root.left.left = new TreeNode(8);
root.left.right = new TreeNode(12);
root.right.left = new TreeNode(16);
root.right.right = new TreeNode(25);

// delete the entire tree
const deleted = deleteBinaryTree(root);

if (deleted === null) {
  console.log("Tree Successfully Deleted");
}
```

The time complexity of the above iterative solution is O(n), where `n` is the total number of nodes in the binary tree. The auxiliary space required by the program is O(n) for the queue data structure.
