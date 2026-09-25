# Print nodes of a binary tree in vertical order

> Source: https://www.techiedelight.com/print-nodes-binary-tree-vertical-order/

Given a binary tree, print its nodes in vertical order. Assume that the left and right child of a node makes a 45–degree angle with the parent.

For example, nodes in vertical order for following binary tree is

2, 7 1, 5 3, 8 6

> 

We have seen [hash table](https://techiedelight.com/hashing-in-data-structure/) implementation in the [previous post](https://techiedelight.com/vertical-traversal-binary-tree/), which takes O(n.log(n)) time for a binary tree with `n` nodes. We can improve the time complexity of the above solution to linear with an auxiliary data structure such as a doubly-linked list. The idea is to store the vertical order of the binary tree in a doubly-linked list, where each node of the doubly linked list stores every node corresponding to a vertical line in a binary tree. This post provides an overview of some available alternatives to accomplish this using a doubly-linked list.

## 1\. Using Preorder traversal

We start by constructing a doubly linked list node that stores all nodes present at the vertical line passing through the root node. Then `node->prev` and `node->next` will correspond to nodes present at the vertical line passing through the root node’s left and right child, respectively. The trick is to recursively construct the linked list and add nodes to it as we traverse the tree using [preorder traversal](https://techiedelight.com/preorder-tree-traversal-iterative-recursive/).

The algorithm can be implemented as follows in TypeScript:

```ts
// Data structure to store a binary tree node
class TreeNode {
    val: number;
    left: TreeNode | null = null;
    right: TreeNode | null = null;
    constructor(val: number, left: TreeNode | null = null, right: TreeNode | null = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

// A Doubly Linked List Node
class ListNode {
    data: number[] = [];
    prev: ListNode | null = null;
    next: ListNode | null = null;
    constructor(prev: ListNode | null = null, next: ListNode | null = null) {
        this.prev = prev;
        this.next = next;
    }
}

// Function to print the vertical order stored in a given doubly linked list
function printList(mid: ListNode | null): void {

    // find the head node
    while (mid && mid.prev) {
        mid = mid.prev;
    }

    // start with the head node
    let head = mid;
    while (head) {
        console.log(head.data);
        head = head.next;
    }
}

// Recursive function to perform preorder traversal on the tree and determine the
// vertical order of a given binary tree.
// Each node of the doubly linked list will store nodes present at the corresponding
// vertical line in a binary tree.
function updateDLLwithVerticalOrder(root: TreeNode | null, curr: ListNode | null): void {

    // base case
    if (root === null || curr === null) {
        return;
    }

    // add the current tree node to the corresponding list node
    curr.data.push(root.val);

    // create a new linked list node corresponding to the vertical line passing
    // through the root's left child, if not already.
    // This node would become the `prev` pointer of the current list node
    if (root.left && curr.prev === null) {
        curr.prev = new ListNode(null, curr);
    }

    // create a new linked list node corresponding to the vertical line passing
    // through the root's right child, if not already.
    // This node would become the `next` pointer of the current list node
    if (root.right && curr.next === null) {
        curr.next = new ListNode(curr, null);
    }

    // recur for the left and right subtree
    updateDLLwithVerticalOrder(root.left, curr.prev);
    updateDLLwithVerticalOrder(root.right, curr.next);
}

// Function to print nodes of a given binary tree in vertical order
function printVertical(root: TreeNode | null): void {

    // create a new linked list node corresponding to the vertical line passing
    // through the root node
    const curr = new ListNode();

    // determine the vertical order and store it in a doubly-linked list
    updateDLLwithVerticalOrder(root, curr);

    // print the linked list
    printList(curr);
}

/* Construct the following tree
          1
        /   \
       /     \
      2       3
            /   \
           /     \
          5       6
        /   \
       /     \
      7       8
            /   \
           /     \
          9      10
*/

const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.right.left = new TreeNode(5);
root.right.right = new TreeNode(6);
root.right.left.left = new TreeNode(7);
root.right.left.right = new TreeNode(8);
root.right.left.right.left = new TreeNode(9);
root.right.left.right.right = new TreeNode(10);

printVertical(root);
```

**Output:** 2 7 1 5 9 3 8 10 6

## 2\. Using Level Order Traversal

Since the above solution uses preorder traversal to traverse the tree, the nodes might not get processed in the same order as they appear in the binary tree from top to bottom. For instance, node 10 get printed before node 6 in the above solution.

We can perform a [level order traversal](https://techiedelight.com/level-order-traversal-binary-tree/) to ensure that nodes are processed in the same order as they appear in the binary tree. The idea remains the same as the previous approach, except we traverse the binary tree using level order traversal instead of the preorder traversal. This is demonstrated below in TypeScript:

```ts
// Data structure to store a binary tree node
class TreeNode {
    val: number;
    left: TreeNode | null = null;
    right: TreeNode | null = null;
    constructor(val: number, left: TreeNode | null = null, right: TreeNode | null = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

// A Doubly Linked List Node
class ListNode {
    data: number[] = [];
    prev: ListNode | null = null;
    next: ListNode | null = null;
    constructor(prev: ListNode | null = null, next: ListNode | null = null) {
        this.prev = prev;
        this.next = next;
    }
}

// Function to print the vertical order stored in a given doubly linked list
function printList(mid: ListNode | null): void {

    // find the head node
    while (mid && mid.prev) {
        mid = mid.prev;
    }

    // start with the head node
    let head = mid;
    while (head) {
        console.log(head.data);
        head = head.next;
    }
}

// Function to perform level order traversal on the tree and determine the
// vertical order of a given binary tree.
// Each node of the doubly linked list will store nodes present at the corresponding
// vertical line in a binary tree.
function updateDLLwithVerticalOrder(root: TreeNode | null, curr: ListNode | null): void {

    // base case
    if (root === null || curr === null) {
        return;
    }

    // create an empty queue for level order traversal and
    // enqueue root node with its corresponding linked list node
    const q: [TreeNode, ListNode][] = [];
    q.push([root, curr]);

    // loop till queue is empty
    while (q.length > 0) {

        // dequeue front node
        const entry = q.shift();
        if (entry === undefined) {
            break;
        }
        const [node, curr] = entry;

        // push the value of the current tree node into the corresponding list node
        curr.data.push(node.val);

        // process non-empty left child
        if (node.left) {
            // create a new linked list node corresponding to the vertical line passing
            // through the node's left child, if not already.
            // This node would become the `prev` pointer of the current list node
            if (curr.prev === null) {
                curr.prev = new ListNode(null, curr);
            }

            // enqueue left child with its corresponding linked list node
            q.push([node.left, curr.prev]);
        }

        // process non-empty right child
        if (node.right) {
            // create a new linked list node corresponding to the vertical line passing
            // through the node's right child, if not already.
            // This node would become the `next` pointer of the current list node
            if (curr.next === null) {
                curr.next = new ListNode(curr, null);
            }

            // enqueue right child with its corresponding linked list node
            q.push([node.right, curr.next]);
        }
    }
}

// Function to print nodes of a given binary tree in vertical order
function printVertical(root: TreeNode | null): void {

    // create a new linked list node corresponding to the vertical line passing
    // through the root node
    const curr = new ListNode();

    // determine vertical order and store it in a doubly-linked list
    updateDLLwithVerticalOrder(root, curr);

    // print the linked list
    printList(curr);
}

/* Construct the following tree
          1
        /   \
       /     \
      2       3
            /   \
           /     \
          5       6
        /   \
       /     \
      7       8
            /   \
           /     \
          9      10
*/

const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.right.left = new TreeNode(5);
root.right.right = new TreeNode(6);
root.right.left.left = new TreeNode(7);
root.right.left.right = new TreeNode(8);
root.right.left.right.left = new TreeNode(9);
root.right.left.right.right = new TreeNode(10);

printVertical(root);
```

**Output:** 2 7 1 5 9 3 8 6 10

The time complexity of both above-discussed methods is O(n), where `n` is the total number of nodes in the binary tree. The auxiliary space used is O(n) for a doubly linked list.
