# Construct a height-balanced BST from a sorted doubly linked list

> Source: https://www.techiedelight.com/construct-height-balanced-bst-from-sorted-doubly-linked-list/

Given a sorted doubly linked list, [in-place](https://techiedelight.com/in-place-vs-out-of-place-algorithms/) convert it into a height-balanced binary search tree (BST). The difference between the height of the left and right subtree for every node of a height-balanced BST is never greater than 1.

The conversion should be done such that the previous child pointer of a doubly-linked list node should act as a left pointer for a binary tree node, and the next child pointer should act as the right pointer for a binary tree node. The conversion should also be done by only exchanging the pointers without allocating any memory for the BST nodes.

For example,

> 

A simple solution would be to traverse the doubly linked list, store every node in an array, and then construct a height-balanced BST from nodes in the array. The idea is to make the middle node in the _sorted array_ as the BST’s root node. All nodes before the middle node will go in the left subtree, and all nodes after the middle node will go in the right subtree. If we follow this recursively for the left and right subtree, we will get a height-balanced BST. Following is the pictorial representation of this approach, followed by a TypeScript implementation:

```ts
// A class to store a Doubly Linked List / BST node
class Node {
    // The `prev` and `next` pointer of the doubly linked list can act as
    // left and right child for the BST, respectively
    data: number;
    prev: Node | null = null;
    next: Node | null = null;
    constructor(data: number, prev: Node | null = null, next: Node | null = null) {
        this.data = data;
        this.prev = prev;
        this.next = next;
    }
}

// Function to insert a new node at the beginning of the doubly linked list
function push(head: Node | null, data: number): Node {

    // allocate a new node and link it at the beginning
    const node = new Node(data);
    node.next = head;

    // change `prev` of the existing head node to point to the new node
    if (head) {
        head.prev = node;
    }

    // update head pointer
    return node;
}

// Function to print nodes of a doubly linked list
function printListNodes(node: Node | null): string {

    let output = '';
    while (node) {
        output += node.data + ' ';
        node = node.next;
    }
    return output;
}

// Function to print preorder traversal of the BST
function preorder(root: Node | null, output: number[] = []): void {

    if (root === null) {
        return;
    }

    output.push(root.data);
    preorder(root.prev, output);
    preorder(root.next, output);
}

// Function to push nodes of a given BST in a list
function pushDDLNodes(node: Node | null, nodes: Node[]): void {

    while (node) {
        nodes.push(node);
        node = node.next;
    }
}

// Recursive function to construct a height-balanced BST from
// given nodes in sorted order
function buildBalancedBST(nodes: Node[], start: number, end: number): Node | null {

    // base case
    if (start > end) {
        return null;
    }

    // find the middle index
    const mid = (start + end) / 2;

    // The root node will be a node present at the mid-index
    const root = nodes[mid];

    // recursively construct left and right subtree
    root.prev = buildBalancedBST(nodes, start, mid - 1);
    root.next = buildBalancedBST(nodes, mid + 1, end);

    // return root node
    return root;
}

// Function to construct a height-balanced BST from a sorted doubly linked list.
function convertSortedDLLToBalancedBST(head: Node | null): Node | null {

    // Push nodes of a given BST into a list in the original order
    const nodes: Node[] = [];
    pushDDLNodes(head, nodes);

    // Construct a height-balanced BST from sorted BST nodes
    return buildBalancedBST(nodes, 0, nodes.length - 1);
}

// points to the head of a doubly linked list
let head: Node | null = null;

// construct a doubly linked list from sorted keys
const keys = [25, 20, 18, 15, 12, 10, 8];
for (const key of keys) {
    head = push(head, key);
}

console.log(`Doubly Linked List: ${printListNodes(head)}`);

// construct a height-balanced BST from a sorted doubly linked list
const root = convertSortedDLLToBalancedBST(head);

const output: number[] = [];
preorder(root, output);
console.log(`Preorder traversal of the constructed BST: ${output.join(' ')}`);
```

**Output:** Doubly Linked List: 8 10 12 15 18 20 25 Preorder traversal of the constructed BST: 15 10 8 12 20 18 25

The time complexity of the above solution is O(n), where `n` is the size of the BST. However, it requires O(n) extra space for storing the BST nodes. We can do the conversion in-place without any auxiliary data structure.

The idea is to build the BST in an [inorder fashion](https://techiedelight.com/inorder-tree-traversal-iterative-recursive/), i.e., the same order as nodes appear in the doubly linked list. We start by counting the total number of nodes in the doubly linked list. Then recursively construct the left subtree with the first half of nodes in a doubly-linked list, assign the middle node of the doubly linked list to the BST’s root node, and set the constructed left subtree as the left child of the root node. To get the middle node in constant time, move the head pointer of the doubly linked list to the next node after setting the BST’s root node. Finally, recursively construct the right subtree with remaining nodes in the doubly linked list and set it as the root node’s right child.

The algorithm can be implemented as follows in TypeScript:

```ts
// A class to store a Doubly Linked List / BST node
class Node {
    // The `prev` and `next` pointer of the doubly linked list can act as
    // left and right child for the BST, respectively
    data: number;
    prev: Node | null = null;
    next: Node | null = null;
    constructor(data: number, prev: Node | null = null, next: Node | null = null) {
        this.data = data;
        this.prev = prev;
        this.next = next;
    }
}

// Function to insert a new node at the beginning of the doubly linked list
function push(head: Node | null, data: number): Node {

    // allocate a new node and link it at the beginning
    const node = new Node(data);
    node.next = head;

    // change `prev` of the existing head node to point to the new node
    if (head) {
        head.prev = node;
    }

    // update head pointer
    return node;
}

// Function to print and count the total number of nodes in a doubly-linked list
function printAndCountNodes(node: Node | null): [number, string] {
    let counter = 0;
    let output = '';
    while (node) {
        output += node.data + ' ';
        node = node.next;
        counter = counter + 1;
    }
    return [counter, output];
}

// Function to print preorder traversal of the BST
function preorder(root: Node | null, output: number[] = []): void {
    if (root === null) {
        return;
    }
    output.push(root.data);
    preorder(root.prev, output);
    preorder(root.next, output);
}

// Recursive function to construct a height-balanced BST from a sorted doubly
// linked list. It takes the head node of the doubly linked list. and the
// total number of nodes in it as an argument
function convertSortedDLLToBalancedBST(head: Node | null, n: number): [Node | null, Node | null] {

    // base case
    if (n <= 0) {
        return [null, head];
    }

    // recursively construct the left subtree
    let leftSubTree: Node | null = null;
    [leftSubTree, head] = convertSortedDLLToBalancedBST(head, Math.floor(n / 2));

    // `head` now points to the middle node of the sorted DDL

    // make the middle node of the sorted DDL as the root node of the BST
    if (head === null) {
        return [null, head];
    }
    const root = head;

    // update left child of the root node
    root.prev = leftSubTree;

    // update the head reference of the doubly linked list
    head = root.next;

    // recursively construct the right subtree with the remaining nodes
    [root.next, head] = convertSortedDLLToBalancedBST(head, n - (Math.floor(n / 2) + 1));
    // +1 for the root

    // return the root node
    return [root, head];
}

// points to the head of a doubly linked list
let head: Node | null = null;

// construct a doubly linked list from sorted keys
const keys = [25, 20, 18, 15, 12, 10, 8];
for (const key of keys) {
    head = push(head, key);
}

// print the list and count the total number of nodes
const [n, listOutput] = printAndCountNodes(head);
console.log(`Doubly Linked List: ${listOutput}`);

// construct a height-balanced BST from a sorted doubly linked list
const [root] = convertSortedDLLToBalancedBST(head, n);

const output: number[] = [];
preorder(root, output);
console.log(`Preorder traversal of the constructed BST: ${output.join(' ')}`);
```

**Output:** Doubly Linked List: 8 10 12 15 18 20 25 Preorder traversal of the constructed BST: 15 10 8 12 20 18 25
