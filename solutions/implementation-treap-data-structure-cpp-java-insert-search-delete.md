# Implementation of Treap Data Structure (Insert, Search, and Delete)

> Source: https://www.techiedelight.com/implementation-treap-data-structure-cpp-java-insert-search-delete/

This post will implement treap data structure and perform basic operations like insert, search, and delete on it.

In the [previous post](https://techiedelight.com/Treap-data-structure/), we have discussed treap data structure, a combination of a [binary search tree](https://techiedelight.com/binary-search-tree-bst-interview-questions/) and a [heap](https://techiedelight.com/introduction-priority-queues-using-binary-heaps/#Heap). This post will implement it and perform basic operations like insert, search, and delete on it. Following are the algorithms for basic operations on treap:

## 1\. Insertion in Treap

To insert a new key `x` into the treap, generate a random priority `y` for `x`. Binary search for `x` in the tree, and create a new node at the leaf position where the binary search determines a node for `x` should exist. Then as long as `x` is not the root of the tree and has a larger priority number than its parent `z`, perform a tree rotation that reverses the parent-child relation between `x` and `z`.

## 2\. Deletion in Treap

To delete a node `x` from the treap, remove it if it is a leaf of the tree. If `x` has a single child, `z`, remove `x` from the tree and make `z` be the child of the parent of `x` (or make `z` the root of the tree if `x` had no parent). Finally, if `x` has two children, swap its position in the tree with its immediate successor `z` in the sorted order, resulting in one of the previous cases. In this last case, the swap may violate the heap-ordering property for `z`, so additional rotations may need to be performed to restore this property.

## 3\. Searching in Treap

To search for a given key value, apply a [standard search algorithm](https://techiedelight.com/search-given-key-in-bst/) in a binary search tree, ignoring the priorities.

Following is the implementation of a treap data structure in TypeScript demonstrating the above operations:

```ts
// A Treap Node
class TreapNode {
    // constructor
    constructor(public data: number, public priority = randrange(100),
                public left: TreapNode | null = null, public right: TreapNode | null = null) {}
}

// Generates a pseudo-random integer in range [0, max)
function randrange(max: number): number {
    return Math.floor(Math.random() * max);
}

/* Function to left-rotate a given treap

      r                       R
     / \     Left Rotate     / \
    L   R       ———>        r   Y
       / \                     / \
      X   Y                   L   X
*/

function rotateLeft(root: TreapNode): TreapNode {

    const R = root.right;
    const X = root.right!.left;

    // rotate
    R!.left = root;
    root.right = X;

    // set a new root
    return R!;
}

/* Function to right-rotate a given treap

        r                        L
       / \     Right Rotate     / \
      L   R       ———>         X   r
     / \                          / \
    X   Y                        Y   R
*/

function rotateRight(root: TreapNode): TreapNode {

    const L = root.left;
    const Y = root.left!.right;

    // rotate
    L!.right = root;
    root.left = Y;

    // set a new root
    return L!;
}

// Recursive function to insert a given key with a priority into treap
function insertNode(root: TreapNode | null, data: number): TreapNode {

    // base case
    if (root === null) {
        return new TreapNode(data);
    }

    // if the given data is less than the root node, insert in the left subtree;
    // otherwise, insert in the right subtree
    if (data < root.data) {
        root.left = insertNode(root.left, data);

        // rotate right if heap property is violated
        if (root.left && root.left.priority > root.priority) {
            root = rotateRight(root);
        }
    } else {
        root.right = insertNode(root.right, data);

        // rotate left if heap property is violated
        if (root.right && root.right.priority > root.priority) {
            root = rotateLeft(root);
        }
    }

    return root;
}

// Recursive function to search for a key in a given treap
function searchNode(root: TreapNode | null, key: number): boolean {

    // if the key is not present in the tree
    if (root === null) {
        return false;
    }

    // if the key is found
    if (root.data === key) {
        return true;
    }

    // if the key is less than the root node, search in the left subtree
    if (key < root.data) {
        return searchNode(root.left, key);
    }

    // otherwise, search in the right subtree
    return searchNode(root.right, key);
}

// Recursive function to delete a key from a given treap
function deleteNode(root: TreapNode | null, key: number): TreapNode | null {

    // base case: the key is not found in the tree
    if (root === null) {
        return null;
    }

    // if the key is less than the root node, recur for the left subtree
    if (key < root.data) {
        root.left = deleteNode(root.left, key);
    }

    // if the key is more than the root node, recur for the right subtree
    else if (key > root.data) {
        root.right = deleteNode(root.right, key);
    }

    // if the key is found
    else {

        // Case 1: node to be deleted has no children (it is a leaf node)
        if (root.left === null && root.right === null) {
            // deallocate the memory and update root to null
            root = null;
        }

        // Case 2: node to be deleted has two children
        else if (root.left && root.right) {
            // if the left child has less priority than the right child
            if (root.left.priority < root.right.priority) {
                // call `rotateLeft()` on the root
                root = rotateLeft(root);

                // recursively delete the left child
                root.left = deleteNode(root.left, key);
            } else {
                // call `rotateRight()` on the root
                root = rotateRight(root);

                // recursively delete the right child
                root.right = deleteNode(root.right, key);
            }
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

// Utility function to print two-dimensional view of a treap using
// reverse inorder traversal
function printTreap(root: TreapNode | null, space: number): void {

    const height = 10;

    // Base case
    if (root === null) {
        return;
    }

    // increase distance between levels
    space += height;

    // print the right child first
    printTreap(root.right, space);

    // print the current node after padding with spaces
    for (let i = height; i < space; i++) {
        process.stdout.write(' ');
    }

    console.log(`(${root.data}, ${root.priority})`);

    // print the left child
    printTreap(root.left, space);
}

// Treap keys
const keys = [5, 2, 1, 4, 9, 8, 10];

// construct a treap
let root: TreapNode | null = null;
for (const key of keys) {
    root = insertNode(root, key);
}

console.log('Constructed :\n\n');
printTreap(root, 0);

console.log('\nDeleting node 1:\n\n');
root = deleteNode(root, 1);
printTreap(root, 0);

console.log('\nDeleting node 5:\n\n');
root = deleteNode(root, 5);
printTreap(root, 0);

console.log('\nDeleting node 9:\n\n');
root = deleteNode(root, 9);
printTreap(root, 0);
```

**Output:** The output varies every time we run the program.

**References:** [Treap – Wikipedia](https://en.wikipedia.org/wiki/Treap)

Also See:

> [Deletion from BST (Binary Search Tree)](https://www.techiedelight.com/deletion-from-bst/ "Deletion from BST \(Binary Search Tree\)")

> [Treap Data Structure](https://www.techiedelight.com/treap-data-structure/ "Treap Data Structure")

> [Search a given key in BST – Iterative and Recursive Solution](https://www.techiedelight.com/search-given-key-in-bst/ "Search a given key in BST –  Iterative and Recursive Solution")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.84/5. Vote count: 93

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hard](https://www.techiedelight.com/Tags/hard/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
