# Construct a height-balanced BST from an unbalanced BST

> Source: https://www.techiedelight.com/construct-height-balanced-bst-from-unbalanced-bst/

Given a binary search tree (BST), convert it into a height-balanced binary search tree.

For a height-balanced binary search tree, the difference between the height of the left and right subtree of every node is never more than 1. The height of a binary search tree with `n` nodes is never more than `log2(n)` \+ 1.

For example, convert BST on the left into a BST on the right:

> 

The idea is to traverse the BST in an [inorder fashion](https://techiedelight.com/inorder-tree-traversal-iterative-recursive/) and store all encountered nodes in a container (array, list, vector, etc.). The container will be sorted since inorder traversal on a BST always visits the nodes in increasing order of their values.

Then construct a height-balanced BST from the sorted nodes. The idea is to start from the middle element of the sorted array. That would be our root node of the BST. All elements before the middle element should go in the left subtree, and all elements after the middle element should go in the right subtree. We can easily do this recursively, and we will end up with a height-balanced BST.

The algorithm can be implemented as follows in TypeScript:

```ts
// A class to store a BST node
class Node {
    // Constructor
    data: number;
    left: Node | null = null;
    right: Node | null = null;
    constructor(data: number, left: Node | null = null, right: Node | null = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

// Function to perform the preorder traversal on a BST
function preorder(root: Node | null, output: number[] = []): void {

    if (root === null) {
        return;
    }

    output.push(root.data);
    preorder(root.left, output);
    preorder(root.right, output);
}

// Recursive function to push nodes of a given binary search tree into a
// list in an inorder fashion
function pushTreeNodes(root: Node | null, nodes: Node[]): void {

    // base case
    if (root === null) {
        return;
    }

    pushTreeNodes(root.left, nodes);
    nodes.push(root);
    pushTreeNodes(root.right, nodes);
}

// Recursive function to construct a height-balanced BST from
// given nodes in sorted order
function buildBalancedBST(nodes: Node[], start: number, end: number): Node | null {

    // base case
    if (start > end) {
        return null;
    }

    // find the middle index
    const mid = Math.floor((start + end) / 2);

    // The root node will be a node present at the mid-index
    const root = nodes[mid];

    // recursively construct left and right subtree
    root.left = buildBalancedBST(nodes, start, mid - 1);
    root.right = buildBalancedBST(nodes, mid + 1, end);

    // return root node
    return root;
}

// Function to construct a height-balanced BST from an unbalanced BST
function constructBalancedBST(root: Node): Node {

    // Push nodes of a given binary search tree into a list in sorted order
    const nodes: Node[] = [];
    pushTreeNodes(root, nodes);

    // Construct a height-balanced BST from sorted BST nodes
    const balancedRoot = buildBalancedBST(nodes, 0, nodes.length - 1);
    if (balancedRoot === null) {
        return root;
    }
    return balancedRoot;
}

let root = new Node(20);
const left = new Node(15);
const leftLeft = new Node(10);
const leftLeftLeft = new Node(5);
root.left = left;
left.left = leftLeft;
leftLeft.left = leftLeftLeft;
leftLeftLeft.left = new Node(2);
leftLeftLeft.right = new Node(8);

root = constructBalancedBST(root);

const output: number[] = [];
preorder(root, output);
console.log(`Preorder traversal of the constructed BST is ${output.join(' ')}`);
```

**Output:** Preorder traversal of the constructed BST is 8 2 5 15 10 20

The time complexity of the above solution is O(n), where `n` is the size of the BST. However, the program requires O(n) extra space for storing the BST nodes.

We can do the conversion [in-place](https://techiedelight.com/in-place-vs-out-of-place-algorithms/) without any auxiliary data structure. The idea is to convert the given BST into a sorted doubly linked list and then construct a height-balanced BST from it. This is demonstrated below in TypeScript:

```ts
// A class to store a BST node
class Node {
    // Constructor
    data: number;
    left: Node | null = null;
    right: Node | null = null;
    constructor(data: number, left: Node | null = null, right: Node | null = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

// Helper function to perform the preorder traversal on a BST
function preorder(root: Node | null, output: number[] = []): void {
    if (root === null) {
        return;
    }
    preorder(root.left, output);
    output.push(root.data);
    preorder(root.right, output);
}

// Function to insert a BST node at the front of a doubly linked list
function push(root: Node, head: Node | null): Node {

    // insert the given node at the front of a DDL
    root.right = head;

    // update the left child of the existing head node of the DDL
    // to point to the BST node
    if (head !== null) {
        head.left = root;
    }

    // update the head pointer of DDL
    head = root;
    return head;
}

/*
Recursive function to construct a sorted doubly linked list from a BST
    root —> Pointer to the root node of the binary search tree
    head —> Reference to the head node of the doubly linked list
    nodes —> Stores the total number of nodes processed so far in the BST
*/
function convertBSTtoSortedDLL(root: Node | null, head: Node | null,
                               nodes = 0): [Node | null, number] {

    // base case
    if (root === null) {
        return [head, nodes];
    }

    // recursively convert the right subtree
    [head, nodes] = convertBSTtoSortedDLL(root.right, head, nodes);

    // push the current node at the front of the doubly linked list
    head = push(root, head);

    // increment the number of nodes
    nodes = nodes + 1;

    // recursively convert the left subtree
    [head, nodes] = convertBSTtoSortedDLL(root.left, head, nodes);

    return [head, nodes];
}

/*
Recursive function to construct a height-balanced BST from a doubly linked list
    head —> Reference to the head node of the doubly linked list
    n —> Total number of nodes in the doubly linked list
*/
function convertSortedDLLToBST(head: Node | null, n: number): [Node | null, Node | null] {

    // base case
    if (n <= 0) {
        return [null, head];
    }

    // recursively construct the left subtree
    const [leftSubTree, h1] = convertSortedDLLToBST(head, Math.floor(n / 2));
    head = h1;

    // `head` now points to the middle node of the sorted DDL

    // make the middle node of the sorted DDL as the root node of the BST
    if (head === null) {
        return [null, head];
    }
    const root = head;

    // update left child of the root node
    root.left = leftSubTree;

    // update the head reference of the doubly linked list
    head = root.right;

    // recursively construct the right subtree with the remaining nodes
    // (+1 for the root node)
    const [rightSubTree, h2] = convertSortedDLLToBST(head, n - (Math.floor(n / 2) + 1));
    root.right = rightSubTree;
    head = h2;

    // return the root node
    return [root, head];
}

// Function to construct a height-balanced BST from an unbalanced BST
function constructBalancedBST(root: Node): Node {

    // pointer to the head node of the doubly linked list
    let head: Node | null = null;

    // convert the given BST into a sorted doubly linked list
    let nodes = 0;
    [head, nodes] = convertBSTtoSortedDLL(root, head, nodes);

    // construct a height-balanced BST from the sorted doubly linked list
    const [newRoot] = convertSortedDLLToBST(head, nodes);

    if (newRoot === null) {
        return root;
    }
    return newRoot;
}

let root = new Node(20);
const left = new Node(15);
const leftLeft = new Node(10);
const leftLeftLeft = new Node(5);
root.left = left;
left.left = leftLeft;
leftLeft.left = leftLeftLeft;
leftLeftLeft.left = new Node(2);
leftLeftLeft.right = new Node(8);

root = constructBalancedBST(root);

const output: number[] = [];
preorder(root, output);
console.log(`Preorder traversal of the constructed BST is ${output.join(' ')}`);
```
