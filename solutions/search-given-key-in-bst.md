# Search a given key in BST –  Iterative and Recursive Solution

> Source: https://www.techiedelight.com/search-given-key-in-bst/

[BST](https://www.techiedelight.com/Category/Trees/BST/)

Given a BST, write an efficient function to search a given key in it. The algorithm should return the parent node of the key and print if the key is the left or right node of the parent node. If the key is not present in the BST, the algorithm should be able to determine that.

Searching a binary search tree for a specific key can be programmed recursively or iteratively.

> 

We begin by examining the root node. If the tree is null, the key we are searching for does not exist in the tree. Otherwise, if the key equals that of the root, the search is successful, we return the node. If the key is less than that of the root, we search the left subtree. Similarly, if the key is greater than that of the root, we search the right subtree. This process is repeated until the key is found or the remaining subtree is null. If the searched key is not found after a null subtree is reached, then the key is not present in the tree.

This can be easily expressed as a recursive algorithm. The implementation can be seen below in TypeScript:

```ts
// A class to store a BST node
class TreeNode {
    data: number;
    left: TreeNode | null = null;
    right: TreeNode | null = null;
    constructor(data: number, left: TreeNode | null = null, right: TreeNode | null = null) {}
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

// Recursive function to search in a given BST
function search(root: TreeNode | null, key: number, parent: TreeNode | null): void {
    // if the key is not present in the key
    if (root === null) {
        console.log('Key not found');
        return;
    }

    // if the key is found
    if (root.data === key) {
        if (parent === null) {
            console.log(`The node with key ${key} is root node`);
        } else if (key < parent.data) {
            console.log('The given key is the left node of the node with key', parent.data);
        } else {
            console.log('The given key is the right node of the node with key', parent.data);
        }

        return;
    }

    // if the given key is less than the root node, recur for the left subtree;
    // otherwise, recur for the right subtree

    if (key < root.data) {
        search(root.left, key, root);
    } else {
        search(root.right, key, root);
    }
}

// demo
const keys = [15, 10, 20, 8, 12, 16, 25];

let root: TreeNode | null = null;
for (const key of keys) {
    root = insert(root, key);
}

search(root, 25, null);
```

This algorithm searches from the tree’s root to the leaf farthest from the root in the worst-case. The search operation takes time proportional to the tree’s height. On average, binary search trees with `n` nodes have O(log(n)) height. However, in the worst case, binary search trees can have O(n) height (for skewed trees where all the nodes except the leaf have one and only one child) when the unbalanced tree resembles a [linked list](https://techiedelight.com/introduction-linked-lists/).

The space used by the [call stack](https://en.wikipedia.org/wiki/Call_stack) is also proportional to the tree’s height. The algorithm can be implemented iteratively to avoid use of extra space.

```ts
// A class to store a BST node
class TreeNode {
    data: number;
    left: TreeNode | null = null;
    right: TreeNode | null = null;
    constructor(data: number, left: TreeNode | null = null, right: TreeNode | null = null) {}
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

// Iterative function to search in a given BST
function searchIterative(root: TreeNode | null, key: number): void {
    // start with the root node
    let curr = root;

    // pointer to store the parent of the current node
    let parent: TreeNode | null = null;

    // traverse the tree and search for the key
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

    // if the key is not present in the key
    if (curr === null) {
        console.log('Key not found');
        return;
    }

    if (parent === null) {
        console.log(`The node with key ${key} is root node`);
    } else if (key < parent.data) {
        console.log('The given key is the left node of the node with key', parent.data);
    } else {
        console.log('The given key is the right node of the node with key', parent.data);
    }
}

// demo
const keys = [15, 10, 20, 8, 12, 16, 25];

let root: TreeNode | null = null;
for (const key of keys) {
    root = insert(root, key);
}

searchIterative(root, 25);
```

**Also See:**

> [Insertion in a BST – Iterative and Recursive Solution](https://techiedelight.com/insertion-in-bst)

> [Deletion from BST (Binary Search Tree)](https://techiedelight.com/deletion-from-bst/)

**References:** <https://en.wikipedia.org/wiki/Binary_search_tree>
