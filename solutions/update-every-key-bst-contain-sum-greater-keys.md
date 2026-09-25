# Update every key in a BST to contain the sum of all greater keys

> Source: https://www.techiedelight.com/update-every-key-bst-contain-sum-greater-keys/

[BST](https://www.techiedelight.com/Category/Trees/BST/)

Given a binary search tree, modify it such that every node is updated to contain the sum of all greater keys present in the BST.

For example, BST shown on the left should be updated to BST on the right.

> 

## 1\. Using Inorder Traversal

We can solve this problem by [inorder traversal](https://techiedelight.com/inorder-tree-traversal-iterative-recursive/) by calculating the sum of all nodes present in a binary tree in advance. Then for each node, the sum of all greater keys for any node can be updated in constant time using the total sum and sum of nodes visited so far.

Following is a TypeScript implementation of the idea:

```ts
// A class to store a BST node
class Node {
    data: number;
    left: Node | null;
    right: Node | null;
    constructor(data: number, left: Node | null = null, right: Node | null = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

// Function to perform inorder traversal on the tree
function inorder(root: Node | null): void {
    if (root === null) {
        return;
    }

    inorder(root.left);
    process.stdout.write(root.data + ' ');
    inorder(root.right);
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

// Function to return the sum of all nodes present in a binary tree
function findSum(root: Node | null): number {
    if (root === null) {
        return 0;
    }

    return root.data + findSum(root.left) + findSum(root.right);
}

// Function to modify the BST such that every key is updated to
// contains the sum of all greater keys
function update(root: Node | null, total: number): number {
    // base case
    if (root === null) {
        return total;
    }

    // update the left subtree
    total = update(root.left, total);

    // modify the sum to contain the sum of all greater keys
    total = total - root.data;

    // update the root to contain the sum of all greater keys
    root.data += total;

    // update the right subtree
    total = update(root.right, total);

    return total;
}

function transform(root: Node | null): void {
    const total = findSum(root);
    update(root, total);
}

const keys = [5, 3, 2, 4, 6, 8, 10];

/*
 Construct the following tree
           5
         /   \
        /     \
       3       8
      / \     / \
     /   \   /   \
    2    4 6     10
 */

let root: Node | null = null;
for (const key of keys) {
    root = insert(root, key);
}

transform(root);
inorder(root);
```

## 2\. Using Reverse Inorder Traversal

The above solution traverses the tree two times. We can solve this problem in a single traversal by traversing the tree in reverse inorder. Now, keys will be visited in descending order, and the sum of all greater keys for any node can be updated in constant time by keeping track of the sum of nodes seen so far.

Following is a TypeScript program that demonstrates it:

```ts
// A class to store a BST node
class Node {
    data: number;
    left: Node | null;
    right: Node | null;
    constructor(data: number, left: Node | null = null, right: Node | null = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

// Function to perform inorder traversal on the tree
function inorder(root: Node | null): void {
    if (root === null) {
        return;
    }

    inorder(root.left);
    process.stdout.write(root.data + ' ');
    inorder(root.right);
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

// Function to modify the BST such that every key is updated to
// contain the sum of all greater keys
function transform(root: Node | null, sum_so_far = 0): number {
    // base case
    if (root === null) {
        return sum_so_far;
    }

    // update the right subtree before the left subtree
    const right = transform(root.right, sum_so_far);

    // update the root to contain the sum of all greater keys
    root.data += right;

    // update the sum to the current node, which is already updated
    // with greater keys
    sum_so_far = root.data;

    // update the left subtree
    return transform(root.left, sum_so_far);
}

const keys = [5, 3, 2, 4, 6, 8, 10];

/*
 Construct the following tree
           5
         /   \
        /     \
       3       8
      / \     / \
     /   \   /   \
    2    4 6     10
 */

let root: Node | null = null;
for (const key of keys) {
    root = insert(root, key);
}

transform(root);
inorder(root);
```

The time complexity of the above solution is O(n), where `n` is the size of the BST, and requires space proportional to the tree’s height for the call stack.
