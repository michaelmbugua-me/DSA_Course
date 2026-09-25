# Check if a given sequence represents the preorder traversal of a BST

> Source: https://www.techiedelight.com/check-sequence-represents-preorder-traversal-bst/

[BST](https://www.techiedelight.com/Category/Trees/BST/)

Given a distinct sequence of keys, check if it represents a [preorder traversal](https://techiedelight.com/preorder-tree-traversal-iterative-recursive/) of a binary search tree (BST).

For example, the following BST can be constructed from the sequence `{15, 10, 8, 12, 20, 16, 25}` and it has the same preorder traversal:

> 

The idea is first to [construct a BST from the given sequence](https://techiedelight.com/insertion-in-bst/) by inserting keys into the BST one at a time and then compare the preorder traversal of the constructed BST with the given sequence. If the order matches, we can say that the given sequence represents the preorder traversal of a BST.

Following is a TypeScript program that demonstrates it:

```ts
// A class to store a binary tree node
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
const insert = (root: TreeNode | null, key: number): TreeNode => {

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
};

// Recursive function to build a BST from the given sequence
const buildTree = (seq: number[]): TreeNode | null => {

    // construct a BST by inserting keys from the given sequence
    let root: TreeNode | null = null;
    for (const key of seq) {
        root = insert(root, key);
    }

    // return root node
    return root;
};

// Function to compare the preorder traversal of a BST with the given sequence
const comparePreOrder = (root: TreeNode | null, seq: number[], index: { value: number }): boolean => {

    // base case
    if (root === null) {
        return true;
    }

    // return false if the next element in the given sequence doesn't match
    // with the next element in the preorder traversal of BST
    if (seq[index.value] !== root.data) {
        return false;
    }

    // increment index
    index.value++;

    // compare the left and right subtrees
    return comparePreOrder(root.left, seq, index) &&
        comparePreOrder(root.right, seq, index);
};

// Function to check if a given sequence represents the preorder traversal of a BST
const isBST = (seq: number[]): boolean => {

    /* 1. Construct the BST from the given sequence */

    const root = buildTree(seq);

    /* 2. Compare the preorder traversal of BST with the given sequence */

    // `index` stores the index of the next unprocessed node in the preorder sequence
    const index = { value: 0 };
    return comparePreOrder(root, seq, index) && index.value === seq.length;
};

// demo

const seq = [15, 10, 8, 12, 20, 16, 25];

if (isBST(seq)) {
    console.log('Sequence represents preorder traversal of a BST');
} else {
    console.log("Sequence doesn't represent preorder traversal of a BST");
}
```

The time complexity of the above solution is O(n.log(n)), where `n` is the size of the BST, and requires space proportional to the tree’s height for the call stack.

We can reduce the time complexity to O(n) by [constructing a BST from the given sequence in a preorder fashion](https://techiedelight.com/build-binary-search-tree-from-preorder-sequence/). Now the problem reduces to just validating if the whole sequence is traversed or not while constructing the BST. If the whole sequence is traversed, we can say that the given sequence represents the preorder traversal of a BST.

Following is a TypeScript implementation based on the above idea:

```ts
// A class to store a binary tree node
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

// Recursive function to build a BST from the given sequence in a preorder fashion
const buildTree = (seq: number[], index: { value: number }, min: number, max: number): TreeNode | null => {

    // Base case
    if (index.value === seq.length) {
        return null;
    }

    // Return if the next element of the given sequence is within the invalid range
    const val = seq[index.value];
    if (val < min || val > max) {
        return null;
    }

    // Construct the root node and increment index
    const root = new TreeNode(val);
    index.value++;

    // Since all elements in the left subtree of a BST must be less
    // than the root node's value, set range as `[min, val-1]` and recur
    root.left = buildTree(seq, index, min, val - 1);

    // Since all elements in the right subtree of a BST must be greater
    // than the root node's value, set range as `[val+1…max]` and recur
    root.right = buildTree(seq, index, val + 1, max);

    // return root node
    return root;
};

// Function to check if a given sequence represents the preorder traversal of a BST
const isBST = (seq: number[]): boolean => {

    /* 1. Construct the BST from the given sequence in a preorder fashion */

    // stores index of the next unprocessed node in the sequence
    const index = { value: 0 };

    // set the root node's range as [-INFINITY, INFINITY] and recur
    buildTree(seq, index, -Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);

    /* 2. Just check if the whole sequence is traversed or not */
    return index.value === seq.length;
};

// demo

const seq = [15, 10, 8, 12, 20, 16, 25];

if (isBST(seq)) {
    console.log('Sequence represents preorder traversal of a BST');
} else {
    console.log("Sequence doesn't represent preorder traversal of a BST");
}
```

The time complexity of the above solution is O(n), where `n` is the size of the BST, and requires space proportional to the tree’s height for the call stack.
