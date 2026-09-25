# Convert a ternary tree to a doubly-linked list

> Source: https://www.techiedelight.com/convert-ternary-tree-doubly-linked-list/

Given a ternary tree, [in-place](https://techiedelight.com/in-place-vs-out-of-place-algorithms/) convert it into a doubly-linked list. A ternary tree is a tree data structure in which each node has three child nodes distinguished as left, mid, and right.

The conversion should be done so that the left child pointer of a ternary tree node should act as a previous pointer for the doubly linked list node, the right child pointer should serve as the next pointer for the doubly linked list node, and the mid-child pointer should point to nothing. The conversion should be done by only exchanging ternary tree node pointers without allocating any extra memory for the nodes of the doubly linked list.

Consider the following ternary tree, which shows the order in which the nodes should be present in a doubly-linked list:

**Input:** Ternary Tree 1 / | \ / | \ / | \ 2 9 12 / | \ / \ | \ 3 6 8 10 11 13 16 | \ / \ | 4 7 14 15 17 \ 5 **Output:** Doubly Linked List 1 —> 2 —> 3 —> 4 —> 5 —> 6 —> 7 —> 8 —> 9 —> 10 —> 11 —> 12 —> 13 —> 14 —> 15 —> 16 —> 17 —> nullptr

As evident from the above example, the ternary tree’s root node is pushed before its children into the doubly linked list. Every node recursively follows this in the subtree rooted at its left child, mid-child, and right child, in that order.

> 

The idea is to perform reverse [postorder traversal](https://techiedelight.com/postorder-tree-traversal-iterative-recursive/) on a ternary tree. In reverse postorder traversal, before processing a ternary tree node, its right child is processed first, followed by its mid and left child. After traversing all children of a ternary tree node, insert the node at the front of the doubly linked list. The reverse postorder traversal is used to ensure the correct insertion order in a doubly-linked list.

Following is a TypeScript program that demonstrates the idea:

```ts
// A class to store a ternary tree node
class Node {
    data: number;
    left: Node | null = null;
    mid: Node | null = null;
    right: Node | null = null;
    constructor(data: number, left: Node | null = null, mid: Node | null = null, right: Node | null = null) {}
}

// Insert a tree node at the front of the doubly linked list
function push(node: Node, head: Node | null): Node | null {
    // insert the given node at the front of the doubly linked list
    head!.left = node;
    node.right = head;

    // update left and mid-child pointer to null
    node.left = node.mid = null;

    // update and return a head pointer to point to the given node
    head = node;
    return head;
}

// Convert a ternary tree into a doubly-linked list using reverse postorder traversal
function ternaryTreeToDoublyLinkedList(root: Node | null, head: Node | null = null): Node | null {
    // base case: an empty tree
    if (root === null) {
        return head;
    }

    // recur for the right, mid, and left child
    head = ternaryTreeToDoublyLinkedList(root.right, head);
    head = ternaryTreeToDoublyLinkedList(root.mid, head);
    head = ternaryTreeToDoublyLinkedList(root.left, head);

    // initialize head pointer of a doubly linked list
    if (head === null) {
        head = root;
    } else {
        // push the current node at the front of the doubly linked list
        head = push(root, head);
    }

    return head;
}

// Function to print a doubly linked list
function printDoublyLinkedList(node: Node | null): void {
    let out = '';
    while (node) {
        out += `${node.data} —> `;
        node = node.right;
    }
    console.log(out + 'null');
}

/* Construct the following ternary tree
              1
            / | \
          /   |   \
        /     |     \
       2      9      12
     / | \   / \     |  \
    3  6  8 10  11  13   16
    |   \          /  \   |
    4    7        14  15  17
     \
      5
*/

const root = new Node(1);

root.left = new Node(2);
root.mid = new Node(9);
root.right = new Node(12);

root.left!.left = new Node(3);
root.left!.mid = new Node(6);
root.left!.right = new Node(8);

root.mid!.left = new Node(10);
root.mid!.right = new Node(11);

root.right!.mid = new Node(13);
root.right!.right = new Node(16);

root.left!.left!.mid = new Node(4);
root.left!.left!.mid!.right = new Node(5);
root.left!.mid!.right = new Node(7);

root.right!.mid!.left = new Node(14);
root.right!.mid!.right = new Node(15);
root.right!.right!.mid = new Node(17);

ternaryTreeToDoublyLinkedList(root);
printDoublyLinkedList(root);
```

**Output:** 1 —> 2 —> 3 —> 4 —> 5 —> 6 —> 7 —> 8 —> 9 —> 10 —> 11 —> 12 —> 13 —> 14 —> 15 —> 16 —> 17 —> nullptr

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the ternary tree. The program requires O(h) extra space for the call stack, where `h` is the height of the tree.

Also See:

> [Extract leaves of a binary tree into a doubly-linked list](https://www.techiedelight.com/extract-leaves-of-binary-tree-into-doubly-linked-list/ "Extract leaves of a binary tree into a doubly-linked list")

> [Merge two BSTs into a doubly-linked list in sorted order](https://www.techiedelight.com/merge-two-bsts-into-doubly-linked-list-sorted-order/ "Merge two BSTs into a doubly-linked list in sorted order")

> [Convert a binary tree into a doubly-linked list in spiral order](https://www.techiedelight.com/convert-binary-tree-into-doubly-linked-list/ "Convert a binary tree into a doubly-linked list in spiral order")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.86/5. Vote count: 152

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
