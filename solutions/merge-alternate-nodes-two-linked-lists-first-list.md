# Merge alternate nodes of two linked lists into the first list

> Source: https://www.techiedelight.com/merge-alternate-nodes-two-linked-lists-first-list/

[Linked List](https://www.techiedelight.com/Category/Linked-List/)

Given two linked lists, [merge](https://techiedelight.com/merge-given-sorted-linked-lists/) their nodes into the first list by taking nodes alternately between the two lists. If the first list runs out, the remaining nodes of the second list should not be moved.

For example, consider lists `{1, 2, 3}` and `{4, 5, 6, 7, 8}`. Merging them should result in `{1, 4, 2, 5, 3, 6}` and `{7, 8}`, respectively.

> 

The solution depends on being able to move nodes to the end of a list. Many techniques are available to solve this problem: dummy node, local reference, or [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/).

## 1\. Using Dummy Node

The strategy here uses a temporary dummy node as the start of the result list. The pointer tail always points to the last node in the result list, so appending new nodes is easy. The dummy node gives the tail something to point to initially when the result list is empty. This dummy node is efficient since it is only temporary, and it is allocated in the stack. The loop proceeds, removing one node from either `a` or `b` and adding it to the tail. When we are done, set `a` to `dummy.next`.

This approach is demonstrated below in TypeScript:

```ts
// A Linked List Node
class ListNode {
    constructor(public data: number, public next: ListNode | null = null) {}
}

// Function to print a given linked list
function printList(msg: string, head: ListNode | null): void {
    let str = msg;
    let ptr = head;
    while (ptr) {
        str += `${ptr.data} —> `;
        ptr = ptr.next;
    }
    console.log(str + 'null');
}

// Function to construct a linked list by merging alternate nodes of
// two given linked lists using a dummy node
function merge(a: { node: ListNode | null }, b: { node: ListNode | null }): void {

    const dummy = new ListNode(0);
    let tail = dummy;

    while (true) {
        // empty list cases
        if (a.node === null) {
            tail.next = null;    // Note
            break;
        }
        else if (b.node === null) {
            tail.next = a.node;
            break;
        }
        // common case: move two nodes to the tail
        else {
            tail.next = a.node;
            tail = a.node;
            a.node = a.node.next;

            tail.next = b.node!;
            tail = b.node;
            b.node = b.node.next;
        }
    }

    a.node = dummy.next;
}

const a = { node: null as ListNode | null };
const b = { node: null as ListNode | null };

// construct the first list
for (let i = 3; i >= 0; i--) {
    a.node = new ListNode(i, a.node);
}

// construct the second list
for (let i = 10; i >= 4; i--) {
    b.node = new ListNode(i, b.node);
}

// print both lists
printList('First List: ', a.node);
printList('Second List: ', b.node);

merge(a, b);
console.log('\nAfter Merge:');

printList('First List: ', a.node);
printList('Second List: ', b.node);
```


## 2\. Using Local References

This method uses a local reference to get rid of the dummy nodes entirely. Instead of using a dummy node, it maintains a `struct node**` pointer, `lastPtrRef`, which always points to the last pointer of the result list. This solves the same case that the dummy node did – dealing with the result list when it is empty. When trying to build up a list at its tail, either use the dummy node or the `struct node**` “reference” strategy. It uses [moveNode()](https://techiedelight.com/move-front-node-given-list-front-another-list/) function as a helper.

Following is a TypeScript implementation of the idea:

```ts
// A Linked List Node
class ListNode {
    constructor(public data: number, public next: ListNode | null = null) {}
}

// Helper function to print a given linked list
function printList(msg: string, head: ListNode | null): void {
    let str = msg;
    let ptr = head;
    while (ptr) {
        str += `${ptr.data} —> `;
        ptr = ptr.next;
    }
    console.log(str + 'null');
}

// Helper function to insert a new node in the beginning of the linked list
function push(headRef: { node: ListNode | null }, data: number): void {
    headRef.node = new ListNode(data, headRef.node);
}

// `NodePtrRef` emulates a C++ `Node**` using getter/setter closures
type NodePtrRef = {
    get: () => ListNode | null;
    set: (node: ListNode | null) => void;
};

// Function takes the node from the front of the source and moves it
// to the front of the destination
function moveNode(destRef: NodePtrRef, sourceRef: NodePtrRef): void {
    // if the source list is empty, do nothing
    if (sourceRef.get() === null) {
        return;
    }

    const newNode = sourceRef.get()!;       // the front source node
    sourceRef.set(newNode.next);            // advance the source pointer
    newNode.next = destRef.get();           // link the old dest off the new node
    destRef.set(newNode);                   // move dest to point to the new node
}

// Function to construct a linked list by merging alternate nodes of two
// given linked lists using Local References and `moveNode()` as a helper
function merge(a: { node: ListNode | null }, b: { node: ListNode | null }): void {
    let result: ListNode | null = null;
    let lastPtrRef: NodePtrRef = {
        get: () => result,
        set: (node) => { result = node; }
    };

    while (true)
    {
        if (a.node === null)
        {
            lastPtrRef.set(null);       // Note
            break;
        }
        else if (b.node === null)
        {
            lastPtrRef.set(a.node);
            break;
        }
        else
        {
            moveNode(lastPtrRef, a);
            const appended = lastPtrRef.get()!;
            // lastPtrRef = &((*lastPtrRef).next)
            lastPtrRef = { get: () => appended.next, set: (node) => { appended.next = node; } };

            moveNode(lastPtrRef, b);
            const appendedB = lastPtrRef.get()!;
            lastPtrRef = { get: () => appendedB.next, set: (node) => { appendedB.next = node; } };
        }
    }

    a.node = result;
}

const a = { node: null as ListNode | null };
const b = { node: null as ListNode | null };

// construct the first list
for (let i = 3; i >= 0; i--) {
    push(a, i);
}

// construct the second list
for (let i = 10; i >= 4; i--) {
    push(b, i);
}

// print both lists
printList('First List - ', a.node);
printList('Second List - ', b.node);

merge(a, b);

console.log('\nAfter Merge:');

printList('First List - ', a.node);
printList('Second List - ', b.node);
```

## 3\. Recursive

The recursive solution is the most compact of all but is probably not appropriate for production code since it uses stack space proportionate to the lists’ lengths. The algorithm can be implemented as follows in TypeScript:

```ts
// A Linked List Node
class ListNode {
    constructor(public data: number, public next: ListNode | null = null) {}
}

// Helper function to print a given linked list
function printList(msg: string, head: ListNode | null): void {
    let str = msg;
    let ptr = head;
    while (ptr) {
        str += `${ptr.data} —> `;
        ptr = ptr.next;
    }
    console.log(str + 'null');
}

// Helper function to insert a new node in the beginning of the linked list
function push(headRef: { node: ListNode | null }, data: number): void {
    headRef.node = new ListNode(data, headRef.node);
}

// Recursive function to construct a linked list by merging alternate
// nodes of two given linked lists
function merge(a: ListNode | null, b: { node: ListNode | null }): void {
    // base case
    if (a === null || b.node === null) {
        return;
    }

    // take backup of next of `a`
    const a_next = a.next;

    // rearrange pointers
    a.next = b.node;
    b.node = b.node!.next;
    a.next!.next = a_next;

    merge(a_next, b);
}

const a = { node: null as ListNode | null };
const b = { node: null as ListNode | null };

// construct the first list
for (let i = 3; i >= 0; i--) {
    push(a, i);
}

// construct the second list
for (let i = 10; i >= 4; i--) {
    push(b, i);
}

// print both lists
printList('First List - ', a.node);
printList('Second List - ', b.node);

merge(a.node, b);

console.log('\nAfter Merge:');

printList('First List - ', a.node);
printList('Second List - ', b.node);
```
