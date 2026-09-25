# Reverse a linked List – Iterative Solution | C, Java, and Python

> Source: https://www.techiedelight.com/reverse-linked-list-part-1-iterative-solution/

[Linked List](https://www.techiedelight.com/Category/Linked-List/)

In this post, we will see how to reverse the singly linked list iteratively without using recursion.

For example,

**Input:** 1 —> 2 —> 3 —> 4 —> 5 —> 6 —> null **Output:** 6 —> 5 —> 4 —> 3 —> 2 —> 1 —> null

> 

The idea is to use three-pointers: `next`, `current`, `previous` and move them down the list. Here, `current` is the main pointer running down the list, `next` leads it, and `previous` trails it. For each step, reverse the current pointer and then advance all three to get the next node.

This `previous-current-next` strategy can be implemented as follows in TypeScript:

```ts
class ListNode {
    constructor(public data: number, public next: ListNode | null = null) {}
}

// Helper function to print a given linked list
function printList(head: ListNode | null): void {
    let ptr: ListNode | null = head;
    while (ptr) {
        process.stdout.write(ptr.data + ' —> ');
        ptr = ptr.next;
    }
    console.log('null');
}

// Reverses a given linked list by changing its `.next` fields and
// its head.
function reverse(head: ListNode | null): ListNode | null {
    let previous: ListNode | null = null;
    let current: ListNode | null = head;

    // traverse the list
    while (current) {
        // tricky: note the next node
        const next = current.next;

        current.next = previous;    // fix the current node

        previous = current;
        current = next;
    }

    // fix the head to point to the new front
    return previous;
}

// demo
let head: ListNode | null = null;
for (let i = 6; i > 0; i--) {
    head = new ListNode(i, head);
}

head = reverse(head);
printList(head);
```

**Output:** 6 —> 5 —> 4 —> 3 —> 2 —> 1 —> null

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the linked list, and doesn’t require any extra space. Here’s another variation of the above solution that uses [moveNode()](https://techiedelight.com/move-front-node-given-list-front-another-list/) to do the work.

The implementation can be seen below in TypeScript:

```ts
class ListNode {
    constructor(public data: number, public next: ListNode | null = null) {}
}

// Helper function to print a given linked list
function printList(head: ListNode | null): void {
    let ptr: ListNode | null = head;
    while (ptr) {
        process.stdout.write(ptr.data + ' —> ');
        ptr = ptr.next;
    }
    console.log('null');
}

// Function takes the node from the front of the source and move it
// to the front of the destination
function moveNode(destRef: { head: ListNode | null }, sourceRef: { head: ListNode | null }): void {
    // if the source list empty, do nothing
    if (sourceRef.head === null) {
        return;
    }

    const newNode = sourceRef.head;       // the front source node
    sourceRef.head = sourceRef.head.next; // advance the source pointer
    newNode.next = destRef.head;          // link the old dest off the new node
    destRef.head = newNode;               // move dest to point to the new node
}

// Iterate through the list and move each node to the front of the
// result list like `push()` of the node. It uses `moveNode()`.
function reverse(head: ListNode | null): ListNode | null {
    const result = { head: null as ListNode | null };
    const current = { head };

    while (current.head) {
        moveNode(result, current);
    }

    return result.head;
}

// demo
let head: ListNode | null = null;
for (let i = 6; i > 0; i--) {
    head = new ListNode(i, head);
}

head = reverse(head);
printList(head);
```

**Output:** 6 —> 5 —> 4 —> 3 —> 2 —> 1 —> null

**Also see:**

> [Reverse a Linked List – Recursive Solution | C, C++, Java, and Python](https://techiedelight.com/reverse-linked-list-part-2-recursive-solution/)

> [Reverse specified portion of a linked list](https://techiedelight.com/reverse-specified-portion-linked-list/)

**Source:** <http://cslibrary.stanford.edu/105/LinkedListProblems.pdf>
