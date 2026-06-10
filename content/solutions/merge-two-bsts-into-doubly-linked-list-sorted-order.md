# Merge two BSTs into a doubly-linked list in sorted order

> Source: https://www.techiedelight.com/merge-two-bsts-into-doubly-linked-list-sorted-order/

Given two binary search trees, merge them into a doubly-linked list in sorted order.

For example,

**Input:** Below BSTs 20 / \ 10 30 / \ 25 100 50 / \ 5 70 **Output:** Below DDL 5 —> 10 —> 20 —> 25 —> 30 —> 50 —> 70 —> 100 —> null

> 

The idea is to convert each binary search tree into a doubly-linked list first in sorted order and then merge both lists into a single doubly linked list in sorted order.

To convert a binary search tree into a doubly-linked list in sorted order, perform reverse [inorder traversal](https://techiedelight.com/inorder-tree-traversal-iterative-recursive/) on the BST. In the reverse inorder traversal, the right child for a node is processed before its left child. We insert the node at the front of the doubly linked list for each encountered node in the reverse inorder traversal. The reverse inorder traversal is used to ensure the correct insertion order in the doubly linked list since the reverse inorder traversal visits the nodes of a BST in the decreasing order.

This is demonstrated below in TypeScript:

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

// Helper function to print a doubly linked list
function printDoublyLinkedList(head: Node | null): void {
    let str = '';
    let node = head;
    while (node) {
        str += `${node.data} —> `;
        node = node.right;
    }
    console.log(str + 'null');
}

// Function to insert a BST node at the front of a doubly linked list
function push(root: Node, head: Node | null): Node {

    // insert the given node at the front of a DDL
    root.right = head;

    // update the left child of the existing head node of the DDL
    // to point to the BST node
    if (head) {
        head.left = root;
    }

    // update the head pointer of DDL
    head = root;
    return head;
}

// Recursive function to convert a BST into a doubly-linked list. It takes
// the BST's root node and the head node of the doubly linked list as an argument
function convertBSTtoDLL(root: Node | null, head: Node | null): Node | null {

    // Base case
    if (root === null) {
        return head;
    }

    // recursively convert the right subtree
    head = convertBSTtoDLL(root.right, head);

    // push the current node at the front of the doubly linked list
    head = push(root, head);

    // recursively convert the left subtree
    head = convertBSTtoDLL(root.left, head);

    return head;
}

// Recursive function to merge two doubly-linked lists into a
// single doubly linked list in sorted order
function mergeDDLs(a: Node | null, b: Node | null): Node | null {

    // if the first list is empty, return the second list
    if (a === null) {
        return b;
    }

    // if the second list is empty, return the first list
    if (b === null) {
        return a;
    }

    // if the head node of the first list is smaller
    if (a.data < b.data) {
        a.right = mergeDDLs(a.right, b);
        a.right!.left = a;
        return a;
    }

    // if the head node of the second list is smaller
    else {
        b.right = mergeDDLs(a, b.right);
        b.right!.left = b;
        return b;
    }
}

// Function to merge two binary search trees into a doubly-linked list
// in sorted order
function merge(a: Node | null, b: Node | null): Node | null {

    // convert the first binary search tree into a doubly-linked list
    const first = convertBSTtoDLL(a, null);

    // convert the second binary search tree into a doubly-linked list
    const second = convertBSTtoDLL(b, null);

    // merge both doubly-linked lists
    return mergeDDLs(first, second);
}

/*
Construct the first BST
      20
     /  \
   10    30
        /  \
       25  100
*/

const a = new Node(20);
a.left = new Node(10);
a.right = new Node(30);
a.right.left = new Node(25);
a.right.right = new Node(100);

/*
Construct the second BST
      50
     /  \
    5   70
*/

const b = new Node(50);
b.left = new Node(5);
b.right = new Node(70);

// merge both BSTs into a doubly-linked list
const root = merge(a, b);
printDoublyLinkedList(root);
```

**Output:** 5 —> 10 —> 20 —> 25 —> 30 —> 50 —> 70 —> 100 —> null

The time complexity of the above solution is O(m + n), where `m` is the total number of nodes in the first BST and `n` is the total number of nodes in the second BST. The additional space used by the program is O(x + y), where `x` is the height of the first tree, and `y` is the height of the second tree.

Also See:

> [In-place merge two height-balanced BSTs](https://www.techiedelight.com/in-place-merge-two-height-balanced-bsts/ "In-place merge two height-balanced BSTs")

> [Construct a height-balanced BST from a sorted doubly linked list](https://www.techiedelight.com/construct-height-balanced-bst-from-sorted-doubly-linked-list/ "Construct a height-balanced BST from a sorted doubly linked list")

> [Convert a ternary tree to a doubly-linked list](https://www.techiedelight.com/convert-ternary-tree-doubly-linked-list/ "Convert a ternary tree to a doubly-linked list")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.77/5. Vote count: 192

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Depth-first search](https://www.techiedelight.com/Tags/DFS/), [Hard](https://www.techiedelight.com/Tags/hard/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
