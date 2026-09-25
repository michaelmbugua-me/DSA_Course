# Reverse a doubly linked list

> Source: https://www.techiedelight.com/reverse-doubly-linked-list/

[Linked List](https://www.techiedelight.com/Category/Linked-List/)

In this post, we will see how to reverse a doubly linked list using iteration and recursion.

> 

## 1\. Iterative Solution

The idea is simple – Traverse the list and swap `next` and `prev` pointers for each node. Finally, update `head` pointer to point to the last node.

Following is a TypeScript program that demonstrates it:

```ts
// A Doubly Linked List Node
class ListNode {
    constructor(public val: number, public prev: ListNode | null = null, public next: ListNode | null = null) {}
}

// Utility function to push a node at the beginning of the doubly linked list
function push(head: ListNode | null, val: number): ListNode {
    const node = new ListNode(val, null, head);

    // change `prev` of the existing head node to point to the new node
    if (head) {
        head.prev = node;
    }

    // update head pointer and return
    return node;
}

// Helper function to print nodes of a doubly linked list
function printDDL(msg: string, head: ListNode | null): void {
    console.log(msg);
    while (head) {
        console.log(head.val + ' —> ');
        head = head.next;
    }
    console.log('null');
}

// Function to swap `next` and `prev` pointers of the given node
function swap(node: ListNode): void {
    const prev = node.prev;
    node.prev = node.next;
    node.next = prev;
}

// Function to reverse a doubly-linked list
function reverseDDL(head: ListNode | null): ListNode | null {
    let prev: ListNode | null = null;
    let curr: ListNode | null = head;

    // traverse the list
    while (curr) {
        // swap `next` and `prev` pointers for the current node
        swap(curr);

        // update the previous node before moving to the next node
        prev = curr;

        // move to the next node in the doubly linked list
        // (advance using `prev` pointer since `next` and `prev` pointers were swapped)
        curr = curr.prev;
    }

    // update head pointer to the last node
    if (prev) {
        head = prev;
    }

    return head;
}

let head: ListNode | null = null;
for (let key = 1; key <= 5; key++) {
    head = push(head, key);
}

printDDL('Original A: ', head);
head = reverseDDL(head);
printDDL('Reversed A: ', head);
```

**Output:** Original list: 5 —> 4 —> 3 —> 2 —> 1 —> NULL Reversed list: 1 —> 2 —> 3 —> 4 —> 5 —> NULL



## 2\. Recursive Solution

We can also solve this problem recursively by passing current node information in the [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/) itself. This is demonstrated below in TypeScript:

```ts
// A Doubly Linked List Node
class ListNode {
    constructor(public val: number, public prev: ListNode | null = null, public next: ListNode | null = null) {}
}

// Utility function to push a node at the beginning of the doubly linked list
function push(head: ListNode | null, key: number): ListNode {
    const node = new ListNode(key);
    node.next = head;

    // change `prev` of the existing head node to point to the new node
    if (head) {
        head.prev = node;
    }

    // update head and return
    return node;
}

// Helper function to print nodes of a doubly linked list
function printDDL(msg: string, head: ListNode | null): void {
    console.log(msg);
    while (head) {
        console.log(head.val + ' —> ');
        head = head.next;
    }
    console.log('null');
}

// Function to swap `next` and `prev` pointers of the given node
function swap(node: ListNode): void {
    const prev = node.prev;
    node.prev = node.next;
    node.next = prev;
}

// Recursive function to reverse a doubly-linked list
function reverse(head: ListNode | null, curr: ListNode): ListNode | null {
    // last node
    if (curr.next === null) {
        // swap `next` and `prev` pointers for the current node
        swap(curr);

        // update head
        head = curr;
        return head;
    }

    // swap `next` and `prev` pointers for the current node
    swap(curr);

    // recur with the next node
    head = reverse(head, curr.prev as ListNode);
    return head;
}

// Function to reverse a doubly-linked list
function reverseDDL(head: ListNode | null): ListNode | null {
    // base case
    if (!head) {
        return head;
    }

    // stores the previous node and the current node
    const curr: ListNode = head;

    // pass current and previous node information in the recursion itself
    head = reverse(head, curr);
    return head;
}

let head: ListNode | null = null;
for (let key = 1; key <= 5; key++) {
    head = push(head, key);
}

printDDL('Original List: ', head);
head = reverseDDL(head);
printDDL('Reversed List: ', head);
```

**Output:** Original list: 5 —> 4 —> 3 —> 2 —> 1 —> NULL Reversed list: 1 —> 2 —> 3 —> 4 —> 5 —> NULL



The time complexity of both above-discussed methods is O(n), where `n` is the length of the linked list. The iterative version doesn’t require any extra space, whereas the recursive version use stack space proportional to the lists’ length.
