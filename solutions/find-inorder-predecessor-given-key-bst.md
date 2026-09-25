# Find inorder predecessor for the given key in a BST

> Source: https://www.techiedelight.com/find-inorder-predecessor-given-key-bst/

[BST](https://www.techiedelight.com/Category/Trees/BST/)

Given a BST, find the [inorder](https://techiedelight.com/inorder-tree-traversal-iterative-recursive/) predecessor of a given key in it. If the key does not lie in the BST, return the previous greater node (if any) present in the BST.

An inorder predecessor of a node in the BST is the previous node in the inorder traversal of it. For example, consider the following tree:

The inorder predecessor of 8 does not exist. The inorder predecessor of 10 is 8 The inorder predecessor of 12 is 10 The inorder predecessor of 20 is 16

> 

A node’s inorder predecessor is a node with maximum value in its left subtree, i.e., its left subtree’s right-most child. If the left subtree of the node doesn’t exist, then the inorder predecessor is one of its ancestors. To find which ancestors are the predecessor, move up the tree towards the root until we encounter a node that is the right child of its parent. If any such node is found, then the inorder predecessor is its parent; otherwise, the inorder predecessor does not exist for the node.

## Recursive Version

We can recursively check the above conditions. The idea is to search for the given node in the tree and update the predecessor to the current node before visiting its right subtree. If the node is found in the BST, return the maximum value node in its left subtree. If the left subtree of the node doesn’t exist, then the inorder predecessor is one of its ancestors, which is already being updated while searching for the given key.

Following is a TypeScript implementation of the idea:

```ts
// A class to store a BST node
class Node {
    constructor(public data: number,
                public left: Node | null = null,
                public right: Node | null = null) {}
}

// Recursive function to insert a key into a BST
function insert(root: Node | null, key: number): Node {

    // if the root is null, create a new node and return it
    if (root === null) {
        return new Node(key);
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

// Helper function to find the maximum value node in a given BST
function findMaximum(root: Node): Node {
    while (root.right) {
        root = root.right;
    }
    return root;
}

// Recursive function to find inorder predecessor for a given key in a BST
function findPredecessor(root: Node | null, prec: Node | null, key: number): Node | null {

    // base case
    if (root === null) {
        return prec;
    }

    // if a node with the desired value is found, the predecessor is the maximum value
    // node in its left subtree (if any)
    if (root.data === key) {
        if (root.left) {
            return findMaximum(root.left);
        }
    }

    // if the given key is less than the root node, recur for the left subtree
    else if (key < root.data) {
        return findPredecessor(root.left, prec, key);
    }

    // if the given key is more than the root node, recur for the right subtree
    else {
        // update predecessor to the current node before recursing
        // in the right subtree
        prec = root;
        return findPredecessor(root.right, prec, key);
    }

    return prec;
}

const keys = [15, 10, 20, 8, 12, 16, 25];

/* Construct the following tree
           15
         /    \
        /      \
       10       20
      / \      /  \
     /   \    /    \
    8    12  16    25
*/

let root: Node | null = null;
for (const key of keys) {
    root = insert(root, key);
}

// find inorder predecessor for each key
for (const key of keys) {
    const prec = findPredecessor(root, null, key);

    if (prec) {
        console.log(`The predecessor of node ${key} is ${prec.data}`);
    }
    else {
        console.log(`The predecessor doesn't exist for node ${key}`);
    }
}
```

**Output:** The predecessor of node 15 is 12 The predecessor of node 10 is 8 The predecessor of node 20 is 16 The predecessor doesn’t exist for node 8 The predecessor of node 12 is 10 The predecessor of node 16 is 15 The predecessor of node 25 is 20

The time complexity of the above solution is O(n), where `n` is the size of the BST, and requires space proportional to the tree’s height for the call stack.

## Iterative Version

The same algorithm can be easily implemented iteratively as follows in TypeScript:

```ts
// A class to store a BST node
class Node {
    constructor(public data: number,
                public left: Node | null = null,
                public right: Node | null = null) {}
}

// Recursive function to insert a key into a BST
function insert(root: Node | null, key: number): Node {

    // if the root is null, create a new node and return it
    if (root === null) {
        return new Node(key);
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

// Function to find the maximum value node in a given BST
function findMaximum(root: Node): Node {
    while (root.right) {
        root = root.right;
    }
    return root;
}

// Iterative function to find inorder predecessor for a given key in a BST
function findPredecessor(root: Node | null, key: number): Node | null {

    // base case
    if (!root) {
        return null;
    }

    let prec: Node | null = null;

    while (true) {

        // if the given key is less than the root node, visit the left subtree
        if (key < root.data) {
            root = root.left;
        }

        // if the given key is more than the root node, visit the right subtree
        else if (key > root.data) {
            // update predecessor to the current node before visiting
            // right subtree
            prec = root;
            root = root.right;
        }

        // if a node with the desired value is found, the predecessor is the maximum
        // value node in its left subtree (if any)
        else {
            if (root.left) {
                prec = findMaximum(root.left);
            }
            break;
        }

        // if the key doesn't exist in the binary tree, return previous greater node
        if (root === null) {
            return prec;
        }
    }

    // return predecessor, if any
    return prec;
}

const keys = [15, 10, 20, 8, 12, 16, 25];

/* Construct the following tree
           15
         /    \
        /      \
       10       20
      / \      /  \
     /   \    /    \
    8    12  16    25
*/

let root: Node | null = null;
for (const key of keys) {
    root = insert(root, key);
}

// find inorder predecessor for each key
for (const key of keys) {
    const prec = findPredecessor(root, key);
    if (prec) {
        console.log(`The predecessor of node ${key} is ${prec.data}`);
    }
    else {
        console.log(`The predecessor doesn't exist for node ${key}`);
    }
}
```

**Output:** The predecessor of node 15 is 12 The predecessor of node 10 is 8 The predecessor of node 20 is 16 The predecessor doesn’t exist for node 8 The predecessor of node 12 is 10 The predecessor of node 16 is 15 The predecessor of node 25 is 20

The time complexity of the above solution is O(n), where `n` is the size of the BST. The auxiliary space required by the program is O(1).
