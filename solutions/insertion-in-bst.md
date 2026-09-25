# Insertion in a BST – Iterative and Recursive Solution

> Source: https://www.techiedelight.com/insertion-in-bst/

[BST](https://www.techiedelight.com/Category/Trees/BST/)

A **Binary Search Tree (BST)** is a rooted binary tree, whose nodes each store a key (and optionally, an associated value), and each has two distinguished subtrees, commonly denoted left and right. The tree should satisfy the BST property, which states that each node’s key must be greater than all keys stored in the left subtree and not greater than all keys in the right subtree. Ideally, unique values should be present in the tree.

Binary search trees are a fundamental data structure used to construct more abstract data structures such as sets, multisets, and associative arrays (maps, multimaps, etc.).

> 

## Recursive Version

When looking for a place to insert a new key, traverse the tree from root-to-leaf, making comparisons to keys stored in the tree’s nodes and deciding based on the comparison to continue searching in the left or right subtrees. In other words, we examine the root and recursively insert the new node to the left subtree if its key is less than that of the root or the right subtree if its key is greater than or equal to the root.

Following is the implementation of the above approach in TypeScript:

```ts
// A class to store a BST node
class TreeNode {
    constructor(public val: number, public left: TreeNode | null = null, public right: TreeNode | null = null) {}
}

// Function to perform inorder traversal on the tree
function inorder(root: TreeNode | null): void {

    if (root === null) {
        return;
    }

    inorder(root.left);
    process.stdout.write(root.val + ' ');
    inorder(root.right);
}

// Recursive function to insert a key into a BST
function insert(root: TreeNode | null, key: number): TreeNode | null {

    // if the root is null, create a new node and return it
    if (root === null) {
        return new TreeNode(key);
    }

    // if the given key is less than the root node,
    // recur for the left subtree
    if (key < root.val) {
        root.left = insert(root.left, key);
    }

    // otherwise, recur for the right subtree
    else {
        // key >= root.val
        root.right = insert(root.right, key);
    }

    return root;
}

// Function to construct a BST from given keys
function constructBST(keys: number[]): TreeNode | null {
    let root: TreeNode | null = null;
    for (const key of keys) {
        root = insert(root, key);
    }
    return root;
}

const keys = [15, 10, 20, 8, 12, 16, 25];

const root = constructBST(keys);
inorder(root);
```

**Output:** 8 10 12 15 16 20 25

We can modify the above TypeScript solution so that the insert function returns the root node instead of relying on pass-by-reference semantics:

```ts
// Recursive function to insert a key into a BST; returns the root node
function insert(root: TreeNode | null, key: number): TreeNode | null {
    // if the root is null, create a new node and return it
    if (root === null) {
        return new TreeNode(key);
    }

    // if the given key is less than the root node, recur for the left subtree;
    // otherwise, recur for the right subtree
    if (key < root.val) {
        root.left = insert(root.left, key);
    }
    // key >= root.val
    else {
        root.right = insert(root.right, key);
    }

    return root;
}

// Function to construct a BST from given keys
function constructBST(keys: number[]): TreeNode | null {
    let root: TreeNode | null = null;
    for (const key of keys) {
        root = insert(root, key);
    }
    return root;
}

const keys = [15, 10, 20, 8, 12, 16, 25];

const root = constructBST(keys);
inorder(root);
```

## Iterative Version

Another way to explain the insertion is to insert a new node into the tree. Initially, the key is compared with that of the root. If its key is less than the root’s, it is then compared with the root’s left child’s key. If its key is greater, it is compared with the root’s right child. This process continues until the new node is compared with a leaf node, and then it is added as this node’s right or left child, depending on its key: if the key is less than the leaf’s key, then it is inserted as the leaf’s left child; otherwise, as to the leaf’s right child.

The iterative version is demonstrated below in TypeScript:

```ts
// Iterative function to insert a key into a BST
function insertIterative(root: TreeNode | null, key: number): TreeNode | null {

    // start with the root node
    let curr = root;

    // pointer to store the parent of the current node
    let parent: TreeNode | null = null;

    // if the tree is empty, create a new node and set it as root
    if (root === null) {
        return new TreeNode(key);
    }

    // traverse the tree and find the parent node of the given key
    while (curr !== null) {

        // update the parent to the current node
        parent = curr;

        // if the given key is less than the current node,
        // go to the left subtree; otherwise, go to the right subtree.
        if (key < curr.val) {
            curr = curr.left;
        } else {
            curr = curr.right;
        }
    }

    // construct a node and assign it to the appropriate parent pointer
    if (key < parent.val) {
        parent.left = new TreeNode(key);
    } else {
        parent.right = new TreeNode(key);
    }

    return root;
}

// Function to construct a BST from given keys
function constructBST(keys: number[]): TreeNode | null {
    let root: TreeNode | null = null;
    for (const key of keys) {
        root = insertIterative(root, key);
    }
    return root;
}

const keys = [15, 10, 20, 8, 12, 16, 25];

const root = constructBST(keys);
inorder(root);
```

**Output:** 8 10 12 15 16 20 25

The time complexity of the above solution is O(h), where `h` is the BST height. The BST height in the worst-case is as much as the total number of keys in the BST. The worst case happens when given keys are sorted in ascending or descending order, and we get a skewed tree (all the nodes except the leaf have one and only one child).

For height-balanced BSTs, with each comparison, skip about half of the tree so that each insertion operation takes time proportional to the logarithm of the total number of items `n` stored in the tree, i.e., `log2n`. This is much better than the linear time required to find items by key in an (unsorted) array but slower than the corresponding operations on hash tables.

The space used by the recursive routine is also proportional to the tree’s height, whereas the iterative version doesn’t require any extra space.

**Also See:**

> [Search a given key in BST – Iterative and Recursive Solution](https://techiedelight.com/search-given-key-in-bst/)

> [Deletion from BST (Binary Search Tree)](https://techiedelight.com/deletion-from-bst/)

**Exercise:** Modify the solution to [construct a height-balanced BST](https://techiedelight.com/construct-balanced-bst-given-keys/).

**References:** <https://en.wikipedia.org/wiki/Binary_search_tree>
