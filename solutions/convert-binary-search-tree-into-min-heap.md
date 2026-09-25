# Convert a Binary Search Tree into a Min Heap

> Source: https://www.techiedelight.com/convert-binary-search-tree-into-min-heap/

Given a binary search tree (BST), efficiently convert it into a min-heap. In order words, convert a binary search tree into a complete binary tree where each node has a higher value than its parent’s value.

For example, the solution should convert the BST on the left into the binary tree on the right, or any other binary tree with the same set of keys that satisfies the [structural and heap-ordering property](https://techiedelight.com/introduction-priority-queues-using-binary-heaps/#Heap) of min-heap data structure.

> 

## CASE 1: BST is a Complete Binary Tree

If the given BST is already a complete binary tree, the min-heap’s structural property is already satisfied, and we need to take care of the only heap-ordering property of the min-heap. Basically, we need to ensure that each node’s value is greater than its parent’s value, with the minimum element present at the root.

The idea is to traverse the binary search tree in an [inorder fashion](https://techiedelight.com/inorder-tree-traversal-iterative-recursive/) and enqueue all encountered keys. Then traverse the tree in a [preorder fashion](https://techiedelight.com/preorder-tree-traversal-iterative-recursive/) and for each encountered node, dequeue a key and assign it to the node.

Following is a TypeScript implementation of the above algorithm. The logic works since the nodes get visited in the increasing order of their keys inorder traversal. The preorder traversal ensures that each node in the binary tree has a value greater than its parent’s.

```ts
// A class to store a binary tree node
class Node {
    key: number;
    left: Node | null;
    right: Node | null;

    constructor(key: number,
                left: Node | null = null,
                right: Node | null = null) {
        this.key = key;
        this.left = left;
        this.right = right;
    }
}

// Recursive function to insert a key into a BST
function insert(root: Node | null, key: number): Node {

    // if the root is null, create a new node and return it
    if (root === null) {
        return new Node(key);
    }

    // if the given key is less than the root node, recur for the left subtree
    if (key < root.key) {
        root.left = insert(root.left, key);
    }

    // if the given key is more than the root node, recur for the right subtree
    else {
        root.right = insert(root.right, key);
    }

    return root;
}

// Helper function to perform level order traversal on a binary tree
function printLevelOrderTraversal(root: Node | null): void {
    // base case: empty tree
    if (root === null) {
        return;
    }

    const q: Node[] = [];
    q.push(root);

    while (q.length > 0) {
        const n = q.length;
        const level: number[] = [];
        for (let i = 0; i < n; i++) {
            const front = q.shift();
            if (front === undefined) {
                break;
            }
            level.push(front.key);
            if (front.left) {
                q.push(front.left);
            }
            if (front.right) {
                q.push(front.right);
            }
        }
        console.log(level.join(' '));
    }
}

// Function to perform inorder traversal on a given binary tree and
// enqueue all nodes (in encountered order)
function inorder(root: Node | null, keys: number[]): void {
    if (root === null) {
        return;
    }
    inorder(root.left, keys);
    keys.push(root.key);
    inorder(root.right, keys);
}

// Function to perform preorder traversal on a given binary tree.
// Assign each encountered node with the next key from the queue
function preorder(root: Node | null, keys: number[]): void {

    // base case: empty tree
    if (root === null) {
        return;
    }

    // replace the root's key value with the next key from the queue
    const key = keys.shift();
    if (key === undefined) {
        return;
    }
    root.key = key;

    // process left subtree
    preorder(root.left, keys);

    // process right subtree
    preorder(root.right, keys);
}

// Function to convert a BST into a min-heap
function convert(root: Node | null): void {

    // maintain a queue to store inorder traversal on the tree
    const keys: number[] = [];

    // fill the queue in an inorder fashion
    inorder(root, keys);

    // traverse tree in preorder fashion, and for each encountered node,
    // dequeue a key and assign it to the node
    preorder(root, keys);
}

const keys = [5, 3, 2, 4, 8, 6, 10];

/* Construct the following BST
           5
         /   \
        /     \
       3       8
      / \     / \
     /   \   /   \
    2     4 6    10
*/

let root: Node | null = null;
for (const key of keys) {
    root = insert(root, key);
}

convert(root);
printLevelOrderTraversal(root);
```

**Output:** 2 3 6 4 5 8 10

The time complexity of the above solution is O(n), where `n` is the size of the BST. The program also requires O(n) extra space for the queue.

## CASE 2: BST is not a Complete Binary Tree

For normal BST, we need to take care of both the structural and heap-ordering property of min-heap. We need to ensure that the final tree is a complete binary tree and the value of each node is greater than the value of its parent.

The idea is to traverse the BST in an inorder fashion and store all encountered keys in a queue. Then construct a complete binary tree from sorted keys in the queue. If the binary tree is built level-by-level with nodes having keys in increasing order, the resultant tree will be a min-heap.

The algorithm can be implemented as follows in TypeScript:

```ts
// A class to store a binary tree node
class Node {
    key: number;
    left: Node | null;
    right: Node | null;

    constructor(key: number,
                left: Node | null = null,
                right: Node | null = null) {
        this.key = key;
        this.left = left;
        this.right = right;
    }
}

// Recursive function to insert a key into a BST
function insert(root: Node | null, key: number): Node {

    // if the root is null, create a new node and return it
    if (root === null) {
        return new Node(key);
    }

    // if the given key is less than the root node, recur for the left subtree
    if (key < root.key) {
        root.left = insert(root.left, key);
    }

    // if the given key is more than the root node, recur for the right subtree
    else {
        root.right = insert(root.right, key);
    }

    return root;
}

// Helper function to perform level order traversal on a binary tree
function printLevelOrderTraversal(root: Node | null): void {

    // base case: empty tree
    if (root === null) {
        return;
    }

    const q: Node[] = [];
    q.push(root);

    while (q.length > 0) {
        let n = q.length;
        const level: number[] = [];
        while (n > 0) {
            n = n - 1;
            const front = q.shift();
            if (front === undefined) {
                break;
            }
            level.push(front.key);
            if (front.left) {
                q.push(front.left);
            }
            if (front.right) {
                q.push(front.right);
            }
        }
        console.log(level.join(' '));
    }
}

// Function to construct a complete binary tree from sorted keys in a queue
function construct(keys: number[]): Node | null {

    // construct a queue to store the parent nodes
    const q: Node[] = [];

    // initialize the root node of the complete binary tree
    const rootKey = keys.pop();
    if (rootKey === undefined) {
        return null;
    }
    const root = new Node(rootKey);

    // enqueue root node
    q.push(root);

    // loop till all keys are processed
    while (keys.length > 0) {

        // dequeue front node
        const parent = q.shift();
        if (parent === undefined) {
            return null;
        }

        // allocate the left child of the parent node with the next key
        const leftKey = keys.pop();
        if (leftKey === undefined) {
            return null;
        }
        parent.left = new Node(leftKey);

        // enqueue left child node
        q.push(parent.left);

        // if the next key exists
        if (keys.length > 0) {
            // allocate the right child of the parent node with the next key
            const rightKey = keys.pop();
            if (rightKey === undefined) {
                return null;
            }
            parent.right = new Node(rightKey);

            // enqueue right child node
            q.push(parent.right);
        }
    }

    // return the root node of the complete binary tree
    return root;
}

// Function to perform inorder traversal on a given binary tree and
// enqueue all nodes (in encountered order)
function inorder(root: Node | null, keys: number[]): void {

    if (root === null) {
        return;
    }

    inorder(root.right, keys);
    keys.push(root.key);
    inorder(root.left, keys);
}

// Function to convert a BST into a min-heap without using
// any auxiliary space
function convert(root: Node | null): Node | null {

    // maintain a collection to store reverse inorder traversal on the tree
    const keys: number[] = [];
    inorder(root, keys);

    // construct a complete binary tree from sorted keys in the queue
    root = construct(keys);
    return root;
}

const keys = [5, 3, 2, 4, 8, 10];

/* Construct the following BST
           5
         /   \
        /     \
       3       8
      / \       \
     /   \       \
    2     4      10
*/

let root: Node | null = null;
for (const key of keys) {
    root = insert(root, key);
}

root = convert(root);
printLevelOrderTraversal(root);
```

**Output:** 2 3 4 5 8 10

The time complexity of the above solution is O(n), where `n` is the size of the BST. However, the program requires O(n) extra space for the queue, which can be avoided by doing the conversion [in-place](https://techiedelight.com/in-place-vs-out-of-place-algorithms/). The idea is to convert the binary search tree into a sorted linked list and then transform it into a min-heap.

To convert a BST into a sorted linked list, perform reverse inorder traversal on the BST and push the encountered nodes at the front of the linked list. In the reverse inorder traversal, the right subtree is visited first; then the node is processed, followed by the left subtree.

To convert the sorted list into a min-heap, construct the complete binary tree level-wise from left-to-right. The idea is to traverse the linked list and consider two unprocessed nodes at a time from the front. Those two nodes form children of the last leaf node of the partially constructed complete binary tree. Since the linked list is sorted, the min-heap property is preserved by the algorithm. Note that the root node is separately handled as it is the same as the front node in the sorted list.

```ts
// A class to store a binary tree node
class Node {
    data: number;
    left: Node | null;
    right: Node | null;

    constructor(data: number,
                left: Node | null = null,
                right: Node | null = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
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

// Helper function to perform level order traversal on a binary tree
function printLevelOrderTraversal(root: Node | null): void {
    // base case: empty tree
    if (root === null) {
        return;
    }

    const q: Node[] = [];
    q.push(root);

    while (q.length > 0) {
        const n = q.length;
        const level: number[] = [];
        for (let i = 0; i < n; i++) {
            const front = q.shift();
            if (front === undefined) {
                break;
            }
            level.push(front.data);
            if (front.left) {
                q.push(front.left);
            }
            if (front.right) {
                q.push(front.right);
            }
        }
        console.log(level.join(' '));
    }
}

// Insert a tree node at the front of a linked list
function push(node: Node, head: Node | null): Node {
    // initialize head pointer of the linked list
    if (head === null) {
        head = node;
        head.right = null;
        return head;
    }

    // update the right child of the node to point to the current head of the list
    node.right = head;

    // update head pointer to point to the given node
    head = node;
    return head;
}

// Function to convert a BST into a sorted linked list
function convertTreeToList(root: Node | null, head: Node | null): Node | null {
    // base case: empty tree
    if (root === null) {
        return head;
    }

    // process right child first
    head = convertTreeToList(root.right, head);

    // Insert the current root node at the front of the linked list
    head = push(root, head);

    // process left child
    head = convertTreeToList(root.left, head);

    // set left child as null
    // (since the right child of the linked list acts as a next pointer)
    root.left = null;

    return head;
}

// Function to convert a sorted linked list into a min-heap
function convertListToMinHeap(head: Node | null): Node | null {
    // base case: empty linked list
    if (head === null) {
        return null;
    }

    // construct a queue to store the parent nodes
    const q: Node[] = [];

    // root node of the min-heap would be the front node in the sorted list
    const heap = head;

    // enqueue root node
    q.push(heap);

    // advance the linked list to the next node
    head = head.right;

    // unlink the root node from the unprocessed linked list by
    // setting its right child as null
    heap.right = null;

    // loop till the end of the list is reached
    while (head !== null) {
        // dequeue next node
        const parent = q.shift();
        if (parent === undefined) {
            return heap;
        }

        /* Assign the next node of the linked list to the left child of the
           parent node */

        // process next node in the linked list
        let next = head;

        // enqueue next node
        q.push(next);

        // advance the linked list to the next node
        head = head.right;

        // unlink the next node from the unprocessed linked list by
        // setting its right child as null
        next.right = null;

        // set the next node as the left child of the parent
        parent.left = next;

        /* Assign the next node of the linked list to the right child of the
           parent node (if any) */

        if (head !== null) {
            // process next node in the linked list
            next = head;

            // enqueue next node
            q.push(next);

            // advance the linked list to the next node
            head = head.right;

            // unlink the next node from the unprocessed linked list by
            // setting its right child as null
            next.right = null;

            // set the next node as the right child of the parent
            parent.right = next;
        }
    }

    return heap;
}

// Function to convert a BST into a min-heap without using
// any auxiliary space
function convert(root: Node | null): Node | null {
    // base case
    if (root === null) {
        return null;
    }

    // points to the head of the linked list
    let head = convertTreeToList(root, null);

    // Convert the sorted list into a min-heap
    return convertListToMinHeap(head);
}

const keys = [5, 3, 2, 4, 8, 10];

/* Construct the following BST
           5
         /   \
        /     \
       3       8
      / \       \
     /   \       \
    2     4      10
*/

let root: Node | null = null;
for (const key of keys) {
    root = insert(root, key);
}

root = convert(root);
printLevelOrderTraversal(root);
```

**Output:** 2 3 4 5 8 10
