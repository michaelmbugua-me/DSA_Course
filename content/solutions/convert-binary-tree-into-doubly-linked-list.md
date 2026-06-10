# Convert a binary tree into a doubly-linked list in spiral order

> Source: https://www.techiedelight.com/convert-binary-tree-into-doubly-linked-list/

Given a binary tree, [in-place](https://techiedelight.com/in-place-vs-out-of-place-algorithms/) convert it into a doubly-linked list following the spiral order.

The conversion should be done so that the left child pointer of a binary tree node should act as a previous pointer for a doubly-linked list node, and the right child pointer should act as the next pointer for a doubly-linked list node. The conversion should also be done by only exchanging the pointers without allocating any memory for the doubly linked list’s nodes.

For example,

> 

## 1\. Using Hashing

We can use [hashing](https://techiedelight.com/hashing-in-data-structure/) to convert the binary tree into a doubly-linked list. The idea is to traverse the tree in a [preorder fashion](https://techiedelight.com/preorder-tree-traversal-iterative-recursive/) and store each node and its level number in a map using the level number as a key. Finally, iterate through the map and push each level node into the doubly linked list in spiral order.

This approach is demonstrated below in TypeScript:

```ts
// A class to store a binary tree node
class Node {
    key: number;
    left: Node | null = null;
    right: Node | null = null;
    constructor(key: number, left: Node | null = null, right: Node | null = null) {
        this.key = key;
        this.left = left;
        this.right = right;
    }
}

// Helper function to print a doubly linked list
function printDoublyLinkedList(node: Node | null): void {

    let out = '';
    while (node !== null) {
        out += `${node.key} —> `;
        node = node.right;
    }
    console.log(out + 'null');
}

// Insert a tree node at the front of the doubly linked list
function push(node: Node, head: Node | null): Node {

    // initialize head pointer of the doubly linked list
    if (head === null) {
        head = node;
        head.left = null;
        head.right = null;
        return head;
    }

    // insert the given node at the front of the doubly linked list
    head.left = node;
    node.right = head;

    // update left child pointer to be null
    node.left = null;

    // update head pointer to point to the given node
    head = node;
    return head;
}

// Traverse the tree in a preorder fashion and store nodes in a dictionary
// corresponding to their level
function preorder(root: Node | null, level: number, d: Map<number, Node[]>): void {

    // base case: empty tree
    if (root === null) {
        return;
    }

    // insert the current node and its level into the dictionary
    let levelNodes = d.get(level);
    if (!levelNodes) {
        levelNodes = [];
        d.set(level, levelNodes);
    }

    // if the level is odd, insert at front; otherwise, search at the back
    if ((level & 1) === 1) {
        levelNodes.unshift(root);
    }
    else {
        levelNodes.push(root);
    }

    // recur for the left and right subtree with a level increased by 1
    preorder(root.left, level + 1, d);
    preorder(root.right, level + 1, d);
}

// Recursive function to convert a binary tree into a doubly-linked list
// using hashing
function convert(root: Node | null): Node | null {

    // create an empty dictionary to store nodes between given levels
    const d = new Map<number, Node[]>();

    // traverse the tree and insert its nodes into the dictionary
    // corresponding to their level
    preorder(root, 0, d);

    // iterate through the dictionary in decreasing order of level and
    // push nodes of each level into the doubly linked list
    const n = d.size;
    let head: Node | null = null;
    for (let i = n - 1; i >= 0; i--) {
        const levelNodes = d.get(i);
        if (levelNodes === undefined) {
            continue;
        }
        for (const node of levelNodes) {
            head = push(node, head);
        }
    }

    return head;
}

/* Construct the following tree
           1
         /   \
        /     \
       2       3
      / \     / \
     /   \   /   \
    4     5 6     7
*/

let root = new Node(1);
const left = new Node(2);
const right = new Node(3);
root.left = left;
root.right = right;
left.left = new Node(4);
left.right = new Node(5);
right.left = new Node(6);
right.right = new Node(7);

convert(root);
printDoublyLinkedList(root);
```

**Output:** 1 —> 2 —> 3 —> 7 —> 6 —> 5 —> 4 —> nullptr

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the binary tree. The auxiliary space required by the program is O(n) for map and call stack.

## 2\. By Traversing the Tree in Spiral Order

We can also perform [spiral order traversal](https://techiedelight.com/spiral-order-traversal-binary-tree/) of the binary tree using deque (Double-ended queue), similar to the standard [level order traversal](https://techiedelight.com/level-order-traversal-binary-tree/). However, odd level nodes are processed from left to right, and even level nodes are processed from right to left. The deque is used to facilitate traversal in both directions.

Now to convert the binary tree into a doubly-linked list, store all nodes that were popped from the deque during spiral order traversal and later insert those nodes into the doubly linked list in the correct order. This is demonstrated below in TypeScript:

```ts
// A class to store a binary tree node
class Node {
    key: number;
    left: Node | null = null;
    right: Node | null = null;
    constructor(key: number, left: Node | null = null, right: Node | null = null) {
        this.key = key;
        this.left = left;
        this.right = right;
    }
}

// Helper function to print a doubly linked list
function printDoublyLinkedList(node: Node | null): void {

    let out = '';
    while (node !== null) {
        out += `${node.key} —> `;
        node = node.right;
    }
    console.log(out + 'null');
}

// Insert a tree node at the front of the doubly linked list
function push(node: Node, head: Node | null): Node {
    // initialize head pointer of the doubly linked list
    if (head === null) {
        head = node;
        head.left = null;
        head.right = null;
        return head;
    }

    // insert the given node at the front of the doubly linked list
    head.left = node;
    node.right = head;

    // update left child pointer to be null
    node.left = null;

    // update head pointer to point to the given node
    head = node;
    return head;
}

// Function to convert a binary tree into a doubly-linked list
// using spiral order traversal
function convert(root: Node | null): void {
    // base case
    if (root === null) {
        return;
    }

    // create an empty double-ended queue and enqueue the root node
    const deque: Node[] = [];
    deque.unshift(root);

    // `flag` is used to differentiate between odd or even level
    let flag = false;

    // create a stack for storing binary tree nodes in spiral order
    const s: Node[] = [];

    // loop till deque is empty
    while (deque.length > 0) {
        // calculate the total number of nodes at the current level
        let nodeCount = deque.length;

        // process level left to right
        if (flag) {
            // process each node of the current level and enqueue their
            // non-empty left and right child to deque
            while (nodeCount > 0) {
                // pop from the front when `flag` is true
                const curr = deque.shift();
                if (curr === undefined) {
                    break;
                }

                // push the left child into the back, followed by the right child
                if (curr.left !== null) {
                    deque.push(curr.left);
                }

                if (curr.right !== null) {
                    deque.push(curr.right);
                }

                // push the current node into the stack
                s.push(curr);
                nodeCount--;
            }
        }

        // process level right to left
        else {
            // process each node of the current level and enqueue their
            // non-empty right and left child
            while (nodeCount > 0) {
                // pop from the back when `flag` is false
                const curr = deque.pop();
                if (curr === undefined) {
                    break;
                }

                // push the right child at the front, followed by the left child
                if (curr.right !== null) {
                    deque.unshift(curr.right);
                }

                if (curr.left !== null) {
                    deque.unshift(curr.left);
                }

                // push the current node into the stack
                s.push(curr);
                nodeCount--;
            }
        }

        // flip `flag` for the next level
        flag = !flag;
    }

    // Insert all nodes from the stack at the beginning of the doubly linked list
    let head: Node | null = null;
    while (s.length > 0) {
        const node = s.pop();
        if (node === undefined) {
            break;
        }
        head = push(node, head);
    }
}

/* Construct the following tree
          1
        /   \
       /     \
      2       3
     / \     / \
    /   \   /   \
   4     5 6     7
*/

let root = new Node(1);
const left = new Node(2);
const right = new Node(3);
root.left = left;
root.right = right;
left.left = new Node(4);
left.right = new Node(5);
right.left = new Node(6);
right.right = new Node(7);

convert(root);
printDoublyLinkedList(root);
```

**Output:** 1 —> 2 —> 3 —> 7 —> 6 —> 5 —> 4 —> nullptr

The time complexity of the above approach is O(n), where `n` is the total number of nodes in the binary tree. It uses O(n) extra space for the stack.
