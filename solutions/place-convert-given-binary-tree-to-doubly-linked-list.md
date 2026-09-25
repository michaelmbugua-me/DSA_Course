# In-place convert a binary tree to a doubly-linked list

> Source: https://www.techiedelight.com/place-convert-given-binary-tree-to-doubly-linked-list/

Given a binary tree, [in-place](https://techiedelight.com/in-place-vs-out-of-place-algorithms/) convert it into a doubly linked list.

The conversion should be done such that the left and right pointers of binary tree nodes should act as previous and next pointers in a doubly-linked list, and the doubly linked list nodes should follow the same order of nodes as inorder traversal on the tree.

For example,

> 

## 1\. Using Inorder Traversal

The idea is to perform an [inorder traversal](https://techiedelight.com/inorder-tree-traversal-iterative-recursive/) on the tree, and for every node encountered, insert it at the beginning of a doubly linked list. Since we are inserting nodes at the beginning of the doubly linked list, reverse the linked list to follow the same order of nodes as in the inorder traversal.

Following is the implementation in TypeScript based on the above idea:

```ts
// A class to store a binary tree node
class TreeNode {
    constructor(public data: number,
                public left: TreeNode | null = null,
                public right: TreeNode | null = null) {}
}

// Function to print a given doubly linked list
function printDLL(head: TreeNode | null): void {

    let curr = head;
    while (curr) {
        process.stdout.write(`${curr.data} `);
        curr = curr.right;
    }
}

// Function to in-place convert a given binary tree into a doubly linked list
// by doing normal inorder traversal
function convert(root: TreeNode | null, head: TreeNode | null): TreeNode | null {

    // base case: tree is empty
    if (root === null) {
        return head;
    }

    // recursively convert the left subtree first
    head = convert(root.left, head);
    root.left = null;

    // store right child
    const right = root.right;

    // insert the current node at the beginning of a doubly linked list
    root.right = head;
    if (head) {
        head.left = root;
    }

    head = root;

    // recursively convert the right subtree
    return convert(right, head);
}

// Function to reverse a doubly-linked list
function reverse(head: TreeNode | null): TreeNode | null {

    let prev: TreeNode | null = null;
    let current = head;

    while (current) {
        // swap current.left with current.right
        const temp = current.left;
        current.left = current.right;
        current.right = temp;

        prev = current;
        current = current.left;
    }

    return prev;
}

// The main function to in-place convert a given binary tree into a
// doubly linked list
function convertBinaryTreeToDDL(root: TreeNode | null): void {

    // head of the doubly linked list
    let head: TreeNode | null = null;

    // convert the above binary tree into doubly linked list
    head = convert(root, head);

    // reverse the linked list
    head = reverse(head);

    // print the list
    printDLL(head);
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

convertBinaryTreeToDDL(root);
```

**Output:** 4 2 5 1 6 3 7

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the binary tree. The program requires O(h) extra space for the call stack, where `h` is the height of the tree.

## 2\. Using Reverse Inorder Traversal

The above approach requires two passes – one pass for converting a binary tree into a doubly linked list and one pass to reverse the DDL. We can solve this problem in a single traversal of the tree using reverse inorder traversal instead of normal inorder traversal. In reverse inorder traversal, we process the right subtree before the left subtree. Now, the nodes will follow the order of inorder traversal.

The algorithm can be implemented as follows in TypeScript:

```ts
// A class to store a binary tree node
class TreeNode {
    constructor(public data: number,
                public left: TreeNode | null = null,
                public right: TreeNode | null = null) {}
}

// Helper function to print a given doubly linked list
function printDLL(head: TreeNode | null): void {

    let curr = head;
    while (curr) {
        process.stdout.write(`${curr.data} `);
        curr = curr.right;
    }
}

// Function to in-place convert a given binary tree into a doubly linked list
// by doing reverse inorder traversal
function convert(root: TreeNode | null, head: TreeNode | null): TreeNode | null {

    // base case: tree is empty
    if (root === null) {
        return head;
    }

    // recursively convert the right subtree first
    head = convert(root.right, head);

    // insert the current node at the beginning of a doubly linked list
    root.right = head;

    if (head) {
        head.left = root;
    }

    head = root;

    // recursively convert the left subtree
    return convert(root.left, head);
}

// In-place convert a given binary tree into a doubly linked list
function convertBT(root: TreeNode | null): TreeNode | null {

    // head of the doubly linked list
    const head: TreeNode | null = null;

    // convert the above binary tree into doubly linked list
    return convert(root, head);
}

/* Construct the following tree
          1
        /   \
       /     \
      2       3
     / \     / \
    4   5   6   7
*/

let root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);
root.right.left = new TreeNode(6);
root.right.right = new TreeNode(7);

root = convertBT(root);

// print the list
printDLL(root);
```

**Output:** 4 2 5 1 6 3 7

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the binary tree. The program requires O(h) extra space for the call stack, where `h` is the height of the tree.

## 3\. Keeping track of previously processed node in the inorder traversal

We can solve this problem in a single traversal by doing inorder traversal only. The idea is to keep track of the previously processed node in the inorder traversal, and for every encountered node, set its left child to prev and prev’s right child to the current node.

Following is a TypeScript implementation of the idea:

```ts
// A class to store a binary tree node
class TreeNode {
    constructor(public data: number,
                public left: TreeNode | null = null,
                public right: TreeNode | null = null) {}
}

// Helper function to print a given doubly linked list
function printDLL(head: TreeNode | null): void {

    let curr = head;
    while (curr) {
        process.stdout.write(`${curr.data} `);
        curr = curr.right;
    }
}

// Function to in-place convert a given binary tree into a doubly linked list

// curr —> current node
// head —> head of the doubly linked list
// prev —> previously processed node
function convert(curr: TreeNode | null, head: { node: TreeNode | null },
                 prev: { node: TreeNode | null }): void {

    // base case: tree is empty
    if (curr === null) {
        return;
    }

    // recursively convert the left subtree first
    convert(curr.left, head, prev);

    // adjust pointers
    if (prev.node !== null) {
        // set the current node's left child to `prev`
        curr.left = prev.node;

        // make the previous node's right child as `curr`
        prev.node.right = curr;
    } else {
        // if `prev` is null, then update the head of doubly linked list
        // as this is the first node in inorder
        head.node = curr;
    }

    // after the current node is visited, update the previous pointer
    // to the current node
    prev.node = curr;

    // recursively convert the right subtree
    convert(curr.right, head, prev);
}

// In-place convert a given binary tree into a doubly linked list
function convertTree(root: TreeNode | null): TreeNode | null {
    // `prev` keeps track of the previously processed node in the
    // inorder traversal
    const prev = { node: null as TreeNode | null };

    // head of the doubly linked list
    const head = { node: null as TreeNode | null };

    // convert the above binary tree into doubly linked list
    // (using inorder traversal)
    convert(root, head, prev);

    // head is now head of the doubly linked list
    return head.node;
}

/* Construct the following tree
          1
        /     \
       2       3
      / \     / \
     4   5   6   7
*/

let root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);
root.right.left = new TreeNode(6);
root.right.right = new TreeNode(7);

root = convertTree(root);

// print the list
printDLL(root);
```

**Output:** 4 2 5 1 6 3 7
