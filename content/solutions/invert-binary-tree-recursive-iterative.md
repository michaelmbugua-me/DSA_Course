# Invert Binary Tree – Iterative and Recursive Solution

> Source: https://www.techiedelight.com/invert-binary-tree-recursive-iterative/

Given a binary tree, write an efficient algorithm to invert it.

For example,

> 

## Recursive Solution

This is one of the most famous interview questions and can be easily solved recursively. The idea is to traverse the tree in a [preorder fashion](https://techiedelight.com/preorder-tree-traversal-iterative-recursive/), and for every node encountered, swap its left and right child before recursively inverting its left and right subtree. We can also traverse the tree in a [postorder fashion](https://techiedelight.com/postorder-tree-traversal-iterative-recursive/).

The algorithm can be implemented as follows in TypeScript:

```ts
// A class to store a binary tree node
class TreeNode {
    val: number;
    left: TreeNode | null = null;
    right: TreeNode | null = null;
    constructor(val: number, left: TreeNode | null = null, right: TreeNode | null = null) {
        this.val = val;
    }
}

// Function to perform preorder traversal on a given binary tree
function preorder(root: TreeNode | null): void {

    if (root === null) {
        return;
    }

    process.stdout.write(root.val + ' ');
    preorder(root.left);
    preorder(root.right);
}

// Utility function to swap left subtree with right subtree
function swap(root: TreeNode | null): void {

    if (root === null) {
        return;
    }

    const temp = root.left;
    root.left = root.right;
    root.right = temp;
}

// Function to invert a given binary tree using preorder traversal
function invertBinaryTree(root: TreeNode | null): void {

    // base case: if the tree is empty
    if (root === null) {
        return;
    }

    // swap left subtree with right subtree
    swap(root);

    // invert left subtree
    invertBinaryTree(root.left);

    // invert right subtree
    invertBinaryTree(root.right);
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

invertBinaryTree(root);
preorder(root);
```

**Output:** 1 3 7 6 2 5 4

The time complexity of the above recursive solution is O(n), where `n` is the total number of nodes in the binary tree. The program requires O(h) extra space for the call stack, where `h` is the height of the tree.

## Iterative Solution

We can easily convert the above recursive solution into an iterative one using a [queue](https://techiedelight.com/circular-queue-implementation-c/) or [stack](https://techiedelight.com/stack-implementation/) to store tree nodes.

### 1\. Using Queue:

The code is almost similar to the [level order traversal](https://techiedelight.com/level-order-traversal-binary-tree/) of a binary tree. This is demonstrated below in TypeScript:

```ts
// A class to store a binary tree node
class TreeNode {
    val: number;
    left: TreeNode | null = null;
    right: TreeNode | null = null;
    constructor(val: number, left: TreeNode | null = null, right: TreeNode | null = null) {
        this.val = val;
    }
}

// Function to perform preorder traversal on a given binary tree
function preorder(root: TreeNode | null): void {

    if (root === null) {
        return;
    }

    process.stdout.write(root.val + ' ');
    preorder(root.left);
    preorder(root.right);
}

// Utility function to swap left subtree with right subtree
function swap(root: TreeNode | null): void {

    if (root === null) {
        return;
    }

    const temp = root.left;
    root.left = root.right;
    root.right = temp;
}

// Iterative function to invert a given binary tree using a queue
function invertBinaryTree(root: TreeNode | null): void {

    // base case: if the tree is empty
    if (root === null) {
        return;
    }

    // maintain a queue and push the root node
    const q: TreeNode[] = [];
    q.push(root);

    // loop till queue is empty
    while (q.length > 0) {

        // dequeue front node
        const curr = q.shift()!;

        // swap the left child with the right child
        swap(curr);

        // enqueue left child of the popped node
        if (curr.left !== null) {
            q.push(curr.left);
        }

        // enqueue right child of the popped node
        if (curr.right !== null) {
            q.push(curr.right);
        }
    }
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

invertBinaryTree(root);
preorder(root);
```

**Output:** 1 3 7 6 2 5 4

### 2\. Using Stack:

The code is almost similar to the [iterative preorder traversal](https://techiedelight.com/preorder-tree-traversal-iterative-recursive/) of a binary tree. This is demonstrated below in TypeScript:

```ts
// A class to store a binary tree node
class TreeNode {
    val: number;
    left: TreeNode | null = null;
    right: TreeNode | null = null;
    constructor(val: number, left: TreeNode | null = null, right: TreeNode | null = null) {
        this.val = val;
    }
}

// Function to perform preorder traversal on a given binary tree
function preorder(root: TreeNode | null): void {

    if (root === null) {
        return;
    }

    process.stdout.write(root.val + ' ');
    preorder(root.left);
    preorder(root.right);
}

// Utility function to swap left subtree with right subtree
function swap(root: TreeNode | null): void {

    if (root === null) {
        return;
    }

    const temp = root.left;
    root.left = root.right;
    root.right = temp;
}

// Iterative function to invert a given binary tree using stack
function invertBinaryTree(root: TreeNode | null): void {

    // base case: if the tree is empty
    if (root === null) {
        return;
    }

    // create an empty stack and push the root node
    const s: TreeNode[] = [];
    s.push(root);

    // loop till stack is empty
    while (s.length > 0) {

        // pop the top node from the stack
        const curr = s.pop()!;

        // swap the left child with the right child
        swap(curr);

        // enqueue right child of the popped node
        if (curr.right !== null) {
            s.push(curr.right);
        }

        // push the left child of the popped node into the stack
        if (curr.left !== null) {
            s.push(curr.left);
        }
    }
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

invertBinaryTree(root);
preorder(root);
```

**Output:** 1 3 7 6 2 5 4
